import{A as e,C as t,M as n,R as r,S as i,T as a,X as o,ct as s,lt as c,w as l,wt as u}from"./MitKKUeq.js";import{a as d,i as f,n as p,r as m,s as h,t as g}from"./BPBkcUFJ.js";import{t as _}from"./D3e07OzS.js";import{t as v}from"./Dh2B6pZ8.js";import{i as y,l as b,s as x}from"./Rl_HAT4u.js";import{t as S}from"./BYmGHvE7.js";import{t as C}from"./Cw1rlFxN.js";import{i as w,r as T}from"./tf7vSe8Z.js";var E=[{value:`frosted`,label:`Frosted`},{value:`liquid`,label:`Liquid (specular)`},{value:`acrylic`,label:`Acrylic (grain)`},{value:`clear`,label:`Clear`}],D=[{value:`card`,label:`Profile card`},{value:`creditcard`,label:`Credit card`},{value:`player`,label:`Music player`},{value:`weather`,label:`Weather widget`},{value:`login`,label:`Sign-in form`},{value:`notification`,label:`Notifications`},{value:`stats`,label:`Stat tile`},{value:`nav`,label:`Navigation bar`}],O=[{value:`aurora`,label:`Aurora`},{value:`sunset`,label:`Sunset`},{value:`ocean`,label:`Ocean`},{value:`midnight`,label:`Midnight`},{value:`city`,label:`Photo: city`},{value:`fjord`,label:`Photo: fjord`},{value:`valley`,label:`Photo: valley`}],k=[{value:`auto`,label:`Auto`},{value:`light`,label:`Light text`},{value:`dark`,label:`Dark text`}],A={style:`frosted`,layout:`card`,backdrop:`aurora`,tint:`#ffffff`,tintOpacity:14,blur:18,saturate:160,brightness:105,radius:24,border:30,edgeHighlight:!0,shadow:40,grain:0,ink:`auto`,accent:`#ffffff`,width:340},j=/^#[0-9a-f]{6}$/i,M=(e,t,n)=>t.some(t=>t.value===e)?e:n;function N(e){let t=e,n={...A,...e};return t.bg&&!e.tint&&(n.tint=t.bg),t.bgOpacity!==void 0&&e.tintOpacity===void 0&&(n.tintOpacity=t.bgOpacity),t.borderOpacity!==void 0&&e.border===void 0&&(n.border=t.borderOpacity),t.innerGlow!==void 0&&e.edgeHighlight===void 0&&(n.edgeHighlight=t.innerGlow),n.style=M(n.style,E,`frosted`),n.layout=M(n.layout,D,`card`),n.backdrop=M(n.backdrop,O,`aurora`),n.ink=M(n.ink,k,`auto`),j.test(n.tint)||(n.tint=`#ffffff`),j.test(n.accent)||(n.accent=`#ffffff`),n}var P=(e,t)=>{let{r:n,g:r,b:i}=y(e);return`rgb(${n} ${r} ${i} / ${+t.toFixed(3)})`},F={city:`city`,fjord:`fjord`,valley:`valley`};function I(e){let t=F[e];if(t)return{bg:`#111 url('${w(t,1400,900)}') center / cover`,orbs:null};let n={aurora:{bg:`radial-gradient(45% 55% at 18% 25%, #f43f5e, transparent 70%), radial-gradient(40% 50% at 85% 20%, #8b5cf6, transparent 70%), radial-gradient(55% 60% at 60% 95%, #06b6d4, transparent 70%), #120a24`,orbs:[`linear-gradient(135deg, #fb7185, #a855f7)`,`linear-gradient(135deg, #22d3ee, #3b82f6)`]},sunset:{bg:`radial-gradient(50% 60% at 20% 20%, #fb923c, transparent 70%), radial-gradient(45% 55% at 85% 35%, #ec4899, transparent 70%), radial-gradient(60% 50% at 50% 100%, #7c3aed, transparent 70%), #2a0f1f`,orbs:[`linear-gradient(135deg, #fde047, #f97316)`,`linear-gradient(135deg, #f472b6, #9333ea)`]},ocean:{bg:`radial-gradient(50% 60% at 15% 30%, #14b8a6, transparent 70%), radial-gradient(45% 55% at 85% 25%, #3b82f6, transparent 70%), radial-gradient(60% 50% at 55% 100%, #22d3ee, transparent 70%), #04202b`,orbs:[`linear-gradient(135deg, #5eead4, #0ea5e9)`,`linear-gradient(135deg, #818cf8, #1d4ed8)`]},midnight:{bg:`radial-gradient(40% 50% at 25% 30%, #4338ca, transparent 70%), radial-gradient(35% 45% at 80% 70%, #0e7490, transparent 70%), #05060c`,orbs:[`linear-gradient(135deg, #6366f1, #312e81)`,`linear-gradient(135deg, #14b8a6, #164e63)`]}};return n[e]??n.aurora}function L(e){return e.ink===`light`?`#ffffff`:e.ink===`dark`||e.tintOpacity>=45&&b(e.tint)===`#18181b`?`#18181b`:`#ffffff`}function R(e){let t=e.style===`clear`?Math.min(e.tintOpacity,8):e.style===`acrylic`?Math.max(e.tintOpacity,22):e.tintOpacity,n=`blur(${e.style===`clear`?Math.min(e.blur,6):e.blur}px) saturate(${e.style===`liquid`?Math.max(e.saturate,180):e.saturate}%) brightness(${e.brightness}%)`,r=e.shadow/100,i=r?`0 ${Math.round(8+r*24)}px ${Math.round(24+r*56)}px rgb(0 0 0 / ${(.1+r*.3).toFixed(2)})`:``,a=e.style===`liquid`?0:e.border/100,o=[e.style===`liquid`?`inset 0 1px 1px rgb(255 255 255 / 0.55), inset 0 -1px 1px rgb(255 255 255 / 0.18), inset 0 0 0 1px rgb(255 255 255 / 0.12)`:``,i].filter(Boolean).join(`, `),s=`  background: ${P(e.tint,t/100)};
  -webkit-backdrop-filter: ${n};
  backdrop-filter: ${n};
  border: 1px solid ${P(`#ffffff`,a)};${o?`\n  box-shadow: ${o};`:``}`,c=e.style===`acrylic`?Math.max(e.grain,30):e.grain,l=c?`radial-gradient(circle at 23% 31%, rgb(255 255 255 / 0.5) 0.6px, transparent 1px) 0 0 / 3px 3px,
    radial-gradient(circle at 71% 77%, rgb(0 0 0 / 0.45) 0.6px, transparent 1px) 0 0 / 5px 5px,
    radial-gradient(circle at 41% 63%, rgb(255 255 255 / 0.4) 0.6px, transparent 1px) 0 0 / 7px 7px`:``,u=e.style===`liquid`?`linear-gradient(135deg, rgb(255 255 255 / 0.32), transparent 38%, transparent 70%, rgb(255 255 255 / 0.1))`:``,d=[u,l].filter(Boolean);return{body:s,before:d.length?`.glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: ${d.join(`,
    `)};
  opacity: ${c&&!u?(c/100).toFixed(2):1};
  mix-blend-mode: ${u?`screen`:`overlay`};
  pointer-events: none;
}`:``}}function z(e,t,n,r){let i=e.radius,a=Math.max(6,i-10);return`${`.glass-btn {
  ${`display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  padding: 0 1.1rem;
  border: 1px solid ${r};
  border-radius: ${Math.min(a,999)}px;
  color: inherit;
  font: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;`}
  background: ${P(t===`#ffffff`?`#ffffff`:`#000000`,.08)};
  transition: background-color 150ms ease-out, scale 120ms ease-out;
}

