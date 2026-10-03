import{A as e,C as t,M as n,R as r,S as i,X as a,ct as o,lt as s,w as c,wt as l}from"./MitKKUeq.js";import{a as u,i as d,n as f,o as p,r as m,s as h,t as g}from"./DJLqZT_o.js";import{t as _}from"./D3e07OzS.js";import{t as v}from"./Dh2B6pZ8.js";import{t as y}from"./BYmGHvE7.js";import{t as b}from"./CcuAq1zZ.js";var x=[{value:`mac`,label:`macOS`},{value:`flat`,label:`Flat`},{value:`glass`,label:`Glass`}],S={skin:`mac`,bg:`#0d1117`,titleBar:`#161b22`,title:`zsh — css-studio`,textColor:`#e6edf3`,promptColor:`#10b981`,commandColor:`#fafafa`,outputColor:`#8b949e`,fontSize:13,radius:12,showGrid:!0},C=`npx hyperframes render promo`,w=`✓ Composition validated
✓ Rendering 624 frames @ 30fps
✓ Output: promo.mp4 (12.8s)`;function T(e){let t={mac:`.terminal {
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
}`,flat:`.terminal {
  border: 1px solid rgba(255, 255, 255, 0.06);
}`,glass:`.terminal {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04) !important;
  backdrop-filter: blur(12px);
}`},n=e.showGrid?`.terminal-body {
  background-image: linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
  background-size: 24px 24px;
}`:``;return`${t[e.skin]}

.terminal {
  width: 480px;
  border-radius: ${e.radius}px;
  overflow: hidden;
  font-family: ui-monospace, 'SF Mono', Menlo, monospace;
  background: ${e.bg};
}

.terminal-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: ${e.titleBar};
}

.terminal-dots {
  display: flex;
  gap: 7px;
}

.terminal-dots span {
  width: 12px;
  height: 12px;
  border-radius: 999px;
}

.terminal-dots span:nth-child(1) {
  background: #ff5f57;
}

.terminal-dots span:nth-child(2) {
  background: #febc2e;
}

.terminal-dots span:nth-child(3) {
  background: #28c840;
}

.terminal-title {
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: ${e.outputColor};
  margin-right: 52px;
}

.terminal-body {
  padding: 16px;
  font-size: ${e.fontSize}px;
  line-height: 1.7;
  color: ${e.textColor};
  min-height: 160px;
}

${n}

.terminal-prompt {
  color: ${e.promptColor};
}

.terminal-command {
  color: ${e.commandColor};
}

.terminal-output {
  color: ${e.outputColor};
  white-space: pre-line;
}

.terminal-cursor {
  display: inline-block;
  width: 8px;
  height: 1.1em;
  background: ${e.promptColor};
  vertical-align: text-bottom;
  animation: term-blink 1s step-end infinite;
}

@keyframes term-blink {
  50% {
    opacity: 0;
  }
}`}function E(e){return`<div class="terminal">
  <div class="terminal-bar">
    <div class="terminal-dots"><span></span><span></span><span></span></div>
    <span class="terminal-title">${e.title}</span>
  </div>
  <div class="terminal-body">
    <div><span class="terminal-prompt">➜</span> <span class="terminal-command">${C}</span></div>
    <div class="terminal-output">${w}</div>
    <div><span class="terminal-prompt">➜</span> <span class="terminal-cursor"></span></div>
  </div>
</div>`}function D(e){return{"--term-bg":e.bg,"--term-prompt":e.promptColor,"--term-radius":`${e.radius}px`}}function O(e,t){let n=Math.floor(t.range(0,360));return{...e,skin:t.pick(x.map(e=>e.value)),bg:`hsl(${n} 30% 6%)`,titleBar:`hsl(${n} 25% 12%)`,promptColor:`hsl(${n} 80% 55%)`,commandColor:`hsl(${n} 15% 96%)`,outputColor:`hsl(${n} 10% 60%)`,radius:t.pick([0,8,12,16]),showGrid:t.chance(.5)}}var k=[{name:`GitHub Dark`,tags:[`dark`],state:{...S}},{name:`Emerald Prompt`,tags:[`brand`],state:{...S,promptColor:`#10b981`,bg:`#09090b`,titleBar:`#18181b`}},{name:`Neon Grid`,tags:[`neon`,`grid`],state:{...S,promptColor:`#22d3ee`,bg:`#020617`,titleBar:`#0f172a`,showGrid:!0}},{name:`Flat Minimal`,tags:[`minimal`],state:{...S,skin:`flat`,radius:0,showGrid:!1}},{name:`Glass Panel`,tags:[`glass`],state:{...S,skin:`glass`,radius:16,showGrid:!1}},{name:`Solarized`,tags:[`retro`],state:{...S,bg:`#002b36`,titleBar:`#073642`,promptColor:`#b58900`,outputColor:`#93a1a1`}},{name:`Amber CRT`,tags:[`retro`,`crt`],state:{...S,bg:`#1a0f00`,titleBar:`#2b1a00`,promptColor:`#fbbf24`,commandColor:`#fde68a`,showGrid:!0}},{name:`Violet Zsh`,tags:[`brand`],state:{...S,promptColor:`#8b5cf6`,bg:`#0f0a1e`,titleBar:`#181028`}},{name:`Light Term`,tags:[`light`],state:{...S,bg:`#fafafa`,titleBar:`#e4e4e7`,textColor:`#18181b`,commandColor:`#09090b`,outputColor:`#71717a`,promptColor:`#10b981`}},{name:`Compact`,tags:[`small`],state:{...S,fontSize:11,radius:8,width:420}}],A=[`innerHTML`],j={class:`flex h-full w-full max-w-3xl items-center justify-center p-6`},M=[`innerHTML`],N=n({__name:`terminal`,setup(n){let{state:C,randomize:w,reset:N,undo:P,redo:F,pushHistory:I,shareUrlRef:L}=g({id:`terminal`,defaultState:JSON.parse(JSON.stringify(S)),randomize:O}),R=r(`editor:shareUrl`,()=>{});o(()=>R(L.value));let z=i(()=>T(C.value)),B=i(()=>E(C.value)),V=i(()=>D(C.value)),H=i(()=>`<style>${z.value}</style>`);function U(e){C.value=JSON.parse(JSON.stringify(k[e].state)),I()}let W=i(()=>k.map(e=>({name:e.name,css:T(e.state),html:E(e.state)})));return(n,r)=>{let i=h,o=p,g=_,S=b,T=u,E=v,D=d,O=y,I=m,L=f;return a(),c(L,{title:`Terminal Window`,description:`macOS-style terminal mockups — traffic lights included.`,css:l(z),html:l(B),vars:l(V),onRandomize:l(w),onReset:l(N),onUndo:l(P),onRedo:l(F)},{preview:s(()=>[e(o,{variants:l(W),onApplyVariant:U,title:`Terminal preview`,filename:`css-studio-terminal`},{presets:s(()=>[e(i,{presets:l(k),onApply:U},null,8,[`presets`])]),default:s(()=>[t(`div`,{innerHTML:l(H),"aria-hidden":`true`},null,8,A),t(`div`,j,[t(`div`,{innerHTML:l(B)},null,8,M)])]),_:1},8,[`variants`])]),controls:s(()=>[e(D,{label:`Window`,icon:`ph-terminal-window`},{default:s(()=>[e(g,{modelValue:l(C).skin,"onUpdate:modelValue":r[0]||=e=>l(C).skin=e,label:`Skin`,options:l(x)},null,8,[`modelValue`,`options`]),e(S,{modelValue:l(C).title,"onUpdate:modelValue":r[1]||=e=>l(C).title=e,label:`Title`},null,8,[`modelValue`]),e(T,{modelValue:l(C).fontSize,"onUpdate:modelValue":r[2]||=e=>l(C).fontSize=e,label:`Font size`,min:10,max:18,suffix:`px`},null,8,[`modelValue`]),e(T,{modelValue:l(C).radius,"onUpdate:modelValue":r[3]||=e=>l(C).radius=e,label:`Radius`,min:0,max:24,suffix:`px`},null,8,[`modelValue`]),e(E,{modelValue:l(C).showGrid,"onUpdate:modelValue":r[4]||=e=>l(C).showGrid=e,label:`Background grid`},null,8,[`modelValue`])]),_:1}),e(D,{label:`Colors`,icon:`ph-palette`},{default:s(()=>[e(O,{"model-value":l(C).bg,label:`Body`,"onUpdate:modelValue":r[5]||=e=>l(C).bg=e},null,8,[`model-value`]),e(O,{"model-value":l(C).titleBar,label:`Title bar`,"onUpdate:modelValue":r[6]||=e=>l(C).titleBar=e},null,8,[`model-value`]),e(O,{"model-value":l(C).promptColor,label:`Prompt`,"onUpdate:modelValue":r[7]||=e=>l(C).promptColor=e},null,8,[`model-value`]),e(O,{"model-value":l(C).commandColor,label:`Command`,"onUpdate:modelValue":r[8]||=e=>l(C).commandColor=e},null,8,[`model-value`]),e(O,{"model-value":l(C).outputColor,label:`Output`,"onUpdate:modelValue":r[9]||=e=>l(C).outputColor=e},null,8,[`model-value`])]),_:1})]),code:s(()=>[e(I,{css:l(z),html:l(B),vars:l(V),filename:`css-studio-terminal`},null,8,[`css`,`html`,`vars`])]),_:1},8,[`css`,`html`,`vars`,`onRandomize`,`onReset`,`onUndo`,`onRedo`])}}});export{N as default};