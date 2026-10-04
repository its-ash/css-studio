import{A as e,C as t,M as n,R as r,S as i,X as a,ct as o,lt as s,w as c,wt as l}from"./MitKKUeq.js";import{a as u,i as d,l as f,o as p,s as m,t as h}from"./CJu4WcQG.js";import{t as g}from"./D3e07OzS.js";import{t as _}from"./Dh2B6pZ8.js";import{t as v}from"./BYmGHvE7.js";import{t as y}from"./o8u_Jv9o.js";var b=[{value:`dots`,label:`Dots`},{value:`cards`,label:`Cards`},{value:`alternating`,label:`Alternating`},{value:`compact`,label:`Compact`}],x={style:`dots`,accent:`#10b981`,bg:`#18181b`,textColor:`#fafafa`,dotSize:14,lineWidth:2,gap:24,radius:12,animatedLine:!1},S=[{date:`2025-01`,title:`Project kickoff`,desc:`Scope locked and seed funded.`},{date:`2025-05`,title:`Beta launch`,desc:`First 1,000 users onboarded.`},{date:`2025-09`,title:`v1.0 release`,desc:`Public launch with 40 generators.`},{date:`2026-02`,title:`1M renders`,desc:`Milestone crossed in February.`}];function C(e){let t=e.animatedLine?`.timeline::before {
  background: linear-gradient(180deg, ${e.accent}, ${e.accent}44, transparent);
  background-size: 100% 0%;
  background-repeat: no-repeat;
  background-position: top;
  animation: line-grow 3s ease-out forwards;
}

@keyframes line-grow {
  to {
    background-size: 100% 100%;
  }
}`:``;return`${{dots:`.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${e.gap}px;
  padding-left: ${e.dotSize*2}px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: ${e.dotSize-e.lineWidth/2}px;
  top: 6px;
  bottom: 6px;
  width: ${e.lineWidth}px;
  background: ${e.accent}33;
  border-radius: 999px;
}

.timeline-item {
  position: relative;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -${e.dotSize*1.5}px;
  top: 4px;
  width: ${e.dotSize}px;
  height: ${e.dotSize}px;
  border-radius: 999px;
  background: ${e.accent};
  box-shadow: 0 0 0 4px ${e.accent}33;
}`,cards:`.timeline {
  display: flex;
  flex-direction: column;
  gap: ${e.gap}px;
  position: relative;
  padding-left: ${e.dotSize*2}px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: ${e.dotSize-e.lineWidth/2}px;
  top: 0;
  bottom: 0;
  width: ${e.lineWidth}px;
  background: linear-gradient(180deg, ${e.accent}, ${e.accent}33);
}

.timeline-card {
  border: 1px solid ${e.textColor}1f;
  border-radius: ${e.radius}px;
  background: ${e.bg};
  padding: 14px 18px;
  position: relative;
}

.timeline-card::before {
  content: '';
  position: absolute;
  left: -${e.dotSize*1.5}px;
  top: 16px;
  width: ${e.dotSize}px;
  height: ${e.dotSize}px;
  border-radius: 999px;
  background: ${e.accent};
  box-shadow: 0 0 0 4px ${e.accent}2e;
}`,alternating:`.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${e.gap}px;
  max-width: 560px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: ${e.lineWidth}px;
  transform: translateX(-50%);
  background: ${e.accent}44;
}

.timeline-row {
  display: flex;
  width: 100%;
}

.timeline-row:nth-child(odd) {
  justify-content: flex-start;
}

.timeline-row:nth-child(even) {
  justify-content: flex-end;
}

.timeline-card {
  width: 46%;
  border: 1px solid ${e.textColor}1f;
  border-radius: ${e.radius}px;
  background: ${e.bg};
  padding: 14px 18px;
  position: relative;
}

.timeline-row:nth-child(odd) .timeline-card {
  border-top-right-radius: 2px;
}

.timeline-row:nth-child(even) .timeline-card {
  border-top-left-radius: 2px;
}

