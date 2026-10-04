import{A as e,C as t,Kt as n,M as r,R as i,S as a,X as o,ct as s,lt as c,w as l,wt as u}from"./MitKKUeq.js";import{a as d,i as f,l as p,o as m,s as h,t as g}from"./CJu4WcQG.js";import{t as _}from"./D3e07OzS.js";import{t as v}from"./BYmGHvE7.js";import{t as y}from"./o8u_Jv9o.js";var b=[{value:`lift`,label:`Lift`},{value:`glow`,label:`Glow`},{value:`underline-sweep`,label:`Underline Sweep`},{value:`fill-slide`,label:`Fill Slide`},{value:`tilt-3d`,label:`3D Tilt`},{value:`shadow-pop`,label:`Shadow Pop`},{value:`shine-sweep`,label:`Shine Sweep`},{value:`pulse-ring`,label:`Pulse Ring`}],x={kind:`lift`,accent:`#10b981`,bg:`#18181b`,textColor:`#fafafa`,radius:12,duration:200,distance:6},S=`cubic-bezier(0.4, 0, 0.2, 1)`;function C(e){let t=`${e.duration}ms ${S}`,n=`.hover-demo {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border: 1px solid ${e.accent}33;
  border-radius: ${e.radius}px;
  background: ${e.bg};
  color: ${e.textColor};
  font-weight: 600;
  cursor: pointer;
  transition:
    transform ${t},
    box-shadow ${t},
    background-color ${t},
    color ${t},
    border-color ${t};
}`;switch(e.kind){case`lift`:return`${n}

.hover-demo:hover {
  transform: translateY(-${e.distance}px);
  border-color: ${e.accent};
  box-shadow: 0 ${e.distance*2}px ${e.distance*4}px -${e.distance}px ${e.accent}55;
}`;case`glow`:return`${n}

.hover-demo:hover {
  border-color: ${e.accent};
  box-shadow: 0 0 ${e.distance*6}px ${e.accent}66, 0 0 ${e.distance*14}px ${e.accent}33;
}`;case`underline-sweep`:return`${n}

.hover-demo::after {
  content: '';
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 8px;
  height: 2px;
  background: ${e.accent};
  transform: scaleX(0);
  transform-origin: left;
  transition: transform ${t};
}

.hover-demo:hover::after {
  transform: scaleX(1);
}`;case`fill-slide`:return`${n}
  background-image: linear-gradient(${e.accent}, ${e.accent});
  background-repeat: no-repeat;
  background-position: left bottom;
  background-size: 0% 100%;
  transition:
    background-size ${t},
    color ${t},
    border-color ${t};
}

.hover-demo:hover {
  background-size: 100% 100%;
  color: ${e.bg};
  border-color: ${e.accent};
}`;case`tilt-3d`:return`${n}
  transform-style: preserve-3d;
}

.hover-demo:hover {
  transform: perspective(600px) rotateX(${Math.min(10,e.distance)}deg) scale(1.03);
  border-color: ${e.accent};
}`;case`shadow-pop`:return`${n}

.hover-demo:hover {
  transform: translateY(-${Math.max(2,Math.round(e.distance/2))}px);
  box-shadow: 0 ${e.distance}px 0 0 ${e.accent};
}`;case`shine-sweep`:{let t=`${e.duration*3}ms ${S}`;return`${n}
  overflow: hidden;
}

.hover-demo::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 30%, ${e.accent}55 50%, transparent 70%);
  transform: translateX(-130%);
  transition: transform ${t};
}

.hover-demo:hover::before {
  transform: translateX(130%);
}`}case`pulse-ring`:return`${n}

.hover-demo::after {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: inherit;
  border: 2px solid ${e.accent};
  opacity: 0;
  pointer-events: none;
}

.hover-demo:hover::after {
  animation: hover-ring ${e.duration*2}ms ease-out infinite;
}

@keyframes hover-ring {
  0% {
    opacity: 0.8;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.18);
  }
}`}}function w(){return`<button class="hover-demo" type="button">Hover me</button>`}function T(e){return{"--hover-accent":e.accent,"--hover-bg":e.bg,"--hover-duration":`${e.duration}ms`,"--hover-distance":`${e.distance}px`}}function E(e,t){let n=b.map(e=>e.value),r=Math.floor(t.range(0,360));return{...e,kind:t.pick(n),accent:`hsl(${r} 80% 55%)`,bg:`hsl(${r} 15% 10%)`,textColor:`hsl(${r} 20% 96%)`,radius:t.pick([0,8,12,999]),duration:Math.round(t.range(120,400)),distance:Math.round(t.range(3,10))}}var D=[{name:`Emerald Lift`,tags:[`brand`],state:{...x}},{name:`Neon Glow`,tags:[`glow`,`neon`],state:{...x,kind:`glow`,accent:`#22d3ee`,bg:`#083344`,distance:8}},{name:`Underline Ink`,tags:[`minimal`,`editorial`],state:{...x,kind:`underline-sweep`,accent:`#fafafa`,bg:`#18181b`,radius:8}},{name:`Fill Slide`,tags:[`bold`],state:{...x,kind:`fill-slide`,accent:`#8b5cf6`,radius:999}},{name:`Tilt Card`,tags:[`3d`,`playful`],state:{...x,kind:`tilt-3d`,accent:`#f59e0b`,distance:8}},{name:`Shadow Pop`,tags:[`playful`],state:{...x,kind:`shadow-pop`,accent:`#f43f5e`,radius:0,distance:6}},{name:`Shine Sweep`,tags:[`shine`,`premium`],state:{...x,kind:`shine-sweep`,accent:`#ffffff`,bg:`#09090b`,radius:999,duration:300}},{name:`Pulse Ring`,tags:[`ring`,`attention`],state:{...x,kind:`pulse-ring`,accent:`#0ea5e9`,radius:999,duration:250}},{name:`Light Surface`,tags:[`light`],state:{...x,bg:`#f4f4f5`,textColor:`#18181b`,accent:`#10b981`}},{name:`Soft Lift`,tags:[`minimal`,`soft`],state:{...x,kind:`lift`,accent:`#71717a`,duration:300,distance:4}}],O=[`innerHTML`],k={class:`flex h-full w-full max-w-2xl flex-col items-center justify-center gap-8 p-6`},A={class:`max-w-xs text-center text-[11px] text-muted`},j=r({__name:`hover`,setup(r){let{state:S,randomize:j,reset:M,undo:N,redo:P,pushHistory:F,shareUrlRef:I}=g({id:`hover`,defaultState:JSON.parse(JSON.stringify(x)),randomize:E}),L=i(`editor:shareUrl`,()=>{});s(()=>L(I.value));let R=a(()=>C(S.value)),z=a(()=>w()),B=a(()=>T(S.value)),V=a(()=>`<style>${R.value}</style>`);function H(e){S.value=JSON.parse(JSON.stringify(D[e].state)),F()}let U=a(()=>D.map(e=>({name:e.name,css:C(e.state),html:w()})));return(r,i)=>{let a=p,s=h,g=_,x=m,C=d,w=v,T=y,E=f;return o(),l(E,{title:`Hover Effects`,description:`Pure-CSS hover micro-interactions for buttons and cards.`,css:u(R),html:u(z),vars:u(B),onRandomize:u(j),onReset:u(M),onUndo:u(N),onRedo:u(P)},{preview:c(()=>[e(s,{variants:u(U),onApplyVariant:H,title:`Hover preview`,filename:`css-studio-hover`},{presets:c(()=>[e(a,{presets:u(D),onApply:H},null,8,[`presets`])]),default:c(()=>[t(`div`,{innerHTML:u(V),"aria-hidden":`true`},null,8,O),t(`div`,k,[i[7]||=t(`button`,{class:`hover-demo`,type:`button`,"aria-label":`Hover effect preview`},`Hover me`,-1),t(`p`,A,`Move your cursor over the button to preview the `+n(u(S).kind.replace(`-`,` `))+` effect.`,1)])]),_:1},8,[`variants`])]),controls:c(()=>[e(C,{label:`Effect`,icon:`ph-cursor-click`},{default:c(()=>[e(g,{modelValue:u(S).kind,"onUpdate:modelValue":i[0]||=e=>u(S).kind=e,label:`Type`,options:u(b)},null,8,[`modelValue`,`options`]),e(x,{modelValue:u(S).duration,"onUpdate:modelValue":i[1]||=e=>u(S).duration=e,label:`Duration`,min:80,max:600,step:10,suffix:`ms`},null,8,[`modelValue`]),e(x,{modelValue:u(S).distance,"onUpdate:modelValue":i[2]||=e=>u(S).distance=e,label:`Intensity`,min:2,max:12,suffix:`px`},null,8,[`modelValue`]),e(x,{modelValue:u(S).radius,"onUpdate:modelValue":i[3]||=e=>u(S).radius=e,label:`Radius`,min:0,max:24,suffix:`px`},null,8,[`modelValue`])]),_:1}),e(C,{label:`Colors`,icon:`ph-palette`},{default:c(()=>[e(w,{"model-value":u(S).accent,label:`Accent`,"onUpdate:modelValue":i[4]||=e=>u(S).accent=e},null,8,[`model-value`]),e(w,{"model-value":u(S).bg,label:`Background`,"onUpdate:modelValue":i[5]||=e=>u(S).bg=e},null,8,[`model-value`]),e(w,{"model-value":u(S).textColor,label:`Text`,"onUpdate:modelValue":i[6]||=e=>u(S).textColor=e},null,8,[`model-value`])]),_:1})]),code:c(()=>[e(T,{css:u(R),html:u(z),vars:u(B),filename:`css-studio-hover`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{j as default};