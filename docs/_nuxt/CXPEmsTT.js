import{$t as e,A as t,F as n,G as r,H as i,I as a,L as o,Ot as s,Pt as c,R as l,U as u,bt as d,i as f,it as ee,lt as p,nn as m,r as h,st as g,tn as _,vt as v,z as y}from"./nW5eDnH9.js";import{ot as b,t as te}from"./CyCVgnjN.js";import{a as x,i as ne,n as S,t as re}from"#entry";import{t as ie}from"./Bxc0cDnT.js";import{t as ae}from"./DgvkL9NY.js";import{n as oe,t as se}from"./9QSvzzP6.js";import{i as C,s as w,t as T}from"./BMBmj3pX.js";import{t as ce}from"./grKf0cqL.js";var E={},D=new Set,O=null;function k(){return O??=fetch(`/scss/manifest.json`).then(e=>e.ok?e.json():[]).then(e=>new Set(e)).catch(()=>new Set),O}async function A(e){if(E[e])return E[e];if(D.has(e))throw Error(`Failed to load ${e}`);let t=e.startsWith(`scss/`)?e:`scss/${e}`,n=await fetch(`/${t}`);if(!n.ok)throw D.add(e),Error(`Failed to load ${e}`);let r=await n.text();return E[e]=r,r}function le(e){let t=e.includes(`/`)?e.slice(0,e.lastIndexOf(`/`)):``,n=(e.includes(`/`)?e.slice(e.lastIndexOf(`/`)+1):e).replace(/\.scss$/,``),r=t?`${t}/`:``;return[`${r}${n}.scss`,`${r}_${n}.scss`,`${r}${n}/_index.scss`,`${r}${n}/index.scss`]}async function j(e){let t=le(e),n=await k();if(n.size===0)return t;let r=t.filter(e=>n.has(e.startsWith(`scss/`)?e:`scss/${e}`));return r.length>0?r:t}var M=null;function N(){return M??=x(()=>import(`./DJ17QVKo.js`),[],import.meta.url),M}var P=/^#[0-9a-fA-F]{3,8}$/,F=/^[A-Za-z0-9 ]{1,60}$/,I=/^\$[a-zA-Z][a-zA-Z0-9-]*$/,L=/^[a-zA-Z0-9#%.,\s()'"_-]{1,120}$/;async function ue(e,t,n,r){let i=await N(),a=F.test(n)?`"${n.replace(/["\\]/g,`\\$&`)}", Helvetica, Arial, sans-serif`:null,o=F.test(r)?`"${r.replace(/["\\]/g,`\\$&`)}", Helvetica, Arial, sans-serif`:null,s=[o?`body, .button, .input, .textarea, .select select, .box, .card, .card-header, .notification, .tag, .table, .navbar, .navbar-item, .panel-block, .content, .icon-text { font-family: ${o} !important; }`:``,a?`.navbar-brand, blockquote, h1, h2, h3, h4, h5, h6 { font-family: ${a} !important; }`:``].filter(Boolean).join(`
`),c=[[`$primary`,t.primary],[`$link`,t.secondary],[`$success`,t.success],[`$danger`,t.danger],[`$warning`,t.warning],[`$info`,t.info],[`$light`,t.light],[`$dark`,t.dark],[`$body-background-color`,t.bodyBg],[`$body-color`,t.bodyColor]].filter(([,e])=>P.test(e)),l=``;e&&(l=await A(`scss/presets/${e}.scss`));let u=new Map(c),d=l.match(/^\/\/!\s*bulma-config:\s*(\{[^\n]*\})\s*$/m);if(d){l=l.replace(d[0],``);try{let e=JSON.parse(d[1]);for(let[t,n]of Object.entries(e))I.test(t)&&typeof n==`string`&&L.test(n)&&u.set(t,n.includes(`,`)?`(${n})`:n)}catch(t){console.error(`Invalid bulma-config in preset:`,e,t)}}let f=`${`@use "bulma/bulma-entry" with (\n${[...u.entries()].map(([e,t])=>`  ${e}: ${t}`).join(`,
`)}\n);`}\n${l}\n${s}`;return(await i.compileStringAsync(f,{importers:[{async canonicalize(e,t){let n=e.startsWith(`~`)?e.slice(1):e,r=t.containingUrl?t.containingUrl.href:`file:///scss/entry.scss`,i=new URL(n,r).pathname.slice(1);for(let e of await j(i))try{return await A(e),new URL(`file:///${e}`)}catch{}return null},async load(e){let t=e.pathname.slice(1);try{return{contents:await A(t),syntax:`scss`}}catch{return null}}}],url:new URL(`file:///scss/entry.scss`),logger:{warn(){},debug(){}}})).css}function de(e){let t=`bulma-theme-google-fonts`,n=document.getElementById(t);n||(n=document.createElement(`link`),n.id=t,n.rel=`stylesheet`,document.head.appendChild(n));let r=[...new Set(e)].map(e=>`family=${e.replace(/ /g,`+`)}:wght@300;400;500;600;700;800`).join(`&`);n.href=`https://fonts.googleapis.com/css2?${r}&display=swap`}var fe=`
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="#"><strong>Brand</strong></a>
    <a class="navbar-burger" role="button" tabindex="0" aria-label="menu" aria-expanded="false" aria-controls="gallery-navbar-menu"><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span></a>
  </div>
  <div id="gallery-navbar-menu" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item is-active" href="#">Home</a>
      <a class="navbar-item" href="#">Features</a>
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">More</a>
        <div class="navbar-dropdown">
          <a class="navbar-item">About</a>
          <a class="navbar-item">Jobs</a>
          <hr class="navbar-divider" />
          <a class="navbar-item">Report an issue</a>
        </div>
      </div>
      <a class="navbar-item" href="#" aria-disabled="true">Disabled</a>
    </div>
    <div class="navbar-end">
      <div class="navbar-item"><button class="button is-primary">Sign up</button></div>
    </div>
  </div>
</nav>

<section class="hero is-primary">
  <div class="hero-body">
    <p class="title">Primary hero</p>
    <p class="subtitle">Shows how the primary color behaves at hero scale.</p>
  </div>
