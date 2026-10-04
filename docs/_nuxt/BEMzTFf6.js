import{A as e,C as t,E as n,M as r,R as i,S as a,X as o,_t as s,ct as c,lt as l,w as u,wt as d}from"./MitKKUeq.js";import{a as f,i as p,l as m,o as h,s as g,t as _}from"./DayxJ-Je.js";import{t as v}from"./D3e07OzS.js";import{t as y}from"./Dh2B6pZ8.js";import{t as b}from"./BYmGHvE7.js";import{t as x}from"./BVp1fOGc.js";var S=[{value:`card`,label:`Card`},{value:`snackbar`,label:`Snackbar`},{value:`banner`,label:`Banner`}],C=[{value:`success`,label:`Success`,color:`#10b981`,icon:`✓`},{value:`error`,label:`Error`,color:`#f43f5e`,icon:`✕`},{value:`info`,label:`Info`,color:`#0ea5e9`,icon:`ℹ`},{value:`warning`,label:`Warning`,color:`#f59e0b`,icon:`⚠`}],w={skin:`card`,variant:`success`,accent:`#10b981`,bg:`#18181b`,textColor:`#fafafa`,radius:12,duration:4e3,showIcon:!0,showProgress:!0,position:`top-right`},T=[{value:`top-left`,label:`Top Left`},{value:`top-center`,label:`Top Center`},{value:`top-right`,label:`Top Right`},{value:`bottom-left`,label:`Bottom Left`},{value:`bottom-center`,label:`Bottom Center`},{value:`bottom-right`,label:`Bottom Right`}];function E(e){let t=C.find(t=>t.value===e.variant),n={"top-left":`top: 16px; left: 16px;`,"top-right":`top: 16px; right: 16px;`,"bottom-left":`bottom: 16px; left: 16px;`,"top-center":`top: 16px; left: 50%; transform: translateX(-50%);`,"bottom-right":`bottom: 16px; right: 16px;`,"bottom-center":`bottom: 16px; left: 50%; transform: translateX(-50%);`},r={card:`.toast {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: ${e.radius}px;
  border: 1px solid ${e.textColor}1a;
  background: ${e.bg};
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
}`,snackbar:`.toast {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  border-radius: ${Math.min(e.radius,6)}px;
  background: ${e.textColor};
  color: ${e.bg};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}`,banner:`.toast {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 0;
  background: ${t.color}1a;
  border-left: 4px solid ${t.color};
  backdrop-filter: blur(8px);
}`},i=e.showIcon?`.toast-icon {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: ${e.skin===`snackbar`?e.accent:`${t.color}22`};
  color: ${t.color};
  font-size: 12px;
  font-weight: 800;
  flex-shrink: 0;
}`:``,a=e.showProgress?`.toast-progress {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  border-radius: 0 0 0 ${e.radius}px;
  background: ${t.color};
  animation: toast-timer ${e.duration}ms linear forwards;
}

@keyframes toast-timer {
  from { width: 100%; }
  to { width: 0%; }
}`:``;return`${r[e.skin]}

.toast-stack {
  position: fixed;
  ${n[e.position]}
  z-index: 9997;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.toast {
  position: relative;
  ${e.skin===`snackbar`?`color: ${e.bg};`:`color: ${e.textColor};`}
  overflow: hidden;
  animation: toast-in ${Math.min(600,e.duration/4)}ms cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-title {
  font-size: 14px;
  font-weight: 600;
}

.toast-desc {
  font-size: 12px;
  opacity: 0.7;
}

.toast-close {
  margin-left: auto;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 15px;
  opacity: 0.5;
  transition: opacity 150ms ease;
}

.toast-close:hover {
  opacity: 1;
}

@keyframes toast-in {
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

${i}

${a}`}function D(e){let t=C.find(t=>t.value===e.variant);return`<div class="toast-stack">
  <div class="toast" role="status">
    ${e.showIcon?`<span class="toast-icon">${t.icon}</span>`:``}
    <div>
      <div class="toast-title">${t.label}</div>
      <div class="toast-desc">Your changes have been saved.</div>
    </div>
    <button class="toast-close" aria-label="Dismiss">✕</button>
    ${e.showProgress?`<div class="toast-progress"></div>`:``}
  </div>
</div>`}function O(e){return{"--toast-accent":e.accent,"--toast-bg":e.bg,"--toast-duration":`${e.duration}ms`}}function k(e,t){let n=S.map(e=>e.value),r=C.map(e=>e.value),i=Math.floor(t.range(0,360));return{...e,skin:t.pick(n),variant:t.pick(r),accent:`hsl(${i} 78% 52%)`,bg:`hsl(${i} 10% 11%)`,radius:t.pick([0,6,12,16]),duration:Math.round(t.range(2500,6e3)),showIcon:t.chance(.8),showProgress:t.chance(.6)}}var A=[{name:`Success Card`,tags:[`success`],state:{...w}},{name:`Error Alert`,tags:[`error`],state:{...w,variant:`error`,position:`top-center`}},{name:`Info Banner`,tags:[`banner`],state:{...w,skin:`banner`,variant:`info`,radius:0}},{name:`Dark Snackbar`,tags:[`snackbar`],state:{...w,skin:`snackbar`,position:`bottom-left`}},{name:`Warning Card`,tags:[`warning`],state:{...w,variant:`warning`,accent:`#f59e0b`}},{name:`Neon Success`,tags:[`neon`],state:{...w,accent:`#22d3ee`,variant:`success`,showProgress:!0}},{name:`Minimal Toast`,tags:[`minimal`],state:{...w,showIcon:!1,showProgress:!1,radius:6}},{name:`Bottom Center`,tags:[`mobile`],state:{...w,position:`bottom-center`,radius:999}}],j=[`innerHTML`],M={class:`preview-toast h-full w-full`},N=[`innerHTML`],P=r({__name:`toast`,setup(r){let{state:P,randomize:F,reset:I,undo:L,redo:R,pushHistory:z,shareUrlRef:B}=_({id:`toast`,defaultState:JSON.parse(JSON.stringify(w)),randomize:k}),V=i(`editor:shareUrl`,()=>{});c(()=>V(B.value));let H=a(()=>E(P.value)),U=a(()=>D(P.value)),W=a(()=>O(P.value)),G=a(()=>`<style>.preview-toast { position: relative; height: 100%; } .preview-toast .toast-stack { position: absolute !important; } ${H.value}</style>`);function K(e){P.value=JSON.parse(JSON.stringify(A[e].state)),z()}let q=s(0);function J(){q.value++}let Y=a(()=>A.map(e=>({name:e.name,css:E(e.state),html:D(e.state)})));return(r,i)=>{let a=m,s=g,c=v,_=h,w=y,E=f,D=b,O=x,k=p;return o(),u(k,{title:`Toast Notifications`,description:`Variants, skins, timers and entrance animation.`,css:d(H),html:d(U),vars:d(W),onRandomize:d(F),onReset:d(I),onUndo:d(L),onRedo:d(R)},{preview:l(()=>[e(s,{variants:d(Y),onApplyVariant:K,title:`Toast preview`,filename:`css-studio-toast`},{presets:l(()=>[e(a,{presets:d(A),onApply:K},null,8,[`presets`])]),default:l(()=>[t(`div`,{innerHTML:d(G),"aria-hidden":`true`},null,8,j),t(`div`,M,[(o(),n(`div`,{key:d(q),innerHTML:d(U)},null,8,N))])]),_:1},8,[`variants`])]),controls:l(()=>[e(E,{label:`Toast`,icon:`ph-bell`},{default:l(()=>[e(c,{modelValue:d(P).skin,"onUpdate:modelValue":i[0]||=e=>d(P).skin=e,label:`Skin`,options:d(S)},null,8,[`modelValue`,`options`]),e(c,{modelValue:d(P).variant,"onUpdate:modelValue":i[1]||=e=>d(P).variant=e,label:`Variant`,options:d(C)},null,8,[`modelValue`,`options`]),e(c,{modelValue:d(P).position,"onUpdate:modelValue":i[2]||=e=>d(P).position=e,label:`Position`,options:d(T)},null,8,[`modelValue`,`options`]),e(_,{modelValue:d(P).duration,"onUpdate:modelValue":i[3]||=e=>d(P).duration=e,label:`Timer`,min:1500,max:8e3,step:250,suffix:`ms`},null,8,[`modelValue`]),e(_,{modelValue:d(P).radius,"onUpdate:modelValue":i[4]||=e=>d(P).radius=e,label:`Radius`,min:0,max:24,suffix:`px`},null,8,[`modelValue`]),e(w,{modelValue:d(P).showIcon,"onUpdate:modelValue":i[5]||=e=>d(P).showIcon=e,label:`Show icon`},null,8,[`modelValue`]),e(w,{modelValue:d(P).showProgress,"onUpdate:modelValue":i[6]||=e=>d(P).showProgress=e,label:`Progress timer`},null,8,[`modelValue`]),t(`button`,{type:`button`,class:`h-9 rounded-lg border border-line bg-bg text-xs font-medium text-fg transition-colors duration-150 hover:bg-line/20`,onClick:J},`↻ Replay animation`)]),_:1}),e(E,{label:`Colors`,icon:`ph-palette`},{default:l(()=>[e(D,{"model-value":d(P).accent,label:`Accent`,"onUpdate:modelValue":i[7]||=e=>d(P).accent=e},null,8,[`model-value`]),e(D,{"model-value":d(P).bg,label:`Background`,"onUpdate:modelValue":i[8]||=e=>d(P).bg=e},null,8,[`model-value`]),e(D,{"model-value":d(P).textColor,label:`Text`,"onUpdate:modelValue":i[9]||=e=>d(P).textColor=e},null,8,[`model-value`])]),_:1})]),code:l(()=>[e(O,{css:d(H),html:d(U),vars:d(W),filename:`css-studio-toast`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{P as default};