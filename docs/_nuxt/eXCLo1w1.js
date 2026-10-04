import{A as e,C as t,M as n,R as r,S as i,X as a,ct as o,lt as s,w as c,wt as l}from"./MitKKUeq.js";import{a as u,i as d,l as f,o as p,s as m,t as h}from"./CJu4WcQG.js";import{t as g}from"./BYmGHvE7.js";import{t as _}from"./o8u_Jv9o.js";import{t as v}from"./CcuAq1zZ.js";var y={beforeColor:`#18181b`,afterColor:`#10b981`,beforeLabel:`Before`,afterLabel:`After`,width:420,height:260,split:50,radius:14,handleWidth:3};function b(e){return`.compare {
  position: relative;
  width: ${e.width}px;
  height: ${e.height}px;
  border-radius: ${e.radius}px;
  overflow: hidden;
  isolation: isolate;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
}

.compare-before,
.compare-after {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-weight: 700;
  color: #fff;
}

.compare-before {
  background: ${e.beforeColor};
}

.compare-after {
  background: ${e.afterColor};
  clip-path: inset(0 0 0 ${e.split}%);
}

.compare-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${e.split}%;
  width: ${e.handleWidth}px;
  background: #fff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  pointer-events: none;
}

.compare-handle::after {
  content: '⇔';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background: #fff;
  color: #18181b;
  font-size: 14px;
}

.compare-label {
  position: absolute;
  bottom: 10px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  font-size: 11px;
  backdrop-filter: blur(4px);
}

.compare-label.before {
  left: 10px;
}

.compare-label.after {
  right: 10px;
}`}function x(e){return`<div class="compare">
  <div class="compare-before">${e.beforeLabel}</div>
  <div class="compare-after">${e.afterLabel}</div>
  <div class="compare-handle"></div>
  <span class="compare-label before">${e.beforeLabel}</span>
  <span class="compare-label after">${e.afterLabel}</span>
</div>`}function S(e){return{"--compare-before":e.beforeColor,"--compare-after":e.afterColor,"--compare-split":`${e.split}%`}}function C(e,t){let n=Math.floor(t.range(0,360)),r=Math.floor(t.range(0,360));return{...e,beforeColor:`hsl(${n} 15% 11%)`,afterColor:`hsl(${r} 70% 48%)`,split:Math.round(t.range(30,70)),width:Math.round(t.range(320,480)),height:Math.round(t.range(200,300)),radius:t.pick([0,12,14,20])}}var w=[{name:`Emerald Reveal`,tags:[`brand`],state:{...y}},{name:`Neon Split`,tags:[`neon`,`glow`],state:{...y,beforeColor:`#083344`,afterColor:`#22d3ee`,split:45}},{name:`Violet Sweep`,tags:[`brand`],state:{...y,afterColor:`#8b5cf6`,split:60}},{name:`Warm Sunset`,tags:[`warm`],state:{...y,beforeColor:`#271a08`,afterColor:`#f59e0b`,split:55}},{name:`Sharp Edge`,tags:[`minimal`],state:{...y,radius:0,split:40}},{name:`Thin Handle`,tags:[`minimal`],state:{...y,handleWidth:2,split:50,afterColor:`#0ea5e9`}},{name:`Tall Portrait`,tags:[`portrait`],state:{...y,width:320,height:360,afterColor:`#f43f5e`}},{name:`Half Half`,tags:[`50`],state:{...y,split:50,afterColor:`#6366f1`}}],T=[`innerHTML`],E={class:`flex h-full w-full max-w-2xl items-center justify-center p-6`},D=[`innerHTML`],O=n({__name:`compare`,setup(n){let{state:O,randomize:k,reset:A,undo:j,redo:M,pushHistory:N,shareUrlRef:P}=h({id:`compare`,defaultState:JSON.parse(JSON.stringify(y)),randomize:C}),F=r(`editor:shareUrl`,()=>{});o(()=>F(P.value));let I=i(()=>b(O.value)),L=i(()=>x(O.value)),R=i(()=>S(O.value)),z=i(()=>`<style>${I.value}</style>`);function B(e){O.value=JSON.parse(JSON.stringify(w[e].state)),N()}let V=i(()=>w.map(e=>({name:e.name,css:b(e.state),html:x(e.state)})));return(n,r)=>{let i=f,o=m,h=v,y=p,b=u,x=g,S=_,C=d;return a(),c(C,{title:`Before / After Compare`,description:`Pure-CSS comparison slider with split handle.`,css:l(I),html:l(L),vars:l(R),onRandomize:l(k),onReset:l(A),onUndo:l(j),onRedo:l(M)},{preview:s(()=>[e(o,{variants:l(V),onApplyVariant:B,title:`Compare preview`,filename:`css-studio-compare`},{presets:s(()=>[e(i,{presets:l(w),onApply:B},null,8,[`presets`])]),default:s(()=>[t(`div`,{innerHTML:l(z),"aria-hidden":`true`},null,8,T),t(`div`,E,[t(`div`,{innerHTML:l(L)},null,8,D)])]),_:1},8,[`variants`])]),controls:s(()=>[e(b,{label:`Compare`,icon:`ph-arrows-left-right`},{default:s(()=>[e(h,{modelValue:l(O).beforeLabel,"onUpdate:modelValue":r[0]||=e=>l(O).beforeLabel=e,label:`Before label`},null,8,[`modelValue`]),e(h,{modelValue:l(O).afterLabel,"onUpdate:modelValue":r[1]||=e=>l(O).afterLabel=e,label:`After label`},null,8,[`modelValue`]),e(y,{modelValue:l(O).split,"onUpdate:modelValue":r[2]||=e=>l(O).split=e,label:`Split position`,min:10,max:90,suffix:`%`},null,8,[`modelValue`]),e(y,{modelValue:l(O).width,"onUpdate:modelValue":r[3]||=e=>l(O).width=e,label:`Width`,min:280,max:520,step:10,suffix:`px`},null,8,[`modelValue`]),e(y,{modelValue:l(O).height,"onUpdate:modelValue":r[4]||=e=>l(O).height=e,label:`Height`,min:180,max:360,step:10,suffix:`px`},null,8,[`modelValue`]),e(y,{modelValue:l(O).radius,"onUpdate:modelValue":r[5]||=e=>l(O).radius=e,label:`Radius`,min:0,max:24,suffix:`px`},null,8,[`modelValue`]),e(y,{modelValue:l(O).handleWidth,"onUpdate:modelValue":r[6]||=e=>l(O).handleWidth=e,label:`Handle width`,min:2,max:8,suffix:`px`},null,8,[`modelValue`])]),_:1}),e(b,{label:`Colors`,icon:`ph-palette`},{default:s(()=>[e(x,{"model-value":l(O).beforeColor,label:`Before`,"onUpdate:modelValue":r[7]||=e=>l(O).beforeColor=e},null,8,[`model-value`]),e(x,{"model-value":l(O).afterColor,label:`After`,"onUpdate:modelValue":r[8]||=e=>l(O).afterColor=e},null,8,[`model-value`])]),_:1})]),code:s(()=>[e(S,{css:l(I),html:l(L),vars:l(R),filename:`css-studio-compare`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{O as default};