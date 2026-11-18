#!/usr/bin/env -S bun --console-depth=0

const
parse=w=>w.matchAll(/(?<x>[()])|"(?<x>(?:\\.|[^"\\])*)"|(?<x>[^\s()"]+)/g)[Symbol.iterator]().reduce((a,{groups:{x}})=>(
	({'(':(_=[])=>(a.at(-1).push(_),a.push(_)),')':_=>a.pop()}[x]??(_=>a.at(-1).push(x)))(),a
),[[]])[0][0],
search=(w,f,depth=1/0)=>depth&&w.flatMap(x=>Array.isArray(x)?[...(f(x)?[x]:[]),...(search(x,f,depth-1)||[])]:[]),
s2obj=w=>(
	w=w.reduce((a,x)=>(a[Array.isArray(x)?'arr':'str'].push(x),a),((str=[])=>({
		arr:[],str,
		str1:_=>str.slice(1).map(x=>isNaN(x)?x:+x),
		single:w=>1<w.length?w:(w[0]&&Object.assign(w[0],{$single:true}))
	}))()),
	w.str.length&&w.arr.length?({
		[w.str[0]]:((
			a=w.arr.reduce((a,x,i)=>(
				x=s2obj(x),
				Array.isArray(x)?a.$.push(x):(
					[[i,x]]=Object.entries(x),
					i in a?
					a[i].$multi?a[i].push(x):a[i]=Object.assign([a[i],x],{$multi:true}):
					a[i]=x
				),
				a
			),{$:w.str1()})
		)=>(
			a.$?.length?a.$=w.single(a.$):delete a.$,
			a
		))()
	}):
	!w.arr.length&&w.str.length?({[w.str[0]]:w.single(w.str1())}):
	!w.str.length&&w.arr.length?w.arr.map(s2obj):[]
);



const
s=await parse(await Bun.file('../proj/musicbox/cube/cube.kicad_pcb').text());

console.log(
	search(s,x=>x.some(x=>x=='layer,Edge.Cuts')).map(s2obj)
);

await Bun.write('_s.json',JSON.stringify((s),0,'\t'));
await Bun.write('_.json',JSON.stringify(s2obj(s),0,'\t'));