</section>

<div class="container-fluid" style="padding: 1.5rem;">

  <section class="section-block">
    <h2 class="section-title">Typography</h2>
    <h1 class="title is-1">Heading 1</h1>
    <h2 class="title is-2">Heading 2</h2>
    <h3 class="title is-3">Heading 3</h3>
    <h4 class="title is-4">Heading 4</h4>
    <h5 class="title is-5">Heading 5</h5>
    <h6 class="title is-6">Heading 6</h6>
    <p class="subtitle is-5 mt-2">Subtitle 5 — secondary heading voice.</p>
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
      <button class="button is-light">Light</button>
      <button class="button is-dark">Dark</button>
    </div>
    <div class="row-flex mt-2">
      <button class="button is-outlined is-primary">Outline</button>
      <button class="button is-outlined is-link">Outline 2</button>
      <button class="button is-inverted is-primary">Inverted</button>
      <button class="button is-soft is-primary">Soft</button>
      <button class="button is-bold is-primary">Bold</button>
      <button class="button is-text">Text</button>
      <button class="button is-primary" disabled>Disabled</button>
      <button class="button is-rounded is-primary">Rounded</button>
      <button class="button is-primary is-small">Small</button>
      <button class="button is-primary">Normal</button>
      <button class="button is-primary is-medium">Medium</button>
      <button class="button is-primary is-large">Large</button>
    </div>
  </section>

  <section class="section-block">
    <h2 class="section-title">Tabs</h2>
    <div class="tabs">
      <ul>
        <li class="is-active"><a>Default</a></li>
        <li><a>Hover</a></li>
        <li><a>Focus</a></li>
      </ul>
    </div>
    <div class="tabs is-boxed">
      <ul>
        <li class="is-active"><a>Boxed A</a></li>
        <li><a>Boxed B</a></li>
        <li><a>Boxed C</a></li>
      </ul>
    </div>
    <div class="tabs is-toggle">
      <ul>
        <li class="is-active"><a><span>Toggle A</span></a></li>
        <li><a><span>Toggle B</span></a></li>
      </ul>
    </div>
  </section>

  <section class="section-block">
    <h2 class="section-title">Progress &amp; Loaders</h2>
    <progress class="progress is-primary mb-2" value="65" max="100">65%</progress>
    <progress class="progress is-success mb-2" max="100"></progress>
    <div class="row-flex" style="align-items:center;">
      <button class="button is-loading is-primary">Loading</button>
      <span class="loader"></span>
      <span>Indeterminate + loader</span>
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
      <div class="field" style="flex: 1 1 45%;">
        <label class="label" for="formFile">File upload</label>
        <div class="file has-name is-fullwidth">
          <label class="file-label">
            <input class="file-input" type="file" name="resume" />
            <span class="file-cta"><span class="file-label">Choose…</span></span>
            <span class="file-name">resume.pdf</span>
          </label>
        </div>
      </div>
      <div class="field" style="flex: 1 1 45%;">
        <label class="label">Addons input</label>
        <div class="field has-addons">
          <div class="control"><a class="button is-static">https://</a></div>
          <div class="control is-expanded"><input class="input" type="text" value="css-studio.itsash.in" /></div>
          <div class="control"><a class="button is-primary">Go</a></div>
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
      <div class="card" style="flex: 1 1 30%;">
        <div class="card-header">
          <p class="card-header-title">Header Card</p>
        </div>
        <div class="card-content">
          <p class="content">Card with header and footer rows.</p>
        </div>
        <div class="card-footer">
          <a href="#" class="card-footer-item">Save</a>
          <a href="#" class="card-footer-item">Edit</a>
        </div>
      </div>
      <div class="card" style="flex: 1 1 30%;">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23cbd5e1'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='sans-serif' font-size='20' fill='%23475569'%3E4:3 image%3C/text%3E%3C/svg%3E" alt="Card image" />
          </figure>
        </div>
        <div class="card-content">
          <p class="title is-5">Tags</p>
          <span class="tag is-primary mr-1">Primary</span>
          <span class="tag is-link mr-1">Secondary</span>
          <span class="tag is-success mr-1">Success</span>
          <span class="tag is-danger mr-1">Danger</span>
          <span class="tag is-warning mr-1">Warning</span>
          <span class="tag is-info mr-1">Info</span>
          <span class="tag is-rounded is-black">Delete me</span>
        </div>
      </div>
    </div>
  </section>

  <section class="section-block">
    <h2 class="section-title">Messages &amp; Notifications</h2>
    <article class="message is-primary">
      <div class="message-header"><p>Primary message</p><button class="delete" aria-label="delete"></button></div>
      <div class="message-body">Message body text with header and delete button.</div>
    </article>
    <article class="message is-danger">
      <div class="message-header"><p>Danger message</p><button class="delete" aria-label="delete"></button></div>
      <div class="message-body">Shows danger header contrast.</div>
    </article>
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
    <div class="notification">
      <button class="delete"></button>
      Plain notification with default colors.
    </div>
  </section>

  <section class="section-block">
    <h2 class="section-title">Dropdown &amp; Modal</h2>
    <div class="row-flex" style="align-items:flex-start;">
      <div class="dropdown is-active mr-4">
        <div class="dropdown-trigger">
          <button class="button" aria-haspopup="true"><span>Dropdown</span><span class="icon is-small"><svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor"><path d="M2 6l4 4 4-4"/></svg></span></button>
        </div>
        <div class="dropdown-menu" id="dd-menu" role="menu">
          <div class="dropdown-content">
            <a class="dropdown-item">Dropdown item</a>
            <a class="dropdown-item is-active">Active item</a>
            <hr class="dropdown-divider" />
            <a class="dropdown-item">Another item</a>
          </div>
        </div>
      </div>
      <button class="button is-primary" id="modal-trigger">Open modal</button>
      <div class="modal is-active" id="demo-modal" style="position: relative; display: block; height: auto; z-index: 1;">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Modal title</p>
            <button class="delete" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            <p>Modal card head, body and foot all pick up the theme.</p>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-primary">Save</button>
            <button class="button">Cancel</button>
          </footer>
        </div>
      </div>
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
      <span class="icon is-medium"><svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path d="M2 8h12M8 2v12"/></svg></span>
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
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        <li><a class="pagination-link">9</a></li>
      </ul>
    </nav>
  </section>

  <section class="section-block">
    <h2 class="section-title">Tabs centered</h2>
    <div class="tabs is-centered is-boxed">
      <ul>
        <li class="is-active"><a><span>Overview</span></a></li>
        <li><a><span>Metrics</span></a></li>
        <li><a><span>Settings</span></a></li>
      </ul>
    </div>
  </section>

  <section class="section-block">
    <h2 class="section-title">Menu / Panel</h2>
    <div class="panel">
      <p class="panel-heading">Inbox</p>
      <div class="panel-tabs">
        <a class="is-active">All</a>
        <a>Unread</a>
        <a>Archived</a>
      </div>
      <a class="panel-block is-active">
        <span class="panel-icon"><svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><rect x="1" y="3" width="14" height="10" rx="1"/></svg></span>
        Primary item
        <span class="tag is-primary is-rounded ml-auto">14</span>
      </a>
      <a class="panel-block">
        <span class="panel-icon"><svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><rect x="1" y="3" width="14" height="10" rx="1"/></svg></span>
        A regular item
      </a>
      <a class="panel-block" aria-disabled="true">A disabled item</a>
    </div>

    <aside class="menu mt-3">
      <p class="menu-label">Menu label</p>
      <ul class="menu-list">
        <li><a class="is-active">Dashboard</a></li>
        <li><a>Team space</a></li>
      </ul>
      <p class="menu-label">Second group</p>
      <ul class="menu-list">
        <li><a>Invitations</a></li>
      </ul>
    </aside>
  </section>

  <section class="section-block">
    <h2 class="section-title">Skeleton</h2>
    <div class="row-flex" style="align-items:center;">
      <div class="box" style="flex:1 1 45%;">
        <div class="is-skeleton title is-5">Loading title</div>
        <p class="has-skeleton">Line of loading text placeholder</p>
        <div class="skeleton-block mt-2"></div>
        <div class="skeleton-lines mt-2"><div></div><div></div><div></div></div>
      </div>
      <div style="flex:1 1 45%;">
        <p>Plain column next to skeleton panel for surface comparison.</p>
      </div>
    </div>
  </section>

