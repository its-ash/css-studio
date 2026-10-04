import{A as e,C as t,M as n,R as r,S as i,X as a,ct as o,lt as s,w as c,wt as l}from"./MitKKUeq.js";import{a as u,i as d,l as f,o as p,s as m,t as h}from"./DayxJ-Je.js";import{t as g}from"./D3e07OzS.js";import{t as _}from"./Dh2B6pZ8.js";import{t as v}from"./BYmGHvE7.js";import{t as y}from"./BVp1fOGc.js";var b=[{value:`sine`,label:`Sine`},{value:`zigzag`,label:`Zigzag`},{value:`steps`,label:`Steps`},{value:`blob`,label:`Blob Edge`}],x={skin:`sine`,accent:`#10b981`,bg:`#09090b`,height:120,width:480,amplitude:16,frequency:3,animated:!0,duration:8,layers:2};function S(e){Math.max(40,Math.round(e.width/Math.max(1,e.frequency)));let t=Math.min(60,e.amplitude),n=[];for(let r=0;r<Math.max(1,Math.min(3,e.layers));r++){let i=1-r*.28,a=1-r*.35;n.push(`.wave-layer-${r} {
  position: absolute;
  inset: 0;
  opacity: ${a.toFixed(2)};
  background-image: linear-gradient(${e.accent}${r===0?``:`aa`}, ${e.accent}${r===0?`44`:`22`});
  ${e.skin===`sine`?`border-radius: 100% 100% 0 0 / ${Math.round(t*i)}px ${Math.round(t*i)}px 0 0;`:``}
}`)}`${t}${t}`,t*2,`${t}`;let r=e.animated?`.wave-layer-0 {
  animation: wave-slide ${e.duration}s ease-in-out infinite alternate;
}

.wave-layer-1 {
  animation: wave-slide ${(e.duration*1.4).toFixed(1)}s ease-in-out infinite alternate-reverse;
}

@keyframes wave-slide {
  from { transform: translateX(0); }
  to { transform: translateX(-40px); }
}`:``;return`.wave {
  position: relative;
  width: ${e.width}px;
  height: ${e.height}px;
  background: ${e.bg};
  overflow: hidden;
  ${e.skin===`sine`?`border-radius: ${t}px ${t}px 0 0 / ${t}px ${t}px 0 0;`:``}
  ${e.skin===`blob`?`border-radius: 48% 52% 0 0 / ${t*2}px ${t}px 0 0;`:``}
  ${e.skin===`zigzag`?`clip-path: polygon(0 30%, 6% 55%, 12% 30%, 18% 55%, 24% 30%, 30% 55%, 36% 30%, 42% 55%, 48% 30%, 54% 55%, 60% 30%, 66% 55%, 72% 30%, 78% 55%, 84% 30%, 90% 55%, 96% 30%, 100% 55%, 100% 100%, 0 100%);`:``}
  ${e.skin===`steps`?`clip-path: polygon(0 30%, 8% 30%, 8% 60%, 16% 60%, 16% 30%, 24% 30%, 24% 60%, 32% 60%, 32% 30%, 40% 30%, 40% 60%, 48% 60%, 48% 30%, 56% 30%, 56% 60%, 64% 60%, 64% 30%, 72% 30%, 72% 60%, 80% 60%, 80% 30%, 88% 30%, 88% 60%, 96% 60%, 96% 30%, 100% 30%, 100% 100%, 0 100%);`:``}
}

.wave-fill {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, ${e.accent}, ${e.accent}55);
}

${n.join(`

`)}

${r}`}function C(){return`<div class="wave">
  <div class="wave-fill"></div>
  <div class="wave-layer-1"></div>
  <div class="wave-layer-0"></div>
</div>`}function w(e){return{"--wave-accent":e.accent,"--wave-bg":e.bg,"--wave-amplitude":`${e.amplitude}px`}}function T(e,t){let n=b.map(e=>e.value),r=Math.floor(t.range(0,360));return{...e,skin:t.pick(n),accent:`hsl(${r} 78% 50%)`,bg:`hsl(${r} 12% 6%)`,height:Math.round(t.range(90,160)),amplitude:Math.round(t.range(8,26)),frequency:Math.round(t.range(2,6)),animated:t.chance(.7),duration:Number(t.range(5,14).toFixed(1)),layers:Math.round(t.range(1,3))}}var E=[{name:`Emerald Sine`,tags:[`brand`],state:{...x}},{name:`Deep Ocean`,tags:[`cool`],state:{...x,accent:`#0ea5e9`,bg:`#020617`,layers:3,duration:12}},{name:`Neon Zigzag`,tags:[`neon`],state:{...x,skin:`zigzag`,accent:`#22d3ee`,animated:!1}},{name:`Retro Steps`,tags:[`retro`,`pixel`],state:{...x,skin:`steps`,accent:`#f59e0b`,animated:!1}},{name:`Organic Blob`,tags:[`blob`,`playful`],state:{...x,skin:`blob`,accent:`#8b5cf6`,amplitude:22}},{name:`Calm Layered`,tags:[`calm`],state:{...x,layers:2,duration:18,accent:`#10b981`}},{name:`Frozen Wave`,tags:[`minimal`],state:{...x,animated:!1,layers:1,accent:`#67e8f9`}},{name:`Rose Tide`,tags:[`warm`],state:{...x,accent:`#f43f5e`,layers:2,duration:9}},{name:`Dusk Waves`,tags:[`sunset`],state:{...x,accent:`#fb923c`,bg:`#1c1030`,layers:3,height:140}}],D=[`innerHTML`],O={class:`preview-wave h-full w-full`},k=[`innerHTML`],A=n({__name:`wave`,setup(n){let{state:A,randomize:j,reset:M,undo:N,redo:P,pushHistory:F,shareUrlRef:I}=h({id:`wave`,defaultState:JSON.parse(JSON.stringify(x)),randomize:T}),L=r(`editor:shareUrl`,()=>{});o(()=>L(I.value));let R=i(()=>S(A.value)),z=i(()=>C()),B=i(()=>w(A.value)),V=i(()=>`<style>.preview-wave { display: grid; place-items: center; height: 100%; } ${R.value}</style>`);function H(e){A.value=JSON.parse(JSON.stringify(E[e].state)),F()}let U=i(()=>E.map(e=>({name:e.name,css:S(e.state),html:C()})));return(n,r)=>{let i=f,o=m,h=g,x=p,S=_,C=u,w=v,T=y,F=d;return a(),c(F,{title:`Wave Dividers`,description:`Section wave shapes: sine, zigzag, steps and blobs.`,css:l(R),html:l(z),vars:l(B),onRandomize:l(j),onReset:l(M),onUndo:l(N),onRedo:l(P)},{preview:s(()=>[e(o,{variants:l(U),onApplyVariant:H,title:`Wave preview`,filename:`css-studio-wave`},{presets:s(()=>[e(i,{presets:l(E),onApply:H},null,8,[`presets`])]),default:s(()=>[t(`div`,{innerHTML:l(V),"aria-hidden":`true`},null,8,D),t(`div`,O,[t(`div`,{innerHTML:l(z)},null,8,k)])]),_:1},8,[`variants`])]),controls:s(()=>[e(C,{label:`Wave`,icon:`ph-waves`},{default:s(()=>[e(h,{modelValue:l(A).skin,"onUpdate:modelValue":r[0]||=e=>l(A).skin=e,label:`Shape`,options:l(b)},null,8,[`modelValue`,`options`]),e(x,{modelValue:l(A).amplitude,"onUpdate:modelValue":r[1]||=e=>l(A).amplitude=e,label:`Amplitude`,min:4,max:40,suffix:`px`},null,8,[`modelValue`]),e(x,{modelValue:l(A).frequency,"onUpdate:modelValue":r[2]||=e=>l(A).frequency=e,label:`Frequency`,min:1,max:8},null,8,[`modelValue`]),e(x,{modelValue:l(A).layers,"onUpdate:modelValue":r[3]||=e=>l(A).layers=e,label:`Layers`,min:1,max:3},null,8,[`modelValue`]),e(x,{modelValue:l(A).duration,"onUpdate:modelValue":r[4]||=e=>l(A).duration=e,label:`Duration`,min:3,max:24,step:.5,suffix:`s`},null,8,[`modelValue`]),e(S,{modelValue:l(A).animated,"onUpdate:modelValue":r[5]||=e=>l(A).animated=e,label:`Animate`},null,8,[`modelValue`])]),_:1}),e(C,{label:`Colors`,icon:`ph-palette`},{default:s(()=>[e(w,{"model-value":l(A).accent,label:`Wave`,"onUpdate:modelValue":r[6]||=e=>l(A).accent=e},null,8,[`model-value`]),e(w,{"model-value":l(A).bg,label:`Background`,"onUpdate:modelValue":r[7]||=e=>l(A).bg=e},null,8,[`model-value`])]),_:1})]),code:s(()=>[e(T,{css:l(R),html:l(z),vars:l(B),filename:`css-studio-wave`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{A as default};