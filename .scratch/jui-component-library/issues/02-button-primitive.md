# 02: Button Primitive (Modern & Pixel Flavors)

**What to build:** The Button primitive in both Modern and Pixel flavors sharing an identical TypeScript prop interface (`ButtonProps`). Supports 6 variants (`primary`, `secondary`, `outline`, `ghost`, `destructive`, `link`), 3 sizes (`sm`, `md`, `lg`), loading spinner indicator state with click suppression, disabled state, and tactile active press mechanics (smooth micro-animation in Modern, 2px stepped translate-down and bevel-swap in Pixel).

**Blocked by:** 01 (Foundation Tokens, Typography & Utilities)

**Status:** ready-for-agent

- [ ] Implement Modern Button supporting primary, secondary, outline, ghost, destructive, and link variants with sm, md, lg sizes.
- [ ] Implement Pixel Button supporting identical variants and sizes with 3D stepped pixel bevels and tactile 2px click translation.
- [ ] Support loading state with inline spinner and automatic disabled click suppression.
- [ ] Support accessible focus rings, keyboard Enter/Space activation, and ARIA attributes across both flavors.
- [ ] Create interactive showcase demo showing all variants, sizes, and states for both flavors.
