# 17: Site-Wide Responsiveness & Mobile/Tablet Menu Drawer Sidebar

**What to build:** Ensure all pages and components are fully responsive across mobile (320px - 640px) and tablet/mid-range (641px - 1024px) viewports. Add a retro pixel mobile menu drawer sidebar in `Header` to navigate Home, Docs, Components (all 28 primitives), GitHub, theme switcher, and direct category jumps. Audit and resolve mobile overflow in tables, dialogs, drawers, and card grids.

**Blocked by:** None

**Status:** resolved

- [x] Add mobile hamburger toggle button to `Header` (`components/sections/header.tsx`) for `< md` / `< lg` screens.
- [x] Implement responsive Pixel slide-over menu drawer with links to Home, Docs, Components, GitHub, Theme toggle, and 7 component category shortcuts.
- [x] Enhance mobile sidebar navigation on `app/docs/component/page.tsx` with smooth drawer overlay instead of layout pushing.
- [x] Update `PixelNavbar` and `Navbar` with built-in responsive mobile drawer menu.
- [x] Audit and refine responsiveness across components (`PixelTable` horizontal scroll, `PixelDialog` max width, card grids).

## Comments
Resolved and verified:
- Mobile hamburger and slide-over menu drawer in `components/sections/header.tsx` with full navigation and category jumping.
- Mobile drawer overlay in `app/docs/component/page.tsx` with instant close on jump.
- `PixelNavbar` and `Navbar` support mobile toggle with touch targets >= 44px.
- Build verified with zero errors.
