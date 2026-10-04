import{A as e,C as t,M as n,R as r,S as i,X as a,ct as o,lt as s,w as c,wt as l}from"./MitKKUeq.js";import{a as u,i as d,l as f,o as p,s as m,t as h}from"./CJu4WcQG.js";import{t as g}from"./D3e07OzS.js";import{t as _}from"./Dh2B6pZ8.js";import{t as v}from"./BYmGHvE7.js";import{t as y}from"./o8u_Jv9o.js";import{t as b}from"./CcuAq1zZ.js";var x=[{value:`floating`,label:`Floating`},{value:`underline`,label:`Underline`},{value:`pill`,label:`Pill Active`},{value:`sidebar`,label:`Sidebar`}],S={skin:`floating`,accent:`#10b981`,bg:`#18181b`,textColor:`#fafafa`,items:4,radius:14,blur:!0,indicator:!0,logoText:`CSS Studio`},C=[`Home`,`Features`,`Pricing`,`About`,`Blog`,`Contact`];function w(e){let t=e.blur?`backdrop-filter: blur(12px);`:``,n={floating:`.navbar {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px;
  border-radius: ${e.radius}px;
  background: ${e.bg}${e.blur?`cc`:``};
  border: 1px solid ${e.textColor}14;
  ${t}
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
}`,underline:`.navbar {
  display: inline-flex;
  align-items: center;
  gap: 24px;
  padding: 0 8px;
  background: ${e.bg};
  border-bottom: 1px solid ${e.textColor}14;
}`,pill:`.navbar {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 5px;
  border-radius: 999px;
  background: ${e.bg};
  border: 1px solid ${e.textColor}14;
}`,sidebar:`.navbar {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 200px;
  padding: 10px;
  border-radius: ${e.radius}px;
  background: ${e.bg};
  border: 1px solid ${e.textColor}14;
}`},r=e.indicator?`.navbar-link.active {
  ${e.skin===`underline`?`box-shadow: inset 0 -2px 0 0 ${e.accent};`:``}
}`:``,i=e.skin===`pill`?`.navbar-link.active {
  background: ${e.accent};
  color: ${e.bg};
}`:`.navbar-link.active {
  color: ${e.accent};
}`;return`${n[e.skin]}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  font-weight: 700;
  font-size: 14px;
  color: ${e.textColor};
  text-decoration: none;
}

.navbar-logo::before {
  content: '';
  width: 18px;
  height: 18px;
  border-radius: 6px;
  background: linear-gradient(135deg, ${e.accent}, ${e.accent}88);
}

.navbar-link {
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 14px;
  border-radius: ${e.skin===`sidebar`?`8px`:e.skin===`pill`?`999px`:`${Math.max(6,e.radius-6)}px`};
  color: ${e.textColor}aa;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: color 160ms ease, background-color 160ms ease;
}

.navbar-link:hover {
  color: ${e.textColor};
  background: ${e.textColor}0d;
}

${i}

${r}`}function T(e){let t=C.slice(0,Math.max(2,Math.min(6,e.items))).map((e,t)=>`  <a class="navbar-link${t===0?` active`:``}" href="#">${e}</a>`).join(`
`);return`<nav class="navbar">
  <a class="navbar-logo" href="#">${e.logoText}</a>
${t}
</nav>`}function E(e){return{"--nav-accent":e.accent,"--nav-bg":e.bg,"--nav-radius":`${e.radius}px`}}function D(e,t){let n=x.map(e=>e.value),r=Math.floor(t.range(0,360));return{...e,skin:t.pick(n),accent:`hsl(${r} 78% 52%)`,bg:`hsl(${r} 10% 11%)`,items:Math.round(t.range(3,6)),radius:t.pick([0,8,14,20]),blur:t.chance(.6),indicator:t.chance(.5)}}var O=[{name:`Floating Glass`,tags:[`glass`,`brand`],state:{...S}},{name:`Underline Docs`,tags:[`docs`],state:{...S,skin:`underline`,radius:0,indicator:!0}},{name:`Pill Active`,tags:[`app`],state:{...S,skin:`pill`,accent:`#8b5cf6`,indicator:!1}},{name:`Sidebar Nav`,tags:[`sidebar`],state:{...S,skin:`sidebar`,accent:`#22d3ee`}},{name:`Sharp Corners`,tags:[`mono`],state:{...S,radius:0,accent:`#f59e0b`}},{name:`Solid (no blur)`,tags:[`solid`],state:{...S,blur:!1,accent:`#f43f5e`}},{name:`Light Glass`,tags:[`light`],state:{...S,bg:`#f4f4f5`,textColor:`#18181b`}},{name:`Big Menu`,tags:[`landing`],state:{...S,items:6,accent:`#0ea5e9`}}],k=[`innerHTML`],A={class:`flex h-full w-full max-w-3xl items-center justify-center p-6`},j=[`innerHTML`],M=n({__name:`navbar`,setup(n){let{state:C,randomize:M,reset:N,undo:P,redo:F,pushHistory:I,shareUrlRef:L}=h({id:`navbar`,defaultState:JSON.parse(JSON.stringify(S)),randomize:D}),R=r(`editor:shareUrl`,()=>{});o(()=>R(L.value));let z=i(()=>w(C.value)),B=i(()=>T(C.value)),V=i(()=>E(C.value)),H=i(()=>`<style>${z.value}</style>`);function U(e){C.value=JSON.parse(JSON.stringify(O[e].state)),I()}let W=i(()=>O.map(e=>({name:e.name,css:w(e.state),html:T(e.state)})));return(n,r)=>{let i=f,o=m,h=g,S=b,w=p,T=_,E=u,D=v,I=y,L=d;return a(),c(L,{title:`Navbar Builder`,description:`Floating, underline, pill and sidebar navigation.`,css:l(z),html:l(B),vars:l(V),onRandomize:l(M),onReset:l(N),onUndo:l(P),onRedo:l(F)},{preview:s(()=>[e(o,{variants:l(W),onApplyVariant:U,title:`Navbar preview`,filename:`css-studio-navbar`},{presets:s(()=>[e(i,{presets:l(O),onApply:U},null,8,[`presets`])]),default:s(()=>[t(`div`,{innerHTML:l(H),"aria-hidden":`true`},null,8,k),t(`div`,A,[t(`div`,{innerHTML:l(B)},null,8,j)])]),_:1},8,[`variants`])]),controls:s(()=>[e(E,{label:`Navbar`,icon:`ph-list-magnifying-glass`},{default:s(()=>[e(h,{modelValue:l(C).skin,"onUpdate:modelValue":r[0]||=e=>l(C).skin=e,label:`Skin`,options:l(x)},null,8,[`modelValue`,`options`]),e(S,{modelValue:l(C).logoText,"onUpdate:modelValue":r[1]||=e=>l(C).logoText=e,label:`Logo text`},null,8,[`modelValue`]),e(w,{modelValue:l(C).items,"onUpdate:modelValue":r[2]||=e=>l(C).items=e,label:`Links`,min:2,max:6},null,8,[`modelValue`]),e(w,{modelValue:l(C).radius,"onUpdate:modelValue":r[3]||=e=>l(C).radius=e,label:`Radius`,min:0,max:24,suffix:`px`},null,8,[`modelValue`]),e(T,{modelValue:l(C).blur,"onUpdate:modelValue":r[4]||=e=>l(C).blur=e,label:`Backdrop blur`},null,8,[`modelValue`]),e(T,{modelValue:l(C).indicator,"onUpdate:modelValue":r[5]||=e=>l(C).indicator=e,label:`Active underline`},null,8,[`modelValue`])]),_:1}),e(E,{label:`Colors`,icon:`ph-palette`},{default:s(()=>[e(D,{"model-value":l(C).accent,label:`Accent`,"onUpdate:modelValue":r[6]||=e=>l(C).accent=e},null,8,[`model-value`]),e(D,{"model-value":l(C).bg,label:`Background`,"onUpdate:modelValue":r[7]||=e=>l(C).bg=e},null,8,[`model-value`]),e(D,{"model-value":l(C).textColor,label:`Text`,"onUpdate:modelValue":r[8]||=e=>l(C).textColor=e},null,8,[`model-value`])]),_:1})]),code:s(()=>[e(I,{css:l(z),html:l(B),vars:l(V),filename:`css-studio-navbar`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{M as default};