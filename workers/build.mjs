#!/bin/env -S bun
import{dirname,sep}from'node:path';
Bun.write(
	'dst/index.html',
	await new HTMLRewriter().on('div.browse',{element:async e=>e.append(
		await(async(
			host,auth,repo,branch,
			f=w=>`<ul>${Object.entries(w).map(([i,x])=>typeof x=='string'?`<li>${x}</li>`:`<li>${i}${f(x)}</li>`).join('')}</ul>`
		)=>(
			{host,auth,repo}=(x=>(
				x.match(/https?:\/\/(?<host>.+?)\/(?<auth>.+?)\/(?<repo>.+?)\.git/)??
				x.match(/(?<user>.+?)@(?<host>.+?):(?<auth>.+?)\/(?<repo>.+)/)
			).groups)(await Bun.$`git remote get-url origin`.text()),
			branch='HEAD',//(await Bun.$`git branch --contains`.text()).slice(2,-1),
			f([...new Bun.Glob(e.getAttribute('glob')).scanSync('.')].reduce((a,w)=>(
				w.split(sep).slice(0,-e.getAttribute('pop')||0).reduce((a,x,i,w)=>(
					++i==w.length?a[x]=`<a href="https://${host}/${auth}/${repo}/tree/${branch}/${w.join('/')}">${x}</a>`:a[x]??={}
				),a),
				a
			),{}))
		))(),
		{html:1}
	)}).transform(await Bun.file('src/index.html').text())
);
