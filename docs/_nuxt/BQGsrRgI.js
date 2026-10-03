import{A as e,C as t,E as n,Gt as r,Kt as i,M as a,Q as o,R as s,S as c,T as l,Ut as u,X as d,_ as f,_t as p,ct as m,k as h,lt as g,mt as _,st as v,ut as ee,w as te,wt as y}from"./MitKKUeq.js";import{Et as ne}from"./C3O4n23f.js";import{a as b,i as x,n as S,o as C,r as re,s as ie,t as w}from"./DJLqZT_o.js";import{t as ae}from"./D3e07OzS.js";import{t as T}from"./Dh2B6pZ8.js";import{l as E,s as D,t as O}from"./Rl_HAT4u.js";import{t as k}from"./BYmGHvE7.js";var A=[{value:`x`,label:`Cross`},{value:`squeeze`,label:`Squeeze`},{value:`spin`,label:`Spin`},{value:`elastic`,label:`Elastic`},{value:`slide`,label:`Slide out`},{value:`arrow-left`,label:`Arrow left`},{value:`arrow-right`,label:`Arrow right`},{value:`chevron`,label:`Chevron`},{value:`minus`,label:`Minus`},{value:`plus`,label:`Plus`}],j=[{value:`equal`,label:`Equal`},{value:`stagger`,label:`Stagger`},{value:`short-middle`,label:`Short middle`},{value:`offset`,label:`Offset`}],M=[{value:`plain`,label:`Plain`},{value:`circle`,label:`Circle`},{value:`rounded`,label:`Rounded`},{value:`outline`,label:`Outline`},{value:`labeled`,label:`With label`}],N={lines:3,morph:`squeeze`,bars:`equal`,shell:`rounded`,accentOnOpen:!1,accent:`#10b981`,barColor:`#fafafa`,shellBg:`#27272a`,pageBg:`#18181b`,size:48,barWidth:22,barHeight:2,gap:5,radius:12,duration:360},P=(e,t,n)=>t.some(t=>t.value===e)?e:n;function F(e){let t=e.morphTo,n=t===`arrow`?`arrow-left`:t,{morphTo:r,...i}=e;return{...N,...i,lines:e.lines===2?2:3,morph:P(e.morph??n,A,`squeeze`),bars:P(e.bars,j,`equal`),shell:P(e.shell,M,`rounded`)}}var I=/^#[0-9a-f]{6}$/i,L=(e,t,n=3)=>!I.test(e)||!I.test(t)||O(e,t)>=n;function R(e){return e.shell===`plain`||e.shell===`outline`?e.pageBg:e.shellBg}function z(e){let t=R(e),n=L(e.barColor,t)?e.barColor:E(t,`#18181b`,`#fafafa`);return{bar:n,open:L(e.accent,t)?e.accent:n}}var B=`cubic-bezier(0.65, 0, 0.35, 1)`,V=`cubic-bezier(0.68, -0.6, 0.32, 1.6)`,H={equal:{top:[1,0],mid:[1,0],bot:[1,0]},stagger:{top:[1,0],mid:[.72,1],bot:[.45,1]},"short-middle":{top:[1,0],mid:[.6,0],bot:[1,0]},offset:{top:[.6,-1],mid:[1,0],bot:[.6,1]}};function U(e,t,n){let r=H[e.bars],i=([n,r],i)=>`translate: ${Math.round((1-n)*e.barWidth*(r-t)*50)/100}px ${i}px;${n===1?``:`\n  scale: ${n} 1;`}`;return{top:i(r.top,-n),mid:i(r.mid,0),bot:i(r.bot,n)}}function W(e){let t={top:`translate: 0 0;
  rotate: 45deg;
  scale: 1 1;`,bot:`translate: 0 0;
  rotate: -45deg;
  scale: 1 1;`,mid:`opacity: 0;
  scale: 0 1;`};switch(e.morph){case`spin`:return{...t,icon:`rotate: 180deg;`};case`slide`:return{...t,mid:`opacity: 0;
  translate: 140% 0;`};case`arrow-left`:case`arrow-right`:{let t=e.morph===`arrow-left`,n=t?40:-40;return{top:`translate: 0 0;\n  rotate: ${-n}deg;\n  scale: 0.55 1;`,bot:`translate: 0 0;\n  rotate: ${n}deg;\n  scale: 0.55 1;`,mid:`translate: 0 0;
  scale: 1 1;`,origin:t?`0 50%`:`100% 50%`}}case`chevron`:return{top:`translate: -21% 0;
  rotate: 45deg;
  scale: 0.6 1;`,bot:`translate: 21% 0;
  rotate: -45deg;
  scale: 0.6 1;`,mid:`opacity: 0;
  scale: 0 1;`};case`minus`:return{top:`translate: 0 0;
  scale: 1 1;`,bot:`translate: 0 0;
  scale: 1 1;`,mid:`translate: 0 0;
  scale: 1 1;`};case`plus`:return{top:`translate: 0 0;
  rotate: 90deg;
  scale: 1 1;`,bot:`translate: 0 0;
  scale: 1 1;`,mid:`translate: 0 0;
  scale: 1 1;`};default:return t}}function G(e){let t=`  background: ${e.shellBg};\n  border-radius: ${e.radius}px;`;switch(e.shell){case`plain`:return`  background: transparent;\n  border-radius: ${e.radius}px;`;case`circle`:return`  background: ${e.shellBg};\n  border-radius: 50%;`;case`outline`:return`  background: transparent;\n  border-radius: ${e.radius}px;\n  box-shadow: inset 0 0 0 1.5px color-mix(in srgb, ${z(e).bar} 32%, transparent);`;case`labeled`:return`  width: auto;\n  padding-inline: ${Math.round(e.size*.32)}px ${Math.round(e.size*.4)}px;\n  gap: 10px;\n  background: ${e.shellBg};\n  border-radius: 999px;`;default:return t}}function K(e,t=`burger`){let n=F(e),r=n.lines===3?n.gap+n.barHeight:(n.gap+n.barHeight)/2,i=n.duration,a=Math.round(i/2),o=n.morph===`elastic`?V:B,s=W(n),c=U(n,n.morph===`arrow-left`?-1:+(n.morph===`arrow-right`),r),l=n.morph===`squeeze`,u=(e,t,n)=>`translate ${n}ms ${o} ${t}ms, rotate ${n}ms ${o} ${e}ms, scale ${n}ms ${o} ${t}ms, opacity ${n}ms ${o}, background-color ${i}ms ${o}`,d=l?u(0,a,a):u(0,0,i),f=l?u(a,0,a):u(0,0,i),p=`.burger-input:checked + .burger`,m=s.origin?`\n  transform-origin: ${s.origin};`:``,h=z(n),g=n.accentOnOpen?`\n\n${p} .burger-bar {\n  background: ${h.open};\n}`:``,_=n.shell===`labeled`,v=`.burger-input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.burger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${n.size}px;
  height: ${n.size}px;
  color: ${h.bar};
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
${G(n)}
  transition: background-color 160ms ease-out, scale 120ms ease-out;
}

