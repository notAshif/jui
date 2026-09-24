# Registry Distribution Model Over Monolithic NPM Package

We decided to distribute JUI components via a CLI / copy-paste registry into consuming projects (`components/ui/` and `components/pixel/`) rather than publishing a monolithic npm library. This gives developers full ownership over component source code, zero black-box runtime dependencies, and seamless compatibility with custom Tailwind v4 tokens and theme modifications.
