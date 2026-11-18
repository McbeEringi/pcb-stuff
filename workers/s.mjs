#!/usr/bin/env -S bun --console-depth=5

const
parse=w=>w.matchAll(/(?<x>[()])|"(?<x>(?:\\.|[^"\\])*)"|(?<x>[^\s()"]+)/g)[Symbol.iterator]().reduce((a,{groups:{x}})=>(
	({'(':(_=[])=>(a.at(-1).push(_),a.push(_)),')':_=>a.pop()}[x]??(_=>a.at(-1).push(x)))(),a
),[[]])[0],
search=(w,f,depth=1/0)=>depth&&w.flatMap(x=>Array.isArray(x)?[...(f(x)?[x]:[]),...(search(x,f,depth-1)||[])]:[]),
s2obj=w=>({
	[w[0]]:(x=>x.every(Array.isArray)?Object.assign(...x.map(s2obj)):(x=>1<x.length?x:x[0])(x.map(x=>isNaN(x)?x:+x)))(w.slice(1))
});



const
s=await parse(await Bun.file('../proj/musicbox/cube/cube.kicad_pcb').text());

console.log(
	search(s,x=>x.some(x=>x=='layer,Edge.Cuts')).map(s2obj)
);
