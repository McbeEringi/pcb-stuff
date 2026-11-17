#!/usr/bin/env -S bun

const
parse=w=>w.matchAll(/(?<x>[()])|"(?<x>(?:\\.|[^"\\])*)"|(?<x>[^\s()"]+)/g)[Symbol.iterator]().reduce((a,{groups:{x}})=>(
	({'(':(_=[])=>(a.at(-1).push(_),a.push(_)),')':_=>a.pop()}[x]??(_=>a.at(-1).push(x)))(),a
),[[]])[0];

console.log(
await parse(await Bun.file('../proj/musicbox/cube/cube.kicad_pcb').text())
)
