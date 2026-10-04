import{A as e,C as t,M as n,R as r,S as i,X as a,ct as o,lt as s,w as c,wt as l}from"./MitKKUeq.js";import{a as u,i as d,l as f,o as p,s as m,t as h}from"./CJu4WcQG.js";import{t as g}from"./D3e07OzS.js";import{t as _}from"./Dh2B6pZ8.js";import{t as v}from"./BYmGHvE7.js";import{t as y}from"./o8u_Jv9o.js";var b=[{value:`bordered`,label:`Bordered`},{value:`seamless`,label:`Seamless`},{value:`card`,label:`Card`},{value:`pill`,label:`Pill`}],x={skin:`bordered`,accent:`#10b981`,bg:`#18181b`,textColor:`#fafafa`,radius:10,duration:280,gap:8,rotateIcon:!0},S=[{q:`What is this?`,a:`An accordion built entirely with <details> and CSS — no JavaScript.`},{q:`How does it animate?`,a:`interpolate-size: allow-keywords plus a transition on block-size.`},{q:`Is it accessible?`,a:`Yes — details/summary is natively keyboard-accessible.`},{q:`Can I style the marker?`,a:`summary::-webkit-details-marker { display: none; } hides the default arrow.`}];function C(e){let t=e.rotateIcon?`details[open] .accordion-icon {
  transform: rotate(45deg);
}`:``;return`${{bordered:`.accordion {
  display: flex;
  flex-direction: column;
  gap: ${e.gap}px;
}

.accordion details {
  border: 1px solid ${e.textColor}22;
  border-radius: ${e.radius}px;
  background: ${e.bg};
  overflow: hidden;
}`,seamless:`.accordion {
  display: flex;
  flex-direction: column;
}

.accordion details {
  border-bottom: 1px solid ${e.textColor}18;
  background: ${e.bg};
}`,card:`.accordion {
  display: flex;
  flex-direction: column;
  gap: ${e.gap}px;
}

.accordion details {
  border-radius: ${e.radius}px;
  background: ${e.bg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}`,pill:`.accordion {
  display: flex;
  flex-direction: column;
  gap: ${e.gap}px;
}

.accordion details {
  border-radius: 999px;
  background: ${e.bg};
  overflow: hidden;
  transition: border-radius ${e.duration}ms ease;
}

.accordion details[open] {
  border-radius: ${e.radius}px;
}`}[e.skin]}

.accordion summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  cursor: pointer;
  list-style: none;
  font-weight: 600;
  color: ${e.textColor};
  transition: color ${e.duration}ms ease;
}

.accordion summary::-webkit-details-marker {
  display: none;
}

.accordion summary:hover {
  color: ${e.accent};
}

.accordion-icon {
  font-size: 18px;
  line-height: 1;
  color: ${e.accent};
  transition: transform ${e.duration}ms cubic-bezier(0.4, 0, 0.2, 1);
}

${t}

.accordion-body {
  padding: 0 18px 14px;
  color: ${e.textColor}bb;
  font-size: 14px;
  line-height: 1.6;
  transition: block-size ${e.duration}ms ease allow-discrete;
}

@supports (interpolate-size: allow-keywords) {
  .accordion details::details-content {
    block-size: 0;
    overflow: clip;
    transition: block-size ${e.duration}ms ease, content-visibility ${e.duration}ms allow-discrete;
  }

  .accordion details[open]::details-content {
    block-size: auto;
  }
}`}function w(){return`<div class="accordion">\n${S.map(e=>`  <details>
    <summary>${e.q}<span class="accordion-icon">+</span></summary>
    <div class="accordion-body">${e.a}</div>
  </details>`).join(`
`)}\n</div>`}function T(e){return{"--accordion-accent":e.accent,"--accordion-bg":e.bg,"--accordion-duration":`${e.duration}ms`}}function E(e,t){let n=b.map(e=>e.value),r=Math.floor(t.range(0,360));return{...e,skin:t.pick(n),accent:`hsl(${r} 80% 55%)`,bg:`hsl(${r} 10% 10%)`,radius:t.pick([0,8,10,16]),duration:Math.round(t.range(180,450)),rotateIcon:t.chance(.7)}}var D=[{name:`Emerald Bordered`,tags:[`brand`],state:{...x}},{name:`Seamless Docs`,tags:[`docs`],state:{...x,skin:`seamless`,radius:0,accent:`#fafafa`}},{name:`Shadow Cards`,tags:[`card`],state:{...x,skin:`card`,accent:`#8b5cf6`,radius:12}},{name:`Pill Open`,tags:[`playful`],state:{...x,skin:`pill`,accent:`#f59e0b`,duration:320}},{name:`Neon FAQ`,tags:[`neon`,`faq`],state:{...x,accent:`#22d3ee`,bg:`#083344`,glowless:!1}},{name:`Light Bordered`,tags:[`light`],state:{...x,bg:`#fafafa`,textColor:`#18181b`,accent:`#10b981`}},{name:`Snappy`,tags:[`fast`],state:{...x,duration:160,accent:`#f43f5e`}},{name:`No Rotate`,tags:[`minimal`],state:{...x,rotateIcon:!1,accent:`#a1a1aa`}}],O=[`innerHTML`],k={class:`flex h-full w-full max-w-2xl items-start justify-center overflow-y-auto p-6`},A=[`innerHTML`],j=n({__name:`accordion`,setup(n){let{state:S,randomize:j,reset:M,undo:N,redo:P,pushHistory:F,shareUrlRef:I}=h({id:`accordion`,defaultState:JSON.parse(JSON.stringify(x)),randomize:E}),L=r(`editor:shareUrl`,()=>{});o(()=>L(I.value));let R=i(()=>C(S.value)),z=i(()=>w()),B=i(()=>T(S.value)),V=i(()=>`<style>${R.value}</style>`);function H(e){S.value=JSON.parse(JSON.stringify(D[e].state)),F()}let U=i(()=>D.map(e=>({name:e.name,css:C(e.state),html:w()})));return(n,r)=>{let i=f,o=m,h=g,x=p,C=_,w=u,T=v,E=y,F=d;return a(),c(F,{title:`Accordion Builder`,description:`Accessible details/summary accordions with smooth animation.`,css:l(R),html:l(z),vars:l(B),onRandomize:l(j),onReset:l(M),onUndo:l(N),onRedo:l(P)},{preview:s(()=>[e(o,{variants:l(U),onApplyVariant:H,title:`Accordion preview`,filename:`css-studio-accordion`},{presets:s(()=>[e(i,{presets:l(D),onApply:H},null,8,[`presets`])]),default:s(()=>[t(`div`,{innerHTML:l(V),"aria-hidden":`true`},null,8,O),t(`div`,k,[t(`div`,{innerHTML:l(z)},null,8,A)])]),_:1},8,[`variants`])]),controls:s(()=>[e(w,{label:`Accordion`,icon:`ph-list`},{default:s(()=>[e(h,{modelValue:l(S).skin,"onUpdate:modelValue":r[0]||=e=>l(S).skin=e,label:`Skin`,options:l(b)},null,8,[`modelValue`,`options`]),e(x,{modelValue:l(S).gap,"onUpdate:modelValue":r[1]||=e=>l(S).gap=e,label:`Item gap`,min:0,max:20,suffix:`px`},null,8,[`modelValue`]),e(x,{modelValue:l(S).radius,"onUpdate:modelValue":r[2]||=e=>l(S).radius=e,label:`Radius`,min:0,max:24,suffix:`px`},null,8,[`modelValue`]),e(x,{modelValue:l(S).duration,"onUpdate:modelValue":r[3]||=e=>l(S).duration=e,label:`Duration`,min:120,max:600,step:10,suffix:`ms`},null,8,[`modelValue`]),e(C,{modelValue:l(S).rotateIcon,"onUpdate:modelValue":r[4]||=e=>l(S).rotateIcon=e,label:`Rotate + icon`},null,8,[`modelValue`])]),_:1}),e(w,{label:`Colors`,icon:`ph-palette`},{default:s(()=>[e(T,{"model-value":l(S).accent,label:`Accent`,"onUpdate:modelValue":r[5]||=e=>l(S).accent=e},null,8,[`model-value`]),e(T,{"model-value":l(S).bg,label:`Background`,"onUpdate:modelValue":r[6]||=e=>l(S).bg=e},null,8,[`model-value`]),e(T,{"model-value":l(S).textColor,label:`Text`,"onUpdate:modelValue":r[7]||=e=>l(S).textColor=e},null,8,[`model-value`])]),_:1})]),code:s(()=>[e(E,{css:l(R),html:l(z),vars:l(B),filename:`css-studio-accordion`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{j as default};