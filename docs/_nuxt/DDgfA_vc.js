import{A as e,C as t,E as n,M as r,R as i,S as a,T as o,X as s,_t as c,ct as l,k as u,lt as d,w as f,wt as p}from"./MitKKUeq.js";import{s as m}from"#entry";import{a as h,i as g,n as _,r as v,s as ee,t as y}from"./BPBkcUFJ.js";import{t as te}from"./D3e07OzS.js";import{t as b}from"./Dh2B6pZ8.js";import{c as x,l as S,s as C}from"./Rl_HAT4u.js";import{t as w}from"./BYmGHvE7.js";import{t as T}from"./Cw1rlFxN.js";import{i as E,r as D}from"./tf7vSe8Z.js";var O=[{value:`confirm`,label:`Confirm (destructive)`,placement:`center`},{value:`typeConfirm`,label:`Type to confirm`,placement:`center`},{value:`form`,label:`Form (invite)`,placement:`center`},{value:`signin`,label:`Sign in`,placement:`center`},{value:`success`,label:`Success`,placement:`center`},{value:`promo`,label:`Announcement with image`,placement:`center`},{value:`onboarding`,label:`Onboarding step`,placement:`center`},{value:`upgrade`,label:`Upgrade / pricing`,placement:`center`},{value:`feedback`,label:`Feedback rating`,placement:`center`},{value:`timeout`,label:`Session timeout`,placement:`center`},{value:`command`,label:`Command palette`,placement:`top`},{value:`lightbox`,label:`Image lightbox`,placement:`center`},{value:`share`,label:`Share sheet`,placement:`bottom`},{value:`filters`,label:`Filters drawer`,placement:`right`},{value:`cookie`,label:`Cookie consent`,placement:`bottom`}],k=[{value:`center`,label:`Centered dialog`},{value:`top`,label:`Top (palette)`},{value:`bottom`,label:`Bottom sheet`},{value:`right`,label:`Side drawer`}],A=[{value:`solid`,label:`Solid`},{value:`elevated`,label:`Elevated`},{value:`minimal`,label:`Minimal hairline`},{value:`glass`,label:`Glass`},{value:`glow`,label:`Accent glow`},{value:`gradient`,label:`Gradient border`},{value:`outline`,label:`Outline`},{value:`brutal`,label:`Neo-brutal`}],j=[{value:`ring`,label:`Soft ring`},{value:`soft`,label:`Tinted`},{value:`solid`,label:`Solid`}],M=[{value:`inline`,label:`Inline buttons`},{value:`bar`,label:`Footer bar`}],N={kind:`confirm`,placement:`center`,skin:`solid`,accent:`#f43f5e`,bg:`#18181b`,textColor:`#fafafa`,overlayColor:`#09090b`,overlayOpacity:65,blur:!0,radius:16,width:420,duration:240,scaleFrom:96,showClose:!0,showIcon:!0,iconStyle:`ring`,footer:`inline`},P=/^#[0-9a-f]{6}$/i,F=(e,t,n)=>t.some(t=>t.value===e)?e:n;function I(e){let t={...N,...e},n=e.skin;return n===`sheet`&&(t.placement=`bottom`),t.kind=F(t.kind,O,`confirm`),t.placement=F(t.placement,k,`center`),t.skin=F(n===`dialog`?`outline`:t.skin,A,`solid`),t.iconStyle=F(t.iconStyle,j,`ring`),t.footer=F(t.footer,M,`inline`),P.test(t.overlayColor)||(t.overlayColor=`#09090b`),P.test(t.bg)||(t.bg=N.bg),P.test(t.textColor)||(t.textColor=S(t.bg)),P.test(t.accent)||(t.accent=N.accent),t}var L=(e,t)=>`color-mix(in srgb, ${e} ${Math.round(t*100)}%, transparent)`;function R(e){let t=e.textColor;switch(e.skin){case`elevated`:return`  background: ${e.bg};
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.08), 0 8px 24px rgb(0 0 0 / 0.18), 0 32px 80px rgb(0 0 0 / 0.28);`;case`glass`:return`  background: ${L(e.bg,.72)};
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  backdrop-filter: blur(20px) saturate(160%);
  box-shadow: inset 0 0 0 1px ${L(`#ffffff`,.14)}, 0 30px 80px rgb(0 0 0 / 0.35);`;case`minimal`:return`  background: ${e.bg};
  box-shadow: inset 0 0 0 1px ${L(t,.14)}, 0 12px 32px rgb(0 0 0 / 0.12);`;case`glow`:return`  background: radial-gradient(120% 70% at 50% 0%, ${L(e.accent,.22)}, transparent 60%), ${e.bg};
  box-shadow: inset 0 0 0 1px ${L(e.accent,.3)}, 0 30px 90px ${L(e.accent,.22)};`;case`gradient`:return`  border: 1.5px solid transparent;
  background:
    linear-gradient(${e.bg}, ${e.bg}) padding-box,
    linear-gradient(135deg, ${e.accent}, ${L(e.accent,.1)} 45%, ${x(e.accent,t,.45)}) border-box;
  box-shadow: 0 28px 72px rgb(0 0 0 / 0.35);`;case`outline`:return`  background: ${e.bg};
  box-shadow: inset 0 0 0 1.5px ${L(e.accent,.55)}, 0 24px 64px rgb(0 0 0 / 0.3);`;case`brutal`:return`  background: ${e.bg};
  box-shadow: inset 0 0 0 2px ${t}, 6px 6px 0 ${t};`;default:return`  background: ${e.bg};
  box-shadow: inset 0 0 0 1px ${L(t,.1)}, 0 24px 64px rgb(0 0 0 / 0.45);`}}function z(e,t){let n=(e.scaleFrom/100).toFixed(2);switch(e.placement){case`bottom`:return{box:`  inset: auto 0 0;
  width: 100%;
  max-width: ${Math.max(e.width,480)}px;
  margin: 0 auto;
  border-radius: ${t}px ${t}px 0 0;
  padding-bottom: max(1.5rem, env(safe-area-inset-bottom));`,hidden:`translate: 0 100%;`,scrim:`align-items: end; justify-items: center; padding: 1.5rem 1.5rem 0;`};case`top`:return{box:`  inset: 12vh 0 auto;
  width: min(${e.width}px, calc(100% - 2rem));
  max-height: 70vh;
  margin: 0 auto;
  border-radius: ${t}px;`,hidden:`opacity: 0;\n    scale: ${n};\n    translate: 0 -12px;`,scrim:`align-items: start; justify-items: center; padding: 3rem 1.5rem 1.5rem;`};case`right`:return{box:`  inset: 0 0 0 auto;
  width: min(${Math.min(e.width,400)}px, 100%);
  height: 100dvh;
  max-height: 100dvh;
  margin: 0;
  border-radius: ${t}px 0 0 ${t}px;
  display: flex;
  flex-direction: column;`,hidden:`translate: 100% 0;`,scrim:`align-items: stretch; justify-items: end; padding: 0;`};default:return{box:`  width: min(${e.width}px, calc(100% - 2rem));
  margin: auto;
  border-radius: ${t}px;`,hidden:`opacity: 0;\n    scale: ${n};\n    translate: 0 8px;`,scrim:`place-items: center; padding: 1.5rem;`}}}function B(e){let t=I(e),n=t.skin===`brutal`?Math.min(t.radius,8):t.radius,r=t.textColor,i=x(r,t.bg,.35),a=L(r,.12),o=S(t.accent,`#111113`,`#ffffff`),s=z(t,n),c=t.duration,l=Math.min(n,10),u=t.skin===`brutal`;return`/* Opens with <button popovertarget="…"> — no JavaScript. Esc and outside click close it. */
