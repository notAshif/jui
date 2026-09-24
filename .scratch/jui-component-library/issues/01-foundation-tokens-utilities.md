# 01: Foundation Tokens, Typography & Utilities

**What to build:** The foundational styling tokens, typography configuration, and utility functions that power both Modern and Pixel component flavors. This includes configuring the Earthy color palette (60% cream `#FFF8F0`, caramel `#C08552`, cinnamon `#8C5A3C`, deep espresso `#4B2E2B`) and Campfire dark mode (`#140D0B`), defining CSS variables for `Google Sans Flex` (modern) and `Geist Pixel` (pixel with integer grid alignment and anti-aliasing disabling), establishing stepped 3D pixel bevel box-shadow utilities, and creating the `cn` class merger.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Configure Tailwind theme with Earthy palette tokens (`cream`, `caramel`, `cinnamon`, `espresso`, semantic terracotta/moss/ochre) in both light and dark mode.
- [ ] Configure typography variables `--font-modern` (Google Sans Flex with clean geometric fallbacks) and `--font-pixel` (Geist Pixel with crisp rendering rules).
- [ ] Add stepped 3D pixel bevel box-shadow utility classes for pixel borders, highlights, and inset pressed states.
- [ ] Export a reliable class-names merging utility (`cn`) supporting Tailwind class resolution.
