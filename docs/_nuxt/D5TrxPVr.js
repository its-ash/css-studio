import{A as e,C as t,M as n,R as r,S as i,T as a,X as o,ct as s,lt as c,w as l,wt as u}from"./MitKKUeq.js";import{a as d,i as f,l as p,o as m,s as h,t as g}from"./DayxJ-Je.js";import{t as _}from"./D3e07OzS.js";import{t as v}from"./Dh2B6pZ8.js";import{t as y}from"./BYmGHvE7.js";import{t as b}from"./BVp1fOGc.js";var x=[{value:`switch`,label:`Switch`},{value:`checkbox`,label:`Checkbox`},{value:`radio`,label:`Radio`},{value:`skeleton`,label:`Skeleton Loader`}],S={kind:`switch`,accent:`#10b981`,offTrack:`#3f3f46`,knob:`#fafafa`,width:44,height:24,radius:999,glow:!1};function C(e){switch(e.kind){case`switch`:return`.toggle-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.toggle-track {
  position: relative;
  display: inline-block;
  width: ${e.width}px;
  height: ${e.height}px;
  border-radius: ${e.radius}px;
  background: ${e.offTrack};
  cursor: pointer;
  transition: background-color 200ms ease;
}

.toggle-track::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: ${e.height-6}px;
  height: ${e.height-6}px;
  border-radius: ${e.radius}px;
  background: ${e.knob};
  transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.toggle-input:checked + .toggle-track {
  background: ${e.accent};
${e.glow?`  box-shadow: 0 0 12px ${e.accent}66;`:``}
}

.toggle-input:checked + .toggle-track::after {
  transform: translateX(${e.width-e.height}px);
}

.toggle-input:focus-visible + .toggle-track {
  outline: 2px solid ${e.accent};
  outline-offset: 2px;
}`;case`checkbox`:return`.toggle-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.toggle-box {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${e.width>40?22:e.width}px;
  height: ${e.width>40?22:e.width}px;
  border-radius: ${Math.min(e.radius,8)}px;
  border: 2px solid ${e.offTrack};
  background: transparent;
  cursor: pointer;
  transition:
    background-color 180ms ease,
    border-color 180ms ease;
}

.toggle-box::after {
  content: '';
  width: 5px;
  height: 10px;
  border: solid ${e.knob};
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) scale(0);
  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1);
}

.toggle-input:checked + .toggle-box {
  background: ${e.accent};
  border-color: ${e.accent};
${e.glow?`  box-shadow: 0 0 10px ${e.accent}55;`:``}
}

.toggle-input:checked + .toggle-box::after {
  transform: rotate(45deg) scale(1);
}

.toggle-input:focus-visible + .toggle-box {
  outline: 2px solid ${e.accent};
  outline-offset: 2px;
}`;case`radio`:return`.toggle-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.toggle-radio {
  display: inline-block;
  width: ${e.width>40?20:e.width}px;
  height: ${e.width>40?20:e.width}px;
  border-radius: 999px;
  border: 2px solid ${e.offTrack};
  background: transparent;
  cursor: pointer;
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease;
}

.toggle-input:checked + .toggle-radio {
  border-color: ${e.accent};
  border-width: ${Math.max(5,Math.round((e.width>40?20:e.width)/4))}px;
  background: ${e.knob};
${e.glow?`  box-shadow: 0 0 10px ${e.accent}55;`:``}
}

.toggle-input:focus-visible + .toggle-radio {
  outline: 2px solid ${e.accent};
  outline-offset: 2px;
}`;case`skeleton`:return`.skeleton {
  border-radius: ${e.radius}px;
  background:
    linear-gradient(90deg, ${e.offTrack} 25%, ${e.accent}22 50%, ${e.offTrack} 75%);
  background-size: 200% 100%;
  animation: skeleton-wave 1.4s ease-in-out infinite;
}

@keyframes skeleton-wave {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.skeleton-text {
  height: ${e.height}px;
  margin-bottom: 8px;
}

.skeleton-text:last-child {
  width: 60%;
}`}}function w(e){switch(e.kind){case`switch`:return`<label>
  <input class="toggle-input" type="checkbox" />
  <span class="toggle-track"></span>
</label>`;case`checkbox`:return`<label>
  <input class="toggle-input" type="checkbox" />
  <span class="toggle-box"></span>
</label>`;case`radio`:return`<label>
  <input class="toggle-input" type="radio" name="group" />
  <span class="toggle-radio"></span>
</label>`;case`skeleton`:return`<div class="skeleton skeleton-text" style="width: 80%"></div>
<div class="skeleton skeleton-text" style="width: 100%"></div>
<div class="skeleton skeleton-text" style="width: 60%"></div>`}}function T(e){return{"--toggle-accent":e.accent,"--toggle-off":e.offTrack,"--toggle-knob":e.knob}}function E(e,t){let n=x.map(e=>e.value),r=Math.floor(t.range(0,360));return{...e,kind:t.pick(n),accent:`hsl(${r} 80% 55%)`,offTrack:`hsl(${r} 10% 28%)`,knob:`hsl(${r} 20% 97%)`,width:Math.round(t.range(36,56)),height:Math.round(t.range(20,28)),glow:t.chance(.4)}}var D=[{name:`Emerald Switch`,tags:[`brand`],state:{...S}},{name:`iOS Classic`,tags:[`mobile`],state:{...S,width:51,height:31,knob:`#ffffff`,offTrack:`#d4d4d8`}},{name:`Neon Switch`,tags:[`glow`,`neon`],state:{...S,accent:`#22d3ee`,offTrack:`#164e63`,glow:!0,width:50}},{name:`Violet Check`,tags:[`checkbox`,`brand`],state:{...S,kind:`checkbox`,accent:`#8b5cf6`,offTrack:`#52525b`,glow:!0}},{name:`Amber Radio`,tags:[`radio`,`warm`],state:{...S,kind:`radio`,accent:`#f59e0b`,offTrack:`#78716c`}},{name:`Square Minimal`,tags:[`minimal`],state:{...S,kind:`checkbox`,accent:`#fafafa`,offTrack:`#52525b`,knob:`#09090b`,radius:4}},{name:`Skeleton Wave`,tags:[`loader`,`skeleton`],state:{...S,kind:`skeleton`,accent:`#3f3f46`,offTrack:`#27272a`,radius:8}},{name:`Rose Pill`,tags:[`warm`],state:{...S,accent:`#f43f5e`,offTrack:`#500724`,width:48,glow:!0}},{name:`Light Track`,tags:[`light`],state:{...S,offTrack:`#e4e4e7`,knob:`#fafafa`,accent:`#10b981`}},{name:`Compact Square`,tags:[`minimal`],state:{...S,width:36,height:20,radius:6}}],O=[`innerHTML`],k={class:`flex h-full w-full max-w-2xl flex-col items-center justify-center gap-8 p-6`},A=[`innerHTML`],j=n({__name:`toggle`,setup(n){let{state:j,randomize:M,reset:N,undo:P,redo:F,pushHistory:I,shareUrlRef:L}=g({id:`toggle`,defaultState:JSON.parse(JSON.stringify(S)),randomize:E}),R=r(`editor:shareUrl`,()=>{});s(()=>R(L.value));let z=i(()=>C(j.value)),B=i(()=>w(j.value)),V=i(()=>T(j.value)),H=i(()=>`<style>${z.value}</style>`);function U(e){j.value=JSON.parse(JSON.stringify(D[e].state)),I()}let W=i(()=>D.map(e=>({name:e.name,css:C(e.state),html:w(e.state)})));return(n,r)=>{let i=p,s=h,g=_,S=m,C=v,w=d,T=y,E=b,I=f;return o(),l(I,{title:`Toggle & Checkbox Studio`,description:`Custom switches, checkboxes, radios and skeletons — no JS.`,css:u(z),html:u(B),vars:u(V),onRandomize:u(M),onReset:u(N),onUndo:u(P),onRedo:u(F)},{preview:c(()=>[e(s,{variants:u(W),onApplyVariant:U,title:`Toggle preview`,filename:`css-studio-toggle`},{presets:c(()=>[e(i,{presets:u(D),onApply:U},null,8,[`presets`])]),default:c(()=>[t(`div`,{innerHTML:u(H),"aria-hidden":`true`},null,8,O),t(`div`,k,[t(`div`,{innerHTML:u(B)},null,8,A),r[8]||=t(`p`,{class:`max-w-xs text-center text-[11px] text-muted`},`Click the control to toggle it. Tab to it to check focus styles.`,-1)])]),_:1},8,[`variants`])]),controls:c(()=>[e(w,{label:`Control`,icon:`ph-toggle-left`},{default:c(()=>[e(g,{modelValue:u(j).kind,"onUpdate:modelValue":r[0]||=e=>u(j).kind=e,label:`Type`,options:u(x)},null,8,[`modelValue`,`options`]),e(S,{modelValue:u(j).width,"onUpdate:modelValue":r[1]||=e=>u(j).width=e,label:`Width`,min:20,max:60,suffix:`px`},null,8,[`modelValue`]),u(j).kind===`switch`?(o(),l(S,{key:0,modelValue:u(j).height,"onUpdate:modelValue":r[2]||=e=>u(j).height=e,label:`Height`,min:14,max:36,suffix:`px`},null,8,[`modelValue`])):a(``,!0),e(S,{modelValue:u(j).radius,"onUpdate:modelValue":r[3]||=e=>u(j).radius=e,label:`Radius`,min:0,max:999,suffix:`px`},null,8,[`modelValue`]),e(C,{modelValue:u(j).glow,"onUpdate:modelValue":r[4]||=e=>u(j).glow=e,label:`Glow when active`},null,8,[`modelValue`])]),_:1}),e(w,{label:`Colors`,icon:`ph-palette`},{default:c(()=>[e(T,{"model-value":u(j).accent,label:`Active color`,"onUpdate:modelValue":r[5]||=e=>u(j).accent=e},null,8,[`model-value`]),e(T,{"model-value":u(j).offTrack,label:`Off / border`,"onUpdate:modelValue":r[6]||=e=>u(j).offTrack=e},null,8,[`model-value`]),e(T,{"model-value":u(j).knob,label:`Knob / check`,"onUpdate:modelValue":r[7]||=e=>u(j).knob=e},null,8,[`model-value`])]),_:1})]),code:c(()=>[e(E,{css:u(z),html:u(B),vars:u(V),filename:`css-studio-toggle`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{j as default};