.glass-btn.primary {
  border-color: transparent;
  background: ${e.accent};
  color: ${b(e.accent)};
}

.glass-btn:active {
  scale: 0.97;
}

.glass-btn:focus-visible,
.glass-input:focus-visible {
  outline: 2px solid ${t};
  outline-offset: 2px;
}

.glass-muted {
  color: ${n};
}`}\n\n${{card:`.glass-avatar {
  display: grid;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, ${P(`#ffffff`,.5)}, ${P(`#ffffff`,.1)});
  box-shadow: inset 0 0 0 1px ${r};
  font-weight: 700;
}

.glass-name {
  margin: 0.75rem 0 0;
  font-size: 1.25rem;
  font-weight: 650;
  letter-spacing: -0.01em;
}

.glass-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 1.25rem 0;
  padding: 0.9rem 0;
  border-block: 1px solid ${r};
  text-align: center;
}

.glass-stats div {
  display: flex;
  flex-direction: column-reverse;
  gap: 0.15rem;
}

.glass-stats dt,
.glass-stats dd {
  margin: 0;
}

.glass-stats strong {
  display: block;
  font-size: 1.1rem;
}

.glass-stats span {
  font-size: 0.75rem;
  color: ${n};
}

.glass-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
}`,creditcard:`.glass.creditcard {
  aspect-ratio: 1.586;
  display: grid;
  grid-template-rows: auto 1fr auto auto;
  padding: 1.5rem 1.6rem;
}

