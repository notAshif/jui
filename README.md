# JUI - 2D Pixel Game UI Component Library

A tactile 2D pixel-art game UI component library providing retro arcade and RPG primitives for React 19 and Tailwind CSS. Built for indie games, retro web applications, and gamified digital experiences.

Available for **Next.js** and **Vite**.

---

## Overview

JUI delivers an authentic 2D pixel-art component system designed for indie web games, retro RPG HUDs, and gamified applications.

- **Tactile 3D Bevels**: Stepped multi-layer pixel bevels that physically depress by 2 pixels upon active press.
- **Procedural Web Audio SFX**: Real-time synthesized 8-bit sound waveforms (tactile clicks, loot chimes, alert tones) with zero external MP3 assets.
- **Instant Synchronous Avatars**: `PixelAvatar` powered by AvatarsInPixels vector SVG rendering. Instant paint with zero background flashing or image flicker on page refresh.
- **Jev AI Decision Layer**: Native System One decision pipeline (`typesafe/jev-1.13`) that dynamically evaluates gameplay signals to select pixel UI primitives.
- **Next.js & Vite Native**: Automatic framework detection on initialization with zero complex bundling dependencies.
- **Earthy Palette**: Warm, artisanal color system calibrated for high contrast and retro readability (parchment cream, warm caramel, cinnamon depth, espresso contours).

---

## Architecture

```
+-------------------------------------------------------------+
|                      JUI Game UI Primitives                 |
+-------------------------------------------------------------+
                               |
       +-----------------------+-----------------------+
       |                                               |
       v                                               v
+-------------------------------+       +-------------------------------+
|      Tactile Game Primitives  |       |       Jev AI Decision Layer   |
|                               |       |                               |
| - 28 RPG & Arcade Components  |       | - typesafe/jev-1.13 Engine    |
| - Stepped 3D Pixel Bevels     |       | - Confidence Smoothing        |
| - Synthesized Web Audio SFX   |       | - Safe Default Fallbacks      |
| - Instant SVG Pixel Avatars   |       | - Real-time Signal Picker     |
+-------------------------------+       +-------------------------------+
       |                                               |
       +-----------------------+-----------------------+
                               |
                               v
+-------------------------------------------------------------+
|               Accessible Behavioral Foundation               |
|                                                             |
| - WAI-ARIA Dialog & Alert Roles                             |
| - Full Keyboard Navigation & Focus Traps                    |
| - Tailwind CSS v4 Theme Variables & Earthy Design Tokens    |
+-------------------------------------------------------------+
```

---

## Key Features

- **28 Core Game UI Primitives**: 6 RPG categories covering vital meters, inventory vaults, dialogues, navigation, and codex panels.
- **Physical Bevel Mechanics**: Multi-layer stepped CSS border-shadows with down-and-right tactile displacement on click.
- **Procedural Sound Engine**: Web Audio synthesizer creating square and triangle wave clicks and chimes with built-in mute controls.
- **Zero-Flicker Chibi Avatars**: Synchronous vector SVG avatar engine with deterministic seed hashing and zero network latency.
- **Framework Auto-Detection**: CLI automatically recognizes Next.js and Vite project setups.
- **Interactive Init Permission**: CLI prompts for confirmation before adding utility helpers or modifying repository files.
- **System One Decision Engine**: Integration with TypeSafe AI's Jev model (`typesafe/jev-1.13`) for event-driven UI routing.
- **Earthy Color System**: Warm cream background (`#FFF8F0`), caramel accent (`#C08552`), cinnamon shadow (`#8C5A3C`), and espresso text (`#4B2E2B`).
- **Complete Code Ownership**: Primitives are copied directly into your repository with zero black-box package lock-in.

---

## Framework Support

| Framework | Status | Supported Features |
| :--- | :--- | :--- |
| **Next.js** (App Router & Pages) | Supported | Full Server & Client Components, Turbopack, SSR synchronous SVG avatars |
| **Vite** (React 19 & 18) | Supported | Fast HMR, pure client-side bundles, instant procedural audio synthesis |

---

## Getting Started

### Development Server

