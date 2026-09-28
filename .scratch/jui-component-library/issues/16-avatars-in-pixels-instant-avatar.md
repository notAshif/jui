# 16: Avatars In Pixels Instant Synchronous Avatar Engine

**What to build:** An AvatarsInPixels-inspired (https://www.avatarsinpixels.com/) chibi pixel character generator that renders 100% synchronously via SVG. Eliminates the page-reload background color flash bug by bypassing HTML Canvas and async client-side `useEffect` delay. Provides deterministic seed hashing so SSR and client hydration are byte-for-byte identical.

**Blocked by:** 06 (Avatar Primitive)

**Status:** resolved

- [x] Build pure TypeScript SVG pixel character generator in `lib/avatar-generator.ts` with 20x20 crisp grid.
- [x] Implement distinctive chibi dollmaker traits: dark espresso outlines, expressive catchlight sparkle eyes, cheek blush, customizable hairstyles (spiky, bob, pigtails, wizard hat, side-part, wavy, cowl), adventurer/knight/mage outfits, and accessories.
- [x] Implement deterministic PRNG seeded by string (`seed || fallback || alt`) for instant synchronous SSR + hydration matching.
- [x] Update `PixelAvatar` (`components/pixel/avatar.tsx`) to render synchronous SVG instantly with zero background flash on refresh.
- [x] Update `Avatar` (`components/ui/avatar.tsx`) for synchronous fallback rendering.
- [x] Provide backward-compatible exports (`generateRandomAvatar`, `generate8BitAvatar`, `generate16BitAvatar`).

## Comments
Resolved and verified:
- Pure synchronous vector SVG rendering in `lib/avatar-generator.ts` using `renderPixelAvatarSvgElement`.
- Chibi dollmaker character features: catchlight reflections in eyes, rosy blush, outfits (adventurer, knight, mage, rogue), modular hair, accessories.
- Zero canvas delay and zero background color flash on page refresh.
- Updated `components/pixel/avatar.tsx` and `components/ui/avatar.tsx`.
- Rebuilt registry and verified with 17 unit tests passing.
