import{A as e,C as t,M as n,R as r,S as i,T as a,X as o,ct as s,lt as c,w as l,wt as u}from"./MitKKUeq.js";import{a as d,i as f,n as p,r as m,s as h,t as g}from"./BPBkcUFJ.js";import{t as _}from"./Dh2B6pZ8.js";import{t as v}from"./BYmGHvE7.js";import{t as y}from"./Cw1rlFxN.js";var b={value:65,max:100,height:12,radius:999,accent:`#10b981`,trackColor:`#27272a`,gradient:!0,animated:!1,striped:!1,showLabel:!0,indeterminate:!1};function x(e){let t=Math.min(100,Math.max(0,e.value/e.max*100)),n=e.gradient?`linear-gradient(90deg, ${e.accent}, ${e.accent}aa)`:e.accent,r=[];e.animated&&r.push(`  transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);`),e.striped&&r.push(`  background-image: repeating-linear-gradient(45deg, transparent 0 6px, rgba(255,255,255,0.15) 6px 12px);`);let i=r.join(`
`);return`.progress-track {
  position: relative;
  width: 320px;
  height: ${e.height}px;
  border-radius: ${e.radius}px;
  background: ${e.trackColor};
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  width: ${e.indeterminate?`40%`:`${t.toFixed(1)}%`};
  border-radius: ${e.radius}px;
  background: ${n};
${i}
}

${e.indeterminate?`.progress-fill {
  animation: indeterminate 1.4s ease-in-out infinite;
}

@keyframes indeterminate {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(350%); }
}`:``}

${e.striped&&!e.indeterminate?`.progress-fill {
  animation: stripe-slide 1s linear infinite;
}

@keyframes stripe-slide {
  to { background-position: 17px 0; }
}`:``}

${e.showLabel?`.progress-label {
  display: flex;
  justify-content: space-between;
  width: 320px;
  margin-bottom: 6px;
  font-size: 12px;
  color: #a1a1aa;
  font-weight: 600;
}

