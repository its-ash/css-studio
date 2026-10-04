import{A as e,C as t,M as n,R as r,S as i,X as a,ct as o,lt as s,w as c,wt as l}from"./MitKKUeq.js";import{a as u,i as d,l as f,o as p,s as m,t as h}from"./DayxJ-Je.js";import{t as g}from"./D3e07OzS.js";import{t as _}from"./Dh2B6pZ8.js";import{t as v}from"./BYmGHvE7.js";import{t as y}from"./BVp1fOGc.js";var b=[{value:`zebra`,label:`Zebra`},{value:`minimal`,label:`Minimal Lines`},{value:`rounded`,label:`Rounded Frame`},{value:`dark-glow`,label:`Dark Glow`}],x={skin:`zebra`,accent:`#10b981`,bg:`#18181b`,textColor:`#fafafa`,rowHover:!0,radius:12,fontSize:14,stickyHeader:!0,paddingY:12};function S(e){let t=e.skin===`zebra`?`.css-table tbody tr:nth-child(even) {
  background: ${e.textColor}0a;
}`:``,n=e.skin===`dark-glow`?`.css-table-wrap {
  box-shadow: 0 0 24px ${e.accent}22, 0 8px 32px rgba(0, 0, 0, 0.4);
}

.css-table th {
  color: ${e.accent};
}`:``,r=e.stickyHeader?`.css-table th {
  position: sticky;
  top: 0;
  background: ${e.skin,e.bg};
  z-index: 1;
}`:``,i=e.rowHover?`.css-table tbody tr {
  transition: background-color 150ms ease;
}

.css-table tbody tr:hover {
  background: ${e.accent}14;
}`:``;return`${e.skin===`rounded`||e.skin===`dark-glow`?`.css-table-wrap {
  border-radius: ${e.radius}px;
  border: 1px solid ${e.textColor}1f;
  overflow: hidden${e.stickyHeader,``};
  max-height: 300px;
  overflow-y: auto;
}`:``}

.css-table {
  width: 100%;
  border-collapse: collapse;
  font-size: ${e.fontSize}px;
  color: ${e.textColor};
  background: ${e.bg};
}

.css-table th,
.css-table td {
  padding: ${e.paddingY}px 16px;
  text-align: left;
}

.css-table th {
  font-size: ${e.fontSize-2}px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${e.textColor}aa;
  border-bottom: 2px solid ${e.accent};
}

${e.skin===`minimal`?`.css-table td {
  border-bottom: 1px solid ${e.textColor}14;
}`:``}

${t}

${i}

${r}

${n}`}function C(){return`<div class="css-table-wrap">
  <table class="css-table">
    <thead>
      <tr><th>Plan</th><th>Price</th><th>Seats</th></tr>
    </thead>
    <tbody>
      <tr><td>Hobby</td><td>$0</td><td>1</td></tr>
      <tr><td>Pro</td><td>$12</td><td>5</td></tr>
      <tr><td>Team</td><td>$49</td><td>20</td></tr>
      <tr><td>Studio</td><td>$99</td><td>60</td></tr>
      <tr><td>Enterprise</td><td>Custom</td><td>∞</td></tr>
    </tbody>
  </table>
</div>`}function w(e){return{"--table-accent":e.accent,"--table-bg":e.bg,"--table-fg":e.textColor}}function T(e,t){let n=b.map(e=>e.value),r=Math.floor(t.range(0,360));return{...e,skin:t.pick(n),accent:`hsl(${r} 78% 52%)`,bg:`hsl(${r} 10% 10%)`,radius:t.pick([0,8,12,16]),fontSize:Math.round(t.range(12,16)),paddingY:Math.round(t.range(8,16)),rowHover:t.chance(.8),stickyHeader:t.chance(.7)}}var E=[{name:`Emerald Zebra`,tags:[`brand`],state:{...x}},{name:`Minimal Docs`,tags:[`docs`,`minimal`],state:{...x,skin:`minimal`,stickyHeader:!1}},{name:`Rounded Frame`,tags:[`card`],state:{...x,skin:`rounded`,accent:`#8b5cf6`}},{name:`Neon Glow`,tags:[`neon`],state:{...x,skin:`dark-glow`,accent:`#22d3ee`,bg:`#020617`}},{name:`Sharp Lines`,tags:[`mono`],state:{...x,radius:0,accent:`#a1a1aa`}},{name:`Warm Zebra`,tags:[`warm`],state:{...x,accent:`#f59e0b`}},{name:`Light Zebra`,tags:[`light`],state:{...x,bg:`#fafafa`,textColor:`#18181b`}},{name:`No Hover`,tags:[`static`],state:{...x,rowHover:!1,skin:`minimal`}}],D=[`innerHTML`],O={class:`flex h-full w-full max-w-2xl items-start justify-center overflow-y-auto p-6`},k=[`innerHTML`],A=n({__name:`table`,setup(n){let{state:A,randomize:j,reset:M,undo:N,redo:P,pushHistory:F,shareUrlRef:I}=h({id:`table`,defaultState:JSON.parse(JSON.stringify(x)),randomize:T}),L=r(`editor:shareUrl`,()=>{});o(()=>L(I.value));let R=i(()=>S(A.value)),z=i(()=>C()),B=i(()=>w(A.value)),V=i(()=>`<style>${R.value}</style>`);function H(e){A.value=JSON.parse(JSON.stringify(E[e].state)),F()}let U=i(()=>E.map(e=>({name:e.name,css:S(e.state),html:C()})));return(n,r)=>{let i=f,o=m,h=g,x=p,S=_,C=u,w=v,T=y,F=d;return a(),c(F,{title:`Table Styles`,description:`Zebra rows, sticky headers, rounded frames and glow.`,css:l(R),html:l(z),vars:l(B),onRandomize:l(j),onReset:l(M),onUndo:l(N),onRedo:l(P)},{preview:s(()=>[e(o,{variants:l(U),onApplyVariant:H,title:`Table preview`,filename:`css-studio-table`},{presets:s(()=>[e(i,{presets:l(E),onApply:H},null,8,[`presets`])]),default:s(()=>[t(`div`,{innerHTML:l(V),"aria-hidden":`true`},null,8,D),t(`div`,O,[t(`div`,{innerHTML:l(z)},null,8,k)])]),_:1},8,[`variants`])]),controls:s(()=>[e(C,{label:`Table`,icon:`ph-table`},{default:s(()=>[e(h,{modelValue:l(A).skin,"onUpdate:modelValue":r[0]||=e=>l(A).skin=e,label:`Skin`,options:l(b)},null,8,[`modelValue`,`options`]),e(x,{modelValue:l(A).fontSize,"onUpdate:modelValue":r[1]||=e=>l(A).fontSize=e,label:`Font size`,min:11,max:17,suffix:`px`},null,8,[`modelValue`]),e(x,{modelValue:l(A).paddingY,"onUpdate:modelValue":r[2]||=e=>l(A).paddingY=e,label:`Row padding`,min:6,max:20,suffix:`px`},null,8,[`modelValue`]),e(x,{modelValue:l(A).radius,"onUpdate:modelValue":r[3]||=e=>l(A).radius=e,label:`Frame radius`,min:0,max:20,suffix:`px`},null,8,[`modelValue`]),e(S,{modelValue:l(A).rowHover,"onUpdate:modelValue":r[4]||=e=>l(A).rowHover=e,label:`Hover highlight`},null,8,[`modelValue`]),e(S,{modelValue:l(A).stickyHeader,"onUpdate:modelValue":r[5]||=e=>l(A).stickyHeader=e,label:`Sticky header`},null,8,[`modelValue`])]),_:1}),e(C,{label:`Colors`,icon:`ph-palette`},{default:s(()=>[e(w,{"model-value":l(A).accent,label:`Accent`,"onUpdate:modelValue":r[6]||=e=>l(A).accent=e},null,8,[`model-value`]),e(w,{"model-value":l(A).bg,label:`Background`,"onUpdate:modelValue":r[7]||=e=>l(A).bg=e},null,8,[`model-value`]),e(w,{"model-value":l(A).textColor,label:`Text`,"onUpdate:modelValue":r[8]||=e=>l(A).textColor=e},null,8,[`model-value`])]),_:1})]),code:s(()=>[e(T,{css:l(R),html:l(z),vars:l(B),filename:`css-studio-table`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{A as default};