.cc-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.cc-chip {
  align-self: center;
  width: 2.75rem;
  height: 2rem;
  border-radius: 6px;
  background:
    linear-gradient(90deg, transparent 32%, rgb(0 0 0 / 0.18) 32% 34%, transparent 34% 66%, rgb(0 0 0 / 0.18) 66% 68%, transparent 68%),
    linear-gradient(0deg, transparent 45%, rgb(0 0 0 / 0.18) 45% 55%, transparent 55%),
    linear-gradient(135deg, #fde68a, #d97706);
}

.cc-number {
  margin: 0 0 0.9rem;
  font: 600 1.2rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
  letter-spacing: 0.12em;
}

.cc-foot {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  font-weight: 600;
}

.cc-foot small {
  display: block;
  margin-bottom: 0.15rem;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${n};
}`,player:`.player-art {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 11;
  object-fit: cover;
  border-radius: ${a}px;
  box-shadow: 0 12px 30px rgb(0 0 0 / 0.3);
}

.player-title {
  margin: 1rem 0 0.1rem;
  font-size: 1.1rem;
  font-weight: 650;
}

.player-track {
  height: 0.3rem;
  margin: 1rem 0 0.4rem;
  border-radius: 999px;
  background: linear-gradient(90deg, ${t} 38%, ${r} 38%);
}

.player-times {
  display: flex;
  justify-content: space-between;
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  color: ${n};
}

.player-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.75rem;
  margin-top: 0.75rem;
}

.player-controls button {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 0;
  border-radius: 50%;
  background: none;
  color: inherit;
  cursor: pointer;
}

.player-controls button::before {
  content: '';
  width: 1.1rem;
  height: 1rem;
  background: currentColor;
}

.player-controls .prev::before {
  clip-path: polygon(0 0, 12% 0, 12% 45%, 56% 0, 56% 45%, 100% 0, 100% 100%, 56% 55%, 56% 100%, 12% 55%, 12% 100%, 0 100%);
  rotate: 180deg;
}

.player-controls .next::before {
  clip-path: polygon(0 0, 44% 45%, 44% 0, 88% 45%, 88% 0, 100% 0, 100% 100%, 88% 100%, 88% 55%, 44% 100%, 44% 55%, 0 100%);
}

.player-controls .play {
  width: 3.5rem;
  height: 3.5rem;
  background: ${t};
  color: ${t===`#ffffff`?`#18181b`:`#ffffff`};
}

