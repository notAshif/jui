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

**Jev Decision Layer**:
The TypeSafe AI System One decision engine that evaluates game event context to select appropriate pixel UI components from fixed choice schemas without free-text generation.
_Avoid_: AI component generator, LLM classifier, bot

**Feedback Picker**:
The decision boundary evaluating game event urgency, disruption, and acknowledgment requirements to pick between `PixelToast`, `PixelDialog`, and `PixelAlert`.
_Avoid_: Notification switcher, modal condition

**Confidence Smoothing**:
The client-side state machine in `decide.ts` that prevents visual component flickering by requiring either >0.85 single-call confidence or two identical consecutive decisions within a sliding window before committing a component swap.
_Avoid_: Debouncer, rate limiter

**Safe Default Component**:
The predetermined non-intrusive component rendered when a decision boundary's model confidence falls below 0.60 (`PixelToast` for feedback).
_Avoid_: Error component, fallback UI

**Offline Mock Classifier**:
The deterministic, keyword-based classifier providing the identical TypeScript input/output shape as TypeSafe AI's Jev model for zero-latency local development and automated testing.
_Avoid_: Fake API, stub