```bash
bun dev
# or
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the interactive showcase and component codex.

---

## CLI Installation & Usage

JUI components are distributed via an interactive CLI registry directly into your repository:

### 1. Initialize Configuration

Run the `init` command in your project root with optional framework target (`next` or `vite`):

```bash
# Auto-detect framework from package.json
npx @1zuku/jui init

# Explicitly target Next.js (displays Next.js setup guide)
npx @1zuku/jui init -f next

# Explicitly target Vite (displays Vite setup & alias guide)
npx @1zuku/jui init -f vite
```

The CLI requests confirmation before creating configuration and helper files:
```text
Initializing JUI in your project...
Available for Next.js, Vite

  [INFO] Target framework: Next.js
? Do you want to initialize JUI in this project? (Y/n): 
```

To skip the interactive confirmation prompt in CI/CD or automated scripts, use the `-y` or `--yes` flag:
```bash
npx @1zuku/jui init -y
npx @1zuku/jui init -f next -y
npx @1zuku/jui init -f vite -y
```

### 2. Add Component Primitives

Add individual or multiple components:

```bash
# Add a single component
npx @1zuku/jui add button

# Add multiple components at once
npx @1zuku/jui add button input card dialog toast avatar

# Add all 28 available primitives
npx @1zuku/jui add --all

# Overwrite existing component files
npx @1zuku/jui add button --overwrite
```

### 3. List Available Primitives

```bash
npx @1zuku/jui list
```

---

## 28 Component Primitives

JUI organizes 28 retro game UI primitives into 6 distinct RPG categories:

### 1. Vitality & HUD
- **PixelButton**: 3D beveled tactile game buttons with physical press feedback and audio synthesis.
- **PixelBadge**: Status pills for HP, MP, rarity tiers, and guild rankings.
- **PixelProgressBar**: Stepped retro health, mana, and experience vitality meters.
- **PixelAvatar**: Instant AvatarsInPixels chibi portraits rendered synchronously via vector SVG.
- **PixelSeparator**: Pixelated horizontal and vertical layout dividing rules.
- **PixelSkeleton**: Chunky 8-bit placeholder shimmer for async inventory fetching.

### 2. Actions & Inputs
- **PixelInput**: Retro inset monospace inputs for character naming and cheat codes.
- **PixelDropdownMenu**: Stepped action menus for character actions and inventory filtering.
- **PixelTooltip**: Equipment stat inspector popup for weapon and armor tooltips.
- **PixelPopover**: Interactive game overlays for dice rollers and mini stat inspectors.

### 3. Inventory & Modals
- **PixelDialog**: Modal window with stepped border framing for loot chests and NPC dialogues.
- **PixelDrawer**: Slide-over vault panel for character backpacks and quest logs.
- **PixelAlertDialog**: High-impact confirmation modal for permanent death or item dismantling.
- **PixelEmptyState**: Illustrative empty vault and backpack indicators.

### 4. Codex & Layout
- **PixelCard**: Structured retro parchment panels with bevel headers and footers.
- **PixelTabs**: Inventory category tab strip (Weapons, Armor, Consumables, Spells).
- **PixelAccordion**: Collapsible quest logs and monster bestiary codex.
- **PixelCollapsible**: Lightweight disclosure widgets for skill trees and lore notes.

### 5. Alerts & Feedback
- **PixelAlert**: Persistent combat hazard and debuff status banners.
- **PixelToast**: Stacking loot notification popups with audio fanfare.
- **PixelSpinner**: Pixelated rotating hourglass loader for matchmaking and saving.

### 6. Navigation & Systems
- **PixelBreadcrumb**: Dungeon floor and world travel breadcrumb trail.
- **PixelPagination**: Multi-page inventory and leaderboard navigation.
- **PixelNavbar**: Game navigation bar with responsive mobile menu drawer.
- **PixelSidebar**: Collapsible dungeon menu navigation sidebar.
- **PixelCommandPalette**: Fast-travel keyboard search palette (Cmd+K).
- **PixelTable**: Sortable high-score leaderboard with responsive scroll wrapper.
- **PixelCalendar**: Daily quest tracker and server event calendar.

---

## Instant SVG Avatars (`PixelAvatar`)

`PixelAvatar` uses the AvatarsInPixels design model to render retro 8-bit chibi character portraits synchronously via pure vector SVG:

```tsx
import { PixelAvatar } from "@/components/pixel/avatar";

