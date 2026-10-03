import{A as e,C as t,E as n,M as r,R as i,S as a,X as o,ct as s,lt as c,w as l,wt as u}from"./MitKKUeq.js";import{a as d,i as f,n as p,o as m,r as h,s as g,t as _}from"./DJLqZT_o.js";import{t as v}from"./D3e07OzS.js";import{t as y}from"./Dh2B6pZ8.js";import{s as b,t as x}from"./Rl_HAT4u.js";import{t as S}from"./BYmGHvE7.js";var C=[{value:`bubble`,label:`Bubble`},{value:`soft`,label:`Soft tint`},{value:`outline`,label:`Outline`},{value:`glass`,label:`Glass`},{value:`gradient`,label:`Gradient`},{value:`flat`,label:`Flat`},{value:`brutal`,label:`Neo-brutal`},{value:`minimal`,label:`Minimal`},{value:`thread`,label:`Thread (Slack-style)`}],w=[{value:`curve`,label:`Curved`},{value:`triangle`,label:`Triangle`},{value:`none`,label:`None`}],T=[{value:`bounce`,label:`Bounce`},{value:`fade`,label:`Fade`},{value:`grow`,label:`Grow`},{value:`off`,label:`Off`}],E=new Set([`outline`,`brutal`,`minimal`,`thread`,`soft`]),D={skin:`bubble`,tail:`curve`,typing:`bounce`,grouped:!0,avatars:!0,names:!0,timestamps:!0,receipts:!0,entrance:!1,sentBg:`#10b981`,sentText:`#022c22`,receivedBg:`#27272a`,receivedText:`#fafafa`,accent:`#0ea5e9`,surface:`#09090b`,radius:18,maxWidth:320,fontSize:15,padding:10},O=/^#[0-9a-f]{6}$/i;function k(e){return O.test(e)?x(`#fafafa`,e)>=x(`#18181b`,e)?`#fafafa`:`#18181b`:`#fafafa`}function A(e){let{typingDots:t,...n}=e,r=n.tail,i=r===!0?`curve`:r===!1?`none`:r;return{...D,...n,skin:C.some(e=>e.value===n.skin)?n.skin:`bubble`,tail:w.some(e=>e.value===i)?i:`curve`,typing:T.some(e=>e.value===n.typing)?n.typing:t===!1?`off`:`bounce`}}var j=[`day`,{dir:`in`,name:`Maya Chen`,initials:`MC`,lines:[`Pushed the new onboarding flow to staging.`,`Can you check the empty state on the projects page?`],time:`09:41`},{dir:`out`,name:`You`,initials:`YO`,lines:[`On it. The illustration feels heavy on mobile.`,`Trying a smaller version now.`],time:`09:42`},{dir:`in`,name:`Maya Chen`,initials:`MC`,lines:[`Good call. Ship it if the contrast passes.`],time:`09:44`},{dir:`out`,name:`You`,initials:`YO`,lines:[`Passes AA. Merging.`],time:`09:45`}],M=e=>e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`);function N(e){return{bubble:``,soft:`.chat-group .chat-msg {
  color: inherit;
}

.in .chat-msg {
  background: color-mix(in srgb, var(--chat-in-bg) 70%, transparent);
}

.out .chat-msg {
  background: color-mix(in srgb, var(--chat-out-bg) 22%, transparent);
}`,outline:`.chat-group .chat-msg {
  color: inherit;
}

.in .chat-msg {
  background: transparent;
  box-shadow: inset 0 0 0 1.5px var(--chat-in-bg);
}

.out .chat-msg {
  background: transparent;
  box-shadow: inset 0 0 0 1.5px var(--chat-out-bg);
}`,glass:`.chat {
  background:
    radial-gradient(60% 50% at 85% 20%, color-mix(in srgb, var(--chat-out-bg) 55%, transparent), transparent 70%),
    radial-gradient(55% 45% at 10% 90%, color-mix(in srgb, var(--chat-accent) 50%, transparent), transparent 70%),
    var(--chat-surface);
}

.chat-msg {
  -webkit-backdrop-filter: blur(14px) saturate(150%);
  backdrop-filter: blur(14px) saturate(150%);
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.14);
}

