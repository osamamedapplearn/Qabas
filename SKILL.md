---
name: qabas-human-design
description: Guidelines and design system rules for Qabas brand to enforce human-crafted, non-generic AI aesthetics.
---

# Qabas Human-Crafted Design System

When generating UI components or web layouts for Qabas, strictly follow these human design principles:

1. **Imperfection & Tactile Feel:**
   - Avoid perfectly rigid geometry. Use subtle asymmetrical radii, fine border strokes, and hand-crafted glowing accents.
   - Use dynamic SVG paths with organic or hand-drawn filter textures (e.g., Wired.js or custom SVG noise filters) for primary buttons.

2. **Architectural Grid & Structure:**
   - Expose subtle grid lines (0.05 opacity) across dark backgrounds to give a technical, blueprint-like aesthetic.
   - Align elements to a clear typographic scale rather than floating components randomly.

3. **Kinetic Typography & Micro-interactions:**
   - Apply subtle ambient motion or CSS path glowing to Arabic text ("قبس") and main headings on hover or mouse move.
   - Animate state changes smoothly using custom easing curve (`cubic-bezier(0.16, 1, 0.3, 1)`).

4. **Typography & Contrast:**
   - Combine bold, modern Arabic typography with precise geometric English labels.
   - Maintain high contrast ratio for readability against neon dark themes.
