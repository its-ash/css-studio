import{A as e,C as t,E as n,Gt as r,Kt as i,M as a,Q as o,R as s,S as c,T as l,Ut as u,W as d,X as f,_ as p,_t as m,ct as h,lt as g,st as _,w as v,wt as y}from"./MitKKUeq.js";import{a as ee,i as te,l as ne,o as re,s as ie,t as b}from"./CJu4WcQG.js";import{t as ae}from"./D3e07OzS.js";import{t as oe}from"./Dh2B6pZ8.js";import{c as x,l as S,s as C}from"./Rl_HAT4u.js";import{t as se}from"./BYmGHvE7.js";import{t as ce}from"./o8u_Jv9o.js";var w=[{value:`trail`,label:`Cursor trail`},{value:`progress`,label:`Scroll progress`}],T=[{value:`sparkle`,label:`Sparkle glow`},{value:`dot-fade`,label:`Dot fade`},{value:`ring-burst`,label:`Ring ripple`},{value:`comet`,label:`Comet streak`},{value:`star`,label:`Twinkle stars`},{value:`confetti`,label:`Confetti`},{value:`bubble`,label:`Rising bubbles`},{value:`ink`,label:`Ink blot`},{value:`follower`,label:`Smooth follower`}],E=[{value:`top-bar`,label:`Top bar`},{value:`glow-bar`,label:`Gradient glow bar`},{value:`bottom-bar`,label:`Bottom bar`},{value:`segments`,label:`Chapter segments`},{value:`side-rail`,label:`Side rail`},{value:`circle`,label:`Corner ring`},{value:`side-dot`,label:`Side pie dot`}],D={mode:`trail`,trailKind:`sparkle`,progressKind:`top-bar`,accent:`#10b981`,accent2:`#22d3ee`,size:8,fadeMs:700,trailCount:24,spacing:10,blend:!1,barHeight:4,dotSize:12,segments:5,showPercent:!0,stage:`#0c0c0e`},O=(e,t,n)=>t.some(t=>t.value===e)?e:n;function k(e){let t={...D,...e};return t.mode=O(t.mode,w,`trail`),t.trailKind=O(t.trailKind,T,`sparkle`),t.progressKind=O(t.progressKind,E,`top-bar`),t.trailCount=Math.min(80,Math.max(4,Math.round(t.trailCount))),t.segments=Math.min(12,Math.max(2,Math.round(t.segments))),t}var A=e=>[e.accent,e.accent2,`#f59e0b`,`#f43f5e`,`#a78bfa`];function j(e){let t=e.size,n=`.trail-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: ${t}px;
  height: ${t}px;
  margin: ${-t/2}px 0 0 ${-t/2}px;
  pointer-events: none;
  z-index: 50;
  transform: translate(var(--x), var(--y));
  will-change: transform, opacity;`,r=e.trailKind,i={sparkle:`${n}
  border-radius: 50%;
  background: ${e.accent};
  box-shadow: 0 0 ${t*1.5}px ${e.accent}, 0 0 ${t*3}px ${e.accent}66;
  animation: trail-sparkle ${e.fadeMs}ms ease-out forwards;
}

@keyframes trail-sparkle {
  to { opacity: 0; transform: translate(var(--x), var(--y)) translateY(10px) scale(0.2); }
}`,"dot-fade":`${n}
  border-radius: 50%;
  background: ${e.accent};
  animation: trail-fade ${e.fadeMs}ms linear forwards;
}

@keyframes trail-fade {
  from { opacity: 0.85; transform: translate(var(--x), var(--y)); }
  to { opacity: 0; transform: translate(var(--x), var(--y)) scale(0.3); }
}`,"ring-burst":`${n}
  border: 2px solid ${e.accent};
  border-radius: 50%;
  animation: trail-ring ${e.fadeMs}ms ease-out forwards;
}

@keyframes trail-ring {
  from { opacity: 0.9; transform: translate(var(--x), var(--y)) scale(0.4); }
  to { opacity: 0; transform: translate(var(--x), var(--y)) scale(2.2); }
}`,comet:`${n}
  width: ${t*3}px;
  margin-left: ${-t*3/2}px;
  height: ${Math.max(2,t/2)}px;
  margin-top: ${-Math.max(2,t/2)/2}px;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, ${e.accent} 60%, ${e.accent2});
  animation: trail-comet ${e.fadeMs}ms ease-out forwards;
}

@keyframes trail-comet {
  from { opacity: 1; transform: translate(var(--x), var(--y)) rotate(var(--a)); }
  to { opacity: 0; transform: translate(var(--x), var(--y)) rotate(var(--a)) scaleX(0.2); }
}`,star:`${n}
  width: ${t*1.8}px;
  height: ${t*1.8}px;
  margin: ${-t*.9}px 0 0 ${-t*.9}px;
  background: ${e.accent};
  clip-path: polygon(50% 0, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0 50%, 39% 39%);
  filter: drop-shadow(0 0 4px ${e.accent2});
  animation: trail-star ${e.fadeMs}ms ease-out forwards;
}

@keyframes trail-star {
  from { opacity: 1; transform: translate(var(--x), var(--y)) rotate(var(--r)) scale(1); }
  to { opacity: 0; transform: translate(var(--x), var(--y)) translate(var(--dx), var(--dy)) rotate(calc(var(--r) + 90deg)) scale(0.2); }
}`,confetti:`${n}
  width: ${t}px;
  height: ${t*.45}px;
  border-radius: 1px;
  background: var(--c, ${e.accent});
  animation: trail-confetti ${e.fadeMs}ms cubic-bezier(0.3, 0.6, 0.6, 1) forwards;
}

@keyframes trail-confetti {
  from { opacity: 1; transform: translate(var(--x), var(--y)) rotate(var(--r)); }
  to { opacity: 0; transform: translate(var(--x), var(--y)) translate(var(--dx), 60px) rotate(calc(var(--r) + 540deg)); }
}`,bubble:`${n}
  border: 1.5px solid ${e.accent};
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, ${e.accent}55, transparent 60%);
  animation: trail-bubble ${e.fadeMs}ms ease-out forwards;
}

@keyframes trail-bubble {
  from { opacity: 0.9; transform: translate(var(--x), var(--y)) scale(0.6); }
  to { opacity: 0; transform: translate(var(--x), var(--y)) translate(var(--dx), -48px) scale(1.4); }
}`,ink:`${n}
  width: ${t*2.5}px;
  height: ${t*2.5}px;
  margin: ${-t*1.25}px 0 0 ${-t*1.25}px;
  border-radius: 50%;
  background: radial-gradient(circle, ${e.accent} 0 35%, ${e.accent}00 70%);
  animation: trail-ink ${e.fadeMs}ms ease-out forwards;
}

@keyframes trail-ink {
  from { opacity: 0.9; transform: translate(var(--x), var(--y)) scale(0.5); }
  to { opacity: 0; transform: translate(var(--x), var(--y)) scale(1.6); }
}`};return r===`follower`?``:i[r]}function M(e){let t=e.size*4;return`.cursor-follower {
  position: fixed;
  top: 0;
  left: 0;
  width: ${t}px;
  height: ${t}px;
  margin: ${-t/2}px 0 0 ${-t/2}px;
  border-radius: 50%;
  ${e.blend?`background: #ffffff;
  mix-blend-mode: difference;`:`border: 1.5px solid ${e.accent};\n  background: ${e.accent}1a;`}
  pointer-events: none;
  z-index: 50;
  opacity: 0;
  transition: opacity 200ms ease-out, scale 200ms ease-out;
  will-change: transform;
}

.cursor-follower.is-visible {
  opacity: 1;
}

.cursor-follower.is-pressed {
  scale: 0.75;
}`}function N(e){let t=k(e);return t.mode===`progress`?I(t):`/* Only shown on devices with a precise pointer; skipped entirely for reduced motion (see script). */
${t.trailKind===`follower`?M(t):j(t)}`}function P(e){let t=k(e);if(t.trailKind===`follower`)return`(() => {
  if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const el = Object.assign(document.createElement('div'), { className: 'cursor-follower' });
  el.setAttribute('aria-hidden', 'true');
  document.body.append(el);
  let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y;
  addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; el.classList.add('is-visible'); }, { passive: true });
  addEventListener('pointerdown', () => el.classList.add('is-pressed'));
  addEventListener('pointerup', () => el.classList.remove('is-pressed'));
  document.addEventListener('pointerleave', () => el.classList.remove('is-visible'));
  (function tick() {
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;
    el.style.transform = \`translate(\${x}px, \${y}px)\`;
    requestAnimationFrame(tick);
  })();
})();`;let n={comet:`d.style.setProperty('--a', Math.atan2(e.clientY - ly, e.clientX - lx) + 'rad');`,star:`d.style.setProperty('--r', rnd(0, 90) + 'deg'); d.style.setProperty('--dx', rnd(-16, 16) + 'px'); d.style.setProperty('--dy', rnd(-16, 16) + 'px');`,confetti:`d.style.setProperty('--c', COLORS[Math.floor(Math.random() * COLORS.length)]); d.style.setProperty('--r', rnd(0, 360) + 'deg'); d.style.setProperty('--dx', rnd(-30, 30) + 'px');`,bubble:`d.style.setProperty('--dx', rnd(-12, 12) + 'px');`},r=t.trailKind===`confetti`?`\n  const COLORS = ${JSON.stringify(A(t))};`:``;return`(() => {
  if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const MAX = ${t.trailCount};   // particles alive at once
  const GAP = ${t.spacing};      // px the pointer must travel between particles${r}
  const rnd = (a, b) => a + Math.random() * (b - a);
  let lx = 0, ly = 0, alive = 0;
  addEventListener('pointermove', (e) => {
    if (alive >= MAX || Math.hypot(e.clientX - lx, e.clientY - ly) < GAP) return;
    const d = document.createElement('div');
    d.className = 'trail-dot';
    d.setAttribute('aria-hidden', 'true');
    d.style.setProperty('--x', e.clientX + 'px');
    d.style.setProperty('--y', e.clientY + 'px');
    ${n[t.trailKind]??``}
    lx = e.clientX; ly = e.clientY;
    document.body.append(d);
    alive++;
    d.addEventListener('animationend', () => { d.remove(); alive--; }, { once: true });
  }, { passive: true });
})();`}function F(e){let t=e.dotSize*4;switch(e.progressKind){case`glow-bar`:return`.scroll-progress {
  position: fixed;
  inset: 0 0 auto;
  height: ${e.barHeight}px;
  background: linear-gradient(90deg, ${e.accent}, ${e.accent2});
  box-shadow: 0 0 12px ${e.accent2}aa;
  transform-origin: 0 50%;
  transform: scaleX(var(--progress));
  z-index: 60;
}`;case`bottom-bar`:return`.scroll-progress {
  position: fixed;
  inset: auto 0 0;
  height: ${e.barHeight}px;
  background: ${e.accent};
  transform-origin: 0 50%;
  transform: scaleX(var(--progress));
  z-index: 60;
}`;case`segments`:return`.scroll-progress {
  position: fixed;
  inset: 0.5rem 0.75rem auto;
  height: ${e.barHeight}px;
  border-radius: 999px;
  background:
    linear-gradient(90deg, ${e.accent} calc(var(--progress) * 100%), ${e.accent}2e 0);
  -webkit-mask: repeating-linear-gradient(90deg, #000 0 calc((100% - ${4*(e.segments-1)}px) / ${e.segments}), transparent 0 calc((100% - ${4*(e.segments-1)}px) / ${e.segments} + 4px));
  mask: repeating-linear-gradient(90deg, #000 0 calc((100% - ${4*(e.segments-1)}px) / ${e.segments}), transparent 0 calc((100% - ${4*(e.segments-1)}px) / ${e.segments} + 4px));
  z-index: 60;
}`;case`side-rail`:return`.scroll-progress {
  position: fixed;
  inset: 0 auto 0 0;
  width: ${e.barHeight}px;
  background: ${e.accent};
  transform-origin: 50% 0;
  transform: scaleY(var(--progress));
  z-index: 60;
}`;case`circle`:return`.scroll-progress {
  position: fixed;
  right: 1.25rem;
  bottom: 1.25rem;
  display: grid;
  place-items: center;
  width: ${t}px;
  height: ${t}px;
  border-radius: 50%;
  background:
    radial-gradient(closest-side, ${e.stage} calc(100% - ${Math.max(3,e.barHeight)}px), transparent calc(100% - ${Math.max(3,e.barHeight)}px + 1px)),
    conic-gradient(${e.accent} calc(var(--progress) * 360deg), ${e.accent}2e 0);
  color: ${S(e.stage)};
  font: 600 ${Math.max(10,Math.round(t/4.2))}px/1 system-ui, sans-serif;
  font-variant-numeric: tabular-nums;
  z-index: 60;
}${e.showPercent?`

/* An <integer>-typed property rounds the calc, which makes it usable as a counter: no extra script. */
@property --pct {
  syntax: '<integer>';
  inherits: false;
  initial-value: 0;
}

.scroll-progress::after {
  --pct: calc(var(--progress) * 100);
  counter-reset: pct var(--pct);
  content: counter(pct) '%';
}`:``}`;case`side-dot`:return`.scroll-progress {
  position: fixed;
  right: 1rem;
  top: 50%;
  width: ${e.dotSize*1.6}px;
  height: ${e.dotSize*1.6}px;
  margin-top: ${-e.dotSize*.8}px;
  border-radius: 50%;
  background: conic-gradient(${e.accent} calc(var(--progress) * 360deg), ${e.accent}2e 0);
  box-shadow: 0 0 0 3px ${e.stage}, 0 0 0 4px ${e.accent}44;
  z-index: 60;
}`;default:return`.scroll-progress {
  position: fixed;
  inset: 0 0 auto;
  height: ${e.barHeight}px;
  background: ${e.accent};
  transform-origin: 0 50%;
  transform: scaleX(var(--progress));
  z-index: 60;
}`}}function I(e){return`/* Registered so the value can animate and drive transforms, gradients and the % counter. */
@property --progress {
  syntax: '<number>';
  inherits: true;
  initial-value: 0;
}

${F(k(e))}

/* Scroll-driven animation: no JavaScript in supporting browsers. */
@supports (animation-timeline: scroll()) {
  .scroll-progress {
    animation: scroll-progress linear both;
    animation-timeline: scroll(root block);
  }

  @keyframes scroll-progress {
    to { --progress: 1; }
  }
}`}function L(){return`// Fallback for browsers without scroll-driven animations.
if (!CSS.supports('animation-timeline: scroll()')) {
  const bar = document.querySelector('.scroll-progress');
  const update = () => {
    const h = document.documentElement;
    bar.style.setProperty('--progress', (h.scrollTop / (h.scrollHeight - h.clientHeight || 1)).toFixed(4));
  };
  addEventListener('scroll', update, { passive: true });
  update();
}`}function le(e){let t=k(e);return t.mode===`progress`?`<div class="scroll-progress" role="progressbar" aria-label="Reading progress" aria-valuemin="0" aria-valuemax="100"></div>

<!-- Add before </body> -->
<script>
${L()}
<\/script>`:`<!-- Add before </body> -->
<script>
${P(t)}
<\/script>`}function R(e){return Array.from({length:e},(t,n)=>{let r=n/(e-1);return{t:r,x:90+r*430,y:250-Math.sin(r*Math.PI*1.6)*110+r*40}})}function ue(e){let t=k(e);if(t.mode===`progress`)return B(t);let n=R(t.trailKind===`follower`?2:16),r=n[n.length-1],i=A(t);return`<div class="trail-demo">
  ${t.trailKind===`follower`?`<div class="cursor-follower is-visible" style="transform: translate(${r.x-22}px, ${r.y-14}px)"></div>`:n.slice(0,-1).map((e,n,a)=>{let o=a[n+1]??r,s=1-e.t,c=[`--x:${e.x.toFixed(0)}px`,`--y:${e.y.toFixed(0)}px`];t.trailKind===`comet`&&c.push(`--a:${Math.atan2(o.y-e.y,o.x-e.x).toFixed(2)}rad`),(t.trailKind===`star`||t.trailKind===`confetti`)&&c.push(`--r:${n*47%360}deg`),t.trailKind===`confetti`&&c.push(`--c:${i[n%i.length]}`);let l=t.trailKind===`confetti`?s*50:t.trailKind===`bubble`?-s*40:0,u=(t.trailKind===`ring-burst`||t.trailKind===`ink`?.5+s*1.4:1-s*.6)*1.5;return`<div class="trail-dot" style="${c.join(`;`)};opacity:${(1-s*.72).toFixed(2)};transform:translate(var(--x),var(--y)) translateY(${l.toFixed(0)}px) rotate(var(--a, var(--r, 0deg))) scale(${u.toFixed(2)})"></div>`}).join(`
  `)}
  <span class="trail-demo-pointer" style="left:${r.x}px;top:${r.y}px"></span>
  <p class="trail-demo-hint">Move the pointer to draw</p>
</div>`}var z=`<h3>How we cut build times in half</h3>
    <p>Our CI pipeline had grown to 41 minutes. Most of it was waiting: cold caches, serial test shards and a Docker layer that rebuilt on every commit.</p>
    <p>We started by measuring. A week of traces showed three steps accounted for 70 percent of the wall clock, and none of them were the tests themselves.</p>
    <p>Moving dependency installs into a cached base image saved nine minutes on its own.</p>`;function B(e){return`<div class="trail-demo progress-demo" style="--progress: 0.45">
  <div class="scroll-progress"></div>
  <article class="progress-demo-article">
    ${z}
  </article>
</div>`}function de(e){let t=k(e),n=S(t.stage);return`${N(t)}

.trail-demo {
  position: relative;
  width: 640px;
  height: 420px;
  overflow: hidden;
  border-radius: 16px;
  background: radial-gradient(80% 60% at 30% 20%, ${x(t.stage,t.accent,.08)}, ${t.stage});
  color: ${n};
  font-family: system-ui, -apple-system, sans-serif;
}

.trail-demo .trail-dot,
.trail-demo .cursor-follower,
.trail-demo .scroll-progress {
  position: absolute;
  animation: none !important;
}

.trail-demo-pointer {
  position: absolute;
  width: 18px;
  height: 26px;
  background: ${n};
  clip-path: polygon(0 0, 0 76%, 22% 59%, 38% 98%, 53% 92%, 38% 55%, 70% 55%);
  filter: drop-shadow(0 2px 3px rgb(0 0 0 / 0.5));
  translate: -1px -1px;
}

.trail-demo-hint {
  position: absolute;
  left: 24px;
  bottom: 18px;
  margin: 0;
  font-size: 12px;
  opacity: 0.55;
}

.progress-demo-article {
  height: 100%;
  overflow: hidden;
  padding: 44px 56px 0 ${t.progressKind===`side-rail`?64:56}px;
  font-size: 15px;
  line-height: 1.65;
}

.progress-demo-article h3 {
  margin: 0 0 12px;
  font-size: 24px;
  letter-spacing: -0.02em;
}

.progress-demo-article p {
  margin: 0 0 12px;
  opacity: 0.75;
}`}function fe(e){let t=k(e);return{"--trail-accent":t.accent,"--trail-accent-2":t.accent2,"--trail-fade":`${t.fadeMs}ms`}}function pe(e,t){let n=Math.floor(t.range(0,360));return{...k(e),trailKind:t.pick(T.map(e=>e.value)),progressKind:t.pick(E.map(e=>e.value)),accent:C({h:n,s:80,l:58}),accent2:C({h:(n+t.pick([40,120,180]))%360,s:85,l:60}),size:Math.round(t.range(5,12)),fadeMs:Math.round(t.range(450,1200)/50)*50,spacing:t.pick([6,10,14,18]),barHeight:t.pick([2,3,4,6]),segments:t.int(3,8)}}var V=e=>({...D,...e}),H=e=>V({mode:`progress`,...e}),U=[{name:`Emerald Sparkle`,tags:[`trail`],state:V({})},{name:`Neon Comet`,tags:[`trail`,`neon`],state:V({trailKind:`comet`,accent:`#22d3ee`,accent2:`#e0f2fe`,size:8,fadeMs:600,spacing:6})},{name:`Soft Dots`,tags:[`trail`,`minimal`],state:V({trailKind:`dot-fade`,accent:`#a1a1aa`,size:6,fadeMs:500})},{name:`Ripple`,tags:[`trail`],state:V({trailKind:`ring-burst`,accent:`#8b5cf6`,fadeMs:700,spacing:18})},{name:`Twinkle Stars`,tags:[`trail`,`playful`],state:V({trailKind:`star`,accent:`#fde047`,accent2:`#f59e0b`,size:9,fadeMs:900,spacing:14})},{name:`Confetti`,tags:[`trail`,`playful`],state:V({trailKind:`confetti`,accent:`#10b981`,accent2:`#38bdf8`,size:10,fadeMs:1100,spacing:8})},{name:`Bubbles`,tags:[`trail`],state:V({trailKind:`bubble`,accent:`#7dd3fc`,size:12,fadeMs:1200,spacing:16})},{name:`Ink Blot`,tags:[`trail`,`soft`],state:V({trailKind:`ink`,accent:`#f43f5e`,size:10,fadeMs:900,spacing:8})},{name:`Smooth Follower`,tags:[`trail`,`cursor`],state:V({trailKind:`follower`,accent:`#10b981`,size:9})},{name:`Blend Follower`,tags:[`trail`,`cursor`],state:V({trailKind:`follower`,blend:!0,size:10})},{name:`Rose Sparkle`,tags:[`trail`,`warm`],state:V({accent:`#fb7185`,size:7,fadeMs:800})},{name:`Light Ripple`,tags:[`trail`,`light`],state:V({trailKind:`ring-burst`,accent:`#2563eb`,stage:`#f8fafc`,fadeMs:650,spacing:16})},{name:`Top Progress`,tags:[`progress`],state:H({})},{name:`Glow Bar`,tags:[`progress`,`neon`],state:H({progressKind:`glow-bar`,accent:`#a855f7`,accent2:`#22d3ee`,barHeight:3})},{name:`Thin Bar`,tags:[`progress`,`minimal`],state:H({barHeight:2,accent:`#fafafa`})},{name:`Bottom Bar`,tags:[`progress`],state:H({progressKind:`bottom-bar`,accent:`#f59e0b`,barHeight:4})},{name:`Chapters`,tags:[`progress`,`story`],state:H({progressKind:`segments`,accent:`#fafafa`,segments:5,barHeight:3})},{name:`Side Rail`,tags:[`progress`],state:H({progressKind:`side-rail`,accent:`#10b981`,barHeight:3})},{name:`Corner Ring`,tags:[`progress`],state:H({progressKind:`circle`,accent:`#f59e0b`,dotSize:13,barHeight:4})},{name:`Side Pie`,tags:[`progress`,`minimal`],state:H({progressKind:`side-dot`,accent:`#0ea5e9`,dotSize:12})},{name:`Light Ring`,tags:[`progress`,`light`],state:H({progressKind:`circle`,accent:`#4f46e5`,stage:`#ffffff`,dotSize:13,barHeight:3})},{name:`Light Chapters`,tags:[`progress`,`light`],state:H({progressKind:`segments`,accent:`#18181b`,stage:`#fafaf9`,segments:4,barHeight:4})}],me=[`innerHTML`],he={class:`flex h-full w-full items-center justify-center p-6`},W=a({__name:`trail`,setup(a){let{state:x,randomize:S,reset:C,undo:O,redo:A,pushHistory:j,shareUrlRef:M}=b({id:`trail`,defaultState:JSON.parse(JSON.stringify(D)),randomize:pe,deserialize:e=>k(e)}),P=s(`editor:shareUrl`,()=>{});h(()=>P(M.value));let F=c(()=>N(x.value)),I=c(()=>le(x.value)),L=c(()=>fe(x.value)),R=c(()=>x.value.mode===`trail`),z=c(()=>R.value&&x.value.trailKind===`follower`),B=c(()=>`<style>${F.value}
.live-stage .trail-dot, .live-stage .cursor-follower, .live-stage .scroll-progress { position: absolute; }
.live-stage .scroll-progress { animation: none; }</style>`);function V(e){x.value=JSON.parse(JSON.stringify(U[e].state)),j()}let H=c(()=>[x.value.accent,x.value.accent2,`#f59e0b`,`#f43f5e`,`#a78bfa`]),W=(e,t)=>e+Math.random()*(t-e),G=m(null),K={x:-999,y:-999},q=0;function ge(e){let t=G.value;if(!t)return;let n=t.getBoundingClientRect(),r=e.clientX-n.left,i=e.clientY-n.top;if(z.value){Y.x=r,Y.y=i,J.value?.classList.add(`is-visible`);return}let a=x.value;if(q>=a.trailCount||Math.hypot(r-K.x,i-K.y)<a.spacing)return;let o=document.createElement(`div`);o.className=`trail-dot`,o.style.setProperty(`--x`,`${r}px`),o.style.setProperty(`--y`,`${i}px`),a.trailKind===`comet`&&o.style.setProperty(`--a`,`${Math.atan2(i-K.y,r-K.x)}rad`),(a.trailKind===`star`||a.trailKind===`confetti`)&&o.style.setProperty(`--r`,`${W(0,360)}deg`),a.trailKind===`star`&&(o.style.setProperty(`--dx`,`${W(-16,16)}px`),o.style.setProperty(`--dy`,`${W(-16,16)}px`)),a.trailKind===`confetti`&&(o.style.setProperty(`--c`,H.value[Math.floor(Math.random()*H.value.length)]),o.style.setProperty(`--dx`,`${W(-30,30)}px`)),a.trailKind===`bubble`&&o.style.setProperty(`--dx`,`${W(-12,12)}px`),K={x:r,y:i},t.appendChild(o),q++,o.addEventListener(`animationend`,()=>{o.remove(),q--},{once:!0})}let J=m(null),Y={x:260,y:160},X={x:260,y:160},Z=0;function Q(){X.x+=(Y.x-X.x)*.18,X.y+=(Y.y-X.y)*.18,J.value&&(J.value.style.transform=`translate(${X.x}px, ${X.y}px)`),Z=requestAnimationFrame(Q)}_(z,e=>{cancelAnimationFrame(Z),e&&(Z=requestAnimationFrame(Q))},{immediate:!0}),d(()=>cancelAnimationFrame(Z));let $=m(null);function _e(){let e=$.value;e&&e.parentElement?.style.setProperty(`--progress`,(e.scrollTop/(e.scrollHeight-e.clientHeight||1)).toFixed(4))}let ve=[`Our CI pipeline had grown to 41 minutes. Most of it was waiting: cold caches, serial test shards and a Docker layer that rebuilt on every commit.`,`We started by measuring. A week of traces showed three steps accounted for 70 percent of the wall clock, and none of them were the tests themselves.`,`Moving dependency installs into a cached base image saved nine minutes on its own. Splitting the suite into eight shards balanced by historical runtime saved another twelve.`,`The last win was boring: we deleted 340 snapshot tests nobody had looked at in a year. They were slow, flaky and caught nothing the type checker missed.`,`Today a typical pull request goes green in 19 minutes. The next target is under ten, which means caching the end-to-end browser images too.`,`If you take one thing from this: measure before you parallelise. Our first guess about the bottleneck was wrong, and so was our second.`],ye=c(()=>U.map(e=>({name:e.name,css:de(e.state),html:ue(e.state)})));return(a,s)=>{let c=ne,d=ie,m=ae,h=ee,_=re,b=oe,D=se,k=ce,j=te;return f(),v(j,{title:`Cursor Trail & Scroll Progress`,description:`Nine cursor trails and seven scroll-driven reading progress indicators.`,css:y(F),html:y(I),vars:y(L),onRandomize:y(S),onReset:y(C),onUndo:y(O),onRedo:y(A)},{preview:g(()=>[e(d,{variants:y(ye),title:`Trail preview`,filename:`css-studio-trail`,onApplyVariant:V},{presets:g(()=>[e(c,{presets:y(U),onApply:V},null,8,[`presets`])]),default:g(()=>[t(`div`,{innerHTML:y(B),"aria-hidden":`true`},null,8,me),t(`div`,he,[y(R)?(f(),n(`div`,{key:0,ref_key:`stageEl`,ref:G,class:`live-stage relative h-105 w-full max-w-2xl cursor-crosshair overflow-hidden rounded-2xl border border-line`,style:r({background:`radial-gradient(80% 60% at 30% 20%, color-mix(in srgb, ${y(x).accent} 8%, ${y(x).stage}), ${y(x).stage})`}),"aria-label":`Move the pointer here to preview the cursor trail`,onPointermove:ge,onPointerleave:s[0]||=e=>y(J)?.classList.remove(`is-visible`)},[y(z)?(f(),n(`div`,{key:0,ref_key:`follower`,ref:J,class:`cursor-follower`},null,512)):l(``,!0),t(`span`,{class:`pointer-events-none absolute bottom-4 left-5 text-xs opacity-60`,style:r({color:y(x).stage===`#0c0c0e`?`#a1a1aa`:void 0})},` Move the pointer here to draw `,4)],36)):(f(),n(`div`,{key:1,class:`live-stage relative h-105 w-full max-w-2xl overflow-hidden rounded-2xl border border-line`,style:r({background:y(x).stage})},[s[17]||=t(`div`,{class:`scroll-progress`},null,-1),t(`div`,{ref_key:`scrollEl`,ref:$,class:u([`h-full overflow-y-auto px-14 py-10`,y(x).progressKind===`side-rail`?`pl-16`:``]),onScroll:_e},[t(`article`,{class:`mx-auto max-w-prose`,style:r({color:y(x).stage===`#0c0c0e`?`#e4e4e7`:`#27272a`})},[s[16]||=t(`h3`,{class:`mb-4 text-2xl font-semibold tracking-tight`},`How we cut build times in half`,-1),(f(!0),n(p,null,o([...ve,...ve],(e,t)=>(f(),n(`p`,{key:t,class:`mb-4 text-[15px] leading-relaxed opacity-80`},i(e),1))),128))],4)],34)],4))])]),_:1},8,[`variants`])]),controls:g(()=>[e(h,{label:`Effect`,icon:`ph-cursor-click`},{default:g(()=>[e(m,{modelValue:y(x).mode,"onUpdate:modelValue":s[1]||=e=>y(x).mode=e,label:`Type`,options:y(w)},null,8,[`modelValue`,`options`]),y(R)?(f(),v(m,{key:0,modelValue:y(x).trailKind,"onUpdate:modelValue":s[2]||=e=>y(x).trailKind=e,label:`Trail style`,options:y(T)},null,8,[`modelValue`,`options`])):(f(),v(m,{key:1,modelValue:y(x).progressKind,"onUpdate:modelValue":s[3]||=e=>y(x).progressKind=e,label:`Indicator`,options:y(E)},null,8,[`modelValue`,`options`]))]),_:1}),y(R)?(f(),v(h,{key:0,label:`Trail`,icon:`ph-sparkle`},{default:g(()=>[e(_,{modelValue:y(x).size,"onUpdate:modelValue":s[4]||=e=>y(x).size=e,label:`Particle size`,min:4,max:18,suffix:`px`},null,8,[`modelValue`]),y(z)?(f(),v(b,{key:1,modelValue:y(x).blend,"onUpdate:modelValue":s[8]||=e=>y(x).blend=e,label:`Invert what's underneath`},null,8,[`modelValue`])):(f(),n(p,{key:0},[e(_,{modelValue:y(x).fadeMs,"onUpdate:modelValue":s[5]||=e=>y(x).fadeMs=e,label:`Lifetime`,min:300,max:1600,step:50,suffix:`ms`},null,8,[`modelValue`]),e(_,{modelValue:y(x).spacing,"onUpdate:modelValue":s[6]||=e=>y(x).spacing=e,label:`Spacing`,min:2,max:40,suffix:`px`},null,8,[`modelValue`]),e(_,{modelValue:y(x).trailCount,"onUpdate:modelValue":s[7]||=e=>y(x).trailCount=e,label:`Max particles`,min:4,max:80},null,8,[`modelValue`])],64))]),_:1})):(f(),v(h,{key:1,label:`Indicator`,icon:`ph-arrow-bend-double-up-right`},{default:g(()=>[e(_,{modelValue:y(x).barHeight,"onUpdate:modelValue":s[9]||=e=>y(x).barHeight=e,label:y(x).progressKind===`circle`?`Ring thickness`:`Thickness`,min:2,max:10,suffix:`px`},null,8,[`modelValue`,`label`]),y(x).progressKind===`circle`||y(x).progressKind===`side-dot`?(f(),v(_,{key:0,modelValue:y(x).dotSize,"onUpdate:modelValue":s[10]||=e=>y(x).dotSize=e,label:`Size`,min:8,max:18,suffix:`px`},null,8,[`modelValue`])):l(``,!0),y(x).progressKind===`segments`?(f(),v(_,{key:1,modelValue:y(x).segments,"onUpdate:modelValue":s[11]||=e=>y(x).segments=e,label:`Segments`,min:2,max:12},null,8,[`modelValue`])):l(``,!0),y(x).progressKind===`circle`?(f(),v(b,{key:2,modelValue:y(x).showPercent,"onUpdate:modelValue":s[12]||=e=>y(x).showPercent=e,label:`Show percent`},null,8,[`modelValue`])):l(``,!0)]),_:1})),e(h,{label:`Colors`,icon:`ph-palette`},{default:g(()=>[e(D,{"model-value":y(x).accent,label:`Accent`,"onUpdate:modelValue":s[13]||=e=>y(x).accent=e},null,8,[`model-value`]),e(D,{"model-value":y(x).accent2,label:`Second accent`,"onUpdate:modelValue":s[14]||=e=>y(x).accent2=e},null,8,[`model-value`]),e(D,{"model-value":y(x).stage,label:`Page background`,"onUpdate:modelValue":s[15]||=e=>y(x).stage=e},null,8,[`model-value`])]),_:1})]),code:g(()=>[e(k,{css:y(F),html:y(I),vars:y(L),filename:`css-studio-trail`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{W as default};