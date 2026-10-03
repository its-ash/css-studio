import{A as e,C as t,M as n,R as r,S as i,X as a,_t as o,ct as s,lt as c,st as l,w as u,wt as d}from"./MitKKUeq.js";import{a as f,i as p,n as m,r as h,s as g,t as _}from"./BPBkcUFJ.js";import{t as v}from"./D3e07OzS.js";import{t as y}from"./Dh2B6pZ8.js";import{l as b}from"./Rl_HAT4u.js";import{t as x}from"./BYmGHvE7.js";import{t as S}from"./CcuAq1zZ.js";var C=[{value:`outline`,label:`Outline`},{value:`underline`,label:`Underline`},{value:`floating`,label:`Floating Label`},{value:`glow`,label:`Glow Focus`},{value:`filled`,label:`Filled`}],w=[`none`,`mail`,`search`,`user`,`lock`],T={skin:`outline`,accent:`#10b981`,bg:`#09090b`,textColor:`#fafafa`,borderColor:`#3f3f46`,radius:10,width:260,fontSize:14,label:`Email`,placeholder:`you@example.com`,icon:`none`,error:!1,underlineSweep:!0};function E(e){let t=e.icon!==`none`,n=`.input-field {
  width: ${e.width}px;
  font-size: ${e.fontSize}px;
  color: ${e.textColor};
  background: ${e.skin===`filled`?e.borderColor:e.bg};
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease,
    color 180ms ease;`,r=e.error?`
.input-field:user-invalid,
.input-field:not(:placeholder-shown):invalid {
  border-color: #f43f5e;
}
.input-field:user-invalid::placeholder,
.input-field:not(:placeholder-shown):invalid::placeholder {
  color: #fb7185;
}
.input-field:user-invalid:focus,
.input-field:not(:placeholder-shown):invalid:focus {
  box-shadow: 0 0 0 3px #f43f5e33;
}
.input-field:user-invalid:not(:focus),
.input-field:not(:placeholder-shown):invalid:not(:focus) {
  animation: input-shake 300ms ease;
}
.input-error {
  display: none;
  margin-top: 5px;
  font-size: ${Math.max(11,e.fontSize-3)}px;
  color: #fb7185;
}
.input-hint {
  margin-top: 5px;
  font-size: ${Math.max(11,e.fontSize-3)}px;
  color: ${e.borderColor};
}
.input-wrap.invalid .input-error,
.input-wrap.invalid .input-hint {
  display: block;
}
@keyframes input-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  50% { transform: translateX(3px); }
  75% { transform: translateX(-2px); }
}
@media (prefers-reduced-motion: reduce) {
  .input-field:user-invalid:not(:focus),
  .input-field:not(:placeholder-shown):invalid:not(:focus) {
    animation: none;
  }
}`:``;switch(e.skin){case`outline`:return`${n}
  padding: 10px 12px;
  border: 1px solid ${e.borderColor};
  border-radius: ${e.radius}px;${t?`
  padding-left: 34px;`:``}
}
.input-field::placeholder {
  color: ${e.borderColor};
  transition: color 180ms ease;
}
.input-field:focus::placeholder {
  color: ${e.accent}99;
}
.input-field:focus {
  outline: none;
  border-color: ${e.accent};
  box-shadow: 0 0 0 3px ${e.accent}33;
}
.input-field:hover:not(:focus) {
  border-color: ${e.borderColor};
  filter: brightness(1.15);
}${t?`\n${O(e,10)}`:``}${r}`;case`underline`:return`${n}
  padding: 10px 2px;
  border: none;
  border-bottom: 2px solid ${e.borderColor};
  border-radius: 0;${t?`
  padding-left: 32px;`:``}
}
.input-field::placeholder {
  color: ${e.borderColor};
  transition: color 180ms ease;
}
.input-field:focus::placeholder {
  color: ${e.accent}99;
}
.input-field:focus {
  outline: none;
  border-bottom-color: ${e.accent};
  box-shadow: 0 1px 0 0 ${e.accent};
}
.input-field:hover:not(:focus) {
  border-color: ${e.borderColor};
  filter: brightness(1.15);
}
${e.underlineSweep?`.input-wrap {
  position: relative;
  width: ${e.width}px;
}
.input-wrap::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: ${e.accent};
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 250ms cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}
.input-field:focus ~ .input-sweep,
.input-wrap:focus-within::after {
  transform: scaleX(1);
}`:``}${t?`\n${O(e,10)}`:``}${r}`;case`floating`:return`${n}
  padding: 22px 12px 8px;
  border: 1px solid ${e.borderColor};
  border-radius: ${e.radius}px;${t?`
  padding-left: 34px;`:``}
}
.input-field::placeholder {
  color: ${e.borderColor};
  transition: color 180ms ease;
}
.input-field:focus::placeholder {
  color: ${e.accent}99;
}
.input-field:focus {
  outline: none;
  border-color: ${e.accent};
}
.input-field:hover:not(:focus) {
  border-color: ${e.borderColor};
  filter: brightness(1.15);
}

.input-wrap {
  position: relative;
  width: ${e.width}px;
}

.input-label {
  position: absolute;
  left: ${t?34:12}px;
  top: 15px;
  font-size: ${e.fontSize}px;
  color: ${e.borderColor};
  pointer-events: none;
  transition: all 160ms ease;
}
${t?`
`+O(e,10)+`
`:``}
.input-field:focus ~ .input-label,
.input-field:not(:placeholder-shown) ~ .input-label {
  top: 6px;
  font-size: ${Math.max(10,e.fontSize-4)}px;
  color: ${e.accent};
}${r}`;case`glow`:return`${n}
  padding: 10px 12px;
  border: 1px solid ${e.borderColor};
  border-radius: ${e.radius}px;${t?`
  padding-left: 34px;`:``}
}
.input-field::placeholder {
  color: ${e.borderColor};
  transition: color 180ms ease;
}
.input-field:focus::placeholder {
  color: ${e.accent}99;
}
.input-field:focus {
  outline: none;
  border-color: ${e.accent};
  box-shadow: 0 0 0 3px ${e.accent}33, 0 0 18px ${e.accent}44;
  caret-color: ${e.accent};
}
.input-field:hover:not(:focus) {
  border-color: ${e.borderColor};
  filter: brightness(1.15);
}${t?`\n${O(e,10)}`:``}${r}`;case`filled`:return`${n}
  padding: 10px 12px;
  border: none;
  border-radius: ${e.radius}px;
  outline: none;${t?`
  padding-left: 34px;`:``}
}
.input-field::placeholder {
  color: ${e.textColor};
  opacity: 0.45;
}
.input-field:focus::placeholder {
  color: ${e.accent}99;
}
.input-field:focus {
  outline: none;
  box-shadow: inset 0 0 0 2px ${e.accent};
}

.input-field:hover:not(:focus) {
  background: ${e.borderColor}cc;
  filter: none;
}${t?`\n${O(e,10)}`:``}${r}`}}function D(e){let t=e.icon!==`none`,n=t?`\n  ${k[e.icon]}`:``;if(e.skin===`floating`)return`<div class="input-wrap">
  <input class="input-field" type="text" placeholder=" " />${n}
  <span class="input-label">${e.label}</span>
</div>`;if(e.error){let t=e.icon===`search`?`text`:`email`,r=e.icon===`search`?`
  <p class="input-hint">Try a topic to explore.</p>`:`
  <p class="input-error">Enter a valid email address.</p>`;return`<div class="input-wrap invalid">
  <input class="input-field" type="${t}" placeholder="${e.placeholder}" required />${n}${r}
</div>`}return e.underlineSweep&&e.skin===`underline`?`<div class="input-wrap">
  <input class="input-field" type="${e.icon===`search`?`search`:`text`}" placeholder="${e.placeholder}" />${n}
  <span class="input-sweep"></span>
</div>`:t?`<div class="input-wrap">
  <input class="input-field" type="${e.icon===`search`?`search`:`text`}" placeholder="${e.placeholder}" />${n}
</div>`:`<input class="input-field" type="text" placeholder="${e.placeholder}" />`}function O(e,t){return e.icon===`none`?``:`${e.skin!==`floating`&&!(e.skin===`underline`&&e.underlineSweep)?`.input-wrap {
  position: relative;
  width: ${e.width}px;
}
`:``}.input-icon {
  position: absolute;
  left: ${t}px;
  bottom: 11px;
  width: 14px;
  height: 14px;
  color: ${e.borderColor};
  pointer-events: none;
  transition: color 180ms ease;
}
.input-wrap:focus-within .input-icon {
  color: ${e.accent};
}`}var k={search:`<svg class="input-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="7" cy="7" r="4.5"/><path d="m10.5 10.5 4 4"/></svg>`,mail:`<svg class="input-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3.5" width="12" height="9" rx="1.5"/><path d="m2.5 4.5 5.5 4 5.5-4"/></svg>`,user:`<svg class="input-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="8" cy="5" r="3"/><path d="M2 14c.8-3 3-4.5 6-4.5s5.2 1.5 6 4.5"/></svg>`,lock:`<svg class="input-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="7" width="10" height="7" rx="1.5"/><path d="M5.5 7V5.5a2.5 2.5 0 0 1 5 0V7"/></svg>`};function A(e){return{"--input-accent":e.accent,"--input-border":e.borderColor,"--input-bg":e.bg}}function j(e,t){let n=C.map(e=>e.value),r=Math.floor(t.range(0,360)),i=`hsl(${r} 80% 55%)`;return{...e,skin:t.pick(n),accent:i,textColor:b(e.bg),borderColor:`hsl(${r} 8% 32%)`,radius:t.pick([0,8,10,16,999]),width:Math.round(t.range(220,320)),fontSize:Math.round(t.range(13,17)),icon:t.pick(w),error:t.chance(.25),underlineSweep:t.chance(.7)}}var M=[{name:`Emerald Outline`,tags:[`brand`],state:{...T}},{name:`Underline Ink`,tags:[`minimal`,`editorial`],state:{...T,skin:`underline`,radius:0,borderColor:`#52525b`}},{name:`Floating Email`,tags:[`form`,`floating`],state:{...T,skin:`floating`,label:`Email address`}},{name:`Neon Glow`,tags:[`glow`,`neon`],state:{...T,skin:`glow`,accent:`#22d3ee`,borderColor:`#164e63`}},{name:`Filled Soft`,tags:[`filled`,`soft`],state:{...T,skin:`filled`,bg:`#27272a`,borderColor:`#3f3f46`,radius:12}},{name:`Pill Search`,tags:[`search`],state:{...T,placeholder:`Search…`,radius:999,width:300,icon:`search`}},{name:`Light Outline`,tags:[`light`],state:{...T,bg:`#fafafa`,textColor:`#18181b`,borderColor:`#d4d4d8`}},{name:`Rose Focus`,tags:[`warm`],state:{...T,accent:`#f43f5e`,borderColor:`#52525b`}},{name:`Square Sharp`,tags:[`mono`],state:{...T,radius:0,width:300,borderColor:`#71717a`,skin:`filled`,bg:`#18181b`,placeholder:`v2.4.0`}},{name:`Violet Floating`,tags:[`floating`,`brand`],state:{...T,skin:`floating`,accent:`#8b5cf6`,label:`Username`,placeholder:` `}},{name:`Mail Outline`,tags:[`icon`,`email`],state:{...T,icon:`mail`,radius:12}},{name:`Search Underline`,tags:[`icon`,`minimal`],state:{...T,skin:`underline`,icon:`search`,width:300,placeholder:`Search docs…`,borderColor:`#52525b`}},{name:`User Field Error`,tags:[`icon`,`error`],state:{...T,icon:`user`,error:!0,label:`Email`,placeholder:`email@site.com`}},{name:`Error No Mail`,tags:[`error`,`form`],state:{...T,error:!0,borderColor:`#52525b`}},{name:`Password Pill`,tags:[`icon`,`lock`],state:{...T,icon:`lock`,radius:999,width:280,borderColor:`#3f3f46`,label:`Password`}}],N=[`innerHTML`],P=[`innerHTML`],F=n({__name:`input`,setup(n){let{state:b,randomize:O,reset:k,undo:F,redo:I,pushHistory:L,shareUrlRef:R}=_({id:`input`,defaultState:JSON.parse(JSON.stringify(T)),randomize:j}),z=r(`editor:shareUrl`,()=>{});s(()=>z(R.value));let B=o(null),V=i(()=>M.map(e=>e.state)),H=i(()=>B.value===null?b.value:V.value[B.value]),U=i(()=>E(H.value)),W=i(()=>D(H.value)),G=i(()=>A(H.value)),K=i(()=>`<style>${U.value}</style>`),q=i(()=>B.value===null?`Live state`:M[B.value].name);function J(e){B.value=null,b.value=JSON.parse(JSON.stringify(M[e].state)),L()}function Y(e){B.value=e}l(b,()=>{B.value=null},{deep:!0});let X=i(()=>M.map(e=>({name:e.name,css:E(e.state),html:D(e.state)})));return(n,r)=>{let i=g,o=f,s=v,l=S,_=p,T=y,E=h,D=x,A=m;return a(),u(A,{title:`Input Field Studio`,description:`Styled text inputs with focus states — pure CSS.`,css:d(U),html:d(W),vars:d(G),onRandomize:d(O),onReset:d(k),onUndo:d(F),onRedo:d(I)},{preview:c(()=>[e(o,{variants:d(X),"code-css":d(U),"code-html":d(W),"code-vars":d(G),"code-title":d(q),title:`Input preview`,filename:`css-studio-input`,onApplyVariant:Y},{presets:c(()=>[e(i,{presets:d(M),onApply:J},null,8,[`presets`])]),default:c(()=>[t(`div`,{innerHTML:d(K),"aria-hidden":`true`},null,8,N),t(`div`,{class:`flex h-full w-full items-center justify-center p-6`,innerHTML:d(W)},null,8,P)]),_:1},8,[`variants`,`code-css`,`code-html`,`code-vars`,`code-title`])]),controls:c(()=>[e(E,{label:`Field`,icon:`ph-textbox`},{default:c(()=>[e(s,{modelValue:d(b).skin,"onUpdate:modelValue":r[0]||=e=>d(b).skin=e,label:`Skin`,options:d(C)},null,8,[`modelValue`,`options`]),e(s,{modelValue:d(b).icon,"onUpdate:modelValue":r[1]||=e=>d(b).icon=e,label:`Leading icon`,options:d(w).map(e=>({value:e,label:e===`none`?`None`:e[0].toUpperCase()+e.slice(1)}))},null,8,[`modelValue`,`options`]),e(l,{modelValue:d(b).label,"onUpdate:modelValue":r[2]||=e=>d(b).label=e,label:`Label`,placeholder:`Label`},null,8,[`modelValue`]),e(l,{modelValue:d(b).placeholder,"onUpdate:modelValue":r[3]||=e=>d(b).placeholder=e,label:`Placeholder`,placeholder:`you@example.com`},null,8,[`modelValue`]),e(_,{modelValue:d(b).width,"onUpdate:modelValue":r[4]||=e=>d(b).width=e,label:`Width`,min:160,max:360,step:10,suffix:`px`},null,8,[`modelValue`]),e(_,{modelValue:d(b).fontSize,"onUpdate:modelValue":r[5]||=e=>d(b).fontSize=e,label:`Font size`,min:12,max:18,suffix:`px`},null,8,[`modelValue`]),e(_,{modelValue:d(b).radius,"onUpdate:modelValue":r[6]||=e=>d(b).radius=e,label:`Radius`,min:0,max:24,suffix:`px`},null,8,[`modelValue`]),e(T,{modelValue:d(b).underlineSweep,"onUpdate:modelValue":r[7]||=e=>d(b).underlineSweep=e,label:`Underline sweep on focus`,hint:d(b).skin===`underline`?`Underline skin only`:`Applies to underline skin`},null,8,[`modelValue`,`hint`]),e(T,{modelValue:d(b).error,"onUpdate:modelValue":r[8]||=e=>d(b).error=e,label:`Error state`,hint:`Uses :user-invalid — type invalid text to trigger`},null,8,[`modelValue`])]),_:1}),e(E,{label:`Colors`,icon:`ph-palette`},{default:c(()=>[e(D,{"model-value":d(b).accent,label:`Focus accent`,"onUpdate:modelValue":r[9]||=e=>d(b).accent=e},null,8,[`model-value`]),e(D,{"model-value":d(b).borderColor,label:`Border`,"onUpdate:modelValue":r[10]||=e=>d(b).borderColor=e},null,8,[`model-value`]),e(D,{"model-value":d(b).bg,label:`Background`,"onUpdate:modelValue":r[11]||=e=>d(b).bg=e},null,8,[`model-value`])]),_:1})]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{F as default};