@media (hover: hover) and (pointer: fine) {
  .burger:hover {
    background-color: color-mix(in srgb, ${n.accent} ${n.shell===`plain`||n.shell===`outline`?14:22}%, ${n.shell===`plain`||n.shell===`outline`?`transparent`:n.shellBg});
  }
}

.burger:active {
  scale: 0.94;
}

.burger-input:focus-visible + .burger {
  outline: 2px solid ${n.accent};
  outline-offset: 3px;
}

.burger-icon {
  position: relative;
  flex: none;
  width: ${n.barWidth}px;
  height: ${n.barWidth}px;
  transition: rotate ${i}ms ${o};
}

.burger-bar {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: ${n.barHeight}px;
  margin-top: ${-n.barHeight/2}px;
  border-radius: ${n.barHeight}px;
  background: currentColor;${m}
  transition: ${d};
}

.burger-top {
  ${c.top}
}

${n.lines===3&&c.mid!==`translate: 0px 0px;`?`.burger-mid {\n  ${c.mid}\n}\n\n`:``}.burger-bot {
  ${c.bot}
}

${p} .burger-bar {
  transition: ${f};
}

${p} .burger-top {
  ${s.top}
}

${n.lines===3&&s.mid?`${p} .burger-mid {\n  ${s.mid}\n}\n\n`:``}${p} .burger-bot {
  ${s.bot}
}${s.icon?`\n\n${p} .burger-icon {\n  ${s.icon}\n}`:``}${g}${_?`

.burger-text {
  display: grid;
  font: 500 14px/1 system-ui, -apple-system, 'Segoe UI', sans-serif;
  letter-spacing: 0.01em;
}

.burger-text > span {
  grid-area: 1 / 1;
  transition: opacity ${a}ms ease-out, translate ${a}ms ease-out;
}

.burger-text > span + span,
${p} .burger-text > span:first-child {
  opacity: 0;
  translate: 0 4px;
}

${p} .burger-text > span + span {
  opacity: 1;
  translate: 0 0;
}`:``}