.player-controls .play::before {
  width: 0.9rem;
  height: 1.1rem;
  background: linear-gradient(90deg, currentColor 35%, transparent 35% 65%, currentColor 65%);
}`,weather:`.wx-place {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.wx-temp {
  margin: 0.25rem 0 0;
  font-size: 4rem;
  font-weight: 250;
  line-height: 1;
  letter-spacing: -0.04em;
}

.wx-hours {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin: 1.25rem 0 0;
  padding: 0.9rem 0 0;
  border-top: 1px solid ${r};
  list-style: none;
  text-align: center;
  font-size: 0.85rem;
}

.wx-hours span {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 0.72rem;
  color: ${n};
}`,login:`.glass-title {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 650;
  letter-spacing: -0.02em;
}

.glass-field {
  display: grid;
  gap: 0.4rem;
  margin-top: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
}

.glass-input {
  height: 2.75rem;
  padding: 0 0.85rem;
  border: 1px solid ${r};
  border-radius: ${a}px;
  background: ${P(t===`#ffffff`?`#ffffff`:`#000000`,.08)};
  color: inherit;
  font: inherit;
  font-size: 0.95rem;
  font-weight: 400;
}

.glass-input::placeholder {
  color: ${n};
}

.glass.login .glass-btn {
  width: 100%;
  margin-top: 1.25rem;
}`,notification:`.glass-stack {
  display: grid;
  gap: 0.6rem;
  width: min(${e.width+40}px, 100%);
}

.glass.note {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.25rem 0.75rem;
  padding: 0.9rem 1rem;
}

.note-icon {
  grid-row: span 2;
  display: grid;
  place-items: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 10px;
  background: ${e.accent};
  color: ${b(e.accent)};
  font-weight: 700;
}

.note-title {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 650;
}

.note-time {
  font-size: 0.75rem;
  color: ${n};
}

.note-text {
  grid-column: 2 / 4;
  margin: 0;
  font-size: 0.85rem;
  color: ${n};
}`,stats:`.stat-label {
  margin: 0;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${n};
}

.stat-value {
  margin: 0.4rem 0 0.2rem;
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
}

.stat-delta {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background: ${P(`#22c55e`,.22)};
  font-size: 0.75rem;
  font-weight: 600;
}

.stat-bars {
  display: flex;
  align-items: end;
  gap: 0.35rem;
  height: 4.5rem;
  margin-top: 1.25rem;
}

.stat-bars span {
  flex: 1;
  height: var(--h);
  border-radius: 4px 4px 2px 2px;
  background: ${P(t===`#ffffff`?`#ffffff`:`#000000`,.25)};
}

.stat-bars span:last-child {
  background: ${e.accent};
}`,nav:`.glass.nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: min(${Math.max(e.width,640)}px, 100%);
  padding: 0.6rem 0.6rem 0.6rem 1.25rem;
}

.nav-logo {
  font-weight: 750;
  letter-spacing: -0.02em;
}

.nav-links {
  display: flex;
  gap: 1.25rem;
  margin: 0 auto 0 0;
  padding: 0;
  list-style: none;
  font-size: 0.9rem;
}

.nav-links a {
  color: ${n};
  text-decoration: none;
}

.nav-links a[aria-current='page'],
.nav-links a:hover {
  color: ${t};
}`}[e.layout]}`}function B(e){let t=N(e),n=L(t),r=n===`#ffffff`?`rgb(255 255 255 / 0.72)`:`rgb(24 24 27 / 0.68)`,i=n===`#ffffff`?`rgb(255 255 255 / 0.22)`:`rgb(24 24 27 / 0.16)`,a=I(t.backdrop),o=R(t),s=t.edgeHighlight&&t.style!==`liquid`?`/* Light catching the top-left edge: gradient ring cut out with mask-composite. */
.glass::after {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: inherit;
  background: linear-gradient(135deg, rgb(255 255 255 / 0.7), rgb(255 255 255 / 0.05) 40%, rgb(255 255 255 / 0.05) 70%, rgb(255 255 255 / 0.35));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
  pointer-events: none;
}`:``,c=a.orbs?`

.glass-scene::before,
.glass-scene::after {
  content: '';
  position: absolute;
  z-index: -1;
  border-radius: 50%;
}

.glass-scene::before {
  width: 13rem;
  height: 13rem;
  top: calc(50% - 10rem);
  left: calc(50% - 13rem);
  background: ${a.orbs[0]};
}

.glass-scene::after {
  width: 10rem;
  height: 10rem;
  bottom: calc(50% - 9rem);
  right: calc(50% - 11rem);
  background: ${a.orbs[1]};
}`:``;return`.glass-scene {
  position: relative;
  isolation: isolate;
  display: grid;
  place-items: ${t.layout===`nav`?`start center`:`center`};
  min-height: 28rem;
  padding: 3rem 1.5rem;
  overflow: hidden;
  border-radius: 24px;
  background: ${a.bg};
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
}${c}

.glass {
  position: relative;
  width: min(${t.width}px, 100%);
  padding: 1.5rem;
  border-radius: ${t.layout===`nav`?Math.min(t.radius,999):t.radius}px;
  color: ${n};
${o.body}
}

${o.before}

${s}

/* Without backdrop-filter support, or when the user asks for less transparency, go near-solid. */
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .glass { background: ${P(n===`#ffffff`?`#18181b`:`#ffffff`,.85)}; }
}

