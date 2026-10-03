import{A as e,C as t,Kt as n,M as r,R as i,S as a,Ut as o,X as s,ct as c,lt as l,w as u,wt as d}from"./MitKKUeq.js";import{a as f,i as p,n as m,o as h,r as g,s as _,t as v}from"./DJLqZT_o.js";import{t as y}from"./BYmGHvE7.js";import{t as b}from"./CcuAq1zZ.js";var x={direction:`y`,trigger:`hover`,frontBg:`#18181b`,backBg:`#10b981`,frontText:`Hover me`,backText:`Hello!`,textColor:`#fafafa`,width:240,height:160,radius:16,duration:600,perspective:900};function S(e){let t=e.direction===`y`?`rotateY(180deg)`:`rotateX(180deg)`,n=e.trigger===`hover`?`.flip-card:hover `:`.flip-card.flipped `;return`.flip-card {
  width: ${e.width}px;
  height: ${e.height}px;
  perspective: ${e.perspective}px;
  cursor: pointer;
}

.flip-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform ${e.duration}ms cubic-bezier(0.4, 0, 0.2, 1);
}

${n}.flip-inner {
  transform: ${t};
}

.flip-face {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  border-radius: ${e.radius}px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  font-weight: 700;
  color: ${e.textColor};
}

.flip-front {
  background: ${e.frontBg};
  border: 1px solid ${e.textColor}22;
}

.flip-back {
  background: ${e.backBg};
  transform: ${t};
}`}function C(e){return`<div class="flip-card">
  <div class="flip-inner">
    <div class="flip-face flip-front">${e.frontText}</div>
    <div class="flip-face flip-back">${e.backText}</div>
  </div>
</div>`}function w(e){return{"--flip-duration":`${e.duration}ms`,"--flip-front":e.frontBg,"--flip-back":e.backBg}}function T(e,t){let n=Math.floor(t.range(0,360)),r=Math.floor(t.range(0,360));return{...e,direction:t.chance(.6)?`y`:`x`,frontBg:`hsl(${n} 15% 11%)`,backBg:`hsl(${r} 70% 50%)`,width:Math.round(t.range(200,300)),height:Math.round(t.range(140,200)),radius:t.pick([0,12,16,24]),duration:Math.round(t.range(400,900)),perspective:Math.round(t.range(600,1200))}}var E=[{name:`Emerald Reveal`,tags:[`brand`],state:{...x}},{name:`Vertical Flip`,tags:[`3d`],state:{...x,direction:`x`,backBg:`#8b5cf6`}},{name:`Neon Back`,tags:[`glow`,`neon`],state:{...x,backBg:`#22d3ee`,frontBg:`#083344`,frontText:`011010`}},{name:`Fast Flip`,tags:[`snappy`],state:{...x,duration:350,backBg:`#f59e0b`}},{name:`Deep Perspective`,tags:[`3d`,`dramatic`],state:{...x,perspective:1400,duration:800,backBg:`#f43f5e`}},{name:`Square Tile`,tags:[`grid`],state:{...x,width:180,height:180,radius:0,backBg:`#0ea5e9`}},{name:`Always Flipped`,tags:[`static`],state:{...x,trigger:`always`,backBg:`#10b981`}},{name:`Light Card`,tags:[`light`],state:{...x,frontBg:`#f4f4f5`,backBg:`#18181b`,textColor:`#fafafa`}}],D=[`innerHTML`],O={class:`flex h-full w-full max-w-2xl flex-col items-center justify-center gap-6 p-6`},k=[`innerHTML`],A={class:`max-w-xs text-center text-[11px] text-muted`},j={class:`grid grid-cols-2 gap-2`},M=[`aria-pressed`],N=[`aria-pressed`],P=r({__name:`flip-card`,setup(r){let{state:P,randomize:F,reset:I,undo:L,redo:R,pushHistory:z,shareUrlRef:B}=v({id:`flip-card`,defaultState:JSON.parse(JSON.stringify(x)),randomize:T}),V=i(`editor:shareUrl`,()=>{});c(()=>V(B.value));let H=a(()=>S(P.value)),U=a(()=>C(P.value)),W=a(()=>w(P.value)),G=a(()=>`<style>${H.value}</style>`);function K(e){P.value=JSON.parse(JSON.stringify(E[e].state)),z()}let q=a(()=>E.map(e=>({name:e.name,css:S(e.state),html:C(e.state)})));return(r,i)=>{let a=_,c=h,v=b,x=f,S=p,C=y,w=g,T=m;return s(),u(T,{title:`Flip Card Studio`,description:`3D flip cards with front/back faces — no JavaScript.`,css:d(H),html:d(U),vars:d(W),onRandomize:d(F),onReset:d(I),onUndo:d(L),onRedo:d(R)},{preview:l(()=>[e(c,{variants:d(q),onApplyVariant:K,title:`Flip card preview`,filename:`css-studio-flip-card`},{presets:l(()=>[e(a,{presets:d(E),onApply:K},null,8,[`presets`])]),default:l(()=>[t(`div`,{innerHTML:d(G),"aria-hidden":`true`},null,8,D),t(`div`,O,[t(`div`,{innerHTML:d(U)},null,8,k),t(`p`,A,n(d(P).trigger===`hover`?`Hover the card to flip it.`:`Card is locked in the flipped state.`),1)])]),_:1},8,[`variants`])]),controls:l(()=>[e(S,{label:`Flip`,icon:`ph-rectangle`},{default:l(()=>[t(`div`,j,[t(`button`,{type:`button`,class:o([`h-9 rounded-lg border text-xs font-medium transition-colors duration-150`,d(P).direction===`y`?`border-accent/70 bg-accent/8 text-fg`:`border-line text-muted hover:bg-line/15`]),"aria-pressed":d(P).direction===`y`,onClick:i[0]||=e=>d(P).direction=`y`},`↔ Horizontal`,10,M),t(`button`,{type:`button`,class:o([`h-9 rounded-lg border text-xs font-medium transition-colors duration-150`,d(P).direction===`x`?`border-accent/70 bg-accent/8 text-fg`:`border-line text-muted hover:bg-line/15`]),"aria-pressed":d(P).direction===`x`,onClick:i[1]||=e=>d(P).direction=`x`},`↕ Vertical`,10,N)]),e(v,{modelValue:d(P).frontText,"onUpdate:modelValue":i[2]||=e=>d(P).frontText=e,label:`Front text`},null,8,[`modelValue`]),e(v,{modelValue:d(P).backText,"onUpdate:modelValue":i[3]||=e=>d(P).backText=e,label:`Back text`},null,8,[`modelValue`]),e(x,{modelValue:d(P).duration,"onUpdate:modelValue":i[4]||=e=>d(P).duration=e,label:`Duration`,min:200,max:1200,step:50,suffix:`ms`},null,8,[`modelValue`]),e(x,{modelValue:d(P).perspective,"onUpdate:modelValue":i[5]||=e=>d(P).perspective=e,label:`Perspective`,min:400,max:1600,step:50,suffix:`px`},null,8,[`modelValue`])]),_:1}),e(S,{label:`Card`,icon:`ph-cards`},{default:l(()=>[e(x,{modelValue:d(P).width,"onUpdate:modelValue":i[6]||=e=>d(P).width=e,label:`Width`,min:160,max:360,step:10,suffix:`px`},null,8,[`modelValue`]),e(x,{modelValue:d(P).height,"onUpdate:modelValue":i[7]||=e=>d(P).height=e,label:`Height`,min:110,max:260,step:10,suffix:`px`},null,8,[`modelValue`]),e(x,{modelValue:d(P).radius,"onUpdate:modelValue":i[8]||=e=>d(P).radius=e,label:`Radius`,min:0,max:28,suffix:`px`},null,8,[`modelValue`]),e(C,{"model-value":d(P).frontBg,label:`Front`,"onUpdate:modelValue":i[9]||=e=>d(P).frontBg=e},null,8,[`model-value`]),e(C,{"model-value":d(P).backBg,label:`Back`,"onUpdate:modelValue":i[10]||=e=>d(P).backBg=e},null,8,[`model-value`]),e(C,{"model-value":d(P).textColor,label:`Text`,"onUpdate:modelValue":i[11]||=e=>d(P).textColor=e},null,8,[`model-value`])]),_:1})]),code:l(()=>[e(w,{css:d(H),html:d(U),vars:d(W),filename:`css-studio-flip-card`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{P as default};