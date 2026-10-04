import{A as e,C as t,M as n,R as r,S as i,Ut as a,X as o,ct as s,lt as c,w as l,wt as u}from"./MitKKUeq.js";import{a as d,i as f,l as p,o as m,s as h,t as g}from"./CJu4WcQG.js";import{t as _}from"./Dh2B6pZ8.js";import{t as v}from"./BYmGHvE7.js";import{t as y}from"./o8u_Jv9o.js";var b={count:5,shape:`circle`,overlap:`left`,size:44,gap:14,ringColor:`#09090b`,ringWidth:2,gradientFrom:`#10b981`,gradientTo:`#22d3ee`,showOverflowBadge:!0,hoverSpread:!0},x=[`A`,`B`,`C`,`D`,`E`,`F`,`G`];function S(e){return`.avatar-stack {
  display: flex;
  align-items: center;
  ${e.overlap===`left`?``:`flex-direction: row-reverse;`}
}

.avatar {
  display: grid;
  place-items: center;
  width: ${e.size}px;
  height: ${e.size}px;
  border-radius: ${e.shape===`circle`?`999px`:`${Math.round(e.size/5)}px`};
  border: ${e.ringWidth}px solid ${e.ringColor};
  color: #fff;
  font-size: ${Math.round(e.size/3)}px;
  font-weight: 700;
  flex-shrink: 0;
  background: linear-gradient(135deg, var(--from), var(--to));
  transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.avatar:not(:first-child) {
  margin-left: ${e.overlap===`left`?`-${e.gap}px`:`0`};
}

.avatar:not(:last-child) {
  margin-right: ${e.overlap===`left`?`0`:`-${e.gap}px`};
}

.avatar-stack:hover ${e.hoverSpread?`.avatar {
  transform: translateX(${e.overlap===`left`?``:`-`}4px);
}

.avatar-stack:hover .avatar:first-child {
  transform: translateX(0);
}`:``}

.avatar-overflow {
  display: grid;
  place-items: center;
  height: ${e.size}px;
  min-width: ${e.size}px;
  padding: 0 ${Math.round(e.size/5)}px;
  border-radius: ${e.shape===`circle`?`999px`:`${Math.round(e.size/5)}px`};
  border: ${e.ringWidth}px solid ${e.ringColor};
  background: #27272a;
  color: #fafafa;
  font-size: ${Math.round(e.size/3)}px;
  font-weight: 700;
  flex-shrink: 0;
  margin-left: ${e.overlap===`left`?`-${e.gap}px`:`0`};
}`}function C(e){let t=Math.min(7,Math.max(2,e.count));return`<div class="avatar-stack" aria-label="Avatar group">\n${x.slice(0,t).map((t,n)=>`  <span class="avatar" style="--from: ${e.gradientFrom}; --to: ${e.gradientTo}; filter: hue-rotate(${n*18}deg)">${t}</span>`).join(`
`)}${e.showOverflowBadge&&e.count>7?`\n  <span class="avatar-overflow">+${e.count-7}</span>`:``}\n</div>`}function w(e){return{"--avatar-from":e.gradientFrom,"--avatar-to":e.gradientTo,"--avatar-ring":e.ringColor}}function T(e,t){let n=Math.floor(t.range(0,360));return{...e,count:Math.round(t.range(3,10)),shape:t.chance(.7)?`circle`:`rounded`,size:Math.round(t.range(32,56)),gap:Math.round(t.range(8,18)),ringWidth:t.pick([0,2,3]),gradientFrom:`hsl(${n} 75% 55%)`,gradientTo:`hsl(${(n+60)%360} 75% 55%)`,hoverSpread:t.chance(.6)}}var E=[{name:`Emerald Stack`,tags:[`brand`],state:{...b}},{name:`Tight Circle`,tags:[`dense`],state:{...b,gap:10,count:7}},{name:`Squared Cards`,tags:[`squad`],state:{...b,shape:`rounded`,size:48}},{name:`Neon Rings`,tags:[`neon`],state:{...b,gradientFrom:`#22d3ee`,gradientTo:`#8b5cf6`,ringWidth:3}},{name:`Light Ring`,tags:[`light`],state:{...b,ringColor:`#f4f4f5`,size:40}},{name:`Spread Hover`,tags:[`interactive`],state:{...b,hoverSpread:!0,gap:16,size:48}},{name:`Overflow 12`,tags:[`badge`],state:{...b,count:12,size:36}},{name:`Warm Gradient`,tags:[`warm`],state:{...b,gradientFrom:`#f59e0b`,gradientTo:`#f43f5e`,shape:`rounded`}},{name:`No Rings`,tags:[`minimal`],state:{...b,ringWidth:0,gap:12}},{name:`Reversed`,tags:[`rtl`],state:{...b,overlap:`right`}}],D=[`innerHTML`],O={class:`flex h-full w-full max-w-2xl flex-col items-center justify-center gap-8 p-6`},k=[`innerHTML`],A={class:`grid grid-cols-2 gap-2`},j=[`aria-pressed`],M=[`aria-pressed`],N=n({__name:`avatar`,setup(n){let{state:x,randomize:N,reset:P,undo:F,redo:I,pushHistory:L,shareUrlRef:R}=g({id:`avatar`,defaultState:JSON.parse(JSON.stringify(b)),randomize:T}),z=r(`editor:shareUrl`,()=>{});s(()=>z(R.value));let B=i(()=>S(x.value)),V=i(()=>C(x.value)),H=i(()=>w(x.value)),U=i(()=>`<style>${B.value}</style>`);function W(e){x.value=JSON.parse(JSON.stringify(E[e].state)),L()}let G=i(()=>E.map(e=>({name:e.name,css:S(e.state),html:C(e.state)})));return(n,r)=>{let i=p,s=h,g=m,b=_,S=d,C=v,w=y,T=f;return o(),l(T,{title:`Avatar Stack`,description:`Overlapping avatar groups with rings and +N badge.`,css:u(B),html:u(V),vars:u(H),onRandomize:u(N),onReset:u(P),onUndo:u(F),onRedo:u(I)},{preview:c(()=>[e(s,{variants:u(G),onApplyVariant:W,title:`Avatar preview`,filename:`css-studio-avatar`},{presets:c(()=>[e(i,{presets:u(E),onApply:W},null,8,[`presets`])]),default:c(()=>[t(`div`,{innerHTML:u(U),"aria-hidden":`true`},null,8,D),t(`div`,O,[t(`div`,{innerHTML:u(V)},null,8,k),r[11]||=t(`p`,{class:`max-w-xs text-center text-[11px] text-muted`},`Hover the stack to see the spread interaction.`,-1)])]),_:1},8,[`variants`])]),controls:c(()=>[e(S,{label:`Stack`,icon:`ph-users-three`},{default:c(()=>[e(g,{modelValue:u(x).count,"onUpdate:modelValue":r[0]||=e=>u(x).count=e,label:`Avatars`,min:2,max:12},null,8,[`modelValue`]),e(g,{modelValue:u(x).size,"onUpdate:modelValue":r[1]||=e=>u(x).size=e,label:`Size`,min:28,max:60,suffix:`px`},null,8,[`modelValue`]),e(g,{modelValue:u(x).gap,"onUpdate:modelValue":r[2]||=e=>u(x).gap=e,label:`Overlap`,min:4,max:24,suffix:`px`},null,8,[`modelValue`]),t(`div`,A,[t(`button`,{type:`button`,class:a([`h-9 rounded-lg border text-xs font-medium transition-colors duration-150`,u(x).shape===`circle`?`border-accent/70 bg-accent/8 text-fg`:`border-line text-muted hover:bg-line/15`]),"aria-pressed":u(x).shape===`circle`,onClick:r[3]||=e=>u(x).shape=`circle`},`Circle`,10,j),t(`button`,{type:`button`,class:a([`h-9 rounded-lg border text-xs font-medium transition-colors duration-150`,u(x).shape===`rounded`?`border-accent/70 bg-accent/8 text-fg`:`border-line text-muted hover:bg-line/15`]),"aria-pressed":u(x).shape===`rounded`,onClick:r[4]||=e=>u(x).shape=`rounded`},`Rounded`,10,M)]),e(b,{modelValue:u(x).hoverSpread,"onUpdate:modelValue":r[5]||=e=>u(x).hoverSpread=e,label:`Spread on hover`},null,8,[`modelValue`]),e(b,{modelValue:u(x).showOverflowBadge,"onUpdate:modelValue":r[6]||=e=>u(x).showOverflowBadge=e,label:`+N overflow badge`},null,8,[`modelValue`])]),_:1}),e(S,{label:`Colors`,icon:`ph-palette`},{default:c(()=>[e(C,{"model-value":u(x).gradientFrom,label:`Gradient from`,"onUpdate:modelValue":r[7]||=e=>u(x).gradientFrom=e},null,8,[`model-value`]),e(C,{"model-value":u(x).gradientTo,label:`Gradient to`,"onUpdate:modelValue":r[8]||=e=>u(x).gradientTo=e},null,8,[`model-value`]),e(C,{"model-value":u(x).ringColor,label:`Ring`,"onUpdate:modelValue":r[9]||=e=>u(x).ringColor=e},null,8,[`model-value`]),e(g,{modelValue:u(x).ringWidth,"onUpdate:modelValue":r[10]||=e=>u(x).ringWidth=e,label:`Ring width`,min:0,max:5,suffix:`px`},null,8,[`modelValue`])]),_:1})]),code:c(()=>[e(w,{css:u(B),html:u(V),vars:u(H),filename:`css-studio-avatar`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{N as default};