@media (prefers-reduced-transparency: reduce) {
  .glass {
    background: ${P(n===`#ffffff`?`#18181b`:`#ffffff`,.92)};
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }
}

@media (prefers-contrast: more) {
  .glass { border-color: ${n}; }
}

${z(t,n,r,i)}`.replace(/\n{3,}/g,`

`)}function V(e){let t=N(e);return`<div class="glass-scene">\n${{card:`  <article class="glass">
    <div class="glass-avatar" aria-hidden="true">MC</div>
    <h2 class="glass-name">Maya Chen</h2>
    <p class="glass-muted" style="margin:0.15rem 0 0">Product designer · Lisbon</p>
    <dl class="glass-stats">
      <div><dt><span>Projects</span></dt><dd><strong>48</strong></dd></div>
      <div><dt><span>Followers</span></dt><dd><strong>2.1k</strong></dd></div>
      <div><dt><span>Following</span></dt><dd><strong>312</strong></dd></div>
    </dl>
    <div class="glass-actions">
      <button class="glass-btn primary" type="button">Follow</button>
      <button class="glass-btn" type="button">Message</button>
    </div>
  </article>`,creditcard:`  <div class="glass creditcard" role="img" aria-label="Northwind Bank card ending 5512">
    <div class="cc-top"><span>Northwind</span><span class="glass-muted">Platinum</span></div>
    <span class="cc-chip" aria-hidden="true"></span>
    <p class="cc-number">4821 7730 0193 5512</p>
    <div class="cc-foot">
      <div><small>Card holder</small>Maya Chen</div>
      <div><small>Expires</small>09/29</div>
    </div>
  </div>`,player:`  <article class="glass" aria-label="Now playing">
    <img class="player-art" src="${w(`valley`,640,440)}" alt="${T(`valley`)}" width="640" height="440" />
    <h2 class="player-title">Slow Morning</h2>
    <p class="glass-muted" style="margin:0">Lumen Fields</p>
    <div class="player-track" role="progressbar" aria-label="Playback position" aria-valuenow="38" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="player-times"><span>1:24</span><span>3:51</span></div>
    <div class="player-controls">
      <button class="prev" type="button" aria-label="Previous track"></button>
      <button class="play" type="button" aria-label="Pause"></button>
      <button class="next" type="button" aria-label="Next track"></button>
    </div>
  </article>`,weather:`  <article class="glass" aria-label="Weather in Lisbon">
    <p class="wx-place">Lisbon</p>
    <p class="wx-temp">21&deg;</p>
    <p style="margin:0.4rem 0 0">Partly cloudy</p>
    <p class="glass-muted" style="margin:0.15rem 0 0">H 24&deg; · L 15&deg;</p>
    <ul class="wx-hours">
      <li><span>Now</span>21&deg;</li>
      <li><span>15:00</span>22&deg;</li>
      <li><span>16:00</span>22&deg;</li>
      <li><span>17:00</span>21&deg;</li>
      <li><span>18:00</span>19&deg;</li>
    </ul>
  </article>`,login:`  <form class="glass login" action="#">
    <h2 class="glass-title">Welcome back</h2>
    <p class="glass-muted" style="margin:0.3rem 0 0">Sign in to your Northwind workspace.</p>
    <label class="glass-field">Email
      <input class="glass-input" type="email" placeholder="name@company.com" autocomplete="email" />
    </label>
    <label class="glass-field">Password
      <input class="glass-input" type="password" autocomplete="current-password" />
    </label>
    <button class="glass-btn primary" type="submit">Sign in</button>
  </form>`,notification:`  <div class="glass-stack">
    <div class="glass note">
      <span class="note-icon" aria-hidden="true">N</span>
      <p class="note-title">Deploy finished</p>
      <span class="note-time">now</span>
      <p class="note-text">dashboard@a3f9c2 is live on production.</p>
    </div>
    <div class="glass note">
      <span class="note-icon" aria-hidden="true">C</span>
      <p class="note-title">Design review</p>
      <span class="note-time">9:41</span>
      <p class="note-text">Starts in 10 minutes in Room 4B.</p>
    </div>
  </div>`,stats:`  <article class="glass">
    <p class="stat-label">Monthly revenue</p>
    <p class="stat-value">$48,210</p>
    <span class="stat-delta">+12.4% vs last month</span>
    <div class="stat-bars" role="img" aria-label="Revenue for the last 8 months, rising">
      <span style="--h:38%"></span><span style="--h:52%"></span><span style="--h:44%"></span><span style="--h:61%"></span>
      <span style="--h:57%"></span><span style="--h:70%"></span><span style="--h:66%"></span><span style="--h:88%"></span>
    </div>
  </article>`,nav:`  <nav class="glass nav" aria-label="Main">
    <span class="nav-logo">Northwind</span>
    <ul class="nav-links">
      <li><a href="#" aria-current="page">Product</a></li>
      <li><a href="#">Pricing</a></li>
      <li><a href="#">Docs</a></li>
      <li><a href="#">Changelog</a></li>
    </ul>
    <a class="glass-btn primary" href="#" style="text-decoration:none">Sign in</a>
  </nav>`}[t.layout]}\n</div>`}function H(e){let t=N(e);return{"--glass-tint":P(t.tint,t.tintOpacity/100),"--glass-blur":`${t.blur}px`,"--glass-radius":`${t.radius}px`}}function U(e,t){let n=Math.floor(t.range(0,360)),r=t.chance(.25);return{...N(e),style:t.pick(E.map(e=>e.value)),layout:t.pick(D.map(e=>e.value)),backdrop:t.pick(O.map(e=>e.value)),tint:r?`#0b0b10`:t.chance(.7)?`#ffffff`:x({h:n,s:70,l:65}),tintOpacity:Math.round(r?t.range(30,50):t.range(8,24)),blur:Math.round(t.range(10,30)),saturate:Math.round(t.range(130,200)),radius:t.pick([16,20,24,28]),border:Math.round(t.range(15,45)),edgeHighlight:t.chance(.7),shadow:Math.round(t.range(20,60)),accent:t.chance(.5)?`#ffffff`:x({h:(n+180)%360,s:80,l:60})}}var W=e=>({...A,...e}),G=[{name:`Profile Card`,tags:[`card`],state:W({})},{name:`Credit Card`,tags:[`card`],state:W({layout:`creditcard`,width:380,radius:20,backdrop:`sunset`,tintOpacity:16})},{name:`Liquid Player`,tags:[`liquid`],state:W({layout:`player`,style:`liquid`,width:300,radius:32,backdrop:`ocean`,tintOpacity:10,blur:22})},{name:`Weather Widget`,tags:[`widget`],state:W({layout:`weather`,width:320,radius:28,backdrop:`fjord`,tintOpacity:18,blur:24})},{name:`Sign In Panel`,tags:[`form`],state:W({layout:`login`,width:360,backdrop:`city`,tint:`#0b0b10`,tintOpacity:38,blur:24,border:18,accent:`#ffffff`})},{name:`Notifications`,tags:[`ios`],state:W({layout:`notification`,width:340,radius:20,backdrop:`valley`,tintOpacity:22,blur:24,accent:`#10b981`,edgeHighlight:!1})},{name:`Revenue Tile`,tags:[`dashboard`],state:W({layout:`stats`,width:320,backdrop:`midnight`,tint:`#0b0b10`,tintOpacity:35,accent:`#34d399`,border:18})},{name:`Floating Nav`,tags:[`nav`],state:W({layout:`nav`,radius:999,backdrop:`aurora`,tintOpacity:12,accent:`#ffffff`,width:640})},{name:`Liquid Card`,tags:[`liquid`],state:W({style:`liquid`,radius:32,backdrop:`sunset`,tintOpacity:8,blur:20})},{name:`Liquid Weather`,tags:[`liquid`,`widget`],state:W({layout:`weather`,style:`liquid`,radius:36,backdrop:`valley`,tintOpacity:8,width:320})},{name:`Acrylic Login`,tags:[`acrylic`,`form`],state:W({layout:`login`,style:`acrylic`,backdrop:`aurora`,tintOpacity:24,grain:40,width:360})},{name:`Acrylic Stats`,tags:[`acrylic`],state:W({layout:`stats`,style:`acrylic`,backdrop:`ocean`,tintOpacity:26,grain:45,accent:`#fde047`,width:320})},{name:`Clear Card`,tags:[`clear`],state:W({style:`clear`,backdrop:`fjord`,border:45,shadow:20})},{name:`Dark Glass`,tags:[`dark`],state:W({tint:`#09090b`,tintOpacity:45,border:14,backdrop:`city`,accent:`#a78bfa`})},{name:`Light Frost`,tags:[`light`],state:W({layout:`login`,tint:`#ffffff`,tintOpacity:62,ink:`dark`,backdrop:`ocean`,accent:`#0f766e`,width:360,edgeHighlight:!1,border:60})},{name:`Emerald Tint`,tags:[`tinted`],state:W({layout:`stats`,tint:`#34d399`,tintOpacity:18,border:40,backdrop:`midnight`,accent:`#a7f3d0`,width:320})},{name:`Rose Credit Card`,tags:[`tinted`,`card`],state:W({layout:`creditcard`,tint:`#f43f5e`,tintOpacity:20,backdrop:`midnight`,width:380,radius:18})},{name:`Sunset Player`,tags:[`player`],state:W({layout:`player`,backdrop:`sunset`,width:300,radius:28,tintOpacity:16})}],K=[`innerHTML`],q={class:`flex h-full w-full items-center justify-center p-6`},J=[`innerHTML`],Y=n({__name:`glass`,setup(n){let{state:y,randomize:b,reset:x,undo:w,redo:T,pushHistory:j,shareUrlRef:M}=g({id:`glass`,defaultState:JSON.parse(JSON.stringify(A)),randomize:U,deserialize:e=>N(e)}),P=r(`editor:shareUrl`,()=>{});s(()=>P(M.value));let F=i(()=>B(y.value)),I=i(()=>V(y.value)),L=i(()=>H(y.value)),R=i(()=>`<style>${F.value}</style>`);function z(e){y.value=JSON.parse(JSON.stringify(G[e].state)),j()}let W=i(()=>G.map(e=>({name:e.name,css:B(e.state),html:V(e.state)})));return(n,r)=>{let i=h,s=d,g=_,A=f,j=m,M=S,N=v,P=C,B=p;return o(),l(B,{title:`Glassmorphism Generator`,description:`Frosted, liquid, acrylic and clear glass components over photo and colour backdrops.`,css:u(F),html:u(I),vars:u(L),onRandomize:u(b),onReset:u(x),onUndo:u(w),onRedo:u(T)},{preview:c(()=>[e(s,{variants:u(W),title:`Glass preview`,filename:`css-studio-glass`,onApplyVariant:z},{presets:c(()=>[e(i,{presets:u(G),onApply:z},null,8,[`presets`])]),default:c(()=>[t(`div`,{innerHTML:u(R),"aria-hidden":`true`},null,8,K),t(`div`,q,[t(`div`,{class:`w-full max-w-3xl`,innerHTML:u(I)},null,8,J)])]),_:1},8,[`variants`])]),controls:c(()=>[e(j,{label:`Component`,icon:`ph-layout`},{default:c(()=>[e(g,{modelValue:u(y).layout,"onUpdate:modelValue":r[0]||=e=>u(y).layout=e,label:`Layout`,options:u(D)},null,8,[`modelValue`,`options`]),e(g,{modelValue:u(y).backdrop,"onUpdate:modelValue":r[1]||=e=>u(y).backdrop=e,label:`Backdrop`,options:u(O)},null,8,[`modelValue`,`options`]),e(A,{modelValue:u(y).width,"onUpdate:modelValue":r[2]||=e=>u(y).width=e,label:`Width`,min:260,max:720,step:10,suffix:`px`},null,8,[`modelValue`]),e(A,{modelValue:u(y).radius,"onUpdate:modelValue":r[3]||=e=>u(y).radius=e,label:`Corner radius`,min:0,max:48,suffix:`px`},null,8,[`modelValue`])]),_:1}),e(j,{label:`Glass`,icon:`ph-drop-half`},{default:c(()=>[e(g,{modelValue:u(y).style,"onUpdate:modelValue":r[4]||=e=>u(y).style=e,label:`Material`,options:u(E)},null,8,[`modelValue`,`options`]),e(M,{"model-value":u(y).tint,label:`Tint`,"onUpdate:modelValue":r[5]||=e=>u(y).tint=e},null,8,[`model-value`]),e(A,{modelValue:u(y).tintOpacity,"onUpdate:modelValue":r[6]||=e=>u(y).tintOpacity=e,label:`Tint opacity`,min:0,max:80,suffix:`%`},null,8,[`modelValue`]),e(A,{modelValue:u(y).blur,"onUpdate:modelValue":r[7]||=e=>u(y).blur=e,label:`Backdrop blur`,min:0,max:48,suffix:`px`},null,8,[`modelValue`]),e(A,{modelValue:u(y).saturate,"onUpdate:modelValue":r[8]||=e=>u(y).saturate=e,label:`Saturate`,min:50,max:250,suffix:`%`},null,8,[`modelValue`]),e(A,{modelValue:u(y).brightness,"onUpdate:modelValue":r[9]||=e=>u(y).brightness=e,label:`Brightness`,min:50,max:160,suffix:`%`},null,8,[`modelValue`]),e(A,{modelValue:u(y).grain,"onUpdate:modelValue":r[10]||=e=>u(y).grain=e,label:`Grain`,min:0,max:80,suffix:`%`},null,8,[`modelValue`])]),_:1}),e(j,{label:`Edges & depth`,icon:`ph-square-half`},{default:c(()=>[u(y).style===`liquid`?a(``,!0):(o(),l(A,{key:0,modelValue:u(y).border,"onUpdate:modelValue":r[11]||=e=>u(y).border=e,label:`Border opacity`,min:0,max:100,suffix:`%`},null,8,[`modelValue`])),u(y).style===`liquid`?a(``,!0):(o(),l(N,{key:1,modelValue:u(y).edgeHighlight,"onUpdate:modelValue":r[12]||=e=>u(y).edgeHighlight=e,label:`Edge highlight`},null,8,[`modelValue`])),e(A,{modelValue:u(y).shadow,"onUpdate:modelValue":r[13]||=e=>u(y).shadow=e,label:`Shadow`,min:0,max:100,suffix:`%`},null,8,[`modelValue`])]),_:1}),e(j,{label:`Content`,icon:`ph-palette`},{default:c(()=>[e(g,{modelValue:u(y).ink,"onUpdate:modelValue":r[14]||=e=>u(y).ink=e,label:`Text color`,options:u(k)},null,8,[`modelValue`,`options`]),e(M,{"model-value":u(y).accent,label:`Button accent`,"onUpdate:modelValue":r[15]||=e=>u(y).accent=e},null,8,[`model-value`])]),_:1})]),code:c(()=>[e(P,{css:u(F),html:u(I),vars:u(L),filename:`css-studio-glass`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{Y as default};