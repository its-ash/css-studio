import{$t as e,A as t,F as n,G as r,H as i,I as a,Ot as o,Pt as s,R as c,U as l,bt as u,i as d,it as f,lt as p,nn as m,r as h,st as g,tn as _,vt as v,z as y}from"./nW5eDnH9.js";import{ot as b,t as ee}from"./CyCVgnjN.js";import{a as x,i as te,n as S,t as ne}from"#entry";import{t as C}from"./Bxc0cDnT.js";import{t as re}from"./DgvkL9NY.js";import{n as ie,t as ae}from"./BQAh4OUh.js";import{i as w,s as T,t as E}from"./BMBmj3pX.js";import{t as oe}from"./grKf0cqL.js";var D={},O=new Set,k=null;function A(){return k??=fetch(`/scss/manifest.json`).then(e=>e.ok?e.json():[]).then(e=>new Set(e)).catch(()=>new Set),k}async function j(e){if(D[e])return D[e];if(O.has(e))throw Error(`Failed to load ${e}`);let t=e.startsWith(`scss/`)?e:`scss/${e}`,n=await fetch(`/${t}`);if(!n.ok)throw O.add(e),Error(`Failed to load ${e}`);let r=await n.text();return D[e]=r,r}function M(e){let t=e.includes(`/`)?e.slice(0,e.lastIndexOf(`/`)):``,n=(e.includes(`/`)?e.slice(e.lastIndexOf(`/`)+1):e).replace(/\.scss$/,``),r=t?`${t}/`:``;return[`${r}${n}.scss`,`${r}_${n}.scss`,`${r}${n}/_index.scss`,`${r}${n}/index.scss`]}async function N(e){let t=M(e),n=await A();if(n.size===0)return t;let r=t.filter(e=>n.has(e.startsWith(`scss/`)?e:`scss/${e}`));return r.length>0?r:t}var P=null;function F(){return P??=x(()=>import(`./DJ17QVKo.js`),[],import.meta.url),P}var I=/^#[0-9a-fA-F]{3,8}$/,L=/^[A-Za-z0-9 ]{1,60}$/,R=/^\$[a-zA-Z][a-zA-Z0-9-]*$/,z=/^[a-zA-Z0-9#%.,\s()'"_-]{1,120}$/;async function se(e,t,n,r){let i=await F(),a=L.test(n)?`"${n.replace(/["\\]/g,`\\$&`)}", Helvetica, Arial, sans-serif`:null,o=L.test(r)?`"${r.replace(/["\\]/g,`\\$&`)}", Helvetica, Arial, sans-serif`:null,s=[o?`body, .button, .input, .textarea, .select select, .box, .card, .card-header, .notification, .tag, .table, .navbar, .navbar-item, .panel-block, .content, .icon-text { font-family: ${o} !important; }`:``,a?`.navbar-brand, blockquote, h1, h2, h3, h4, h5, h6 { font-family: ${a} !important; }`:``].filter(Boolean).join(`
`),c=[[`$primary`,t.primary],[`$link`,t.secondary],[`$success`,t.success],[`$danger`,t.danger],[`$warning`,t.warning],[`$info`,t.info],[`$light`,t.light],[`$dark`,t.dark],[`$body-background-color`,t.bodyBg],[`$body-color`,t.bodyColor]].filter(([,e])=>I.test(e)),l=``;e&&(l=await j(`scss/presets/${e}.scss`));let u=new Map(c),d=l.match(/^\/\/!\s*bulma-config:\s*(\{[^\n]*\})\s*$/m);if(d){l=l.replace(d[0],``);try{let e=JSON.parse(d[1]);for(let[t,n]of Object.entries(e))R.test(t)&&typeof n==`string`&&z.test(n)&&u.set(t,n.includes(`,`)?`(${n})`:n)}catch(t){console.error(`Invalid bulma-config in preset:`,e,t)}}let f=`${`@use "bulma/bulma-entry" with (\n${[...u.entries()].map(([e,t])=>`  ${e}: ${t}`).join(`,
`)}\n);`}\n${l}\n${s}`;return(await i.compileStringAsync(f,{importers:[{async canonicalize(e,t){let n=e.startsWith(`~`)?e.slice(1):e,r=t.containingUrl?t.containingUrl.href:`file:///scss/entry.scss`,i=new URL(n,r).pathname.slice(1);for(let e of await N(i))try{return await j(e),new URL(`file:///${e}`)}catch{}return null},async load(e){let t=e.pathname.slice(1);try{return{contents:await j(t),syntax:`scss`}}catch{return null}}}],url:new URL(`file:///scss/entry.scss`)})).css}function ce(e){let t=`bulma-theme-google-fonts`,n=document.getElementById(t);n||(n=document.createElement(`link`),n.id=t,n.rel=`stylesheet`,document.head.appendChild(n));let r=[...new Set(e)].map(e=>`family=${e.replace(/ /g,`+`)}:wght@300;400;500;600;700;800`).join(`&`);n.href=`https://fonts.googleapis.com/css2?${r}&display=swap`}var le=`
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="#"><strong>Brand</strong></a>
  </div>
  <div class="navbar-menu is-active">
    <div class="navbar-start">
      <a class="navbar-item is-active" href="#">Home</a>
      <a class="navbar-item" href="#">Features</a>
      <a class="navbar-item" href="#">Pricing</a>
      <a class="navbar-item" href="#" aria-disabled="true">Disabled</a>
    </div>
  </div>
