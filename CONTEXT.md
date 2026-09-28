# JUI Component Library - Domain Context

A tactile 2D pixel-art game UI component library providing retro arcade and RPG primitives for React 19 and Tailwind CSS. Built for indie games, retro web applications, and gamified digital products across Next.js and Vite.

## Language & Terminology

**Pixel Game Primitive**:
The retro 8-bit/16-bit visual and behavioral component featuring chunky stepped pixel borders, retro typography, and tactile press feedback for game developers and retro web applications.
_Avoid_: SaaS component, normal component, default component

**Variant**:
The visual intent and gameplay role of a primitive (e.g. `default`, `outline`, `ghost`, `secondary`, `destructive`).
_Avoid_: Flavor, style, theme

**Stepped 3D Pixel Bevel**:
The tactile multi-layer border model consisting of outer deep espresso (`#4B2E2B`) contour, upper-left highlight, bottom-right depth shadow, and 2-pixel down-and-right physical displacement upon active press.
_Avoid_: Flat border, generic box-shadow

**Procedural Web Audio SFX**:
Real-time browser-synthesized audio waveforms (clicks, fanfares, alert tones) generated via square and triangle oscillators with zero external MP3/WAV asset dependencies.
_Avoid_: Audio file, sound asset, MP3 clip

**AvatarsInPixels Vector Engine**:
The synchronous SVG rendering system generating instant retro chibi character portraits with deterministic seed hashing and zero background flash on initial paint or page refresh.
_Avoid_: Bitmap avatar, async profile picture, sprite image

**Headless Primitive**:
The unstyled, accessible behavioral logic and state layer managing ARIA roles, keyboard interactions, and focus for complex interactive widgets.
_Avoid_: Base component, core component

**Registry**:
The component code distribution system that provides direct source code to consuming projects via copy-paste or the `@1zuku/jui` interactive CLI with automatic Next.js and Vite support.
_Avoid_: Monolithic NPM package, black-box bundle

**Earthy Palette**:
The core warm color scheme anchored around cream background (`#FFF8F0`), caramel accent (`#C08552`), cinnamon shadow/depth (`#8C5A3C`), and deep espresso text/pixel contours (`#4B2E2B`).
_Avoid_: Brown theme, slate theme, default monochrome

**Pixel Typography**:
The crisp, grid-aligned pixel typography used across all primitives, anchored by `Geist Pixel` with retro monospace fallbacks.
_Avoid_: Normal font, default font, rounded sans

**Component Codex**:
The dedicated interactive documentation and testing page (`/docs/component`) showcasing all 28 game UI primitives organized into 6 RPG categories with live controls.
_Avoid_: Demo page, playground, kitchen sink

**Jev Decision Layer**:
The TypeSafe AI System One decision engine (`typesafe/jev-1.13` via OpenRouter Decisions API) that evaluates game event context to dynamically select appropriate pixel UI components from fixed choice schemas without free-text generation.
_Avoid_: AI component generator, LLM chatbot, free-text prompt

**Feedback Picker**:
The decision boundary evaluating game event urgency, disruption, and acknowledgment requirements to pick between `PixelToast`, `PixelDialog`, and `PixelAlert`.
_Avoid_: Notification switcher, modal condition

**Confidence Smoothing**:
The client-side state machine in `decide.ts` that prevents visual component flickering by requiring either >=0.85 single-call confidence or two identical consecutive decisions within a sliding window before committing a component swap.
_Avoid_: Debouncer, rate limiter

**Safe Default Component**:
The predetermined non-intrusive component rendered when a decision boundary's model confidence falls below 0.60 (`PixelToast` for feedback).
_Avoid_: Error component, fallback UI

**Offline Mock Classifier**:
The deterministic, keyword-based classifier providing the identical TypeScript input/output shape as TypeSafe AI's Jev model for zero-latency local development and automated testing.
_Avoid_: Fake API, dummy stub
