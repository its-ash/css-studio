import{A as e,C as t,M as n,R as r,S as i,X as a,ct as o,lt as s,w as c,wt as l}from"./MitKKUeq.js";import{a as u,i as d,n as f,o as p,r as m,s as h,t as g}from"./DJLqZT_o.js";import{t as _}from"./D3e07OzS.js";import{t as v}from"./BYmGHvE7.js";var y=[{value:`raised`,label:`Raised Key`},{value:`flat`,label:`Flat`},{value:`outline`,label:`Outline`},{value:`dark`,label:`Dark Key`}],b={skin:`raised`,accent:`#10b981`,bg:`#27272a`,textColor:`#fafafa`,fontSize:13,radius:6,depth:3,chips:[`⌘`,`K`]};function x(e){return`${{raised:`.kbd {
  border: 1px solid ${e.textColor}22;
  border-bottom-width: ${e.depth+1}px;
  background: ${e.bg};
}`,flat:`.kbd {
  border: none;
  background: ${e.accent}1f;
  color: ${e.accent};
}`,outline:`.kbd {
  border: 1.5px solid ${e.textColor}44;
  background: transparent;
}`,dark:`.kbd {
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-bottom-width: ${e.depth+1}px;
  background: linear-gradient(180deg, #3f3f46, #27272a);
}`}[e.skin]}

.kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 26px;
  padding: 3px 7px;
  border-radius: ${e.radius}px;
  color: ${e.skin===`flat`?e.accent:e.textColor};
  font-family: ui-monospace, 'SF Mono', Menlo, monospace;
  font-size: ${e.fontSize}px;
  font-weight: 600;
  line-height: 1.2;
}

.kbd-row {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.kbd-plus {
  color: ${e.textColor}55;
  font-size: ${e.fontSize-1}px;
}

.code-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 2px 8px;
  border-radius: ${e.radius}px;
  background: ${e.accent}14;
  border: 1px solid ${e.accent}33;
  color: ${e.accent};
  font-family: ui-monospace, 'SF Mono', Menlo, monospace;
  font-size: ${e.fontSize}px;
}`}function S(e){return`<div class="kbd-row">
  ${e.chips.map(e=>`<span class="kbd">${e}</span>`).join(`<span class="kbd-plus">+</span>`)}
  <span class="code-chip">.hover-demo:hover</span>
</div>`}function C(e){return{"--kbd-accent":e.accent,"--kbd-bg":e.bg,"--kbd-fg":e.textColor}}function w(e,t){let n=y.map(e=>e.value),r=Math.floor(t.range(0,360));return{...e,skin:t.pick(n),accent:`hsl(${r} 78% 52%)`,bg:`hsl(${r} 10% 14%)`,radius:t.pick([0,4,6,8]),depth:t.pick([2,3,4]),fontSize:Math.round(t.range(11,15))}}var T=[{name:`Raised Keys`,tags:[`classic`],state:{...b}},{name:`Dark Keycap`,tags:[`dark`],state:{...b,skin:`dark`}},{name:`Flat Accent`,tags:[`flat`,`brand`],state:{...b,skin:`flat`,chips:[`⌘`,`K`]}},{name:`Outline Hint`,tags:[`minimal`],state:{...b,skin:`outline`,textColor:`#a1a1aa`}},{name:`Sharp Keys`,tags:[`mono`],state:{...b,radius:0,depth:4}},{name:`Emerald Chip`,tags:[`brand`],state:{...b,accent:`#10b981`,chips:[`Ctrl`,`S`]}},{name:`Light Keys`,tags:[`light`],state:{...b,bg:`#f4f4f5`,textColor:`#18181b`}},{name:`Violet Flat`,tags:[`brand`],state:{...b,skin:`flat`,accent:`#8b5cf6`,fontSize:12}}],E=[`innerHTML`],D={class:`flex h-full w-full max-w-2xl items-center justify-center p-6`},O=[`innerHTML`],k=n({__name:`kbd`,setup(n){let{state:k,randomize:A,reset:j,undo:M,redo:N,pushHistory:P,shareUrlRef:F}=g({id:`kbd`,defaultState:JSON.parse(JSON.stringify(b)),randomize:w}),I=r(`editor:shareUrl`,()=>{});o(()=>I(F.value));let L=i(()=>x(k.value)),R=i(()=>S(k.value)),z=i(()=>C(k.value)),B=i(()=>`<style>${L.value}</style>`);function V(e){k.value=JSON.parse(JSON.stringify(T[e].state)),P()}let H=i(()=>T.map(e=>({name:e.name,css:x(e.state),html:S(e.state)})));return(n,r)=>{let i=h,o=p,g=_,b=u,x=d,S=v,C=m,w=f;return a(),c(w,{title:`Kbd & Code Chips`,description:`Keyboard keycaps, shortcut rows and inline code chips.`,css:l(L),html:l(R),vars:l(z),onRandomize:l(A),onReset:l(j),onUndo:l(M),onRedo:l(N)},{preview:s(()=>[e(o,{variants:l(H),onApplyVariant:V,title:`Kbd preview`,filename:`css-studio-kbd`},{presets:s(()=>[e(i,{presets:l(T),onApply:V},null,8,[`presets`])]),default:s(()=>[t(`div`,{innerHTML:l(B),"aria-hidden":`true`},null,8,E),t(`div`,D,[t(`div`,{innerHTML:l(R)},null,8,O)])]),_:1},8,[`variants`])]),controls:s(()=>[e(x,{label:`Keys`,icon:`ph-keyboard`},{default:s(()=>[e(g,{modelValue:l(k).skin,"onUpdate:modelValue":r[0]||=e=>l(k).skin=e,label:`Skin`,options:l(y)},null,8,[`modelValue`,`options`]),e(b,{modelValue:l(k).fontSize,"onUpdate:modelValue":r[1]||=e=>l(k).fontSize=e,label:`Font size`,min:10,max:18,suffix:`px`},null,8,[`modelValue`]),e(b,{modelValue:l(k).radius,"onUpdate:modelValue":r[2]||=e=>l(k).radius=e,label:`Radius`,min:0,max:12,suffix:`px`},null,8,[`modelValue`]),e(b,{modelValue:l(k).depth,"onUpdate:modelValue":r[3]||=e=>l(k).depth=e,label:`Key depth`,min:1,max:6,suffix:`px`},null,8,[`modelValue`])]),_:1}),e(x,{label:`Colors`,icon:`ph-palette`},{default:s(()=>[e(S,{"model-value":l(k).accent,label:`Accent`,"onUpdate:modelValue":r[4]||=e=>l(k).accent=e},null,8,[`model-value`]),e(S,{"model-value":l(k).bg,label:`Key bg`,"onUpdate:modelValue":r[5]||=e=>l(k).bg=e},null,8,[`model-value`]),e(S,{"model-value":l(k).textColor,label:`Text`,"onUpdate:modelValue":r[6]||=e=>l(k).textColor=e},null,8,[`model-value`])]),_:1})]),code:s(()=>[e(C,{css:l(L),html:l(R),vars:l(z),filename:`css-studio-kbd`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{k as default};