import{A as e,F as t,G as n,H as r,I as i,L as a,Ot as o,Pt as s,R as c,U as l,Z as u,bt as d,ft as f,i as p,nn as m,r as h,st as g,tn as _,yt as v,z as y}from"./nW5eDnH9.js";import{a as b,i as x,n as S,o as C,r as w,t as T}from"./Cvl3scWC.js";import{t as E}from"./Bxc0cDnT.js";import{t as D}from"./DgvkL9NY.js";import{t as O}from"./b7_yDY6p.js";import{t as ee}from"./grKf0cqL.js";var k=[{value:`button`,label:`Button`},{value:`card`,label:`Card`},{value:`input`,label:`Input`},{value:`badge`,label:`Badge`},{value:`navbar`,label:`Navbar`},{value:`hero`,label:`Hero Section`},{value:`checkbox`,label:`Checkbox`},{value:`switch`,label:`Switch`},{value:`tooltip`,label:`Tooltip`},{value:`alert`,label:`Alert`}],A={kind:`button`,bg:`#10b981`,textColor:`#ffffff`,borderRadius:12,padding:16,borderWidth:0,borderColor:`#10b981`,shadowX:0,shadowY:8,shadowBlur:24,shadowColor:`#10b98144`,fontSize:15,fontWeight:600,gradientFrom:`#10b981`,gradientTo:`#06b6d4`,gradientAngle:135,useGradient:!0,glowColor:`#34d399`,glowBlur:20,useGlow:!1,useGlass:!1,glassBlur:16};function j(e){let t=e.useGradient?`linear-gradient(${e.gradientAngle}deg, ${e.gradientFrom}, ${e.gradientTo})`:e.bg,n=e.useGlow?`0 0 ${e.glowBlur}px ${e.glowColor}, ${e.shadowX}px ${e.shadowY}px ${e.shadowBlur}px ${e.shadowColor}`:`${e.shadowX}px ${e.shadowY}px ${e.shadowBlur}px ${e.shadowColor}`,r=[`.component-demo {`,`  background: ${t};`,`  color: ${e.textColor};`,`  border-radius: ${e.borderRadius}px;`,`  padding: ${e.padding}px ${e.padding*1.5}px;`,`  font-size: ${e.fontSize}px;`,`  font-weight: ${e.fontWeight};`,`  box-shadow: ${n};`];if(e.kind===`card`&&e.useGlass&&r.push(`  backdrop-filter: blur(${e.glassBlur}px) saturate(160%);`,`  -webkit-backdrop-filter: blur(${e.glassBlur}px) saturate(160%);`),e.borderWidth>0&&r.push(`  border: ${e.borderWidth}px solid ${e.borderColor};`),r.push(`}`),e.kind===`checkbox`)return`.component-demo {
  appearance: none;
  width: ${Math.round(e.padding*1.4)}px;
  height: ${Math.round(e.padding*1.4)}px;
  border-radius: ${Math.min(e.borderRadius,8)}px;
  border: ${Math.max(e.borderWidth,2)}px solid ${e.borderColor};
  background: ${e.bg};
  display: inline-grid;
  place-content: center;
  cursor: pointer;
}

.component-demo::before {
  content: '';
  width: 60%;
  height: 60%;
  transform: scale(0);
  transition: transform 0.15s ease-in-out;
  box-shadow: inset 1em 1em ${e.textColor};
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
}

.component-demo:checked {
  background: ${t};
  border-color: transparent;
}

.component-demo:checked::before {
  transform: scale(1);
}`;if(e.kind===`switch`){let n=Math.round(e.padding*1.6),r=n*2,i=n-6;return`.component-demo {
  position: relative;
  width: ${r}px;
  height: ${n}px;
  border-radius: 999px;
  background: ${e.borderColor};
  cursor: pointer;
  transition: background 0.2s ease;
}

.component-demo::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: ${i}px;
  height: ${i}px;
  border-radius: 50%;
  background: #fff;
  box-shadow: ${e.shadowX}px ${e.shadowY}px ${e.shadowBlur}px ${e.shadowColor};
  transition: transform 0.2s ease;
}

.component-demo[aria-checked="true"] {
  background: ${t};
}

.component-demo[aria-checked="true"]::after {
  transform: translateX(${r-n}px);
}`}return e.kind===`tooltip`?`.component-demo {
  position: relative;
  display: inline-block;
}

.component-demo .tooltip-bubble {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: ${e.bg};
  color: ${e.textColor};
  padding: ${Math.round(e.padding*.5)}px ${Math.round(e.padding*.8)}px;
  border-radius: ${Math.min(e.borderRadius,10)}px;
  font-size: ${Math.min(e.fontSize,13)}px;
  font-weight: ${e.fontWeight};
  white-space: nowrap;
  box-shadow: ${e.shadowX}px ${e.shadowY}px ${e.shadowBlur}px ${e.shadowColor};
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.component-demo .tooltip-bubble::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: ${e.bg};
}

.component-demo:hover .tooltip-bubble {
  opacity: 1;
  transform: translateX(-50%) translateY(-4px);
}`:e.kind===`alert`?`.component-demo {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: ${e.bg};
  color: ${e.textColor};
  border-radius: ${e.borderRadius}px;
  border-left: 4px solid ${e.borderColor};
  padding: ${e.padding}px;
  font-size: ${e.fontSize}px;
  box-shadow: ${e.shadowX}px ${e.shadowY}px ${e.shadowBlur}px ${e.shadowColor};
}

.component-demo .alert-title {
  font-weight: ${e.fontWeight};
}`:r.join(`
`)}function M(e){let t={background:e.useGradient?`linear-gradient(${e.gradientAngle}deg, ${e.gradientFrom}, ${e.gradientTo})`:e.bg,color:e.textColor,"border-radius":`${e.borderRadius}px`,padding:`${e.padding}px ${e.padding*1.5}px`,"font-size":`${e.fontSize}px`,"font-weight":String(e.fontWeight),"box-shadow":e.useGlow?`0 0 ${e.glowBlur}px ${e.glowColor}, ${e.shadowX}px ${e.shadowY}px ${e.shadowBlur}px ${e.shadowColor}`:`${e.shadowX}px ${e.shadowY}px ${e.shadowBlur}px ${e.shadowColor}`};return e.kind===`card`&&e.useGlass&&(t[`backdrop-filter`]=`blur(${e.glassBlur}px) saturate(160%)`,t[`-webkit-backdrop-filter`]=`blur(${e.glassBlur}px) saturate(160%)`),e.borderWidth>0&&(t.border=`${e.borderWidth}px solid ${e.borderColor}`),t}function N(e){return{"--comp-bg":e.bg,"--comp-text":e.textColor,"--comp-radius":`${e.borderRadius}px`,"--comp-padding":`${e.padding}px`}}function P(e){switch(e.kind){case`button`:return`<button class="component-demo">Click Me</button>`;case`card`:return`<div class="component-demo">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</div>`;case`input`:return`<input class="component-demo" placeholder="Type here..." />`;case`badge`:return`<span class="component-demo">New</span>`;case`navbar`:return`<nav class="component-demo">Home  About  Contact</nav>`;case`hero`:return`<section class="component-demo">
  <h1>Hero Title</h1>
  <p>Subtitle text</p>
</section>`;case`checkbox`:return`<input type="checkbox" class="component-demo" checked />`;case`switch`:return`<button type="button" role="switch" aria-checked="true" class="component-demo"></button>`;case`tooltip`:return`<span class="component-demo">
  Hover me
  <span class="tooltip-bubble">Tooltip text</span>
</span>`;case`alert`:return`<div class="component-demo">
  <div>
    <div class="alert-title">Heads up</div>
    <div>Something needs your attention.</div>
  </div>
</div>`}}function F(e,t){let n=Math.floor(t.range(0,360));return{...e,bg:`hsl(${n} 80% 50%)`,gradientFrom:`hsl(${n} 90% 50%)`,gradientTo:`hsl(${(n+80)%360} 90% 55%)`,borderRadius:Math.round(t.range(0,24)),shadowX:0,shadowY:Math.round(t.range(4,24)),shadowBlur:Math.round(t.range(12,48)),glowColor:`hsl(${n} 90% 55%)`,glowBlur:Math.round(t.range(12,32)),useGlow:t.chance(.3),useGradient:t.chance(.6)}}var I=[{name:`Emerald Button`,tags:[`button`,`brand`],state:{...A,kind:`button`}},{name:`Gradient Card`,tags:[`card`,`gradient`],state:{...A,kind:`card`,useGradient:!0,gradientFrom:`#8b5cf6`,gradientTo:`#ec4899`,borderRadius:20,padding:24,textColor:`#ffffff`,fontSize:16}},{name:`Glass Input`,tags:[`input`,`soft`],state:{...A,kind:`input`,bg:`#ffffff20`,textColor:`#f4f4f5`,borderRadius:8,padding:12,borderWidth:1,borderColor:`#ffffff30`,shadowBlur:0,shadowY:0,useGradient:!1,fontSize:14,fontWeight:400}},{name:`Glow Badge`,tags:[`badge`,`glow`],state:{...A,kind:`badge`,bg:`#f59e0b`,textColor:`#18181b`,borderRadius:999,padding:6,fontSize:12,fontWeight:700,useGlow:!0,glowColor:`#f59e0b`,glowBlur:16,useGradient:!1}},{name:`Dark Navbar`,tags:[`navbar`,`dark`],state:{...A,kind:`navbar`,bg:`#18181b`,textColor:`#f4f4f5`,borderRadius:0,padding:16,fontSize:14,fontWeight:500,useGradient:!1,shadowY:4,shadowBlur:12,shadowColor:`#00000066`}},{name:`Hero Gradient`,tags:[`hero`,`gradient`],state:{...A,kind:`hero`,useGradient:!0,gradientFrom:`#0ea5e9`,gradientTo:`#8b5cf6`,borderRadius:24,padding:48,textColor:`#ffffff`,fontSize:28,fontWeight:700}},{name:`Neon Button`,tags:[`button`,`glow`],state:{...A,kind:`button`,bg:`#09090b`,textColor:`#34d399`,borderRadius:12,borderWidth:2,borderColor:`#34d399`,useGlow:!0,glowColor:`#34d399`,glowBlur:24,useGradient:!1}},{name:`Soft Card`,tags:[`card`,`soft`],state:{...A,kind:`card`,bg:`#f8f6f0`,textColor:`#18181b`,borderRadius:16,padding:24,shadowY:8,shadowBlur:24,shadowColor:`#0000001a`,useGradient:!1,fontSize:16}},{name:`Pill Button`,tags:[`button`],state:{...A,kind:`button`,bg:`#a78bfa`,textColor:`#ffffff`,borderRadius:999,padding:14,useGradient:!1}},{name:`Outlined Input`,tags:[`input`],state:{...A,kind:`input`,bg:`transparent`,textColor:`#18181b`,borderRadius:8,padding:12,borderWidth:2,borderColor:`#10b981`,useGradient:!1,shadowBlur:0,shadowY:0,fontSize:14,fontWeight:400}},{name:`Gradient Navbar`,tags:[`navbar`,`gradient`],state:{...A,kind:`navbar`,useGradient:!0,gradientFrom:`#1e293b`,gradientTo:`#0f172a`,textColor:`#e2e8f0`,borderRadius:0,padding:14,fontSize:14,fontWeight:500}},{name:`Warm Hero`,tags:[`hero`,`warm`],state:{...A,kind:`hero`,useGradient:!0,gradientFrom:`#f97316`,gradientTo:`#dc2626`,borderRadius:20,padding:40,textColor:`#ffffff`,fontSize:26,fontWeight:700}},{name:`Emerald Checkbox`,tags:[`checkbox`,`brand`],state:{...A,kind:`checkbox`,bg:`#10b981`,borderColor:`#52525b`,borderWidth:2,borderRadius:6,padding:10,textColor:`#ffffff`,useGradient:!1}},{name:`Dark Switch`,tags:[`switch`,`dark`],state:{...A,kind:`switch`,bg:`#10b981`,borderColor:`#3f3f46`,padding:12,shadowY:1,shadowBlur:3,shadowColor:`#00000040`,useGradient:!1}},{name:`Simple Tooltip`,tags:[`tooltip`],state:{...A,kind:`tooltip`,bg:`#18181b`,textColor:`#f4f4f5`,borderRadius:6,padding:8,fontSize:12,fontWeight:500,shadowY:4,shadowBlur:12,shadowColor:`#00000040`,useGradient:!1}},{name:`Warning Alert`,tags:[`alert`,`warm`],state:{...A,kind:`alert`,bg:`#451a0333`,textColor:`#fbbf24`,borderColor:`#f59e0b`,borderRadius:10,padding:14,fontSize:14,fontWeight:500,shadowBlur:0,shadowY:0,useGradient:!1}},{name:`Success Alert`,tags:[`alert`,`brand`],state:{...A,kind:`alert`,bg:`#052e1a33`,textColor:`#34d399`,borderColor:`#10b981`,borderRadius:10,padding:14,fontSize:14,fontWeight:500,shadowBlur:0,shadowY:0,useGradient:!1}},{name:`Rose Switch`,tags:[`switch`,`warm`],state:{...A,kind:`switch`,bg:`#f43f5e`,borderColor:`#3f3f46`,padding:12,shadowY:1,shadowBlur:3,shadowColor:`#00000040`,useGradient:!1}},{name:`Outlined Checkbox`,tags:[`checkbox`],state:{...A,kind:`checkbox`,bg:`transparent`,borderColor:`#8b5cf6`,borderWidth:2,borderRadius:4,padding:10,textColor:`#8b5cf6`,useGradient:!1}},{name:`Glass Card`,tags:[`card`,`glass`],state:{...A,kind:`card`,useGradient:!1,bg:`#ffffff14`,textColor:`#f4f4f5`,borderRadius:20,padding:24,fontSize:16,borderWidth:1,borderColor:`#ffffff26`,shadowX:0,shadowY:20,shadowBlur:40,shadowColor:`#00000055`,useGlass:!0,glassBlur:18}},{name:`Frosted Dark Card`,tags:[`card`,`glass`,`dark`],state:{...A,kind:`card`,useGradient:!1,bg:`#09090b40`,textColor:`#e4e4e7`,borderRadius:16,padding:20,fontSize:15,borderWidth:1,borderColor:`#ffffff1a`,shadowX:0,shadowY:12,shadowBlur:32,shadowColor:`#00000066`,useGlass:!0,glassBlur:12}}],L={key:6,type:`checkbox`,class:`component-demo`,checked:``,"aria-label":`Checkbox preview`},R=[`aria-checked`],z={key:8,class:`component-demo`,"aria-label":`Tooltip preview`},B={key:9,class:`component-demo max-w-sm`,"aria-label":`Alert preview`},V=n({__name:`component`,setup(n){let{state:V,randomize:H,reset:U,undo:W,redo:G,pushHistory:K,shareUrlRef:q}=T({id:`component`,defaultState:JSON.parse(JSON.stringify(A)),randomize:F}),J=u(`editor:shareUrl`,()=>{});v(()=>J(q.value));let Y=t(()=>j(V.value)),X=t(()=>P(V.value)),Z=t(()=>N(V.value)),Q=t(()=>M(V.value)),te=new Set([`checkbox`,`switch`,`tooltip`,`alert`]),ne=t(()=>te.has(V.value.kind)),$=o(!0);function re(e){V.value=JSON.parse(JSON.stringify(I[e].state)),K()}return p({title:`Component - CSS Studio`,description:`Buttons, cards, inputs, badges, navbars and hero blocks.`,ogTitle:`Component - CSS Studio`,ogDescription:`Buttons, cards, inputs, badges, navbars and hero blocks.`,ogUrl:`https://css-studio.itsash.in/component`,twitterTitle:`Component - CSS Studio`,twitterDescription:`Buttons, cards, inputs, badges, navbars and hero blocks.`}),h({link:[{rel:`canonical`,href:`https://css-studio.itsash.in/component`}]}),(t,n)=>{let o=C,u=b,p=E,h=O,v=ee,T=x,A=D,j=w,M=S;return g(),a(M,{title:`Component Generator`,description:`Buttons, cards, inputs, badges, navbars and hero blocks.`,css:s(Y),html:s(X),vars:s(Z),onRandomize:s(H),onReset:s(U),onUndo:s(W),onRedo:s(G)},{preview:d(()=>[l(u,{title:`Component preview`,filename:`css-studio-component`},{presets:d(()=>[l(o,{presets:s(I),onApply:re},null,8,[`presets`])]),default:d(()=>[i(`div`,{class:`flex h-[420px] w-full max-w-3xl items-center justify-center p-6`,style:_(s(V).kind===`card`&&s(V).useGlass?{backgroundImage:`linear-gradient(120deg, #f43f5e, #f97316, #eab308, #22d3ee, #8b5cf6)`}:{})},[s(ne)?(g(),a(f(`style`),{key:0},{default:d(()=>[r(m(s(Y)),1)]),_:1})):c(``,!0),s(V).kind===`button`?(g(),y(`button`,{key:1,style:_(s(Q)),"aria-label":`Button preview`},`Click Me`,4)):s(V).kind===`card`?(g(),y(`div`,{key:2,style:_(s(Q)),class:`max-w-xs`,"aria-label":`Card preview`},[...n[24]||=[i(`h3`,{class:`mb-1 text-base font-semibold`},`Card Title`,-1),i(`p`,{class:`text-sm opacity-80`},`Card content goes here.`,-1)]],4)):s(V).kind===`input`?(g(),y(`input`,{key:3,style:_(s(Q)),placeholder:`Type here...`,class:`max-w-xs`,"aria-label":`Input preview`},null,4)):s(V).kind===`badge`?(g(),y(`span`,{key:4,style:_(s(Q)),"aria-label":`Badge preview`},`New`,4)):s(V).kind===`navbar`?(g(),y(`nav`,{key:5,style:_(s(Q)),class:`w-full max-w-xl`,"aria-label":`Navbar preview`},`Home\xA0\xA0About\xA0\xA0Contact`,4)):s(V).kind===`checkbox`?(g(),y(`input`,L)):s(V).kind===`switch`?(g(),y(`button`,{key:7,type:`button`,role:`switch`,"aria-checked":s($),class:`component-demo`,"aria-label":`Switch preview`,onClick:n[0]||=e=>$.value=!s($)},null,8,R)):s(V).kind===`tooltip`?(g(),y(`span`,z,[...n[25]||=[r(` Hover me `,-1),i(`span`,{class:`tooltip-bubble`},`Tooltip text`,-1)]])):s(V).kind===`alert`?(g(),y(`div`,B,[...n[26]||=[i(`div`,null,[i(`div`,{class:`alert-title`},`Heads up`),i(`div`,null,`Something needs your attention.`)],-1)]])):(g(),y(`section`,{key:10,style:_(s(Q)),class:`w-full max-w-xl text-center`,"aria-label":`Hero preview`},[...n[27]||=[i(`h1`,{class:`mb-2 font-bold`},`Hero Title`,-1),i(`p`,{class:`opacity-80`},`Subtitle text`,-1)]],4))],4)]),_:1})]),controls:d(()=>[l(A,{label:`Component`,icon:`ph-cube`},{default:d(()=>[l(p,{modelValue:s(V).kind,"onUpdate:modelValue":n[1]||=e=>s(V).kind=e,label:`Type`,options:s(k)},null,8,[`modelValue`,`options`]),l(h,{modelValue:s(V).useGradient,"onUpdate:modelValue":n[2]||=e=>s(V).useGradient=e,label:`Use gradient`},null,8,[`modelValue`]),s(V).useGradient?(g(),y(e,{key:1},[l(v,{"model-value":s(V).gradientFrom,label:`Gradient from`,"onUpdate:modelValue":n[4]||=e=>s(V).gradientFrom=e},null,8,[`model-value`]),l(v,{"model-value":s(V).gradientTo,label:`Gradient to`,"onUpdate:modelValue":n[5]||=e=>s(V).gradientTo=e},null,8,[`model-value`]),l(T,{modelValue:s(V).gradientAngle,"onUpdate:modelValue":n[6]||=e=>s(V).gradientAngle=e,label:`Gradient angle`,min:0,max:360,suffix:`deg`},null,8,[`modelValue`])],64)):(g(),a(v,{key:0,"model-value":s(V).bg,label:`Background`,"onUpdate:modelValue":n[3]||=e=>s(V).bg=e},null,8,[`model-value`])),l(v,{"model-value":s(V).textColor,label:`Text color`,"onUpdate:modelValue":n[7]||=e=>s(V).textColor=e},null,8,[`model-value`]),l(T,{modelValue:s(V).borderRadius,"onUpdate:modelValue":n[8]||=e=>s(V).borderRadius=e,label:`Border radius`,min:0,max:999,suffix:`px`},null,8,[`modelValue`]),l(T,{modelValue:s(V).padding,"onUpdate:modelValue":n[9]||=e=>s(V).padding=e,label:`Padding`,min:0,max:64,suffix:`px`},null,8,[`modelValue`]),l(T,{modelValue:s(V).fontSize,"onUpdate:modelValue":n[10]||=e=>s(V).fontSize=e,label:`Font size`,min:10,max:40,suffix:`px`},null,8,[`modelValue`]),l(T,{modelValue:s(V).fontWeight,"onUpdate:modelValue":n[11]||=e=>s(V).fontWeight=e,label:`Font weight`,min:300,max:900,step:100},null,8,[`modelValue`])]),_:1}),s(V).kind===`card`?(g(),a(A,{key:0,label:`Glass`,icon:`ph-drop-half`},{default:d(()=>[l(h,{modelValue:s(V).useGlass,"onUpdate:modelValue":n[12]||=e=>s(V).useGlass=e,label:`Frosted glass`},null,8,[`modelValue`]),s(V).useGlass?(g(),a(T,{key:0,modelValue:s(V).glassBlur,"onUpdate:modelValue":n[13]||=e=>s(V).glassBlur=e,label:`Backdrop blur`,min:0,max:40,suffix:`px`},null,8,[`modelValue`])):c(``,!0)]),_:1})):c(``,!0),s(V).kind===`switch`?(g(),a(A,{key:1,label:`Track`,icon:`ph-square`},{default:d(()=>[l(v,{"model-value":s(V).borderColor,label:`Track (off) color`,"onUpdate:modelValue":n[14]||=e=>s(V).borderColor=e},null,8,[`model-value`])]),_:1})):s(V).kind===`alert`?(g(),a(A,{key:2,label:`Border`,icon:`ph-square`},{default:d(()=>[l(v,{"model-value":s(V).borderColor,label:`Accent color`,"onUpdate:modelValue":n[15]||=e=>s(V).borderColor=e},null,8,[`model-value`])]),_:1})):(g(),a(A,{key:3,label:`Border`,icon:`ph-square`},{default:d(()=>[l(T,{modelValue:s(V).borderWidth,"onUpdate:modelValue":n[16]||=e=>s(V).borderWidth=e,label:`Border width`,min:0,max:6,suffix:`px`},null,8,[`modelValue`]),s(V).borderWidth>0?(g(),a(v,{key:0,"model-value":s(V).borderColor,label:`Border color`,"onUpdate:modelValue":n[17]||=e=>s(V).borderColor=e},null,8,[`model-value`])):c(``,!0)]),_:1})),s(V).kind===`switch`?c(``,!0):(g(),a(A,{key:4,label:`Shadow & Glow`,icon:`ph-sparkle`},{default:d(()=>[l(T,{modelValue:s(V).shadowY,"onUpdate:modelValue":n[18]||=e=>s(V).shadowY=e,label:`Shadow Y`,min:-30,max:40,suffix:`px`},null,8,[`modelValue`]),l(T,{modelValue:s(V).shadowBlur,"onUpdate:modelValue":n[19]||=e=>s(V).shadowBlur=e,label:`Shadow blur`,min:0,max:80,suffix:`px`},null,8,[`modelValue`]),l(v,{"model-value":s(V).shadowColor,label:`Shadow color`,"onUpdate:modelValue":n[20]||=e=>s(V).shadowColor=e},null,8,[`model-value`]),l(h,{modelValue:s(V).useGlow,"onUpdate:modelValue":n[21]||=e=>s(V).useGlow=e,label:`Glow`},null,8,[`modelValue`]),s(V).useGlow?(g(),y(e,{key:0},[l(v,{"model-value":s(V).glowColor,label:`Glow color`,"onUpdate:modelValue":n[22]||=e=>s(V).glowColor=e},null,8,[`model-value`]),l(T,{modelValue:s(V).glowBlur,"onUpdate:modelValue":n[23]||=e=>s(V).glowBlur=e,label:`Glow blur`,min:0,max:60,suffix:`px`},null,8,[`modelValue`])],64)):c(``,!0)]),_:1}))]),code:d(()=>[l(j,{css:s(Y),html:s(X),vars:s(Z),filename:`css-studio-component`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{V as default};