.progress-label b {
  color: ${e.accent};
}`:``}`}function S(e){let t=Math.round(e.value/e.max*100);return`${e.showLabel?`<div class="progress-label"><span>Uploading…</span><b>${t}%</b></div>\n`:``}<div class="progress-track" role="progressbar" aria-valuenow="${t}" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-fill"></div>
</div>`}function C(e){return{"--progress-accent":e.accent,"--progress-track":e.trackColor,"--progress-value":String(e.value)}}function w(e,t){let n=Math.floor(t.range(0,360));return{...e,value:Math.round(t.range(10,95)),height:Math.round(t.range(6,20)),radius:t.pick([0,4,999]),accent:`hsl(${n} 78% 52%)`,trackColor:`hsl(${n} 8% 18%)`,gradient:t.chance(.6),striped:t.chance(.3),indeterminate:t.chance(.2)}}var T=[{name:`Emerald Upload`,tags:[`brand`],state:{...b}},{name:`Neon Indeterminate`,tags:[`neon`,`loading`],state:{...b,indeterminate:!0,accent:`#22d3ee`,height:6,showLabel:!1}},{name:`Striped Work`,tags:[`striped`],state:{...b,striped:!0,gradient:!1,value:45}},{name:`Slim Top Bar`,tags:[`minimal`],state:{...b,height:3,value:80,showLabel:!1,radius:0}},{name:`Chunky Install`,tags:[`bold`],state:{...b,height:22,value:30,radius:6,gradient:!1}},{name:`Violet Sync`,tags:[`brand`],state:{...b,accent:`#8b5cf6`,value:78}},{name:`Warm Download`,tags:[`warm`],state:{...b,accent:`#f59e0b`,value:55}},{name:`Light Track`,tags:[`light`],state:{...b,trackColor:`#e4e4e7`,accent:`#10b981`,value:70}}],E=[`innerHTML`],D={class:`preview-progress h-full w-full`},O=[`innerHTML`],k=n({__name:`progress-bar`,setup(n){let{state:k,randomize:A,reset:j,undo:M,redo:N,pushHistory:P,shareUrlRef:F}=g({id:`progress-bar`,defaultState:JSON.parse(JSON.stringify(b)),randomize:w}),I=r(`editor:shareUrl`,()=>{});s(()=>I(F.value));let L=i(()=>x(k.value)),R=i(()=>S(k.value)),z=i(()=>C(k.value)),B=i(()=>`<style>.preview-progress { display: grid; place-items: center; height: 100%; } ${L.value}</style>`);function V(e){k.value=JSON.parse(JSON.stringify(T[e].state)),P()}let H=i(()=>T.map(e=>({name:e.name,css:x(e.state),html:S(e.state)})));return(n,r)=>{let i=h,s=d,g=f,b=_,x=m,S=v,C=y,w=p;return o(),l(w,{title:`Progress Bar Generator`,description:`Gradients, stripes, timers and indeterminate modes.`,css:u(L),html:u(R),vars:u(z),onRandomize:u(A),onReset:u(j),onUndo:u(M),onRedo:u(N)},{preview:c(()=>[e(s,{variants:u(H),onApplyVariant:V,title:`Progress preview`,filename:`css-studio-progress-bar`},{presets:c(()=>[e(i,{presets:u(T),onApply:V},null,8,[`presets`])]),default:c(()=>[t(`div`,{innerHTML:u(B),"aria-hidden":`true`},null,8,E),t(`div`,D,[t(`div`,{innerHTML:u(R)},null,8,O)])]),_:1},8,[`variants`])]),controls:c(()=>[e(x,{label:`Progress`,icon:`ph-activity`},{default:c(()=>[u(k).indeterminate?a(``,!0):(o(),l(g,{key:0,modelValue:u(k).value,"onUpdate:modelValue":r[0]||=e=>u(k).value=e,label:`Value`,min:0,max:100,suffix:`%`},null,8,[`modelValue`])),e(g,{modelValue:u(k).height,"onUpdate:modelValue":r[1]||=e=>u(k).height=e,label:`Height`,min:3,max:26,suffix:`px`},null,8,[`modelValue`]),e(g,{modelValue:u(k).radius,"onUpdate:modelValue":r[2]||=e=>u(k).radius=e,label:`Radius`,min:0,max:999,suffix:`px`},null,8,[`modelValue`]),e(b,{modelValue:u(k).gradient,"onUpdate:modelValue":r[3]||=e=>u(k).gradient=e,label:`Gradient fill`},null,8,[`modelValue`]),e(b,{modelValue:u(k).striped,"onUpdate:modelValue":r[4]||=e=>u(k).striped=e,label:`Stripes`},null,8,[`modelValue`]),e(b,{modelValue:u(k).animated,"onUpdate:modelValue":r[5]||=e=>u(k).animated=e,label:`Smooth transition`},null,8,[`modelValue`]),e(b,{modelValue:u(k).indeterminate,"onUpdate:modelValue":r[6]||=e=>u(k).indeterminate=e,label:`Indeterminate`},null,8,[`modelValue`]),e(b,{modelValue:u(k).showLabel,"onUpdate:modelValue":r[7]||=e=>u(k).showLabel=e,label:`Show label`},null,8,[`modelValue`])]),_:1}),e(x,{label:`Colors`,icon:`ph-palette`},{default:c(()=>[e(S,{"model-value":u(k).accent,label:`Fill`,"onUpdate:modelValue":r[8]||=e=>u(k).accent=e},null,8,[`model-value`]),e(S,{"model-value":u(k).trackColor,label:`Track`,"onUpdate:modelValue":r[9]||=e=>u(k).trackColor=e},null,8,[`model-value`])]),_:1})]),code:c(()=>[e(C,{css:u(L),html:u(R),vars:u(z),filename:`css-studio-progress-bar`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{k as default};