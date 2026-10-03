import{A as e,C as t,E as n,Gt as r,M as i,R as a,S as o,T as s,X as c,_ as l,ct as u,lt as d,st as f,w as p,wt as m}from"./MitKKUeq.js";import{a as h,i as g,n as _,r as v,s as y,t as b}from"./BPBkcUFJ.js";import{t as x}from"./D3e07OzS.js";import{t as S}from"./Dh2B6pZ8.js";import{c as C,l as w,s as T}from"./Rl_HAT4u.js";import{t as E}from"./BYmGHvE7.js";import{t as D}from"./Cw1rlFxN.js";var O=[{value:`flat`,label:`Flat`},{value:`concave`,label:`Concave`},{value:`convex`,label:`Convex`},{value:`pressed`,label:`Pressed (inset)`}],k=[{value:`thermostat`,label:`Thermostat card`},{value:`buttons`,label:`Button row`},{value:`knob`,label:`Dial knob`},{value:`tile`,label:`Single tile`}],A={base:`#e4e7ee`,accent:`#10b981`,shape:`flat`,layout:`thermostat`,angle:315,distance:12,blur:28,radius:28,intensity:18,autoShades:!0,light:`#ffffff`,dark:`#c3c8d4`,width:280,height:280},j=/^#[0-9a-f]{6}$/i;function M(e){let t=e,n={...A,...e};return O.some(e=>e.value===n.shape)||(n.shape=t.inset?`pressed`:`flat`),k.some(e=>e.value===n.layout)||(n.layout=`thermostat`),j.test(n.base)||(n.base=A.base),e.autoShades===void 0&&t.light&&(n.autoShades=!1),n}function N(e){if(!e.autoShades&&j.test(e.light)&&j.test(e.dark))return{light:e.light,dark:e.dark};let t=e.intensity/100,n=w(e.base)!==`#18181b`;return{light:C(e.base,`#ffffff`,n?t*.22:Math.min(.9,t*3)),dark:C(e.base,`#000000`,n?Math.min(.85,t*1.6):t)}}function P(e,t){let n=e*Math.PI/180;return{x:Math.round(Math.sin(n)*t),y:Math.round(-Math.cos(n)*t)}}function F(e,t,n,r){let{light:i,dark:a}=N(e),o=P(e.angle,t),s=r?`inset `:``;return r?`${s}${-o.x}px ${-o.y}px ${n}px ${a}, ${s}${o.x}px ${o.y}px ${n}px ${i}`:`${-o.x}px ${-o.y}px ${n}px ${a}, ${o.x}px ${o.y}px ${n}px ${i}`}function I(e){let t=C(e.base,`#ffffff`,.06),n=C(e.base,`#000000`,.05);return e.shape===`concave`?`linear-gradient(${e.angle}deg, ${t}, ${n})`:e.shape===`convex`?`linear-gradient(${e.angle}deg, ${n}, ${t})`:e.base}function L(e){let t=M(e),n=w(t.base,`#3f4656`,`#e8eaf0`),r=C(n,t.base,.4),i=t.shape===`pressed`,a=Math.max(3,Math.round(t.distance/2.2)),o=Math.max(6,Math.round(t.blur/2.2)),s=Math.min(t.radius,999),c={thermostat:`.neu-card {
  display: grid;
  gap: 1.25rem;
  width: ${t.width}px;
  max-width: 100%;
  padding: 1.75rem;
}

.neu-label {
  margin: 0;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${r};
}

.neu-value {
  margin: 0;
  font-size: 3rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.03em;
}

.neu-row {
  display: flex;
  gap: 0.75rem;
}`,buttons:`.neu-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.25rem;
}`,knob:`.neu-knob {
  position: relative;
  display: grid;
  place-items: center;
  width: ${Math.min(t.width,260)}px;
  aspect-ratio: 1;
  border-radius: 50%;
}

