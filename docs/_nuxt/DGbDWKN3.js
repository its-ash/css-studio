import{A as e,C as t,E as n,Gt as r,Kt as i,M as a,R as o,S as s,T as c,X as l,_ as u,_t as d,ct as f,k as p,lt as m,tt as h,w as g,wt as _}from"./C_OraKES.js";import{a as v}from"#entry";import{a as y,i as b,n as ee,o as x,r as S,t as C}from"./B53n1bRJ.js";import{t as w}from"./ClNnhmls.js";import{t as T}from"./B-AWq6Bn.js";import{t as E}from"./m6s-MMH3.js";import{t as D}from"./C7qZUNCt.js";var O=[{value:`button`,label:`Button`},{value:`card`,label:`Card`},{value:`input`,label:`Input`},{value:`badge`,label:`Badge`},{value:`navbar`,label:`Navbar`},{value:`hero`,label:`Hero Section`},{value:`checkbox`,label:`Checkbox`},{value:`switch`,label:`Switch`},{value:`tooltip`,label:`Tooltip`},{value:`alert`,label:`Alert`}],k={kind:`button`,bg:`#10b981`,textColor:`#ffffff`,borderRadius:12,padding:16,borderWidth:0,borderColor:`#10b981`,shadowX:0,shadowY:8,shadowBlur:24,shadowColor:`#10b98144`,fontSize:15,fontWeight:600,gradientFrom:`#10b981`,gradientTo:`#06b6d4`,gradientAngle:135,useGradient:!0,glowColor:`#34d399`,glowBlur:20,useGlow:!1,useGlass:!1,glassBlur:16};function A(e){let t=e.useGradient?`linear-gradient(${e.gradientAngle}deg, ${e.gradientFrom}, ${e.gradientTo})`:e.bg,n=e.useGlow?`0 0 ${e.glowBlur}px ${e.glowColor}, ${e.shadowX}px ${e.shadowY}px ${e.shadowBlur}px ${e.shadowColor}`:`${e.shadowX}px ${e.shadowY}px ${e.shadowBlur}px ${e.shadowColor}`,r=[`.component-demo {`,`  background: ${t};`,`  color: ${e.textColor};`,`  border-radius: ${e.borderRadius}px;`,`  padding: ${e.padding}px ${e.padding*1.5}px;`,`  font-size: ${e.fontSize}px;`,`  font-weight: ${e.fontWeight};`,`  box-shadow: ${n};`];if(e.kind===`card`&&e.useGlass&&r.push(`  backdrop-filter: blur(${e.glassBlur}px) saturate(160%);`,`  -webkit-backdrop-filter: blur(${e.glassBlur}px) saturate(160%);`),e.borderWidth>0&&r.push(`  border: ${e.borderWidth}px solid ${e.borderColor};`),r.push(`}`),e.kind===`checkbox`)return`.component-demo {
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
`)}function j(e){let t={background:e.useGradient?`linear-gradient(${e.gradientAngle}deg, ${e.gradientFrom}, ${e.gradientTo})`:e.bg,color:e.textColor,"border-radius":`${e.borderRadius}px`,padding:`${e.padding}px ${e.padding*1.5}px`,"font-size":`${e.fontSize}px`,"font-weight":String(e.fontWeight),"box-shadow":e.useGlow?`0 0 ${e.glowBlur}px ${e.glowColor}, ${e.shadowX}px ${e.shadowY}px ${e.shadowBlur}px ${e.shadowColor}`:`${e.shadowX}px ${e.shadowY}px ${e.shadowBlur}px ${e.shadowColor}`};return e.kind===`card`&&e.useGlass&&(t[`backdrop-filter`]=`blur(${e.glassBlur}px) saturate(160%)`,t[`-webkit-backdrop-filter`]=`blur(${e.glassBlur}px) saturate(160%)`),e.borderWidth>0&&(t.border=`${e.borderWidth}px solid ${e.borderColor}`),t}function M(e){return{"--comp-bg":e.bg,"--comp-text":e.textColor,"--comp-radius":`${e.borderRadius}px`,"--comp-padding":`${e.padding}px`}}function N(e){switch(e.kind){case`button`:return`<button class="component-demo">Click Me</button>`;case`card`:return`<div class="component-demo">
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
</div>`}}function P(e,t){let n=Math.floor(t.range(0,360));return{...e,bg:`hsl(${n} 80% 50%)`,gradientFrom:`hsl(${n} 90% 50%)`,gradientTo:`hsl(${(n+80)%360} 90% 55%)`,borderRadius:Math.round(t.range(0,24)),shadowX:0,shadowY:Math.round(t.range(4,24)),shadowBlur:Math.round(t.range(12,48)),glowColor:`hsl(${n} 90% 55%)`,glowBlur:Math.round(t.range(12,32)),useGlow:t.chance(.3),useGradient:t.chance(.6)}}var F=[{name:`Emerald Button`,tags:[`button`,`brand`],state:{...k,kind:`button`}},{name:`Gradient Card`,tags:[`card`,`gradient`],state:{...k,kind:`card`,useGradient:!0,gradientFrom:`#8b5cf6`,gradientTo:`#ec4899`,borderRadius:20,padding:24,textColor:`#ffffff`,fontSize:16}},{name:`Glass Input`,tags:[`input`,`soft`],state:{...k,kind:`input`,bg:`#ffffff20`,textColor:`#f4f4f5`,borderRadius:8,padding:12,borderWidth:1,borderColor:`#ffffff30`,shadowBlur:0,shadowY:0,useGradient:!1,fontSize:14,fontWeight:400}},{name:`Glow Badge`,tags:[`badge`,`glow`],state:{...k,kind:`badge`,bg:`#f59e0b`,textColor:`#18181b`,borderRadius:999,padding:6,fontSize:12,fontWeight:700,useGlow:!0,glowColor:`#f59e0b`,glowBlur:16,useGradient:!1}},{name:`Dark Navbar`,tags:[`navbar`,`dark`],state:{...k,kind:`navbar`,bg:`#18181b`,textColor:`#f4f4f5`,borderRadius:0,padding:16,fontSize:14,fontWeight:500,useGradient:!1,shadowY:4,shadowBlur:12,shadowColor:`#00000066`}},{name:`Hero Gradient`,tags:[`hero`,`gradient`],state:{...k,kind:`hero`,useGradient:!0,gradientFrom:`#0ea5e9`,gradientTo:`#8b5cf6`,borderRadius:24,padding:48,textColor:`#ffffff`,fontSize:28,fontWeight:700}},{name:`Neon Button`,tags:[`button`,`glow`],state:{...k,kind:`button`,bg:`#09090b`,textColor:`#34d399`,borderRadius:12,borderWidth:2,borderColor:`#34d399`,useGlow:!0,glowColor:`#34d399`,glowBlur:24,useGradient:!1}},{name:`Soft Card`,tags:[`card`,`soft`],state:{...k,kind:`card`,bg:`#f8f6f0`,textColor:`#18181b`,borderRadius:16,padding:24,shadowY:8,shadowBlur:24,shadowColor:`#0000001a`,useGradient:!1,fontSize:16}},{name:`Pill Button`,tags:[`button`],state:{...k,kind:`button`,bg:`#a78bfa`,textColor:`#ffffff`,borderRadius:999,padding:14,useGradient:!1}},{name:`Outlined Input`,tags:[`input`],state:{...k,kind:`input`,bg:`transparent`,textColor:`#18181b`,borderRadius:8,padding:12,borderWidth:2,borderColor:`#10b981`,useGradient:!1,shadowBlur:0,shadowY:0,fontSize:14,fontWeight:400}},{name:`Gradient Navbar`,tags:[`navbar`,`gradient`],state:{...k,kind:`navbar`,useGradient:!0,gradientFrom:`#1e293b`,gradientTo:`#0f172a`,textColor:`#e2e8f0`,borderRadius:0,padding:14,fontSize:14,fontWeight:500}},{name:`Warm Hero`,tags:[`hero`,`warm`],state:{...k,kind:`hero`,useGradient:!0,gradientFrom:`#f97316`,gradientTo:`#dc2626`,borderRadius:20,padding:40,textColor:`#ffffff`,fontSize:26,fontWeight:700}},{name:`Emerald Checkbox`,tags:[`checkbox`,`brand`],state:{...k,kind:`checkbox`,bg:`#10b981`,borderColor:`#52525b`,borderWidth:2,borderRadius:6,padding:10,textColor:`#ffffff`,useGradient:!1}},{name:`Dark Switch`,tags:[`switch`,`dark`],state:{...k,kind:`switch`,bg:`#10b981`,borderColor:`#3f3f46`,padding:12,shadowY:1,shadowBlur:3,shadowColor:`#00000040`,useGradient:!1}},{name:`Simple Tooltip`,tags:[`tooltip`],state:{...k,kind:`tooltip`,bg:`#18181b`,textColor:`#f4f4f5`,borderRadius:6,padding:8,fontSize:12,fontWeight:500,shadowY:4,shadowBlur:12,shadowColor:`#00000040`,useGradient:!1}},{name:`Warning Alert`,tags:[`alert`,`warm`],state:{...k,kind:`alert`,bg:`#451a0333`,textColor:`#fbbf24`,borderColor:`#f59e0b`,borderRadius:10,padding:14,fontSize:14,fontWeight:500,shadowBlur:0,shadowY:0,useGradient:!1}},{name:`Success Alert`,tags:[`alert`,`brand`],state:{...k,kind:`alert`,bg:`#052e1a33`,textColor:`#34d399`,borderColor:`#10b981`,borderRadius:10,padding:14,fontSize:14,fontWeight:500,shadowBlur:0,shadowY:0,useGradient:!1}},{name:`Rose Switch`,tags:[`switch`,`warm`],state:{...k,kind:`switch`,bg:`#f43f5e`,borderColor:`#3f3f46`,padding:12,shadowY:1,shadowBlur:3,shadowColor:`#00000040`,useGradient:!1}},{name:`Outlined Checkbox`,tags:[`checkbox`],state:{...k,kind:`checkbox`,bg:`transparent`,borderColor:`#8b5cf6`,borderWidth:2,borderRadius:4,padding:10,textColor:`#8b5cf6`,useGradient:!1}},{name:`Glass Card`,tags:[`card`,`glass`],state:{...k,kind:`card`,useGradient:!1,bg:`#ffffff14`,textColor:`#f4f4f5`,borderRadius:20,padding:24,fontSize:16,borderWidth:1,borderColor:`#ffffff26`,shadowX:0,shadowY:20,shadowBlur:40,shadowColor:`#00000055`,useGlass:!0,glassBlur:18}},{name:`Frosted Dark Card`,tags:[`card`,`glass`,`dark`],state:{...k,kind:`card`,useGradient:!1,bg:`#09090b40`,textColor:`#e4e4e7`,borderRadius:16,padding:20,fontSize:15,borderWidth:1,borderColor:`#ffffff1a`,shadowX:0,shadowY:12,shadowBlur:32,shadowColor:`#00000066`,useGlass:!0,glassBlur:12}}],I={key:6,type:`checkbox`,class:`component-demo`,checked:``,"aria-label":`Checkbox preview`},L=[`aria-checked`],R={key:8,class:`component-demo`,"aria-label":`Tooltip preview`},z={key:9,class:`component-demo max-w-sm`,"aria-label":`Alert preview`},B=a({__name:`component`,setup(a){let{state:B,randomize:V,reset:H,undo:U,redo:W,pushHistory:G,shareUrlRef:K}=C({id:`component`,defaultState:JSON.parse(JSON.stringify(k)),randomize:P}),q=o(`editor:shareUrl`,()=>{});f(()=>q(K.value));let J=s(()=>A(B.value)),Y=s(()=>N(B.value)),X=s(()=>M(B.value)),Z=s(()=>j(B.value)),Q=new Set([`checkbox`,`switch`,`tooltip`,`alert`]),te=s(()=>Q.has(B.value.kind)),$=d(!0);function ne(e){B.value=JSON.parse(JSON.stringify(F[e].state)),G()}return v({title:`Component - CSS Studio`}),(a,o)=>{let s=x,d=y,f=w,v=E,C=D,k=T,A=b,j=S,M=ee;return l(),g(M,{title:`Component Generator`,description:`Buttons, cards, inputs, badges, navbars and hero blocks.`,css:_(J),html:_(Y),vars:_(X),onRandomize:_(V),onReset:_(H),onUndo:_(U),onRedo:_(W)},{preview:m(()=>[e(d,{title:`Component preview`,filename:`css-studio-component`},{presets:m(()=>[e(s,{presets:_(F),onApply:ne},null,8,[`presets`])]),default:m(()=>[t(`div`,{class:`flex h-[420px] w-full max-w-3xl items-center justify-center p-6`,style:r(_(B).kind===`card`&&_(B).useGlass?{backgroundImage:`linear-gradient(120deg, #f43f5e, #f97316, #eab308, #22d3ee, #8b5cf6)`}:{})},[_(te)?(l(),g(h(`style`),{key:0},{default:m(()=>[p(i(_(J)),1)]),_:1})):c(``,!0),_(B).kind===`button`?(l(),n(`button`,{key:1,style:r(_(Z)),"aria-label":`Button preview`},`Click Me`,4)):_(B).kind===`card`?(l(),n(`div`,{key:2,style:r(_(Z)),class:`max-w-xs`,"aria-label":`Card preview`},[...o[24]||=[t(`h3`,{class:`mb-1 text-base font-semibold`},`Card Title`,-1),t(`p`,{class:`text-sm opacity-80`},`Card content goes here.`,-1)]],4)):_(B).kind===`input`?(l(),n(`input`,{key:3,style:r(_(Z)),placeholder:`Type here...`,class:`max-w-xs`,"aria-label":`Input preview`},null,4)):_(B).kind===`badge`?(l(),n(`span`,{key:4,style:r(_(Z)),"aria-label":`Badge preview`},`New`,4)):_(B).kind===`navbar`?(l(),n(`nav`,{key:5,style:r(_(Z)),class:`w-full max-w-xl`,"aria-label":`Navbar preview`},`Home\xA0\xA0About\xA0\xA0Contact`,4)):_(B).kind===`checkbox`?(l(),n(`input`,I)):_(B).kind===`switch`?(l(),n(`button`,{key:7,type:`button`,role:`switch`,"aria-checked":_($),class:`component-demo`,"aria-label":`Switch preview`,onClick:o[0]||=e=>$.value=!_($)},null,8,L)):_(B).kind===`tooltip`?(l(),n(`span`,R,[...o[25]||=[p(` Hover me `,-1),t(`span`,{class:`tooltip-bubble`},`Tooltip text`,-1)]])):_(B).kind===`alert`?(l(),n(`div`,z,[...o[26]||=[t(`div`,null,[t(`div`,{class:`alert-title`},`Heads up`),t(`div`,null,`Something needs your attention.`)],-1)]])):(l(),n(`section`,{key:10,style:r(_(Z)),class:`w-full max-w-xl text-center`,"aria-label":`Hero preview`},[...o[27]||=[t(`h1`,{class:`mb-2 font-bold`},`Hero Title`,-1),t(`p`,{class:`opacity-80`},`Subtitle text`,-1)]],4))],4)]),_:1})]),controls:m(()=>[e(A,{label:`Component`,icon:`ph-cube`},{default:m(()=>[e(f,{modelValue:_(B).kind,"onUpdate:modelValue":o[1]||=e=>_(B).kind=e,label:`Type`,options:_(O)},null,8,[`modelValue`,`options`]),e(v,{modelValue:_(B).useGradient,"onUpdate:modelValue":o[2]||=e=>_(B).useGradient=e,label:`Use gradient`},null,8,[`modelValue`]),_(B).useGradient?(l(),n(u,{key:1},[e(C,{"model-value":_(B).gradientFrom,label:`Gradient from`,"onUpdate:modelValue":o[4]||=e=>_(B).gradientFrom=e},null,8,[`model-value`]),e(C,{"model-value":_(B).gradientTo,label:`Gradient to`,"onUpdate:modelValue":o[5]||=e=>_(B).gradientTo=e},null,8,[`model-value`]),e(k,{modelValue:_(B).gradientAngle,"onUpdate:modelValue":o[6]||=e=>_(B).gradientAngle=e,label:`Gradient angle`,min:0,max:360,suffix:`deg`},null,8,[`modelValue`])],64)):(l(),g(C,{key:0,"model-value":_(B).bg,label:`Background`,"onUpdate:modelValue":o[3]||=e=>_(B).bg=e},null,8,[`model-value`])),e(C,{"model-value":_(B).textColor,label:`Text color`,"onUpdate:modelValue":o[7]||=e=>_(B).textColor=e},null,8,[`model-value`]),e(k,{modelValue:_(B).borderRadius,"onUpdate:modelValue":o[8]||=e=>_(B).borderRadius=e,label:`Border radius`,min:0,max:999,suffix:`px`},null,8,[`modelValue`]),e(k,{modelValue:_(B).padding,"onUpdate:modelValue":o[9]||=e=>_(B).padding=e,label:`Padding`,min:0,max:64,suffix:`px`},null,8,[`modelValue`]),e(k,{modelValue:_(B).fontSize,"onUpdate:modelValue":o[10]||=e=>_(B).fontSize=e,label:`Font size`,min:10,max:40,suffix:`px`},null,8,[`modelValue`]),e(k,{modelValue:_(B).fontWeight,"onUpdate:modelValue":o[11]||=e=>_(B).fontWeight=e,label:`Font weight`,min:300,max:900,step:100},null,8,[`modelValue`])]),_:1}),_(B).kind===`card`?(l(),g(A,{key:0,label:`Glass`,icon:`ph-drop-half`},{default:m(()=>[e(v,{modelValue:_(B).useGlass,"onUpdate:modelValue":o[12]||=e=>_(B).useGlass=e,label:`Frosted glass`},null,8,[`modelValue`]),_(B).useGlass?(l(),g(k,{key:0,modelValue:_(B).glassBlur,"onUpdate:modelValue":o[13]||=e=>_(B).glassBlur=e,label:`Backdrop blur`,min:0,max:40,suffix:`px`},null,8,[`modelValue`])):c(``,!0)]),_:1})):c(``,!0),_(B).kind===`switch`?(l(),g(A,{key:1,label:`Track`,icon:`ph-square`},{default:m(()=>[e(C,{"model-value":_(B).borderColor,label:`Track (off) color`,"onUpdate:modelValue":o[14]||=e=>_(B).borderColor=e},null,8,[`model-value`])]),_:1})):_(B).kind===`alert`?(l(),g(A,{key:2,label:`Border`,icon:`ph-square`},{default:m(()=>[e(C,{"model-value":_(B).borderColor,label:`Accent color`,"onUpdate:modelValue":o[15]||=e=>_(B).borderColor=e},null,8,[`model-value`])]),_:1})):(l(),g(A,{key:3,label:`Border`,icon:`ph-square`},{default:m(()=>[e(k,{modelValue:_(B).borderWidth,"onUpdate:modelValue":o[16]||=e=>_(B).borderWidth=e,label:`Border width`,min:0,max:6,suffix:`px`},null,8,[`modelValue`]),_(B).borderWidth>0?(l(),g(C,{key:0,"model-value":_(B).borderColor,label:`Border color`,"onUpdate:modelValue":o[17]||=e=>_(B).borderColor=e},null,8,[`model-value`])):c(``,!0)]),_:1})),_(B).kind===`switch`?c(``,!0):(l(),g(A,{key:4,label:`Shadow & Glow`,icon:`ph-sparkle`},{default:m(()=>[e(k,{modelValue:_(B).shadowY,"onUpdate:modelValue":o[18]||=e=>_(B).shadowY=e,label:`Shadow Y`,min:-30,max:40,suffix:`px`},null,8,[`modelValue`]),e(k,{modelValue:_(B).shadowBlur,"onUpdate:modelValue":o[19]||=e=>_(B).shadowBlur=e,label:`Shadow blur`,min:0,max:80,suffix:`px`},null,8,[`modelValue`]),e(C,{"model-value":_(B).shadowColor,label:`Shadow color`,"onUpdate:modelValue":o[20]||=e=>_(B).shadowColor=e},null,8,[`model-value`]),e(v,{modelValue:_(B).useGlow,"onUpdate:modelValue":o[21]||=e=>_(B).useGlow=e,label:`Glow`},null,8,[`modelValue`]),_(B).useGlow?(l(),n(u,{key:0},[e(C,{"model-value":_(B).glowColor,label:`Glow color`,"onUpdate:modelValue":o[22]||=e=>_(B).glowColor=e},null,8,[`model-value`]),e(k,{modelValue:_(B).glowBlur,"onUpdate:modelValue":o[23]||=e=>_(B).glowBlur=e,label:`Glow blur`,min:0,max:60,suffix:`px`},null,8,[`modelValue`])],64)):c(``,!0)]),_:1}))]),code:m(()=>[e(j,{css:_(J),html:_(Y),vars:_(X),filename:`css-studio-component`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{B as default};