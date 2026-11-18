#!/usr/bin/env -S bun --console-depth=0

const
parse=w=>w.matchAll(/(?<x>[()])|"(?<x>(?:\\.|[^"\\])*)"|(?<x>[^\s()"]+)/g)[Symbol.iterator]().reduce((a,{groups:{x}})=>(
	({'(':(_=[])=>(a.at(-1).push(_),a.push(_)),')':_=>a.pop()}[x]??(_=>a.at(-1).push(x)))(),a
),[[]])[0],
search=(w,f,depth=1/0)=>depth&&w.flatMap(x=>Array.isArray(x)?[...(f(x)?[x]:[]),...(search(x,f,depth-1)||[])]:[]),
s2obj=w=>({
	[w[0]]:((
		x=w.slice(1).reduce((a,x)=>(
			Array.isArray(x)?(([[i,v]]=Object.entries(s2obj(x)))=>a[i]=(i in a?[a[i],v]:v))():a._.push(x),
			a
		),{_:[]})
	)=>(
		x._.length?(x._=x._.map(x=>isNaN(x)?x:+x)):delete x._,
		Object.keys(x).length==1?1<x._?.length?x._:x._?.[0]:x
	))()
});



const
s=await parse(await Bun.file('../proj/musicbox/cube/cube.kicad_pcb').text());

console.log(
	search(s,x=>x.some(x=>x=='layer,Edge.Cuts')).map(s2obj)
);

await Bun.write('_.json',JSON.stringify((s[0]),0,'\t'));
