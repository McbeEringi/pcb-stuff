#!/usr/bin/env -S bun
//--console-depth=2

const
parse=w=>w.matchAll(/(?<x>[()])|"(?<x>(?:\\.|[^"\\])*)"|(?<x>[^\s()"]+)/g)[Symbol.iterator]().reduce((a,{groups:{x}})=>(
	{'(':(_=[])=>a?(a.push(_),Object.assign(_,{parent:a})):[],')':_=>a.parent??a}[x]??(_=>(a.push(x),a))
)(),null),
// search=(w,f,depth=1/0)=>depth&&w.flatMap(x=>Array.isArray(x)?[...(f(x)?[x]:[]),...(search(x,f,depth-1)||[])]:[]),
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
parse_pcb=w=>(
	w=parse(w),
	w={
		layers:s2obj(w.find(x=>x[0]=='layers')).layers,
		stackup:s2obj(w.find(x=>x[0]=='setup')).setup.stackup,
		fp:w.filter(x=>x[0]=='footprint').map(x=>(s2obj(x).footprint)),
		gr:w.filter(x=>x[0].startsWith('gr_')).map(x=>Object.entries(s2obj(x))[0]),
		seg:w.filter(x=>x[0]=='segment').map(x=>(s2obj(x).segment)),
		via:w.filter(x=>x[0]=='via').map(x=>(s2obj(x).via)),
		zone:w.filter(x=>x[0]=='zone').map(x=>(s2obj(x).zone)),
	}
);

// gr2svg=([i,x])=>({
// 	// gr_text:x=>x,
// 	gr_line:x=>`M${x.start}L${x.end}`,
// 	// gr_rect:x=>x,
// 	// gr_circle:x=>x,
// 	gr_arc:x=>(
// 		((
// 			sub=(a,b)=>a.map((x,i)=>x-b[i]),
// 			dist=(a,b)=>Math.hypot(...sub(a,b)),
// 			cross=(a,b)=>a[0]*b[1]-a[1]*b[0],
// 			mid=x.start.map((y,i)=>(y+x.end[i])/2),
// 		)=>(
// 			x.r=Math.round((dist(x.start,x.mid)**2)/dist(mid,x.mid)/2*1e7)/1e7,
// 			x.large_sweep=x.r*(2**.5)<dist(x.start,x.mid),
// 			x.sweep=!(0<cross(sub(x.start,x.mid),sub(x.end,x.mid)))
// 		))(),
// 		`M${x.start}A${x.r},${x.r},0,${+x.large_sweep},${+x.sweep},${x.end}`
// 	),
// 	// gr_poly:x=>x,
// }[i.replace(/^fp/,'gr')]??(_=>console.log(`${i} not implemented!`)))(x),


console.log(

parse_pcb(await Bun.file(
	// '../proj/musicbox/cube/cube.kicad_pcb'
	'../proj/usb/usb-c-dip/usb-c-dip.kicad_pcb'
).text())

);

// console.log(
// 	search(s,x=>x.some(x=>x=='layer,Edge.Cuts')).map((x,i)=>(
// 		gr2svg(Object.entries(s2obj(x))[0])
// 	)).join('')
// );

// await Bun.write('_s.json',JSON.stringify((s),0,'\t'));
// await Bun.write('_.json',JSON.stringify(s2obj(s),0,'\t'));
