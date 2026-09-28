/** Static Bulma component gallery markup rendered inside the theme-engine preview iframe.
 *  Covers every major Bulma component family so a preset is judged at 100% component coverage. */
export const BULMA_GALLERY_HTML = `
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
`
