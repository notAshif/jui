# Dedicated Pixel Namespace and Evolution From Dual Flavors

## Status
Superseded

## Context & Decision
Initially, JUI explored a dual-namespace model (`components/ui` and `components/pixel`) to support both SaaS modern and 2D pixel styles simultaneously. 

To eliminate developer ambiguity and deliver an uncompromising, authentic retro game development experience, we decided to streamline JUI strictly into a single **2D Pixel Game UI** component library. All public game primitives are located under `components/pixel/` with dedicated tactile bevel mechanics, Web Audio sound synthesis, and instant vector SVG avatars. Headless base behavioral primitives remain shared under `components/ui/` for accessible ARIA roles and keyboard interactions.
