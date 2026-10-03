import{A as e,C as t,E as n,Gt as r,Kt as i,M as a,R as o,S as s,T as c,X as l,_ as u,_t as d,ct as f,k as p,lt as m,tt as ee,w as h,wt as g}from"./MitKKUeq.js";import{a as _,i as v,n as y,r as b,s as te,t as x}from"./BPBkcUFJ.js";import{t as S}from"./D3e07OzS.js";import{t as C}from"./Dh2B6pZ8.js";import{t as w}from"./BYmGHvE7.js";import{t as T}from"./Cw1rlFxN.js";var E=[{value:`button`,label:`Button`},{value:`card`,label:`Card`},{value:`input`,label:`Input`},{value:`badge`,label:`Badge`},{value:`navbar`,label:`Navbar`},{value:`hero`,label:`Hero Section`},{value:`checkbox`,label:`Checkbox`},{value:`switch`,label:`Switch`},{value:`tooltip`,label:`Tooltip`},{value:`alert`,label:`Alert`}],D={kind:`button`,bg:`#10b981`,textColor:`#ffffff`,borderRadius:12,padding:16,borderWidth:0,borderColor:`#10b981`,shadowX:0,shadowY:8,shadowBlur:24,shadowColor:`#10b98144`,fontSize:15,fontWeight:600,gradientFrom:`#10b981`,gradientTo:`#06b6d4`,gradientAngle:135,useGradient:!0,glowColor:`#34d399`,glowBlur:20,useGlow:!1,useGlass:!1,glassBlur:16};function O(e){let t=e.useGradient?`linear-gradient(${e.gradientAngle}deg, ${e.gradientFrom}, ${e.gradientTo})`:e.bg,n=e.useGlow?`0 0 ${e.glowBlur}px ${e.glowColor}, ${e.shadowX}px ${e.shadowY}px ${e.shadowBlur}px ${e.shadowColor}`:`${e.shadowX}px ${e.shadowY}px ${e.shadowBlur}px ${e.shadowColor}`,r=[`.component-demo {`,`  background: ${t};`,`  color: ${e.textColor};`,`  border-radius: ${e.borderRadius}px;`,`  padding: ${e.padding}px ${e.padding*1.5}px;`,`  font-size: ${e.fontSize}px;`,`  font-weight: ${e.fontWeight};`,`  box-shadow: ${n};`];if(e.kind===`card`&&e.useGlass&&r.push(`  backdrop-filter: blur(${e.glassBlur}px) saturate(160%);`,`  -webkit-backdrop-filter: blur(${e.glassBlur}px) saturate(160%);`),e.borderWidth>0&&r.push(`  border: ${e.borderWidth}px solid ${e.borderColor};`),r.push(`}`),e.kind===`checkbox`)return`.component-demo {
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
`)}function k(e){let t={background:e.useGradient?`linear-gradient(${e.gradientAngle}deg, ${e.gradientFrom}, ${e.gradientTo})`:e.bg,color:e.textColor,"border-radius":`${e.borderRadius}px`,padding:`${e.padding}px ${e.padding*1.5}px`,"font-size":`${e.fontSize}px`,"font-weight":String(e.fontWeight),"box-shadow":e.useGlow?`0 0 ${e.glowBlur}px ${e.glowColor}, ${e.shadowX}px ${e.shadowY}px ${e.shadowBlur}px ${e.shadowColor}`:`${e.shadowX}px ${e.shadowY}px ${e.shadowBlur}px ${e.shadowColor}`};return e.kind===`card`&&e.useGlass&&(t[`backdrop-filter`]=`blur(${e.glassBlur}px) saturate(160%)`,t[`-webkit-backdrop-filter`]=`blur(${e.glassBlur}px) saturate(160%)`),e.borderWidth>0&&(t.border=`${e.borderWidth}px solid ${e.borderColor}`),t}function A(e){return{"--comp-bg":e.bg,"--comp-text":e.textColor,"--comp-radius":`${e.borderRadius}px`,"--comp-padding":`${e.padding}px`}}function j(e){switch(e.kind){case`button`:return`<button class="component-demo">Click Me</button>`;case`card`:return`<div class="component-demo">
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
</div>`}}function M(e,t){let n=Math.floor(t.range(0,360));return{...e,bg:`hsl(${n} 80% 50%)`,gradientFrom:`hsl(${n} 90% 50%)`,gradientTo:`hsl(${(n+80)%360} 90% 55%)`,borderRadius:Math.round(t.range(0,24)),shadowX:0,shadowY:Math.round(t.range(4,24)),shadowBlur:Math.round(t.range(12,48)),glowColor:`hsl(${n} 90% 55%)`,glowBlur:Math.round(t.range(12,32)),useGlow:t.chance(.3),useGradient:t.chance(.6)}}var N=[{name:`Emerald Button`,tags:[`button`,`brand`],state:{...D,kind:`button`}},{name:`Gradient Card`,tags:[`card`,`gradient`],state:{...D,kind:`card`,useGradient:!0,gradientFrom:`#8b5cf6`,gradientTo:`#ec4899`,borderRadius:20,padding:24,textColor:`#ffffff`,fontSize:16}},{name:`Glass Input`,tags:[`input`,`soft`],state:{...D,kind:`input`,bg:`#ffffff20`,textColor:`#f4f4f5`,borderRadius:8,padding:12,borderWidth:1,borderColor:`#ffffff30`,shadowBlur:0,shadowY:0,useGradient:!1,fontSize:14,fontWeight:400}},{name:`Glow Badge`,tags:[`badge`,`glow`],state:{...D,kind:`badge`,bg:`#f59e0b`,textColor:`#18181b`,borderRadius:999,padding:6,fontSize:12,fontWeight:700,useGlow:!0,glowColor:`#f59e0b`,glowBlur:16,useGradient:!1}},{name:`Dark Navbar`,tags:[`navbar`,`dark`],state:{...D,kind:`navbar`,bg:`#18181b`,textColor:`#f4f4f5`,borderRadius:0,padding:16,fontSize:14,fontWeight:500,useGradient:!1,shadowY:4,shadowBlur:12,shadowColor:`#00000066`}},{name:`Hero Gradient`,tags:[`hero`,`gradient`],state:{...D,kind:`hero`,useGradient:!0,gradientFrom:`#0ea5e9`,gradientTo:`#8b5cf6`,borderRadius:24,padding:48,textColor:`#ffffff`,fontSize:28,fontWeight:700}},{name:`Neon Button`,tags:[`button`,`glow`],state:{...D,kind:`button`,bg:`#09090b`,textColor:`#34d399`,borderRadius:12,borderWidth:2,borderColor:`#34d399`,useGlow:!0,glowColor:`#34d399`,glowBlur:24,useGradient:!1}},{name:`Soft Card`,tags:[`card`,`soft`],state:{...D,kind:`card`,bg:`#f8f6f0`,textColor:`#18181b`,borderRadius:16,padding:24,shadowY:8,shadowBlur:24,shadowColor:`#0000001a`,useGradient:!1,fontSize:16}},{name:`Pill Button`,tags:[`button`],state:{...D,kind:`button`,bg:`#a78bfa`,textColor:`#ffffff`,borderRadius:999,padding:14,useGradient:!1}},{name:`Outlined Input`,tags:[`input`],state:{...D,kind:`input`,bg:`transparent`,textColor:`#18181b`,borderRadius:8,padding:12,borderWidth:2,borderColor:`#10b981`,useGradient:!1,shadowBlur:0,shadowY:0,fontSize:14,fontWeight:400}},{name:`Gradient Navbar`,tags:[`navbar`,`gradient`],state:{...D,kind:`navbar`,useGradient:!0,gradientFrom:`#1e293b`,gradientTo:`#0f172a`,textColor:`#e2e8f0`,borderRadius:0,padding:14,fontSize:14,fontWeight:500}},{name:`Warm Hero`,tags:[`hero`,`warm`],state:{...D,kind:`hero`,useGradient:!0,gradientFrom:`#f97316`,gradientTo:`#dc2626`,borderRadius:20,padding:40,textColor:`#ffffff`,fontSize:26,fontWeight:700}},{name:`Emerald Checkbox`,tags:[`checkbox`,`brand`],state:{...D,kind:`checkbox`,bg:`#10b981`,borderColor:`#52525b`,borderWidth:2,borderRadius:6,padding:10,textColor:`#ffffff`,useGradient:!1}},{name:`Dark Switch`,tags:[`switch`,`dark`],state:{...D,kind:`switch`,bg:`#10b981`,borderColor:`#3f3f46`,padding:12,shadowY:1,shadowBlur:3,shadowColor:`#00000040`,useGradient:!1}},{name:`Simple Tooltip`,tags:[`tooltip`],state:{...D,kind:`tooltip`,bg:`#18181b`,textColor:`#f4f4f5`,borderRadius:6,padding:8,fontSize:12,fontWeight:500,shadowY:4,shadowBlur:12,shadowColor:`#00000040`,useGradient:!1}},{name:`Warning Alert`,tags:[`alert`,`warm`],state:{...D,kind:`alert`,bg:`#451a0333`,textColor:`#fbbf24`,borderColor:`#f59e0b`,borderRadius:10,padding:14,fontSize:14,fontWeight:500,shadowBlur:0,shadowY:0,useGradient:!1}},{name:`Success Alert`,tags:[`alert`,`brand`],state:{...D,kind:`alert`,bg:`#052e1a33`,textColor:`#34d399`,borderColor:`#10b981`,borderRadius:10,padding:14,fontSize:14,fontWeight:500,shadowBlur:0,shadowY:0,useGradient:!1}},{name:`Rose Switch`,tags:[`switch`,`warm`],state:{...D,kind:`switch`,bg:`#f43f5e`,borderColor:`#3f3f46`,padding:12,shadowY:1,shadowBlur:3,shadowColor:`#00000040`,useGradient:!1}},{name:`Outlined Checkbox`,tags:[`checkbox`],state:{...D,kind:`checkbox`,bg:`transparent`,borderColor:`#8b5cf6`,borderWidth:2,borderRadius:4,padding:10,textColor:`#8b5cf6`,useGradient:!1}},{name:`Glass Card`,tags:[`card`,`glass`],state:{...D,kind:`card`,useGradient:!1,bg:`#ffffff14`,textColor:`#f4f4f5`,borderRadius:20,padding:24,fontSize:16,borderWidth:1,borderColor:`#ffffff26`,shadowX:0,shadowY:20,shadowBlur:40,shadowColor:`#00000055`,useGlass:!0,glassBlur:18}},{name:`Frosted Dark Card`,tags:[`card`,`glass`,`dark`],state:{...D,kind:`card`,useGradient:!1,bg:`#09090b40`,textColor:`#e4e4e7`,borderRadius:16,padding:20,fontSize:15,borderWidth:1,borderColor:`#ffffff1a`,shadowX:0,shadowY:12,shadowBlur:32,shadowColor:`#00000066`,useGlass:!0,glassBlur:12}}],P={key:6,type:`checkbox`,class:`component-demo`,checked:``,"aria-label":`Checkbox preview`},F=[`aria-checked`],I={key:8,class:`component-demo`,"aria-label":`Tooltip preview`},L={key:9,class:`component-demo max-w-sm`,"aria-label":`Alert preview`},R=a({__name:`component`,setup(a){let{state:R,randomize:z,reset:B,undo:V,redo:H,pushHistory:U,shareUrlRef:W}=x({id:`component`,defaultState:JSON.parse(JSON.stringify(D)),randomize:M}),G=o(`editor:shareUrl`,()=>{});f(()=>G(W.value));let K=s(()=>O(R.value)),q=s(()=>j(R.value)),J=s(()=>A(R.value)),Y=s(()=>k(R.value)),X=new Set([`checkbox`,`switch`,`tooltip`,`alert`]),Z=s(()=>X.has(R.value.kind)),Q=d(!0);function $(e){R.value=JSON.parse(JSON.stringify(N[e].state)),U()}let ne=s(()=>N.map(e=>({name:e.name,css:O(e.state),html:j(e.state)})));return(a,o)=>{let s=te,d=_,f=S,x=C,D=w,O=v,k=b,A=T,j=y;return l(),h(j,{title:`Component Generator`,description:`Buttons, cards, inputs, badges, navbars and hero blocks.`,css:g(K),html:g(q),vars:g(J),onRandomize:g(z),onReset:g(B),onUndo:g(V),onRedo:g(H)},{preview:m(()=>[e(d,{variants:g(ne),onApplyVariant:$,title:`Component preview`,filename:`css-studio-component`},{presets:m(()=>[e(s,{presets:g(N),onApply:$},null,8,[`presets`])]),default:m(()=>[t(`div`,{class:`flex h-[420px] w-full max-w-3xl items-center justify-center p-6`,style:r(g(R).kind===`card`&&g(R).useGlass?{backgroundImage:`linear-gradient(120deg, #f43f5e, #f97316, #eab308, #22d3ee, #8b5cf6)`}:{})},[g(Z)?(l(),h(ee(`style`),{key:0},{default:m(()=>[p(i(g(K)),1)]),_:1})):c(``,!0),g(R).kind===`button`?(l(),n(`button`,{key:1,style:r(g(Y)),"aria-label":`Button preview`},`Click Me`,4)):g(R).kind===`card`?(l(),n(`div`,{key:2,style:r(g(Y)),class:`max-w-xs`,"aria-label":`Card preview`},[...o[24]||=[t(`h3`,{class:`mb-1 text-base font-semibold`},`Card Title`,-1),t(`p`,{class:`text-sm opacity-80`},`Card content goes here.`,-1)]],4)):g(R).kind===`input`?(l(),n(`input`,{key:3,style:r(g(Y)),placeholder:`Type here...`,class:`max-w-xs`,"aria-label":`Input preview`},null,4)):g(R).kind===`badge`?(l(),n(`span`,{key:4,style:r(g(Y)),"aria-label":`Badge preview`},`New`,4)):g(R).kind===`navbar`?(l(),n(`nav`,{key:5,style:r(g(Y)),class:`w-full max-w-xl`,"aria-label":`Navbar preview`},`Home\xA0\xA0About\xA0\xA0Contact`,4)):g(R).kind===`checkbox`?(l(),n(`input`,P)):g(R).kind===`switch`?(l(),n(`button`,{key:7,type:`button`,role:`switch`,"aria-checked":g(Q),class:`component-demo`,"aria-label":`Switch preview`,onClick:o[0]||=e=>Q.value=!g(Q)},null,8,F)):g(R).kind===`tooltip`?(l(),n(`span`,I,[...o[25]||=[p(` Hover me `,-1),t(`span`,{class:`tooltip-bubble`},`Tooltip text`,-1)]])):g(R).kind===`alert`?(l(),n(`div`,L,[...o[26]||=[t(`div`,null,[t(`div`,{class:`alert-title`},`Heads up`),t(`div`,null,`Something needs your attention.`)],-1)]])):(l(),n(`section`,{key:10,style:r(g(Y)),class:`w-full max-w-xl text-center`,"aria-label":`Hero preview`},[...o[27]||=[t(`h1`,{class:`mb-2 font-bold`},`Hero Title`,-1),t(`p`,{class:`opacity-80`},`Subtitle text`,-1)]],4))],4)]),_:1},8,[`variants`])]),controls:m(()=>[e(k,{label:`Component`,icon:`ph-cube`},{default:m(()=>[e(f,{modelValue:g(R).kind,"onUpdate:modelValue":o[1]||=e=>g(R).kind=e,label:`Type`,options:g(E)},null,8,[`modelValue`,`options`]),e(x,{modelValue:g(R).useGradient,"onUpdate:modelValue":o[2]||=e=>g(R).useGradient=e,label:`Use gradient`},null,8,[`modelValue`]),g(R).useGradient?(l(),n(u,{key:1},[e(D,{"model-value":g(R).gradientFrom,label:`Gradient from`,"onUpdate:modelValue":o[4]||=e=>g(R).gradientFrom=e},null,8,[`model-value`]),e(D,{"model-value":g(R).gradientTo,label:`Gradient to`,"onUpdate:modelValue":o[5]||=e=>g(R).gradientTo=e},null,8,[`model-value`]),e(O,{modelValue:g(R).gradientAngle,"onUpdate:modelValue":o[6]||=e=>g(R).gradientAngle=e,label:`Gradient angle`,min:0,max:360,suffix:`deg`},null,8,[`modelValue`])],64)):(l(),h(D,{key:0,"model-value":g(R).bg,label:`Background`,"onUpdate:modelValue":o[3]||=e=>g(R).bg=e},null,8,[`model-value`])),e(D,{"model-value":g(R).textColor,label:`Text color`,"onUpdate:modelValue":o[7]||=e=>g(R).textColor=e},null,8,[`model-value`]),e(O,{modelValue:g(R).borderRadius,"onUpdate:modelValue":o[8]||=e=>g(R).borderRadius=e,label:`Border radius`,min:0,max:999,suffix:`px`},null,8,[`modelValue`]),e(O,{modelValue:g(R).padding,"onUpdate:modelValue":o[9]||=e=>g(R).padding=e,label:`Padding`,min:0,max:64,suffix:`px`},null,8,[`modelValue`]),e(O,{modelValue:g(R).fontSize,"onUpdate:modelValue":o[10]||=e=>g(R).fontSize=e,label:`Font size`,min:10,max:40,suffix:`px`},null,8,[`modelValue`]),e(O,{modelValue:g(R).fontWeight,"onUpdate:modelValue":o[11]||=e=>g(R).fontWeight=e,label:`Font weight`,min:300,max:900,step:100},null,8,[`modelValue`])]),_:1}),g(R).kind===`card`?(l(),h(k,{key:0,label:`Glass`,icon:`ph-drop-half`},{default:m(()=>[e(x,{modelValue:g(R).useGlass,"onUpdate:modelValue":o[12]||=e=>g(R).useGlass=e,label:`Frosted glass`},null,8,[`modelValue`]),g(R).useGlass?(l(),h(O,{key:0,modelValue:g(R).glassBlur,"onUpdate:modelValue":o[13]||=e=>g(R).glassBlur=e,label:`Backdrop blur`,min:0,max:40,suffix:`px`},null,8,[`modelValue`])):c(``,!0)]),_:1})):c(``,!0),g(R).kind===`switch`?(l(),h(k,{key:1,label:`Track`,icon:`ph-square`},{default:m(()=>[e(D,{"model-value":g(R).borderColor,label:`Track (off) color`,"onUpdate:modelValue":o[14]||=e=>g(R).borderColor=e},null,8,[`model-value`])]),_:1})):g(R).kind===`alert`?(l(),h(k,{key:2,label:`Border`,icon:`ph-square`},{default:m(()=>[e(D,{"model-value":g(R).borderColor,label:`Accent color`,"onUpdate:modelValue":o[15]||=e=>g(R).borderColor=e},null,8,[`model-value`])]),_:1})):(l(),h(k,{key:3,label:`Border`,icon:`ph-square`},{default:m(()=>[e(O,{modelValue:g(R).borderWidth,"onUpdate:modelValue":o[16]||=e=>g(R).borderWidth=e,label:`Border width`,min:0,max:6,suffix:`px`},null,8,[`modelValue`]),g(R).borderWidth>0?(l(),h(D,{key:0,"model-value":g(R).borderColor,label:`Border color`,"onUpdate:modelValue":o[17]||=e=>g(R).borderColor=e},null,8,[`model-value`])):c(``,!0)]),_:1})),g(R).kind===`switch`?c(``,!0):(l(),h(k,{key:4,label:`Shadow & Glow`,icon:`ph-sparkle`},{default:m(()=>[e(O,{modelValue:g(R).shadowY,"onUpdate:modelValue":o[18]||=e=>g(R).shadowY=e,label:`Shadow Y`,min:-30,max:40,suffix:`px`},null,8,[`modelValue`]),e(O,{modelValue:g(R).shadowBlur,"onUpdate:modelValue":o[19]||=e=>g(R).shadowBlur=e,label:`Shadow blur`,min:0,max:80,suffix:`px`},null,8,[`modelValue`]),e(D,{"model-value":g(R).shadowColor,label:`Shadow color`,"onUpdate:modelValue":o[20]||=e=>g(R).shadowColor=e},null,8,[`model-value`]),e(x,{modelValue:g(R).useGlow,"onUpdate:modelValue":o[21]||=e=>g(R).useGlow=e,label:`Glow`},null,8,[`modelValue`]),g(R).useGlow?(l(),n(u,{key:0},[e(D,{"model-value":g(R).glowColor,label:`Glow color`,"onUpdate:modelValue":o[22]||=e=>g(R).glowColor=e},null,8,[`model-value`]),e(O,{modelValue:g(R).glowBlur,"onUpdate:modelValue":o[23]||=e=>g(R).glowBlur=e,label:`Glow blur`,min:0,max:60,suffix:`px`},null,8,[`modelValue`])],64)):c(``,!0)]),_:1}))]),code:m(()=>[e(A,{css:g(K),html:g(q),vars:g(J),filename:`css-studio-component`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{R as default};