.modal {
  position: fixed;
  ${s.box.trim()}
  box-sizing: border-box;
  padding: 1.5rem;
  border: 0;
  color: ${r};
  font: 400 15px/1.5 system-ui, -apple-system, 'Segoe UI', sans-serif;
  overflow: auto;
${R(t)}
  transition:
    opacity ${c}ms ease-out,
    scale ${c}ms cubic-bezier(0.22, 1, 0.36, 1),
    translate ${c}ms cubic-bezier(0.22, 1, 0.36, 1),
    overlay ${c}ms allow-discrete,
    display ${c}ms allow-discrete;
}

.modal:not(:popover-open) {
  ${s.hidden}
}

@starting-style {
  .modal:popover-open {
    ${s.hidden}
  }
}

.modal::backdrop {
  background: ${L(t.overlayColor,t.overlayOpacity/100)};${t.blur?`
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);`:``}
  opacity: 0;
  transition: opacity ${c}ms ease-out, overlay ${c}ms allow-discrete, display ${c}ms allow-discrete;
}

.modal:popover-open::backdrop {
  opacity: 1;
}

@starting-style {
  .modal:popover-open::backdrop {
    opacity: 0;
  }
}

.modal-head {
  display: flex;
  gap: 0.875rem;
  align-items: flex-start;
  padding-right: ${t.showClose?`2rem`:`0`};
}

.modal-icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${u?`6px`:`50%`};
  background: ${t.iconStyle===`solid`?t.accent:L(t.accent,.15)};
  color: ${t.iconStyle===`solid`?o:t.accent};${t.iconStyle===`ring`?`\n  box-shadow: 0 0 0 6px ${L(t.accent,.08)};\n  margin: 6px 4px 0 6px;`:``}
  font-weight: 700;
  font-size: 1.1rem;
}

.modal-check {
  position: relative;
}

.modal-check::after {
  content: '';
  width: 0.55rem;
  height: 1rem;
  margin-top: -0.2rem;
  border: solid currentColor;
  border-width: 0 2.5px 2.5px 0;
  rotate: 45deg;
}

.modal-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 650;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.modal-desc {
  margin: 0.375rem 0 0;
  font-size: 0.9rem;
  color: ${i};
}

.modal-eyebrow {
  margin: 0 0 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${t.accent};
}

.modal-body {
  display: grid;
  gap: 1rem;
  margin-top: 1.25rem;
}

.modal-media {
  display: block;
  width: calc(100% + 3rem);
  max-width: none;
  height: auto;
  aspect-ratio: 2 / 1;
  margin: -1.5rem -1.5rem 1.25rem;
  object-fit: cover;
  border-radius: ${n}px ${n}px 0 0;
}

.modal-field {
  display: grid;
  gap: 0.375rem;
}

.modal-field label,
.modal-group legend {
  font-size: 0.8rem;
  font-weight: 600;
}

.modal-input {
  height: 2.5rem;
  padding: 0 0.75rem;
  border: 1px solid ${L(r,.18)};
  border-radius: ${l}px;
  background: ${L(r,.04)};
  color: inherit;
  font: inherit;
}

