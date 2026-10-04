import{A as e,C as t,E as n,Kt as r,M as i,Q as a,R as o,S as s,T as c,X as l,_ as u,ct as d,k as f,lt as p,w as m,wt as h}from"./MitKKUeq.js";import{s as ee}from"#entry";import{a as te,i as g,l as _,o as v,s as y,t as b}from"./CJu4WcQG.js";import{t as x}from"./D3e07OzS.js";import{t as S}from"./Dh2B6pZ8.js";import{i as C,l as w}from"./Rl_HAT4u.js";import{t as T}from"./BYmGHvE7.js";import{t as E}from"./o8u_Jv9o.js";import{t as D}from"./CcuAq1zZ.js";var O=[{value:`smooth`,label:`Smooth (auto layers)`},{value:`custom`,label:`Custom layers`},{value:`text`,label:`Text shadow`}],k={mode:`smooth`,elevation:24,steps:5,softness:2,darkness:18,angle:0,shadowColor:`#0f172a`,layers:[{x:0,y:18,blur:40,spread:-12,color:`#00000059`,inset:!1}],radius:16,surface:`#ffffff`,stage:`#eef0f4`,text:`Shadow`,hoverLift:!1},A=/^#[0-9a-f]{6}$/i;function j(e){let t=e.kind,n={...k,...e};return O.some(e=>e.value===n.mode)||(n.mode=t===`text`?`text`:t===`box`?`custom`:`smooth`),(!Array.isArray(n.layers)||!n.layers.length)&&(n.layers=k.layers),n.steps=Math.min(8,Math.max(1,Math.round(n.steps))),n}var M=(e,t)=>{if(!A.test(e))return`rgb(0 0 0 / ${t.toFixed(3)})`;let{r:n,g:r,b:i}=C(e);return`rgb(${n} ${r} ${i} / ${+t.toFixed(3)})`};function N(e){let t=e.steps,n=e.angle*Math.PI/180,r=-Math.sin(n),i=Math.cos(n),a=e.darkness/100*(1.6/Math.sqrt(t));return Array.from({length:t},(n,o)=>{let s=e.elevation*2**o/2**(t-1);return{x:+(r*s).toFixed(1),y:+(i*s).toFixed(1),blur:+(s*e.softness).toFixed(1),spread:0,color:M(e.shadowColor,Math.min(1,a*(1-o/t*.35))),inset:!1}})}function P(e,t=`box`){return e.map(e=>`${e.inset&&t===`box`?`inset `:``}${e.x}px ${e.y}px ${e.blur}px${t===`box`?` ${e.spread}px`:``} ${e.color}`).join(`,
    `)}function F(e){return e.mode===`smooth`?N(e):e.layers}function I(e){let t=j(e),n=w(t.stage);if(t.mode===`text`)return`.shadow-stage {
  display: grid;
  place-items: center;
  min-height: 20rem;
  padding: 3rem;
  border-radius: 20px;
  background: ${t.stage};
}

.text-shadow {
  margin: 0;
  color: ${t.surface};
  font: 800 clamp(3rem, 9vw, 6rem)/1 system-ui, -apple-system, 'Segoe UI', sans-serif;
  letter-spacing: -0.04em;
  text-shadow:
    ${P(t.layers,`text`)};
}`;let r=F(t),i=t.mode===`smooth`?N({...t,elevation:t.elevation*1.8}):r.map(e=>({...e,y:e.y*1.6,blur:e.blur*1.5})),a=w(t.surface),o=t.hoverLift?`

/* Fades in a deeper shadow on a pseudo-element: opacity animates on the compositor, box-shadow would repaint. */
.shadow-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow:
    ${P(i)};
  opacity: 0;
  transition: opacity 200ms ease-out;
  pointer-events: none;
}

