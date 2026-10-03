import{A as e,C as t,M as n,R as r,S as i,X as a,ct as o,lt as s,w as c,wt as l}from"./MitKKUeq.js";import{a as u,i as d,n as f,r as p,s as m,t as h}from"./BPBkcUFJ.js";import{t as g}from"./D3e07OzS.js";import{t as _}from"./BYmGHvE7.js";import{t as v}from"./Cw1rlFxN.js";var y=[{value:`grow`,label:`Grow`},{value:`slide`,label:`Slide`},{value:`offset`,label:`Offset Grow`},{value:`double`,label:`Double`},{value:`squiggle`,label:`Squiggle`},{value:`fade`,label:`Fade In`},{value:`thick`,label:`Thick Swap`},{value:`through-slide`,label:`Strike Slide`}],b={kind:`grow`,accent:`#10b981`,textColor:`currentColor`,thickness:2,offset:3,duration:220};function x(e){let t=`${e.duration}ms ease`;switch(e.kind){case`grow`:return`.link-demo {
  color: ${e.textColor};
  text-decoration: none;
  background-image: linear-gradient(${e.accent}, ${e.accent});
  background-size: 0% ${e.thickness}px;
  background-repeat: no-repeat;
  background-position: left calc(100% - ${e.offset}px);
  transition: background-size ${t};
}

.link-demo:hover {
  background-size: 100% ${e.thickness}px;
}`;case`slide`:return`.link-demo {
  color: ${e.textColor};
  text-decoration: none;
  background-image: linear-gradient(${e.accent}, ${e.accent});
  background-size: 100% ${e.thickness}px;
  background-repeat: no-repeat;
  background-position: right calc(100% - ${e.offset}px);
  transition: background-position ${t};
}

.link-demo:hover {
  background-position: left calc(100% - ${e.offset}px);
}`;case`offset`:return`.link-demo {
  color: ${e.textColor};
  text-decoration: none;
  position: relative;
}

.link-demo::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -${e.offset}px;
  height: ${e.thickness}px;
  width: 100%;
  background: ${e.accent};
  transform: scaleX(0);
  transform-origin: right;
  transition: transform ${t};
}

.link-demo:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}`;case`double`:return`.link-demo {
  color: ${e.textColor};
  text-decoration: none;
  background-image:
    linear-gradient(${e.accent}, ${e.accent}),
    linear-gradient(${e.accent}, ${e.accent});
  background-size: 0% ${e.thickness}px, 100% ${Math.max(1,e.thickness-1)}px;
  background-repeat: no-repeat;
  background-position: left calc(100% - ${e.offset}px), left calc(100% - ${e.offset+4}px);
  transition: background-size ${t};
}

.link-demo:hover {
  background-size: 100% ${e.thickness}px, 100% ${Math.max(1,e.thickness-1)}px;
}`;case`squiggle`:return`.link-demo {
  color: ${e.textColor};
  text-decoration: underline wavy ${e.accent};
  text-decoration-thickness: ${e.thickness}px;
  text-underline-offset: ${e.offset+2}px;
  text-decoration-color: transparent;
  transition: text-decoration-color ${t};
}

.link-demo:hover {
  text-decoration-color: ${e.accent};
}`;case`fade`:return`.link-demo {
  color: ${e.textColor};
  text-decoration: underline;
  text-decoration-color: ${e.accent}00;
  text-decoration-thickness: ${e.thickness}px;
  text-underline-offset: ${e.offset+2}px;
  transition: text-decoration-color ${t};
}

.link-demo:hover {
  text-decoration-color: ${e.accent};
}`;case`thick`:return`.link-demo {
  color: ${e.textColor};
  text-decoration: underline;
  text-decoration-color: ${e.accent}55;
  text-decoration-thickness: 1px;
  text-underline-offset: ${e.offset+2}px;
  transition:
    text-decoration-thickness ${t},
    text-decoration-color ${t};
}

.link-demo:hover {
  text-decoration-thickness: ${e.thickness*3}px;
  text-decoration-color: ${e.accent};
}`;case`through-slide`:return`.link-demo {
  color: ${e.textColor};
  text-decoration: none;
  position: relative;
  transition: color ${t};
}

.link-demo::after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  height: ${e.thickness}px;
  width: 100%;
  background: ${e.accent};
  transform: scaleX(0) translateY(0.1em);
  transform-origin: right;
  transition: transform ${t};
}

.link-demo:hover {
  color: ${e.textColor}99;
}

.link-demo:hover::after {
  transform: scaleX(1) translateY(0.1em);
  transform-origin: left;
}`}}function S(){return`<a class="link-demo" href="#">Hover this link</a>`}function C(e){return{"--link-accent":e.accent,"--link-thickness":`${e.thickness}px`,"--link-offset":`${e.offset}px`}}function w(e,t){let n=y.map(e=>e.value),r=Math.floor(t.range(0,360));return{...e,kind:t.pick(n),accent:`hsl(${r} 80% 55%)`,thickness:Math.round(t.range(1,4)),offset:Math.round(t.range(2,6)),duration:Math.round(t.range(150,350))}}var T=[{name:`Emerald Grow`,tags:[`brand`],state:{...b}},{name:`Slide Ink`,tags:[`minimal`],state:{...b,kind:`slide`,accent:`#fafafa`}},{name:`Offset Neon`,tags:[`neon`],state:{...b,kind:`offset`,accent:`#22d3ee`,thickness:3}},{name:`Double Line`,tags:[`formal`],state:{...b,kind:`double`,accent:`#8b5cf6`}},{name:`Squiggle Fun`,tags:[`playful`],state:{...b,kind:`squiggle`,accent:`#f59e0b`,thickness:2}},{name:`Fade Subtle`,tags:[`minimal`,`calm`],state:{...b,kind:`fade`,accent:`#10b981`,duration:300}},{name:`Thick Marker`,tags:[`bold`],state:{...b,kind:`thick`,accent:`#f43f5e`,thickness:3,duration:180}},{name:`Strike Done`,tags:[`todo`],state:{...b,kind:`through-slide`,accent:`#71717a`}},{name:`Light Grow`,tags:[`light`],state:{...b,textColor:`#18181b`,accent:`#10b981`}},{name:`Ocean Offset`,tags:[`cool`],state:{...b,kind:`offset`,accent:`#0ea5e9`,thickness:2}}],E=[`innerHTML`],D={class:`flex h-full w-full max-w-2xl flex-col items-center justify-center gap-8 p-6`},O=[`innerHTML`],k=n({__name:`link`,setup(n){let{state:k,randomize:A,reset:j,undo:M,redo:N,pushHistory:P,shareUrlRef:F}=h({id:`link`,defaultState:JSON.parse(JSON.stringify(b)),randomize:w}),I=r(`editor:shareUrl`,()=>{});o(()=>I(F.value));let L=i(()=>x(k.value)),R=i(()=>S()),z=i(()=>C(k.value)),B=i(()=>`<style>${L.value}</style>`);function V(e){k.value=JSON.parse(JSON.stringify(T[e].state)),P()}let H=i(()=>T.map(e=>({name:e.name,css:x(e.state),html:S()})));return(n,r)=>{let i=m,o=u,h=g,b=d,x=p,S=_,C=v,w=f;return a(),c(w,{title:`Link Underlines`,description:`10 animated underline styles for links and inline text.`,css:l(L),html:l(R),vars:l(z),onRandomize:l(A),onReset:l(j),onUndo:l(M),onRedo:l(N)},{preview:s(()=>[e(o,{variants:l(H),onApplyVariant:V,title:`Link preview`,filename:`css-studio-link`},{presets:s(()=>[e(i,{presets:l(T),onApply:V},null,8,[`presets`])]),default:s(()=>[t(`div`,{innerHTML:l(B),"aria-hidden":`true`},null,8,E),t(`div`,D,[t(`div`,{innerHTML:l(R)},null,8,O),r[6]||=t(`p`,{class:`max-w-xs text-center text-[11px] text-muted`},`Hover the link to preview the underline animation.`,-1)])]),_:1},8,[`variants`])]),controls:s(()=>[e(x,{label:`Underline`,icon:`ph-link`},{default:s(()=>[e(h,{modelValue:l(k).kind,"onUpdate:modelValue":r[0]||=e=>l(k).kind=e,label:`Style`,options:l(y)},null,8,[`modelValue`,`options`]),e(b,{modelValue:l(k).thickness,"onUpdate:modelValue":r[1]||=e=>l(k).thickness=e,label:`Thickness`,min:1,max:6,suffix:`px`},null,8,[`modelValue`]),e(b,{modelValue:l(k).offset,"onUpdate:modelValue":r[2]||=e=>l(k).offset=e,label:`Offset`,min:0,max:10,suffix:`px`},null,8,[`modelValue`]),e(b,{modelValue:l(k).duration,"onUpdate:modelValue":r[3]||=e=>l(k).duration=e,label:`Duration`,min:100,max:600,step:10,suffix:`ms`},null,8,[`modelValue`])]),_:1}),e(x,{label:`Colors`,icon:`ph-palette`},{default:s(()=>[e(S,{"model-value":l(k).accent,label:`Underline`,"onUpdate:modelValue":r[4]||=e=>l(k).accent=e},null,8,[`model-value`]),e(S,{"model-value":l(k).textColor,label:`Text`,"onUpdate:modelValue":r[5]||=e=>l(k).textColor=e},null,8,[`model-value`])]),_:1})]),code:s(()=>[e(C,{css:l(L),html:l(R),vars:l(z),filename:`css-studio-link`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{k as default};