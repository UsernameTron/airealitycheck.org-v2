"""Dependency-free checks for the published static site."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit,unquote
import re,json,sys,xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[1]
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__(convert_charrefs=True);self.tags=[];self.ids=[];self.script=None;self.json=[];self.feed(text)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs);self.tags.append((tag,a))
  if 'id' in a:self.ids.append(a['id'])
  if tag=='script' and a.get('type')=='application/ld+json':self.script=''
 def handle_data(self,data):
  if self.script is not None:self.script+=data
 def handle_endtag(self,tag):
  if tag=='script' and self.script is not None:self.json.append(self.script);self.script=None
errors=[]
files=[ROOT/'index.html',ROOT/'404.html',*sorted((ROOT/'career-content').rglob('*.html'))]
pages={p:Page(p.read_text()) for p in files}
expected=set()
for p,page in pages.items():
 rel=p.relative_to(ROOT).as_posix();url='https://airealitycheck.org/'+(rel[:-10] if rel.endswith('index.html') else rel)
 if rel!='404.html':expected.add(url)
 def require(ok,msg):
  if not ok:errors.append(f'{rel}: {msg}')
 require(sum(t=='h1' for t,a in page.tags)==1,'requires exactly one h1')
 require(sum(t=='main' for t,a in page.tags)==1,'requires one main landmark')
 require(len(page.ids)==len(set(page.ids)),'duplicate IDs')
 require(any(t=='meta' and a.get('name')=='viewport' for t,a in page.tags),'missing viewport')
 require(any(t=='link' and a.get('rel')=='canonical' and a.get('href')==url for t,a in page.tags),'canonical mismatch')
 for prop in ['og:title','og:description','og:url','og:image']:
  require(any(t=='meta' and a.get('property')==prop and a.get('content') for t,a in page.tags),'missing '+prop)
 require(any(t=='a' and a.get('href')=='#main' for t,a in page.tags),'missing skip link')
 nav_paths={'/','/career-content/','/career-content/articles/','/career-content/portfolio/','/career-content/creativity/','/career-content/tools-and-resources/','/career-content/#contact'}
 require(nav_paths.issubset({a.get('href') for t,a in page.tags if t=='a'}),'navigation destination missing')
 for raw in page.json:
  try:json.loads(raw)
  except Exception:require(False,'invalid JSON-LD')
 for t,a in page.tags:
  if t=='img':require('alt' in a and 'width' in a and 'height' in a,'image needs alt and dimensions')
  value=a.get('href') if t in ['a','link'] else a.get('src') if t in ['img','script'] else None
  if not value:continue
  u=urlsplit(value)
  if u.scheme or u.netloc:continue
  target=ROOT/unquote(u.path).lstrip('/') if u.path.startswith('/') else p.parent/unquote(u.path) if u.path else p
  if target.is_dir():target=target/'index.html'
  require(target.exists(),f'broken local link: {value}')
  if u.fragment and target in pages:require(unquote(u.fragment) in pages[target].ids,f'missing anchor: {value}')
ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
urls=[e.text for e in ET.parse(ROOT/'sitemap.xml').findall('.//s:loc',ns)]
if len(urls)!=len(set(urls)):errors.append('duplicate sitemap URLs')
for url in expected-set(urls):errors.append('missing sitemap URL: '+url)
for url in set(urls)-expected:
 if not url.endswith('/downloads/crushin-claude.pdf'):errors.append('unexpected sitemap URL: '+url)
if (ROOT/'CNAME').read_text().strip()!='airealitycheck.org':errors.append('CNAME changed')
for p in files:
 if any(x in re.sub(r'<!--[\s\S]*?-->','',p.read_text()) for x in ['PAGE_TITLE','VIDEO_ID','force-mobile','mobile-gate']):errors.append(f'{p.name}: template or retired mobile gate found')
if errors:
 print('\n'.join(errors));sys.exit(1)
print(f'PASS: {len(files)} pages; local links, anchors, sitemap, metadata, semantics, images, navigation, CNAME.')
