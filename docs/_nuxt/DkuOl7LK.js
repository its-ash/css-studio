import{A as e,C as t,M as n,R as r,S as i,X as a,ct as o,lt as s,w as c,wt as l}from"./MitKKUeq.js";import{a as u,i as d,l as f,o as p,s as m,t as h}from"./CJu4WcQG.js";import{t as g}from"./D3e07OzS.js";import{t as _}from"./Dh2B6pZ8.js";import{t as v}from"./BYmGHvE7.js";import{t as y}from"./o8u_Jv9o.js";var b=[{value:`flat`,label:`Flat`},{value:`elevated`,label:`Elevated`},{value:`glass`,label:`Glass`},{value:`outline`,label:`Outline`},{value:`gradient-border`,label:`Gradient Border`}],x={skin:`elevated`,accent:`#10b981`,bg:`#18181b`,textColor:`#fafafa`,radius:16,width:300,padding:20,hoverLift:!0,showImage:!0};function S(e){return`${{flat:`.css-card {
  background: ${e.bg};
}`,elevated:`.css-card {
  background: ${e.bg};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25), 0 1px 3px rgba(0, 0, 0, 0.2);
}`,glass:`.css-card {
  background: ${e.textColor}0a;
  backdrop-filter: blur(12px);
  border: 1px solid ${e.textColor}1f;
}`,outline:`.css-card {
  background: ${e.bg};
  border: 1.5px solid ${e.textColor}22;
}`,gradientBorder:`.css-card {
  position: relative;
  background: ${e.bg};
  border: 1px solid transparent;
  background-clip: padding-box;
}

