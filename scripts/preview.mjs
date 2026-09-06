// Optional local preview only. GitHub Pages serves the HTML files directly.
import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
const args=process.argv.slice(2),port=Number(args[args.indexOf('--port')+1])||8000;
const root=process.cwd();
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.pdf':'application/pdf','.xml':'application/xml'};
http.createServer(async(req,res)=>{try{
 const url=new URL(req.url,'http://localhost');
 if(url.pathname==='/__qa'){
  const width=Math.max(320,Math.min(1440,Number(url.searchParams.get('width'))||390));
  const route=url.searchParams.get('page')||'/';
  if(!/^\/[\w/.-]*$/.test(route)){res.writeHead(400);return res.end();}
  res.setHeader('Content-Type','text/html; charset=utf-8');return res.end(`<!doctype html><html><head><title>Responsive QA</title><style>body{margin:0;background:#363639;color:white;font:14px sans-serif}iframe{display:block;border:0;width:${width}px;height:844px}p{margin:8px}</style></head><body><p>${width}px viewport · ${route}</p><iframe title="Site preview" src="${route}" allow="clipboard-read; clipboard-write"></iframe></body></html>`);
 }
 let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));
 if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);return res.end();}
 if((await stat(file)).isDirectory())file=path.join(file,'index.html');
 const body=await readFile(file);res.setHeader('Content-Type',types[path.extname(file)]||'text/plain');res.end(body);
 }catch(e){res.writeHead(404);res.end('Not found');}
}).listen(port,'0.0.0.0',()=>console.log(`Static preview ready on ${port}`));
