import{A as e,C as t,M as n,R as r,S as i,T as a,X as o,ct as s,lt as c,w as l,wt as u}from"./MitKKUeq.js";import{a as d,i as f,l as p,o as m,s as h,t as g}from"./CJu4WcQG.js";import{t as _}from"./D3e07OzS.js";import{t as v}from"./BYmGHvE7.js";import{t as y}from"./o8u_Jv9o.js";var b=[{value:`wave`,label:`Wave`},{value:`pulse`,label:`Pulse`},{value:`shimmer`,label:`Shimmer`}],x=[{value:`card`,label:`Card`},{value:`text`,label:`Text Lines`},{value:`avatar-list`,label:`Avatar List`}],S={skin:`shimmer`,layout:`card`,accent:`#3f3f46`,baseColor:`#27272a`,radius:10,duration:1400,rows:3};function C(e){let t={wave:`.sk {
  background: linear-gradient(90deg, ${e.baseColor} 25%, ${e.accent} 50%, ${e.baseColor} 75%);
  background-size: 200% 100%;
  animation: sk-wave ${e.duration}ms ease-in-out infinite;
}

@keyframes sk-wave {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`,pulse:`.sk {
  background: ${e.accent};
  animation: sk-pulse ${e.duration}ms ease-in-out infinite;
}

@keyframes sk-pulse {
  0%, 100% { opacity: 0.45; }
  50% { opacity: 0.85; }
}`,shimmer:`.sk {
  position: relative;
  background: ${e.baseColor};
  overflow: hidden;
}

.sk::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, ${e.accent}66 50%, transparent);
  animation: sk-shimmer ${e.duration}ms ease-out infinite;
}

@keyframes sk-shimmer {
  to { transform: translateX(100%); }
}`},n={card:`.skeleton-card {
  width: 280px;
  padding: 16px;
  border-radius: ${e.radius}px;
  border: 1px solid ${e.accent}33;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sk-avatar {
  width: 44px;
  height: 44px;
  border-radius: 999px;
}

.sk-line {
  height: 12px;
  border-radius: ${Math.min(e.radius,6)}px;
}

.sk-line.short { width: 60%; }
.sk-line.mid { width: 85%; }
.sk-block {
  height: 110px;
  border-radius: ${Math.min(e.radius,8)}px;
}`,text:`.skeleton-text {
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sk-line {
  height: 14px;
  border-radius: ${Math.min(e.radius,7)}px;
}

.sk-line:nth-child(1) { width: 100%; }
.sk-line:nth-child(2) { width: 92%; }
.sk-line:nth-child(3) { width: 96%; }
.sk-line:nth-child(4) { width: 58%; }`,avatarList:`.skeleton-list {
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.sk-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sk-avatar {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  flex-shrink: 0;
}

.sk-lines {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.sk-line {
  height: 10px;
  border-radius: 999px;
}

.sk-line.short { width: 45%; }`};return`${t[e.skin]}

${n[e.layout]}`}function w(e){return e.layout===`card`?`<div class="skeleton-card">
  <div class="sk sk-avatar"></div>
  <div class="sk sk-line mid"></div>
  <div class="sk sk-block"></div>
  <div class="sk sk-line short"></div>
</div>`:e.layout===`text`?`<div class="skeleton-text">
${Array.from({length:Math.max(2,e.rows)},()=>`  <div class="sk sk-line"></div>`).join(`
`)}
</div>`:`<div class="skeleton-list">\n${Array.from({length:Math.max(2,e.rows)},()=>`  <div class="sk-row">
    <div class="sk sk-avatar"></div>
    <div class="sk-lines">
      <div class="sk sk-line"></div>
      <div class="sk sk-line short"></div>
    </div>
  </div>`).join(`
`)}\n</div>`}function T(e){return{"--sk-accent":e.accent,"--sk-base":e.baseColor,"--sk-duration":`${e.duration}ms`}}function E(e,t){let n=b.map(e=>e.value),r=x.map(e=>e.value);return{...e,skin:t.pick(n),layout:t.pick(r),rows:Math.round(t.range(2,5)),radius:t.pick([4,8,10,14]),duration:Math.round(t.range(900,2200))}}var D=[{name:`Shimmer Card`,tags:[`card`,`brand`],state:{...S}},{name:`Wave Lines`,tags:[`text`],state:{...S,skin:`wave`,layout:`text`,rows:4}},{name:`Pulse Avatar`,tags:[`list`],state:{...S,skin:`pulse`,layout:`avatar-list`,rows:4}},{name:`Slow Shimmer`,tags:[`calm`],state:{...S,duration:2200}},{name:`Fast Pulse`,tags:[`snappy`],state:{...S,skin:`pulse`,duration:800}},{name:`Sharp Lines`,tags:[`mono`],state:{...S,layout:`text`,radius:0}},{name:`Light Skeleton`,tags:[`light`],state:{...S,baseColor:`#e4e4e7`,accent:`#d4d4d8`}},{name:`Neon Shimmer`,tags:[`neon`],state:{...S,accent:`#22d3ee`,baseColor:`#083344`}}],O=[`innerHTML`],k={class:`preview-skeleton h-full w-full`},A=[`innerHTML`],j=n({__name:`skeleton`,setup(n){let{state:j,randomize:M,reset:N,undo:P,redo:F,pushHistory:I,shareUrlRef:L}=g({id:`skeleton`,defaultState:JSON.parse(JSON.stringify(S)),randomize:E}),R=r(`editor:shareUrl`,()=>{});s(()=>R(L.value));let z=i(()=>C(j.value)),B=i(()=>w(j.value)),V=i(()=>T(j.value)),H=i(()=>`<style>.preview-skeleton { display: grid; place-items: center; height: 100%; overflow: auto; } ${z.value}</style>`);function U(e){j.value=JSON.parse(JSON.stringify(D[e].state)),I()}let W=i(()=>D.map(e=>({name:e.name,css:C(e.state),html:w(e.state)})));return(n,r)=>{let i=p,s=h,g=_,S=m,C=d,w=v,T=y,E=f;return o(),l(E,{title:`Skeleton Loaders`,description:`Shimmer, wave and pulse loading placeholders.`,css:u(z),html:u(B),vars:u(V),onRandomize:u(M),onReset:u(N),onUndo:u(P),onRedo:u(F)},{preview:c(()=>[e(s,{variants:u(W),onApplyVariant:U,title:`Skeleton preview`,filename:`css-studio-skeleton`},{presets:c(()=>[e(i,{presets:u(D),onApply:U},null,8,[`presets`])]),default:c(()=>[t(`div`,{innerHTML:u(H),"aria-hidden":`true`},null,8,O),t(`div`,k,[t(`div`,{innerHTML:u(B)},null,8,A)])]),_:1},8,[`variants`])]),controls:c(()=>[e(C,{label:`Skeleton`,icon:`ph-spiral`},{default:c(()=>[e(g,{modelValue:u(j).skin,"onUpdate:modelValue":r[0]||=e=>u(j).skin=e,label:`Skin`,options:u(b)},null,8,[`modelValue`,`options`]),e(g,{modelValue:u(j).layout,"onUpdate:modelValue":r[1]||=e=>u(j).layout=e,label:`Layout`,options:u(x)},null,8,[`modelValue`,`options`]),u(j).layout===`card`?a(``,!0):(o(),l(S,{key:0,modelValue:u(j).rows,"onUpdate:modelValue":r[2]||=e=>u(j).rows=e,label:`Rows`,min:2,max:6},null,8,[`modelValue`])),e(S,{modelValue:u(j).duration,"onUpdate:modelValue":r[3]||=e=>u(j).duration=e,label:`Duration`,min:600,max:3e3,step:50,suffix:`ms`},null,8,[`modelValue`]),e(S,{modelValue:u(j).radius,"onUpdate:modelValue":r[4]||=e=>u(j).radius=e,label:`Radius`,min:0,max:20,suffix:`px`},null,8,[`modelValue`])]),_:1}),e(C,{label:`Colors`,icon:`ph-palette`},{default:c(()=>[e(w,{"model-value":u(j).baseColor,label:`Base`,"onUpdate:modelValue":r[5]||=e=>u(j).baseColor=e},null,8,[`model-value`]),e(w,{"model-value":u(j).accent,label:`Highlight`,"onUpdate:modelValue":r[6]||=e=>u(j).accent=e},null,8,[`model-value`])]),_:1})]),code:c(()=>[e(T,{css:u(z),html:u(B),vars:u(V),filename:`css-studio-skeleton`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{j as default};