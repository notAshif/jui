# 15: Jev System One Decision Layer & Feedback Component Picker

**What to build:** An end-to-end Jev-powered component decision pipeline that dynamically selects between `PixelToast`, `PixelDialog`, and `PixelAlert` based on incoming game event signals. Includes question schemas (`lib/jev/pixelUIQuestions.ts`), deterministic offline mock classifier (`lib/jev/mock.ts`), confidence-smoothing state machine (`lib/decide.ts`), component registry mapping (`components/pixel/registry.tsx`), server-side API route (`app/api/pixel-intent/route.ts`), automated test suite (`tests/jev.test.ts`), and an interactive demo playground (`app/demo/pixel-intent/page.tsx`).

**Blocked by:** None

**Status:** resolved

- [x] Create question schema definitions in `lib/jev/pixelUIQuestions.ts` with strict TypeScript types for Jev questions, choices, and game event inputs.
- [x] Implement deterministic offline mock classifier in `lib/jev/mock.ts` with keyword/rule matching matching Jev's output contract.
- [x] Implement confidence-smoothing state machine in `lib/decide.ts` with >0.85 single-call commit, consecutive identical answer commit, safe default fallback (<0.60), and pending/committed states.
- [x] Implement component registry in `components/pixel/registry.tsx` mapping decision keys (`toast`, `dialog`, `alert`) to JUI pixel primitives (`PixelToast`, `PixelDialog`, `PixelAlert`).
- [x] Implement server-side Next.js route in `app/api/pixel-intent/route.ts` with TypeSafe AI System One caller, graceful offline mock fallback, and error handling.
- [x] Write unit & integration tests in `tests/jev.test.ts` covering mock classification, confidence smoothing transitions, threshold fallbacks, and registry rendering.
- [x] Build interactive demo playground in `app/demo/pixel-intent/page.tsx` with sample event triggers, live preview, and confidence telemetry.

## Comments
Jev decision layer fully implemented and verified:
- Strict typed schemas in `lib/jev/pixelUIQuestions.ts`
- Zero-latency deterministic offline mock in `lib/jev/mock.ts`
- State machine & React hook `useDecisionSmoothing` in `lib/decide.ts`
- Registry & dynamic feedback dispatcher `<DynamicPixelFeedback />` in `components/pixel/registry.tsx`
- Server-side route `app/api/pixel-intent/route.ts` supporting TypeSafe AI live calls with mock fallback
- 10 automated unit tests in `tests/jev.test.ts` passing (17/17 total across project)
- Interactive demo playground in `app/demo/pixel-intent/page.tsx` verified with 200 HTTP response and live telemetry
- Clean TypeScript check (`npx tsc --noEmit`) and 0 lint errors
