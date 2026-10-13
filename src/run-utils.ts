export type Run={id:number;ms:number;date:string;createdAt:number};
export type Dungeon={id:number;name:string;runs:Run[]};
export type Phase='idle'|'running'|'paused'|'finished';
const obj=(v:unknown):v is Record<string,unknown>=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const num=(v:unknown):v is number=>typeof v==='number'&&Number.isFinite(v);
export function validDungeons(v:unknown):v is Dungeon[]{
 if(!Array.isArray(v)||!v.length||v.length>1000)return false;
 const ids=new Set<number>();
 for(const d of v){
  if(!obj(d)||!num(d.id)||d.id<=0||ids.has(d.id)||typeof d.name!=='string'||!d.name.trim()||d.name.length>120||!Array.isArray(d.runs)||d.runs.length>100000)return false;
  ids.add(d.id);
  const runIds=new Set<number>();
  for(const r of d.runs){
   if(!obj(r)||!num(r.id)||r.id<=0||runIds.has(r.id)||!num(r.ms)||r.ms<0||r.ms>604800000||typeof r.date!=='string'||r.date.length>120||!num(r.createdAt)||r.createdAt<0)return false;
   runIds.add(r.id);
  }
 }
 return true;
}
export function parseDuration(s:string):number|null{
 const m=/^(\d{1,4}):([0-5]\d)(?:\.(\d{1,2}))?$/.exec(s.trim());if(!m)return null;
 const ms=(Number(m[1])*60+Number(m[2]))*1000+Number((m[3]||'0').padEnd(2,'0'))*10;return ms<=604800000?ms:null;
}
export function progressPoints(runs:Run[]):string{
 if(runs.length<2)return '';
 const t=runs.map(r=>r.ms),min=Math.min(...t),max=Math.max(...t),range=Math.max(1,max-min);
 return runs.map((r,i)=>String(25+i*550/(runs.length-1))+','+String(25+(r.ms-min)/range*160)).join(' ');
}
export function dungeonImage(name:string):string{
 const n=name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const match:[string,string][]=[['araknyde','araknyde'],['bouftou','bouftou'],['craqueleur','craqueleur'],['dragon','dragon'],['croca','dragon'],['glace','golem_glace'],['golem or','golem_or'],['kralamour','kralamour'],['tofu','tofu']];
 return './assets/03_donjons_'+(match.find(([word])=>n.includes(word))?.[1]||'kralamour')+'.png';
}
export function recoverTimer(raw:string|null,now=Date.now()):{dungeonId:number;phase:Phase;elapsed:number}|null{
 try{
  const t:unknown=JSON.parse(raw||'null');
  if(!obj(t)||!num(t.dungeonId)||t.dungeonId<=0||!['running','paused','finished'].includes(String(t.phase))||!num(t.elapsed)||t.elapsed<0||t.elapsed>604800000)return null;
  if(t.phase==='running'){
   if(!num(t.startedAt)||t.startedAt>now+60000||t.startedAt<now-604800000)return null;
   return {dungeonId:t.dungeonId,phase:'running',elapsed:Math.min(604800000,t.elapsed+Math.max(0,now-t.startedAt))};
  }
  return {dungeonId:t.dungeonId,phase:t.phase as Phase,elapsed:t.elapsed};
 }catch{return null}
}
