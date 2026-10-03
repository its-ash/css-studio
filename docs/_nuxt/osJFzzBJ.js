import{A as e,C as t,M as n,R as r,S as i,X as a,ct as o,lt as s,w as c,wt as l}from"./MitKKUeq.js";import{a as u,i as d,n as f,o as p,r as m,s as h,t as g}from"./DJLqZT_o.js";import{t as _}from"./D3e07OzS.js";import{t as v}from"./BYmGHvE7.js";import{t as y}from"./CcuAq1zZ.js";var b=[{value:`outline`,label:`Outline`},{value:`underline`,label:`Underline`},{value:`floating`,label:`Floating Label`},{value:`glow`,label:`Glow Focus`},{value:`filled`,label:`Filled`}],x={skin:`outline`,accent:`#10b981`,bg:`#09090b`,textColor:`#fafafa`,borderColor:`#3f3f46`,radius:10,width:260,fontSize:14,label:`Email`,placeholder:`you@example.com`};function S(e){let t=`.input-field {
  width: ${e.width}px;
  font-size: ${e.fontSize}px;
  color: ${e.textColor};
  background: ${e.skin===`filled`?e.borderColor:e.bg};
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease,
    outline 180ms ease;
}`;switch(e.skin){case`outline`:return`${t}
  padding: 10px 14px;
  border: 1px solid ${e.borderColor};
  border-radius: ${e.radius}px;
  outline: none;
}

.input-field::placeholder {
  color: ${e.borderColor};
}

.input-field:focus {
  border-color: ${e.accent};
  box-shadow: 0 0 0 3px ${e.accent}33;
}`;case`underline`:return`${t}
  padding: 10px 2px;
  border: none;
  border-bottom: 2px solid ${e.borderColor};
  border-radius: 0;
  outline: none;
}

.input-field::placeholder {
  color: ${e.borderColor};
}

.input-field:focus {
  border-bottom-color: ${e.accent};
  box-shadow: 0 1px 0 0 ${e.accent};
}`;case`floating`:return`${t}
  padding: 22px 14px 8px;
  border: 1px solid ${e.borderColor};
  border-radius: ${e.radius}px;
  outline: none;
}

.input-wrap {
  position: relative;
  width: ${e.width}px;
}

.input-label {
  position: absolute;
  left: 14px;
  top: 15px;
  font-size: ${e.fontSize}px;
  color: ${e.borderColor};
  pointer-events: none;
  transition: all 160ms ease;
}

.input-field:focus {
  border-color: ${e.accent};
}

.input-field:focus ~ .input-label,
.input-field:not(:placeholder-shown) ~ .input-label {
  top: 6px;
  font-size: ${Math.max(10,e.fontSize-4)}px;
  color: ${e.accent};
}`;case`glow`:return`${t}
  padding: 10px 14px;
  border: 1px solid ${e.borderColor};
  border-radius: ${e.radius}px;
  outline: none;
}

.input-field::placeholder {
  color: ${e.borderColor};
}

.input-field:focus {
  border-color: ${e.accent};
  box-shadow: 0 0 0 3px ${e.accent}33, 0 0 18px ${e.accent}44;
  caret-color: ${e.accent};
}`;case`filled`:return`${t}
  padding: 10px 14px;
  border: none;
  border-radius: ${e.radius}px;
  outline: none;
}

.input-field::placeholder {
  color: ${e.textColor};
  opacity: 0.45;
}

.input-field:focus {
  box-shadow: inset 0 0 0 2px ${e.accent};
}`}}function C(e){return e.skin===`floating`?`<div class="input-wrap">
  <input class="input-field" type="text" placeholder=" " />
  <span class="input-label">${e.label}</span>
</div>`:`<input class="input-field" type="text" placeholder="${e.placeholder}" />`}function w(e){return{"--input-accent":e.accent,"--input-border":e.borderColor,"--input-bg":e.bg}}function T(e,t){let n=b.map(e=>e.value),r=Math.floor(t.range(0,360));return{...e,skin:t.pick(n),accent:`hsl(${r} 80% 55%)`,borderColor:`hsl(${r} 8% 32%)`,radius:t.pick([0,8,10,16,999]),width:Math.round(t.range(200,320)),fontSize:Math.round(t.range(13,17))}}var E=[{name:`Emerald Outline`,tags:[`brand`],state:{...x}},{name:`Underline Ink`,tags:[`minimal`,`editorial`],state:{...x,skin:`underline`,radius:0,borderColor:`#52525b`}},{name:`Floating Email`,tags:[`form`,`floating`],state:{...x,skin:`floating`,label:`Email address`}},{name:`Neon Glow`,tags:[`glow`,`neon`],state:{...x,skin:`glow`,accent:`#22d3ee`,borderColor:`#164e63`}},{name:`Filled Soft`,tags:[`filled`,`soft`],state:{...x,skin:`filled`,bg:`#27272a`,borderColor:`#3f3f46`,radius:12}},{name:`Pill Search`,tags:[`search`],state:{...x,placeholder:`Search…`,radius:999,width:300}},{name:`Light Outline`,tags:[`light`],state:{...x,bg:`#fafafa`,textColor:`#18181b`,borderColor:`#d4d4d8`}},{name:`Rose Focus`,tags:[`warm`],state:{...x,accent:`#f43f5e`,borderColor:`#52525b`}},{name:`Square Sharp`,tags:[`mono`],state:{...x,radius:0,borderColor:`#71717a`}},{name:`Violet Floating`,tags:[`floating`,`brand`],state:{...x,skin:`floating`,accent:`#8b5cf6`,label:`Username`,placeholder:` `}}],D=[`innerHTML`],O={class:`flex h-full w-full max-w-2xl flex-col items-center justify-center gap-8 p-6`},k=[`innerHTML`],A=n({__name:`input`,setup(n){let{state:A,randomize:j,reset:M,undo:N,redo:P,pushHistory:F,shareUrlRef:I}=g({id:`input`,defaultState:JSON.parse(JSON.stringify(x)),randomize:T}),L=r(`editor:shareUrl`,()=>{});o(()=>L(I.value));let R=i(()=>S(A.value)),z=i(()=>C(A.value)),B=i(()=>w(A.value)),V=i(()=>`<style>${R.value}</style>`);function H(e){A.value=JSON.parse(JSON.stringify(E[e].state)),F()}let U=i(()=>E.map(e=>({name:e.name,css:S(e.state),html:C(e.state)})));return(n,r)=>{let i=h,o=p,g=_,x=y,S=u,C=d,w=v,T=m,F=f;return a(),c(F,{title:`Input Field Studio`,description:`Styled text inputs with focus states — pure CSS.`,css:l(R),html:l(z),vars:l(B),onRandomize:l(j),onReset:l(M),onUndo:l(N),onRedo:l(P)},{preview:s(()=>[e(o,{variants:l(U),onApplyVariant:H,title:`Input preview`,filename:`css-studio-input`},{presets:s(()=>[e(i,{presets:l(E),onApply:H},null,8,[`presets`])]),default:s(()=>[t(`div`,{innerHTML:l(V),"aria-hidden":`true`},null,8,D),t(`div`,O,[t(`div`,{innerHTML:l(z)},null,8,k),r[9]||=t(`p`,{class:`max-w-xs text-center text-[11px] text-muted`},`Click into the field to preview the focus state.`,-1)])]),_:1},8,[`variants`])]),controls:s(()=>[e(C,{label:`Field`,icon:`ph-textbox`},{default:s(()=>[e(g,{modelValue:l(A).skin,"onUpdate:modelValue":r[0]||=e=>l(A).skin=e,label:`Skin`,options:l(b)},null,8,[`modelValue`,`options`]),e(x,{modelValue:l(A).label,"onUpdate:modelValue":r[1]||=e=>l(A).label=e,label:`Label`,placeholder:`Label`},null,8,[`modelValue`]),e(x,{modelValue:l(A).placeholder,"onUpdate:modelValue":r[2]||=e=>l(A).placeholder=e,label:`Placeholder`,placeholder:`you@example.com`},null,8,[`modelValue`]),e(S,{modelValue:l(A).width,"onUpdate:modelValue":r[3]||=e=>l(A).width=e,label:`Width`,min:160,max:360,step:10,suffix:`px`},null,8,[`modelValue`]),e(S,{modelValue:l(A).fontSize,"onUpdate:modelValue":r[4]||=e=>l(A).fontSize=e,label:`Font size`,min:12,max:18,suffix:`px`},null,8,[`modelValue`]),e(S,{modelValue:l(A).radius,"onUpdate:modelValue":r[5]||=e=>l(A).radius=e,label:`Radius`,min:0,max:24,suffix:`px`},null,8,[`modelValue`])]),_:1}),e(C,{label:`Colors`,icon:`ph-palette`},{default:s(()=>[e(w,{"model-value":l(A).accent,label:`Focus accent`,"onUpdate:modelValue":r[6]||=e=>l(A).accent=e},null,8,[`model-value`]),e(w,{"model-value":l(A).borderColor,label:`Border`,"onUpdate:modelValue":r[7]||=e=>l(A).borderColor=e},null,8,[`model-value`]),e(w,{"model-value":l(A).bg,label:`Background`,"onUpdate:modelValue":r[8]||=e=>l(A).bg=e},null,8,[`model-value`])]),_:1})]),code:s(()=>[e(T,{css:l(R),html:l(z),vars:l(B),filename:`css-studio-input`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{A as default};