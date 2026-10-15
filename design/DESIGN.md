# Portfolio Scrollytelling Design System

Polished, professional dark UI. Calm reveals, restrained motion, content first.
Carries over the current site look: slate background, emerald accent.

## Colors
| Role | Hex |
|---|---|
| Background | #0F172A (slate-900) |
| Background deep | #020617 (slate-950) |
| Surface / card | #1E293B (slate-800) |
| Border | #334155 (slate-700) |
| Text | #F1F5F9 |
| Muted text | #CBD5E1 |
| Accent (emerald) | #34D399 solid, used for highlighted words and the active progress dot |

## Typography
Inter. H1 56px/1.2, H2 32px/1.3, body 18px/1.6, labels 12px uppercase tracking-wide. Highlighted words (`<b>`) use solid emerald text.

## Shape and spacing
Radius 12px. 8px spacing grid. Thin 1px borders, flat surfaces.

## No gradients
No gradients anywhere: no gradient text, backgrounds, buttons, borders or glows. Solid colors only, one accent, subtle 1px borders. Keep it understated and human-made.

## Layout and motion
- Desktop: two columns. Text steps scroll on the left, the visual stays pinned on the right (sticky, 100svh).
- Mobile: stacked, no pinning, visual sits inline above each step.
- Slim progress rail on the right edge: one dot per chapter, active dot is emerald, labels on hover. Becomes a top progress bar on mobile.
- Starfield particles stay as the fixed backdrop.
- Motion: fades and small translates under 0.5s; inactive steps at 25% opacity. All motion off under prefers-reduced-motion.

## Chapters
1. Hello: name, role, tagline.
2. Person: hobbies (video games, camping, kayaking) and mentoring. Photos on the sticky panel.
3. Career: pinned timeline. Each step swaps the sticky card (company, role, period, stack).
4. Skills + AI: steps through Frontend, Backend, Cloud and DevOps, Testing, then "How I work with AI". Sticky panel shows tech logos, then an AI workflow diagram.
5. Contact: links and CV downloads.
