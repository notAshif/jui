# Jev System One Decision Layer for Dynamic Pixel Component Selection

We decided to use TypeSafe AI's Jev model (System One choice/score architecture with no free-text generation) alongside a confidence-smoothing state machine and an offline keyword mock to dynamically determine pixel UI component selection (`PixelToast` vs `PixelDialog` vs `PixelAlert`) for incoming game events.

### Context & Trade-offs
1. **Decision Boundaries Over Monolithic Choice**: Rather than passing open-ended context to an LLM or running one giant classification query, we decompose decisions into scoped, non-overlapping pickers (Feedback, Progress Display, Interaction Container). This ensures sub-50ms latency, high classification accuracy, and predictable token costs.
2. **Confidence-Smoothing State Machine**: Direct live model responses can produce visual jitter or unwanted modal interruptions during rapid game events. The state machine requires >0.85 confidence on single calls or 2 identical successive choices within a 1000ms window before committing a component swap.
3. **Safe Default Fallbacks**: If model confidence drops below 0.60, the system falls back to a non-intrusive safe default (`PixelToast`) rather than guessing or accidentally trapping player focus with a modal dialog.
4. **Deterministic Offline Mock**: To enable hermetic unit testing and full offline functionality when API keys are absent, an offline classifier implements the identical schema and return shape as the live Jev API.
