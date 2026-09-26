# JUI - Dual-Aesthetic Component Library

A versatile React component library that provides two distinct visual aesthetics: clean modern SaaS primitives and tactile 2D pixel-art game UI primitives. Built with Next.js, React 19, and Tailwind CSS 4.

## Overview

JUI delivers a unique dual-flavor component system designed for both modern web applications and retro game interfaces. Each component is available in two flavors:

- **Modern Components**: Clean, minimal, product-oriented visual style for SaaS and modern web applications
- **Pixel Components**: Retro 8-bit/16-bit visual style with chunky pixel borders, retro typography, and tactile press feedback for game developers and retro web applications

## Architecture

```excalidraw
┌─────────────────────────────────────────────────────────────┐
│                      JUI Component Library                   │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              │                               │
              ▼                               ▼
┌───────────────────────┐         ┌───────────────────────┐
│   Modern Components   │         │   Pixel Components   │
│                       │         │                       │
│ - Clean SaaS style    │         │ - Retro 8-bit style  │
│ - Geist typography    │         │ - Pixel typography   │
│ - Modern aesthetics   │         │ - Chunky borders     │
└───────────────────────┘         └───────────────────────┘
              │                               │
              └───────────────┬───────────────┘
                              │
                              ▼
              ┌───────────────────────┐
              │   Base Components     │
              │                       │
              │ - Headless primitives  │
              │ - Accessibility logic │
              │ - State management    │
              └───────────────────────┘
```

## Key Features

- **Dual Flavor System**: Seamless switching between modern and pixel aesthetics
- **Theme Toggler**: Interactive control to metamorphose the entire website between styles
- **Earthy Palette**: Warm color scheme with cream background, caramel accents, cinnamon shadows, and espresso text
- **Component Registry**: Direct source code distribution via copy-paste or CLI
- **Accessibility**: Built-in ARIA roles, keyboard interactions, and focus management
- **TypeScript**: Full type safety across all components

## Tech Stack

- **React 19**: Latest React features and performance improvements
- **Next.js 16**: Modern React framework with App Router
- **Tailwind CSS 4**: Utility-first CSS framework
- **TypeScript 5**: Type-safe development
- **Geist Font**: Modern variable font family
- **Lucide React**: Icon library
- **PixelArt Icons**: Pixel-art icon set for retro components

## Component Categories

### Base Components
Headless primitives providing unstyled, accessible behavioral logic:
- Avatar, Badge, Button, Card, Separator

### UI Components (Modern)
Clean, minimal components for modern applications:
- Accordion, Alert, AlertDialog, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Collapsible, Command Palette, Dialog, Drawer, Dropdown Menu, Empty State, Input, Navbar, Pagination, Popover, Progress Bar, Separator, Sidebar, Skeleton, Spinner, Table, Tabs, Toast, Tooltip

### Pixel Components
Retro-styled components for game and retro applications:
- Accordion, Alert, AlertDialog, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Collapsible, Command Palette, Dialog, Drawer, Dropdown Menu, Empty State, Input, Navbar, Pagination, Popover, Progress Bar, Separator, Sidebar, Skeleton, Spinner, Table, Tabs, Toast, Tooltip

## Getting Started

First, run the development server:

```bash
bun dev
# or
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the landing showcase.

## Project Structure

```
jui/
├── app/                    # Next.js app directory
│   ├── components-demo/    # Component demonstrations
│   └── docs/               # Documentation pages
├── components/
│   ├── base/              # Headless primitives
│   ├── ui/                # Modern components
│   ├── pixel/             # Pixel components
│   └── sections/          # Landing page sections
├── lib/                   # Utility functions
└── public/               # Static assets
```

## Development

### Build

```bash
bun run build
# or
npm run build
```

### Lint

```bash
bun run lint
# or
npm run lint
```

## Design Philosophy

JUI follows a consistent terminology and design system:

- **Flavor**: Visual aesthetic category (modern or pixel)
- **Variant**: Visual intent within a flavor (primary, secondary, outline, ghost, destructive, link)
- **Headless Primitive**: Unstyled behavioral logic layer
- **Earthy Palette**: Core warm color scheme
- **Modern Typography**: Sleek variable sans-serif (Google Sans Flex)
- **Pixel Typography**: Crisp grid-aligned pixel fonts (Geist Pixel)

## License

Private project - All rights reserved
