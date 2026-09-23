import{A as e,C as t,E as n,Kt as r,M as i,R as a,S as o,T as s,X as c,_ as l,ct as u,k as d,lt as f,tt as p,w as m,wt as h}from"./C_OraKES.js";import{a as g,i as _}from"#entry";import{a as v,i as y,n as b,o as x,r as S,t as C}from"./B53n1bRJ.js";import{t as w}from"./ClNnhmls.js";import{t as T}from"./B-AWq6Bn.js";import{t as E}from"./m6s-MMH3.js";import{t as D}from"./C7qZUNCt.js";var O=[{value:`pill`,label:`Pill`},{value:`soft`,label:`Soft`},{value:`outline`,label:`Outline`},{value:`dot`,label:`Status Dot`},{value:`notification-dot`,label:`Notification Dot`},{value:`ribbon`,label:`Corner Ribbon`}],k={kind:`pill`,bg:`#10b981`,textColor:`#052e1a`,dotColor:`#f43f5e`,size:8,count:3,showCount:!0};function A(e){switch(e.kind){case`pill`:return`.badge {
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
}`}}function j(e){switch(e.kind){case`pill`:case`soft`:case`outline`:return`<span class="badge">New</span>`;case`dot`:return`<span class="badge">Online</span>`;case`notification-dot`:return`<span class="badge">
  <!-- icon or content -->
</span>`;case`ribbon`:return`<div class="badge-wrap">
  <!-- card content -->
  <span class="badge-ribbon">SALE</span>
</div>`}}function M(e){return{"--badge-bg":e.bg,"--badge-text":e.textColor,"--badge-dot":e.dotColor}}function N(e,t){let n=O.map(e=>e.value),r=Math.floor(t.range(0,360));return{...e,kind:t.pick(n),bg:`hsl(${r} 80% 50%)`,textColor:`hsl(${r} 80% 12%)`,dotColor:`hsl(${(r+150)%360} 85% 55%)`,count:t.int(1,99)}}var P=[{name:`Emerald Pill`,tags:[`brand`],state:{...k}},{name:`Soft Violet`,tags:[`soft`],state:{...k,kind:`soft`,bg:`#8b5cf6`}},{name:`Outline Sky`,tags:[`outline`],state:{...k,kind:`outline`,bg:`#0ea5e9`}},{name:`Online Status`,tags:[`dot`],state:{...k,kind:`dot`,dotColor:`#22c55e`,textColor:`#e4e4e7`}},{name:`Away Status`,tags:[`dot`],state:{...k,kind:`dot`,dotColor:`#f59e0b`,textColor:`#e4e4e7`}},{name:`Cart Count`,tags:[`notification-dot`],state:{...k,kind:`notification-dot`,dotColor:`#f43f5e`,count:5}},{name:`Sale Ribbon`,tags:[`ribbon`],state:{...k,kind:`ribbon`,bg:`#f43f5e`,textColor:`#ffffff`}},{name:`New Ribbon`,tags:[`ribbon`,`brand`],state:{...k,kind:`ribbon`,bg:`#10b981`,textColor:`#052e1a`}},{name:`Amber Soft`,tags:[`soft`,`warm`],state:{...k,kind:`soft`,bg:`#f59e0b`}}],F={class:`flex h-[420px] w-full max-w-3xl items-center justify-center p-6`},I={key:0,class:`badge`,"aria-label":`Badge preview`},L={key:1,class:`badge`,"aria-label":`Badge preview`},R={key:2,class:`badge`,"aria-label":`Badge preview`},z={key:3,class:`badge-wrap h-32 w-48 rounded-xl border border-line bg-panel`,"aria-label":`Badge preview`},B=i({__name:`badge`,setup(i){let{state:B,randomize:V,reset:H,undo:U,redo:W,pushHistory:G,shareUrlRef:K}=C({id:`badge`,defaultState:JSON.parse(JSON.stringify(k)),randomize:N}),q=a(`editor:shareUrl`,()=>{});u(()=>q(K.value));let J=o(()=>A(B.value)),Y=o(()=>j(B.value)),X=o(()=>M(B.value));function Z(e){B.value=JSON.parse(JSON.stringify(P[e].state)),G()}return g({title:`Badge - CSS Studio`}),(i,a)=>{let o=x,u=_,g=v,C=w,k=D,A=T,j=E,M=y,N=S,G=b;return c(),m(G,{title:`Badge Generator`,description:`Pill shapes, status dots, notification counts and corner ribbons.`,css:h(J),html:h(Y),vars:h(X),onRandomize:h(V),onReset:h(H),onUndo:h(U),onRedo:h(W)},{preview:f(()=>[e(g,{title:`Badge preview`,filename:`css-studio-badge`},{presets:f(()=>[e(o,{presets:h(P),onApply:Z},null,8,[`presets`])]),default:f(()=>[t(`div`,F,[(c(),m(p(`style`),null,{default:f(()=>[d(r(h(J)),1)]),_:1})),h(B).kind===`pill`||h(B).kind===`soft`||h(B).kind===`outline`?(c(),n(`span`,I,`New`)):h(B).kind===`dot`?(c(),n(`span`,L,`Online`)):h(B).kind===`notification-dot`?(c(),n(`span`,R,[e(u,{name:`ph-square`,size:40,class:`text-muted`})])):(c(),n(`div`,z,[...a[7]||=[t(`span`,{class:`badge-ribbon`},`SALE`,-1)]]))])]),_:1})]),controls:f(()=>[e(M,{label:`Badge`,icon:`ph-tag`},{default:f(()=>[e(C,{modelValue:h(B).kind,"onUpdate:modelValue":a[0]||=e=>h(B).kind=e,label:`Type`,options:h(O)},null,8,[`modelValue`,`options`]),h(B).kind===`pill`||h(B).kind===`soft`||h(B).kind===`outline`||h(B).kind===`ribbon`?(c(),m(k,{key:0,"model-value":h(B).bg,label:`Background`,"onUpdate:modelValue":a[1]||=e=>h(B).bg=e},null,8,[`model-value`])):s(``,!0),h(B).kind===`pill`||h(B).kind===`ribbon`||h(B).kind===`dot`?(c(),m(k,{key:1,"model-value":h(B).textColor,label:`Text color`,"onUpdate:modelValue":a[2]||=e=>h(B).textColor=e},null,8,[`model-value`])):s(``,!0),h(B).kind===`dot`||h(B).kind===`notification-dot`?(c(),m(k,{key:2,"model-value":h(B).dotColor,label:`Dot color`,"onUpdate:modelValue":a[3]||=e=>h(B).dotColor=e},null,8,[`model-value`])):s(``,!0),h(B).kind===`dot`||h(B).kind===`notification-dot`?(c(),m(A,{key:3,modelValue:h(B).size,"onUpdate:modelValue":a[4]||=e=>h(B).size=e,label:`Dot size`,min:4,max:16,suffix:`px`},null,8,[`modelValue`])):s(``,!0),h(B).kind===`notification-dot`?(c(),n(l,{key:4},[e(j,{modelValue:h(B).showCount,"onUpdate:modelValue":a[5]||=e=>h(B).showCount=e,label:`Show count`},null,8,[`modelValue`]),h(B).showCount?(c(),m(A,{key:0,modelValue:h(B).count,"onUpdate:modelValue":a[6]||=e=>h(B).count=e,label:`Count`,min:1,max:99},null,8,[`modelValue`])):s(``,!0)],64)):s(``,!0)]),_:1})]),code:f(()=>[e(N,{css:h(J),html:h(Y),vars:h(X),filename:`css-studio-badge`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{B as default};