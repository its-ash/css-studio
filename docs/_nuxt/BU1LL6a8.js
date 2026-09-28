var e={width:10,trackColor:`#18181b`,thumbColor:`#3f3f46`,thumbHoverColor:`#52525b`,radius:999,rounded:!0,useFirefox:!0};function t(e){let t=e.rounded?`${e.radius}px`:`0px`,n=[`.scroll-area::-webkit-scrollbar {`,`  width: ${e.width}px;`,`  height: ${e.width}px;`,`}`,``,`.scroll-area::-webkit-scrollbar-track {`,`  background: ${e.trackColor};`,`  border-radius: ${t};`,`}`,``,`.scroll-area::-webkit-scrollbar-thumb {`,`  background: ${e.thumbColor};`,`  border-radius: ${t};`,`}`,``,`.scroll-area::-webkit-scrollbar-thumb:hover {`,`  background: ${e.thumbHoverColor};`,`}`];return e.useFirefox&&n.push(``,`.scroll-area {`,`  scrollbar-width: thin;`,`  scrollbar-color: ${e.thumbColor} ${e.trackColor};`,`}`),n.join(`
`)}function n(){return`<div class="scroll-area">
  <!-- scrollable content -->
</div>`}function r(e){return{"--scrollbar-width":`${e.width}px`,"--scrollbar-track":e.trackColor,"--scrollbar-thumb":e.thumbColor,"--scrollbar-thumb-hover":e.thumbHoverColor}}function i(e,t){let n=Math.floor(t.range(0,360));return{...e,width:Math.round(t.range(6,16)),trackColor:`hsl(${n} 15% 12%)`,thumbColor:`hsl(${n} 30% 35%)`,thumbHoverColor:`hsl(${n} 40% 45%)`,rounded:t.chance(.7)}}var a=[{name:`Zinc Thin`,tags:[`dark`,`minimal`],state:{...e}},{name:`Emerald Accent`,tags:[`brand`],state:{...e,thumbColor:`#10b981`,thumbHoverColor:`#34d399`,trackColor:`#0a0a0b`}},{name:`Square Edge`,tags:[`mono`],state:{...e,rounded:!1,width:12,thumbColor:`#52525b`,trackColor:`#18181b`}},{name:`Wide Light`,tags:[`light`],state:{...e,width:14,trackColor:`#f4f4f5`,thumbColor:`#d4d4d8`,thumbHoverColor:`#a1a1aa`}},{name:`Hairline`,tags:[`minimal`],state:{...e,width:5,thumbColor:`#3f3f46`,trackColor:`transparent`}},{name:`Ocean`,tags:[`cool`],state:{...e,thumbColor:`#0ea5e9`,thumbHoverColor:`#38bdf8`,trackColor:`#0c1a24`}},{name:`Violet Glow`,tags:[`brand`,`playful`],state:{...e,thumbColor:`#8b5cf6`,thumbHoverColor:`#a78bfa`,trackColor:`#150f24`}},{name:`Invisible Track`,tags:[`minimal`,`dark`],state:{...e,trackColor:`transparent`,thumbColor:`#3f3f4680`,width:8}}],o=[{value:`progress-bar`,label:`Progress Bar`,timeline:`scroll`},{value:`progress-ring`,label:`Progress Ring`,timeline:`scroll`},{value:`read-indicator`,label:`Read Indicator`,timeline:`scroll`},{value:`reveal-up`,label:`Reveal Up`,timeline:`view`},{value:`reveal-left`,label:`Reveal Left`,timeline:`view`},{value:`reveal-scale`,label:`Reveal Scale`,timeline:`view`},{value:`reveal-blur`,label:`Reveal Blur`,timeline:`view`},{value:`parallax`,label:`Parallax`,timeline:`view`},{value:`rotate`,label:`Rotate on Scroll`,timeline:`view`},{value:`count-numbers`,label:`Count Numbers`,timeline:`view`}],s={kind:`progress-bar`,timeline:`scroll`,viewStart:10,viewEnd:90,rangeStart:0,rangeEnd:100,target:`.progress-bar`,accent:`#10b981`,bg:`#09090b`,width:4,distance:48,rotate:90};function c(e,t=0,n=100){return Math.min(n,Math.max(t,e))}function l(e){return e.timeline===`view`?`view(${c(e.viewStart)}% ${c(e.viewEnd)}%)`:e.rangeStart===0&&e.rangeEnd===100?`scroll()`:`scroll() ${c(e.rangeStart)}% ${c(e.rangeEnd)}%`}function u(e){let t=Math.max(0,e.distance);switch(e.kind){case`progress-bar`:return`@keyframes grow-x {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}`;case`read-indicator`:return`@keyframes read-progress {
  from { width: 0%; }
  to { width: 100%; }
}`;case`progress-ring`:return`@keyframes spin-ring {
  from { transform: rotate(-90deg); }
  to { transform: rotate(270deg); }
}`;case`count-numbers`:return`@keyframes count-up {
  from { transform: translateY(0); }
  to { transform: translateY(0); }
}`;case`reveal-up`:return`@keyframes reveal-up {
  from { opacity: 0; transform: translateY(${t}px); }
  to { opacity: 1; transform: translateY(0); }
}`;case`reveal-left`:return`@keyframes reveal-left {
  from { opacity: 0; transform: translateX(${t}px); }
  to { opacity: 1; transform: translateX(0); }
}`;case`reveal-scale`:return`@keyframes reveal-scale {
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
}`;case`reveal-blur`:return`@keyframes reveal-blur {
  from { opacity: 0; filter: blur(12px); }
  to { opacity: 1; filter: blur(0); }
}`;case`parallax`:return`@keyframes parallax {
  from { transform: translateY(${Math.round(t/2)}px); }
  to { transform: translateY(-${Math.round(t/2)}px); }
}`;case`rotate`:return`@keyframes spin-y {
  from { transform: rotateY(0deg); }
  to { transform: rotateY(${e.rotate}deg); }
}`;default:return``}}function d(e){let t=u(e),n=[];return n.push(`${e.target} {`),(e.kind===`progress-bar`||e.kind===`read-indicator`||e.kind===`progress-ring`)&&n.push(`  transform-origin: ${e.kind===`progress-ring`?`50% 50%`:`0 50%`};`),n.push(`  animation: scroll-${e.kind} linear both;`),n.push(`  animation-timeline: ${e.timeline===`view`?`view()`:`scroll()`};`),(e.timeline===`view`||e.rangeStart!==0||e.rangeEnd!==100)&&n.push(`  animation-range: ${l(e)};`),n.push(`}`),t&&n.push(``,t),n.join(`
`)}function f(){return`<div class="progress-bar"></div>`}function p(e){return{"--scroll-accent":e.accent,"--scroll-bg":e.bg,"--scroll-distance":`${e.distance}px`}}function m(e,t){let n=t.pick(o.map(e=>e.value)),r=o.find(e=>e.value===n),i=[`#10b981`,`#0ea5e9`,`#8b5cf6`,`#f59e0b`,`#f43f5e`,`#22d3ee`],a=n===`progress-bar`?`.progress-bar`:n===`read-indicator`?`.read-indicator`:n===`progress-ring`?`.ring`:n===`rotate`?`.rotator`:n===`parallax`?`.parallax`:`.reveal`;return{...e,kind:n,timeline:r.timeline,target:a,accent:t.pick(i),distance:Math.round(t.range(24,96)),rotate:Math.round(t.range(45,270)),viewStart:t.pick([0,5,10]),viewEnd:t.pick([85,90,100]),rangeStart:0,rangeEnd:100}}var h=[{name:`Top Progress Bar`,tags:[`progress`],state:{...s,kind:`progress-bar`,target:`.progress-bar`,accent:`#10b981`,width:4}},{name:`Read Indicator`,tags:[`progress`,`thin`],state:{...s,kind:`read-indicator`,target:`.read-indicator`,accent:`#0ea5e9`,width:3}},{name:`Reveal Up`,tags:[`view`,`reveal`],state:{...s,kind:`reveal-up`,timeline:`view`,target:`.reveal`,distance:48,viewStart:5,viewEnd:90}},{name:`Scale In`,tags:[`view`,`reveal`],state:{...s,kind:`reveal-scale`,timeline:`view`,target:`.reveal`,viewStart:10,viewEnd:90}},{name:`Blur In`,tags:[`view`,`reveal`,`smooth`],state:{...s,kind:`reveal-blur`,timeline:`view`,target:`.reveal`,viewStart:0,viewEnd:80}},{name:`Parallax Float`,tags:[`view`,`parallax`],state:{...s,kind:`parallax`,timeline:`view`,target:`.parallax`,distance:80,viewStart:0,viewEnd:100}},{name:`Scroll Rotate`,tags:[`view`,`rotate`],state:{...s,kind:`rotate`,timeline:`view`,target:`.rotator`,rotate:180,viewStart:0,viewEnd:100}},{name:`Count Stats`,tags:[`view`,`numbers`],state:{...s,kind:`count-numbers`,timeline:`view`,target:`.stat`,viewStart:10,viewEnd:90}}],g=[{value:`top`,label:`Top`},{value:`bottom`,label:`Bottom`},{value:`left`,label:`Left`},{value:`right`,label:`Right`}],_=[{value:`solid`,label:`Solid`},{value:`outline`,label:`Outline`},{value:`glass`,label:`Glass`},{value:`inverted`,label:`Inverted`},{value:`success`,label:`Success`},{value:`danger`,label:`Danger`}],v={text:`Tooltip text`,position:`top`,skin:`solid`,trigger:`hover`,offset:8,padding:6,radius:8,arrow:!0,fontSize:13,maxWidth:220,color:`#fafafa`,bg:`#18181b`,animate:!0},y={solid:{bg:null,color:null},outline:{bg:`transparent`,color:`var(--tooltip-bg)`},glass:{bg:`rgba(24, 24, 27, .72)`,color:null},inverted:{bg:`#fafafa`,color:`#18181b`},success:{bg:`#052e26`,color:`#34d399`},danger:{bg:`#2b0409`,color:`#fb7185`}};function b(e){let t=y[e.skin].bg??e.bg,n=y[e.skin].color??e.color,r=Math.max(0,e.offset);Math.max(2,e.padding);let i=Math.max(6,Math.round(e.fontSize*.45));`${r}`,`${r}`,`${r}`,`${r}`;let a={top:[`border-color: ${t} transparent transparent transparent`,`top: -${i}px`],bottom:[`border-color: transparent transparent ${t} transparent`,`bottom: -${i}px`],left:[`border-color: transparent transparent transparent ${t}`,`left: -${i}px`],right:[`border-color: transparent ${t} transparent transparent`,`right: -${i}px`]},o=e.arrow?`
.tooltip[data-tip]::after {
  content: "";
  position: absolute;
  ${a[e.position][1]};
  border-width: ${i}px;
  border-style: solid;
  ${a[e.position][0]};
  pointer-events: none;
}`:``,s=e.trigger===`focus`?`:focus-visible`:`:hover`,c={top:`translateY(2px)`,bottom:`translateY(-2px)`,left:`translateX(2px)`,right:`translateX(-2px)`},l={top:`translateY(0)`,bottom:`translateY(0)`,left:`translateX(0)`,right:`translateX(0)`},u=e.animate?`
  opacity: 0;
  ${c[e.position]};
  transition: opacity 160ms ease-out, transform 160ms ease-out;
`:``;return`.tooltip {
  position: relative;
}
.tooltip[data-tip]::before {
  content: attr(data-tip);
  position: absolute;
  z-index: 10;
  ${x(e,r)}
  max-width: ${e.maxWidth}px;
  padding: ${e.padding}px 10px;
  border-radius: ${e.radius}px;
  font-size: ${e.fontSize}px;
  line-height: 1.4;
  white-space: normal;
  text-align: center;
  pointer-events: none;
  background: ${t};
  color: ${n};
  ${e.skin===`outline`?`box-shadow: 0 0 0 1px ${e.bg};`:``}
  ${e.skin===`glass`?`backdrop-filter: blur(8px);`:``}
  ${u?u.trim():``}
}
${o}
.tooltip[data-tip]${s}::before {
  opacity: 1;
  ${e.animate?l[e.position]+`;`:``}
}
@media (prefers-reduced-motion: reduce) {
  .tooltip[data-tip]::before { transition: opacity 120ms ease; transform: none; }
}`}function x(e,t){switch(e.position){case`top`:return`bottom: calc(100% + ${t}px); left: 50%; margin-left: 0; transform: translateX(-50%);`;case`bottom`:return`top: calc(100% + ${t}px); left: 50%; transform: translateX(-50%);`;case`left`:return`right: calc(100% + ${t}px); top: 50%; transform: translateY(-50%);`;case`right`:return`left: calc(100% + ${t}px); top: 50%; transform: translateY(-50%);`}}function S(){return`<button class="tooltip" data-tip="Tooltip text">Hover me</button>`}function C(e){return{"--tooltip-bg":e.bg,"--tooltip-color":e.color,"--tooltip-offset":`${e.offset}px`,"--tooltip-radius":`${e.radius}px`}}function w(e,t){let n=[`Save changes`,`Keyboard shortcuts`,`Copied to clipboard`,`Beta feature`,`Double-click to edit`,`Filter by status`,`Share this view`,`Required field`],r=t.pick([[`#fafafa`,`#18181b`],[`#02120c`,`#34d399`],[`#2b0409`,`#fb7185`],[`#0c1a24`,`#7dd3fc`],[`#150f24`,`#c4b5fd`],[`#18181b`,`#fbbf24`]]);return{...e,text:t.pick(n),position:t.pick([`top`,`bottom`,`left`,`right`]),skin:t.pick([`solid`,`outline`,`glass`,`inverted`,`success`,`danger`]),arrow:t.chance(.75),radius:t.pick([0,6,8,999]),color:r[1],bg:r[0],animate:t.chance(.8)}}var T=[{name:`Dark Solid`,tags:[`dark`],state:{...v}},{name:`Light Inverted`,tags:[`light`],state:{...v,skin:`inverted`,bg:`#fafafa`,color:`#18181b`}},{name:`Outline`,tags:[`mono`],state:{...v,skin:`outline`,radius:0,bg:`#e4e4e7`,color:`#18181b`}},{name:`Glass`,tags:[`frosted`],state:{...v,skin:`glass`}},{name:`Success Tip`,tags:[`semantic`],state:{...v,skin:`success`,text:`Saved successfully`}},{name:`Danger Tip`,tags:[`semantic`],state:{...v,skin:`danger`,text:`Cannot delete this item`}},{name:`Focus Only`,tags:[`a11y`],state:{...v,trigger:`focus`,text:`Press Enter to submit`}},{name:`Pill Left`,tags:[`placement`],state:{...v,position:`left`,radius:999,text:`Keyboard: ⌘K`}}],E={text:`Free • Pure CSS • No JavaScript • Copy & Paste`,direction:`left`,duration:20,gap:48,fontSize:16,fontWeight:600,uppercase:!1,mono:!1,color:`#e4e4e7`,bg:`#09090b`,pauseOnHover:!0,repeat:4,edgeFade:!0,rotate:0};function D(e){let t=e.mono?`"JetBrains Mono", ui-monospace, monospace`:`inherit`,n=e.direction===`right`?`reverse`:`normal`;return`.marquee {
  overflow: hidden;
  ${e.rotate===0?``:`transform: rotate(${e.rotate}deg);`}
  ${e.edgeFade?`mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);`:``}
  background: ${e.bg};
}
.marquee-track {
  display: flex;
  gap: ${e.gap}px;
  width: max-content;
  animation: marquee-scroll ${e.duration}s linear infinite;
  animation-direction: ${n};
}
.marquee-track > span {
  font-size: ${e.fontSize}px;
  font-weight: ${e.fontWeight};
  font-family: ${t};
  ${e.uppercase?`text-transform: uppercase;`:``}
  letter-spacing: ${e.uppercase?`.08em`:`0`};
  color: ${e.color};
  white-space: nowrap;
}
${e.pauseOnHover?`.marquee:hover .marquee-track {
  animation-play-state: paused;
}`:``}
@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; }
}`.replace(`s.weight()`,`${e.fontWeight}`)}function O(){return`@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}`}function k(e){let t=`<span>${e.text.replace(/</g,`&lt;`)}</span>`;return`<div class="marquee">\n  <div class="marquee-track">${Array.from({length:Math.max(2,e.repeat)},()=>t).join(``)}</div>\n</div>`}function A(e){return{"--marquee-duration":`${e.duration}s`,"--marquee-gap":`${e.gap}px`,"--marquee-color":e.color,"--marquee-bg":e.bg}}function j(e,t){let n=[`Free • Pure CSS • No JavaScript`,`New drop — 12 tileable patterns`,`Open Source • MIT License`,`Fast • Accessible • Responsive`,`Made with CSS Studio`,`Now with scroll-driven animations`],r=t.pick([[`#e4e4e7`,`#09090b`],[`#34d399`,`#02120c`],[`#fbbf24`,`#1c1917`],[`#7dd3fc`,`#0c1a24`],[`#c4b5fd`,`#150f24`]]);return{...e,text:t.pick(n),direction:t.chance(.7)?`left`:`right`,duration:Math.round(t.range(8,30)),gap:t.pick([24,32,48,64]),fontSize:Math.round(t.range(12,28)),fontWeight:t.pick([400,500,600,700,800]),uppercase:t.chance(.5),mono:t.chance(.25),color:r[0],bg:r[1],pauseOnHover:t.chance(.7),edgeFade:t.chance(.7),rotate:t.pick([0,0,0,-3,2])}}var M=[{name:`Studio Ticker`,tags:[`dark`],state:{...E}},{name:`Retro Reverse`,tags:[`mono`],state:{...E,direction:`right`,mono:!0,uppercase:!0,gap:32,duration:14}},{name:`Mint Ribbon`,tags:[`brand`],state:{...E,text:`Now available — CSS Studio v2`,color:`#052e26`,bg:`#34d399`,fontWeight:700,duration:16}},{name:`Slow Drift`,tags:[`calm`],state:{...E,duration:40,gap:80,fontSize:13,fontWeight:400,color:`#a1a1aa`}},{name:`Hazard Tape`,tags:[`bold`],state:{...E,text:`UNDER CONSTRUCTION — DO NOT CROSS`,uppercase:!0,fontWeight:800,bg:`#f59e0b`,color:`#1c1917`,duration:10,rotate:-2}},{name:`Tilted News`,tags:[`editorial`],state:{...E,text:`Breaking: CSS can do that`,rotate:2,fontSize:18,duration:18}},{name:`Pulse Dot`,tags:[`minimal`],state:{...E,text:`All systems operational`,color:`#34d399`,fontSize:12,mono:!0,gap:24,duration:24}},{name:`Big Type`,tags:[`display`],state:{...E,text:`SCROLL INFINITY`,uppercase:!0,fontWeight:900,fontSize:32,duration:30,gap:64}}],N=[{family:`Roboto Flex`,axes:`wght 100-900, opsz 8-144, slnt 0-10`},{family:`Inter`,axes:`wght 100-900, opsz 14-32`},{family:`Fraunces`,axes:`wght 100-900, opsz 9-144, SOFT 0-100`},{family:`Raleway`,axes:`wght 100-900`}],P={text:`Variable`,family:`Roboto Flex`,weight:400,opticalSize:24,slant:0,width:100,size:72,color:`#e4e4e7`,bg:`#09090b`,lineHeight:1.1,tracking:0,animateWeight:!1,weightDuration:4};function F(e){let t=[`'wght' ${e.weight}`];e.opticalSize!==24&&t.push(`'opsz' ${e.opticalSize}`),e.slant!==0&&t.push(`'slnt' ${e.slant}`),e.width!==100&&t.push(`'wdth' ${e.width}`);let n=e.animateWeight?`
  animation: vf-weight ${e.weightDuration}s ease-in-out infinite alternate;
`:``,r=t.filter(e=>!e.startsWith(`'wght'`)),i=I(e,100),a=r.length?`'wght' 900, ${r.join(`, `)}`:`'wght' 900`,o=e.animateWeight?`

@keyframes vf-weight {
  from { font-variation-settings: ${i}; }
  to { font-variation-settings: ${a}; }
}`:``;return`.variable-font {
  font-family: "${e.family}", sans-serif;
  font-variation-settings: ${t.join(`, `)};
  font-size: ${e.size}px;
  line-height: ${e.lineHeight};
  letter-spacing: ${e.tracking}em;
  color: ${e.color};
  background: ${e.bg};${n?n.trimEnd():``}
}${o}`}function I(e,t){let n=[`'wght' ${t}`];return e.opticalSize!==24&&n.push(`'opsz' ${e.opticalSize}`),e.slant!==0&&n.push(`'slnt' ${e.slant}`),e.width!==100&&n.push(`'wdth' ${e.width}`),n.join(`, `)}function L(e){return`<p class="variable-font">${e.text.replace(/</g,`&lt;`)}</p>`}function R(e){return{"--vf-weight":`${e.weight}`,"--vf-size":`${e.size}px`}}function z(e,t){let n=[`Fluid`,`Variable`,`Optical`,`Weights`,`Axes`,`Responsive`,`Dynamic`,`Kinetic`];return{...e,text:t.pick(n),family:t.pick(N.map(e=>e.family)),weight:Math.round(t.range(100,900)/50)*50,opticalSize:Math.round(t.range(14,144)),slant:t.chance(.4)?0:Math.round(t.range(-10,0)),width:t.chance(.5)?100:Math.round(t.range(75,125)),size:Math.round(t.range(40,110)),animateWeight:t.chance(.4),weightDuration:Math.round(t.range(2,6))}}var B=[{name:`Feather`,tags:[`light`],state:{...P,weight:100,opticalSize:144,tracking:.01}},{name:`Black Poster`,tags:[`heavy`],state:{...P,weight:900,opticalSize:144,size:96}},{name:`Animated Weight`,tags:[`animated`],state:{...P,text:`Fluid Type`,animateWeight:!0,weightDuration:3,size:88}},{name:`Condensed`,tags:[`width`],state:{...P,text:`NARROW`,width:62.5,weight:700,size:90}},{name:`Expanded`,tags:[`width`],state:{...P,text:`WIDE`,width:151,weight:500,size:64}},{name:`Optical Max`,tags:[`opsz`],state:{...P,text:`Display`,opticalSize:144,weight:600,size:84}},{name:`Optical Min`,tags:[`opsz`],state:{...P,text:`caption text`,opticalSize:8,weight:400,size:20,tracking:.02}},{name:`Slanted`,tags:[`slnt`],state:{...P,text:`Lean Back`,slant:-10,weight:500}}],V={text:`PURE CSS • NO JS • `,size:260,radius:100,fontSize:14,fontWeight:600,letterSpacing:2,uppercase:!0,color:`#e4e4e7`,ringColor:`#10b981`,bg:`#09090b`,spin:!0,spinDuration:14,spinDirection:`normal`,centerIcon:!0,repeatText:3};function H(e){return Math.max(20,Math.round(e.radius)),`.text-ring {
  position: relative;
  width: ${e.size}px;
  height: ${e.size}px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: ${e.bg};
  ${e.ringColor?`border: 2px solid ${e.ringColor};`:``}
}
.text-ring-spin {
  position: absolute;
  inset: 0;
  ${e.spin?`animation: ring-spin ${e.spinDuration}s linear infinite;
  animation-direction: ${e.spinDirection};`:``}
}
.text-ring-spin > span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 0 0;
  font-size: ${e.fontSize}px;
  font-weight: ${e.fontWeight};
  letter-spacing: ${e.letterSpacing}px;
  ${e.uppercase?`text-transform: uppercase;`:``}
  color: ${e.color};
  line-height: 1;
  pointer-events: none;
}
.text-ring-center {
  position: relative;
  z-index: 1;
  color: ${e.ringColor};
}
@media (prefers-reduced-motion: reduce) {
  .text-ring-spin { animation: none; }
}`}function U(){return`@keyframes ring-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`}function W(e){let t=[...Array.from({length:Math.max(1,Math.round(e.repeatText))},()=>e.text.trim()).join(` `)],n=Math.max(20,Math.round(e.radius)),r=360/Math.max(1,t.length);return`<div class="text-ring">
  <div class="text-ring-spin" aria-hidden="true">${t.map((e,t)=>`<span style="transform: rotate(${(r*t).toFixed(2)}deg) translate(${n}px, -50%)">${e===` `?`&nbsp;`:e}</span>`).join(``)}</div>
  <span class="text-ring-center">${e.centerIcon?`◆`:e.text.slice(0,2).toUpperCase()}</span>
</div>`}function G(e){return{"--ring-size":`${e.size}px`,"--ring-radius":`${e.radius}px`,"--ring-color":e.ringColor}}function K(e,t){let n=[`MADE WITH CSS STUDIO`,`SCROLL • EXPLORE • CREATE`,`PURE CSS RING`,`OPEN SOURCE TOOLS`,`BUILD • SHIP • REPEAT`],r=[`#10b981`,`#0ea5e9`,`#8b5cf6`,`#f59e0b`,`#f43f5e`,`#22d3ee`];return{...e,text:t.pick(n),size:t.pick([200,240,280,320]),fontSize:Math.round(t.range(10,20)),fontWeight:t.pick([400,500,600,700,800]),letterSpacing:Math.round(t.range(0,6)),uppercase:t.chance(.8),color:t.pick([`#e4e4e7`,`#a1a1aa`,...r]),ringColor:t.pick(r),spin:t.chance(.75),spinDuration:Math.round(t.range(8,30)),spinDirection:t.chance(.7)?`normal`:`reverse`,centerIcon:t.chance(.6)}}var q=[{name:`Studio Seal`,tags:[`brand`],state:{...V}},{name:`Slow Spin`,tags:[`calm`],state:{...V,spinDuration:30,fontSize:12}},{name:`Fast Badge`,tags:[`playful`],state:{...V,text:`CSS ONLY`,size:200,spinDuration:8,ringColor:`#f59e0b`}},{name:`Reverse Spin`,tags:[`direction`],state:{...V,spinDirection:`reverse`,ringColor:`#0ea5e9`}},{name:`Static Stamp`,tags:[`still`],state:{...V,spin:!1,centerIcon:!1,text:`EST 2026`}},{name:`Big Ring`,tags:[`display`],state:{...V,size:340,radius:130,fontSize:16,fontWeight:800,letterSpacing:4}},{name:`Violet Orbit`,tags:[`color`],state:{...V,ringColor:`#8b5cf6`,color:`#c4b5fd`,bg:`#150f24`}},{name:`Hairline Ring`,tags:[`minimal`],state:{...V,ringColor:`#3f3f46`,fontSize:11,fontWeight:400,letterSpacing:1}}];export{p as A,C as B,i as C,d as D,z as E,W as F,L as H,U as I,G as L,n as M,r as N,f as O,H as P,b as R,m as S,w as T,R as U,F as V,D as _,v as a,A as b,a as c,T as d,B as f,N as g,_ as h,V as i,t as j,u as k,h as l,g as m,e as n,P as o,o as p,s as r,M as s,E as t,q as u,k as v,K as w,j as x,O as y,S as z};