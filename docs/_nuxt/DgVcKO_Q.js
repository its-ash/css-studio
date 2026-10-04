import{A as e,C as t,E as n,M as r,R as i,S as a,T as o,X as s,_ as c,ct as l,lt as u,w as d,wt as f}from"./MitKKUeq.js";import{a as p,i as m,l as h,o as g,s as _,t as v}from"./DayxJ-Je.js";import{t as y}from"./D3e07OzS.js";import{t as b}from"./BYmGHvE7.js";import{t as x}from"./BVp1fOGc.js";import{t as S}from"./CcuAq1zZ.js";var C=[{value:`typewriter`,label:`Typewriter`},{value:`wave`,label:`Wave`},{value:`glitch`,label:`Glitch`},{value:`blur-in`,label:`Blur In`},{value:`stagger-rise`,label:`Stagger Rise`},{value:`blink-caret`,label:`Blink Caret`}],w={kind:`typewriter`,text:`CSS Studio`,color:`#fafafa`,fontSize:42,fontWeight:700,duration:2400,chars:10,glitchColor1:`#22d3ee`,glitchColor2:`#f43f5e`};function T(e){switch(e.kind){case`typewriter`:return`.type-text {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  border-right: 3px solid ${e.color};
  font-size: ${e.fontSize}px;
  font-weight: ${e.fontWeight};
  color: ${e.color};
  width: 0;
  animation: typing ${e.duration}ms steps(${Math.max(1,e.chars)}) forwards, caret 700ms step-end infinite;
}

@keyframes typing {
  to {
    width: 100%;
  }
}

@keyframes caret {
  50% {
    border-color: transparent;
  }
}`;case`wave`:return`.wave-text {
  display: inline-flex;
  font-size: ${e.fontSize}px;
  font-weight: ${e.fontWeight};
  color: ${e.color};
}

.wave-text span {
  display: inline-block;
  animation: wave-bounce ${e.duration}ms ease-in-out infinite;
  animation-delay: calc(var(--i) * ${(e.duration/10).toFixed(0)}ms);
}

@keyframes wave-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-${Math.max(6,Math.round(e.fontSize/5))}px);
  }
}`;case`glitch`:return`.glitch-text {
  position: relative;
  font-size: ${e.fontSize}px;
  font-weight: ${e.fontWeight};
  color: ${e.color};
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.glitch-text::before {
  color: ${e.glitchColor1};
  animation: glitch-a ${e.duration}ms steps(2) infinite;
}

.glitch-text::after {
  color: ${e.glitchColor2};
  animation: glitch-b ${e.duration}ms steps(2) infinite reverse;
}

@keyframes glitch-a {
  0%, 86%, 100% {
    transform: translate(0);
    opacity: 0;
  }
  88% {
    transform: translate(-3px, -2px);
    opacity: 1;
  }
  94% {
    transform: translate(2px, 1px);
    opacity: 1;
  }
}

@keyframes glitch-b {
  0%, 84%, 100% {
    transform: translate(0);
    opacity: 0;
  }
  90% {
    transform: translate(3px, 2px);
    opacity: 1;
  }
  96% {
    transform: translate(-2px, -1px);
    opacity: 1;
  }
}`;case`blur-in`:return`.blur-text {
  font-size: ${e.fontSize}px;
  font-weight: ${e.fontWeight};
  color: ${e.color};
  animation: blur-in ${e.duration}ms ease-out both;
}

@keyframes blur-in {
  from {
    opacity: 0;
    filter: blur(14px);
    letter-spacing: 0.3em;
  }
  to {
    opacity: 1;
    filter: blur(0);
    letter-spacing: normal;
  }
}`;case`stagger-rise`:return`.rise-text {
  display: inline-flex;
  overflow: hidden;
  font-size: ${e.fontSize}px;
  font-weight: ${e.fontWeight};
  color: ${e.color};
}

.rise-text span {
  display: inline-block;
  transform: translateY(110%);
  animation: rise-up ${e.duration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: calc(var(--i) * ${(e.duration/12).toFixed(0)}ms);
}

@keyframes rise-up {
  to {
    transform: translateY(0);
  }
}`;case`blink-caret`:return`.blink-text {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: ${e.fontSize}px;
  font-weight: ${e.fontWeight};
  color: ${e.color};
}

.blink-text::after {
  content: '';
  width: ${Math.max(2,Math.round(e.fontSize/14))}px;
  height: 1em;
  background: ${e.color};
  animation: blink ${Math.round(e.duration/6)}ms step-end infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}`}}function E(e){if(e.kind===`wave`||e.kind===`stagger-rise`){let t=[...e.text].map((e,t)=>`  <span style="--i: ${t}">${e===` `?`&nbsp;`:e}</span>`).join(`
`);return`<span class="${e.kind===`wave`?`wave`:`rise`}-text" aria-label="${e.text}">\n${t}\n</span>`}return e.kind===`glitch`?`<span class="glitch-text" data-text="${e.text}">${e.text}</span>`:`<span class="${e.kind===`typewriter`?`type`:`blink`}-text">${e.text}</span>`}function D(e){return{"--anim-color":e.color,"--anim-duration":`${e.duration}ms`}}function O(e,t){let n=C.map(e=>e.value),r=Math.floor(t.range(0,360)),i=[`CSS Studio`,`Ship faster`,`Hello World`,`Design in code`,`Pure CSS`];return{...e,kind:t.pick(n),text:t.pick(i),color:`hsl(${r} 20% 96%)`,fontSize:Math.round(t.range(28,56)),fontWeight:t.pick([400,600,700,800]),duration:Math.round(t.range(1200,3200)),glitchColor1:`hsl(${r} 85% 60%)`,glitchColor2:`hsl(${(r+180)%360} 85% 60%)`}}var k=[{name:`Terminal Type`,tags:[`mono`,`terminal`],state:{...w,kind:`typewriter`,text:`npm install css-studio`}},{name:`Hello Wave`,tags:[`playful`],state:{...w,kind:`wave`,text:`Hello!`}},{name:`Neon Glitch`,tags:[`glitch`,`neon`],state:{...w,kind:`glitch`,text:`GLITCH`,glitchColor1:`#22d3ee`,glitchColor2:`#f43f5e`}},{name:`Blur Reveal`,tags:[`elegant`],state:{...w,kind:`blur-in`,text:`Design in code`,duration:1800}},{name:`Letter Rise`,tags:[`editorial`],state:{...w,kind:`stagger-rise`,text:`Ship it`,duration:1600}},{name:`Prompt Caret`,tags:[`terminal`],state:{...w,kind:`blink-caret`,text:`>_`,fontSize:36}},{name:`Cinematic`,tags:[`film`],state:{...w,kind:`blur-in`,text:`A story in CSS`,duration:2600,fontWeight:400,fontSize:36}},{name:`Bouncy Wave`,tags:[`playful`],state:{...w,kind:`wave`,text:`Bounce`,color:`#f59e0b`,fontSize:48}},{name:`Rose Glitch`,tags:[`glitch`,`warm`],state:{...w,kind:`glitch`,text:`ERROR 404`,glitchColor1:`#f43f5e`,glitchColor2:`#fafafa`}},{name:`Slow Type`,tags:[`calm`],state:{...w,kind:`typewriter`,text:`Loading…`,duration:3200}}],A=[`innerHTML`],j={class:`flex h-full w-full max-w-2xl flex-col items-center justify-center gap-8 p-6`},M=[`innerHTML`],N=r({__name:`text-anim`,setup(r){let{state:N,randomize:P,reset:F,undo:I,redo:L,pushHistory:R,shareUrlRef:z}=v({id:`text-anim`,defaultState:JSON.parse(JSON.stringify(w)),randomize:O}),B=i(`editor:shareUrl`,()=>{});l(()=>B(z.value));let V=a(()=>T(N.value)),H=a(()=>E(N.value)),U=a(()=>D(N.value)),W=a(()=>`<style>${V.value}</style>`);function G(e){N.value=JSON.parse(JSON.stringify(k[e].state)),R()}let K=a(()=>k.map(e=>({name:e.name,css:T(e.state),html:E(e.state)})));return(r,i)=>{let a=h,l=_,v=y,w=S,T=g,E=p,D=b,O=x,R=m;return s(),d(R,{title:`Text Animations`,description:`Typewriter, wave, glitch and reveal text — keyframes only.`,css:f(V),html:f(H),vars:f(U),onRandomize:f(P),onReset:f(F),onUndo:f(I),onRedo:f(L)},{preview:u(()=>[e(l,{variants:f(K),onApplyVariant:G,title:`Text animation preview`,filename:`css-studio-text-anim`},{presets:u(()=>[e(a,{presets:f(k),onApply:G},null,8,[`presets`])]),default:u(()=>[t(`div`,{innerHTML:f(W),"aria-hidden":`true`},null,8,A),t(`div`,j,[t(`div`,{innerHTML:f(H)},null,8,M),i[8]||=t(`p`,{class:`max-w-xs text-center text-[11px] text-muted`},`Animation loops live — press reset to replay it.`,-1)])]),_:1},8,[`variants`])]),controls:u(()=>[e(E,{label:`Animation`,icon:`ph-text-aa`},{default:u(()=>[e(v,{modelValue:f(N).kind,"onUpdate:modelValue":i[0]||=e=>f(N).kind=e,label:`Type`,options:f(C)},null,8,[`modelValue`,`options`]),e(w,{modelValue:f(N).text,"onUpdate:modelValue":i[1]||=e=>f(N).text=e,label:`Text`,placeholder:`Your text`},null,8,[`modelValue`]),e(T,{modelValue:f(N).duration,"onUpdate:modelValue":i[2]||=e=>f(N).duration=e,label:`Duration`,min:600,max:5e3,step:100,suffix:`ms`},null,8,[`modelValue`]),e(T,{modelValue:f(N).fontSize,"onUpdate:modelValue":i[3]||=e=>f(N).fontSize=e,label:`Font size`,min:22,max:64,suffix:`px`},null,8,[`modelValue`]),e(T,{modelValue:f(N).fontWeight,"onUpdate:modelValue":i[4]||=e=>f(N).fontWeight=e,label:`Weight`,min:300,max:900,step:100},null,8,[`modelValue`])]),_:1}),e(E,{label:`Colors`,icon:`ph-palette`},{default:u(()=>[e(D,{"model-value":f(N).color,label:`Text`,"onUpdate:modelValue":i[5]||=e=>f(N).color=e},null,8,[`model-value`]),f(N).kind===`glitch`?(s(),n(c,{key:0},[e(D,{"model-value":f(N).glitchColor1,label:`Glitch A`,"onUpdate:modelValue":i[6]||=e=>f(N).glitchColor1=e},null,8,[`model-value`]),e(D,{"model-value":f(N).glitchColor2,label:`Glitch B`,"onUpdate:modelValue":i[7]||=e=>f(N).glitchColor2=e},null,8,[`model-value`])],64)):o(``,!0)]),_:1})]),code:u(()=>[e(O,{css:f(V),html:f(H),vars:f(U),filename:`css-studio-text-anim`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{N as default};