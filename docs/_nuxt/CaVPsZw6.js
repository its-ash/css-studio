import{A as e,C as t,M as n,R as r,S as i,T as a,X as o,ct as s,lt as c,w as l,wt as u}from"./MitKKUeq.js";import{a as d,i as f,n as p,r as m,s as h,t as g}from"./BPBkcUFJ.js";import{t as _}from"./D3e07OzS.js";import{t as v}from"./Dh2B6pZ8.js";import{t as y}from"./BYmGHvE7.js";import{t as b}from"./Cw1rlFxN.js";var x=[{value:`stars`,label:`Stars`},{value:`hearts`,label:`Hearts`},{value:`bars`,label:`Progress Bars`}],S={skin:`stars`,stars:5,rating:4,accent:`#f59e0b`,emptyColor:`#3f3f46`,size:30,gap:4,hoverFill:!0,showValue:!0};function C(e){let t=Math.round(e.rating/e.stars*100);return e.skin===`bars`?`.rating-bars {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 260px;
}

.rating-bar-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.rating-bar-label {
  font-size: 11px;
  color: ${e.emptyColor};
  width: 28px;
  text-align: right;
}

.rating-bar-track {
  flex: 1;
  height: ${Math.max(6,Math.round(e.size/6))}px;
  border-radius: 999px;
  background: ${e.emptyColor}33;
  overflow: hidden;
}

.rating-bar-fill {
  height: 100%;
  border-radius: 999px;
  background: ${e.accent};
}

.rating-bar-count {
  font-size: 11px;
  color: ${e.emptyColor};
  width: 30px;
}`:(e.skin,`.rating {
  display: inline-flex;
  align-items: center;
  gap: ${e.gap}px;
  font-size: ${e.size}px;
  line-height: 1;
}

.rating-symbol {
  color: ${e.emptyColor};
  transition: color ${e.hoverFill?150:0}ms ease, transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

${e.hoverFill?`.rating:hover .rating-symbol {
  color: ${e.emptyColor};
}

.rating .rating-symbol:hover,
.rating .rating-symbol:hover ~ .rating-symbol {
  color: ${e.emptyColor};
}

.rating .rating-symbol:hover {
  transform: scale(1.2);
}

.rating-symbol.filled,
.rating .rating-symbol.hover-fill {
  color: ${e.accent};
}`:``}

.rating-symbol.filled {
  color: ${e.accent};
}

.rating-value {
  margin-left: 8px;
  font-size: ${Math.round(e.size/3)}px;
  font-weight: 700;
  color: ${e.accent};
}

/* partial fill via gradient text */
.rating-partial {
  background: linear-gradient(90deg, ${e.accent} ${t}%, ${e.emptyColor} ${t}%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}`)}function w(e){if(e.skin===`bars`)return`<div class="rating-bars">\n${[{label:`5★`,pct:62,count:`62`},{label:`4★`,pct:25,count:`25`},{label:`3★`,pct:8,count:`8`},{label:`2★`,pct:3,count:`3`},{label:`1★`,pct:2,count:`2`}].map(e=>`  <div class="rating-bar-row">\n    <span class="rating-bar-label">${e.label}</span>\n    <div class="rating-bar-track"><div class="rating-bar-fill" style="width: ${e.pct}%"></div></div>\n    <span class="rating-bar-count">${e.count}</span>\n  </div>`).join(`
`)}\n</div>`;let t=e.skin===`stars`?`★`:`♥`,n=Array.from({length:e.stars},(n,r)=>`  <span class="rating-symbol${r+1<=e.rating?` filled`:``}" aria-hidden="true">${t}</span>`).join(`
`),r=e.showValue?`\n  <span class="rating-value">${e.rating}/${e.stars}</span>`:``;return`<div class="rating" role="img" aria-label="Rated ${e.rating} out of ${e.stars}">\n${n}${r}\n</div>`}function T(e){return{"--rating-accent":e.accent,"--rating-empty":e.emptyColor,"--rating-value":String(e.rating)}}function E(e,t){let n=x.map(e=>e.value),r=Math.floor(t.range(0,360));return{...e,skin:t.pick(n),stars:t.pick([4,5,5,10]),rating:Math.round(t.range(2,5)),accent:`hsl(${r} 85% 55%)`,size:Math.round(t.range(22,40)),gap:Math.round(t.range(2,8)),hoverFill:t.chance(.6)}}var D=[{name:`Golden Stars`,tags:[`classic`],state:{...S}},{name:`Hearts Pink`,tags:[`warm`],state:{...S,skin:`hearts`,accent:`#f43f5e`,size:26}},{name:`Emerald Stars`,tags:[`brand`],state:{...S,accent:`#10b981`,rating:5}},{name:`Distribution Bars`,tags:[`stats`],state:{...S,skin:`bars`,accent:`#8b5cf6`,showValue:!1}},{name:`Tiny Inline`,tags:[`compact`],state:{...S,size:18,gap:2,rating:3}},{name:`Ten Stars`,tags:[`review`],state:{...S,stars:10,rating:7,size:20}},{name:`Neon Stars`,tags:[`neon`],state:{...S,accent:`#22d3ee`,emptyColor:`#164e63`,size:34,glow:!0}},{name:`Light Stars`,tags:[`light`],state:{...S,emptyColor:`#d4d4d8`,size:28}},{name:`No Value`,tags:[`minimal`],state:{...S,showValue:!1,hoverFill:!1}},{name:`Violet Hearts`,tags:[`brand`],state:{...S,skin:`hearts`,accent:`#8b5cf6`,rating:2,size:32}}],O=[`innerHTML`],k={class:`flex h-full w-full max-w-2xl items-center justify-center p-6`},A=[`innerHTML`],j=n({__name:`rating`,setup(n){let{state:j,randomize:M,reset:N,undo:P,redo:F,pushHistory:I,shareUrlRef:L}=g({id:`rating`,defaultState:JSON.parse(JSON.stringify(S)),randomize:E}),R=r(`editor:shareUrl`,()=>{});s(()=>R(L.value));let z=i(()=>C(j.value)),B=i(()=>w(j.value)),V=i(()=>T(j.value)),H=i(()=>`<style>${z.value}</style>`);function U(e){j.value=JSON.parse(JSON.stringify(D[e].state)),I()}let W=i(()=>D.map(e=>({name:e.name,css:C(e.state),html:w(e.state)})));return(n,r)=>{let i=h,s=d,g=_,S=f,C=v,w=m,T=y,E=b,I=p;return o(),l(I,{title:`Star Rating`,description:`Stars, hearts and distribution bars — pure CSS.`,css:u(z),html:u(B),vars:u(V),onRandomize:u(M),onReset:u(N),onUndo:u(P),onRedo:u(F)},{preview:c(()=>[e(s,{variants:u(W),onApplyVariant:U,title:`Rating preview`,filename:`css-studio-rating`},{presets:c(()=>[e(i,{presets:u(D),onApply:U},null,8,[`presets`])]),default:c(()=>[t(`div`,{innerHTML:u(H),"aria-hidden":`true`},null,8,O),t(`div`,k,[t(`div`,{innerHTML:u(B)},null,8,A)])]),_:1},8,[`variants`])]),controls:c(()=>[e(w,{label:`Rating`,icon:`ph-star`},{default:c(()=>[e(g,{modelValue:u(j).skin,"onUpdate:modelValue":r[0]||=e=>u(j).skin=e,label:`Skin`,options:u(x)},null,8,[`modelValue`,`options`]),u(j).skin===`bars`?a(``,!0):(o(),l(S,{key:0,modelValue:u(j).stars,"onUpdate:modelValue":r[1]||=e=>u(j).stars=e,label:`Symbols`,min:3,max:10},null,8,[`modelValue`])),u(j).skin===`bars`?a(``,!0):(o(),l(S,{key:1,modelValue:u(j).rating,"onUpdate:modelValue":r[2]||=e=>u(j).rating=e,label:`Rating`,min:0,max:10},null,8,[`modelValue`])),u(j).skin===`bars`?a(``,!0):(o(),l(S,{key:2,modelValue:u(j).size,"onUpdate:modelValue":r[3]||=e=>u(j).size=e,label:`Symbol size`,min:16,max:48,suffix:`px`},null,8,[`modelValue`])),u(j).skin===`bars`?a(``,!0):(o(),l(S,{key:3,modelValue:u(j).gap,"onUpdate:modelValue":r[4]||=e=>u(j).gap=e,label:`Gap`,min:0,max:12,suffix:`px`},null,8,[`modelValue`])),u(j).skin===`bars`?a(``,!0):(o(),l(C,{key:4,modelValue:u(j).hoverFill,"onUpdate:modelValue":r[5]||=e=>u(j).hoverFill=e,label:`Fill on hover`},null,8,[`modelValue`])),u(j).skin===`bars`?a(``,!0):(o(),l(C,{key:5,modelValue:u(j).showValue,"onUpdate:modelValue":r[6]||=e=>u(j).showValue=e,label:`Show value`},null,8,[`modelValue`]))]),_:1}),e(w,{label:`Colors`,icon:`ph-palette`},{default:c(()=>[e(T,{"model-value":u(j).accent,label:`Filled`,"onUpdate:modelValue":r[7]||=e=>u(j).accent=e},null,8,[`model-value`]),e(T,{"model-value":u(j).emptyColor,label:`Empty`,"onUpdate:modelValue":r[8]||=e=>u(j).emptyColor=e},null,8,[`model-value`])]),_:1})]),code:c(()=>[e(E,{css:u(z),html:u(B),vars:u(V),filename:`css-studio-rating`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{j as default};