.in .chat-msg {
  background: color-mix(in srgb, var(--chat-in-bg) 50%, transparent);
}

.out .chat-msg {
  background: color-mix(in srgb, var(--chat-out-bg) 62%, transparent);
}

@media (prefers-reduced-transparency: reduce) {
  .in .chat-msg { background: var(--chat-in-bg); }
  .out .chat-msg { background: var(--chat-out-bg); }
  .chat-msg { backdrop-filter: none; }
}`,gradient:`.out .chat-msg {
  background: linear-gradient(135deg, var(--chat-out-bg), var(--chat-accent));
}

.chat .out .chat-msg::after {
  background: var(--chat-accent);
}`,flat:``,brutal:`.chat-msg {
  box-shadow: inset 0 0 0 2px var(--chat-ink), 3px 3px 0 var(--chat-ink);
  font-weight: 500;
}

.chat-avatar {
  box-shadow: inset 0 0 0 2px var(--chat-ink);
}`,minimal:`.chat-group .chat-msg {
  background: none !important;
  color: inherit;
  border-radius: 0 !important;
  padding-block: 2px;
}

.in .chat-msg {
  padding-inline: 12px 0;
  box-shadow: inset 2px 0 0 var(--chat-in-bg);
}

.out .chat-msg {
  padding-inline: 0 12px;
  text-align: right;
  box-shadow: inset -2px 0 0 var(--chat-out-bg);
}`,thread:`.chat-group,
.chat-group.out {
  flex-direction: row;
  align-items: flex-start;
}

.chat-stack,
.out .chat-stack {
  align-items: flex-start;
  max-width: none;
}

.chat-group .chat-msg {
  background: none !important;
  color: inherit;
  padding: 0;
  border-radius: 0 !important;
}

.chat-name {
  margin: 0;
  opacity: 1;
}

.out .chat-avatar {
  background: var(--chat-out-bg);
  color: var(--chat-out-fg);
}

.chat-head {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.chat-head .chat-meta {
  margin: 0;
}`}[e.skin]}function P(e){if(e.tail===`none`||E.has(e.skin))return``;let t=e.grouped?`:last-of-type`:``,n=e.tail===`curve`,r=e=>n?`-webkit-mask: radial-gradient(circle at ${e===`out`?`100% 0`:`0 0`}, #0000 11.5px, #000 12px);
  mask: radial-gradient(circle at ${e===`out`?`100% 0`:`0 0`}, #0000 11.5px, #000 12px);`:`clip-path: polygon(${e===`out`?`0 0, 0 100%, 100% 100%`:`100% 0, 100% 100%, 0 100%`});`;return`.chat-msg${t}::after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 12px;
  height: 12px;
  background: inherit;
}

.in .chat-msg${t} {
  border-bottom-left-radius: 0;
}

.in .chat-msg${t}::after {
  left: -12px;
  ${r(`in`)}
}

.out .chat-msg${t} {
  border-bottom-right-radius: 0;
}

.out .chat-msg${t}::after {
  right: -12px;
  ${r(`out`)}
}`}function F(e){return e.typing===`off`?``:`.chat-typing {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-height: 1.45em;
}

.chat-typing span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
  animation: chat-typing 1.2s ease-in-out infinite;
}

.chat-typing span:nth-child(2) { animation-delay: 160ms; }
.chat-typing span:nth-child(3) { animation-delay: 320ms; }

@keyframes chat-typing {
  ${{bounce:`0%, 60%, 100% { transform: translateY(0); opacity: 0.45; }
  30% { transform: translateY(-4px); opacity: 1; }`,fade:`0%, 100% { opacity: 0.25; }
  40% { opacity: 1; }`,grow:`0%, 60%, 100% { transform: scale(0.6); opacity: 0.45; }
  30% { transform: scale(1); opacity: 1; }`}[e.typing]}
}

@keyframes chat-typing-calm {
  0%, 100% { opacity: 0.35; }
  50% { opacity: 0.9; }
}

@media (prefers-reduced-motion: reduce) {
  .chat-typing span { animation: chat-typing-calm 2s ease-in-out infinite; }
}`}function I(e){let t=A(e),n=k(t.surface),r=t.skin===`flat`?Math.min(t.radius,4):t.skin===`brutal`?Math.min(t.radius,10):t.radius,i=t.skin===`flat`?r:Math.max(4,Math.round(r/3.5)),a=t.grouped?`.in .chat-msg:not(:last-of-type) { border-bottom-left-radius: ${i}px; }
.in .chat-msg:not(:first-of-type) { border-top-left-radius: ${i}px; }
.out .chat-msg:not(:last-of-type) { border-bottom-right-radius: ${i}px; }
.out .chat-msg:not(:first-of-type) { border-top-right-radius: ${i}px; }`:`.chat-stack {
  gap: 8px;
}`,o=t.entrance?`
.chat-group,
.chat-day {
  animation: chat-in 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--i, 0) * 110ms);
}