.modal-input:focus {
  outline: 2px solid ${t.accent};
  outline-offset: 1px;
}

.modal-help {
  font-size: 0.8rem;
  color: ${i};
}

.modal-row {
  display: flex;
  gap: 0.5rem;
}

.modal-row .modal-input {
  flex: 1;
  min-width: 0;
}

.modal-price {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.modal-price span {
  font-size: 0.9rem;
  font-weight: 500;
  color: ${i};
}

.modal-list {
  display: grid;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.9rem;
}

.modal-list li {
  display: flex;
  gap: 0.6rem;
  align-items: center;
}

.modal-list li::before {
  content: '';
  flex: none;
  width: 0.35rem;
  height: 0.65rem;
  margin: 0 0.3rem 0.15rem;
  border: solid ${t.accent};
  border-width: 0 2px 2px 0;
  rotate: 45deg;
}

.modal-group {
  display: grid;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  border: 0;
}

.modal-option {
  display: flex;
  gap: 0.6rem;
  align-items: center;
  font-size: 0.9rem;
}

.modal-option input {
  width: 1rem;
  height: 1rem;
  accent-color: ${t.accent};
}

.modal-grabber {
  width: 2.5rem;
  height: 0.3rem;
  margin: -0.5rem auto 1rem;
  border-radius: 999px;
  background: ${L(r,.2)};
}

.modal-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.625rem;
  margin-top: 1.5rem;${t.placement===`right`?`
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid `+a+`;`:``}
}

.modal-actions.bar {
  margin: 1.5rem -1.5rem -1.5rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid ${a};
  background: ${L(r,.035)};
}

.modal-actions.stacked {
  flex-direction: column-reverse;
}

.modal-actions.stacked .modal-btn {
  width: 100%;
}

.modal-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  padding: 0 1rem;
  border: 1px solid ${L(r,.18)};
  border-radius: ${l}px;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 150ms ease-out, scale 120ms ease-out;${u?`\n  box-shadow: 3px 3px 0 ${r};\n  border: 2px solid ${r};`:``}
}

.modal-btn:active {
  scale: 0.97;
}

.modal-btn:focus-visible {
  outline: 2px solid ${t.accent};
  outline-offset: 2px;
}

.modal-btn.primary {
  border-color: ${u?r:t.accent};
  background: ${t.accent};
  color: ${o};
}

@media (hover: hover) and (pointer: fine) {
  .modal-btn:hover {
    background: ${L(r,.08)};
  }

  .modal-btn.primary:hover {
    background: ${x(t.accent,o===`#ffffff`?`#000000`:`#ffffff`,.12)};
  }
}

.modal-kbd {
  display: inline-flex;
  align-items: center;
  min-width: 1.5rem;
  height: 1.375rem;
  padding: 0 0.4rem;
  border-radius: 5px;
  box-shadow: inset 0 0 0 1px ${L(r,.16)}, 0 1px 0 ${L(r,.16)};
  color: ${i};
  font: 500 0.7rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
}

.modal--command {
  padding: 0.5rem;
}

.modal-search {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  padding: 0.5rem 0.75rem 0.75rem;
  border-bottom: 1px solid ${a};
}

.modal-search-input {
  flex: 1;
  min-width: 0;
  height: 2.25rem;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  font-size: 1.05rem;
  outline: none;
}

.modal-results {
  display: grid;
  gap: 2px;
  margin: 0;
  padding: 0.5rem 0 0.25rem;
  list-style: none;
}

.modal-results-label {
  padding: 0.5rem 0.75rem 0.25rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${i};
}

.modal-results [role='option'] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.6rem 0.75rem;
  border-radius: ${Math.max(6,l-2)}px;
  font-size: 0.9rem;
  cursor: pointer;
}

.modal-results [aria-selected='true'] {
  background: ${L(t.accent,.14)};
  color: ${r};
  box-shadow: inset 2px 0 0 ${t.accent};
}

@media (hover: hover) and (pointer: fine) {
  .modal-results [role='option']:hover {
    background: ${L(r,.06)};
  }
}

.modal-steps {
  display: flex;
  gap: 0.375rem;
  margin-bottom: 0.875rem;
}

.modal-steps span {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 999px;
  background: ${L(r,.2)};
}

.modal-steps .is-done {
  background: ${L(t.accent,.55)};
}

.modal-steps .is-current {
  width: 1.25rem;
  background: ${t.accent};
}

.modal-label-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.modal-link {
  color: ${t.accent};
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
}

.modal-link:hover {
  text-decoration: underline;
}

.modal-divider {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  color: ${i};
  font-size: 0.75rem;
}

.modal-divider::before,
.modal-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: ${a};
}

.modal-scale {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  border: 0;
}

.modal-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.modal-scale label {
  position: relative;
}

.modal-scale input {
  position: absolute;
  opacity: 0;
  inset: 0;
  cursor: pointer;
}

.modal-scale span {
  display: grid;
  place-items: center;
  height: 2.75rem;
  border-radius: ${l}px;
  box-shadow: inset 0 0 0 1px ${L(r,.16)};
  font-weight: 600;
  transition: background-color 150ms ease-out, color 150ms ease-out;
}

.modal-scale input:checked + span {
  background: ${t.accent};
  color: ${o};
  box-shadow: none;
}

