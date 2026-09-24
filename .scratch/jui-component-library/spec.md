# Spec: JUI Component Library (Modern & Pixel Dual-Flavor Primitives)

## Problem Statement

Developers building web applications often face a false dichotomy: they either build standard enterprise SaaS applications with clean, minimalist UI components (like shadcn/ui), or they build games, gamified apps, or retro-themed experiences requiring custom, hand-coded 8-bit/16-bit pixel UI. Existing pixel CSS libraries (such as NES.css) are often unmaintained, lack modern React 19 composability, lack accessibility (ARIA compliance, keyboard focus trapping), and cannot be integrated smoothly alongside modern design systems. Furthermore, developers want direct ownership of their component source code rather than rigid, uncustomizable npm package dependencies.

## Solution

JUI is a shadcn-inspired component registry and interactive documentation platform that provides both **Modern Components** (for product and SaaS development) and **Pixel Components** (for game development and retro web experiences). Both flavors share consistent TypeScript prop contracts, accessible keyboard navigation, and form-handling semantics, while rendering distinct visual aesthetics via Tailwind CSS. Components are distributed via copy-paste/CLI source files, and the documentation application provides a dual-flavor playground and live theme switcher.

## User Stories

1. As a game developer, I want to use accessible Pixel Buttons with tactile press mechanics, so that my web game UI feels responsive, authentic, and retro without breaking screen readers or keyboard navigation.
2. As a SaaS developer, I want clean, modern Button primitives with primary, secondary, outline, ghost, destructive, and link variants, so that I can quickly construct sleek product interfaces.
3. As a developer, I want Buttons to handle loading states automatically, so that users cannot double-submit while an async action is pending.
4. As a developer, I want Input components with integrated error and helper text states in both Modern and Pixel flavors, so that form validation states are clearly communicated to users.
5. As a developer, I want Textarea components that support resizing and validation states, so that users can input multi-line content reliably.
6. As a developer, I want accessible Label components linked to form controls via IDs and ARIA attributes, so that screen reader users can navigate forms seamlessly.
7. As a developer, I want Badge primitives with status and tag variants in both flavors, so that I can highlight counts, statuses, and tags in lists and cards.
8. As a developer, I want Card containers with composed Header, Title, Description, Content, and Footer components, so that I can group related content and actions cleanly.
9. As a developer, I want horizontal and vertical Separator primitives, so that I can divide content sections clearly in both modern and retro layouts.
10. As a developer, I want Avatar components supporting image loading, fallbacks, and initials, so that user profiles are represented gracefully when images fail or load slowly.
11. As a developer, I want Checkbox controls with checked, unchecked, and indeterminate states, so that users can toggle binary options and multi-select sets.
12. As a developer, I want Radio Group controls supporting keyboard arrow navigation, so that users can select a single option from a mutually exclusive list.
13. As a developer, I want Switch/Toggle controls with smooth transition animations in Modern and instant stepped state transitions in Pixel, so that users can toggle settings with appropriate aesthetic feedback.
14. As a developer, I want Select dropdown controls with full keyboard navigation and focus management, so that users can pick from a list without relying on unstyled native browser selects.
15. As a developer, I want a Combobox primitive with search filtering and highlight navigation, so that users can search large lists and select values easily.
16. As a developer, I want a Slider control supporting numeric range inputs and step increments, so that game devs can adjust audio/settings and product devs can adjust numeric thresholds.
17. As a developer, I want an accessible Date Picker control with calendar popover navigation, so that users can select dates without formatting errors.
18. As a developer, I want a Form wrapper composition combining Label, Field, Error Message, and Helper Text, so that I can connect UI controls to form validation libraries effortlessly.
19. As a library consumer, I want to copy component source code directly into my project without unwanted external dependencies, so that I have 100% control over my code and styling.
20. As a visitor to the documentation site, I want to toggle between Modern and Pixel preview tabs on each component page, so that I can compare designs and copy the exact flavor I need.
21. As a visitor to the documentation site, I want to toggle the entire site's theme into 8-bit Game Mode, so that I can experience the complete retro game UI immersion.

## Implementation Decisions

### 1. Dual Flavor Component Architecture
- Components are organized into discrete namespaces (`ui` for Modern Components and `pixel` for Pixel Components).
- Both flavors share identical TypeScript prop contracts (e.g. `ButtonProps`, `InputProps`, `CardProps`) to guarantee zero cognitive friction when switching flavors.
- Headless logic and state management are shared underneath, ensuring all ARIA roles and keyboard interactions behave identically regardless of flavor.

