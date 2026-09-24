# JUI Component Library

A dual-aesthetic component library providing both clean modern SaaS primitives and tactile 2D pixel-art game UI primitives.

## Language

**Modern Component**:
The clean, minimal, product-oriented visual style of a component designed for SaaS and modern web applications.
_Avoid_: Normal component, standard component, default component

**Pixel Component**:
The retro 8-bit/16-bit visual style of a component featuring chunky pixel borders, retro typography, and tactile press feedback for game developers and retro web applications.
_Avoid_: 2D component, game component

**Flavor**:
The visual aesthetic category of a component family (`modern` or `pixel`).
_Avoid_: Theme, mode, variant

**Variant**:
The visual intent and hierarchy of a component within its flavor (e.g. `primary`, `secondary`, `outline`, `ghost`, `destructive`, `link`).
_Avoid_: Flavor, style

**Headless Primitive**:
The unstyled, accessible behavioral logic and state layer managing ARIA roles, keyboard interactions, and focus for complex interactive widgets.
_Avoid_: Base component, core component

**Registry**:
The component code distribution system that provides direct source code to consuming projects via copy-paste or CLI.
_Avoid_: NPM package, bundle

**Earthy Palette**:
The core warm color scheme anchored around 60% cream background (`#FFF8F0`), caramel accent (`#C08552`), cinnamon shadow/depth (`#8C5A3C`), and deep espresso text/pixel contours (`#4B2E2B`).
_Avoid_: Brown theme, default palette

**Modern Typography**:
The sleek variable sans-serif typography used for Modern Components, anchored by `Google Sans Flex` (with modern geometric sans fallbacks).
_Avoid_: Normal font, default font

**Pixel Typography**:
The crisp, grid-aligned pixel typography used for Pixel Components, anchored by `Geist Pixel` (with retro pixelated fallbacks).
_Avoid_: Game font, 2D font

**Landing Showcase**:
The interactive demonstration and documentation root page showcasing both component flavors side-by-side.
_Avoid_: Marketing page, splash page

**Theme Toggler**:
The interactive header control that metamorphoses the entire website between Modern SaaS aesthetic and 16-bit 2D Pixel aesthetic.
_Avoid_: Dark mode toggle, style switcher
