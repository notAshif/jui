# 13: Landing Page, Showcase Shell & Global Retro Theme Switcher

**What to build:** The complete JUI landing page featuring a dashed-border header, custom dual-faced SVG logo, menu items array (`Home`, `Docs`, `Components`), GitHub link, Star button, and Theme Toggler SVG button converting the page into 2D pixel mode. Includes a high-impact Hero with CLI widget, a live Component Showcase featuring Tier 1 primitives in both Modern and Pixel flavors, and a clean single-line footer ("Built by Asif. The source code is available on GitHub."). Built adhering to `vercel-react-best-practices`, `better-ui`, `better-accessibility`, and `better-layout`.

**Blocked by:** 01 (Foundation Tokens), 02 (Button), 05 (Card & Separator)

**Status:** ready-for-agent

- [ ] Create custom JUI SVG Logo (dual modern curve + 8-bit pixel 'J' monogram in `#C08552` and `#4B2E2B`).
- [ ] Build Header with dashed border (`border-b border-dashed`), menu items array (`Home`, `Docs`, `Components`), GitHub icon link, Star button, and custom Theme Toggler SVG button.
- [ ] Implement global Theme Toggler converting the entire page between Modern SaaS and 16-bit 2D Pixel aesthetics (with transition suppression during swap).
- [ ] Build Hero section with headline, badge, copyable CLI installation command widget, dual action buttons, and interactive preview comparison.
- [ ] Build Component Showcase section displaying interactive Tier 1 primitives (Button, Input, Badge, Card, Separator, Avatar) with live Modern vs Pixel toggles.
- [ ] Build single-line Footer: "Built by Asif. The source code is available on GitHub." with verified accessible links.
- [ ] Adhere to `vercel-react-best-practices` (hoisted static SVGs, no waterfalls, optimal client/server boundaries) and `better-*` standards (keyboard navigation, focus rings, optical alignment).
