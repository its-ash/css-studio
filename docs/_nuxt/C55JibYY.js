import{A as e,C as t,M as n,R as r,S as i,T as a,X as o,ct as s,lt as c,w as l,wt as u}from"./MitKKUeq.js";import{a as d,i as f,l as p,o as m,s as h,t as g}from"./DayxJ-Je.js";import{t as _}from"./D3e07OzS.js";import{t as v}from"./Dh2B6pZ8.js";import{t as y}from"./BYmGHvE7.js";import{t as b}from"./BVp1fOGc.js";var x=[{value:`cube`,label:`3D Cube`},{value:`planet`,label:`Planet Orbit`},{value:`ring`,label:`Spinning Ring`},{value:`sphere`,label:`Sphere Dots`}],S={kind:`planet`,accent:`#10b981`,secondary:`#22d3ee`,bg:`transparent`,size:140,duration:8,spinX:-18,spinY:0,satellites:3,pauseOnHover:!0};function C(e){let t=`rotateX(${e.spinX}deg) rotateY(${e.spinY}deg)`,n=e.pauseOnHover?`.orbit-stage:hover .orbit-spin {
  animation-play-state: paused;
}`:``;switch(e.kind){case`cube`:return`.orbit-stage {
  perspective: 800px;
}

.orbit-cube {
  position: relative;
  width: ${e.size}px;
  height: ${e.size}px;
  transform-style: preserve-3d;
  animation: cube-spin ${e.duration}s linear infinite;
  transform-style: preserve-3d;
}

.orbit-cube .face {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: ${Math.round(e.size/6)}px;
  color: #052e1a;
  border: 2px solid ${e.accent};
  background: ${e.accent}cc;
}

.face-1 { transform: rotateY(0deg) translateZ(${e.size/2}px); }
.face-2 { transform: rotateY(90deg) translateZ(${e.size/2}px); background: ${e.secondary}cc; border-color: ${e.secondary}; }
.face-3 { transform: rotateY(180deg) translateZ(${e.size/2}px); }
.face-4 { transform: rotateY(-90deg) translateZ(${e.size/2}px); background: ${e.secondary}cc; border-color: ${e.secondary}; }
.face-5 { transform: rotateX(90deg) translateZ(${e.size/2}px); }
.face-6 { transform: rotateX(-90deg) translateZ(${e.size/2}px); }

@keyframes cube-spin {
  from { transform: ${t} rotateY(0deg); }
  to { transform: ${t} rotateY(360deg); }
}

${n}`;case`planet`:return`.orbit-stage {
  perspective: 900px;
}

.orbit-system {
  position: relative;
  width: ${e.size}px;
  height: ${e.size}px;
  transform: ${t};
  transform-style: preserve-3d;
}

.orbit-planet {
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${Math.round(e.size/3)}px;
  height: ${Math.round(e.size/3)}px;
  margin: -${Math.round(e.size/6)}px 0 0 -${Math.round(e.size/6)}px;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 30%, ${e.secondary}, ${e.accent} 70%);
  box-shadow: 0 0 ${Math.round(e.size/5)}px ${e.accent}66;
}

.orbit-path {
  position: absolute;
  inset: 0;
  border: 1px dashed ${e.accent}55;
  border-radius: 999px;
  animation: orbit-spin ${e.duration}s linear infinite;
}

.orbit-sat {
  position: absolute;
  top: -${Math.round(e.size/12)}px;
  left: 50%;
  width: ${Math.round(e.size/10)}px;
  height: ${Math.round(e.size/10)}px;
  margin-left: -${Math.round(e.size/20)}px;
  border-radius: 999px;
  background: ${e.secondary};
  box-shadow: 0 0 ${Math.round(e.size/14)}px ${e.secondary}99;
}

${Array.from({length:Math.max(1,Math.min(6,e.satellites))},(t,n)=>`.orbit-path:nth-of-type(${n+1}) {
  inset: ${n*Math.round(e.size/9)}px;
  animation-duration: ${e.duration+n*2}s;
  animation-direction: ${n%2?`reverse`:`normal`};
}`).join(`

`)}

@keyframes orbit-spin {
  from { transform: rotateZ(0deg); }
  to { transform: rotateZ(360deg); }
}

${n}`;case`ring`:return`.orbit-stage {
  perspective: 700px;
}

.orbit-ring {
  width: ${e.size}px;
  height: ${e.size}px;
  border-radius: 999px;
  border: ${Math.max(3,Math.round(e.size/28))}px solid ${e.accent};
  border-top-color: transparent;
  border-right-color: ${e.secondary};
  animation: ring-spin ${e.duration}s linear infinite;
}

@keyframes ring-spin {
  from { transform: rotateX(60deg) rotateZ(0deg); }
  to { transform: rotateX(60deg) rotateZ(360deg); }
}

.orbit-ring::after {
  content: '';
  position: absolute;
  inset: ${Math.round(e.size/8)}px;
  border-radius: 999px;
  border: ${Math.max(2,Math.round(e.size/40))}px solid ${e.secondary};
  border-bottom-color: transparent;
}

${n}`;case`sphere`:return`.orbit-stage {
  perspective: 900px;
}

.orbit-sphere {
  position: relative;
  width: ${e.size}px;
  height: ${e.size}px;
  transform-style: preserve-3d;
  animation: sphere-spin ${e.duration}s linear infinite;
}

.orbit-sphere span {
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${Math.max(5,Math.round(e.size/16))}px;
  height: ${Math.max(5,Math.round(e.size/16))}px;
  border-radius: 999px;
  background: ${e.accent};
  box-shadow: 0 0 ${Math.max(4,Math.round(e.size/20))}px ${e.accent}88;
  transform: rotateY(calc(var(--i) * 36deg)) rotateX(calc(var(--r) * 30deg)) translateZ(${e.size/2}px);
}

@keyframes sphere-spin {
  from { transform: rotateY(0deg) rotateX(20deg); }
  to { transform: rotateY(360deg) rotateX(20deg); }
}

${n}`}}function w(e){return e.kind===`cube`?`<div class="orbit-stage">
  <div class="orbit-cube">
    <div class="face face-1">CSS</div>
    <div class="face face-2">3D</div>
    <div class="face face-3">PURE</div>
    <div class="face face-4">ONLY</div>
    <div class="face face-5">✦</div>
    <div class="face face-6">✦</div>
  </div>
</div>`:e.kind===`planet`?`<div class="orbit-stage">\n  <div class="orbit-system">\n    <div class="orbit-planet"></div>\n${Array.from({length:Math.max(1,Math.min(6,e.satellites))},()=>`  <div class="orbit-path"><div class="orbit-sat"></div></div>`).join(`
`)}\n  </div>\n</div>`:e.kind===`ring`?`<div class="orbit-stage">
  <div class="orbit-ring"></div>
</div>`:`<div class="orbit-stage">\n  <div class="orbit-sphere">\n${Array.from({length:30},(e,t)=>`  <span style="--i: ${t%10}; --r: ${Math.floor(t/10)}"></span>`).join(`
`)}\n  </div>\n</div>`}function T(e){return{"--orbit-accent":e.accent,"--orbit-secondary":e.secondary,"--orbit-duration":`${e.duration}s`}}function E(e,t){let n=x.map(e=>e.value),r=Math.floor(t.range(0,360));return{...e,kind:t.pick(n),accent:`hsl(${r} 78% 52%)`,secondary:`hsl(${(r+150)%360} 78% 58%)`,size:Math.round(t.range(110,180)),duration:Number(t.range(5,14).toFixed(1)),spinX:Math.round(t.range(-30,0)),satellites:Math.round(t.range(1,5)),pauseOnHover:t.chance(.6)}}var D=[{name:`Emerald Planet`,tags:[`brand`],state:{...S}},{name:`Spinning Cube`,tags:[`3d`],state:{...S,kind:`cube`,size:120,duration:6}},{name:`Neon Gyro`,tags:[`neon`],state:{...S,kind:`ring`,accent:`#22d3ee`,secondary:`#f43f5e`,duration:4}},{name:`Solar System`,tags:[`planet`,`playful`],state:{...S,satellites:4,size:160,duration:10}},{name:`Sphere Dots`,tags:[`dots`],state:{...S,kind:`sphere`,accent:`#8b5cf6`,duration:9}},{name:`Fast Cube`,tags:[`snappy`],state:{...S,kind:`cube`,size:100,duration:3.5,accent:`#f59e0b`,secondary:`#f43f5e`}},{name:`Slow Orbit`,tags:[`calm`],state:{...S,duration:18,size:170,spinX:-12}},{name:`Retro Gyro`,tags:[`retro`],state:{...S,kind:`ring`,accent:`#fbbf24`,secondary:`#fbbf24`,size:130,duration:5}}],O=[`innerHTML`],k={class:`flex h-full w-full max-w-2xl items-center justify-center`},A=[`innerHTML`],j=n({__name:`orbit`,setup(n){let{state:j,randomize:M,reset:N,undo:P,redo:F,pushHistory:I,shareUrlRef:L}=g({id:`orbit`,defaultState:JSON.parse(JSON.stringify(S)),randomize:E}),R=r(`editor:shareUrl`,()=>{});s(()=>R(L.value));let z=i(()=>C(j.value)),B=i(()=>w(j.value)),V=i(()=>T(j.value)),H=i(()=>`<style>.orbit-stage { display: grid; place-items: center; width: 100%; height: 100%; } ${z.value}</style>`);function U(e){j.value=JSON.parse(JSON.stringify(D[e].state)),I()}let W=i(()=>D.map(e=>({name:e.name,css:C(e.state),html:w(e.state)})));return(n,r)=>{let i=p,s=h,g=_,S=m,C=v,w=d,T=y,E=b,I=f;return o(),l(I,{title:`3D Orbit Studio`,description:`Cubes, orbits, gyros and spheres — preserve-3d only.`,css:u(z),html:u(B),vars:u(V),onRandomize:u(M),onReset:u(N),onUndo:u(P),onRedo:u(F)},{preview:c(()=>[e(s,{variants:u(W),onApplyVariant:U,title:`Orbit preview`,filename:`css-studio-orbit`},{presets:c(()=>[e(i,{presets:u(D),onApply:U},null,8,[`presets`])]),default:c(()=>[t(`div`,{innerHTML:u(H),"aria-hidden":`true`},null,8,O),t(`div`,k,[t(`div`,{innerHTML:u(B)},null,8,A)])]),_:1},8,[`variants`])]),controls:c(()=>[e(w,{label:`Motion`,icon:`ph-orbit`},{default:c(()=>[e(g,{modelValue:u(j).kind,"onUpdate:modelValue":r[0]||=e=>u(j).kind=e,label:`Type`,options:u(x)},null,8,[`modelValue`,`options`]),e(S,{modelValue:u(j).duration,"onUpdate:modelValue":r[1]||=e=>u(j).duration=e,label:`Duration`,min:2,max:20,step:.5,suffix:`s`},null,8,[`modelValue`]),e(S,{modelValue:u(j).size,"onUpdate:modelValue":r[2]||=e=>u(j).size=e,label:`Size`,min:80,max:200,suffix:`px`},null,8,[`modelValue`]),e(S,{modelValue:u(j).spinX,"onUpdate:modelValue":r[3]||=e=>u(j).spinX=e,label:`Tilt`,min:-40,max:10,suffix:`°`},null,8,[`modelValue`]),u(j).kind===`planet`?(o(),l(S,{key:0,modelValue:u(j).satellites,"onUpdate:modelValue":r[4]||=e=>u(j).satellites=e,label:`Satellites`,min:1,max:6},null,8,[`modelValue`])):a(``,!0),e(C,{modelValue:u(j).pauseOnHover,"onUpdate:modelValue":r[5]||=e=>u(j).pauseOnHover=e,label:`Pause on hover`},null,8,[`modelValue`])]),_:1}),e(w,{label:`Colors`,icon:`ph-palette`},{default:c(()=>[e(T,{"model-value":u(j).accent,label:`Primary`,"onUpdate:modelValue":r[6]||=e=>u(j).accent=e},null,8,[`model-value`]),e(T,{"model-value":u(j).secondary,label:`Secondary`,"onUpdate:modelValue":r[7]||=e=>u(j).secondary=e},null,8,[`model-value`])]),_:1})]),code:c(()=>[e(E,{css:u(z),html:u(B),vars:u(V),filename:`css-studio-orbit`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{j as default};