.timeline-row:nth-child(odd) .timeline-card::after {
  content: '';
  position: absolute;
  top: 20px;
  right: -${Math.round(e.dotSize*.9)}px;
  width: ${e.dotSize}px;
  height: ${e.dotSize}px;
  border-radius: 999px;
  background: ${e.accent};
  box-shadow: 0 0 0 4px ${e.accent}2e;
}

.timeline-row:nth-child(even) .timeline-card::after {
  content: '';
  position: absolute;
  top: 20px;
  left: -${Math.round(e.dotSize*.9)}px;
  width: ${e.dotSize}px;
  height: ${e.dotSize}px;
  border-radius: 999px;
  background: ${e.accent};
  box-shadow: 0 0 0 4px ${e.accent}2e;
}`,compact:`.timeline {
  display: flex;
  flex-direction: column;
  gap: ${Math.max(8,Math.round(e.gap/3))}px;
  border-left: ${e.lineWidth}px solid ${e.accent}44;
  padding-left: 16px;
  margin-left: 8px;
}

.timeline-item {
  position: relative;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -${(16+e.lineWidth/2+Math.max(6,e.dotSize-4)/2).toFixed(1)}px;
  top: 7px;
  width: ${Math.max(6,e.dotSize-4)}px;
  height: ${Math.max(6,e.dotSize-4)}px;
  border-radius: 999px;
  background: ${e.accent};
}`}[e.style]}

.timeline-date {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: ${e.accent};
  text-transform: uppercase;
}

.timeline-title {
  font-size: 15px;
  font-weight: 600;
  color: ${e.textColor};
  margin-top: 2px;
}

.timeline-desc {
  font-size: 13px;
  color: ${e.textColor}99;
  margin-top: 3px;
  line-height: 1.55;
}

${t}`}function w(e){let t=e=>`      <span class="timeline-date">${e.date}</span>
      <div class="timeline-title">${e.title}</div>
      <div class="timeline-desc">${e.desc}</div>`;return`<div class="timeline">\n${S.map(n=>e.style===`alternating`?`  <div class="timeline-row">
    <div class="timeline-card">
${t(n)}
    </div>
  </div>`:e.style===`cards`?`  <div class="timeline-card">
${t(n)}
  </div>`:`  <div class="timeline-item">
${t(n)}
  </div>`).join(`
`)}\n</div>`}function T(e){return{"--timeline-accent":e.accent,"--timeline-bg":e.bg,"--timeline-dot":`${e.dotSize}px`}}function E(e,t){let n=b.map(e=>e.value),r=Math.floor(t.range(0,360));return{...e,style:t.pick(n),accent:`hsl(${r} 78% 52%)`,bg:`hsl(${r} 10% 11%)`,dotSize:Math.round(t.range(10,20)),gap:Math.round(t.range(14,40)),radius:t.pick([0,8,12,16]),animatedLine:t.chance(.4)}}var D=[{name:`Emerald Dots`,tags:[`brand`],state:{...x}},{name:`Shadow Cards`,tags:[`card`],state:{...x,style:`cards`,accent:`#8b5cf6`,radius:14}},{name:`Zigzag Story`,tags:[`alternating`,`landing`],state:{...x,style:`alternating`,accent:`#f59e0b`}},{name:`Changelog`,tags:[`docs`,`compact`],state:{...x,style:`compact`,accent:`#22d3ee`,gap:12}},{name:`Animated Line`,tags:[`animated`],state:{...x,animatedLine:!0}},{name:`Neon Dots`,tags:[`neon`],state:{...x,accent:`#22d3ee`,bg:`#083344`,dotSize:16}},{name:`Sharp Mono`,tags:[`mono`],state:{...x,radius:0,accent:`#fafafa`,bg:`#18181b`}},{name:`Warm History`,tags:[`warm`],state:{...x,style:`cards`,accent:`#f43f5e`}},{name:`Light Timeline`,tags:[`light`],state:{...x,bg:`#fafafa`,textColor:`#18181b`,style:`cards`}}],O=[`innerHTML`],k={class:`preview-timeline h-full w-full`},A=[`innerHTML`],j=n({__name:`timeline`,setup(n){let{state:S,randomize:j,reset:M,undo:N,redo:P,pushHistory:F,shareUrlRef:I}=h({id:`timeline`,defaultState:JSON.parse(JSON.stringify(x)),randomize:E}),L=r(`editor:shareUrl`,()=>{});o(()=>L(I.value));let R=i(()=>C(S.value)),z=i(()=>w(S.value)),B=i(()=>T(S.value)),V=i(()=>`<style>.preview-timeline { display: flex; justify-content: center; height: 100%; overflow: auto; } .preview-timeline > div { width: 100%; max-width: 560px; } ${R.value}</style>`);function H(e){S.value=JSON.parse(JSON.stringify(D[e].state)),F()}let U=i(()=>D.map(e=>({name:e.name,css:C(e.state),html:w(e.state)})));return(n,r)=>{let i=f,o=m,h=g,x=p,C=_,w=u,T=v,E=y,F=d;return a(),c(F,{title:`Timeline Builder`,description:`Vertical timelines with dots, cards and animated lines.`,css:l(R),html:l(z),vars:l(B),onRandomize:l(j),onReset:l(M),onUndo:l(N),onRedo:l(P)},{preview:s(()=>[e(o,{variants:l(U),onApplyVariant:H,title:`Timeline preview`,filename:`css-studio-timeline`},{presets:s(()=>[e(i,{presets:l(D),onApply:H},null,8,[`presets`])]),default:s(()=>[t(`div`,{innerHTML:l(V),"aria-hidden":`true`},null,8,O),t(`div`,k,[t(`div`,{innerHTML:l(z)},null,8,A)])]),_:1},8,[`variants`])]),controls:s(()=>[e(w,{label:`Timeline`,icon:`ph-clock-counter-clockwise`},{default:s(()=>[e(h,{modelValue:l(S).style,"onUpdate:modelValue":r[0]||=e=>l(S).style=e,label:`Style`,options:l(b)},null,8,[`modelValue`,`options`]),e(x,{modelValue:l(S).dotSize,"onUpdate:modelValue":r[1]||=e=>l(S).dotSize=e,label:`Dot size`,min:8,max:24,suffix:`px`},null,8,[`modelValue`]),e(x,{modelValue:l(S).lineWidth,"onUpdate:modelValue":r[2]||=e=>l(S).lineWidth=e,label:`Line width`,min:1,max:5,suffix:`px`},null,8,[`modelValue`]),e(x,{modelValue:l(S).gap,"onUpdate:modelValue":r[3]||=e=>l(S).gap=e,label:`Item gap`,min:10,max:48,suffix:`px`},null,8,[`modelValue`]),e(x,{modelValue:l(S).radius,"onUpdate:modelValue":r[4]||=e=>l(S).radius=e,label:`Card radius`,min:0,max:24,suffix:`px`},null,8,[`modelValue`]),e(C,{modelValue:l(S).animatedLine,"onUpdate:modelValue":r[5]||=e=>l(S).animatedLine=e,label:`Animate the line`},null,8,[`modelValue`])]),_:1}),e(w,{label:`Colors`,icon:`ph-palette`},{default:s(()=>[e(T,{"model-value":l(S).accent,label:`Accent`,"onUpdate:modelValue":r[6]||=e=>l(S).accent=e},null,8,[`model-value`]),e(T,{"model-value":l(S).bg,label:`Card bg`,"onUpdate:modelValue":r[7]||=e=>l(S).bg=e},null,8,[`model-value`]),e(T,{"model-value":l(S).textColor,label:`Text`,"onUpdate:modelValue":r[8]||=e=>l(S).textColor=e},null,8,[`model-value`])]),_:1})]),code:s(()=>[e(E,{css:l(R),html:l(z),vars:l(B),filename:`css-studio-timeline`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{j as default};