// Synchronous vector rendering - zero loading delay or background flash
<PixelAvatar
  name="ShadowKnight"
  avatarType="humanoid"
  skinTone="#f8d8b8"
  hairColor="#2c1a0e"
  accessory="glasses"
  size="lg"
/>
```

- **Zero Flash**: Inlines SVG paths directly into initial SSR/HTML markup.
- **Deterministic**: Passing the same name or seed yields an identical character portrait every time.
- **Fallback Resilience**: Passing `src="https://..."` attempts image loading with instant vector fallback if the image is unavailable.

---

## Procedural Sound Engine (`lib/sound.ts`)

JUI includes a built-in Web Audio API sound synthesizer:

```tsx
import { soundManager } from "@/lib/sound";

// Play standard retro sounds
soundManager.play("click");
soundManager.play("fanfare");
soundManager.play("alert");

// Toggle sound globally
soundManager.enabled = false;
```

Zero MP3 or WAV assets are downloaded over the network. Waveforms are generated in real-time using square and triangle oscillators.

---

## Jev AI Decision Layer (System One AI)

JUI features a native **System One decision pipeline** powered by TypeSafe AI's **Jev** model (`typesafe/jev-1.13` via OpenRouter Decisions API). Instead of hardcoding UI logic with `if/else` checks, Jev evaluates gameplay event signals to dynamically pick and render the ideal pixel component in under 350ms.

### Integrated Feedback Components

| Decision Key | Component | Role | Use Cases |
| :--- | :--- | :--- | :--- |
| `toast` | **`PixelToast`** | Ambient, non-blocking auto-dismissing toast | Minor loot drops, XP gains, small stat ticks |
| `alert` | **`PixelAlert`** | Persistent inline tactical banner | Poison damage ticks, hazard warnings, broken gear |
| `dialog` | **`PixelDialog`** | Modal blocking dialogue requiring confirmation | Boss defeats, level completions, story milestones |

- **Confidence Smoothing**: Managed by `useDecisionSmoothing` (`lib/decide.ts`). Commits immediately on >= 85% confidence, verifies moderate confidence over a sliding window, and safely falls back on low confidence (< 60%) to prevent screen flicker or accidental focus trapping.
- **Full Architecture & API Reference**: See [`docs/jev-decision-layer.md`](./docs/jev-decision-layer.md).

---

## Design Tokens & Earthy Palette

| Token | Hex Value | Semantic Role |
| :--- | :--- | :--- |
| `--cream` | `#FFF8F0` | Warm parchment canvas, card backgrounds, light text in dark mode |
| `--caramel` | `#C08552` | Warm amber accent, active buttons, focus rings, primary highlights |
| `--cinnamon` | `#8C5A3C` | Bevel depth shadow, secondary borders, earthy muted text |
| `--espresso` | `#4B2E2B` | Deep contrast contours, crisp pixel text, dark button borders |

---

## Project Structure

```
jui/
├── app/                    # Next.js App Router
│   ├── docs/               # Full documentation page (/docs)
│   │   └── component/      # Interactive 28-component codex (/docs/component)
│   ├── api/                # Decision API route (/api/pixel-intent)
│   ├── layout.tsx          # Root HTML layout and fonts
│   └── page.tsx            # Landing showcase & demo
├── bin/                    # Standalone CLI executable (jui.mjs)
├── components/
│   ├── pixel/              # 28 2D Pixel Game UI primitives
│   ├── sections/           # Landing page sections (header, hero, showcase)
│   └── ui/                 # Accessible base primitives
├── docs/                   # Architecture decision records & domain docs
│   ├── adr/                # Architectural Decision Records
│   ├── agents/             # Agent domain documentation
│   └── jev-decision-layer.md # Jev AI model specifications
├── lib/                    # Sound synthesis, Jev client, utils
├── tests/                  # CLI and decision engine test suites
└── public/                 # Static assets and favicons
```

---

## Development & Testing

```bash
# Run unit and CLI tests
bun test

# Run production build
bun run build

# Run linter
bun run lint
```

---

## License

MIT License. Free for personal, commercial, and indie game projects.