.modal-scale input:focus-visible + span {
  outline: 2px solid ${t.accent};
  outline-offset: 2px;
}

.modal-scale-ends {
  display: flex;
  justify-content: space-between;
  margin-top: -0.5rem;
  font-size: 0.75rem;
  color: ${i};
}

.modal-textarea {
  min-height: 5rem;
  padding: 0.6rem 0.75rem;
  resize: vertical;
}

.modal--lightbox {
  padding: 0.75rem;
}

.modal-figure {
  display: grid;
  gap: 0.75rem;
  margin: 0;
}

.modal-figure img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  border-radius: ${Math.max(0,n-8)}px;
}

.modal-figure figcaption {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 0.25rem 0.25rem;
  font-size: 0.85rem;
}

.modal-figure figcaption span {
  color: ${i};
  font-variant-numeric: tabular-nums;
}

.modal--lightbox .modal-close {
  top: 1.5rem;
  right: 1.5rem;
}

.modal-countdown {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
}

.modal-meter {
  height: 0.375rem;
  overflow: hidden;
  border-radius: 999px;
  background: ${L(r,.12)};
}

.modal-meter span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: ${t.accent};
  transform-origin: 0 50%;
  animation: modal-countdown 120s linear forwards;
}

@keyframes modal-countdown {
  from { transform: scaleX(1); }
  to { transform: scaleX(0); }
}

/* Destructive button stays disabled until the exact name is typed: pattern + :has(), no JS. */
.modal:has(.modal-confirm:invalid) .modal-btn.primary {
  opacity: 0.45;
  pointer-events: none;
}

.modal-code {
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  background: ${L(r,.08)};
  font: 600 0.85em ui-monospace, SFMono-Regular, Menlo, monospace;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border: 0;
  border-radius: 50%;
  background: ${L(t.bg,.85)};
  box-shadow: inset 0 0 0 1px ${L(r,.1)};
  color: ${i};
  cursor: pointer;
  z-index: 1;
}

.modal-close::before,
.modal-close::after {
  content: '';
  grid-area: 1 / 1;
  width: 0.85rem;
  height: 1.5px;
  border-radius: 1px;
  background: currentColor;
  rotate: 45deg;
}

.modal-close::after {
  rotate: -45deg;
}

.modal-close:hover {
  color: ${r};
}

.modal-close:focus-visible {
  outline: 2px solid ${t.accent};
}

@media (prefers-reduced-motion: reduce) {
  .modal,
  .modal::backdrop {
    transition-duration: 150ms;
  }

  .modal:not(:popover-open),
  .modal:popover-open {
    scale: none;
    translate: none;
  }

  .modal-meter span {
    animation: none;
  }
}

