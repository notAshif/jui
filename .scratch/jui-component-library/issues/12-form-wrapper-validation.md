# 12: Form Wrapper & Validation Hook Composition

**What to build:** High-level form composition primitives: `<Form>`, `<FormField>`, `<FormItem>`, `<FormLabel>`, `<FormControl>`, `<FormDescription>`, and `<FormMessage>`. Connects UI form controls (Input, Textarea, Checkbox, Select, Switch, Slider) with form validation state and error rendering, automatically handling `aria-describedby` and `aria-invalid` bindings for accessibility.

**Blocked by:** 01 (Foundation Tokens), 03 (Input & Textarea), 04 (Label & Badge)

**Status:** ready-for-agent

- [ ] Implement compound Form components establishing context for field registration and validation states.
- [ ] Automatically bind input `id`, `aria-describedby`, and `aria-invalid` to the corresponding Label, Helper Text, and Error Message.
- [ ] Style Modern Form items with clean spacing and smooth error text animations.
- [ ] Style Pixel Form items with retro error callouts and pixelated warning badges.
- [ ] Provide interactive showcase preview with a complete sample registration/settings form demonstrating validation in both flavors.