@media (prefers-reduced-motion: reduce) {
  .burger-bar,
  .burger-icon,
  .burger-text > span {
    transition-duration: 140ms !important;
    transition-delay: 0s !important;
    transition-timing-function: ease-out !important;
  }

  ${p} .burger-icon {
    rotate: none;
  }
}`;return t===`burger`?v:v.replace(/\.burger/g,`.${t}`)}function q(e,t=`burger`){let n=F(e);return`<input class="${t}-input" type="checkbox" id="${t}-toggle" aria-label="Toggle navigation menu" aria-controls="site-menu" />
<label class="${t}" for="${t}-toggle">
    <span class="${t}-icon" aria-hidden="true">${(n.lines===3?[`top`,`mid`,`bot`]:[`top`,`bot`]).map(e=>`\n      <span class="${t}-bar ${t}-${e}"></span>`).join(``)}
    </span>${n.shell===`labeled`?`\n    <span class="${t}-text" aria-hidden="true"><span>Menu</span><span>Close</span></span>`:``}
</label>`}function oe(e){let t=F(e);return{"--burger-accent":t.accent,"--burger-bar":t.barColor,"--burger-shell":t.shellBg,"--burger-duration":`${t.duration}ms`}}function se(e,t){let n=Math.floor(t.range(0,360));return{...F(e),lines:t.chance(.75)?3:2,morph:t.pick(A.map(e=>e.value)),bars:t.pick(j.map(e=>e.value)),shell:t.pick(M.map(e=>e.value)),accentOnOpen:t.chance(.4),accent:D({h:n,s:80,l:55}),barColor:D({h:n,s:15,l:96}),shellBg:D({h:n,s:12,l:17}),pageBg:t.chance(.3)?`#ffffff`:D({h:n,s:10,l:8}),size:t.pick([40,44,48,52]),barWidth:t.pick([18,20,22,24]),barHeight:t.pick([2,2,3]),gap:t.pick([4,5,6]),radius:t.pick([8,12,16]),duration:t.pick([260,320,360,440])}}var J=e=>({...N,...e}),Y=[{name:`Squeeze`,tags:[`classic`],state:J({})},{name:`Classic Cross`,tags:[`classic`],state:J({morph:`x`,shell:`plain`})},{name:`Spin Circle`,tags:[`motion`],state:J({morph:`spin`,shell:`circle`,accentOnOpen:!0})},{name:`Elastic Pop`,tags:[`playful`],state:J({morph:`elastic`,shell:`circle`,shellBg:`#7c3aed`,accent:`#fde047`,duration:520})},{name:`Slide Away`,tags:[`motion`],state:J({morph:`slide`,shell:`outline`})},{name:`Back Arrow`,tags:[`arrow`],state:J({morph:`arrow-left`,shell:`plain`,bars:`equal`})},{name:`Forward Arrow`,tags:[`arrow`],state:J({morph:`arrow-right`,shell:`rounded`,shellBg:`#1e293b`})},{name:`Chevron Drop`,tags:[`dropdown`],state:J({morph:`chevron`,shell:`outline`,lines:3})},{name:`Minus Fold`,tags:[`minimal`],state:J({morph:`minus`,shell:`plain`,accentOnOpen:!0})},{name:`Plus Toggle`,tags:[`minimal`],state:J({morph:`plus`,lines:2,shell:`circle`,accentOnOpen:!0})},{name:`Stagger Bars`,tags:[`editorial`],state:J({bars:`stagger`,morph:`x`,shell:`plain`})},{name:`Offset Bars`,tags:[`editorial`],state:J({bars:`offset`,morph:`squeeze`,shell:`outline`})},{name:`Two Lines`,tags:[`minimal`],state:J({lines:2,gap:6,morph:`x`,shell:`plain`,barWidth:20})},{name:`Menu Pill`,tags:[`labeled`],state:J({shell:`labeled`,morph:`squeeze`,barWidth:16,gap:3,size:44})},{name:`Light Pill`,tags:[`labeled`,`light`],state:J({shell:`labeled`,barColor:`#18181b`,shellBg:`#f4f4f5`,accent:`#2563eb`,barWidth:16,gap:3,size:44})},{name:`Bold Square`,tags:[`bold`],state:J({barHeight:3,gap:5,radius:6,shellBg:`#fafafa`,barColor:`#09090b`,accent:`#f59e0b`,morph:`x`})},{name:`Light Page`,tags:[`light`],state:J({shell:`plain`,morph:`x`,barColor:`#18181b`,pageBg:`#ffffff`,accent:`#2563eb`})},{name:`Light Outline`,tags:[`light`],state:J({shell:`outline`,morph:`squeeze`,barColor:`#0f172a`,pageBg:`#f8fafc`,accent:`#0f766e`})},{name:`Neon`,tags:[`neon`],state:J({shell:`outline`,barColor:`#22d3ee`,accent:`#22d3ee`,morph:`spin`,barHeight:3})}],ce=[`innerHTML`],le=[`innerHTML`],ue={class:`w-full`,"aria-label":`All morphs`},de={class:`mb-3 flex items-center justify-between`},fe={class:`flex cursor-pointer items-center gap-2 text-[11px] text-muted`},pe={class:`grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5`},me=[`innerHTML`],he=[`aria-pressed`,`onClick`],ge={class:`grid grid-cols-2 gap-2`},_e=[`aria-pressed`,`onClick`],ve={key:0,class:`text-[11px] leading-relaxed text-muted`},X=a({__name:`hamburger`,setup(a){let{state:D,randomize:O,reset:P,undo:I,redo:L,pushHistory:R,shareUrlRef:B}=w({id:`hamburger`,defaultState:JSON.parse(JSON.stringify(N)),randomize:se,deserialize:e=>F(e)}),V=s(`editor:shareUrl`,()=>{});m(()=>V(B.value));let H=c(()=>K(D.value)),U=c(()=>q(D.value)),W=c(()=>oe(D.value)),G=c(()=>z(F(D.value))),J=c(()=>G.value.bar.toLowerCase()!==D.value.barColor.toLowerCase()),X=c(()=>A.map(e=>{let t=`burger-g-${e.value}`,n={...D.value,morph:e.value,shell:D.value.shell===`labeled`?`rounded`:D.value.shell};return{...e,prefix:t,css:K(n,t),html:q(n,t)}})),ye=c(()=>`<style>${H.value}\n${X.value.map(e=>e.css).join(`
`)}</style>`);function Z(e){D.value=JSON.parse(JSON.stringify(Y[e].state)),R()}function be(e){D.value={...D.value,morph:e},R()}let Q=p(!1),$=p(null);v(Q,e=>{$.value?.querySelectorAll(`input[type="checkbox"]`).forEach(t=>t.checked=e)});let xe=(e,t)=>`<div style="display:grid;place-items:center;width:100%;height:100%;min-height:200px;border-radius:16px;background:${F(e).pageBg}">${t}</div>`,Se=c(()=>Y.map(e=>({name:e.name,css:K(e.state),html:xe(e.state,q(e.state))})));return(a,s)=>{let c=ie,p=C,m=ae,v=T,w=x,N=b,F=k,R=re,z=S;return d(),te(z,{title:`Hamburger Icons`,description:`Ten pure-CSS menu icon morphs with button shells, bar layouts and an optional label.`,css:y(H),html:y(U),vars:y(W),onRandomize:y(O),onReset:y(P),onUndo:y(I),onRedo:y(L)},{preview:g(()=>[e(p,{variants:y(Se),onApplyVariant:Z,title:`Hamburger preview`,filename:`css-studio-hamburger`},{presets:g(()=>[e(c,{presets:y(Y),onApply:Z},null,8,[`presets`])]),default:g(()=>[t(`div`,{innerHTML:y(ye),"aria-hidden":`true`},null,8,ce),t(`div`,{ref_key:`stage`,ref:$,class:`flex w-full max-w-2xl flex-col items-center gap-10 p-6`},[t(`div`,{class:`flex w-full flex-col items-center gap-3 rounded-2xl border border-line py-10`,style:r({background:y(D).pageBg})},[t(`div`,{class:`flex items-center justify-center`,style:{"min-height":`76px`},innerHTML:y(U)},null,8,le),t(`p`,{class:`text-center text-[11px]`,style:r({color:y(E)(y(D).pageBg,`#52525b`,`#a1a1aa`)})},`Click, or Tab to it and press Space.`,4)],4),t(`section`,ue,[t(`div`,de,[s[16]||=t(`h2`,{class:`text-[11px] font-medium tracking-wide text-muted uppercase`},`All morphs`,-1),t(`label`,fe,[ee(t(`input`,{"onUpdate:modelValue":s[0]||=e=>_(Q)?Q.value=e:null,type:`checkbox`,class:`accent-accent`},null,512),[[ne,y(Q)]]),s[15]||=h(` Show open state `,-1)])]),t(`ul`,pe,[(d(!0),n(f,null,o(y(X),e=>(d(),n(`li`,{key:e.value,class:u([`flex flex-col items-center gap-2.5 rounded-xl border bg-bg/40 p-2 transition-colors duration-150`,y(D).morph===e.value?`border-accent/70`:`border-line`])},[t(`div`,{class:`flex h-20 w-full items-center justify-center rounded-lg`,style:r({background:y(D).pageBg}),innerHTML:e.html},null,12,me),t(`button`,{type:`button`,class:u([`w-full rounded-md px-2 py-1 text-[11px] font-medium transition-[background-color,color] duration-150 active:scale-[0.97]`,y(D).morph===e.value?`bg-accent/12 text-fg`:`text-muted hover:bg-line/30 hover:text-fg`]),"aria-pressed":y(D).morph===e.value,onClick:t=>be(e.value)},i(e.label),11,he)],2))),128))])])],512)]),_:1},8,[`variants`])]),controls:g(()=>[e(w,{label:`Icon`,icon:`ph-list`},{default:g(()=>[e(m,{modelValue:y(D).morph,"onUpdate:modelValue":s[1]||=e=>y(D).morph=e,label:`Morph`,options:y(A)},null,8,[`modelValue`,`options`]),e(m,{modelValue:y(D).shell,"onUpdate:modelValue":s[2]||=e=>y(D).shell=e,label:`Button shell`,options:y(M)},null,8,[`modelValue`,`options`]),e(m,{modelValue:y(D).bars,"onUpdate:modelValue":s[3]||=e=>y(D).bars=e,label:`Bar layout`,options:y(j)},null,8,[`modelValue`,`options`]),t(`div`,ge,[(d(),n(f,null,o([3,2],e=>t(`button`,{key:e,type:`button`,class:u([`h-9 rounded-lg border text-xs font-medium transition-colors duration-150`,y(D).lines===e?`border-accent/70 bg-accent/8 text-fg`:`border-line text-muted hover:bg-line/15`]),"aria-pressed":y(D).lines===e,onClick:t=>y(D).lines=e},i(e)+` lines `,11,_e)),64))]),e(v,{modelValue:y(D).accentOnOpen,"onUpdate:modelValue":s[4]||=e=>y(D).accentOnOpen=e,label:`Accent bars when open`},null,8,[`modelValue`])]),_:1}),e(w,{label:`Size & motion`,icon:`ph-sliders`},{default:g(()=>[e(N,{modelValue:y(D).size,"onUpdate:modelValue":s[5]||=e=>y(D).size=e,label:`Button size`,min:32,max:64,suffix:`px`},null,8,[`modelValue`]),e(N,{modelValue:y(D).barWidth,"onUpdate:modelValue":s[6]||=e=>y(D).barWidth=e,label:`Bar width`,min:14,max:32,suffix:`px`},null,8,[`modelValue`]),e(N,{modelValue:y(D).barHeight,"onUpdate:modelValue":s[7]||=e=>y(D).barHeight=e,label:`Bar height`,min:1,max:5,suffix:`px`},null,8,[`modelValue`]),e(N,{modelValue:y(D).gap,"onUpdate:modelValue":s[8]||=e=>y(D).gap=e,label:`Bar gap`,min:2,max:10,suffix:`px`},null,8,[`modelValue`]),e(N,{modelValue:y(D).radius,"onUpdate:modelValue":s[9]||=e=>y(D).radius=e,label:`Corner radius`,min:0,max:24,suffix:`px`},null,8,[`modelValue`]),e(N,{modelValue:y(D).duration,"onUpdate:modelValue":s[10]||=e=>y(D).duration=e,label:`Duration`,min:150,max:700,step:10,suffix:`ms`},null,8,[`modelValue`])]),_:1}),e(w,{label:`Colors`,icon:`ph-palette`},{default:g(()=>[e(F,{"model-value":y(D).barColor,label:`Bars & label`,"onUpdate:modelValue":s[11]||=e=>y(D).barColor=e},null,8,[`model-value`]),e(F,{"model-value":y(D).shellBg,label:`Button background`,"onUpdate:modelValue":s[12]||=e=>y(D).shellBg=e},null,8,[`model-value`]),e(F,{"model-value":y(D).pageBg,label:`Page background`,"onUpdate:modelValue":s[13]||=e=>y(D).pageBg=e},null,8,[`model-value`]),y(J)?(d(),n(`p`,ve,` Bars are too close to the background, so the export uses `+i(y(G).bar)+` instead to keep 3:1 contrast. `,1)):l(``,!0),e(F,{"model-value":y(D).accent,label:`Accent (hover, focus, open)`,"onUpdate:modelValue":s[14]||=e=>y(D).accent=e},null,8,[`model-value`])]),_:1})]),code:g(()=>[e(R,{css:y(H),html:y(U),vars:y(W),filename:`css-studio-hamburger`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{X as default};