@keyframes chat-in {
  from { opacity: 0; transform: translateY(8px) scale(0.97); }
  to { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .chat-group,
  .chat-day { animation-name: chat-in-calm; animation-duration: 200ms; }
  @keyframes chat-in-calm { from { opacity: 0; } to { opacity: 1; } }
}
`:``;return`.chat {
  --chat-out-bg: ${t.sentBg};
  --chat-out-fg: ${t.sentText};
  --chat-in-bg: ${t.receivedBg};
  --chat-in-fg: ${t.receivedText};
  --chat-accent: ${t.accent};
  --chat-surface: ${t.surface};
  --chat-ink: ${n};
  --chat-radius: ${r}px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  max-width: ${t.maxWidth+160}px;
  padding: 20px 22px;
  border-radius: 20px;
  background: var(--chat-surface);
  color: var(--chat-ink);
  font: 400 ${t.fontSize}px/1.45 system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

.chat-day {
  align-self: center;
  font-size: 0.72em;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  opacity: 0.55;
}

.chat-group {
  display: flex;
  align-items: flex-end;
  gap: 10px;
}

.chat-group.out {
  flex-direction: row-reverse;
}

.chat-avatar {
  flex: none;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--chat-in-bg);
  color: var(--chat-in-fg);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.chat-stack {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
  min-width: 0;
  max-width: min(${t.maxWidth}px, 82%);
}

.out .chat-stack {
  align-items: flex-end;
}

.chat-name {
  margin: 0 ${t.padding+2}px 2px;
  font-size: 0.75em;
  font-weight: 600;
  opacity: 0.7;
}

.chat-msg {
  position: relative;
  margin: 0;
  padding: ${t.padding}px ${Math.round(t.padding*1.45)}px;
  border-radius: var(--chat-radius);
  overflow-wrap: anywhere;
}

.in .chat-msg {
  background: var(--chat-in-bg);
  color: var(--chat-in-fg);
}

.out .chat-msg {
  background: var(--chat-out-bg);
  color: var(--chat-out-fg);
}

${a}

.chat-meta {
  margin: 2px ${t.padding+2}px 0;
  font-size: 0.7em;
  font-variant-numeric: tabular-nums;
  opacity: 0.55;
}

${N(t)}

${P(t)}
${o}
${F(t)}`.replace(/\n{3,}/g,`

`).trim()}function L(e){let t=A(e),n=t.skin===`thread`,r=e=>n||t.avatars&&e===`in`,i=e=>n||t.names&&e===`in`,a=0,o=()=>t.entrance?` style="--i: ${a++}"`:``,s=e=>{let r=[t.timestamps?`<time>${e.time}</time>`:``,t.receipts&&e.dir===`out`&&!n?`Read`:``].filter(Boolean);return r.length?`<span class="chat-meta">${r.join(` · `)}</span>`:``},c=e=>{let t=r(e.dir)?`\n    <span class="chat-avatar" aria-hidden="true">${e.initials}</span>`:``,a=n?`\n      <div class="chat-head"><span class="chat-name">${M(e.name)}</span>${s(e)}</div>`:i(e.dir)?`\n      <span class="chat-name">${M(e.name)}</span>`:``,c=e.lines.map(e=>`\n      <p class="chat-msg">${M(e)}</p>`).join(``),l=n?``:s(e)?`\n      ${s(e)}`:``;return`  <div class="chat-group ${e.dir}"${o()}>${t}
    <div class="chat-stack">${a}${c}${l}
    </div>
  </div>`};return`<div class="chat" role="log" aria-label="Conversation">\n${j.map(e=>e===`day`?`  <div class="chat-day"${o()}>Today</div>`:c(e)).join(`
`)}${t.typing===`off`?``:`\n  <div class="chat-group in"${o()}>${r(`in`)?`
    <span class="chat-avatar" aria-hidden="true">MC</span>`:``}
    <div class="chat-stack">
      <p class="chat-msg" role="status" aria-label="Maya is typing"><span class="chat-typing"><span></span><span></span><span></span></span></p>
    </div>
  </div>`}\n</div>`}function R(e){let t=A(e);return{"--chat-out-bg":t.sentBg,"--chat-out-fg":t.sentText,"--chat-in-bg":t.receivedBg,"--chat-in-fg":t.receivedText,"--chat-accent":t.accent,"--chat-surface":t.surface,"--chat-radius":`${t.radius}px`}}function z(e,t){let n=Math.floor(t.range(0,360)),r=(n+t.pick([30,60,150,200]))%360,i=t.chance(.3),a=t.range(42,58);return{...A(e),skin:t.pick(C.map(e=>e.value)),tail:t.pick(w.map(e=>e.value)),typing:t.pick(T.map(e=>e.value)),grouped:t.chance(.8),avatars:t.chance(.7),entrance:t.chance(.3),sentBg:b({h:n,s:t.range(60,85),l:a}),sentText:a>50?b({h:n,s:80,l:10}):`#ffffff`,accent:b({h:r,s:75,l:55}),receivedBg:b(i?{h:n,s:12,l:92}:{h:n,s:10,l:17}),receivedText:b(i?{h:n,s:20,l:12}:{h:n,s:15,l:96}),surface:i?`#ffffff`:b({h:n,s:12,l:5}),radius:t.pick([6,12,16,18,22]),padding:t.pick([8,10,12])}}var B=e=>({...D,...e}),V=[{name:`Emerald`,tags:[`brand`],state:B({})},{name:`iMessage`,tags:[`mobile`,`light`],state:B({sentBg:`#0a84ff`,sentText:`#ffffff`,receivedBg:`#e9e9eb`,receivedText:`#111111`,surface:`#ffffff`,radius:20,avatars:!1,names:!1,timestamps:!1})},{name:`iMessage Dark`,tags:[`mobile`],state:B({sentBg:`#0a84ff`,sentText:`#ffffff`,receivedBg:`#26252a`,receivedText:`#ffffff`,surface:`#000000`,radius:20,avatars:!1,names:!1})},{name:`WhatsApp`,tags:[`mobile`],state:B({sentBg:`#005c4b`,sentText:`#e9edef`,receivedBg:`#202c33`,receivedText:`#e9edef`,surface:`#0b141a`,radius:10,tail:`triangle`,avatars:!1,names:!1,padding:8})},{name:`Telegram`,tags:[`mobile`,`light`],state:B({sentBg:`#e3fee0`,sentText:`#0f2a0c`,receivedBg:`#ffffff`,receivedText:`#111111`,surface:`#c7d7b5`,radius:14,avatars:!0,names:!0})},{name:`Messenger Gradient`,tags:[`gradient`],state:B({skin:`gradient`,sentBg:`#a033ff`,sentText:`#ffffff`,accent:`#0099ff`,receivedBg:`#303030`,receivedText:`#e4e6eb`,surface:`#18191a`,radius:20,tail:`none`})},{name:`Frosted Glass`,tags:[`glass`],state:B({skin:`glass`,sentBg:`#8b5cf6`,sentText:`#ffffff`,receivedBg:`#3f3f46`,receivedText:`#fafafa`,accent:`#f43f5e`,surface:`#0f0a1f`,radius:20})},{name:`Soft Tint`,tags:[`minimal`],state:B({skin:`soft`,sentBg:`#10b981`,receivedBg:`#27272a`,surface:`#0c0c0e`,radius:16})},{name:`Outline Mono`,tags:[`outline`],state:B({skin:`outline`,sentBg:`#fafafa`,receivedBg:`#52525b`,surface:`#09090b`,radius:14,avatars:!1})},{name:`Neo-brutal`,tags:[`bold`,`light`],state:B({skin:`brutal`,sentBg:`#fde047`,sentText:`#111111`,receivedBg:`#ffffff`,receivedText:`#111111`,surface:`#f4f1ea`,radius:8})},{name:`Slack Thread`,tags:[`work`],state:B({skin:`thread`,sentBg:`#1164a3`,sentText:`#ffffff`,receivedBg:`#e01e5a`,receivedText:`#ffffff`,surface:`#1a1d21`,fontSize:15,typing:`fade`})},{name:`Discord`,tags:[`work`],state:B({skin:`thread`,sentBg:`#5865f2`,sentText:`#ffffff`,receivedBg:`#3ba55c`,receivedText:`#ffffff`,surface:`#313338`,typing:`bounce`})},{name:`Minimal Ink`,tags:[`minimal`,`light`],state:B({skin:`minimal`,sentBg:`#18181b`,receivedBg:`#a1a1aa`,surface:`#fafafa`,avatars:!1,typing:`off`})},{name:`Flat Cards`,tags:[`flat`],state:B({skin:`flat`,sentBg:`#8b5cf6`,sentText:`#ffffff`,tail:`none`})},{name:`Support Widget`,tags:[`light`],state:B({sentBg:`#4f46e5`,sentText:`#ffffff`,receivedBg:`#f1f5f9`,receivedText:`#0f172a`,surface:`#ffffff`,radius:16,tail:`none`,entrance:!0,maxWidth:260,fontSize:14})},{name:`Terminal Green`,tags:[`retro`],state:B({skin:`outline`,sentBg:`#22c55e`,receivedBg:`#166534`,surface:`#020a04`,radius:4,avatars:!1,typing:`fade`})},{name:`Animated Entrance`,tags:[`motion`],state:B({entrance:!0,typing:`grow`,sentBg:`#f43f5e`,sentText:`#ffffff`,receivedBg:`#27272a`})}],H=[`innerHTML`],U=[`innerHTML`],W=r({__name:`chat`,setup(r){let{state:b,randomize:x,reset:E,undo:O,redo:k,pushHistory:A,shareUrlRef:j}=_({id:`chat`,defaultState:JSON.parse(JSON.stringify(D)),randomize:z}),M=i(`editor:shareUrl`,()=>{});s(()=>M(j.value));let N=a(()=>I(b.value)),P=a(()=>L(b.value)),F=a(()=>R(b.value)),B=a(()=>`<style>${N.value}</style>`),W=a(()=>[`outline`,`brutal`,`minimal`,`thread`,`soft`].includes(b.value.skin)),G=a(()=>b.value.skin===`thread`);function K(e){b.value=JSON.parse(JSON.stringify(V[e].state)),A()}let q=a(()=>V.map(e=>({name:e.name,css:I(e.state),html:L(e.state)})));return(r,i)=>{let a=g,s=m,_=v,D=d,A=f,j=y,M=S,I=h,L=p;return o(),l(L,{title:`Chat Bubbles`,description:`Nine chat skins with tails, grouping, avatars, receipts and typing indicators.`,css:u(N),html:u(P),vars:u(F),onRandomize:u(x),onReset:u(E),onUndo:u(O),onRedo:u(k)},{preview:c(()=>[e(s,{variants:u(q),onApplyVariant:K,title:`Chat preview`,filename:`css-studio-chat`},{presets:c(()=>[e(a,{presets:u(V),onApply:K},null,8,[`presets`])]),default:c(()=>[t(`div`,{innerHTML:u(B),"aria-hidden":`true`},null,8,H),(o(),n(`div`,{key:u(b).entrance?JSON.stringify(u(b)):`static`,class:`flex h-full w-full max-w-2xl items-center justify-center p-6`},[t(`div`,{class:`w-full`,innerHTML:u(P)},null,8,U)]))]),_:1},8,[`variants`])]),controls:c(()=>[e(A,{label:`Style`,icon:`ph-chats`},{default:c(()=>[e(_,{modelValue:u(b).skin,"onUpdate:modelValue":i[0]||=e=>u(b).skin=e,label:`Skin`,options:u(C)},null,8,[`modelValue`,`options`]),e(_,{modelValue:u(b).tail,"onUpdate:modelValue":i[1]||=e=>u(b).tail=e,label:u(W)?`Tail (not used by this skin)`:`Tail`,options:u(w)},null,8,[`modelValue`,`label`,`options`]),e(_,{modelValue:u(b).typing,"onUpdate:modelValue":i[2]||=e=>u(b).typing=e,label:`Typing indicator`,options:u(T)},null,8,[`modelValue`,`options`]),e(D,{modelValue:u(b).radius,"onUpdate:modelValue":i[3]||=e=>u(b).radius=e,label:`Radius`,min:0,max:28,suffix:`px`},null,8,[`modelValue`]),e(D,{modelValue:u(b).padding,"onUpdate:modelValue":i[4]||=e=>u(b).padding=e,label:`Padding`,min:4,max:18,suffix:`px`},null,8,[`modelValue`]),e(D,{modelValue:u(b).fontSize,"onUpdate:modelValue":i[5]||=e=>u(b).fontSize=e,label:`Font size`,min:12,max:20,suffix:`px`},null,8,[`modelValue`]),e(D,{modelValue:u(b).maxWidth,"onUpdate:modelValue":i[6]||=e=>u(b).maxWidth=e,label:`Bubble max width`,min:200,max:480,step:10,suffix:`px`},null,8,[`modelValue`])]),_:1}),e(A,{label:`Layout`,icon:`ph-list`},{default:c(()=>[e(j,{modelValue:u(b).grouped,"onUpdate:modelValue":i[7]||=e=>u(b).grouped=e,label:`Group consecutive messages`},null,8,[`modelValue`]),e(j,{modelValue:u(b).avatars,"onUpdate:modelValue":i[8]||=e=>u(b).avatars=e,label:`Avatars`,hint:u(G)?`Always on for Thread`:void 0},null,8,[`modelValue`,`hint`]),e(j,{modelValue:u(b).names,"onUpdate:modelValue":i[9]||=e=>u(b).names=e,label:`Sender names`,hint:u(G)?`Always on for Thread`:void 0},null,8,[`modelValue`,`hint`]),e(j,{modelValue:u(b).timestamps,"onUpdate:modelValue":i[10]||=e=>u(b).timestamps=e,label:`Timestamps`},null,8,[`modelValue`]),e(j,{modelValue:u(b).receipts,"onUpdate:modelValue":i[11]||=e=>u(b).receipts=e,label:`Read receipts`},null,8,[`modelValue`]),e(j,{modelValue:u(b).entrance,"onUpdate:modelValue":i[12]||=e=>u(b).entrance=e,label:`Entrance animation`},null,8,[`modelValue`])]),_:1}),e(A,{label:`Colors`,icon:`ph-palette`},{default:c(()=>[e(M,{"model-value":u(b).sentBg,label:`Sent bg`,"onUpdate:modelValue":i[13]||=e=>u(b).sentBg=e},null,8,[`model-value`]),e(M,{"model-value":u(b).sentText,label:`Sent text`,"onUpdate:modelValue":i[14]||=e=>u(b).sentText=e},null,8,[`model-value`]),e(M,{"model-value":u(b).receivedBg,label:`Received bg`,"onUpdate:modelValue":i[15]||=e=>u(b).receivedBg=e},null,8,[`model-value`]),e(M,{"model-value":u(b).receivedText,label:`Received text`,"onUpdate:modelValue":i[16]||=e=>u(b).receivedText=e},null,8,[`model-value`]),e(M,{"model-value":u(b).accent,label:`Accent (gradient / glass)`,"onUpdate:modelValue":i[17]||=e=>u(b).accent=e},null,8,[`model-value`]),e(M,{"model-value":u(b).surface,label:`Chat surface`,"onUpdate:modelValue":i[18]||=e=>u(b).surface=e},null,8,[`model-value`])]),_:1})]),code:c(()=>[e(I,{css:u(N),html:u(P),vars:u(F),filename:`css-studio-chat`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{W as default};