.neu-knob-cap {
  display: grid;
  place-items: center;
  width: 62%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: ${t.base};
  box-shadow: ${F(t,a,o,!0)};
  font-size: 1.75rem;
  font-weight: 600;
}

.neu-knob::after {
  content: '';
  position: absolute;
  top: 9%;
  left: 50%;
  width: 6px;
  height: 6px;
  margin-left: -3px;
  border-radius: 50%;
  background: ${t.accent};
  box-shadow: 0 0 8px ${t.accent};
}`,tile:`.neu-tile {
  display: grid;
  place-items: center;
  width: ${t.width}px;
  height: ${t.height}px;
  max-width: 100%;
}`};return`.neu-surface {
  display: grid;
  place-items: center;
  gap: 2rem;
  padding: 3.5rem 2.5rem;
  border-radius: 24px;
  background: ${t.base};
  color: ${n};
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
}

.neu {
  border: 0;
  border-radius: ${s}px;
  background: ${I(t)};
  box-shadow: ${F(t,t.distance,t.blur,i)};
  color: inherit;
}

${c[t.layout]}

.neu-btn {
  display: inline-grid;
  place-items: center;
  min-width: 3.25rem;
  height: 3.25rem;
  padding: 0 1.1rem;
  border-radius: ${Math.min(s,18)}px;
  background: ${t.base};
  box-shadow: ${F(t,a,o,!1)};
  color: inherit;
  font: inherit;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  transition: box-shadow 160ms ease-out, color 160ms ease-out;
}

.neu-btn:active,
.neu-btn[aria-pressed='true'] {
  box-shadow: ${F(t,a,o,!0)};
  color: ${t.accent};
}

.neu-btn:focus-visible {
  outline: 2px solid ${t.accent};
  outline-offset: 3px;
}