@media (prefers-reduced-transparency: reduce) {
  .modal {
    background: ${t.bg};
    backdrop-filter: none;
  }
}`}var V=`modal-demo`,H=`popovertarget="${V}" popovertargetaction="hide"`;function U(e){let t=e.showClose?`\n  <button class="modal-close" type="button" ${H} aria-label="Close"></button>`:``,n=(t,n=``)=>e.showIcon?`\n    <span class="modal-icon${n}" aria-hidden="true">${t}</span>`:``,r=(e,t,n=``)=>`
  <div class="modal-head">${n}
    <div>
      <h2 class="modal-title" id="${V}-title">${e}</h2>
      <p class="modal-desc">${t}</p>
    </div>
  </div>`,i=e.footer===`bar`&&e.placement!==`right`?` bar`:``,a=(e,t,n=``)=>`
  <div class="modal-actions${n}${n?``:i}">${e?`\n    <button class="modal-btn" type="button" ${H}>${e}</button>`:``}
    <button class="modal-btn primary" type="button" ${H}>${t}</button>
  </div>`;switch(e.kind){case`form`:return`${t}${r(`Invite to Northwind`,`Teammates get edit access to every board in this workspace.`,n(`+`))}
  <div class="modal-body">
    <div class="modal-field">
      <label for="${V}-email">Email address</label>
      <input class="modal-input" id="${V}-email" type="email" placeholder="name@company.com" autocomplete="email" />
      <span class="modal-help">They'll get an email with a link to join.</span>
    </div>
  </div>${a(`Cancel`,`Send invite`)}`;case`success`:return`${t}${r(`Payment received`,`Receipt #4821 for $49.00 was sent to ana@studio.dev.`,n(``,` modal-check`))}${a(``,`Done`)}`;case`promo`:return`${t}
  <img class="modal-media" src="${E(`city`,840,420)}" alt="${D(`city`)}" width="840" height="420" />
  <p class="modal-eyebrow">New in 4.2</p>
  <h2 class="modal-title" id="${V}-title">Shared workspaces</h2>
  <p class="modal-desc">Invite clients into a read-only space with its own comments and file history.</p>${a(`Maybe later`,`Try it`)}`;case`upgrade`:return`${t}${r(`Upgrade to Pro`,`Everything in Starter, plus room for a growing team.`)}
  <div class="modal-body">
    <p class="modal-price">$12 <span>per seat / month</span></p>
    <ul class="modal-list">
      <li>Unlimited projects and boards</li>
      <li>Version history for 1 year</li>
      <li>SSO and audit log</li>
    </ul>
  </div>${a(`Not now`,`Upgrade`,` stacked`)}`;case`share`:return`
  <div class="modal-grabber" aria-hidden="true"></div>${t}${r(`Share "Q3 roadmap.pdf"`,`Anyone with the link can view. Only editors can download.`)}
  <div class="modal-body">
    <div class="modal-field">
      <label for="${V}-link">Link</label>
      <div class="modal-row">
        <input class="modal-input" id="${V}-link" type="text" value="northwind.app/s/q3-roadmap" readonly />
        <button class="modal-btn primary" type="button">Copy</button>
      </div>
    </div>
  </div>`;case`filters`:return`${t}${r(`Filters`,`3 of 128 pull requests match.`)}
  <div class="modal-body">
    <fieldset class="modal-group">
      <legend>Status</legend>
      <label class="modal-option"><input type="checkbox" checked /> Open</label>
      <label class="modal-option"><input type="checkbox" checked /> In review</label>
      <label class="modal-option"><input type="checkbox" /> Merged</label>
    </fieldset>
    <fieldset class="modal-group">
      <legend>Author</legend>
      <label class="modal-option"><input type="radio" name="${V}-author" checked /> Anyone</label>
      <label class="modal-option"><input type="radio" name="${V}-author" /> Only me</label>
    </fieldset>
  </div>${a(`Reset`,`Show 3 results`)}`;case`typeConfirm`:return`${t}${r(`Delete repository?`,`This permanently deletes northwind/dashboard, including 1,284 commits, issues and pull requests.`,n(`!`))}
  <div class="modal-body">
    <div class="modal-field">
      <label for="${V}-confirm">Type <span class="modal-code">northwind/dashboard</span> to confirm</label>
      <input class="modal-input modal-confirm" id="${V}-confirm" type="text" pattern="northwind/dashboard" required autocomplete="off" spellcheck="false" />
      <span class="modal-help">The delete button unlocks when the name matches.</span>
    </div>
  </div>${a(`Cancel`,`Delete repository`)}`;case`signin`:return`${t}${r(`Sign in to Northwind`,`Use the email you signed up with.`)}
  <div class="modal-body">
    <div class="modal-field">
      <label for="${V}-email">Work email</label>
      <input class="modal-input" id="${V}-email" type="email" placeholder="name@company.com" autocomplete="email" />
    </div>
    <div class="modal-field">
      <div class="modal-label-row">
        <label for="${V}-password">Password</label>
        <a class="modal-link" href="#">Forgot password?</a>
      </div>
      <input class="modal-input" id="${V}-password" type="password" autocomplete="current-password" />
    </div>
  </div>
  <div class="modal-actions stacked">
    <button class="modal-btn" type="button">Continue with Google</button>
    <span class="modal-divider">or</span>
    <button class="modal-btn primary" type="button">Sign in</button>
  </div>`;case`onboarding`:return`${t}
  <img class="modal-media" src="${E(`fjord`,840,420)}" alt="${D(`fjord`)}" width="840" height="420" />
  <div class="modal-steps" role="img" aria-label="Step 2 of 4"><span class="is-done"></span><span class="is-current"></span><span></span><span></span></div>
  <h2 class="modal-title" id="${V}-title">Connect your calendar</h2>
  <p class="modal-desc">We block focus time around your meetings so deep work does not get booked over. Disconnect any time.</p>${a(`Back`,`Continue`)}`;case`feedback`:return`${t}${r(`How likely are you to recommend Northwind?`,`Takes ten seconds. It shapes what we build next.`)}
  <div class="modal-body">
    <fieldset class="modal-scale">
      <legend class="modal-sr">Rating from 1 to 5</legend>
${[1,2,3,4,5].map(e=>`      <label><input type="radio" name="${V}-score" value="${e}"${e===4?` checked`:``} /><span>${e}</span></label>`).join(`
`)}
    </fieldset>
    <div class="modal-scale-ends"><span>Not likely</span><span>Very likely</span></div>
    <div class="modal-field">
      <label for="${V}-note">What could be better? <span class="modal-help">(optional)</span></label>
      <textarea class="modal-input modal-textarea" id="${V}-note" rows="3"></textarea>
    </div>
  </div>${a(`Skip`,`Send feedback`)}`;case`timeout`:return`${t}${r(`Your session is about to expire`,`For your security you will be signed out after 2 minutes without activity.`,n(`!`))}
  <div class="modal-body">
    <p class="modal-countdown" role="timer" aria-live="off">1:59</p>
    <div class="modal-meter" aria-hidden="true"><span></span></div>
  </div>${a(`Sign out`,`Stay signed in`)}`;case`command`:return`
  <div class="modal-search">
    <input class="modal-search-input" type="search" placeholder="Search or jump to..." aria-label="Search commands" />
    <kbd class="modal-kbd">Esc</kbd>
  </div>
  <ul class="modal-results" role="listbox" aria-label="Suggestions">
    <li class="modal-results-label" role="presentation">Recent</li>
    <li role="option" aria-selected="true"><span>Northwind Dashboard</span><kbd class="modal-kbd">Enter</kbd></li>
    <li role="option" aria-selected="false"><span>Q3 roadmap.pdf</span></li>
    <li class="modal-results-label" role="presentation">Actions</li>
    <li role="option" aria-selected="false"><span>Create board</span><kbd class="modal-kbd">Ctrl N</kbd></li>
    <li role="option" aria-selected="false"><span>Invite teammate</span><kbd class="modal-kbd">Ctrl I</kbd></li>
  </ul>`;case`lightbox`:return`${t}
  <figure class="modal-figure">
    <img src="${E(`fjord`,1200,800)}" alt="${D(`fjord`)}" width="1200" height="800" />
    <figcaption><strong id="${V}-title">Preikestolen, Norway</strong><span>3 of 12</span></figcaption>
  </figure>`;case`cookie`:return`${r(`Cookies on this site`,`We use cookies to keep you signed in and to count visits. You can change this any time in Settings.`)}${a(`Reject all`,`Accept all`)}`;default:return`${t}${r(`Delete project?`,`Northwind Dashboard and its 214 files will be removed for everyone. This cannot be undone.`,n(`!`))}${a(`Cancel`,`Delete project`)}`}}var W=e=>e.kind===`command`?`aria-label="Command palette"`:`aria-labelledby="${V}-title"`,G={confirm:`Delete project`,typeConfirm:`Delete repository`,signin:`Sign in`,onboarding:`Start setup`,feedback:`Give feedback`,timeout:`Preview timeout`,command:`Search`,lightbox:`View photo`,form:`Invite people`,success:`Pay $49`,promo:`See what's new`,upgrade:`Upgrade plan`,share:`Share`,filters:`Filters`,cookie:`Cookie settings`};function K(e){let t=I(e);return`<button class="modal-btn primary" type="button" popovertarget="${V}">${G[t.kind]}</button>

