import{A as e,C as t,M as n,R as r,S as i,X as a,ct as o,lt as s,w as c,wt as l}from"./MitKKUeq.js";import{a as u,i as d,n as f,r as p,s as m,t as h}from"./BPBkcUFJ.js";import{t as g}from"./D3e07OzS.js";import{t as _}from"./Dh2B6pZ8.js";import{t as v}from"./BYmGHvE7.js";import{t as y}from"./Cw1rlFxN.js";var b=[{value:`numbers`,label:`Numbers`},{value:`dots`,label:`Dots`},{value:`arrows`,label:`Arrows`},{value:`pill`,label:`Pill Track`}],x={kind:`numbers`,pages:6,active:2,accent:`#10b981`,bg:`#18181b`,textColor:`#fafafa`,size:36,radius:10,gap:6,glow:!1};function S(e){let t=`.pagination {
  display: flex;
  align-items: center;
  gap: ${e.gap}px;
}

.pagination button {
  display: grid;
  place-items: center;
  min-width: ${e.size}px;
  height: ${e.size}px;
  border: none;
  border-radius: ${e.kind===`dots`?`999px`:`${e.radius}px`};
  background: ${e.bg};
  color: ${e.textColor};
  font-size: ${Math.round(e.size/3)}px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 180ms ease,
    color 180ms ease,
    transform 180ms ease,
    box-shadow 180ms ease;
}

.pagination button:hover {
  background: ${e.accent}22;
  color: ${e.accent};
}

.pagination .page-active {
  background: ${e.accent};
  color: ${e.kind===`dots`?e.accent:e.bg};
  ${e.glow?`box-shadow: 0 0 14px ${e.accent}66;`:``}
}

.pagination .page-arrow {
  background: transparent;
  color: ${e.textColor}aa;
}

.pagination .page-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}`;return e.kind===`dots`?`${t}

.pagination .dot {
  width: ${Math.max(8,Math.round(e.size/3))}px;
  height: ${Math.max(8,Math.round(e.size/3))}px;
  padding: 0;
}

.pagination .dot.page-active {
  transform: scale(1.25);
}`:t}function C(e){return e.kind===`dots`?`<div class="pagination">\n${Array.from({length:e.pages},(t,n)=>`  <button class="dot${n+1===e.active?` page-active`:``}" aria-label="Page ${n+1}"></button>`).join(`
`)}\n</div>`:`<div class="pagination">
  <button class="page-arrow" aria-label="Previous">‹</button>
${Array.from({length:e.pages},(t,n)=>`  <button${n+1===e.active?` class="page-active"`:``} aria-label="Page ${n+1}">${e.kind===`pill`?String(n+1).padStart(2,`0`):n+1}</button>`).join(`
`)}
  <button class="page-arrow" aria-label="Next">›</button>
</div>`}function w(e){return{"--page-accent":e.accent,"--page-bg":e.bg,"--page-active":String(e.active)}}function T(e,t){let n=b.map(e=>e.value),r=Math.floor(t.range(0,360));return{...e,kind:t.pick(n),pages:Math.round(t.range(4,10)),active:Math.round(t.range(1,5)),accent:`hsl(${r} 78% 52%)`,bg:`hsl(${r} 10% 12%)`,radius:t.pick([0,6,10,999]),size:Math.round(t.range(30,44)),glow:t.chance(.4)}}var E=[{name:`Emerald Numbers`,tags:[`brand`],state:{...x}},{name:`Glow Dots`,tags:[`glow`,`carousel`],state:{...x,kind:`dots`,pages:5,accent:`#22d3ee`,glow:!0}},{name:`Pill Track`,tags:[`zero-padded`],state:{...x,kind:`pill`,pages:8,radius:999,accent:`#8b5cf6`}},{name:`Sharp Numbers`,tags:[`mono`],state:{...x,radius:0,accent:`#f59e0b`}},{name:`Circle Active`,tags:[`circle`],state:{...x,radius:999,size:40,glow:!0}},{name:`Minimal Dots`,tags:[`minimal`],state:{...x,kind:`dots`,accent:`#a1a1aa`,glow:!1,pages:7}},{name:`Warm Numbers`,tags:[`warm`],state:{...x,accent:`#f43f5e`,bg:`#27272a`}},{name:`Light Mode`,tags:[`light`],state:{...x,bg:`#f4f4f5`,textColor:`#18181b`}}],D=[`innerHTML`],O={class:`flex h-full w-full max-w-2xl flex-col items-center justify-center gap-8 p-6`},k=[`innerHTML`],A=n({__name:`pagination`,setup(n){let{state:A,randomize:j,reset:M,undo:N,redo:P,pushHistory:F,shareUrlRef:I}=h({id:`pagination`,defaultState:JSON.parse(JSON.stringify(x)),randomize:T}),L=r(`editor:shareUrl`,()=>{});o(()=>L(I.value));let R=i(()=>S(A.value)),z=i(()=>C(A.value)),B=i(()=>w(A.value)),V=i(()=>`<style>${R.value}</style>`);function H(e){A.value=JSON.parse(JSON.stringify(E[e].state)),F()}let U=i(()=>E.map(e=>({name:e.name,css:S(e.state),html:C(e.state)})));return(n,r)=>{let i=m,o=u,h=g,x=d,S=_,C=p,w=v,T=y,F=f;return a(),c(F,{title:`Pagination Builder`,description:`Dots, arrows, number pills and active glow states.`,css:l(R),html:l(z),vars:l(B),onRandomize:l(j),onReset:l(M),onUndo:l(N),onRedo:l(P)},{preview:s(()=>[e(o,{variants:l(U),onApplyVariant:H,title:`Pagination preview`,filename:`css-studio-pagination`},{presets:s(()=>[e(i,{presets:l(E),onApply:H},null,8,[`presets`])]),default:s(()=>[t(`div`,{innerHTML:l(V),"aria-hidden":`true`},null,8,D),t(`div`,O,[t(`div`,{innerHTML:l(z)},null,8,k),r[10]||=t(`p`,{class:`max-w-xs text-center text-[11px] text-muted`},`Hover the buttons to preview hover states.`,-1)])]),_:1},8,[`variants`])]),controls:s(()=>[e(C,{label:`Pagination`,icon:`ph-dots-three`},{default:s(()=>[e(h,{modelValue:l(A).kind,"onUpdate:modelValue":r[0]||=e=>l(A).kind=e,label:`Style`,options:l(b)},null,8,[`modelValue`,`options`]),e(x,{modelValue:l(A).pages,"onUpdate:modelValue":r[1]||=e=>l(A).pages=e,label:`Pages`,min:3,max:12},null,8,[`modelValue`]),e(x,{modelValue:l(A).active,"onUpdate:modelValue":r[2]||=e=>l(A).active=e,label:`Active page`,min:1,max:12},null,8,[`modelValue`]),e(x,{modelValue:l(A).size,"onUpdate:modelValue":r[3]||=e=>l(A).size=e,label:`Button size`,min:24,max:52,suffix:`px`},null,8,[`modelValue`]),e(x,{modelValue:l(A).radius,"onUpdate:modelValue":r[4]||=e=>l(A).radius=e,label:`Radius`,min:0,max:999,suffix:`px`},null,8,[`modelValue`]),e(x,{modelValue:l(A).gap,"onUpdate:modelValue":r[5]||=e=>l(A).gap=e,label:`Gap`,min:2,max:16,suffix:`px`},null,8,[`modelValue`]),e(S,{modelValue:l(A).glow,"onUpdate:modelValue":r[6]||=e=>l(A).glow=e,label:`Glow active`},null,8,[`modelValue`])]),_:1}),e(C,{label:`Colors`,icon:`ph-palette`},{default:s(()=>[e(w,{"model-value":l(A).accent,label:`Active`,"onUpdate:modelValue":r[7]||=e=>l(A).accent=e},null,8,[`model-value`]),e(w,{"model-value":l(A).bg,label:`Buttons`,"onUpdate:modelValue":r[8]||=e=>l(A).bg=e},null,8,[`model-value`]),e(w,{"model-value":l(A).textColor,label:`Text`,"onUpdate:modelValue":r[9]||=e=>l(A).textColor=e},null,8,[`model-value`])]),_:1})]),code:s(()=>[e(T,{css:l(R),html:l(z),vars:l(B),filename:`css-studio-pagination`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{A as default};