@media (prefers-contrast: more) {
  .neu,
  .neu-btn {
    box-shadow: none;
    outline: 1px solid ${r};
  }
}`}function R(e){return`<div class="neu-surface">\n${{thermostat:`  <div class="neu neu-card">
    <p class="neu-label">Living room</p>
    <p class="neu-value">21.5&deg;</p>
    <div class="neu-row">
      <button class="neu-btn" type="button" aria-label="Lower temperature">&minus;</button>
      <button class="neu-btn" type="button" aria-pressed="true">Auto</button>
      <button class="neu-btn" type="button" aria-label="Raise temperature">+</button>
    </div>
  </div>`,buttons:`  <div class="neu-row">
    <button class="neu-btn" type="button">Previous</button>
    <button class="neu-btn" type="button" aria-pressed="true">Play</button>
    <button class="neu-btn" type="button">Next</button>
  </div>`,knob:`  <div class="neu neu-knob" role="img" aria-label="Volume dial at 68 percent">
    <span class="neu-knob-cap">68</span>
  </div>`,tile:`  <div class="neu neu-tile"></div>`}[M(e).layout]}\n</div>`}function z(e){let t=M(e),{light:n,dark:r}=N(t);return{"--neu-base":t.base,"--neu-light":n,"--neu-dark":r,"--neu-distance":`${t.distance}px`,"--neu-blur":`${t.blur}px`,"--neu-radius":`${t.radius}px`}}function B(e,t){let n=t.chance(.3),r=Math.round(t.range(0,360));return{...M(e),base:T({h:r,s:t.range(6,22),l:n?t.range(12,18):t.range(84,92)}),accent:T({h:(r+150)%360,s:70,l:50}),shape:t.pick(O.map(e=>e.value)),angle:t.pick([315,315,45,225,135]),distance:Math.round(t.range(8,18)),blur:Math.round(t.range(18,40)),radius:t.pick([16,24,28,36]),intensity:Math.round(n?t.range(30,45):t.range(12,22)),autoShades:!0}}var V=e=>({...A,...e}),H=[{name:`Classic Soft`,tags:[`light`],state:V({})},{name:`Concave Card`,tags:[`light`],state:V({shape:`concave`})},{name:`Convex Card`,tags:[`light`],state:V({shape:`convex`,accent:`#6366f1`})},{name:`Pressed Well`,tags:[`inset`],state:V({shape:`pressed`,distance:8,blur:18})},{name:`Media Controls`,tags:[`buttons`],state:V({layout:`buttons`,accent:`#f43f5e`})},{name:`Volume Dial`,tags:[`knob`],state:V({layout:`knob`,shape:`convex`,radius:999})},{name:`Dark Slate`,tags:[`dark`],state:V({base:`#2b2e36`,intensity:40,accent:`#34d399`})},{name:`Dark Dial`,tags:[`dark`,`knob`],state:V({base:`#1f2128`,intensity:42,layout:`knob`,shape:`concave`,accent:`#f59e0b`})},{name:`Dark Buttons`,tags:[`dark`,`buttons`],state:V({base:`#24262d`,intensity:40,layout:`buttons`,accent:`#38bdf8`})},{name:`Warm Sand`,tags:[`warm`],state:V({base:`#e9e1d4`,accent:`#c2410c`,radius:36})},{name:`Mint Pad`,tags:[`cool`],state:V({base:`#d8eadf`,accent:`#059669`,shape:`concave`})},{name:`Rose Clay`,tags:[`warm`],state:V({base:`#f1dada`,accent:`#be123c`,layout:`buttons`})},{name:`Ocean Foam`,tags:[`cool`],state:V({base:`#d7e6ef`,accent:`#0369a1`,layout:`knob`,shape:`convex`})},{name:`Lavender`,tags:[`cool`],state:V({base:`#e3e0f0`,accent:`#7c3aed`,shape:`convex`})},{name:`Floating Orb`,tags:[`tile`],state:V({base:`#d6e4ee`,layout:`tile`,radius:999,width:220,height:220,distance:20,blur:50,shape:`convex`})},{name:`Soft Square`,tags:[`tile`],state:V({layout:`tile`,radius:32,width:220,height:220,shape:`concave`})},{name:`Deep Press`,tags:[`tile`,`inset`],state:V({base:`#e8e6e0`,layout:`tile`,shape:`pressed`,radius:40,width:240,height:240,distance:14,blur:36})},{name:`Bottom Light`,tags:[`angle`],state:V({angle:135,accent:`#0ea5e9`})}],U=[`innerHTML`],W=[`innerHTML`],G=i({__name:`neumorphism`,setup(i){let{state:C,randomize:w,reset:T,undo:j,redo:P,pushHistory:F,shareUrlRef:I}=b({id:`neumorphism`,defaultState:JSON.parse(JSON.stringify(A)),randomize:B,deserialize:e=>M(e)}),V=a(`editor:shareUrl`,()=>{});u(()=>V(I.value));let G=o(()=>L(C.value)),K=o(()=>R(C.value)),q=o(()=>z(C.value)),J=o(()=>`<style>${G.value}</style>`),Y=o(()=>N(M(C.value)));f(()=>C.value.autoShades,e=>{e||(C.value={...C.value,...Y.value})});function X(e){C.value=JSON.parse(JSON.stringify(H[e].state)),F()}let Z=o(()=>H.map(e=>({name:e.name,css:L(e.state),html:R(e.state)})));return(i,a)=>{let o=y,u=h,f=x,b=g,A=v,M=E,N=S,F=D,I=_;return c(),p(I,{title:`Neumorphism Generator`,description:`Soft-UI surfaces with flat, concave, convex and pressed shapes lit from one light source.`,css:m(G),html:m(K),vars:m(q),onRandomize:m(w),onReset:m(T),onUndo:m(j),onRedo:m(P)},{preview:d(()=>[e(u,{variants:m(Z),title:`Neumorphism preview`,filename:`css-studio-neumorphism`,onApplyVariant:X},{presets:d(()=>[e(o,{presets:m(H),onApply:X},null,8,[`presets`])]),default:d(()=>[t(`div`,{innerHTML:m(J),"aria-hidden":`true`},null,8,U),t(`div`,{class:`flex h-full w-full items-center justify-center p-6`,style:r({background:m(C).base})},[t(`div`,{class:`w-full max-w-xl`,innerHTML:m(K)},null,8,W)],4)]),_:1},8,[`variants`])]),controls:d(()=>[e(A,{label:`Shape`,icon:`ph-circle-dashed`},{default:d(()=>[e(f,{modelValue:m(C).layout,"onUpdate:modelValue":a[0]||=e=>m(C).layout=e,label:`Demo layout`,options:m(k)},null,8,[`modelValue`,`options`]),e(f,{modelValue:m(C).shape,"onUpdate:modelValue":a[1]||=e=>m(C).shape=e,label:`Surface shape`,options:m(O)},null,8,[`modelValue`,`options`]),e(b,{modelValue:m(C).radius,"onUpdate:modelValue":a[2]||=e=>m(C).radius=e,label:`Corner radius`,min:0,max:80,suffix:`px`},null,8,[`modelValue`]),m(C).layout===`tile`||m(C).layout===`thermostat`||m(C).layout===`knob`?(c(),p(b,{key:0,modelValue:m(C).width,"onUpdate:modelValue":a[3]||=e=>m(C).width=e,label:`Width`,min:120,max:420,suffix:`px`},null,8,[`modelValue`])):s(``,!0),m(C).layout===`tile`?(c(),p(b,{key:1,modelValue:m(C).height,"onUpdate:modelValue":a[4]||=e=>m(C).height=e,label:`Height`,min:120,max:420,suffix:`px`},null,8,[`modelValue`])):s(``,!0)]),_:1}),e(A,{label:`Light`,icon:`ph-sun`},{default:d(()=>[e(b,{modelValue:m(C).angle,"onUpdate:modelValue":a[5]||=e=>m(C).angle=e,label:`Light from (0 = top)`,min:0,max:359,suffix:`°`},null,8,[`modelValue`]),e(b,{modelValue:m(C).distance,"onUpdate:modelValue":a[6]||=e=>m(C).distance=e,label:`Distance`,min:2,max:32,suffix:`px`},null,8,[`modelValue`]),e(b,{modelValue:m(C).blur,"onUpdate:modelValue":a[7]||=e=>m(C).blur=e,label:`Blur`,min:4,max:64,suffix:`px`},null,8,[`modelValue`]),e(b,{modelValue:m(C).intensity,"onUpdate:modelValue":a[8]||=e=>m(C).intensity=e,label:`Shadow intensity`,min:4,max:50,suffix:`%`},null,8,[`modelValue`])]),_:1}),e(A,{label:`Colors`,icon:`ph-palette`},{default:d(()=>[e(M,{"model-value":m(C).base,label:`Base`,"onUpdate:modelValue":a[9]||=e=>m(C).base=e},null,8,[`model-value`]),e(M,{"model-value":m(C).accent,label:`Accent (active, focus)`,"onUpdate:modelValue":a[10]||=e=>m(C).accent=e},null,8,[`model-value`]),e(N,{modelValue:m(C).autoShades,"onUpdate:modelValue":a[11]||=e=>m(C).autoShades=e,label:`Derive shadows from base`},null,8,[`modelValue`]),m(C).autoShades?s(``,!0):(c(),n(l,{key:0},[e(M,{"model-value":m(C).light,label:`Light shadow`,"onUpdate:modelValue":a[12]||=e=>m(C).light=e},null,8,[`model-value`]),e(M,{"model-value":m(C).dark,label:`Dark shadow`,"onUpdate:modelValue":a[13]||=e=>m(C).dark=e},null,8,[`model-value`])],64))]),_:1})]),code:d(()=>[e(F,{css:m(G),html:m(K),vars:m(q),filename:`css-studio-neumorphism`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{G as default};