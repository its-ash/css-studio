import{A as e,C as t,M as n,R as r,S as i,X as a,ct as o,lt as s,w as c,wt as l}from"./MitKKUeq.js";import{a as u,i as d,n as f,r as p,s as m,t as h}from"./BPBkcUFJ.js";import{t as g}from"./D3e07OzS.js";import{t as _}from"./Dh2B6pZ8.js";import{t as v}from"./BYmGHvE7.js";import{t as y}from"./Cw1rlFxN.js";var b=[{value:`aurora`,label:`Aurora`},{value:`stars`,label:`Starfield`},{value:`sunset`,label:`Sunset`},{value:`moonlight`,label:`Moonlight`}],x={kind:`aurora`,color1:`#10b981`,color2:`#22d3ee`,color3:`#8b5cf6`,speed:12,showStars:!0,width:480,height:300,radius:16};function S(e){let t=e.showStars?`.aurora::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(1px 1px at 20% 30%, #fff 100%, transparent),
    radial-gradient(1px 1px at 60% 15%, #fff 100%, transparent),
    radial-gradient(1.5px 1.5px at 80% 60%, #fff 100%, transparent),
    radial-gradient(1px 1px at 40% 70%, #ffffffcc 100%, transparent),
    radial-gradient(1px 1px at 10% 80%, #ffffff99 100%, transparent),
    radial-gradient(1.5px 1.5px at 70% 40%, #fff 100%, transparent);
  pointer-events: none;
}`:``;switch(e.kind){case`aurora`:return`.aurora {
  position: relative;
  width: ${e.width}px;
  height: ${e.height}px;
  border-radius: ${e.radius}px;
  overflow: hidden;
  background: #050510;
  isolation: isolate;
}

.aurora::before {
  content: '';
  position: absolute;
  inset: -40%;
  background:
    radial-gradient(40% 55% at 20% 30%, ${e.color1}55 0%, transparent 60%),
    radial-gradient(35% 50% at 55% 20%, ${e.color2}55 0%, transparent 60%),
    radial-gradient(45% 60% at 80% 45%, ${e.color3}44 0%, transparent 60%);
  filter: blur(28px);
  animation: aurora-drift ${e.speed}s ease-in-out infinite alternate;
}

@keyframes aurora-drift {
  0% {
    transform: translate(-4%, -2%) rotate(-4deg) scale(1);
  }
  100% {
    transform: translate(4%, 3%) rotate(5deg) scale(1.12);
  }
}

${t}`;case`stars`:return`.aurora {
  position: relative;
  width: ${e.width}px;
  height: ${e.height}px;
  border-radius: ${e.radius}px;
  overflow: hidden;
  background: radial-gradient(120% 100% at 50% 0%, #0c1440 0%, #050510 70%);
  isolation: isolate;
}

.aurora::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(1px 1px at 20% 30%, #fff 100%, transparent),
    radial-gradient(1px 1px at 60% 15%, #fff 100%, transparent),
    radial-gradient(1.5px 1.5px at 80% 60%, #fff 100%, transparent),
    radial-gradient(1px 1px at 40% 70%, #ffffffcc 100%, transparent),
    radial-gradient(1px 1px at 10% 80%, #ffffff99 100%, transparent),
    radial-gradient(1.5px 1.5px at 70% 40%, #fff 100%, transparent),
    radial-gradient(1px 1px at 30% 55%, #fff 100%, transparent);
  animation: twinkle ${Math.max(2,Math.round(e.speed/3))}s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes twinkle {
  0% { opacity: 0.5; }
  100% { opacity: 1; }
}`;case`sunset`:return`.aurora {
  position: relative;
  width: ${e.width}px;
  height: ${e.height}px;
  border-radius: ${e.radius}px;
  overflow: hidden;
  background: linear-gradient(180deg, ${e.color3} 0%, ${e.color2} 45%, ${e.color1} 75%, #f59e0b 100%);
}

.aurora::before {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -${Math.round(e.height/5)}px;
  width: ${Math.round(e.height/2.2)}px;
  height: ${Math.round(e.height/2.2)}px;
  border-radius: 999px;
  background: radial-gradient(circle, #fff7ed 0%, #fdba74 60%, transparent 70%);
  transform: translateX(-50%);
  filter: blur(2px);
  animation: sun-pulse ${e.speed}s ease-in-out infinite alternate;
}

@keyframes sun-pulse {
  from { transform: translateX(-50%) translateY(0) scale(1); }
  to { transform: translateX(-50%) translateY(-8px) scale(1.06); }
}

${t}`;case`moonlight`:return`.aurora {
  position: relative;
  width: ${e.width}px;
  height: ${e.height}px;
  border-radius: ${e.radius}px;
  overflow: hidden;
  background: linear-gradient(180deg, #0b1026 0%, #101828 60%, #1e293b 100%);
  isolation: isolate;
}

.aurora::before {
  content: '';
  position: absolute;
  top: ${Math.round(e.height/8)}px;
  right: ${Math.round(e.width/6)}px;
  width: ${Math.round(e.height/5)}px;
  height: ${Math.round(e.height/5)}px;
  border-radius: 999px;
  background: radial-gradient(circle at 35% 35%, #f8fafc 0%, #cbd5e1 70%);
  box-shadow: 0 0 ${Math.round(e.height/6)}px #e2e8f066;
  animation: moon-rise ${e.speed}s ease-in-out infinite alternate;
}

@keyframes moon-rise {
  from { transform: translateY(0); }
  to { transform: translateY(-6px); }
}

${t}`}}function C(){return`<div class="aurora"></div>`}function w(e){return{"--aurora-c1":e.color1,"--aurora-c2":e.color2,"--aurora-c3":e.color3,"--aurora-speed":`${e.speed}s`}}function T(e,t){let n=b.map(e=>e.value),r=Math.floor(t.range(0,360));return{...e,kind:t.pick(n),color1:`hsl(${r} 80% 55%)`,color2:`hsl(${(r+60)%360} 80% 60%)`,color3:`hsl(${(r+160)%360} 80% 60%)`,speed:Number(t.range(6,20).toFixed(1)),showStars:t.chance(.6),height:Math.round(t.range(240,340))}}var E=[{name:`Emerald Aurora`,tags:[`brand`],state:{...x}},{name:`Violet Night`,tags:[`night`],state:{...x,color1:`#8b5cf6`,color2:`#ec4899`,color3:`#312e81`,speed:16}},{name:`Deep Space`,tags:[`stars`,`dark`],state:{...x,kind:`stars`,speed:6}},{name:`Golden Sunset`,tags:[`warm`],state:{...x,kind:`sunset`,color3:`#7c2d12`,color2:`#c2410c`,color1:`#f59e0b`}},{name:`Moonlit`,tags:[`moon`,`calm`],state:{...x,kind:`moonlight`,speed:14,showStars:!0}},{name:`Frozen North`,tags:[`cool`],state:{...x,color1:`#22d3ee`,color2:`#67e8f9`,color3:`#155e75`,speed:10}},{name:`Starless Drift`,tags:[`minimal`],state:{...x,showStars:!1,speed:20}},{name:`Pink Dawn`,tags:[`warm`],state:{...x,kind:`aurora`,color1:`#f43f5e`,color2:`#fb7185`,color3:`#581c87`,height:260}}],D=[`innerHTML`],O={class:`preview-aurora h-full w-full`},k=[`innerHTML`],A=n({__name:`aurora`,setup(n){let{state:A,randomize:j,reset:M,undo:N,redo:P,pushHistory:F,shareUrlRef:I}=h({id:`aurora`,defaultState:JSON.parse(JSON.stringify(x)),randomize:T}),L=r(`editor:shareUrl`,()=>{});o(()=>L(I.value));let R=i(()=>S(A.value)),z=i(()=>C()),B=i(()=>w(A.value)),V=i(()=>`<style>.preview-aurora { display: grid; place-items: center; height: 100%; } ${R.value}</style>`);function H(e){A.value=JSON.parse(JSON.stringify(E[e].state)),F()}let U=i(()=>E.map(e=>({name:e.name,css:S(e.state),html:C()})));return(n,r)=>{let i=m,o=u,h=g,x=d,S=_,C=p,w=v,T=y,F=f;return a(),c(F,{title:`Aurora & Sky Backgrounds`,description:`Animated aurora, stars, sunset and moonlight scenes.`,css:l(R),html:l(z),vars:l(B),onRandomize:l(j),onReset:l(M),onUndo:l(N),onRedo:l(P)},{preview:s(()=>[e(o,{variants:l(U),onApplyVariant:H,title:`Aurora preview`,filename:`css-studio-aurora`},{presets:s(()=>[e(i,{presets:l(E),onApply:H},null,8,[`presets`])]),default:s(()=>[t(`div`,{innerHTML:l(V),"aria-hidden":`true`},null,8,D),t(`div`,O,[t(`div`,{innerHTML:l(z)},null,8,k)])]),_:1},8,[`variants`])]),controls:s(()=>[e(C,{label:`Scene`,icon:`ph-sparkle`},{default:s(()=>[e(h,{modelValue:l(A).kind,"onUpdate:modelValue":r[0]||=e=>l(A).kind=e,label:`Type`,options:l(b)},null,8,[`modelValue`,`options`]),e(x,{modelValue:l(A).speed,"onUpdate:modelValue":r[1]||=e=>l(A).speed=e,label:`Speed`,min:3,max:30,step:.5,suffix:`s`},null,8,[`modelValue`]),e(x,{modelValue:l(A).width,"onUpdate:modelValue":r[2]||=e=>l(A).width=e,label:`Width`,min:320,max:640,step:10,suffix:`px`},null,8,[`modelValue`]),e(x,{modelValue:l(A).height,"onUpdate:modelValue":r[3]||=e=>l(A).height=e,label:`Height`,min:200,max:400,step:10,suffix:`px`},null,8,[`modelValue`]),e(x,{modelValue:l(A).radius,"onUpdate:modelValue":r[4]||=e=>l(A).radius=e,label:`Radius`,min:0,max:28,suffix:`px`},null,8,[`modelValue`]),e(S,{modelValue:l(A).showStars,"onUpdate:modelValue":r[5]||=e=>l(A).showStars=e,label:`Stars`},null,8,[`modelValue`])]),_:1}),e(C,{label:`Colors`,icon:`ph-palette`},{default:s(()=>[e(w,{"model-value":l(A).color1,label:`Color 1`,"onUpdate:modelValue":r[6]||=e=>l(A).color1=e},null,8,[`model-value`]),e(w,{"model-value":l(A).color2,label:`Color 2`,"onUpdate:modelValue":r[7]||=e=>l(A).color2=e},null,8,[`model-value`]),e(w,{"model-value":l(A).color3,label:`Color 3`,"onUpdate:modelValue":r[8]||=e=>l(A).color3=e},null,8,[`model-value`])]),_:1})]),code:s(()=>[e(T,{css:l(R),html:l(z),vars:l(B),filename:`css-studio-aurora`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{A as default};