</nav>

<div class="container-fluid">

  <section class="section-block">
    <h2 class="section-title">Typography</h2>
    <h1 class="title is-1">Heading 1</h1>
    <h2 class="title is-2">Heading 2</h2>
    <h3 class="title is-3">Heading 3</h3>
    <h4 class="title is-4">Heading 4</h4>
    <h5 class="title is-5">Heading 5</h5>
    <h6 class="title is-6">Heading 6</h6>
    <p class="mt-3">The quick brown fox jumps over the lazy dog. This paragraph demonstrates body text rendering with the selected font family and theme colors.</p>
    <p>
      <code>const x = 1;</code> &middot;
      <kbd>Ctrl</kbd>+<kbd>S</kbd> &middot;
      <mark>highlighted text</mark> &middot;
      <small>small print</small> &middot;
      <abbr title="HyperText Markup Language">HTML</abbr> &middot;
      <del>deleted</del> &middot;
      <ins>inserted</ins> &middot;
      <strong>bold</strong> &middot;
      <em>italic</em>
    </p>
    <blockquote>
      <p class="mb-0">"Design is not just what it looks like — design is how it works."</p>
      <footer class="mt-1">Steve Jobs</footer>
    </blockquote>
    <hr />
  </section>

  <section class="section-block">
    <h2 class="section-title">Buttons</h2>
    <div class="row-flex">
      <button class="button is-primary">Primary</button>
      <button class="button is-link">Secondary</button>
      <button class="button is-success">Success</button>
      <button class="button is-danger">Danger</button>
      <button class="button is-warning">Warning</button>
      <button class="button is-info">Info</button>
      <button class="button is-outlined is-primary">Outline</button>
      <button class="button is-primary" disabled>Disabled</button>
    </div>
  </section>

  <section class="section-block">
    <h2 class="section-title">Progress &amp; Loaders</h2>
    <progress class="progress is-primary mb-2" value="65" max="100">65%</progress>
    <progress class="progress is-success mb-3" max="100"></progress>
    <div class="row-flex" style="align-items:center;">
      <button class="button is-loading is-primary">Loading</button>
      <span>Loading…</span>
    </div>
  </section>

  <section class="section-block">
    <h2 class="section-title">Form Controls</h2>
    <div class="row-flex">
      <div class="field" style="flex: 1 1 200px;">
        <label class="label">Text input</label>
        <div class="control">
          <input type="text" class="input" placeholder="Enter text" />
        </div>
      </div>
      <div class="field" style="flex: 1 1 200px;">
        <label class="label">Select</label>
        <div class="control">
          <div class="select is-fullwidth">
            <select>
              <option>One</option>
              <option>Two</option>
              <option>Three</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field" style="flex: 1 1 200px;">
        <label class="label">Range</label>
        <input type="range" style="width: 100%;" />
      </div>
      <div class="field" style="flex: 1 1 200px;">
        <label class="checkbox">
          <input type="checkbox" checked />
          Checkbox
        </label>
      </div>
      <div class="field" style="flex: 1 1 200px;">
        <label class="radio">
          <input type="radio" name="r" checked />
          Radio A
        </label>
        <label class="radio">
          <input type="radio" name="r" />
          Radio B
        </label>
      </div>
    </div>
  </section>

  <section class="section-block">
    <h2 class="section-title">Form</h2>
    <form class="row-flex" novalidate>
      <div class="field" style="flex: 1 1 45%;">
        <label class="label" for="formName">Full name</label>
        <div class="control">
          <input type="text" class="input" id="formName" value="Ashvini Jangid" required />
        </div>
      </div>
      <div class="field" style="flex: 1 1 45%;">
        <label class="label" for="formEmail">Email</label>
        <div class="control">
          <input type="email" class="input is-success" id="formEmail" value="ashvini@example.com" required />
        </div>
        <p class="help is-success">Looks good.</p>
      </div>
      <div class="field" style="flex: 1 1 45%;">
        <label class="label" for="formPassword">Password</label>
        <div class="control">
          <input type="password" class="input is-danger" id="formPassword" required />
        </div>
        <p class="help is-danger">Password must be at least 8 characters.</p>
      </div>
      <div class="field" style="flex: 1 1 45%;">
        <label class="label" for="formRole">Role</label>
        <div class="control">
          <div class="select is-fullwidth">
            <select id="formRole">
              <option selected>Engineer</option>
              <option>Designer</option>
              <option>Product Manager</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field" style="flex: 1 1 100%;">
        <label class="label" for="formMessage">Message</label>
        <div class="control">
          <textarea class="textarea" id="formMessage" rows="3" placeholder="Write something…"></textarea>
        </div>
      </div>
      <div class="field" style="flex: 1 1 100%;">
        <label class="checkbox">
          <input type="checkbox" id="formAgree" />
          I agree to the terms and conditions
        </label>
      </div>
      <div class="field" style="flex: 1 1 100%; display:flex; gap:.5rem;">
        <div class="control">
          <button type="submit" class="button is-primary">Submit</button>
        </div>
        <div class="control">
          <button type="reset" class="button is-outlined">Reset</button>
        </div>
      </div>
    </form>
  </section>

  <section class="section-block">
    <h2 class="section-title">Cards</h2>
    <div class="row-flex">
      <div class="card" style="flex: 1 1 30%;">
        <div class="card-content">
          <p class="title is-5">Card title</p>
          <p class="content">Some quick example text to build on the card title.</p>
          <a href="#" class="button is-primary is-small">Go</a>
        </div>
      </div>
      <div class="card" style="flex: 1 1 30%; background: var(--bulma-primary); color: var(--bulma-primary-invert);">
        <div class="card-content">
          <p class="title is-5" style="color: inherit;">Accent Card</p>
          <p class="content" style="color: inherit;">Themed card using primary background.</p>
        </div>
      </div>
      <div class="card" style="flex: 1 1 30%;">
        <div class="card-content">
          <p class="title is-5">Tags</p>
          <span class="tag is-primary mr-1">Primary</span>
          <span class="tag is-link mr-1">Secondary</span>
          <span class="tag is-success mr-1">Success</span>
          <span class="tag is-danger">Danger</span>
        </div>
      </div>
    </div>
  </section>

  <section class="section-block">
    <h2 class="section-title">Notifications</h2>
    <div class="notification is-primary">
      <button class="delete"></button>
      Primary notification message
    </div>
    <div class="notification is-success">
      <button class="delete"></button>
      Success notification message
    </div>
    <div class="notification is-warning">
      <button class="delete"></button>
      Warning notification message
    </div>
    <div class="notification is-danger">
      <button class="delete"></button>
      Danger notification message
    </div>
  </section>

  <section class="section-block">
    <h2 class="section-title">Box &amp; Block</h2>
    <div class="row-flex">
      <div class="box" style="flex: 1 1 45%;">
        <p class="title is-6">A boxed section</p>
        <p>A box is a simple container with a shadow, a border-radius, and some padding — useful for grouping related content.</p>
      </div>
      <div style="flex: 1 1 45%;">
        <div class="block">First block — blocks stack with consistent vertical spacing.</div>
        <div class="block">Second block, spaced evenly below the first.</div>
        <div class="block">Third block, no extra margin after the last one.</div>
      </div>
    </div>
  </section>

  <section class="section-block">
    <h2 class="section-title">Content</h2>
    <div class="content">
      <h4>WYSIWYG content</h4>
      <p>The <code>.content</code> class styles raw HTML — headings, paragraphs, lists, and tables — without needing extra classes on each element.</p>
      <ul>
        <li>Unordered list item one</li>
        <li>Unordered list item two</li>
      </ul>
      <ol>
        <li>Ordered list item one</li>
        <li>Ordered list item two</li>
      </ol>
    </div>
  </section>

  <section class="section-block">
    <h2 class="section-title">Icons</h2>
    <div class="row-flex" style="align-items:center;">
      <span class="icon-text">
        <span class="icon"><svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M8 1l7 6v8H1V7z"/></svg></span>
        <span>Home</span>
      </span>
      <span class="icon-text">
        <span class="icon"><svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><circle cx="8" cy="8" r="6"/></svg></span>
        <span>Status</span>
      </span>
      <span class="icon-text">
        <span class="icon is-medium"><svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path d="M2 8h12M8 2v12"/></svg></span>
        <span>Add</span>
      </span>
      <button class="button is-primary">
        <span class="icon"><svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M8 1l7 6v8H1V7z"/></svg></span>
        <span>With icon</span>
      </button>
    </div>
  </section>

  <section class="section-block">
    <h2 class="section-title">Image</h2>
    <div class="row-flex">
      <figure class="image is-128x128">
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Crect width='128' height='128' fill='%23cbd5e1'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='sans-serif' font-size='16' fill='%23475569'%3E128x128%3C/text%3E%3C/svg%3E" alt="Sample 128x128" />
      </figure>
      <figure class="image is-96x96">
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect width='96' height='96' fill='%23cbd5e1'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='sans-serif' font-size='14' fill='%23475569'%3E96x96%3C/text%3E%3C/svg%3E" alt="Sample 96x96" class="is-rounded" />
      </figure>
      <figure class="image is-64x64">
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect width='64' height='64' fill='%23cbd5e1'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='sans-serif' font-size='11' fill='%23475569'%3E64x64%3C/text%3E%3C/svg%3E" alt="Sample 64x64" />
      </figure>
    </div>
  </section>

  <section class="section-block">
    <h2 class="section-title">Table</h2>
    <table class="table is-striped is-fullwidth">
      <thead>
        <tr><th>#</th><th>Name</th><th>Role</th><th>Status</th></tr>
      </thead>
      <tbody>
        <tr><td>1</td><td>Ashvini</td><td>Engineer</td><td><span class="tag is-success">Active</span></td></tr>
        <tr><td>2</td><td>Jordan</td><td>Designer</td><td><span class="tag is-warning">Pending</span></td></tr>
        <tr><td>3</td><td>Sam</td><td>PM</td><td><span class="tag is-light">Inactive</span></td></tr>
      </tbody>
    </table>
  </section>

  <section class="section-block">
    <h2 class="section-title">Breadcrumb &amp; Pagination</h2>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Library</a></li>
        <li class="is-active"><a href="#" aria-current="page">Data</a></li>
      </ul>
    </nav>
    <nav class="pagination" role="navigation" aria-label="pagination">
      <a class="pagination-previous" disabled>Previous</a>
      <a class="pagination-next">Next</a>
      <ul class="pagination-list">
        <li><a class="pagination-link is-current" aria-current="page">1</a></li>
        <li><a class="pagination-link">2</a></li>
        <li><a class="pagination-link">3</a></li>
      </ul>
    </nav>
  </section>

  <section class="section-block">
    <h2 class="section-title">Menu / List</h2>
    <div class="panel">
      <p class="panel-heading">Inbox</p>
      <a class="panel-block is-active">
        Primary item
        <span class="tag is-primary is-rounded ml-auto">14</span>
      </a>
      <a class="panel-block">A regular item</a>
      <a class="panel-block" aria-disabled="true">A disabled item</a>
    </div>
  </section>