.css-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1.5px;
  background: linear-gradient(135deg, ${e.accent}, ${e.accent}22 50%, ${e.accent});
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}`}[e.skin]}

.css-card {
  width: ${e.width}px;
  padding: ${e.padding}px;
  border-radius: ${e.radius}px;
  color: ${e.textColor};
  transition: transform 220ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 220ms ease;
}

${e.hoverLift?`.css-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
}`:``}

${e.showImage?`.card-image {
  height: 120px;
  border-radius: ${Math.max(0,e.radius-8)}px;
  background: linear-gradient(135deg, ${e.accent}66, ${e.accent}22);
  margin: -${Math.round(e.padding/2)}px -${Math.round(e.padding/2)}px ${Math.round(e.padding/2)}px;
}`:``}

.card-tag {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  background: ${e.accent}1f;
  color: ${e.accent};
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  margin: 10px 0 6px;
}

.card-desc {
  font-size: 13px;
  line-height: 1.6;
  color: ${e.textColor}99;
}`}function C(e){return`<div class="css-card">
  ${e.showImage?`<div class="card-image"></div>
  `:``}<span class="card-tag">New</span>
  <div class="card-title">Modern CSS Card</div>
  <div class="card-desc">A clean, reusable card component built with pure CSS.</div>
</div>`}function w(e){return{"--card-accent":e.accent,"--card-bg":e.bg,"--card-radius":`${e.radius}px`}}function T(e,t){let n=b.map(e=>e.value),r=Math.floor(t.range(0,360));return{...e,skin:t.pick(n),accent:`hsl(${r} 78% 52%)`,bg:`hsl(${r} 10% 11%)`,radius:t.pick([0,8,16,20]),width:Math.round(t.range(240,340)),hoverLift:t.chance(.7),showImage:t.chance(.7)}}var E=[{name:`Elevated Pro`,tags:[`brand`],state:{...x}},{name:`Glass Panel`,tags:[`glass`],state:{...x,skin:`glass`,accent:`#22d3ee`}},{name:`Gradient Border`,tags:[`gradient`,`premium`],state:{...x,skin:`gradient-border`,accent:`#8b5cf6`}},{name:`Outline Clean`,tags:[`minimal`],state:{...x,skin:`outline`,hoverLift:!1}},{name:`Flat Simple`,tags:[`flat`],state:{...x,skin:`flat`,showImage:!1,hoverLift:!1}},{name:`Sharp Card`,tags:[`mono`],state:{...x,radius:0,accent:`#f59e0b`}},{name:`Warm Lift`,tags:[`warm`],state:{...x,accent:`#f43f5e`,hoverLift:!0}},{name:`Compact Card`,tags:[`small`],state:{...x,width:240,padding:16,showImage:!1}},{name:`Light Card`,tags:[`light`],state:{...x,bg:`#fafafa`,textColor:`#18181b`}},{name:`Hero Card`,tags:[`landing`],state:{...x,width:340,radius:20}}],D=[`innerHTML`],O={class:`preview-card h-full w-full`},k=[`innerHTML`],A=n({__name:`card`,setup(n){let{state:A,randomize:j,reset:M,undo:N,redo:P,pushHistory:F,shareUrlRef:I}=h({id:`card`,defaultState:JSON.parse(JSON.stringify(x)),randomize:T}),L=r(`editor:shareUrl`,()=>{});o(()=>L(I.value));let R=i(()=>S(A.value)),z=i(()=>C(A.value)),B=i(()=>w(A.value)),V=i(()=>`<style>.preview-card { display: grid; place-items: center; height: 100%; } ${R.value}</style>`);function H(e){A.value=JSON.parse(JSON.stringify(E[e].state)),F()}let U=i(()=>E.map(e=>({name:e.name,css:S(e.state),html:C(e.state)})));return(n,r)=>{let i=f,o=m,h=g,x=p,S=_,C=u,w=v,T=y,F=d;return a(),c(F,{title:`Card Styles`,description:`Elevated, glass, outline and gradient-border cards.`,css:l(R),html:l(z),vars:l(B),onRandomize:l(j),onReset:l(M),onUndo:l(N),onRedo:l(P)},{preview:s(()=>[e(o,{variants:l(U),onApplyVariant:H,title:`Card preview`,filename:`css-studio-card`},{presets:s(()=>[e(i,{presets:l(E),onApply:H},null,8,[`presets`])]),default:s(()=>[t(`div`,{innerHTML:l(V),"aria-hidden":`true`},null,8,D),t(`div`,O,[t(`div`,{innerHTML:l(z)},null,8,k)])]),_:1},8,[`variants`])]),controls:s(()=>[e(C,{label:`Card`,icon:`ph-cards`},{default:s(()=>[e(h,{modelValue:l(A).skin,"onUpdate:modelValue":r[0]||=e=>l(A).skin=e,label:`Skin`,options:l(b)},null,8,[`modelValue`,`options`]),e(x,{modelValue:l(A).width,"onUpdate:modelValue":r[1]||=e=>l(A).width=e,label:`Width`,min:220,max:380,step:10,suffix:`px`},null,8,[`modelValue`]),e(x,{modelValue:l(A).padding,"onUpdate:modelValue":r[2]||=e=>l(A).padding=e,label:`Padding`,min:12,max:32,suffix:`px`},null,8,[`modelValue`]),e(x,{modelValue:l(A).radius,"onUpdate:modelValue":r[3]||=e=>l(A).radius=e,label:`Radius`,min:0,max:28,suffix:`px`},null,8,[`modelValue`]),e(S,{modelValue:l(A).hoverLift,"onUpdate:modelValue":r[4]||=e=>l(A).hoverLift=e,label:`Lift on hover`},null,8,[`modelValue`]),e(S,{modelValue:l(A).showImage,"onUpdate:modelValue":r[5]||=e=>l(A).showImage=e,label:`Image header`},null,8,[`modelValue`])]),_:1}),e(C,{label:`Colors`,icon:`ph-palette`},{default:s(()=>[e(w,{"model-value":l(A).accent,label:`Accent`,"onUpdate:modelValue":r[6]||=e=>l(A).accent=e},null,8,[`model-value`]),e(w,{"model-value":l(A).bg,label:`Background`,"onUpdate:modelValue":r[7]||=e=>l(A).bg=e},null,8,[`model-value`]),e(w,{"model-value":l(A).textColor,label:`Text`,"onUpdate:modelValue":r[8]||=e=>l(A).textColor=e},null,8,[`model-value`])]),_:1})]),code:s(()=>[e(T,{css:l(R),html:l(z),vars:l(B),filename:`css-studio-card`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{A as default};