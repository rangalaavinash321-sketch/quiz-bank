---
name: Luminous Study
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#712ae2'
  on-secondary: '#ffffff'
  secondary-container: '#8a4cfc'
  on-secondary-container: '#fffbff'
  tertiary: '#005e6e'
  on-tertiary: '#ffffff'
  tertiary-container: '#00788c'
  on-tertiary-container: '#d7f6ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#eaddff'
  secondary-fixed-dim: '#d2bbff'
  on-secondary-fixed: '#25005a'
  on-secondary-fixed-variant: '#5a00c6'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system targets ambitious learners, students, and educators engaging in high-velocity practice, assessment, and knowledge mastery. The interface evokes feelings of cognitive clarity, momentum, focus, and academic triumph. 

The aesthetic is Modern Glassmorphic: deep atmospheric blue-to-violet linear backgrounds juxtaposed with translucent frosted glass planes, luminous glowing edges, and high-legibility typography. Translucent white surfaces allow rich multidimensional backdrops to diffuse through, conveying lightness, precision, and modern technological refinement without compromising cognitive ergonomics or prolonged study stamina.

## Colors

The palette balances energetic academic authority with clean focus:

- **Primary (`#2563EB`)**: Electric Royal Blue. Powers high-priority interactive touchpoints, active quiz progression bars, and foundational selection states.
- **Secondary (`#7C3AED`)**: Vivid Violet. Applied to streak counters, achievement badges, mastery indicators, and gradient transitions paired with the primary hue.
- **Tertiary (`#06B6D4`)**: Luminous Cyan. Used sparingly for real-time accuracy bursts, speed bonuses, and high-frequency analytical charts.
- **Neutral (`#0F172A`)**: Deep Slate Obsidian. Powers high-contrast headline reading and contextual structure across light-tinted frosted layers.

### Surfaces & Gradients
- **Canvas Base**: Soft ambient gradient blending `#F8FAFC`, `#EFF6FF` (tinted blue at 30%), and `#F5F3FF` (tinted violet at 30%) with a 135-degree sweep.
- **Glass Panel Surface**: `rgba(255, 255, 255, 0.72)` with an overlay border of `rgba(255, 255, 255, 0.85)` for top edges and `rgba(226, 232, 240, 0.5)` for bottom edges.
- **Active Accent Gradient**: Linear `135deg, #2563EB 0%, #7C3AED 100%`.

## Typography

The typographic hierarchy couples **Plus Jakarta Sans** for expressive, geometric headers and distinct gamified cues with **Inter** for sustained readability in question stems, code snippets, and rationales.

- **Question Stems**: Rendered exclusively in `headline-sm` or `body-lg` to reduce eye strain during rapid-fire testing sessions.
- **Labels & Badges**: Set in `label-sm` or `label-md` with slight tracking expansions to maintain legibility when placed over saturated gradient fills or blurred glass backings.
- **Numerical Stats & Timers**: Utilize tabular numeric variants (`tnum`) in Plus Jakarta Sans to prevent layout jitter during countdown scenarios.

## Layout & Spacing

The design system operates on an 8pt structural rhythm within a 12-column responsive grid:

- **Desktop (1024px+)**: 12 columns, `margin: 2rem` (capped at 1280px max-width for study viewports), `gutter: 1.5rem`. Question practice layouts utilize an asymmetric 8:4 split (quiz stage to real-time telemetry sidebar).
- **Tablet (768px – 1023px)**: 8 columns, `margin: 1.5rem`, `gutter: 1rem`. Sidebars fold into collapsible overlay sheets.
- **Mobile (< 768px)**: 4 columns, `margin-sm: 1rem`, `gutter-sm: 1rem`. Quiz options transition into vertical stacked blocks with bottom-anchored interaction trays.
- **Spacing Principle**: Dense card interiors leverage `space-md` to preserve information density, while macro sections breathe with `space-xl` to lower cognitive load between distinct question modules.