### 2. Styling System & Visual Identity
- **Earthy Palette System**:
  - Light Mode (Parchment): 60% Cream base (`#FFF8F0`), Caramel accent (`#C08552`), Cinnamon shadow/depth (`#8C5A3C`), Deep Espresso text and outer pixel contours (`#4B2E2B`).
  - Dark Mode (Campfire): Deep charcoal-espresso base (`#140D0B`), warm dark surfaces (`#231715`), glowing amber-caramel highlights (`#E0A268`), and cream text (`#FFF8F0`).
  - Semantic Status Colors: Rustic terracotta-crimson (`#B84A39`) for destructive/error, earthy moss green (`#4F6D48`) for success, and warm amber ochre (`#D48B38`) for warnings.
- **Typography Tokens**:
  - Modern Components: Variable modern geometric sans typography (`Google Sans Flex` with clean sans fallbacks).
  - Pixel Components: Crisp grid-aligned pixel typography (`Geist Pixel` with un-aliased rendering and pixel webfont fallbacks).
- **Component Aesthetic Styles**:
  - **Modern Components**: Sleek, minimalist Tailwind CSS utilities, subtle border-radius tokens, clean focus rings, and smooth micro-transitions.
  - **Pixel Components**: Stepped 3D pixel bevel mechanics using pure CSS box-shadows (outer 2px/4px contour in `#4B2E2B`, top/left highlights in `#FFF8F0`/`#C08552`, bottom/right depth shadow in `#8C5A3C`), 0px border-radius, and a tactile 2px down-and-right translation on active press (`active:translate-x-0.5 active:translate-y-0.5`).

### 3. Headless Primitives & Form Controls
- Core primitives (Button, Input, Textarea, Label, Badge, Card, Separator, Avatar) are implemented directly with semantic HTML5 elements and Tailwind styling.
- Complex Tier 2 controls (Select, Combobox, Radio Group, Switch, Slider, Date Picker) utilize unstyled headless primitive engines (Base UI / Radix primitives) to guarantee keyboard trapping, outside-click detection, and ARIA tree compliance.
- Form compositions export unified `FormField`, `FormItem`, `FormLabel`, `FormControl`, and `FormMessage` components compatible with standard React state and form hooks.

### 4. Code Distribution & Registry
- Components are authored as standalone, copy-pasteable files that consumers can place into their project structure.
- A registry configuration maps component dependencies (e.g. `Card` requiring `Separator`, `Combobox` requiring `Popover` and `Input`).

### 5. Landing Page & Interactive Showcase Architecture
- **Header**:
  - Border: Subtle dashed border (`border-b border-dashed`) in modern mode, transforming to a stepped pixel divider in pixel mode.
  - Left: Custom JUI SVG Logo (dual-faced modern geometric curves on the left, stepped 8-bit pixels on the right in `#C08552` and `#4B2E2B`).
  - Center: Navigation menu array: `["Home", "Docs", "Components"]`.
  - Right:
    - GitHub logo link with hover state.
    - "Star on GitHub" CTA button.
    - Theme Toggler Button with custom SVG icon (modern sparkle morphing into 8-bit pixel star/gem) that toggles `[data-flavor="modern" | "pixel"]` on `<html>`, metamorphosing the entire page.
- **Hero Section**:
  - High-impact headline ("Dual-Aesthetic UI Primitives for Modern SaaS & 2D Game Dev").
  - Copyable CLI installation snippet (`npx jui add button`).
  - Dual CTAs: "Explore Components" and "View on GitHub".
  - Interactive hero preview card demonstrating live modern vs pixel toggle.
- **Component Showcase Section**:
  - Interactive grid displaying core Tier 1 primitives (Button, Input, Badge, Card, Separator, Avatar) rendered in both Modern and 2D Pixel flavors with interactive preview sandboxes.
- **Footer**:
  - Exactly one line text: "Built by Asif. The source code is available on GitHub." with GitHub link.

## Testing Decisions

### Good Test Principles
- Only test external behavior, user interactions, and accessibility contracts. Never test internal CSS class strings or implementation details.
- Verify that interactions (click, keyboard Enter/Space, Tab, Arrow navigation) update state, trigger callbacks, and reflect appropriate ARIA states (`aria-checked`, `aria-disabled`, `aria-expanded`).
- Verify disabled states prevent event firing and maintain proper disabled attributes across both flavors.

### Modules Tested
- **Tier 1 Primitives**: Button (all variants, sizes, disabled, loading spinner), Input/Textarea (value change, helper/error states), Label (associates with input ID), Badge, Card, Separator, Avatar (image load, fallback render).
- **Tier 2 Form Controls**: Checkbox, Radio Group, Switch, Select, Combobox, Slider, Date Picker, Form wrapper validation flow.

## Out of Scope

- Canvas/WebGL rendering engine integrations (e.g. PixiJS/Phaser canvas layers).
- Monolithic closed-source npm publishing.
- Mobile native (React Native) component ports.

## Further Notes

- All components are strictly TypeScript-first with explicit prop typing.
- Accessibility is treated as a first-class feature across both Modern and Pixel flavors.
