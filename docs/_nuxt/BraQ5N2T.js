import{A as e,F as t,G as n,H as r,I as i,L as a,Pt as o,R as s,U as c,Z as l,bt as u,ft as d,i as f,nn as p,r as m,st as h,yt as g,z as _}from"./nW5eDnH9.js";import{i as v}from"#entry";import{a as y,i as b,n as x,o as S,r as C,t as w}from"./Cvl3scWC.js";import{t as T}from"./Bxc0cDnT.js";import{t as E}from"./DgvkL9NY.js";import{t as D}from"./b7_yDY6p.js";import{t as O}from"./grKf0cqL.js";var k=[{value:`pill`,label:`Pill`},{value:`soft`,label:`Soft`},{value:`outline`,label:`Outline`},{value:`dot`,label:`Status Dot`},{value:`notification-dot`,label:`Notification Dot`},{value:`ribbon`,label:`Corner Ribbon`}],A={kind:`pill`,bg:`#10b981`,textColor:`#052e1a`,dotColor:`#f43f5e`,size:8,count:3,showCount:!0};function j(e){switch(e.kind){case`pill`:return`.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 999px;
  background: ${e.bg};
  color: ${e.textColor};
  font-size: 12px;
  font-weight: 600;
}`;case`soft`:return`.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 8px;
  background: ${e.bg}22;
  color: ${e.bg};
  font-size: 12px;
  font-weight: 600;
}`;case`outline`:return`.badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 11px;
  border-radius: 999px;
  border: 1.5px solid ${e.bg};
  color: ${e.bg};
  background: transparent;
  font-size: 12px;
  font-weight: 600;
}`;case`dot`:return`.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: ${e.textColor};
}

.badge::before {
  content: '';
  width: ${e.size}px;
  height: ${e.size}px;
  border-radius: 50%;
  background: ${e.dotColor};
}`;case`notification-dot`:return`.badge {
  position: relative;
  display: inline-block;
}

.badge::after {
  content: '${e.showCount?e.count:``}';
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: ${e.size*2}px;
  height: ${e.size*2}px;
  padding: 0 4px;
  border-radius: 999px;
  background: ${e.dotColor};
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-bg, #fff);
}`;case`ribbon`:return`.badge-wrap {
  position: relative;
  overflow: hidden;
}

.badge-ribbon {
  position: absolute;
  top: 12px;
  right: -32px;
  width: 120px;
  padding: 4px 0;
  background: ${e.bg};
  color: ${e.textColor};
  font-size: 11px;
  font-weight: 700;
  text-align: center;
  transform: rotate(45deg);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}`}}function M(e){switch(e.kind){case`pill`:case`soft`:case`outline`:return`<span class="badge">New</span>`;case`dot`:return`<span class="badge">Online</span>`;case`notification-dot`:return`<span class="badge">
  <!-- icon or content -->
</span>`;case`ribbon`:return`<div class="badge-wrap">
  <!-- card content -->
  <span class="badge-ribbon">SALE</span>
</div>`}}function N(e){return{"--badge-bg":e.bg,"--badge-text":e.textColor,"--badge-dot":e.dotColor}}function P(e,t){let n=k.map(e=>e.value),r=Math.floor(t.range(0,360));return{...e,kind:t.pick(n),bg:`hsl(${r} 80% 50%)`,textColor:`hsl(${r} 80% 12%)`,dotColor:`hsl(${(r+150)%360} 85% 55%)`,count:t.int(1,99)}}var F=[{name:`Emerald Pill`,tags:[`brand`],state:{...A}},{name:`Soft Violet`,tags:[`soft`],state:{...A,kind:`soft`,bg:`#8b5cf6`}},{name:`Outline Sky`,tags:[`outline`],state:{...A,kind:`outline`,bg:`#0ea5e9`}},{name:`Online Status`,tags:[`dot`],state:{...A,kind:`dot`,dotColor:`#22c55e`,textColor:`#e4e4e7`}},{name:`Away Status`,tags:[`dot`],state:{...A,kind:`dot`,dotColor:`#f59e0b`,textColor:`#e4e4e7`}},{name:`Cart Count`,tags:[`notification-dot`],state:{...A,kind:`notification-dot`,dotColor:`#f43f5e`,count:5}},{name:`Sale Ribbon`,tags:[`ribbon`],state:{...A,kind:`ribbon`,bg:`#f43f5e`,textColor:`#ffffff`}},{name:`New Ribbon`,tags:[`ribbon`,`brand`],state:{...A,kind:`ribbon`,bg:`#10b981`,textColor:`#052e1a`}},{name:`Amber Soft`,tags:[`soft`,`warm`],state:{...A,kind:`soft`,bg:`#f59e0b`}}],I={class:`flex h-[420px] w-full max-w-3xl items-center justify-center p-6`},L={key:0,class:`badge`,"aria-label":`Badge preview`},R={key:1,class:`badge`,"aria-label":`Badge preview`},z={key:2,class:`badge`,"aria-label":`Badge preview`},B={key:3,class:`badge-wrap h-32 w-48 rounded-xl border border-line bg-panel`,"aria-label":`Badge preview`},V=n({__name:`badge`,setup(n){let{state:V,randomize:H,reset:U,undo:W,redo:G,pushHistory:K,shareUrlRef:q}=w({id:`badge`,defaultState:JSON.parse(JSON.stringify(A)),randomize:P}),J=l(`editor:shareUrl`,()=>{});g(()=>J(q.value));let Y=t(()=>j(V.value)),X=t(()=>M(V.value)),Z=t(()=>N(V.value));function Q(e){V.value=JSON.parse(JSON.stringify(F[e].state)),K()}return f({title:`Badge - CSS Studio`,description:`Pill shapes, status dots, notification counts and corner ribbons.`,ogTitle:`Badge - CSS Studio`,ogDescription:`Pill shapes, status dots, notification counts and corner ribbons.`,ogUrl:`https://css-studio.itsash.in/badge`,twitterTitle:`Badge - CSS Studio`,twitterDescription:`Pill shapes, status dots, notification counts and corner ribbons.`}),m({link:[{rel:`canonical`,href:`https://css-studio.itsash.in/badge`}]}),(t,n)=>{let l=S,f=v,m=y,g=T,w=O,A=b,j=D,M=E,N=C,P=x;return h(),a(P,{title:`Badge Generator`,description:`Pill shapes, status dots, notification counts and corner ribbons.`,css:o(Y),html:o(X),vars:o(Z),onRandomize:o(H),onReset:o(U),onUndo:o(W),onRedo:o(G)},{preview:u(()=>[c(m,{title:`Badge preview`,filename:`css-studio-badge`},{presets:u(()=>[c(l,{presets:o(F),onApply:Q},null,8,[`presets`])]),default:u(()=>[i(`div`,I,[(h(),a(d(`style`),null,{default:u(()=>[r(p(o(Y)),1)]),_:1})),o(V).kind===`pill`||o(V).kind===`soft`||o(V).kind===`outline`?(h(),_(`span`,L,`New`)):o(V).kind===`dot`?(h(),_(`span`,R,`Online`)):o(V).kind===`notification-dot`?(h(),_(`span`,z,[c(f,{name:`ph-square`,size:40,class:`text-muted`})])):(h(),_(`div`,B,[...n[7]||=[i(`span`,{class:`badge-ribbon`},`SALE`,-1)]]))])]),_:1})]),controls:u(()=>[c(M,{label:`Badge`,icon:`ph-tag`},{default:u(()=>[c(g,{modelValue:o(V).kind,"onUpdate:modelValue":n[0]||=e=>o(V).kind=e,label:`Type`,options:o(k)},null,8,[`modelValue`,`options`]),o(V).kind===`pill`||o(V).kind===`soft`||o(V).kind===`outline`||o(V).kind===`ribbon`?(h(),a(w,{key:0,"model-value":o(V).bg,label:`Background`,"onUpdate:modelValue":n[1]||=e=>o(V).bg=e},null,8,[`model-value`])):s(``,!0),o(V).kind===`pill`||o(V).kind===`ribbon`||o(V).kind===`dot`?(h(),a(w,{key:1,"model-value":o(V).textColor,label:`Text color`,"onUpdate:modelValue":n[2]||=e=>o(V).textColor=e},null,8,[`model-value`])):s(``,!0),o(V).kind===`dot`||o(V).kind===`notification-dot`?(h(),a(w,{key:2,"model-value":o(V).dotColor,label:`Dot color`,"onUpdate:modelValue":n[3]||=e=>o(V).dotColor=e},null,8,[`model-value`])):s(``,!0),o(V).kind===`dot`||o(V).kind===`notification-dot`?(h(),a(A,{key:3,modelValue:o(V).size,"onUpdate:modelValue":n[4]||=e=>o(V).size=e,label:`Dot size`,min:4,max:16,suffix:`px`},null,8,[`modelValue`])):s(``,!0),o(V).kind===`notification-dot`?(h(),_(e,{key:4},[c(j,{modelValue:o(V).showCount,"onUpdate:modelValue":n[5]||=e=>o(V).showCount=e,label:`Show count`},null,8,[`modelValue`]),o(V).showCount?(h(),a(A,{key:0,modelValue:o(V).count,"onUpdate:modelValue":n[6]||=e=>o(V).count=e,label:`Count`,min:1,max:99},null,8,[`modelValue`])):s(``,!0)],64)):s(``,!0)]),_:1})]),code:u(()=>[c(N,{css:o(Y),html:o(X),vars:o(Z),filename:`css-studio-badge`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{V as default};