import{A as e,C as t,E as n,Kt as r,M as i,Q as a,R as o,S as s,T as c,Ut as l,X as u,_ as d,ct as f,k as p,lt as m,tt as h,w as g,wt as _}from"./C_OraKES.js";import{a as v}from"#entry";import{a as y,i as b,n as x,o as S,r as C,t as w}from"./B53n1bRJ.js";import{t as T}from"./ClNnhmls.js";import{t as E}from"./B-AWq6Bn.js";import{t as D}from"./C7qZUNCt.js";var O=[{value:`spinner`,label:`Spinner`},{value:`dots`,label:`Bouncing Dots`},{value:`bars`,label:`Bars`},{value:`ring`,label:`Dual Ring`},{value:`pulse`,label:`Pulse`},{value:`progress`,label:`Progress Bar`},{value:`skeleton`,label:`Skeleton Shimmer`},{value:`wave`,label:`Wave Bars`},{value:`orbit`,label:`Orbit Dots`},{value:`ripple`,label:`Ripple`},{value:`square`,label:`Square Morph`}],k={kind:`spinner`,color:`#10b981`,trackColor:`#27272a`,size:48,thickness:4,speed:.8,count:3,progress:60};function A(e){return`loader-${e}`}function j(e){let t=A(e.kind);switch(e.kind){case`spinner`:return`.${t} {
  width: ${e.size}px;
  height: ${e.size}px;
  border: ${e.thickness}px solid ${e.trackColor};
  border-top-color: ${e.color};
  border-radius: 50%;
  animation: ${t}-spin ${e.speed}s linear infinite;
}

@keyframes ${t}-spin {
  to { transform: rotate(360deg); }
}`;case`ring`:return`.${t} {
  width: ${e.size}px;
  height: ${e.size}px;
  border-radius: 50%;
  border: ${e.thickness}px solid transparent;
  border-top-color: ${e.color};
  border-bottom-color: ${e.color};
  animation: ${t}-spin ${e.speed}s linear infinite;
}

@keyframes ${t}-spin {
  to { transform: rotate(360deg); }
}`;case`dots`:return`.${t} {
  display: flex;
  gap: ${Math.round(e.size*.2)}px;
}

.${t} span {
  width: ${Math.round(e.size*.28)}px;
  height: ${Math.round(e.size*.28)}px;
  border-radius: 50%;
  background: ${e.color};
  animation: ${t}-bounce ${e.speed}s ease-in-out infinite;
}

.${t} span:nth-child(2) { animation-delay: ${(e.speed/3).toFixed(2)}s; }
.${t} span:nth-child(3) { animation-delay: ${(e.speed/3*2).toFixed(2)}s; }

@keyframes ${t}-bounce {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
}`;case`bars`:return`.${t} {
  display: flex;
  align-items: center;
  gap: ${Math.round(e.size*.12)}px;
  height: ${e.size}px;
}

.${t} span {
  width: ${Math.round(e.size*.16)}px;
  height: 40%;
  background: ${e.color};
  border-radius: 2px;
  animation: ${t}-scale ${e.speed}s ease-in-out infinite;
}

.${t} span:nth-child(2) { animation-delay: ${(e.speed/5).toFixed(2)}s; }
.${t} span:nth-child(3) { animation-delay: ${(e.speed/5*2).toFixed(2)}s; }
.${t} span:nth-child(4) { animation-delay: ${(e.speed/5*3).toFixed(2)}s; }
.${t} span:nth-child(5) { animation-delay: ${(e.speed/5*4).toFixed(2)}s; }

@keyframes ${t}-scale {
  0%, 100% { height: 40%; }
  50% { height: 100%; }
}`;case`pulse`:return`.${t} {
  width: ${e.size}px;
  height: ${e.size}px;
  border-radius: 50%;
  background: ${e.color};
  animation: ${t}-pulse ${e.speed*1.5}s ease-in-out infinite;
}

@keyframes ${t}-pulse {
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(1.8); opacity: 0; }
}`;case`progress`:return`.${t} {
  width: ${e.size*4}px;
  height: ${e.thickness*2}px;
  background: ${e.trackColor};
  border-radius: 999px;
  overflow: hidden;
}

.${t}-bar {
  height: 100%;
  width: ${Math.round(e.progress)}%;
  background: ${e.color};
  border-radius: 999px;
  transition: width 0.3s ease;
}`;case`skeleton`:return`.${t} {
  width: ${e.size*4}px;
  height: ${e.size}px;
  border-radius: 8px;
  background: linear-gradient(90deg, ${e.trackColor} 25%, ${e.color}33 50%, ${e.trackColor} 75%);
  background-size: 200% 100%;
  animation: ${t}-shimmer ${e.speed*2}s ease-in-out infinite;
}

@keyframes ${t}-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`;case`wave`:return`.${t} {
  display: flex;
  align-items: flex-end;
  gap: ${Math.round(e.size*.1)}px;
  height: ${e.size}px;
}

.${t} span {
  width: ${Math.round(e.size*.14)}px;
  height: 20%;
  background: ${e.color};
  border-radius: 999px;
  animation: ${t}-wave ${e.speed}s ease-in-out infinite;
}

.${t} span:nth-child(2) { animation-delay: ${(e.speed/6).toFixed(2)}s; }
.${t} span:nth-child(3) { animation-delay: ${(e.speed/6*2).toFixed(2)}s; }
.${t} span:nth-child(4) { animation-delay: ${(e.speed/6*3).toFixed(2)}s; }
.${t} span:nth-child(5) { animation-delay: ${(e.speed/6*4).toFixed(2)}s; }
.${t} span:nth-child(6) { animation-delay: ${(e.speed/6*5).toFixed(2)}s; }

@keyframes ${t}-wave {
  0%, 100% { height: 20%; }
  50% { height: 100%; }
}`;case`orbit`:return`.${t} {
  position: relative;
  width: ${e.size}px;
  height: ${e.size}px;
  animation: ${t}-spin ${e.speed*2}s linear infinite;
}

.${t} span {
  position: absolute;
  top: 0;
  left: 50%;
  width: ${Math.round(e.size*.18)}px;
  height: ${Math.round(e.size*.18)}px;
  margin-left: -${Math.round(e.size*.09)}px;
  border-radius: 50%;
  background: ${e.color};
}

.${t} span:nth-child(2) {
  top: auto;
  bottom: 0;
  opacity: 0.4;
}

@keyframes ${t}-spin {
  to { transform: rotate(360deg); }
}`;case`ripple`:return`.${t} {
  position: relative;
  width: ${e.size}px;
  height: ${e.size}px;
}

.${t} span {
  position: absolute;
  inset: 0;
  border: ${e.thickness}px solid ${e.color};
  border-radius: 50%;
  opacity: 0;
  animation: ${t}-ripple ${e.speed*2}s ease-out infinite;
}

.${t} span:nth-child(2) {
  animation-delay: ${e.speed}s;
}

@keyframes ${t}-ripple {
  0% { transform: scale(0.3); opacity: 1; }
  100% { transform: scale(1); opacity: 0; }
}`;case`square`:return`.${t} {
  width: ${e.size}px;
  height: ${e.size}px;
  background: ${e.color};
  animation: ${t}-morph ${e.speed*2}s ease-in-out infinite;
}

@keyframes ${t}-morph {
  0%, 100% { border-radius: 0%; transform: rotate(0deg); }
  50% { border-radius: 50%; transform: rotate(180deg); }
}`}}function M(e){let t=A(e.kind);switch(e.kind){case`spinner`:case`ring`:case`pulse`:case`skeleton`:return`<div class="${t}"></div>`;case`dots`:return`<div class="${t}">\n  <span></span>\n  <span></span>\n  <span></span>\n</div>`;case`bars`:case`wave`:return`<div class="${t}">\n  <span></span>\n  <span></span>\n  <span></span>\n  <span></span>\n  <span></span>\n</div>`;case`progress`:return`<div class="${t}">\n  <div class="${t}-bar"></div>\n</div>`;case`orbit`:case`ripple`:return`<div class="${t}">\n  <span></span>\n  <span></span>\n</div>`;case`square`:return`<div class="${t}"></div>`}}function N(e){return{"--loader-color":e.color,"--loader-track":e.trackColor,"--loader-size":`${e.size}px`,"--loader-speed":`${e.speed}s`}}function P(e,t){let n=Math.floor(t.range(0,360)),r=O.map(e=>e.value);return{...e,kind:t.pick(r),color:`hsl(${n} 85% 55%)`,size:Math.round(t.range(32,64)),thickness:Math.round(t.range(2,6)),speed:Number(t.range(.5,1.6).toFixed(2)),progress:Math.round(t.range(20,90))}}var F=[{name:`Emerald Spin`,tags:[`spinner`,`brand`],state:{...k,kind:`spinner`}},{name:`Dual Ring`,tags:[`ring`],state:{...k,kind:`ring`,color:`#06b6d4`,speed:1}},{name:`Bouncing Dots`,tags:[`dots`,`playful`],state:{...k,kind:`dots`,color:`#f59e0b`,speed:1.2}},{name:`Audio Bars`,tags:[`bars`],state:{...k,kind:`bars`,color:`#8b5cf6`,speed:.9}},{name:`Soft Pulse`,tags:[`pulse`,`soft`],state:{...k,kind:`pulse`,color:`#ec4899`,speed:1}},{name:`Upload Progress`,tags:[`progress`],state:{...k,kind:`progress`,color:`#10b981`,progress:72}},{name:`Skeleton Row`,tags:[`skeleton`,`loading`],state:{...k,kind:`skeleton`,color:`#71717a`,trackColor:`#27272a`,speed:1.4}},{name:`Fast Spinner`,tags:[`spinner`,`fast`],state:{...k,kind:`spinner`,color:`#38bdf8`,speed:.5,thickness:3}},{name:`Rose Ring`,tags:[`ring`,`warm`],state:{...k,kind:`ring`,color:`#f43f5e`,thickness:5,speed:1.1}},{name:`Dark Skeleton`,tags:[`skeleton`,`dark`],state:{...k,kind:`skeleton`,color:`#3f3f46`,trackColor:`#18181b`,speed:1.6}},{name:`Sound Wave`,tags:[`wave`,`audio`],state:{...k,kind:`wave`,color:`#22d3ee`,speed:1}},{name:`Orbit Dots`,tags:[`orbit`],state:{...k,kind:`orbit`,color:`#a78bfa`,speed:1.2}},{name:`Radar Ripple`,tags:[`ripple`],state:{...k,kind:`ripple`,color:`#10b981`,thickness:2,speed:1}},{name:`Morphing Square`,tags:[`square`,`playful`],state:{...k,kind:`square`,color:`#f97316`,speed:1}}],I={class:`flex h-[420px] w-full max-w-3xl items-center justify-center`},L=i({__name:`loader`,setup(i){let{state:A,randomize:L,reset:R,undo:z,redo:B,pushHistory:V,shareUrlRef:H}=w({id:`loader`,defaultState:JSON.parse(JSON.stringify(k)),randomize:P}),U=o(`editor:shareUrl`,()=>{});f(()=>U(H.value));let W=s(()=>j(A.value)),G=s(()=>M(A.value)),K=s(()=>N(A.value)),q=s(()=>[`dots`,`bars`,`wave`,`orbit`,`ripple`].includes(A.value.kind)),J=s(()=>A.value.kind===`dots`?3:A.value.kind===`bars`||A.value.kind===`wave`?5:A.value.kind===`orbit`||A.value.kind===`ripple`?2:3);function Y(e){A.value=JSON.parse(JSON.stringify(F[e].state)),V()}return v({title:`Loader - CSS Studio`}),(i,o)=>{let s=S,f=y,v=T,w=D,k=E,j=b,M=C,N=x;return u(),g(N,{title:`Loader Generator`,description:`CSS-only spinners, progress bars and skeleton shimmer.`,css:_(W),html:_(G),vars:_(K),onRandomize:_(L),onReset:_(R),onUndo:_(z),onRedo:_(B)},{preview:m(()=>[e(f,{title:`Loader preview`,filename:`css-studio-loader`},{presets:m(()=>[e(s,{presets:_(F),onApply:Y},null,8,[`presets`])]),default:m(()=>[t(`div`,I,[(u(),g(h(`style`),null,{default:m(()=>[p(r(_(W)),1)]),_:1})),_(A).kind===`progress`?(u(),n(`div`,{key:0,class:l(`loader-${_(A).kind}`),"aria-label":`Loader preview`},[t(`div`,{class:l(`loader-${_(A).kind}-bar`)},null,2)],2)):_(q)?(u(),n(`div`,{key:1,class:l(`loader-${_(A).kind}`),"aria-label":`Loader preview`},[(u(!0),n(d,null,a(_(J),e=>(u(),n(`span`,{key:e}))),128))],2)):(u(),n(`div`,{key:2,class:l(`loader-${_(A).kind}`),"aria-label":`Loader preview`},null,2))])]),_:1})]),controls:m(()=>[e(j,{label:`Loader`,icon:`ph-spinner-gap`},{default:m(()=>[e(v,{modelValue:_(A).kind,"onUpdate:modelValue":o[0]||=e=>_(A).kind=e,label:`Type`,options:_(O)},null,8,[`modelValue`,`options`]),e(w,{"model-value":_(A).color,label:`Color`,"onUpdate:modelValue":o[1]||=e=>_(A).color=e},null,8,[`model-value`]),_(A).kind===`spinner`||_(A).kind===`progress`||_(A).kind===`skeleton`?(u(),g(w,{key:0,"model-value":_(A).trackColor,label:`Track color`,"onUpdate:modelValue":o[2]||=e=>_(A).trackColor=e},null,8,[`model-value`])):c(``,!0),e(k,{modelValue:_(A).size,"onUpdate:modelValue":o[3]||=e=>_(A).size=e,label:`Size`,min:16,max:120,suffix:`px`},null,8,[`modelValue`]),_(A).kind===`spinner`||_(A).kind===`ring`||_(A).kind===`progress`||_(A).kind===`ripple`?(u(),g(k,{key:1,modelValue:_(A).thickness,"onUpdate:modelValue":o[4]||=e=>_(A).thickness=e,label:`Thickness`,min:1,max:12,suffix:`px`},null,8,[`modelValue`])):c(``,!0),e(k,{modelValue:_(A).speed,"onUpdate:modelValue":o[5]||=e=>_(A).speed=e,label:`Speed`,min:.2,max:3,step:.1,suffix:`s`},null,8,[`modelValue`]),_(A).kind===`progress`?(u(),g(k,{key:2,modelValue:_(A).progress,"onUpdate:modelValue":o[6]||=e=>_(A).progress=e,label:`Progress`,min:0,max:100,suffix:`%`},null,8,[`modelValue`])):c(``,!0)]),_:1})]),code:m(()=>[e(M,{css:_(W),html:_(G),vars:_(K),filename:`css-studio-loader`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{L as default};