export const SITE_URL = 'https://css-studio.itsash.in'
export const SITE_NAME = 'CSS Studio'
export const OG_IMAGE = `${SITE_URL}/og-image.png`

export interface PageSeo {
  path: string
  name: string
  title: string
  description: string
  category: string
}

const g = (path: string, name: string, title: string, description: string, category: string): PageSeo => ({
  path,
  name,
  title,
  description,
  category
})

/** Single source of truth for page metadata, sitemap and prerender routes. */
export const PAGES: PageSeo[] = [
  g('/', 'CSS Studio', 'CSS Studio — 60+ Free CSS Generators for Gradients, Shadows & Animations', 'Free online CSS generators for gradients, box shadows, glassmorphism, animations, loaders, patterns and UI components. Live preview, copy pure CSS + HTML, no signup.', 'Home'),
  g('/gradient', 'CSS Gradient Generator', 'CSS Gradient Generator — Linear, Radial & Conic', 'Create linear, radial, conic and repeating CSS gradients with draggable color stops, presets and animation. Copy production-ready background CSS instantly.', 'Backgrounds'),
  g('/mesh', 'Mesh Gradient Generator', 'Mesh Gradient Generator — Pure CSS Mesh Backgrounds', 'Build smooth mesh gradients by dragging color points. Exported as layered radial-gradient CSS — no images, no SVG, no canvas.', 'Backgrounds'),
  g('/blob', 'CSS Blob Generator', 'CSS Blob Generator — Organic Shapes & Morph Animation', 'Generate organic blob shapes from border-radius with gradients, shadows and morphing keyframe animation. Free, copy-paste CSS.', 'Shapes'),
  g('/pattern', 'CSS Pattern Generator', 'CSS Background Pattern Generator — 12 Tileable Patterns', 'Tileable CSS background patterns — stripes, dots, checkerboard, grid, zigzag and more — built from repeating gradients. Customize colors and size.', 'Backgrounds'),
  g('/shadow', 'Box Shadow Generator', 'CSS Box Shadow Generator — Layered, Inset & Text Shadows', 'Design layered CSS box-shadow and text-shadow with inset support, live preview and presets. Copy smooth, realistic shadow CSS in one click.', 'Effects'),
  g('/shape', 'CSS Shape Generator', 'CSS Shape Generator — Triangles, Stars, Hearts & More', '16 pure CSS shapes built with border tricks, clip-path and border-radius: triangles, arrows, stars, hearts, hexagons and more.', 'Shapes'),
  g('/border', 'CSS Border Generator', 'CSS Border Generator — Gradient, Animated & Glow Borders', 'Create solid, gradient, animated and glowing CSS borders with per-side widths and individual corner radius controls.', 'Effects'),
  g('/glass', 'Glassmorphism Generator', 'Glassmorphism CSS Generator — Frosted Glass Effect', 'Glassmorphism CSS generator: frosted, liquid, acrylic and clear glass cards, players, widgets and navbars over photo or gradient backdrops.', 'Effects'),
  g('/neumorphism', 'Neumorphism Generator', 'Neumorphism CSS Generator — Soft UI Shadows', 'Create soft UI neumorphic elements with dual shadows computed from a virtual light source. Flat, concave, convex and pressed styles.', 'Effects'),
  g('/text', 'CSS Text Effects', 'CSS Text Effects Generator — Neon, 3D, Metallic & Glass', 'Style headings with gradient, neon glow, 3D extrude, metallic and glass text effects in pure CSS. Live preview with your own text.', 'Typography'),
  g('/animation', 'CSS Animation Generator', 'CSS Keyframe Animation Generator — Visual Builder', 'Build CSS @keyframes animations visually with timing, easing, delay, iteration and direction controls. Copy ready-to-use animation CSS.', 'Animation'),
  g('/component', 'CSS Component Generator', 'CSS Component Generator — Buttons, Cards, Inputs & Heroes', 'Generate styled buttons, cards, inputs, badges, navbars and hero sections in pure HTML + CSS with shared theme tokens.', 'Components'),
  g('/background', 'CSS Background Generator', 'Layered CSS Background Generator — Gradients, Patterns & Glows', 'Composite multiple gradients, patterns and glows into one CSS background. Reorder layers, tweak blend and copy a single background rule.', 'Backgrounds'),
  g('/loader', 'CSS Loader Generator', 'CSS Loader & Spinner Generator — Pure CSS Loading Animations', 'Pure CSS spinners, dots, bars, progress indicators and skeleton shimmer loaders. Customize size, color and speed — no JavaScript.', 'Animation'),
  g('/badge', 'CSS Badge Generator', 'CSS Badge Generator — Pills, Status Dots & Ribbons', 'Create pill badges, status dots, notification counters and corner ribbons in pure CSS with live preview and presets.', 'Components'),
  g('/divider', 'CSS Divider Generator', 'CSS Divider Generator — Section Separators & HR Styles', 'Style hr and section dividers: gradient fade, dashed, dotted, double, zigzag and ornament separators in pure CSS.', 'Layout'),
  g('/scrollbar', 'Custom Scrollbar Generator', 'Custom Scrollbar CSS Generator — Webkit & Firefox', 'Style custom scrollbars with ::-webkit-scrollbar and standard scrollbar-color / scrollbar-width. Cross-browser CSS with live preview.', 'Effects'),
  g('/scroll-anim', 'Scroll-driven Animations', 'CSS Scroll-driven Animation Generator — scroll() & view()', 'Build CSS scroll-driven animations with animation-timeline scroll() and view(): reading progress bars, reveal on scroll and parallax — no JavaScript.', 'Animation'),
  g('/tooltip', 'CSS Tooltip Generator', 'CSS Tooltip Generator — Pure CSS Tooltips with Arrows', 'Pure CSS tooltips using a data-tip attribute with four placements, arrows, skins and animation. No JavaScript required.', 'Components'),
  g('/marquee', 'CSS Marquee Generator', 'CSS Marquee Generator — Infinite Scrolling Ticker', 'Create an infinite scrolling marquee / logo ticker in pure CSS with direction, speed, gap, edge fade and pause on hover.', 'Animation'),
  g('/var-font', 'Variable Font Playground', 'Variable Font Playground — font-variation-settings Generator', 'Explore variable font axes — weight, optical size, slant and width — and copy the font-variation-settings CSS.', 'Typography'),
  g('/text-ring', 'Circular Text Generator', 'Circular Text Ring Generator — Text on a Circle in CSS', 'Place text around a circle and spin it — rotating badge text in pure CSS with radius, spacing and speed controls.', 'Typography'),
  g('/scroll-snap', 'Scroll Snap Carousel', 'CSS Scroll Snap Carousel Generator', 'Build a pure CSS carousel with scroll-snap-type and scroll-snap-align. Tune snapping, padding and gap — no JavaScript slider needed.', 'Layout'),
  g('/mask', 'CSS Mask Generator', 'CSS Mask Image Generator — Fades, Holes, Stripes & Dots', 'Generate mask-image effects: edge fades, spotlight holes, stripes and dot grids applied to any element in pure CSS.', 'Effects'),
  g('/clip', 'Clip-path Generator', 'CSS Clip-path Generator — Polygon, Circle, Ellipse & Inset', 'Drag points to build clip-path polygons, circles, ellipses and insets. Live preview and copy-ready clip-path CSS.', 'Shapes'),
  g('/aspect-fit', 'Aspect Ratio & Object Fit', 'CSS Aspect Ratio & Object-fit Visualizer', 'Compare aspect-ratio frames with object-fit fill, contain, cover, none and scale-down side by side, plus object-position.', 'Layout'),
  g('/marker-list', 'CSS List Marker Builder', 'CSS ::marker List Style Generator — Custom Bullets & Counters', 'Design custom list bullets, glyphs and numbered counters with ::marker and list-style in pure CSS.', 'Typography'),
  g('/conic-chart', 'CSS Pie Chart Generator', 'CSS Pie & Donut Chart Generator — conic-gradient', 'Turn data into pie and donut charts with conic-gradient. Gaps, legend and center label — pure CSS, no chart library.', 'Components'),
  g('/cursor', 'Cursor & Selection Generator', 'CSS Custom Cursor & ::selection Color Generator', 'Preview CSS cursor values and style text selection with ::selection colors. Copy the CSS for your site.', 'Effects'),
  g('/filter', 'CSS Filter Generator', 'CSS Filter Generator — Blur, Grayscale, Contrast & Duotone', 'Stack CSS filter functions — blur, brightness, contrast, grayscale, hue-rotate, sepia, saturate and duotone — with live image preview.', 'Effects'),
  g('/spotlight', 'CSS Spotlight Effect', 'CSS Spotlight Hover Effect Generator', 'Cursor-follow spotlight and glow hover effect built from radial-gradient and CSS custom properties.', 'Effects'),
  g('/noise', 'CSS Noise & Grain Generator', 'CSS Noise & Film Grain Texture Generator', 'Add film grain, static and halftone texture overlays in pure CSS. Adjustable opacity, scale and animation.', 'Backgrounds'),
  g('/typescale', 'Fluid Type Scale Generator', 'Fluid Typography Scale Generator — CSS clamp()', 'Generate a fluid type scale with CSS clamp() from min/max viewport widths and a modular ratio. Copy CSS custom properties.', 'Typography'),
  g('/hover', 'CSS Hover Effects', 'CSS Hover Effects Generator — Buttons & Cards', 'Pure CSS hover effects for buttons and cards: lift, glow, underline sweep, fill, tilt and shine micro-interactions.', 'Animation'),
  g('/toggle', 'CSS Toggle Switch Generator', 'CSS Toggle Switch & Custom Checkbox Generator', 'Custom toggle switches, checkboxes and radio buttons in pure CSS — accessible native inputs, no JavaScript.', 'Components'),
  g('/input', 'CSS Input Field Generator', 'CSS Input Field Generator — Floating Labels & Focus Styles', 'Style text inputs with outline, underline, floating label, glow and filled variants plus focus states in pure CSS.', 'Components'),
  g('/flip-card', 'CSS Flip Card Generator', 'CSS 3D Flip Card Generator — Front & Back on Hover', 'Create 3D flip cards with front and back faces using transform and backface-visibility. Pure CSS, no JavaScript.', 'Components'),
  g('/compare', 'Before / After Slider', 'CSS Before / After Image Comparison Slider', 'Pure CSS before/after image comparison slider with a draggable split handle. No JavaScript required.', 'Components'),
  g('/text-anim', 'CSS Text Animations', 'CSS Text Animation Generator — Typewriter, Glitch & Wave', 'Typewriter, wave, glitch, blur-in and staggered reveal text animations built with CSS keyframes only.', 'Animation'),
  g('/link', 'CSS Link Underline Effects', 'CSS Animated Link Underline Generator', '10 animated underline hover styles for links and inline text — slide, grow, gradient and more in pure CSS.', 'Typography'),
  g('/squircle', 'CSS Squircle Generator', 'CSS Squircle Generator — iOS Smooth Corners', 'Approximate iOS-style superellipse smooth corners (squircles) in pure CSS. Adjustable smoothing and size.', 'Shapes'),
  g('/accordion', 'CSS Accordion Generator', 'CSS Accordion Generator — details & summary, No JS', 'Accessible accordions built on details/summary with smooth open animation and custom icons. Pure HTML + CSS.', 'Components'),
  g('/chat', 'CSS Chat Bubble Generator', 'CSS Chat Bubble Generator — Message Tails & Typing Dots', 'Chat bubble UI in pure CSS: 9 skins (iMessage, WhatsApp, glass, gradient, neo-brutal, Slack thread), tails, grouping, avatars, read receipts and typing indicators.', 'Components'),
  g('/terminal', 'Terminal Window Mockup', 'CSS Terminal Window Mockup Generator — macOS Style', 'macOS-style terminal and code window mockups with traffic lights, title bar and themes in pure CSS.', 'Components'),
  g('/hamburger', 'CSS Hamburger Menu Icon', 'CSS Hamburger Menu Icon Generator — Animated to X', 'Animated hamburger menu icons in pure CSS: 10 morphs (X, squeeze, spin, arrow, chevron, plus), button shells, staggered bars and a Menu/Close label.', 'Animation'),
  g('/avatar', 'CSS Avatar Stack', 'CSS Avatar Group / Stack Generator', 'Overlapping avatar stacks with rings, hover spread and a +N overflow badge in pure CSS.', 'Components'),
  g('/pagination', 'CSS Pagination Generator', 'CSS Pagination Generator — Number Pills, Dots & Arrows', 'Pagination components with number pills, dots, arrows and glowing active states in pure CSS.', 'Components'),
  g('/timeline', 'CSS Timeline Generator', 'CSS Vertical Timeline Generator — Changelog & History', 'Vertical timelines with dots, cards, alternating sides and changelog styles in pure HTML + CSS.', 'Layout'),
  g('/rating', 'CSS Star Rating', 'CSS Star Rating Generator — Hover Fill, No JS', 'Pure CSS star and heart ratings with hover fill and review distribution bars.', 'Components'),
  g('/orbit', 'CSS 3D Orbit', 'CSS 3D Animation Generator — Cubes, Orbits & Spheres', 'Rotating 3D cubes, planet orbits, gyroscope rings and dot spheres using transform-style preserve-3d only.', 'Animation'),
  g('/aurora', 'CSS Aurora Background', 'CSS Aurora Background Generator — Animated Gradients', 'Animated aurora, starfield, sunset and moonlight backgrounds in pure CSS.', 'Backgrounds'),
  g('/table', 'CSS Table Styles', 'CSS Table Style Generator — Zebra, Sticky Header & Rounded', 'Style HTML tables with zebra rows, sticky headers, rounded frames and hover glow in pure CSS.', 'Components'),
  g('/kbd', 'CSS Kbd & Code Chips', 'CSS Keyboard Key (kbd) & Code Chip Generator', 'Style kbd keycaps, shortcut combinations and inline code chips in pure CSS.', 'Typography'),
  g('/trail', 'Cursor Trail & Scroll Progress', 'Cursor Trail & Scroll Progress Bar Generator', 'Sparkle cursor trails and reading progress indicators with CSS and a tiny 10-line JavaScript snippet.', 'Animation'),
  g('/navbar', 'CSS Navbar Generator', 'CSS Navbar Generator — Floating, Pill & Sidebar Navigation', 'Navigation bars with floating, underline, pill and sidebar styles in pure HTML + CSS.', 'Components'),
  g('/toast', 'CSS Toast Notification', 'CSS Toast Notification Generator — Success, Error & Info', 'Success, error, info and warning toast notifications with progress timers and entrance animations.', 'Components'),
  g('/progress-bar', 'CSS Progress Bar Generator', 'CSS Progress Bar Generator — Striped, Gradient & Indeterminate', 'Gradient, striped, animated and indeterminate progress bars in pure CSS.', 'Components'),
  g('/skeleton', 'CSS Skeleton Loader', 'CSS Skeleton Loader Generator — Shimmer & Pulse', 'Skeleton loading placeholders with shimmer, wave and pulse animations in pure CSS.', 'Animation'),
  g('/gradient-text', 'CSS Gradient Text Generator', 'CSS Gradient Text Generator — Animated background-clip', 'Animated gradient and outline text using background-clip: text. Pick colors, angle and speed.', 'Typography'),
  g('/modal', 'CSS Modal Generator', 'CSS Modal & Dialog Generator — Overlays & Bottom Sheets', 'Modals, dialogs and bottom sheets with backdrop and open animations in HTML + CSS.', 'Components'),
  g('/card', 'CSS Card Generator', 'CSS Card Generator — Elevated, Glass & Gradient Border', 'Elevated, glass, outline and gradient-border card styles in pure CSS.', 'Components'),
  g('/wave', 'CSS Wave Generator', 'CSS Wave Section Divider Generator', 'Sine, zigzag, step and blob wave section dividers built in pure CSS — no SVG.', 'Layout'),
  g('/palette', 'Color Palette Generator', 'Color Palette Generator & WCAG Contrast Checker', 'Generate color harmonies (complementary, analogous, triadic), check WCAG contrast ratios and convert HEX, RGB and HSL.', 'Color')
]

const byPath = new Map(PAGES.map((p) => [p.path, p]))

export const pageSeo = (path: string): PageSeo | undefined => byPath.get(path.replace(/\/+$/, '') || '/')

export const absUrl = (path: string) => `${SITE_URL}${path === '/' ? '/' : path}`