## Elevation & Depth

Depth is established via modern glassmorphism, multi-layer ambient shadows, and specular boundary strokes:

- **Base Canvas**: Ambient background containing soft, non-distracting radial blurs of `#2563EB` (opacity 12%) and `#7C3AED` (opacity 10%) anchored at opposing corners.
- **Level 1 (Question & Content Cards)**: Frosted surface (`rgba(255, 255, 255, 0.75)` with `backdrop-filter: blur(16px)`), framed by a 1px boundary stroke (`rgba(255, 255, 255, 0.6)` on top transitioning to `rgba(226, 232, 240, 0.4)` on bottom). Shadow: `0 10px 25px -5px rgba(37, 99, 235, 0.06), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`.
- **Level 2 (Active Modals & Flying Panels)**: `rgba(255, 255, 255, 0.88)` with `backdrop-filter: blur(24px)`. Shadow: `0 20px 30px -10px rgba(124, 58, 237, 0.12), 0 1px 3px rgba(15, 23, 42, 0.05)`.
- **Level 3 (Focused & Correct States)**: Dynamic glow using colored shadows. Correct answer feedback gains an ambient rim: `0 0 20px 2px rgba(37, 99, 235, 0.25)`.

## Shapes

The design system implements balanced rounded corners to reinforce a modern, tactile, and friendly learning atmosphere. 

- **Containers & Question Cards**: Apply standard roundedness (`1rem` / `rounded-lg`).
- **Interactive Option Tiles**: Maintain `0.75rem` rounding to balance clickability with crisp vertical alignment.
- **Badges, Score Trackers, & Action Pills**: Utilize full capsules (`9999px`) to distinguish meta-information from primary content structures.

## Components

### Buttons
- **Primary Hero**: Linear gradient fill (`#2563EB` to `#7C3AED`), white bold text, subtle inner top specular highlight (`inset 0 1px 1px rgba(255, 255, 255, 0.35)`). Active state applies a slight scale down (`scale(0.98)`).
- **Secondary Glass**: `rgba(255, 255, 255, 0.8)` background, 1px border (`#E2E8F0`), text in `#1D4ED8`. Hover shifts background to pure white with a violet-tinted ambient shadow.

### Option Cards (Multiple Choice)
- Glass-backed list items (`rgba(255, 255, 255, 0.65)`), 1px neutral border.
- **Hover**: Border transitions to `#2563EB` at 50% opacity, surface shifts to crisp white.
- **Selected**: Gradient rim (`#2563EB` to `#7C3AED`), subtle primary-tint background (`rgba(37, 99, 235, 0.05)`), with an elevated soft glow.
- **Correct State**: Border shifts to Emerald (`#10B981`), surface gains `rgba(16, 185, 129, 0.08)`.
- **Incorrect State**: Border shifts to Rose (`#F43F5E`), surface gains `rgba(244, 63, 94, 0.08)`.

### Badges & Chips
- Vibrant pill badges featuring frosted semi-transparency. 
- Category and topic chips use light violet backdrops (`rgba(124, 58, 237, 0.1)`) with `#6D28D9` bold text. Streak badges use a micro-gradient with white text and an amber glow.

### Progress & Telemetry Bars
- Track: Translucent slate (`rgba(226, 232, 240, 0.6)`), 8px height, capsule-rounded.
- Fill: Dual-gradient (`#2563EB` to `#7C3AED`) with smooth CSS cubic-bezier transitions on value changes.

### Input Fields
- Crisp translucent base (`rgba(255, 255, 255, 0.9)`), 1px border (`#CBD5E1`).
- Focus state activates a 2px outer ring in glowing `#2563EB` with an ambient glow blur of 8px (`rgba(37, 99, 235, 0.2)`).

### Question Bank Filter Drawers
- Vertical navigation panel styled with a frosted blur (`backdrop-filter: blur(20px)`), nested accordion tags, and micro-checkboxes highlighted in `#2563EB`.