<div class="modal modal--${t.kind}" id="${V}" popover role="dialog" ${W(t)}>${U(t)}
</div>`}function q(e){let t=I(e);return`<div class="modal-scrim">
  <div class="modal modal--${t.kind} modal-static" role="dialog" ${W(t)}>${U(t)}
  </div>
</div>`}function J(e){let t=I(e);return`${B(t)}

.modal-scrim {
  position: relative;
  display: grid;
  ${z(t,t.radius).scrim}
  width: 100%;
  height: 100%;
  min-height: 26rem;
  overflow: hidden;
  isolation: isolate;
  background: url('${E(`valley`,1200,800)}') center / cover;
}

.modal-scrim::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: ${L(t.overlayColor,t.overlayOpacity/100)};${t.blur?`
  backdrop-filter: blur(6px);`:``}
}

.modal.modal-static {
  position: relative;
  inset: auto;
  margin: ${t.placement===`center`?`auto`:`0`};
  ${t.placement===`right`?`height: 100%; max-height: none;`:``}
  max-height: 100%;
  opacity: 1;
  scale: none;
  translate: none;
  animation: modal-preview-in ${t.duration}ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes modal-preview-in {
  from { ${z(t,t.radius).hidden.replace(/\n\s*/g,` `)} }
}`}function Y(e){let t=I(e);return{"--modal-accent":t.accent,"--modal-bg":t.bg,"--modal-radius":`${t.radius}px`,"--modal-duration":`${t.duration}ms`}}function X(e,t){let n=Math.floor(t.range(0,360)),r=t.chance(.35),i=t.pick(O),a=r?`#ffffff`:C({h:n,s:10,l:10});return{...I(e),kind:i.value,placement:i.placement,skin:t.pick(A.map(e=>e.value)),accent:C({h:n,s:75,l:52}),bg:a,textColor:S(a),overlayColor:r?`#0f172a`:`#000000`,overlayOpacity:Math.round(t.range(40,70)),radius:t.pick([8,12,16,20,24]),duration:Math.round(t.range(180,320)),scaleFrom:t.pick([92,95,96,98]),blur:t.chance(.6)}}var Z=e=>({...N,...e}),Q={bg:`#ffffff`,textColor:`#18181b`,overlayColor:`#0f172a`,overlayOpacity:45},$=[{name:`Delete Confirm`,tags:[`confirm`],state:Z({})},{name:`Delete (Light)`,tags:[`confirm`,`light`],state:Z({...Q,accent:`#dc2626`,skin:`elevated`})},{name:`Invite Form`,tags:[`form`],state:Z({kind:`form`,accent:`#10b981`})},{name:`Invite (Light)`,tags:[`form`,`light`],state:Z({...Q,kind:`form`,accent:`#4f46e5`,skin:`elevated`,radius:20})},{name:`Payment Success`,tags:[`success`],state:Z({kind:`success`,accent:`#10b981`,width:380})},{name:`Success Glass`,tags:[`success`,`glass`],state:Z({kind:`success`,skin:`glass`,accent:`#34d399`,overlayOpacity:30,width:380,radius:24})},{name:`What's New`,tags:[`promo`],state:Z({kind:`promo`,accent:`#8b5cf6`,showIcon:!1,radius:20})},{name:`What's New (Light)`,tags:[`promo`,`light`],state:Z({...Q,kind:`promo`,accent:`#0ea5e9`,skin:`elevated`,radius:20})},{name:`Upgrade Plan`,tags:[`pricing`],state:Z({kind:`upgrade`,accent:`#f59e0b`,width:380})},{name:`Upgrade Outline`,tags:[`pricing`],state:Z({kind:`upgrade`,skin:`outline`,accent:`#a78bfa`,width:380})},{name:`Share Sheet`,tags:[`sheet`,`mobile`],state:Z({kind:`share`,placement:`bottom`,accent:`#0a84ff`,radius:22})},{name:`Share Sheet (Light)`,tags:[`sheet`,`light`],state:Z({...Q,kind:`share`,placement:`bottom`,accent:`#0a84ff`,skin:`elevated`,radius:22})},{name:`Filters Drawer`,tags:[`drawer`],state:Z({kind:`filters`,placement:`right`,accent:`#10b981`,radius:0,duration:300})},{name:`Drawer Glass`,tags:[`drawer`,`glass`],state:Z({kind:`filters`,placement:`right`,skin:`glass`,accent:`#38bdf8`,radius:20,overlayOpacity:25})},{name:`Cookie Banner`,tags:[`consent`],state:Z({kind:`cookie`,placement:`bottom`,accent:`#fafafa`,overlayOpacity:15,blur:!1,radius:16,width:640})},{name:`Neo-brutal Confirm`,tags:[`bold`,`light`],state:Z({kind:`confirm`,skin:`brutal`,bg:`#fffbeb`,textColor:`#111111`,accent:`#ef4444`,overlayColor:`#111111`,overlayOpacity:35,blur:!1})},{name:`Neo-brutal Upgrade`,tags:[`bold`,`light`],state:Z({kind:`upgrade`,skin:`brutal`,bg:`#ecfccb`,textColor:`#111111`,accent:`#7c3aed`,overlayColor:`#111111`,overlayOpacity:35,blur:!1,width:380})},{name:`Glass Invite`,tags:[`glass`],state:Z({kind:`form`,skin:`glass`,accent:`#f472b6`,overlayOpacity:25,radius:24})},{name:`Type to Delete`,tags:[`confirm`,`danger`],state:Z({kind:`typeConfirm`,accent:`#ef4444`,width:460,footer:`bar`})},{name:`Type to Delete (Light)`,tags:[`confirm`,`light`],state:Z({...Q,kind:`typeConfirm`,accent:`#dc2626`,skin:`minimal`,width:460,footer:`bar`,iconStyle:`solid`})},{name:`Sign In`,tags:[`auth`,`light`],state:Z({...Q,kind:`signin`,accent:`#18181b`,skin:`elevated`,width:400,radius:20})},{name:`Sign In Glass`,tags:[`auth`,`glass`],state:Z({kind:`signin`,skin:`glass`,accent:`#a78bfa`,width:400,radius:24,overlayOpacity:30})},{name:`Onboarding Step`,tags:[`onboarding`],state:Z({kind:`onboarding`,accent:`#10b981`,radius:20,width:440})},{name:`Onboarding (Light)`,tags:[`onboarding`,`light`],state:Z({...Q,kind:`onboarding`,accent:`#2563eb`,skin:`elevated`,radius:24,width:440})},{name:`NPS Feedback`,tags:[`feedback`],state:Z({kind:`feedback`,accent:`#6366f1`,width:460,footer:`bar`})},{name:`Feedback (Light)`,tags:[`feedback`,`light`],state:Z({...Q,kind:`feedback`,accent:`#0d9488`,skin:`minimal`,width:460})},{name:`Session Timeout`,tags:[`warning`],state:Z({kind:`timeout`,accent:`#f59e0b`,width:420,iconStyle:`soft`})},{name:`Command Palette`,tags:[`palette`],state:Z({kind:`command`,placement:`top`,skin:`minimal`,accent:`#10b981`,width:560,radius:14,overlayOpacity:50,scaleFrom:98,duration:160})},{name:`Command (Light)`,tags:[`palette`,`light`],state:Z({...Q,kind:`command`,placement:`top`,skin:`elevated`,accent:`#6366f1`,width:560,radius:14,scaleFrom:98,duration:160})},{name:`Photo Lightbox`,tags:[`media`],state:Z({kind:`lightbox`,bg:`#0a0a0a`,accent:`#fafafa`,overlayColor:`#000000`,overlayOpacity:85,width:720,radius:18,skin:`minimal`})},{name:`Gradient Upgrade`,tags:[`pricing`,`gradient`],state:Z({kind:`upgrade`,skin:`gradient`,accent:`#ec4899`,width:380,radius:20})},{name:`Glow Success`,tags:[`success`,`glow`],state:Z({kind:`success`,skin:`glow`,accent:`#22d3ee`,width:380,radius:22,iconStyle:`solid`})},{name:`Footer Bar Invite`,tags:[`form`,`light`],state:Z({...Q,kind:`form`,skin:`minimal`,accent:`#0f766e`,footer:`bar`,radius:14})}],ne=[`innerHTML`],re=[`innerHTML`],ie=r({__name:`modal`,setup(r){let{state:x,randomize:S,reset:C,undo:E,redo:D,pushHistory:P,shareUrlRef:F}=y({id:`modal`,defaultState:JSON.parse(JSON.stringify(N)),randomize:X,deserialize:e=>I(e)}),L=i(`editor:shareUrl`,()=>{});l(()=>L(F.value));let R=a(()=>B(x.value)),z=a(()=>K(x.value)),V=a(()=>Y(x.value)),H=a(()=>q(x.value)),U=a(()=>`<style>${J(x.value)}</style>`);function W(e){let t=O.find(t=>t.value===e);x.value={...x.value,kind:e,placement:t?.placement??x.value.placement}}function G(e){x.value=JSON.parse(JSON.stringify($[e].state)),P()}let Z=c(0),Q=a(()=>$.map(e=>({name:e.name,css:J(e.state),html:q(e.state)})));return(r,i)=>{let a=ee,c=h,l=te,y=b,N=v,P=g,F=w,I=m,L=T,B=_;return s(),f(B,{title:`Modal & Dialog`,description:`Fifteen dialog types, from confirms and sign-in to command palettes and drawers, on the native popover API.`,css:p(R),html:p(z),vars:p(V),onRandomize:p(S),onReset:p(C),onUndo:p(E),onRedo:p(D)},{preview:d(()=>[e(c,{variants:p(Q),title:`Modal preview`,filename:`css-studio-modal`,onApplyVariant:G},{presets:d(()=>[e(a,{presets:p($),onApply:G},null,8,[`presets`])]),default:d(()=>[t(`div`,{innerHTML:p(U),"aria-hidden":`true`},null,8,ne),(s(),n(`div`,{key:`${p(Z)}-${p(x).kind}-${p(x).placement}`,class:`h-full w-full`,innerHTML:p(H)},null,8,re))]),_:1},8,[`variants`])]),controls:d(()=>[e(N,{label:`Content`,icon:`ph-browser`},{default:d(()=>[e(l,{"model-value":p(x).kind,label:`Dialog type`,options:p(O),"onUpdate:modelValue":i[0]||=e=>W(e)},null,8,[`model-value`,`options`]),e(l,{modelValue:p(x).placement,"onUpdate:modelValue":i[1]||=e=>p(x).placement=e,label:`Placement`,options:p(k)},null,8,[`modelValue`,`options`]),e(y,{modelValue:p(x).showIcon,"onUpdate:modelValue":i[2]||=e=>p(x).showIcon=e,label:`Icon`},null,8,[`modelValue`]),p(x).showIcon?(s(),f(l,{key:0,modelValue:p(x).iconStyle,"onUpdate:modelValue":i[3]||=e=>p(x).iconStyle=e,label:`Icon style`,options:p(j)},null,8,[`modelValue`,`options`])):o(``,!0),e(l,{modelValue:p(x).footer,"onUpdate:modelValue":i[4]||=e=>p(x).footer=e,label:`Actions`,options:p(M)},null,8,[`modelValue`,`options`]),e(y,{modelValue:p(x).showClose,"onUpdate:modelValue":i[5]||=e=>p(x).showClose=e,label:`Close button`},null,8,[`modelValue`])]),_:1}),e(N,{label:`Style`,icon:`ph-square-half`},{default:d(()=>[e(l,{modelValue:p(x).skin,"onUpdate:modelValue":i[6]||=e=>p(x).skin=e,label:`Skin`,options:p(A)},null,8,[`modelValue`,`options`]),e(P,{modelValue:p(x).radius,"onUpdate:modelValue":i[7]||=e=>p(x).radius=e,label:`Radius`,min:0,max:32,suffix:`px`},null,8,[`modelValue`]),e(P,{modelValue:p(x).width,"onUpdate:modelValue":i[8]||=e=>p(x).width=e,label:`Max width`,min:300,max:720,step:10,suffix:`px`},null,8,[`modelValue`])]),_:1}),e(N,{label:`Backdrop & motion`,icon:`ph-sparkle`},{default:d(()=>[e(F,{"model-value":p(x).overlayColor,label:`Backdrop color`,"onUpdate:modelValue":i[9]||=e=>p(x).overlayColor=e},null,8,[`model-value`]),e(P,{modelValue:p(x).overlayOpacity,"onUpdate:modelValue":i[10]||=e=>p(x).overlayOpacity=e,label:`Backdrop opacity`,min:0,max:95,suffix:`%`},null,8,[`modelValue`]),e(y,{modelValue:p(x).blur,"onUpdate:modelValue":i[11]||=e=>p(x).blur=e,label:`Blur page behind`},null,8,[`modelValue`]),e(P,{modelValue:p(x).duration,"onUpdate:modelValue":i[12]||=e=>p(x).duration=e,label:`Duration`,min:120,max:500,step:10,suffix:`ms`},null,8,[`modelValue`]),p(x).placement===`center`?(s(),f(P,{key:0,modelValue:p(x).scaleFrom,"onUpdate:modelValue":i[13]||=e=>p(x).scaleFrom=e,label:`Start scale`,min:85,max:100,suffix:`%`},null,8,[`modelValue`])):o(``,!0),t(`button`,{type:`button`,class:`inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-line text-xs font-medium text-muted transition-colors duration-150 hover:border-accent/60 hover:text-fg active:scale-[0.98]`,onClick:i[14]||=e=>Z.value++},[e(I,{name:`ph-arrow-clockwise`,size:13}),i[18]||=u(` Replay entrance `,-1)])]),_:1}),e(N,{label:`Colors`,icon:`ph-palette`},{default:d(()=>[e(F,{"model-value":p(x).accent,label:`Accent`,"onUpdate:modelValue":i[15]||=e=>p(x).accent=e},null,8,[`model-value`]),e(F,{"model-value":p(x).bg,label:`Surface`,"onUpdate:modelValue":i[16]||=e=>p(x).bg=e},null,8,[`model-value`]),e(F,{"model-value":p(x).textColor,label:`Text`,"onUpdate:modelValue":i[17]||=e=>p(x).textColor=e},null,8,[`model-value`])]),_:1})]),code:d(()=>[e(L,{css:p(R),html:p(z),vars:p(V),filename:`css-studio-modal`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{ie as default};