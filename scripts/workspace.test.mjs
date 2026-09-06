import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const html=fs.readFileSync(new URL('../career-content/tools-and-resources/prompt-workspace.html',import.meta.url),'utf8');
// Run the production copy path with an in-memory clipboard, not a second implementation.
const source=html.match(/<script>([\s\S]*?)<\/script>/g).find(s=>s.includes('const TEMPLATES')).slice(8,-9);
const resolve=source.match(/function resolvePrompt[^\n]+/)[0];
const current=source.match(/function currentText[^\n]+/)[0];
const copy=source.match(/async function copyPrompt[^\n]+/)[0];
function harness(a,b='',variant='a',values={}){
 let written,notice,view;
 const context=vm.createContext({state:{a,b,variant,variables:{a:values,b:values}},navigator:{clipboard:{writeText:async text=>{written=text;}}},status:m=>notice=m,setView:v=>view=v});
 vm.runInContext(resolve+'\n'+current+'\n'+copy,context);
 return {context,run:()=>vm.runInContext('copyPrompt()',context),written:()=>written,notice:()=>notice,view:()=>view};
}
test('plain prompt copies editor text, never placeholder preview',async()=>{const h=harness('Summarize this public example in three bullets.');await h.run();assert.equal(h.written(),'Summarize this public example in three bullets.');});
test('variable substitution preserves literal dollar replacement sequences',async()=>{const h=harness('{{amount}} / {{amount}}','', 'a',{amount:'$& $1 $$ $`'});await h.run();assert.equal(h.written(),'$& $1 $$ $` / $& $1 $$ $`');});
test('missing variables remain visible and do not inherit prototype values',async()=>{const h=harness('{{missing}} {{constructor}}');await h.run();assert.equal(h.written(),'{{missing}} {{constructor}}');});
test('removing last variable copies new plain text, not stale substituted text',async()=>{const h=harness('{{x}}','','a',{x:'before'});await h.run();h.context.state.a='after';await h.run();assert.equal(h.written(),'after');});
test('selected variant B is copied',async()=>{const h=harness('alpha','beta','b');await h.run();assert.equal(h.written(),'beta');});
test('empty prompt never copies instructional placeholder',async()=>{const h=harness('   ');await h.run();assert.equal(h.written(),undefined);});
test('clipboard failure offers recovery',async()=>{const h=harness('example');h.context.navigator.clipboard.writeText=async()=>{throw Error('denied');};await h.run();assert.equal(h.view(),'preview');assert.match(h.notice(),/Select and copy/);});
test('every executable inline script parses',()=>{for(const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g))new vm.Script(match[1]);});
