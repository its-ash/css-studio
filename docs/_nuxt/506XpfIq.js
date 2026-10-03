import{A as e,C as t,E as n,Kt as r,M as i,R as a,S as o,T as s,X as c,_ as l,ct as u,k as d,lt as f,tt as p,w as m,wt as h}from"./MitKKUeq.js";import{s as g}from"#entry";import{a as _,i as v,n as y,r as b,s as x,t as S}from"./BPBkcUFJ.js";import{t as C}from"./D3e07OzS.js";import{t as w}from"./Dh2B6pZ8.js";import{t as T}from"./BYmGHvE7.js";import{t as E}from"./Cw1rlFxN.js";var D=[{value:`pill`,label:`Pill`},{value:`soft`,label:`Soft`},{value:`outline`,label:`Outline`},{value:`dot`,label:`Status Dot`},{value:`notification-dot`,label:`Notification Dot`},{value:`ribbon`,label:`Corner Ribbon`}],O={kind:`pill`,bg:`#10b981`,textColor:`#052e1a`,dotColor:`#f43f5e`,size:8,count:3,showCount:!0};function k(e){switch(e.kind){case`pill`:return`.badge {
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
}`}}function A(e){switch(e.kind){case`pill`:case`soft`:case`outline`:return`<span class="badge">New</span>`;case`dot`:return`<span class="badge">Online</span>`;case`notification-dot`:return`<span class="badge">
  <!-- icon or content -->
</span>`;case`ribbon`:return`<div class="badge-wrap">
  <!-- card content -->
  <span class="badge-ribbon">SALE</span>
</div>`}}function j(e){return{"--badge-bg":e.bg,"--badge-text":e.textColor,"--badge-dot":e.dotColor}}function M(e,t){let n=D.map(e=>e.value),r=Math.floor(t.range(0,360));return{...e,kind:t.pick(n),bg:`hsl(${r} 80% 50%)`,textColor:`hsl(${r} 80% 12%)`,dotColor:`hsl(${(r+150)%360} 85% 55%)`,count:t.int(1,99)}}var N=[{name:`Emerald Pill`,tags:[`brand`],state:{...O}},{name:`Soft Violet`,tags:[`soft`],state:{...O,kind:`soft`,bg:`#8b5cf6`}},{name:`Outline Sky`,tags:[`outline`],state:{...O,kind:`outline`,bg:`#0ea5e9`}},{name:`Online Status`,tags:[`dot`],state:{...O,kind:`dot`,dotColor:`#22c55e`,textColor:`#e4e4e7`}},{name:`Away Status`,tags:[`dot`],state:{...O,kind:`dot`,dotColor:`#f59e0b`,textColor:`#e4e4e7`}},{name:`Cart Count`,tags:[`notification-dot`],state:{...O,kind:`notification-dot`,dotColor:`#f43f5e`,count:5}},{name:`Sale Ribbon`,tags:[`ribbon`],state:{...O,kind:`ribbon`,bg:`#f43f5e`,textColor:`#ffffff`}},{name:`New Ribbon`,tags:[`ribbon`,`brand`],state:{...O,kind:`ribbon`,bg:`#10b981`,textColor:`#052e1a`}},{name:`Amber Soft`,tags:[`soft`,`warm`],state:{...O,kind:`soft`,bg:`#f59e0b`}}],P={class:`flex h-[420px] w-full max-w-3xl items-center justify-center p-6`},F={key:0,class:`badge`,"aria-label":`Badge preview`},I={key:1,class:`badge`,"aria-label":`Badge preview`},L={key:2,class:`badge`,"aria-label":`Badge preview`},R={key:3,class:`badge-wrap h-32 w-48 rounded-xl border border-line bg-panel`,"aria-label":`Badge preview`},z=i({__name:`badge`,setup(i){let{state:z,randomize:B,reset:V,undo:H,redo:U,pushHistory:W,shareUrlRef:G}=S({id:`badge`,defaultState:JSON.parse(JSON.stringify(O)),randomize:M}),K=a(`editor:shareUrl`,()=>{});u(()=>K(G.value));let q=o(()=>k(z.value)),J=o(()=>A(z.value)),Y=o(()=>j(z.value));function X(e){z.value=JSON.parse(JSON.stringify(N[e].state)),W()}let Z=o(()=>N.map(e=>({name:e.name,css:k(e.state),html:A(e.state)})));return(i,a)=>{let o=x,u=g,S=_,O=C,k=T,A=v,j=w,M=b,W=E,G=y;return c(),m(G,{title:`Badge Generator`,description:`Pill shapes, status dots, notification counts and corner ribbons.`,css:h(q),html:h(J),vars:h(Y),onRandomize:h(B),onReset:h(V),onUndo:h(H),onRedo:h(U)},{preview:f(()=>[e(S,{variants:h(Z),onApplyVariant:X,title:`Badge preview`,filename:`css-studio-badge`},{presets:f(()=>[e(o,{presets:h(N),onApply:X},null,8,[`presets`])]),default:f(()=>[t(`div`,P,[(c(),m(p(`style`),null,{default:f(()=>[d(r(h(q)),1)]),_:1})),h(z).kind===`pill`||h(z).kind===`soft`||h(z).kind===`outline`?(c(),n(`span`,F,`New`)):h(z).kind===`dot`?(c(),n(`span`,I,`Online`)):h(z).kind===`notification-dot`?(c(),n(`span`,L,[e(u,{name:`ph-square`,size:40,class:`text-muted`})])):(c(),n(`div`,R,[...a[7]||=[t(`span`,{class:`badge-ribbon`},`SALE`,-1)]]))])]),_:1},8,[`variants`])]),controls:f(()=>[e(M,{label:`Badge`,icon:`ph-tag`},{default:f(()=>[e(O,{modelValue:h(z).kind,"onUpdate:modelValue":a[0]||=e=>h(z).kind=e,label:`Type`,options:h(D)},null,8,[`modelValue`,`options`]),h(z).kind===`pill`||h(z).kind===`soft`||h(z).kind===`outline`||h(z).kind===`ribbon`?(c(),m(k,{key:0,"model-value":h(z).bg,label:`Background`,"onUpdate:modelValue":a[1]||=e=>h(z).bg=e},null,8,[`model-value`])):s(``,!0),h(z).kind===`pill`||h(z).kind===`ribbon`||h(z).kind===`dot`?(c(),m(k,{key:1,"model-value":h(z).textColor,label:`Text color`,"onUpdate:modelValue":a[2]||=e=>h(z).textColor=e},null,8,[`model-value`])):s(``,!0),h(z).kind===`dot`||h(z).kind===`notification-dot`?(c(),m(k,{key:2,"model-value":h(z).dotColor,label:`Dot color`,"onUpdate:modelValue":a[3]||=e=>h(z).dotColor=e},null,8,[`model-value`])):s(``,!0),h(z).kind===`dot`||h(z).kind===`notification-dot`?(c(),m(A,{key:3,modelValue:h(z).size,"onUpdate:modelValue":a[4]||=e=>h(z).size=e,label:`Dot size`,min:4,max:16,suffix:`px`},null,8,[`modelValue`])):s(``,!0),h(z).kind===`notification-dot`?(c(),n(l,{key:4},[e(j,{modelValue:h(z).showCount,"onUpdate:modelValue":a[5]||=e=>h(z).showCount=e,label:`Show count`},null,8,[`modelValue`]),h(z).showCount?(c(),m(A,{key:0,modelValue:h(z).count,"onUpdate:modelValue":a[6]||=e=>h(z).count=e,label:`Count`,min:1,max:99},null,8,[`modelValue`])):s(``,!0)],64)):s(``,!0)]),_:1})]),code:f(()=>[e(W,{css:h(q),html:h(J),vars:h(Y),filename:`css-studio-badge`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{z as default};