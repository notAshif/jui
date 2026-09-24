# Discrete Namespaces For Component Flavors

We decided to structure Modern Components and Pixel Components into distinct directories (`components/ui` and `components/pixel`) while sharing headless primitives and TypeScript prop definitions, rather than a single component with a runtime flavor prop. This keeps application bundles lean by ensuring game dev applications do not bundle unused SaaS CSS and vice-versa, while maintaining a predictable, uniform API contract across both styles.