</div>

<footer class="footer">
  <div class="content has-text-centered">
    <p><strong>Brand</strong> footer — theme applies to the footer surface too.</p>
  </div>
</footer>
`;function R(e,t){let n=C(e);return w({...n,h:n.h+t})}function z(e,t){let n=C(e);return w({...n,s:T(n.s+t,0,100)})}function pe(e,t=`light`){let n=e,r=z(n,-60),i=R(n,100),a=R(n,-160),o=R(n,40),s=R(n,190),c=t===`dark`;return{mode:t,bodyBg:c?`#0a0a0a`:`#ffffff`,bodyColor:c?`#e9ecef`:`#212529`,primary:n,secondary:r,success:i,danger:a,warning:o,info:s,light:c?`#1a1a1a`:`#f8f9fa`,dark:c?`#000000`:`#212529`}}var B=[{key:`default`,label:`Default`,visual:{radius:6,border:1,shadow:`soft`}},{key:`flat`,label:`Flat`,visual:{radius:0,border:2,shadow:`none`}},{key:`material`,label:`Material`,visual:{radius:4,border:0,shadow:`soft`,upper:!0}},{key:`neumorphism`,label:`Neumorphism`,visual:{radius:16,border:0,shadow:`neu`}},{key:`glassmorphism`,label:`Glassmorphism`,visual:{radius:16,border:0,shadow:`glass`}},{key:`brutalism`,label:`Brutalism`,visual:{radius:0,border:3,shadow:`hard`,mono:!0,upper:!0}},{key:`maximalism`,label:`Maximalism`,visual:{radius:24,border:4,shadow:`hard`,upper:!0}},{key:`skeuomorphism`,label:`Skeuomorphism`,visual:{radius:6,border:0,shadow:`gloss`}},{key:`skeuominimalism`,label:`Skeuominimalism`,visual:{radius:6,border:0,shadow:`soft`}},{key:`dark-highcontrast`,label:`Dark High Contrast`,forceMode:`dark`,visual:{radius:4,border:2,shadow:`hard`}},{key:`retro-8bit`,label:`Retro 8-bit`,visual:{radius:0,border:2,shadow:`hard`,mono:!0,upper:!0}},{key:`cyberpunk`,label:`Cyberpunk`,forceMode:`dark`,visual:{radius:4,border:1,shadow:`glow`,upper:!0}},{key:`claymorphism`,label:`Claymorphism`,visual:{radius:16,border:0,shadow:`clay`}},{key:`bauhaus`,label:`Bauhaus`,visual:{radius:0,border:2,shadow:`none`,upper:!0}},{key:`organic`,label:`Organic`,visual:{radius:24,border:0,shadow:`soft`}},{key:`typographic`,label:`Typographic`,visual:{radius:0,border:0,shadow:`none`,upper:!0}},{key:`minimalism-mono`,label:`Minimalism Mono`,visual:{radius:2,border:1,shadow:`none`,mono:!0}},{key:`papercut`,label:`Papercut`,visual:{radius:8,border:0,shadow:`paper`}},{key:`skeuomorphism-classic`,label:`Skeuomorphism Classic`,visual:{radius:6,border:0,shadow:`gloss`}}];function V(e,t){return B.find(t=>t.key===e)?.forceMode??t}var H=[`Inter`,`Roboto`,`Poppins`,`Open Sans`,`Fira Code`,`Montserrat`,`Lato`,`Nunito`,`Playfair Display`,`Merriweather`,`Raleway`,`Source Sans 3`,`Work Sans`,`DM Sans`,`Space Grotesk`,`Manrope`,`Rubik`,`Josefin Sans`,`Bebas Neue`,`JetBrains Mono`,`IBM Plex Sans`,`Oswald`,`Quicksand`,`Karla`,`Outfit`],U={Inter:`Source Sans 3`,Roboto:`Open Sans`,Poppins:`Inter`,"Open Sans":`Lato`,"Fira Code":`Inter`,Montserrat:`Karla`,Lato:`Open Sans`,Nunito:`Karla`,"Playfair Display":`Source Sans 3`,Merriweather:`Lato`,Raleway:`Karla`,"Source Sans 3":`Source Sans 3`,"Work Sans":`Inter`,"DM Sans":`Inter`,"Space Grotesk":`Work Sans`,Manrope:`Inter`,Rubik:`Karla`,"Josefin Sans":`Nunito`,"Bebas Neue":`Roboto`,"JetBrains Mono":`Inter`,"IBM Plex Sans":`IBM Plex Sans`,Oswald:`Open Sans`,Quicksand:`Nunito`,Karla:`Karla`,Outfit:`Inter`};function W(e){return U[e]??`Inter`}var G=[{name:`Tailwind Blue`,color:`#3b82f6`,tags:[`tailwind`,`clean`,`blue`]},{name:`Tailwind Sky`,color:`#0ea5e9`,tags:[`tailwind`,`clean`,`blue`]},{name:`Tailwind Cyan`,color:`#06b6d4`,tags:[`tailwind`,`clean`,`cool`]},{name:`Tailwind Teal`,color:`#14b8a6`,tags:[`tailwind`,`clean`,`cool`]},{name:`Tailwind Emerald`,color:`#10b981`,tags:[`tailwind`,`clean`,`green`]},{name:`Tailwind Green`,color:`#22c55e`,tags:[`tailwind`,`clean`,`green`]},{name:`Tailwind Lime`,color:`#84cc16`,tags:[`tailwind`,`clean`,`green`]},{name:`Tailwind Amber`,color:`#f59e0b`,tags:[`tailwind`,`clean`,`warm`]},{name:`Tailwind Orange`,color:`#f97316`,tags:[`tailwind`,`clean`,`warm`]},{name:`Tailwind Red`,color:`#ef4444`,tags:[`tailwind`,`clean`,`warm`]},{name:`Tailwind Rose`,color:`#f43f5e`,tags:[`tailwind`,`clean`,`warm`]},{name:`Tailwind Pink`,color:`#ec4899`,tags:[`tailwind`,`clean`,`warm`]},{name:`Tailwind Fuchsia`,color:`#d946ef`,tags:[`tailwind`,`clean`,`vivid`]},{name:`Tailwind Purple`,color:`#a855f7`,tags:[`tailwind`,`clean`,`vivid`]},{name:`Tailwind Violet`,color:`#8b5cf6`,tags:[`tailwind`,`clean`,`vivid`]},{name:`Tailwind Indigo`,color:`#6366f1`,tags:[`tailwind`,`clean`,`blue`]},{name:`Tailwind Slate`,color:`#64748b`,tags:[`tailwind`,`neutral`,`muted`]},{name:`Tailwind Zinc`,color:`#71717a`,tags:[`tailwind`,`neutral`,`muted`]},{name:`Material Blue`,color:`#2196f3`,tags:[`material`,`clean`,`blue`]},{name:`Material Indigo`,color:`#3f51b5`,tags:[`material`,`clean`,`blue`]},{name:`Material Deep Purple`,color:`#673ab7`,tags:[`material`,`clean`,`vivid`]},{name:`Material Teal`,color:`#009688`,tags:[`material`,`clean`,`cool`]},{name:`Material Green`,color:`#4caf50`,tags:[`material`,`clean`,`green`]},{name:`Material Light Green`,color:`#8bc34a`,tags:[`material`,`clean`,`green`]},{name:`Material Amber`,color:`#ffc107`,tags:[`material`,`clean`,`warm`]},{name:`Material Orange`,color:`#ff9800`,tags:[`material`,`clean`,`warm`]},{name:`Material Deep Orange`,color:`#ff5722`,tags:[`material`,`clean`,`warm`]},{name:`Material Red`,color:`#f44336`,tags:[`material`,`clean`,`warm`]},{name:`Material Pink`,color:`#e91e63`,tags:[`material`,`clean`,`warm`]},{name:`Material Cyan`,color:`#00bcd4`,tags:[`material`,`clean`,`cool`]},{name:`Material Brown`,color:`#795548`,tags:[`material`,`neutral`,`earthy`]},{name:`Material Blue Grey`,color:`#607d8b`,tags:[`material`,`neutral`,`muted`]},{name:`Flat Turquoise`,color:`#1abc9c`,tags:[`flat`,`clean`,`cool`]},{name:`Flat Emerald`,color:`#2ecc71`,tags:[`flat`,`clean`,`green`]},{name:`Flat Peter River`,color:`#3498db`,tags:[`flat`,`clean`,`blue`]},{name:`Flat Amethyst`,color:`#9b59b6`,tags:[`flat`,`clean`,`vivid`]},{name:`Flat Wet Asphalt`,color:`#34495e`,tags:[`flat`,`neutral`,`muted`]},{name:`Flat Sun Flower`,color:`#f1c40f`,tags:[`flat`,`clean`,`warm`]},{name:`Flat Carrot`,color:`#e67e22`,tags:[`flat`,`clean`,`warm`]},{name:`Flat Alizarin`,color:`#e74c3c`,tags:[`flat`,`clean`,`warm`]},{name:`Flat Concrete`,color:`#95a5a6`,tags:[`flat`,`neutral`,`muted`]},{name:`Neon Blue`,color:`#0066ff`,tags:[`neon`,`vivid`,`blue`]},{name:`Electric Cyan`,color:`#00e5ff`,tags:[`neon`,`vivid`,`cool`]},{name:`Toxic Green`,color:`#39ff14`,tags:[`neon`,`vivid`,`green`]},{name:`Radioactive Yellow`,color:`#eeff00`,tags:[`neon`,`vivid`,`warm`]},{name:`Hyper Red`,color:`#ff0033`,tags:[`neon`,`vivid`,`warm`]},{name:`Neon Magenta`,color:`#ff00ff`,tags:[`neon`,`vivid`,`warm`]},{name:`Ultra Violet`,color:`#a100ff`,tags:[`neon`,`vivid`,`blue`]},{name:`Electric Indigo`,color:`#4d00ff`,tags:[`neon`,`vivid`,`blue`]},{name:`Cyber Pink`,color:`#ff007f`,tags:[`neon`,`vivid`,`warm`]},{name:`Acid Green`,color:`#aaff00`,tags:[`neon`,`vivid`,`green`]},{name:`Warm Graphite`,color:`#3f3f46`,tags:[`neutral`,`muted`]},{name:`Stone Grey`,color:`#78716c`,tags:[`neutral`,`muted`,`earthy`]},{name:`Clay Terracotta`,color:`#b45309`,tags:[`neutral`,`earthy`]},{name:`Muted Sage`,color:`#5f7161`,tags:[`neutral`,`muted`,`earthy`]},{name:`Dusty Rose`,color:`#b3717a`,tags:[`neutral`,`muted`,`warm`]},{name:`Ink Navy`,color:`#1e293b`,tags:[`neutral`,`muted`,`blue`]}],K={default:[`tailwind`,`clean`],flat:[`flat`,`clean`],material:[`material`,`clean`],neumorphism:[`muted`,`neutral`],glassmorphism:[`vivid`,`cool`,`blue`],brutalism:[`vivid`,`warm`],maximalism:[`neon`,`vivid`],skeuomorphism:[`material`,`warm`],skeuominimalism:[`muted`,`neutral`],"dark-highcontrast":[`neon`,`vivid`],"retro-8bit":[`neon`,`vivid`],cyberpunk:[`neon`,`vivid`],claymorphism:[`clean`,`warm`],bauhaus:[`flat`,`warm`,`blue`],organic:[`earthy`,`muted`,`green`],typographic:[`neutral`,`muted`],"minimalism-mono":[`neutral`,`muted`],papercut:[`neutral`,`muted`,`earthy`],"skeuomorphism-classic":[`material`,`blue`]};function me(e){let t=K[e]??[`clean`];return G.map(e=>({p:e,score:e.tags.reduce((e,n)=>e+ +!!t.includes(n),0)})).filter(e=>e.score>0).sort((e,t)=>t.score-e.score).slice(0,8).map(e=>e.p)}var q={theme:`default`,primary:`#0ea5e9`,mode:`light`,headingFont:`Inter`,bodyFont:`Source Sans 3`,bodyFontManual:!1,primaryManual:!1,headingFontManual:!1},J={default:`Inter`,flat:`Roboto`,material:`Roboto`,neumorphism:`Nunito`,glassmorphism:`Outfit`,brutalism:`Oswald`,maximalism:`Montserrat`,skeuomorphism:`Open Sans`,skeuominimalism:`Source Sans 3`,"dark-highcontrast":`Inter`,"retro-8bit":`Space Grotesk`,cyberpunk:`Space Grotesk`,claymorphism:`Nunito`,bauhaus:`Work Sans`,organic:`Quicksand`,typographic:`Bebas Neue`,"minimalism-mono":`JetBrains Mono`,papercut:`DM Sans`,"skeuomorphism-classic":`Lato`};function Y(e){let t=J[e]??q.headingFont;return{headingFont:t,bodyFont:W(t)}}function X(e){return me(e)[0]?.color??q.primary}function Z(e,t,n){let r=B.find(t=>t.key===e)?.visual??{radius:6,border:1,shadow:`soft`},i=C(t),a=n===`dark`,o=i.h,s=(e,t)=>`hsl(${Math.round(o)} ${Math.round(T(e,0,100))}% ${Math.round(T(t,0,100))}%)`,c=(e,t,n)=>`hsl(${Math.round(o)} ${Math.round(T(e,0,100))}% ${Math.round(T(t,0,100))}% / ${n})`,l=a?10:100;return{radius:r.radius,border:r.border,borderColor:r.border>0?s(a?15:Math.max(i.s,8),a?85:20):`transparent`,background:`linear-gradient(160deg, ${s(i.s*.35,a?l+6:Math.min(98,l))}, ${s(i.s*.5,a?l:Math.max(88,l-6))})`,boxShadow:{none:()=>`none`,soft:()=>`0 1px 2px ${c(20,a?0:30,.25)}, 0 4px 12px ${c(20,a?0:30,.12)}`,hard:()=>`3px 3px 0 ${s(i.s,a?80:22)}`,clay:()=>`4px 4px 10px ${c(20,a?0:25,.18)}, -3px -3px 8px ${c(20,a?90:100,a?.05:.8)}`,neu:()=>`4px 4px 8px ${c(15,a?0:55,.5)}, -4px -4px 8px ${c(15,a?95:100,a?.06:.9)}`,glass:()=>`0 6px 20px ${c(20,a?0:35,.22)}`,gloss:()=>`inset 0 1px 0 ${c(20,100,.5)}, 0 2px 4px ${c(20,a?0:25,.3)}`,paper:()=>`0 1px 2px ${c(20,a?0:30,.18)}, 0 4px 10px ${c(20,a?0:30,.12)}`,glow:()=>`0 0 10px ${c(i.s,i.l,.6)}`}[r.shadow](r.radius),letterSpacing:r.upper?`.04em`:r.mono?`-.01em`:`0`,textTransform:r.upper?`uppercase`:`none`,fontFamily:r.mono?`ui-monospace, monospace`:`inherit`}}function he(e){return{default:`Balanced Bulma baseline`,flat:`No shadows, bold borders`,material:`Elevation shadows, uppercase labels`,neumorphism:`Soft extruded dual shadows`,glassmorphism:`Frosted blur and translucency`,brutalism:`Raw borders, hard offsets`,maximalism:`Loud gradients, thick frames`,skeuomorphism:`Glossy faux-realistic surfaces`,skeuominimalism:`Subtle depth, minimal chrome`,"dark-highcontrast":`Pure black, white edges`,"retro-8bit":`Pixel-era chunky UI`,cyberpunk:`Neon glows on deep dark`,claymorphism:`Puffy clay-like volume`,bauhaus:`Primary shapes, geometric`,organic:`Rounded, wavy, friendly`,typographic:`Type does the talking`,"minimalism-mono":`Monospace, hairline borders`,papercut:`Layered paper sheets`,"skeuomorphism-classic":`iOS 6-style glossy buttons`}[e]??``}var ge={class:`flex min-h-dvh`},_e={class:`sticky top-0 hidden h-dvh w-56 shrink-0 flex-col border-r border-line bg-panel md:flex`},ve={class:`flex h-14 shrink-0 items-center gap-2 border-b border-line px-4`},ye={class:`min-h-0 flex-1 overflow-y-auto`},be={class:`flex min-w-0 flex-1 flex-col lg:flex-row`},xe={class:`flex min-w-0 flex-1 flex-col`},Se={class:`sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-line bg-panel/80 px-4 shadow-panel backdrop-blur-md`},Ce={class:`flex min-w-0 items-center gap-2.5`},we={class:`hidden items-center gap-1.5 rounded-full border border-line bg-bg px-2 py-0.5 text-[11px] font-medium text-muted sm:inline-flex`},Te={class:`flex items-center gap-1`},Ee=[`aria-label`,`title`],De={key:0,class:`border-b border-line bg-rose-500/10 px-4 py-2 text-xs font-medium text-rose-400`},Oe={class:`flex h-10 shrink-0 items-center justify-between gap-2 border-b border-line bg-panel px-4`},ke={class:`flex min-w-0 items-center gap-2`},Ae={class:`hidden truncate text-[11px] text-muted/70 md:block`},je={class:`flex items-center gap-0.5`},Me=[`aria-label`,`aria-pressed`,`title`,`onClick`],Ne={class:`hidden sm:inline`},Pe={class:`flex w-full shrink-0 flex-col gap-3.5 border-t border-line bg-panel p-3.5 lg:w-95 lg:overflow-y-auto lg:border-l lg:border-t-0`},Fe={class:`grid grid-cols-3 gap-2`},Ie=[`aria-pressed`,`title`,`onClick`],Le={key:0,class:`text-[11px] leading-relaxed text-muted`},Re={class:`text-[11px] text-muted`},ze={class:`font-medium text-fg`},Be={class:`flex flex-col gap-1`},Ve=[`aria-pressed`,`onClick`],Q=`css-studio:state:bulma-theme`,He=`document.addEventListener('click', (e) => {
  const b = e.target.closest('.navbar-burger'); if (!b) return
  e.preventDefault()
  const m = document.getElementById(b.getAttribute('aria-controls'))
  const open = !b.classList.contains('is-active')
  b.classList.toggle('is-active', open); m && m.classList.toggle('is-active', open)
  b.setAttribute('aria-expanded', String(open))
})
document.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('.navbar-burger')) { e.preventDefault(); e.target.click() }
})`,Ue=r({__name:`css`,setup(r){let x=b();function C(){let e=x.query,t=e.theme,n=e.primary,r=e.mode,i=e.headingFont,a=e.bodyFont,o={...q};t&&B.some(e=>e.key===t)&&(o.theme=t),n&&/^#[0-9a-fA-F]{6}$/.test(n)&&(o.primary=n,o.primaryManual=!0),(r===`light`||r===`dark`)&&(o.mode=r),i&&H.includes(i)&&(o.headingFont=i,o.headingFontManual=!0),a&&H.includes(a)&&(o.bodyFont=a,o.bodyFontManual=!0);let s=(()=>{try{let e=localStorage.getItem(Q);return e?JSON.parse(e):null}catch{return null}})();if(t&&!n&&!s?.primaryManual&&(o.primary=X(t),o.primaryManual=!1),t&&!i&&!s?.headingFontManual){let e=Y(t);o.headingFont=e.headingFont,o.bodyFont=e.bodyFont,o.headingFontManual=!1,o.bodyFontManual=!1}if(t||n||r||i||a)return o;{let e=localStorage.getItem(Q);if(e)try{return{...q,...JSON.parse(e)}}catch{}}o.primary=X(o.theme);let c=Y(o.theme);return o.headingFont=c.headingFont,o.bodyFont=c.bodyFont,o}let w=s(C()),T=H.map(e=>({value:e,label:e})),E=n(()=>me(w.value.theme)),D=n(()=>B.find(e=>e.key===w.value.theme)),O=n(()=>D.value?.label??w.value.theme),k=n(()=>he(w.value.theme)),A=n(()=>{let e=V(w.value.theme,w.value.mode);return Z(w.value.theme,w.value.primary,e)}),le=n(()=>`${Math.min(A.value.radius,20)}px`);function j(e){return w.value.primaryManual?w.value.primary:X(e)}function M(e){let t=Z(e,j(e),w.value.mode);return{borderRadius:`${t.radius}px`,border:`${t.border}px solid ${t.borderColor}`,background:t.background,boxShadow:t.boxShadow}}function N(e){let t=Z(e,j(e),w.value.mode);return{color:w.value.mode===`dark`||B.find(t=>t.key===e)?.forceMode===`dark`?`#ececec`:`#2a2a28`,letterSpacing:t.letterSpacing,textTransform:t.textTransform,fontFamily:t.fontFamily}}function P(e){return e.toLowerCase()===w.value.primary.toLowerCase()}let F=re();v(()=>F.value,e=>{w.value.mode=e===`dark`?`dark`:`light`},{immediate:!0});function I(){F.preference=F.value===`dark`?`light`:`dark`}let L=s(``),R=s(!1),z=s(!1),U=s(null),G={desktop:`1180px`,tablet:`768px`,mobile:`390px`},K=s(`desktop`),J=null;v(w,()=>{J&&clearTimeout(J),J=setTimeout(()=>{try{localStorage.setItem(Q,JSON.stringify(w.value))}catch{}},400)},{deep:!0});function Ue(){let e=new URLSearchParams({theme:w.value.theme,primary:w.value.primary,mode:w.value.mode,headingFont:w.value.headingFont,bodyFont:w.value.bodyFont});window.history.replaceState(window.history.state,``,`${x.path}?${e.toString()}`)}function We(e,t){return`<!DOCTYPE html><html data-theme="${t}"><head><meta charset="UTF-8" /><style>
* { box-sizing: border-box; }
body { margin: 0; padding: 1.5rem; }
.row-flex { display: flex; flex-wrap: wrap; gap: .75rem; }
.section-block { margin-bottom: 2.5rem; }
.section-title { text-transform: uppercase; font-size: .85rem; font-weight: 700; margin-bottom: .75rem; opacity: .6; }
</style>
<style id="theme-stylesheet">${e}</style>
</head><body>${fe}<script>${He}<\/script></body></html>`}let $=0;async function Ge(){let e=++$;z.value=!0;let t=V(w.value.theme,w.value.mode),n=pe(w.value.primary,t);de([w.value.headingFont,w.value.bodyFont]);try{let r=await ue(w.value.theme,n,w.value.headingFont,w.value.bodyFont);if(e!==$)return;L.value=r,R.value=!1,U.value&&(U.value.srcdoc=We(r,t)),Ue()}catch(t){if(e!==$)return;R.value=!0,console.error(`Theme compile error:`,t)}finally{e===$&&(z.value=!1)}}v(w,Ge,{deep:!0}),ee(Ge);function Ke(e){w.value.theme=e,w.value.primaryManual||(w.value.primary=X(e));let t=Y(e);w.value.headingFontManual||(w.value.headingFont=t.headingFont),w.value.bodyFontManual||(w.value.bodyFont=W(t.headingFont))}function qe(e){w.value.primary=e,w.value.primaryManual=!0}function Je(e){w.value.primary=e,w.value.primaryManual=!0}function Ye(){w.value.headingFontManual=!0,w.value.bodyFontManual||(w.value.bodyFont=W(w.value.headingFont))}function Xe(){w.value.bodyFontManual=!0}async function Ze(){try{await navigator.clipboard.writeText(L.value),S(`CSS copied`)}catch{S(`Copy failed`,`error`)}}function Qe(){let e=new Blob([L.value],{type:`text/css`}),t=URL.createObjectURL(e),n=document.createElement(`a`);n.href=t,n.download=`theme-${w.value.theme}-${w.value.mode}.css`,document.body.appendChild(n),n.click(),n.remove(),URL.revokeObjectURL(t)}async function $e(){try{await navigator.clipboard.writeText(window.location.href),S(`Share link copied`)}catch{S(`Could not copy link`,`error`)}}function et(){let e=Y(q.theme);w.value={...q,primary:X(q.theme),headingFont:e.headingFont,bodyFont:e.bodyFont}}return f({title:`SCSS Theme Engine - CSS Studio`,description:`Live SCSS + Bulma theme engine: presets, palettes, font pairing and instant CSS export.`,ogTitle:`SCSS Theme Engine - CSS Studio`,ogDescription:`Live SCSS + Bulma theme engine: presets, palettes, font pairing and instant CSS export.`,ogUrl:`https://css-studio.itsash.in/css`,twitterTitle:`SCSS Theme Engine - CSS Studio`,twitterDescription:`Live SCSS + Bulma theme engine: presets, palettes, font pairing and instant CSS export.`}),h({link:[{rel:`canonical`,href:`https://css-studio.itsash.in/css`}]}),(n,r)=>{let s=ne,f=te,ee=se,h=oe,v=ae,b=ie,x=ce;return g(),y(`div`,ge,[a(`aside`,_e,[a(`div`,ve,[u(f,{to:`/`,class:`flex items-center gap-2 text-sm font-semibold tracking-tight text-fg`},{default:d(()=>[u(s,{name:`ph-paint-brush`,size:17,weight:`duotone`,class:`text-accent`}),r[2]||=i(` CSS Studio `,-1)]),_:1})]),a(`div`,ye,[u(ee)])]),a(`div`,be,[a(`div`,xe,[a(`header`,Se,[a(`div`,Ce,[r[3]||=a(`h1`,{class:`truncate text-sm font-medium text-fg`},`SCSS Theme Engine`,-1),a(`span`,we,[u(s,{name:`ph-swatches`,size:12,class:`text-accent`}),i(` `+m(c(O)),1)])]),a(`div`,Te,[a(`button`,{class:`inline-flex h-8 items-center gap-1.5 rounded-lg border border-line bg-bg px-2.5 text-sm font-medium text-fg transition-[transform,background-color,border-color] duration-150 hover:bg-line/30 hover:border-line-strong active:scale-[0.97]`,onClick:Ze},[u(s,{name:`ph-copy`,size:14,class:`text-accent`}),r[4]||=a(`span`,{class:`hidden md:inline`},`Copy CSS`,-1)]),a(`button`,{class:`inline-flex h-8 items-center gap-1.5 rounded-lg border border-line bg-bg px-2.5 text-sm font-medium text-fg transition-[transform,background-color,border-color] duration-150 hover:bg-line/30 hover:border-line-strong active:scale-[0.97]`,onClick:Qe},[u(s,{name:`ph-download-simple`,size:14}),r[5]||=a(`span`,{class:`hidden md:inline`},`Download`,-1)]),a(`button`,{class:`inline-flex h-8 items-center gap-1.5 rounded-lg border border-line bg-bg px-2.5 text-sm font-medium text-fg transition-[transform,background-color,border-color] duration-150 hover:bg-line/30 hover:border-line-strong active:scale-[0.97]`,onClick:$e},[u(s,{name:`ph-share-network`,size:14}),r[6]||=a(`span`,{class:`hidden md:inline`},`Share`,-1)]),a(`button`,{class:`inline-flex h-8 items-center gap-1.5 rounded-lg border border-line bg-bg px-2.5 text-sm font-medium text-fg transition-[transform,background-color,border-color] duration-150 hover:bg-line/30 hover:border-line-strong active:scale-[0.97]`,onClick:et},[u(s,{name:`ph-arrow-counter-clockwise`,size:14}),r[7]||=a(`span`,{class:`hidden md:inline`},`Reset`,-1)]),r[8]||=a(`span`,{class:`mx-1 hidden h-4 w-px bg-line sm:block`,"aria-hidden":`true`},null,-1),a(`button`,{class:`inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-[background-color,color] duration-150 hover:bg-line/30 hover:text-fg active:scale-[0.95]`,"aria-label":c(F).value===`dark`?`Switch to light mode`:`Switch to dark mode`,title:c(F).value===`dark`?`Switch to light mode`:`Switch to dark mode`,onClick:I},[u(s,{name:c(F).value===`dark`?`ph-sun`:`ph-moon`,size:15},null,8,[`name`])],8,Ee),u(h)])]),c(R)?(g(),y(`div`,De,` Theme compile error — see console `)):l(``,!0),a(`div`,Oe,[a(`div`,ke,[r[9]||=a(`span`,{class:`text-xs font-medium tracking-tight text-muted`},`Preview`,-1),a(`span`,Ae,m(c(k)),1)]),a(`div`,je,[(g(),y(t,null,p([{v:`desktop`,icon:`ph-monitor`,label:`Desktop`},{v:`tablet`,icon:`ph-device-tablet`,label:`Tablet`},{v:`mobile`,icon:`ph-device-mobile-camera`,label:`Mobile`}],t=>a(`button`,{key:t.v,class:e([`inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-muted transition-colors duration-100 hover:bg-line/30 hover:text-fg`,c(K)===t.v?`bg-accent/12 text-fg`:``]),"aria-label":`Preview at ${t.label} size`,"aria-pressed":c(K)===t.v,title:t.label,onClick:e=>K.value=t.v},[u(s,{name:t.icon,size:13},null,8,[`name`]),a(`span`,Ne,m(t.label),1)],10,Me)),64))])]),a(`main`,{class:e([`flex min-h-0 flex-1 justify-center overflow-auto p-4 transition-colors duration-150 lg:p-6`,c(F).value===`dark`?`bg-zinc-950`:`bg-zinc-100`])},[a(`div`,{class:e([`relative h-full w-full overflow-hidden border shadow-panel transition-[width,border-radius] duration-200 ease-out`,c(F).value===`dark`?`border-white/10 bg-black`:`border-black/10 bg-white`]),style:_({width:G[c(K)],maxWidth:`100%`,borderRadius:c(le)})},[c(z)?(g(),y(`div`,{key:0,class:e([`absolute inset-0 z-10 flex items-center justify-center gap-2 backdrop-blur-sm`,c(F).value===`dark`?`bg-black/60 text-zinc-300`:`bg-white/60 text-zinc-500`])},[u(s,{name:`ph-spinner-gap`,size:18,class:`animate-spin text-accent`}),r[10]||=a(`span`,{class:`text-xs font-medium`},`Compiling theme…`,-1)],2)):l(``,!0),a(`iframe`,{ref_key:`iframeRef`,ref:U,title:`Bulma theme preview`,class:`block h-full w-full border-0`,sandbox:`allow-scripts`},null,512)],6)],2)]),a(`aside`,Pe,[u(v,{label:`Theme preset`,icon:`ph-palette`},{default:d(()=>[a(`div`,Fe,[(g(!0),y(t,null,p(c(B),t=>(g(),y(`button`,{key:t.key,type:`button`,class:e([`group flex flex-col gap-1.5 rounded-lg border p-1.5 text-left transition-[border-color,background-color,transform] duration-150 hover:bg-line/15 active:scale-[0.97]`,c(w).theme===t.key?`border-accent/70 bg-accent/8`:`border-line`]),"aria-pressed":c(w).theme===t.key,title:c(he)(t.key),onClick:e=>Ke(t.key)},[a(`span`,{class:`flex aspect-2/1 w-full items-center justify-center overflow-hidden`,style:_(M(t.key))},[a(`span`,{class:`max-w-full truncate px-1 text-[9px] font-bold`,style:_(N(t.key))},`Aa`,4)],4),a(`span`,{class:e([`line-clamp-1 text-[10px] font-medium leading-tight`,c(w).theme===t.key?`text-fg`:`text-muted`])},m(t.label),3)],10,Ie))),128))]),c(k)?(g(),y(`p`,Le,m(c(k)),1)):l(``,!0)]),_:1}),u(v,{label:`Fonts`,icon:`ph-text-aa`},{default:d(()=>[u(b,{modelValue:c(w).headingFont,"onUpdate:modelValue":[r[0]||=e=>c(w).headingFont=e,Ye],label:`Heading font`,options:c(T)},null,8,[`modelValue`,`options`]),u(b,{modelValue:c(w).bodyFont,"onUpdate:modelValue":[r[1]||=e=>c(w).bodyFont=e,Xe],label:`Body font`,options:c(T)},null,8,[`modelValue`,`options`])]),_:1}),u(v,{label:`Primary color`,icon:`ph-drop`},{default:d(()=>[u(x,{"model-value":c(w).primary,label:`Primary`,"onUpdate:modelValue":Je},null,8,[`model-value`]),a(`p`,Re,[r[11]||=i(`Curated colors that suit `,-1),a(`span`,ze,m(c(O)),1),r[12]||=i(`.`,-1)]),a(`div`,Be,[(g(!0),y(t,null,p(c(E),t=>(g(),y(`button`,{key:t.name,type:`button`,class:e([`group flex items-center gap-2.5 rounded-lg border px-2 py-1.5 text-left transition-[border-color,background-color] duration-150 hover:bg-line/15`,P(t.color)?`border-accent/70 bg-accent/8`:`border-line`]),"aria-pressed":P(t.color),onClick:e=>qe(t.color)},[a(`span`,{class:`h-5 w-5 shrink-0 rounded-md border border-line`,style:_({background:t.color})},null,4),a(`span`,{class:e([`line-clamp-1 text-xs font-medium`,P(t.color)?`text-fg`:`text-muted`])},m(t.name),3),P(t.color)?(g(),o(s,{key:0,name:`ph-check`,size:13,class:`ml-auto text-accent`})):l(``,!0)],10,Ve))),128))])]),_:1})])])])}}});export{Ue as default};