@media (hover: hover) and (pointer: fine) {
  .shadow-card:hover {
    translate: 0 -3px;
  }

  .shadow-card:hover::after {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .shadow-card,
  .shadow-card::after {
    transition-duration: 1ms;
  }
}`:``;return`.shadow-stage {
  display: grid;
  place-items: center;
  min-height: 20rem;
  padding: 3rem;
  border-radius: 20px;
  background: ${t.stage};
  color: ${n};
}

.shadow-card {
  position: relative;
  display: grid;
  gap: 0.5rem;
  width: min(20rem, 100%);
  padding: 1.75rem;
  border-radius: ${t.radius}px;
  background: ${t.surface};
  color: ${a};
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  box-shadow:
    ${P(r)};${t.hoverLift?`
  transition: translate 200ms ease-out;`:``}
}

.shadow-card h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.shadow-card p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  opacity: 0.7;
}${o}`}function L(e){let t=j(e);return t.mode===`text`?`<div class="shadow-stage">\n  <h2 class="text-shadow">${(e=>e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`))(t.text||`Shadow`)}</h2>\n</div>`:`<div class="shadow-stage">
  <article class="shadow-card">
    <h3>Quarterly report</h3>
    <p>${t.mode===`smooth`?`${t.steps} stacked layers fall off the way real light does.`:`Hand-tuned shadow layers.`}</p>
  </article>
</div>`}function R(e){let t=j(e);return{"--shadow-radius":`${t.radius}px`,"--shadow":P(F(t),t.mode===`text`?`text`:`box`).replace(/\n\s*/g,` `)}}function z(e,t){let n=j(e);if(n.mode!==`smooth`){let e=Array.from({length:t.int(1,3)},()=>({x:Math.round(t.range(-12,12)),y:Math.round(t.range(4,32)),blur:Math.round(t.range(10,60)),spread:Math.round(t.range(-14,4)),color:t.pick([`#00000040`,`#0f766e55`,`#1e293b55`,`#4338ca44`]),inset:!1}));return{...n,layers:e}}return{...n,elevation:Math.round(t.range(6,48)),steps:t.int(3,7),softness:t.pick([1.5,2,2.5,3]),darkness:Math.round(t.range(10,30)),angle:t.pick([0,0,330,30]),shadowColor:t.pick([`#0f172a`,`#1e1b4b`,`#3f1d0b`,`#022c22`])}}var B=e=>({...k,...e}),V=(e,t,n,r,i,a=!1)=>({x:e,y:t,blur:n,spread:r,color:i,inset:a}),H=[{name:`Smooth Medium`,tags:[`smooth`],state:B({})},{name:`Smooth Subtle`,tags:[`smooth`],state:B({elevation:8,steps:4,darkness:12})},{name:`Smooth Large`,tags:[`smooth`],state:B({elevation:48,steps:6,darkness:22,softness:2.5})},{name:`Floating`,tags:[`smooth`],state:B({elevation:64,steps:7,darkness:16,softness:3,hoverLift:!0})},{name:`Crisp`,tags:[`smooth`],state:B({elevation:12,steps:3,softness:1,darkness:24})},{name:`Indigo Tint`,tags:[`smooth`,`tinted`],state:B({shadowColor:`#3730a3`,stage:`#eef2ff`,darkness:26,elevation:32})},{name:`Warm Tint`,tags:[`smooth`,`tinted`],state:B({shadowColor:`#7c2d12`,stage:`#fdf4ec`,surface:`#fffaf5`,darkness:22})},{name:`Side Light`,tags:[`smooth`],state:B({angle:300,elevation:28})},{name:`Dark UI`,tags:[`smooth`,`dark`],state:B({stage:`#0c0c0e`,surface:`#1c1c21`,shadowColor:`#000000`,darkness:60,elevation:28})},{name:`Hover Lift`,tags:[`interactive`],state:B({hoverLift:!0,elevation:10,steps:4})},{name:`Material 2dp`,tags:[`custom`],state:B({mode:`custom`,layers:[V(0,1,3,0,`#0000001f`),V(0,1,2,0,`#0000003d`)]})},{name:`Material 8dp`,tags:[`custom`],state:B({mode:`custom`,layers:[V(0,8,10,1,`#00000024`),V(0,3,14,2,`#0000001f`),V(0,5,5,-3,`#00000033`)]})},{name:`Hard Offset`,tags:[`custom`,`brutal`],state:B({mode:`custom`,radius:6,stage:`#fef3c7`,surface:`#ffffff`,layers:[V(6,6,0,0,`#111111`)]})},{name:`Neon Halo`,tags:[`custom`,`glow`],state:B({mode:`custom`,radius:20,stage:`#09090b`,surface:`#111114`,layers:[V(0,0,8,1,`#34d399aa`),V(0,0,32,4,`#34d39966`),V(0,0,80,12,`#34d39933`)]})},{name:`Inset Well`,tags:[`custom`,`inset`],state:B({mode:`custom`,surface:`#f1f3f7`,layers:[V(0,2,6,0,`#0000002e`,!0),V(0,-1,0,0,`#ffffffcc`,!0)]})},{name:`Focus Ring`,tags:[`custom`],state:B({mode:`custom`,layers:[V(0,0,0,3,`#6366f155`),V(0,0,0,1,`#6366f1`),V(0,10,24,-8,`#0000003a`)]})},{name:`Long Text`,tags:[`text`],state:B({mode:`text`,stage:`#0f766e`,surface:`#ffffff`,layers:((e,t)=>Array.from({length:e},(e,n)=>V(n+1,n+1,0,0,t)))(18,`#0b5d56`)})},{name:`Retro 3D`,tags:[`text`],state:B({mode:`text`,stage:`#fde68a`,surface:`#f43f5e`,layers:[V(3,3,0,0,`#111111`),V(6,6,0,0,`#38bdf8`),V(9,9,0,0,`#111111`)]})},{name:`Neon Text`,tags:[`text`,`glow`],state:B({mode:`text`,stage:`#09090b`,surface:`#f0abfc`,layers:[V(0,0,4,0,`#f0abfc`),V(0,0,16,0,`#d946ef`),V(0,0,48,0,`#a21caf`)]})},{name:`Embossed`,tags:[`text`],state:B({mode:`text`,stage:`#d4d4d8`,surface:`#d4d4d8`,layers:[V(-1,-1,0,0,`#ffffff`),V(2,2,3,0,`#00000040`)]})}],U=[`innerHTML`],W={class:`flex h-full w-full items-center justify-center p-6`},G=[`innerHTML`],K={class:`flex items-center justify-between`},q={class:`text-xs font-medium text-fg`},J=[`disabled`,`aria-label`,`onClick`],Y=i({__name:`shadow`,setup(i){let{state:C,randomize:w,reset:A,undo:M,redo:P,pushHistory:F,shareUrlRef:B}=b({id:`shadow`,defaultState:JSON.parse(JSON.stringify(k)),randomize:z,deserialize:e=>j(e)}),V=o(`editor:shareUrl`,()=>{});d(()=>V(B.value));let Y=s(()=>I(C.value)),X=s(()=>L(C.value)),Z=s(()=>R(C.value)),ne=s(()=>`<style>${Y.value}</style>`);function Q(e){C.value=JSON.parse(JSON.stringify(H[e].state)),F()}function re(){C.value={...C.value,mode:`custom`,layers:N(j(C.value))},F()}function ie(){C.value={...C.value,layers:[...C.value.layers,{x:0,y:10,blur:20,spread:0,color:`#00000040`,inset:!1}]}}function ae(e){C.value.layers.length<=1||(C.value={...C.value,layers:C.value.layers.filter((t,n)=>n!==e)})}function $(e,t){C.value={...C.value,layers:C.value.layers.map((n,r)=>r===e?{...n,...t}:n)}}let oe=s(()=>H.map(e=>({name:e.name,css:I(e.state),html:L(e.state)})));return(i,o)=>{let s=_,d=y,b=x,k=D,j=v,N=S,F=te,I=T,L=ee,R=E,z=g;return l(),m(z,{title:`Shadow Generator`,description:`Smooth layered box shadows, custom shadow stacks and text shadows.`,css:h(Y),html:h(X),vars:h(Z),onRandomize:h(w),onReset:h(A),onUndo:h(M),onRedo:h(P)},{preview:p(()=>[e(d,{variants:h(oe),title:`Shadow preview`,filename:`css-studio-shadow`,onApplyVariant:Q},{presets:p(()=>[e(s,{presets:h(H),onApply:Q},null,8,[`presets`])]),default:p(()=>[t(`div`,{innerHTML:h(ne),"aria-hidden":`true`},null,8,U),t(`div`,W,[t(`div`,{class:`w-full max-w-2xl`,innerHTML:h(X)},null,8,G)])]),_:1},8,[`variants`])]),controls:p(()=>[e(F,{label:`Type`,icon:`ph-square-half`},{default:p(()=>[e(b,{modelValue:h(C).mode,"onUpdate:modelValue":o[0]||=e=>h(C).mode=e,label:`Mode`,options:h(O)},null,8,[`modelValue`,`options`]),h(C).mode===`text`?(l(),m(k,{key:0,modelValue:h(C).text,"onUpdate:modelValue":o[1]||=e=>h(C).text=e,label:`Text`},null,8,[`modelValue`])):(l(),m(j,{key:1,modelValue:h(C).radius,"onUpdate:modelValue":o[2]||=e=>h(C).radius=e,label:`Card radius`,min:0,max:48,suffix:`px`},null,8,[`modelValue`])),h(C).mode===`text`?c(``,!0):(l(),m(N,{key:2,modelValue:h(C).hoverLift,"onUpdate:modelValue":o[3]||=e=>h(C).hoverLift=e,label:`Lift on hover`},null,8,[`modelValue`]))]),_:1}),h(C).mode===`smooth`?(l(),m(F,{key:0,label:`Smooth shadow`,icon:`ph-stack`},{default:p(()=>[e(j,{modelValue:h(C).elevation,"onUpdate:modelValue":o[4]||=e=>h(C).elevation=e,label:`Elevation`,min:2,max:96,suffix:`px`},null,8,[`modelValue`]),e(j,{modelValue:h(C).steps,"onUpdate:modelValue":o[5]||=e=>h(C).steps=e,label:`Layers`,min:1,max:8},null,8,[`modelValue`]),e(j,{modelValue:h(C).softness,"onUpdate:modelValue":o[6]||=e=>h(C).softness=e,label:`Softness`,min:.5,max:4,step:.25,suffix:`x`},null,8,[`modelValue`]),e(j,{modelValue:h(C).darkness,"onUpdate:modelValue":o[7]||=e=>h(C).darkness=e,label:`Darkness`,min:4,max:80,suffix:`%`},null,8,[`modelValue`]),e(j,{modelValue:h(C).angle,"onUpdate:modelValue":o[8]||=e=>h(C).angle=e,label:`Light from (0 = top)`,min:0,max:359,suffix:`°`},null,8,[`modelValue`]),e(I,{"model-value":h(C).shadowColor,label:`Shadow tint`,"onUpdate:modelValue":o[9]||=e=>h(C).shadowColor=e},null,8,[`model-value`]),t(`button`,{type:`button`,class:`inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-line text-xs font-medium text-muted transition-colors duration-150 hover:border-accent/60 hover:text-fg active:scale-[0.98]`,onClick:re},[e(L,{name:`ph-pencil-simple`,size:13}),o[12]||=f(` Edit as custom layers `,-1)])]),_:1})):(l(),m(F,{key:1,label:`Layers`,icon:`ph-stack`},{default:p(()=>[(l(!0),n(u,null,a(h(C).layers,(i,a)=>(l(),n(`div`,{key:a,class:`flex flex-col gap-2.5 rounded-lg border border-line bg-bg p-3`},[t(`div`,K,[t(`span`,q,`Layer `+r(a+1),1),t(`button`,{class:`inline-flex h-6 w-6 items-center justify-center rounded-md text-muted transition-colors duration-150 hover:bg-rose-500/10 hover:text-rose-400 disabled:opacity-30 disabled:hover:bg-transparent`,disabled:h(C).layers.length<=1,"aria-label":`Remove layer ${a+1}`,onClick:e=>ae(a)},[e(L,{name:`ph-x`,size:13})],8,J)]),e(j,{"model-value":i.x,label:`X`,min:-60,max:60,suffix:`px`,"onUpdate:modelValue":e=>$(a,{x:e})},null,8,[`model-value`,`onUpdate:modelValue`]),e(j,{"model-value":i.y,label:`Y`,min:-60,max:60,suffix:`px`,"onUpdate:modelValue":e=>$(a,{y:e})},null,8,[`model-value`,`onUpdate:modelValue`]),e(j,{"model-value":i.blur,label:`Blur`,min:0,max:160,suffix:`px`,"onUpdate:modelValue":e=>$(a,{blur:e})},null,8,[`model-value`,`onUpdate:modelValue`]),h(C).mode===`custom`?(l(),m(j,{key:0,"model-value":i.spread,label:`Spread`,min:-30,max:60,suffix:`px`,"onUpdate:modelValue":e=>$(a,{spread:e})},null,8,[`model-value`,`onUpdate:modelValue`])):c(``,!0),e(I,{"model-value":i.color,label:`Layer ${a+1} color`,"onUpdate:modelValue":e=>$(a,{color:e})},null,8,[`model-value`,`label`,`onUpdate:modelValue`]),h(C).mode===`custom`?(l(),m(N,{key:1,"model-value":i.inset,label:`Inset`,"onUpdate:modelValue":e=>$(a,{inset:e})},null,8,[`model-value`,`onUpdate:modelValue`])):c(``,!0)]))),128)),t(`button`,{class:`inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-dashed border-line text-xs font-medium text-muted transition-[color,border-color] duration-150 hover:border-accent/60 hover:text-fg`,onClick:ie},[e(L,{name:`ph-plus`,size:13}),o[13]||=f(` Add layer `,-1)])]),_:1})),e(F,{label:`Colors`,icon:`ph-palette`},{default:p(()=>[e(I,{"model-value":h(C).surface,label:h(C).mode===`text`?`Text color`:`Card surface`,"onUpdate:modelValue":o[10]||=e=>h(C).surface=e},null,8,[`model-value`,`label`]),e(I,{"model-value":h(C).stage,label:`Background`,"onUpdate:modelValue":o[11]||=e=>h(C).stage=e},null,8,[`model-value`])]),_:1})]),code:p(()=>[e(R,{css:h(Y),html:h(X),vars:h(Z),filename:`css-studio-shadow`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{Y as default};