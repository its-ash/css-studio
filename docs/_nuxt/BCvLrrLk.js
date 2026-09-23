import{$t as e,A as t,F as n,G as r,H as i,I as a,L as o,Pt as s,R as c,U as l,Z as u,bt as d,ft as f,i as p,lt as m,nn as h,r as g,st as _,yt as v,z as y}from"./nW5eDnH9.js";import{a as b,i as x,n as S,o as C,r as w,t as T}from"./Cvl3scWC.js";import{t as E}from"./Bxc0cDnT.js";import{t as D}from"./DgvkL9NY.js";import{t as O}from"./grKf0cqL.js";var k=[{value:`spinner`,label:`Spinner`},{value:`dots`,label:`Bouncing Dots`},{value:`bars`,label:`Bars`},{value:`ring`,label:`Dual Ring`},{value:`pulse`,label:`Pulse`},{value:`progress`,label:`Progress Bar`},{value:`skeleton`,label:`Skeleton Shimmer`},{value:`wave`,label:`Wave Bars`},{value:`orbit`,label:`Orbit Dots`},{value:`ripple`,label:`Ripple`},{value:`square`,label:`Square Morph`}],A={kind:`spinner`,color:`#10b981`,trackColor:`#27272a`,size:48,thickness:4,speed:.8,count:3,progress:60};function j(e){return`loader-${e}`}function M(e){let t=j(e.kind);switch(e.kind){case`spinner`:return`.${t} {
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
}`}}function N(e){let t=j(e.kind);switch(e.kind){case`spinner`:case`ring`:case`pulse`:case`skeleton`:return`<div class="${t}"></div>`;case`dots`:return`<div class="${t}">\n  <span></span>\n  <span></span>\n  <span></span>\n</div>`;case`bars`:case`wave`:return`<div class="${t}">\n  <span></span>\n  <span></span>\n  <span></span>\n  <span></span>\n  <span></span>\n</div>`;case`progress`:return`<div class="${t}">\n  <div class="${t}-bar"></div>\n</div>`;case`orbit`:case`ripple`:return`<div class="${t}">\n  <span></span>\n  <span></span>\n</div>`;case`square`:return`<div class="${t}"></div>`}}function P(e){return{"--loader-color":e.color,"--loader-track":e.trackColor,"--loader-size":`${e.size}px`,"--loader-speed":`${e.speed}s`}}function F(e,t){let n=Math.floor(t.range(0,360)),r=k.map(e=>e.value);return{...e,kind:t.pick(r),color:`hsl(${n} 85% 55%)`,size:Math.round(t.range(32,64)),thickness:Math.round(t.range(2,6)),speed:Number(t.range(.5,1.6).toFixed(2)),progress:Math.round(t.range(20,90))}}var I=[{name:`Emerald Spin`,tags:[`spinner`,`brand`],state:{...A,kind:`spinner`}},{name:`Dual Ring`,tags:[`ring`],state:{...A,kind:`ring`,color:`#06b6d4`,speed:1}},{name:`Bouncing Dots`,tags:[`dots`,`playful`],state:{...A,kind:`dots`,color:`#f59e0b`,speed:1.2}},{name:`Audio Bars`,tags:[`bars`],state:{...A,kind:`bars`,color:`#8b5cf6`,speed:.9}},{name:`Soft Pulse`,tags:[`pulse`,`soft`],state:{...A,kind:`pulse`,color:`#ec4899`,speed:1}},{name:`Upload Progress`,tags:[`progress`],state:{...A,kind:`progress`,color:`#10b981`,progress:72}},{name:`Skeleton Row`,tags:[`skeleton`,`loading`],state:{...A,kind:`skeleton`,color:`#71717a`,trackColor:`#27272a`,speed:1.4}},{name:`Fast Spinner`,tags:[`spinner`,`fast`],state:{...A,kind:`spinner`,color:`#38bdf8`,speed:.5,thickness:3}},{name:`Rose Ring`,tags:[`ring`,`warm`],state:{...A,kind:`ring`,color:`#f43f5e`,thickness:5,speed:1.1}},{name:`Dark Skeleton`,tags:[`skeleton`,`dark`],state:{...A,kind:`skeleton`,color:`#3f3f46`,trackColor:`#18181b`,speed:1.6}},{name:`Sound Wave`,tags:[`wave`,`audio`],state:{...A,kind:`wave`,color:`#22d3ee`,speed:1}},{name:`Orbit Dots`,tags:[`orbit`],state:{...A,kind:`orbit`,color:`#a78bfa`,speed:1.2}},{name:`Radar Ripple`,tags:[`ripple`],state:{...A,kind:`ripple`,color:`#10b981`,thickness:2,speed:1}},{name:`Morphing Square`,tags:[`square`,`playful`],state:{...A,kind:`square`,color:`#f97316`,speed:1}}],L={class:`flex h-[420px] w-full max-w-3xl items-center justify-center`},R=r({__name:`loader`,setup(r){let{state:j,randomize:R,reset:z,undo:B,redo:V,pushHistory:H,shareUrlRef:U}=T({id:`loader`,defaultState:JSON.parse(JSON.stringify(A)),randomize:F}),W=u(`editor:shareUrl`,()=>{});v(()=>W(U.value));let G=n(()=>M(j.value)),K=n(()=>N(j.value)),q=n(()=>P(j.value)),J=n(()=>[`dots`,`bars`,`wave`,`orbit`,`ripple`].includes(j.value.kind)),Y=n(()=>j.value.kind===`dots`?3:j.value.kind===`bars`||j.value.kind===`wave`?5:j.value.kind===`orbit`||j.value.kind===`ripple`?2:3);function X(e){j.value=JSON.parse(JSON.stringify(I[e].state)),H()}return p({title:`Loader - CSS Studio`,description:`CSS-only spinners, progress bars and skeleton shimmer.`,ogTitle:`Loader - CSS Studio`,ogDescription:`CSS-only spinners, progress bars and skeleton shimmer.`,ogUrl:`https://css-studio.itsash.in/loader`,twitterTitle:`Loader - CSS Studio`,twitterDescription:`CSS-only spinners, progress bars and skeleton shimmer.`}),g({link:[{rel:`canonical`,href:`https://css-studio.itsash.in/loader`}]}),(n,r)=>{let u=C,p=b,g=E,v=O,T=x,A=D,M=w,N=S;return _(),o(N,{title:`Loader Generator`,description:`CSS-only spinners, progress bars and skeleton shimmer.`,css:s(G),html:s(K),vars:s(q),onRandomize:s(R),onReset:s(z),onUndo:s(B),onRedo:s(V)},{preview:d(()=>[l(p,{title:`Loader preview`,filename:`css-studio-loader`},{presets:d(()=>[l(u,{presets:s(I),onApply:X},null,8,[`presets`])]),default:d(()=>[a(`div`,L,[(_(),o(f(`style`),null,{default:d(()=>[i(h(s(G)),1)]),_:1})),s(j).kind===`progress`?(_(),y(`div`,{key:0,class:e(`loader-${s(j).kind}`),"aria-label":`Loader preview`},[a(`div`,{class:e(`loader-${s(j).kind}-bar`)},null,2)],2)):s(J)?(_(),y(`div`,{key:1,class:e(`loader-${s(j).kind}`),"aria-label":`Loader preview`},[(_(!0),y(t,null,m(s(Y),e=>(_(),y(`span`,{key:e}))),128))],2)):(_(),y(`div`,{key:2,class:e(`loader-${s(j).kind}`),"aria-label":`Loader preview`},null,2))])]),_:1})]),controls:d(()=>[l(A,{label:`Loader`,icon:`ph-spinner-gap`},{default:d(()=>[l(g,{modelValue:s(j).kind,"onUpdate:modelValue":r[0]||=e=>s(j).kind=e,label:`Type`,options:s(k)},null,8,[`modelValue`,`options`]),l(v,{"model-value":s(j).color,label:`Color`,"onUpdate:modelValue":r[1]||=e=>s(j).color=e},null,8,[`model-value`]),s(j).kind===`spinner`||s(j).kind===`progress`||s(j).kind===`skeleton`?(_(),o(v,{key:0,"model-value":s(j).trackColor,label:`Track color`,"onUpdate:modelValue":r[2]||=e=>s(j).trackColor=e},null,8,[`model-value`])):c(``,!0),l(T,{modelValue:s(j).size,"onUpdate:modelValue":r[3]||=e=>s(j).size=e,label:`Size`,min:16,max:120,suffix:`px`},null,8,[`modelValue`]),s(j).kind===`spinner`||s(j).kind===`ring`||s(j).kind===`progress`||s(j).kind===`ripple`?(_(),o(T,{key:1,modelValue:s(j).thickness,"onUpdate:modelValue":r[4]||=e=>s(j).thickness=e,label:`Thickness`,min:1,max:12,suffix:`px`},null,8,[`modelValue`])):c(``,!0),l(T,{modelValue:s(j).speed,"onUpdate:modelValue":r[5]||=e=>s(j).speed=e,label:`Speed`,min:.2,max:3,step:.1,suffix:`s`},null,8,[`modelValue`]),s(j).kind===`progress`?(_(),o(T,{key:2,modelValue:s(j).progress,"onUpdate:modelValue":r[6]||=e=>s(j).progress=e,label:`Progress`,min:0,max:100,suffix:`%`},null,8,[`modelValue`])):c(``,!0)]),_:1})]),code:d(()=>[l(M,{css:s(G),html:s(K),vars:s(q),filename:`css-studio-loader`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{R as default};