#!/bin/env -S bun
import{dirname}from'node:path';
Bun.write('dst/index.html',
	new HTMLRewriter().on('ul.proj',{element:e=>e.append(
		[...new Bun.Glob('proj/**/*.kicad_pro').scanSync('.')].map(x=>(
			x=dirname(x),
			`<li><a href="https://github.com/mcbeeringi/pcb-stuff/tree/main/${x}">${x}</a></li>`
		)).join('\n'),{html:1}
	)}).transform(await Bun.file('src/index.html').text())
);
