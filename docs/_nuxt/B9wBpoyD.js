import{A as e,C as t,M as n,R as r,S as i,T as a,X as o,ct as s,lt as c,w as l,wt as u}from"./MitKKUeq.js";import{a as d,i as f,l as p,o as m,s as h,t as g}from"./CJu4WcQG.js";import{t as _}from"./D3e07OzS.js";import{t as v}from"./Dh2B6pZ8.js";import{l as y,s as b}from"./Rl_HAT4u.js";import{t as x}from"./BYmGHvE7.js";import{t as S}from"./o8u_Jv9o.js";import{i as C}from"./tf7vSe8Z.js";var w=[{value:`grain`,label:`Fine grain`},{value:`film`,label:`Film grain`},{value:`static`,label:`TV static`},{value:`halftone`,label:`Halftone`},{value:`paper`,label:`Paper fibre`},{value:`scanlines`,label:`CRT scanlines`}],T=[{value:`gradient`,label:`Gradient`},{value:`solid`,label:`Solid`},{value:`photo`,label:`Photo`}],E=[{value:`overlay`,label:`Overlay`},{value:`soft-light`,label:`Soft light`},{value:`normal`,label:`Normal`},{value:`multiply`,label:`Multiply`},{value:`screen`,label:`Screen`}],D={kind:`grain`,backdrop:`gradient`,baseColor:`#0f766e`,baseColor2:`#1e1b4b`,noiseColor:`#ffffff`,opacity:35,size:1,blend:`overlay`,animate:!1,content:!0},O=(e,t,n)=>t.some(t=>t.value===e)?e:n;function k(e){let t=e.kind,n=t===`fine`?`grain`:t===`coarse`?`film`:e.kind;return{...D,...e,kind:O(n,w,`grain`),backdrop:O(e.backdrop,T,`gradient`),blend:O(e.blend,E,`overlay`),size:Math.min(4,Math.max(.5,Number(e.size)||1))}}var A=e=>`${+e.toFixed(2)}px`;function j(e,t,n){let r=[3,5,7,11,13],i=[`23% 31%`,`71% 77%`,`41% 63%`,`87% 13%`,`9% 89%`];return{image:r.map((r,a)=>`radial-gradient(circle at ${i[a]}, ${a%2?t:e} ${A(.55*n)}, transparent ${A(.95*n)})`),size:r.map(e=>`${A(e*n)} ${A(e*n)}`)}}function M(e){return e.backdrop===`solid`?`background: ${e.baseColor};`:e.backdrop===`photo`?`background: ${e.baseColor} url('${C(`valley`,1200,800)}') center / cover;`:`background: linear-gradient(135deg, ${e.baseColor}, ${e.baseColor2});`}function N(e){let t=e.size,n=e.noiseColor,r=y(n,`#000000`,`#ffffff`),i=j(n,r,t);switch(e.kind){case`film`:{let e=j(n,r,t*1.8);return{image:[...i.image,...e.image.slice(0,3)].join(`,
    `),size:[...i.size,...e.size.slice(0,3)].join(`, `),extra:``}}case`static`:return{image:i.image.join(`,
    `),size:i.size.join(`, `),extra:``};case`halftone`:return{image:`radial-gradient(circle, ${n} ${A(1.6*t)}, transparent ${A(2*t)})`,size:`${A(6*t)} ${A(6*t)}`,extra:`
  -webkit-mask-image: linear-gradient(135deg, #000 10%, transparent 85%);
  mask-image: linear-gradient(135deg, #000 10%, transparent 85%);`};case`paper`:return{image:[`repeating-linear-gradient(37deg, ${n} 0 ${A(.6)}, transparent ${A(.6)} ${A(9*t)})`,`repeating-linear-gradient(-53deg, ${r} 0 ${A(.5)}, transparent ${A(.5)} ${A(7*t)})`,...i.image.slice(0,3)].join(`,
    `),size:[`auto`,`auto`,...i.size.slice(0,3)].join(`, `),extra:``};case`scanlines`:return{image:[`repeating-linear-gradient(0deg, ${r} 0 ${A(1)}, transparent ${A(1)} ${A(3*t)})`,...i.image.slice(0,3)].join(`,
    `),size:[`auto`,...i.size.slice(0,3)].join(`, `),extra:``};default:return{image:i.image.join(`,
    `),size:i.size.join(`, `),extra:``}}}function P(e){let t=k(e),n=N(t),r=t.backdrop===`photo`?`#ffffff`:y(t.baseColor),i=t.animate||t.kind===`static`,a=t.kind===`static`?`0.35s steps(5)`:`0.9s steps(6)`,o=i?`
  animation: noise-shift ${a} infinite;`:``;return`.noise-surface {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: grid;
  align-content: end;
  gap: 0.5rem;
  width: 100%;
  min-height: 20rem;
  padding: 2.5rem;
  border-radius: 20px;
  ${M(t)}
  color: ${r};
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
}

.noise-surface::after {
  content: '';
  position: absolute;
  inset: ${i?`-20%`:`0`};
  z-index: -1;
  pointer-events: none;
  background-image:
    ${n.image};
  background-size: ${n.size};
  opacity: ${(t.opacity/100).toFixed(2)};
  mix-blend-mode: ${t.blend};${n.extra}${o}
}

.noise-surface > * {
  margin: 0;
}

.noise-eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.8;
}

.noise-title {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.03em;
}
${i?`
@keyframes noise-shift {
  0% { transform: translate(0, 0); }
  20% { transform: translate(-3%, 2%); }
  40% { transform: translate(2%, -3%); }
  60% { transform: translate(-2%, -1%); }
  80% { transform: translate(3%, 3%); }
  100% { transform: translate(0, 0); }
}

@media (prefers-reduced-motion: reduce) {
  .noise-surface::after { animation: none; }
}
`:``}`.trim()}function F(e){return k(e).content?`<section class="noise-surface">
  <p class="noise-eyebrow">Field notes · Issue 07</p>
  <h2 class="noise-title">Texture makes flat colour feel printed.</h2>
</section>`:`<section class="noise-surface" aria-hidden="true"></section>`}function I(e){let t=k(e);return{"--noise-base":t.baseColor,"--noise-color":t.noiseColor,"--noise-opacity":`${t.opacity}%`}}function L(e,t){let n=Math.round(t.range(0,360));return{...k(e),kind:t.pick(w.map(e=>e.value)),backdrop:t.pick([`gradient`,`gradient`,`solid`,`photo`]),baseColor:b({h:n,s:60,l:t.range(22,45)}),baseColor2:b({h:(n+t.pick([40,90,180]))%360,s:55,l:t.range(12,30)}),opacity:Math.round(t.range(20,55)),size:t.pick([.75,1,1.25,1.5,2]),blend:t.pick([`overlay`,`soft-light`,`normal`]),animate:t.chance(.25)}}var R=e=>({...D,...e}),z=[{name:`Teal Grain`,tags:[`gradient`],state:R({})},{name:`Subtle Dark`,tags:[`dark`,`minimal`],state:R({backdrop:`solid`,baseColor:`#111113`,opacity:18,blend:`normal`})},{name:`Film Grain`,tags:[`retro`],state:R({kind:`film`,baseColor:`#7c2d12`,baseColor2:`#1c1917`,opacity:45,animate:!0})},{name:`TV Static`,tags:[`animated`],state:R({kind:`static`,backdrop:`solid`,baseColor:`#27272a`,opacity:60,blend:`normal`,size:1.25})},{name:`Photo Grain`,tags:[`photo`],state:R({backdrop:`photo`,kind:`film`,opacity:40})},{name:`Risograph`,tags:[`print`],state:R({kind:`halftone`,backdrop:`solid`,baseColor:`#f472b6`,noiseColor:`#1e3a8a`,opacity:70,blend:`multiply`,size:1.5})},{name:`Print Halftone`,tags:[`print`,`light`],state:R({kind:`halftone`,backdrop:`solid`,baseColor:`#f4f4f5`,noiseColor:`#18181b`,opacity:55,blend:`normal`})},{name:`Recycled Paper`,tags:[`light`],state:R({kind:`paper`,backdrop:`solid`,baseColor:`#efe9dd`,noiseColor:`#78716c`,opacity:30,blend:`multiply`})},{name:`Kraft`,tags:[`warm`],state:R({kind:`paper`,backdrop:`solid`,baseColor:`#b88a5a`,noiseColor:`#3f2a14`,opacity:35,blend:`multiply`})},{name:`CRT Monitor`,tags:[`retro`],state:R({kind:`scanlines`,backdrop:`solid`,baseColor:`#052e16`,noiseColor:`#4ade80`,opacity:40,blend:`screen`,animate:!0})},{name:`Synthwave`,tags:[`gradient`],state:R({kind:`scanlines`,baseColor:`#db2777`,baseColor2:`#312e81`,opacity:30})},{name:`Sunset Grain`,tags:[`gradient`,`warm`],state:R({baseColor:`#f97316`,baseColor2:`#9d174d`,opacity:40,size:1.25})},{name:`Mint Soft`,tags:[`gradient`,`light`],state:R({baseColor:`#a7f3d0`,baseColor2:`#bae6fd`,noiseColor:`#0f172a`,opacity:25,blend:`soft-light`})},{name:`Heavy Grain`,tags:[`bold`],state:R({kind:`film`,baseColor:`#4338ca`,baseColor2:`#0f172a`,opacity:65,size:2})},{name:`Texture Only`,tags:[`overlay`],state:R({content:!1,backdrop:`solid`,baseColor:`#18181b`,opacity:30,blend:`normal`})}],B=[`innerHTML`],V={class:`flex h-full w-full items-center justify-center p-6`},H=[`innerHTML`],U=n({__name:`noise`,setup(n){let{state:y,randomize:b,reset:C,undo:O,redo:A,pushHistory:j,shareUrlRef:M}=g({id:`noise`,defaultState:JSON.parse(JSON.stringify(D)),randomize:L,deserialize:e=>k(e)}),N=r(`editor:shareUrl`,()=>{});s(()=>N(M.value));let R=i(()=>P(y.value)),U=i(()=>F(y.value)),W=i(()=>I(y.value)),G=i(()=>`<style>${R.value}</style>`);function K(e){y.value=JSON.parse(JSON.stringify(z[e].state)),j()}let q=i(()=>z.map(e=>({name:e.name,css:P(e.state),html:F(e.state)})));return(n,r)=>{let i=p,s=h,g=_,D=m,k=x,j=v,M=d,N=S,P=f;return o(),l(P,{title:`Noise & Grain Generator`,description:`Pure-CSS grain, film, static, halftone, paper and scanline texture overlays.`,css:u(R),html:u(U),vars:u(W),onRandomize:u(b),onReset:u(C),onUndo:u(O),onRedo:u(A)},{preview:c(()=>[e(s,{variants:u(q),title:`Noise preview`,filename:`css-studio-noise`,onApplyVariant:K},{presets:c(()=>[e(i,{presets:u(z),onApply:K},null,8,[`presets`])]),default:c(()=>[t(`div`,{innerHTML:u(G),"aria-hidden":`true`},null,8,B),t(`div`,V,[t(`div`,{class:`w-full max-w-2xl`,innerHTML:u(U)},null,8,H)])]),_:1},8,[`variants`])]),controls:c(()=>[e(M,{label:`Texture`,icon:`ph-dots-nine`},{default:c(()=>[e(g,{modelValue:u(y).kind,"onUpdate:modelValue":r[0]||=e=>u(y).kind=e,label:`Type`,options:u(w)},null,8,[`modelValue`,`options`]),e(D,{modelValue:u(y).opacity,"onUpdate:modelValue":r[1]||=e=>u(y).opacity=e,label:`Strength`,min:5,max:100,suffix:`%`},null,8,[`modelValue`]),e(D,{modelValue:u(y).size,"onUpdate:modelValue":r[2]||=e=>u(y).size=e,label:`Grain size`,min:.5,max:4,step:.25,suffix:`x`},null,8,[`modelValue`]),e(g,{modelValue:u(y).blend,"onUpdate:modelValue":r[3]||=e=>u(y).blend=e,label:`Blend mode`,options:u(E)},null,8,[`modelValue`,`options`]),e(k,{"model-value":u(y).noiseColor,label:`Grain color`,"onUpdate:modelValue":r[4]||=e=>u(y).noiseColor=e},null,8,[`model-value`]),e(j,{modelValue:u(y).animate,"onUpdate:modelValue":r[5]||=e=>u(y).animate=e,label:`Animate grain`,hint:u(y).kind===`static`?`Static always moves`:void 0},null,8,[`modelValue`,`hint`])]),_:1}),e(M,{label:`Backdrop`,icon:`ph-layout`},{default:c(()=>[e(g,{modelValue:u(y).backdrop,"onUpdate:modelValue":r[6]||=e=>u(y).backdrop=e,label:`Backdrop`,options:u(T)},null,8,[`modelValue`,`options`]),e(k,{"model-value":u(y).baseColor,label:`Color 1`,"onUpdate:modelValue":r[7]||=e=>u(y).baseColor=e},null,8,[`model-value`]),u(y).backdrop===`gradient`?(o(),l(k,{key:0,"model-value":u(y).baseColor2,label:`Color 2`,"onUpdate:modelValue":r[8]||=e=>u(y).baseColor2=e},null,8,[`model-value`])):a(``,!0),e(j,{modelValue:u(y).content,"onUpdate:modelValue":r[9]||=e=>u(y).content=e,label:`Sample headline`},null,8,[`modelValue`])]),_:1})]),code:c(()=>[e(N,{css:u(R),html:u(U),vars:u(W),filename:`css-studio-noise`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{U as default};