</div>
`;function B(e,t){let n=w(e);return T({...n,h:n.h+t})}function V(e,t){let n=w(e);return T({...n,s:E(n.s+t,0,100)})}function ue(e,t=`light`){let n=e,r=V(n,-60),i=B(n,100),a=B(n,-160),o=B(n,40),s=B(n,190),c=t===`dark`;return{mode:t,bodyBg:c?`#0a0a0a`:`#ffffff`,bodyColor:c?`#e9ecef`:`#212529`,primary:n,secondary:r,success:i,danger:a,warning:o,info:s,light:c?`#1a1a1a`:`#f8f9fa`,dark:c?`#000000`:`#212529`}}var H=[{key:`default`,label:`Default`},{key:`flat`,label:`Flat`},{key:`material`,label:`Material`},{key:`neumorphism`,label:`Neumorphism`},{key:`glassmorphism`,label:`Glassmorphism`},{key:`brutalism`,label:`Brutalism`},{key:`maximalism`,label:`Maximalism`},{key:`skeuomorphism`,label:`Skeuomorphism`},{key:`skeuominimalism`,label:`Skeuominimalism`},{key:`dark-highcontrast`,label:`Dark High Contrast`,forceMode:`dark`},{key:`retro-8bit`,label:`Retro 8-bit`},{key:`cyberpunk`,label:`Cyberpunk`,forceMode:`dark`},{key:`claymorphism`,label:`Claymorphism`},{key:`bauhaus`,label:`Bauhaus`},{key:`organic`,label:`Organic`},{key:`typographic`,label:`Typographic`},{key:`minimalism-mono`,label:`Minimalism Mono`},{key:`papercut`,label:`Papercut`},{key:`skeuomorphism-classic`,label:`Skeuomorphism Classic`}];function U(e,t){return H.find(t=>t.key===e)?.forceMode??t}var W=[`Inter`,`Roboto`,`Poppins`,`Open Sans`,`Fira Code`,`Montserrat`,`Lato`,`Nunito`,`Playfair Display`,`Merriweather`,`Raleway`,`Source Sans 3`,`Work Sans`,`DM Sans`,`Space Grotesk`,`Manrope`,`Rubik`,`Josefin Sans`,`Bebas Neue`,`JetBrains Mono`,`IBM Plex Sans`,`Oswald`,`Quicksand`,`Karla`,`Outfit`],G={Inter:`Source Sans 3`,Roboto:`Open Sans`,Poppins:`Inter`,"Open Sans":`Lato`,"Fira Code":`Inter`,Montserrat:`Karla`,Lato:`Open Sans`,Nunito:`Karla`,"Playfair Display":`Source Sans 3`,Merriweather:`Lato`,Raleway:`Karla`,"Source Sans 3":`Source Sans 3`,"Work Sans":`Inter`,"DM Sans":`Inter`,"Space Grotesk":`Work Sans`,Manrope:`Inter`,Rubik:`Karla`,"Josefin Sans":`Nunito`,"Bebas Neue":`Roboto`,"JetBrains Mono":`Inter`,"IBM Plex Sans":`IBM Plex Sans`,Oswald:`Open Sans`,Quicksand:`Nunito`,Karla:`Karla`,Outfit:`Inter`};function de(e){return G[e]??`Inter`}var K=[{name:`Tailwind Blue`,color:`#3b82f6`,tags:[`tailwind`,`clean`,`blue`]},{name:`Tailwind Sky`,color:`#0ea5e9`,tags:[`tailwind`,`clean`,`blue`]},{name:`Tailwind Cyan`,color:`#06b6d4`,tags:[`tailwind`,`clean`,`cool`]},{name:`Tailwind Teal`,color:`#14b8a6`,tags:[`tailwind`,`clean`,`cool`]},{name:`Tailwind Emerald`,color:`#10b981`,tags:[`tailwind`,`clean`,`green`]},{name:`Tailwind Green`,color:`#22c55e`,tags:[`tailwind`,`clean`,`green`]},{name:`Tailwind Lime`,color:`#84cc16`,tags:[`tailwind`,`clean`,`green`]},{name:`Tailwind Amber`,color:`#f59e0b`,tags:[`tailwind`,`clean`,`warm`]},{name:`Tailwind Orange`,color:`#f97316`,tags:[`tailwind`,`clean`,`warm`]},{name:`Tailwind Red`,color:`#ef4444`,tags:[`tailwind`,`clean`,`warm`]},{name:`Tailwind Rose`,color:`#f43f5e`,tags:[`tailwind`,`clean`,`warm`]},{name:`Tailwind Pink`,color:`#ec4899`,tags:[`tailwind`,`clean`,`warm`]},{name:`Tailwind Fuchsia`,color:`#d946ef`,tags:[`tailwind`,`clean`,`vivid`]},{name:`Tailwind Purple`,color:`#a855f7`,tags:[`tailwind`,`clean`,`vivid`]},{name:`Tailwind Violet`,color:`#8b5cf6`,tags:[`tailwind`,`clean`,`vivid`]},{name:`Tailwind Indigo`,color:`#6366f1`,tags:[`tailwind`,`clean`,`blue`]},{name:`Tailwind Slate`,color:`#64748b`,tags:[`tailwind`,`neutral`,`muted`]},{name:`Tailwind Zinc`,color:`#71717a`,tags:[`tailwind`,`neutral`,`muted`]},{name:`Material Blue`,color:`#2196f3`,tags:[`material`,`clean`,`blue`]},{name:`Material Indigo`,color:`#3f51b5`,tags:[`material`,`clean`,`blue`]},{name:`Material Deep Purple`,color:`#673ab7`,tags:[`material`,`clean`,`vivid`]},{name:`Material Teal`,color:`#009688`,tags:[`material`,`clean`,`cool`]},{name:`Material Green`,color:`#4caf50`,tags:[`material`,`clean`,`green`]},{name:`Material Light Green`,color:`#8bc34a`,tags:[`material`,`clean`,`green`]},{name:`Material Amber`,color:`#ffc107`,tags:[`material`,`clean`,`warm`]},{name:`Material Orange`,color:`#ff9800`,tags:[`material`,`clean`,`warm`]},{name:`Material Deep Orange`,color:`#ff5722`,tags:[`material`,`clean`,`warm`]},{name:`Material Red`,color:`#f44336`,tags:[`material`,`clean`,`warm`]},{name:`Material Pink`,color:`#e91e63`,tags:[`material`,`clean`,`warm`]},{name:`Material Cyan`,color:`#00bcd4`,tags:[`material`,`clean`,`cool`]},{name:`Material Brown`,color:`#795548`,tags:[`material`,`neutral`,`earthy`]},{name:`Material Blue Grey`,color:`#607d8b`,tags:[`material`,`neutral`,`muted`]},{name:`Flat Turquoise`,color:`#1abc9c`,tags:[`flat`,`clean`,`cool`]},{name:`Flat Emerald`,color:`#2ecc71`,tags:[`flat`,`clean`,`green`]},{name:`Flat Peter River`,color:`#3498db`,tags:[`flat`,`clean`,`blue`]},{name:`Flat Amethyst`,color:`#9b59b6`,tags:[`flat`,`clean`,`vivid`]},{name:`Flat Wet Asphalt`,color:`#34495e`,tags:[`flat`,`neutral`,`muted`]},{name:`Flat Sun Flower`,color:`#f1c40f`,tags:[`flat`,`clean`,`warm`]},{name:`Flat Carrot`,color:`#e67e22`,tags:[`flat`,`clean`,`warm`]},{name:`Flat Alizarin`,color:`#e74c3c`,tags:[`flat`,`clean`,`warm`]},{name:`Flat Concrete`,color:`#95a5a6`,tags:[`flat`,`neutral`,`muted`]},{name:`Neon Blue`,color:`#0066ff`,tags:[`neon`,`vivid`,`blue`]},{name:`Electric Cyan`,color:`#00e5ff`,tags:[`neon`,`vivid`,`cool`]},{name:`Toxic Green`,color:`#39ff14`,tags:[`neon`,`vivid`,`green`]},{name:`Radioactive Yellow`,color:`#eeff00`,tags:[`neon`,`vivid`,`warm`]},{name:`Hyper Red`,color:`#ff0033`,tags:[`neon`,`vivid`,`warm`]},{name:`Neon Magenta`,color:`#ff00ff`,tags:[`neon`,`vivid`,`warm`]},{name:`Ultra Violet`,color:`#a100ff`,tags:[`neon`,`vivid`,`blue`]},{name:`Electric Indigo`,color:`#4d00ff`,tags:[`neon`,`vivid`,`blue`]},{name:`Cyber Pink`,color:`#ff007f`,tags:[`neon`,`vivid`,`warm`]},{name:`Acid Green`,color:`#aaff00`,tags:[`neon`,`vivid`,`green`]},{name:`Warm Graphite`,color:`#3f3f46`,tags:[`neutral`,`muted`]},{name:`Stone Grey`,color:`#78716c`,tags:[`neutral`,`muted`,`earthy`]},{name:`Clay Terracotta`,color:`#b45309`,tags:[`neutral`,`earthy`]},{name:`Muted Sage`,color:`#5f7161`,tags:[`neutral`,`muted`,`earthy`]},{name:`Dusty Rose`,color:`#b3717a`,tags:[`neutral`,`muted`,`warm`]},{name:`Ink Navy`,color:`#1e293b`,tags:[`neutral`,`muted`,`blue`]}],q={default:[`tailwind`,`clean`],flat:[`flat`,`clean`],material:[`material`,`clean`],neumorphism:[`muted`,`neutral`],glassmorphism:[`vivid`,`cool`,`blue`],brutalism:[`vivid`,`warm`],maximalism:[`neon`,`vivid`],skeuomorphism:[`material`,`warm`],skeuominimalism:[`muted`,`neutral`],"dark-highcontrast":[`neon`,`vivid`],"retro-8bit":[`neon`,`vivid`],cyberpunk:[`neon`,`vivid`],claymorphism:[`clean`,`warm`],bauhaus:[`flat`,`warm`,`blue`],organic:[`earthy`,`muted`,`green`],typographic:[`neutral`,`muted`],"minimalism-mono":[`neutral`,`muted`],papercut:[`neutral`,`muted`,`earthy`],"skeuomorphism-classic":[`material`,`blue`]};function J(e){let t=q[e]??[`clean`];return K.map(e=>({p:e,score:e.tags.reduce((e,n)=>e+ +!!t.includes(n),0)})).filter(e=>e.score>0).sort((e,t)=>t.score-e.score).slice(0,8).map(e=>e.p)}var Y={theme:`default`,primary:`#0ea5e9`,mode:`light`,headingFont:`Inter`,bodyFont:`Source Sans 3`,bodyFontManual:!1,primaryManual:!1};function X(e){return J(e)[0]?.color??Y.primary}var fe={class:`flex min-h-dvh`},pe={class:`sticky top-0 hidden h-dvh w-56 shrink-0 flex-col border-r border-line bg-panel md:flex`},me={class:`flex h-14 shrink-0 items-center gap-2 border-b border-line px-4`},he={class:`min-h-0 flex-1 overflow-y-auto`},ge={class:`flex min-w-0 flex-1 flex-col lg:flex-row`},_e={class:`flex min-w-0 flex-1 flex-col`},ve={class:`sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-line bg-panel/80 px-4 shadow-panel backdrop-blur-md`},ye={class:`flex items-center gap-1`},Z=[`aria-label`,`title`],be={key:0,class:`border-b border-line bg-rose-500/10 px-4 py-2 text-xs font-medium text-rose-400`},xe={class:`flex h-10 shrink-0 items-center justify-between gap-2 border-b border-line bg-panel px-4`},Se={class:`flex items-center gap-0.5`},Ce=[`aria-label`,`aria-pressed`,`title`,`onClick`],we={class:`hidden sm:inline`},Te={class:`flex w-full shrink-0 flex-col gap-3.5 border-t border-line bg-panel p-3.5 lg:w-95 lg:overflow-y-auto lg:border-l lg:border-t-0`},Ee={class:`text-[11px] text-muted`},De={class:`font-medium text-fg`},Oe={class:`grid grid-cols-4 gap-2`},ke=[`aria-label`,`aria-pressed`,`onClick`],Ae={class:`line-clamp-1 w-full text-center text-[10px] leading-tight text-muted`},Q=`css-studio:state:bulma-theme`,$=r({__name:`css`,setup(r){let x=b();function w(){let e=x.query,t=e.theme,n=e.primary,r=e.mode,i=e.headingFont,a=e.bodyFont,o={...Y};if(t&&H.some(e=>e.key===t)&&(o.theme=t),n&&/^#[0-9a-fA-F]{6}$/.test(n)&&(o.primary=n,o.primaryManual=!0),(r===`light`||r===`dark`)&&(o.mode=r),i&&W.includes(i)&&(o.headingFont=i),a&&W.includes(a)&&(o.bodyFont=a,o.bodyFontManual=!0),t||n||r||i||a)return o;{let e=localStorage.getItem(Q);if(e)try{return{...Y,...JSON.parse(e)}}catch{}}return o.primary=X(o.theme),o}let T=o(w()),E=W.map(e=>({value:e,label:e})),D=H.map(e=>({value:e.key,label:e.label})),O=n(()=>J(T.value.theme)),k=n(()=>H.find(e=>e.key===T.value.theme)?.label??T.value.theme);function A(e){return e.toLowerCase()===T.value.primary.toLowerCase()}let j=ne();v(()=>j.value,e=>{T.value.mode=e===`dark`?`dark`:`light`},{immediate:!0});function M(){j.preference=j.value===`dark`?`light`:`dark`}let N=o(``),P=o(!1),F=o(!1),I=o(null),L={desktop:`1180px`,tablet:`768px`,mobile:`390px`},R=o(`desktop`),z=null;v(T,()=>{z&&clearTimeout(z),z=setTimeout(()=>{try{localStorage.setItem(Q,JSON.stringify(T.value))}catch{}},400)},{deep:!0});function B(){let e=new URLSearchParams({theme:T.value.theme,primary:T.value.primary,mode:T.value.mode,headingFont:T.value.headingFont,bodyFont:T.value.bodyFont});window.history.replaceState(window.history.state,``,`${x.path}?${e.toString()}`)}function V(e,t){return`<!DOCTYPE html><html data-theme="${t}"><head><meta charset="UTF-8" /><style>
* { box-sizing: border-box; }
body { margin: 0; padding: 1.5rem; }
.row-flex { display: flex; flex-wrap: wrap; gap: .75rem; }
.section-block { margin-bottom: 2.5rem; }
.section-title { text-transform: uppercase; font-size: .85rem; font-weight: 700; margin-bottom: .75rem; opacity: .6; }
</style>
<style id="theme-stylesheet">${e}</style>
</head><body>${le}</body></html>`}let G=0;async function K(){let e=++G;F.value=!0;let t=U(T.value.theme,T.value.mode),n=ue(T.value.primary,t);ce([T.value.headingFont,T.value.bodyFont]);try{let r=await se(T.value.theme,n,T.value.headingFont,T.value.bodyFont);if(e!==G)return;N.value=r,P.value=!1,I.value&&(I.value.srcdoc=V(r,t)),B()}catch(t){if(e!==G)return;P.value=!0,console.error(`Theme compile error:`,t)}finally{e===G&&(F.value=!1)}}v(T,K,{deep:!0}),f(K);function q(e){T.value.primary=e,T.value.primaryManual=!0}function $(e){T.value.primary=e,T.value.primaryManual=!0}function je(){T.value.primaryManual||(T.value.primary=X(T.value.theme))}function Me(){T.value.bodyFontManual||(T.value.bodyFont=de(T.value.headingFont))}function Ne(){T.value.bodyFontManual=!0}async function Pe(){try{await navigator.clipboard.writeText(N.value),S(`CSS copied`)}catch{S(`Copy failed`,`error`)}}function Fe(){let e=new Blob([N.value],{type:`text/css`}),t=URL.createObjectURL(e),n=document.createElement(`a`);n.href=t,n.download=`theme-${T.value.theme}-${T.value.mode}.css`,document.body.appendChild(n),n.click(),n.remove(),URL.revokeObjectURL(t)}async function Ie(){try{await navigator.clipboard.writeText(window.location.href),S(`Share link copied`)}catch{S(`Could not copy link`,`error`)}}function Le(){T.value={...Y}}return d({title:`SCSS Theme Engine - CSS Studio`,description:`Live SCSS + Bulma theme engine: presets, palettes, font pairing and instant CSS export.`,ogTitle:`SCSS Theme Engine - CSS Studio`,ogDescription:`Live SCSS + Bulma theme engine: presets, palettes, font pairing and instant CSS export.`,ogUrl:`https://css-studio.itsash.in/css`,twitterTitle:`SCSS Theme Engine - CSS Studio`,twitterDescription:`Live SCSS + Bulma theme engine: presets, palettes, font pairing and instant CSS export.`}),h({link:[{rel:`canonical`,href:`https://css-studio.itsash.in/css`}]}),(n,r)=>{let o=te,d=ee,f=ae,h=ie,v=C,b=re,x=oe;return g(),y(`div`,fe,[a(`aside`,pe,[a(`div`,me,[l(d,{to:`/`,class:`flex items-center gap-2 text-sm font-semibold tracking-tight text-fg`},{default:u(()=>[l(o,{name:`ph-paint-brush`,size:17,weight:`duotone`,class:`text-accent`}),r[3]||=i(` CSS Studio `,-1)]),_:1})]),a(`div`,he,[l(f)])]),a(`div`,ge,[a(`div`,_e,[a(`header`,ve,[r[9]||=a(`h1`,{class:`truncate text-sm font-medium text-fg`},`SCSS Theme Engine`,-1),a(`div`,ye,[a(`button`,{class:`inline-flex h-8 items-center gap-1.5 rounded-lg border border-line bg-bg px-2.5 text-sm font-medium text-fg transition-[transform,background-color,border-color] duration-150 hover:bg-line/30 hover:border-line-strong active:scale-[0.97]`,onClick:Pe},[l(o,{name:`ph-copy`,size:14,class:`text-accent`}),r[4]||=a(`span`,{class:`hidden md:inline`},`Copy CSS`,-1)]),a(`button`,{class:`inline-flex h-8 items-center gap-1.5 rounded-lg border border-line bg-bg px-2.5 text-sm font-medium text-fg transition-[transform,background-color,border-color] duration-150 hover:bg-line/30 hover:border-line-strong active:scale-[0.97]`,onClick:Fe},[l(o,{name:`ph-download-simple`,size:14}),r[5]||=a(`span`,{class:`hidden md:inline`},`Download`,-1)]),a(`button`,{class:`inline-flex h-8 items-center gap-1.5 rounded-lg border border-line bg-bg px-2.5 text-sm font-medium text-fg transition-[transform,background-color,border-color] duration-150 hover:bg-line/30 hover:border-line-strong active:scale-[0.97]`,onClick:Ie},[l(o,{name:`ph-share-network`,size:14}),r[6]||=a(`span`,{class:`hidden md:inline`},`Share`,-1)]),a(`button`,{class:`inline-flex h-8 items-center gap-1.5 rounded-lg border border-line bg-bg px-2.5 text-sm font-medium text-fg transition-[transform,background-color,border-color] duration-150 hover:bg-line/30 hover:border-line-strong active:scale-[0.97]`,onClick:Le},[l(o,{name:`ph-arrow-counter-clockwise`,size:14}),r[7]||=a(`span`,{class:`hidden md:inline`},`Reset`,-1)]),r[8]||=a(`span`,{class:`mx-1 hidden h-4 w-px bg-line sm:block`,"aria-hidden":`true`},null,-1),a(`button`,{class:`inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-[background-color,color] duration-150 hover:bg-line/30 hover:text-fg active:scale-[0.95]`,"aria-label":s(j).value===`dark`?`Switch to light mode`:`Switch to dark mode`,title:s(j).value===`dark`?`Switch to light mode`:`Switch to dark mode`,onClick:M},[l(o,{name:s(j).value===`dark`?`ph-sun`:`ph-moon`,size:15},null,8,[`name`])],8,Z),l(h)])]),s(P)?(g(),y(`div`,be,` Theme compile error — see console `)):c(``,!0),a(`div`,xe,[r[10]||=a(`span`,{class:`text-xs font-medium tracking-tight text-muted`},`Preview`,-1),a(`div`,Se,[(g(),y(t,null,p([{v:`desktop`,icon:`ph-monitor`,label:`Desktop`},{v:`tablet`,icon:`ph-device-tablet`,label:`Tablet`},{v:`mobile`,icon:`ph-device-mobile-camera`,label:`Mobile`}],t=>a(`button`,{key:t.v,class:e([`inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-muted transition-colors duration-100 hover:bg-line/30 hover:text-fg`,s(R)===t.v?`bg-accent/12 text-fg`:``]),"aria-label":`Preview at ${t.label} size`,"aria-pressed":s(R)===t.v,title:t.label,onClick:e=>R.value=t.v},[l(o,{name:t.icon,size:13},null,8,[`name`]),a(`span`,we,m(t.label),1)],10,Ce)),64))])]),a(`main`,{class:e([`flex min-h-0 flex-1 justify-center overflow-auto p-4 transition-colors duration-150 lg:p-6`,s(j).value===`dark`?`bg-zinc-950`:`bg-zinc-100`])},[a(`div`,{class:e([`relative h-full w-full overflow-hidden rounded-xl border shadow-panel transition-[width] duration-200 ease-out`,s(j).value===`dark`?`border-white/10 bg-black`:`border-black/10 bg-white`]),style:_({width:L[s(R)],maxWidth:`100%`})},[s(F)?(g(),y(`div`,{key:0,class:e([`absolute inset-0 z-10 flex items-center justify-center gap-2 backdrop-blur-sm`,s(j).value===`dark`?`bg-black/60 text-zinc-300`:`bg-white/60 text-zinc-500`])},[l(o,{name:`ph-spinner-gap`,size:18,class:`animate-spin text-accent`}),r[11]||=a(`span`,{class:`text-xs font-medium`},`Compiling theme…`,-1)],2)):c(``,!0),a(`iframe`,{ref_key:`iframeRef`,ref:I,title:`Bulma theme preview`,class:`block h-full w-full border-0`,sandbox:`allow-same-origin`},null,512)],6)],2)]),a(`aside`,Te,[l(b,{label:`Fonts`,icon:`ph-text-aa`},{default:u(()=>[l(v,{modelValue:s(T).headingFont,"onUpdate:modelValue":[r[0]||=e=>s(T).headingFont=e,Me],label:`Heading font`,options:s(E)},null,8,[`modelValue`,`options`]),l(v,{modelValue:s(T).bodyFont,"onUpdate:modelValue":[r[1]||=e=>s(T).bodyFont=e,Ne],label:`Body font`,options:s(E)},null,8,[`modelValue`,`options`])]),_:1}),l(b,{label:`Theme`,icon:`ph-palette`},{default:u(()=>[l(v,{modelValue:s(T).theme,"onUpdate:modelValue":[r[2]||=e=>s(T).theme=e,je],label:`Style preset`,options:s(D)},null,8,[`modelValue`,`options`]),l(x,{"model-value":s(T).primary,label:`Primary color`,"onUpdate:modelValue":$},null,8,[`model-value`])]),_:1}),l(b,{label:`Suggested palettes`,icon:`ph-sparkle`},{default:u(()=>[a(`p`,Ee,[r[12]||=i(`Curated colors that suit the `,-1),a(`span`,De,m(s(k)),1),r[13]||=i(` preset.`,-1)]),a(`div`,Oe,[(g(!0),y(t,null,p(s(O),t=>(g(),y(`button`,{key:t.name,type:`button`,class:`group flex flex-col items-center gap-1.5 rounded-lg p-1.5 transition-colors duration-150 hover:bg-line/20`,"aria-label":`Use ${t.name}`,"aria-pressed":A(t.color),onClick:e=>q(t.color)},[a(`span`,{class:e([`aspect-square w-full rounded-lg border transition-transform duration-150 group-hover:scale-105 group-active:scale-95`,A(t.color)?`border-accent ring-2 ring-accent ring-offset-2 ring-offset-panel`:`border-line`]),style:_({background:t.color})},null,6),a(`span`,Ae,m(t.name),1)],8,ke))),128))])]),_:1})])])])}}});export{$ as default};