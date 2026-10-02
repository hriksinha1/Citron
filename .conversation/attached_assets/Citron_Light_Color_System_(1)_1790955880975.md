# Citron Light — Fintech Mobile Color System (Light Theme Only)

*Binance-inspired in color discipline, original in identity. Every contrast ratio below is computed from the listed HEX values (WCAG 2.x relative-luminance formula). Color-vision separation values are CIE76 ΔE computed from Machado (2009) full-severity protan/deutan simulation.*

## 0. Research Notes — What Is Verified vs. Inferred

| Type | Finding |
|---|---|
| **Visibly observed** | The live en-IN page (fetched today) is white-canvas-led with dense market tickers showing price and a signed % change per row; it shows a light/dark-capable asset set and a risk warning at the foot. The fetch returns content only, **no CSS values**, so no hex could be read off the live page. |
| **Third-party reports (unofficial)** | Design-system galleries describe Binance yellow as `#FCD535` / `#F0B90B`, trading green `#0ECB81`, red `#F6465D`, applied as text color on price direction, with filled green/red reserved for Buy/Sell buttons and tinted ~16% chips. **I could not verify these against an official Binance source**, so none is used here as an official value. |
| **Official Binance documentation** | I could not locate an official Binance page on the light-theme palette or on its color-vision/price-color preference during this session. I therefore make **no claim** about official hex values or about the exact accessibility feature set. |
| **Inferred principle** | One scarce warm accent carries the primary action; neutrals do structure; green/red are semantic and mostly text-level; borders are sparse. |
| **Original recommendation** | Everything below: a Citron accent, cool-ink neutrals, darker semantic text tokens, and a blue/vermilion color-vision-safe finance mode. |

## 1. Executive Color Philosophy

The principles carried over from the Binance light experience are: a **white canvas**, **deep ink text**, **one scarce accent** that owns the primary action, and **green/red used as meaning, not decoration** (mostly as text on a data row, not as card fills). Citron Light keeps those rules but swaps the identity: the accent is a lime-yellow *Citron* (`#CDE72F`) with ink labels instead of a Binance-style golden yellow, the neutrals are cool ink-blue, and semantic hues are tuned so their *text* tokens clear WCAG AA on their own tinted surfaces. The result should read as calm, high-trust and data-first: roughly 90% neutral, a thin accent, and semantic color only where a number or state has changed.

## 2. Color Strategy

- **Neutral-first hierarchy:** Five near-white steps (`neutral.0/25/50/100/200`) do the layering. Hierarchy comes from fill difference first, a hairline border second, shadow third.
- **Accent usage:** Citron fills exactly one thing per screen: the primary CTA (plus selected-state tints at 50/100). Never on text under 18px (use `content.brand`, `brand.800`, 6.77:1). Labels on Citron are always `neutral.900` (12.25:1); **never white on Citron**.
- **Semantic color usage:** Green/red/amber/blue appear as (a) text tokens at the 700 step, (b) 50-step chip/banner fills, (c) 600-step chart fills. They never fill whole cards or screens.
- **Data color usage:** Charts use ink for the primary line, a restrained second series, and direction colors only on candles/volume. Max 4 hues on any one chart.
- **Surface hierarchy:** Canvas white → subtle band `#FAFAFB` → inset/inputs `#F5F6F8` → disabled/chip `#EDEFF2`. Elevated sheets are white over a scrim.
- **Accessibility philosophy:** Text tokens are chosen first, from contrast; fills are derived after. Direction is never color-only: sign, arrow and label always accompany red/green. A one-tap color-vision mode swaps to blue/vermilion.

## 3. Primitive Color Palette

| Token | HEX | RGB | HSL | Purpose | Notes |
|---|---|---|---|---|---|
| `color.neutral.0` | #FFFFFF | 255, 255, 255 | 0, 0%, 100% | App canvas, cards, sheets | 1.00:1 on white |
| `color.neutral.25` | #FAFAFB | 250, 250, 251 | 240, 11%, 98% | Subtle section fill | 1.04:1 on white |
| `color.neutral.50` | #F5F6F8 | 245, 246, 248 | 220, 18%, 97% | Inputs, grouped/inset areas | 1.08:1 on white |
| `color.neutral.100` | #EDEFF2 | 237, 239, 242 | 216, 16%, 94% | Disabled fill, neutral chip, subtle border | 1.15:1 on white |
| `color.neutral.200` | #E1E4E9 | 225, 228, 233 | 217, 15%, 90% | Default border, divider | 1.27:1 on white |
| `color.neutral.300` | #CDD1D8 | 205, 209, 216 | 218, 12%, 83% | Table/grid line, pressed neutral | 1.53:1 on white |
| `color.neutral.400` | #7F8695 | 127, 134, 149 | 221, 9%, 54% | Input/control boundary (>=3:1), disabled text, inert icons | 3.65:1 on white |
| `color.neutral.500` | #636A78 | 99, 106, 120 | 220, 10%, 43% | Placeholder, tertiary text (>=4.5:1 on all light fills) | 5.44:1 on white |
| `color.neutral.600` | #4F5666 | 79, 86, 102 | 222, 13%, 35% | Secondary text, axis labels | 7.35:1 on white |
| `color.neutral.700` | #3A414E | 58, 65, 78 | 219, 15%, 27% | Strong secondary text, pressed ink | 10.26:1 on white |
| `color.neutral.800` | #2B313C | 43, 49, 60 | 219, 17%, 20% | Pressed state of ink actions | 13.07:1 on white |
| `color.neutral.900` | #181C24 | 24, 28, 36 | 220, 20%, 12% | Primary text, ink button, tooltip fill | 17.07:1 on white |
| `color.neutral.950` | #0D1017 | 13, 16, 23 | 222, 28%, 7% | Scrim base only | 19.03:1 on white |
| `color.brand.50` | #FBFDE8 | 251, 253, 232 | 66, 84%, 95% | Selected surface, brand tint | 1.03:1 on white |
| `color.brand.100` | #F4FAC2 | 244, 250, 194 | 66, 85%, 87% | Brand tint hover/selected-pressed | 1.09:1 on white |
| `color.brand.300` | #DDF05A | 221, 240, 90 | 68, 83%, 65% | Progress/active indicator | 1.26:1 on white |
| `color.brand.500` | #CDE72F | 205, 231, 47 | 68, 79%, 55% | Primary action fill (Citron) | 1.39:1 on white |
| `color.brand.600` | #AFC71F | 175, 199, 31 | 69, 73%, 45% | Primary action pressed | 1.91:1 on white |
| `color.brand.700` | #7F9210 | 127, 146, 16 | 69, 80%, 32% | Decorative accent graphics only (3.5:1) | 3.49:1 on white |
| `color.brand.800` | #55610A | 85, 97, 10 | 68, 81%, 21% | Brand text/icon on light surfaces | 6.77:1 on white |
| `color.positive.50` | #EAF8F1 | 234, 248, 241 | 150, 50%, 95% | Positive surface | 1.09:1 on white |
| `color.positive.100` | #CDEFDF | 205, 239, 223 | 152, 52%, 87% | Positive border | 1.23:1 on white |
| `color.positive.600` | #0E9A5C | 14, 154, 92 | 153, 83%, 33% | Chart fills/candles (non-text >=3:1) | 3.62:1 on white |
| `color.positive.700` | #0B7A4B | 11, 122, 75 | 155, 83%, 26% | Positive text, success action fill | 5.39:1 on white |
| `color.positive.800` | #095E3A | 9, 94, 58 | 155, 83%, 20% | Success action pressed | 7.85:1 on white |
| `color.negative.50` | #FDEEEF | 253, 238, 239 | 356, 79%, 96% | Negative surface | 1.13:1 on white |
| `color.negative.100` | #FAD3D6 | 250, 211, 214 | 355, 80%, 90% | Negative border | 1.37:1 on white |
| `color.negative.600` | #D92D43 | 217, 45, 67 | 352, 69%, 51% | Chart fills/candles, destructive fill | 4.77:1 on white |
| `color.negative.700` | #B4182C | 180, 24, 44 | 352, 76%, 40% | Negative text | 6.76:1 on white |
| `color.negative.800` | #8E1222 | 142, 18, 34 | 352, 78%, 31% | Destructive pressed | 9.29:1 on white |
| `color.warning.50` | #FFF5E0 | 255, 245, 224 | 41, 100%, 94% | Warning surface | 1.08:1 on white |
| `color.warning.100` | #FFE3A8 | 255, 227, 168 | 41, 100%, 83% | Warning border | 1.25:1 on white |
| `color.warning.600` | #B87400 | 184, 116, 0 | 38, 100%, 36% | Chart/MA line, warning icon | 3.79:1 on white |
| `color.warning.700` | #8F5A00 | 143, 90, 0 | 38, 100%, 28% | Warning text | 5.78:1 on white |
| `color.info.50` | #EBF3FF | 235, 243, 255 | 216, 100%, 96% | Info surface | 1.12:1 on white |
| `color.info.100` | #C9DEFF | 201, 222, 255 | 217, 100%, 89% | Info border | 1.37:1 on white |
| `color.info.600` | #2563D9 | 37, 99, 217 | 219, 71%, 50% | Info icon, focus ring, links | 5.43:1 on white |
| `color.info.700` | #1B49B8 | 27, 73, 184 | 222, 74%, 41% | Info text, pressed link | 7.80:1 on white |
| `color.cvd.positive` | #1649B0 | 22, 73, 176 | 220, 78%, 39% | Color-vision-safe positive (dark blue) | 8.03:1 on white |
| `color.cvd.positive.subtle` | #E6EDFB | 230, 237, 251 | 220, 72%, 94% | CVD positive surface | 1.18:1 on white |
| `color.cvd.negative` | #B83A0A | 184, 58, 10 | 17, 90%, 38% | Color-vision-safe negative text (vermilion) | 5.76:1 on white |
| `color.cvd.negative.fill` | #D9480F | 217, 72, 15 | 17, 87%, 45% | CVD negative chart fill | 4.30:1 on white |
| `color.cvd.negative.subtle` | #FDEDE5 | 253, 237, 229 | 20, 86%, 95% | CVD negative surface | 1.14:1 on white |
| `color.chart.violet.600` | #7C4DDB | 124, 77, 219 | 260, 66%, 58% | Third moving average / compare series | 5.33:1 on white |

Scales are deliberately sparse (only steps with a job). Missing steps are intentionally not defined.

## 4. Semantic Color Tokens

| Semantic Token | Primitive Reference | Final HEX | Usage | Avoid Using For |
|---|---|---|---|---|
| `background.primary` | `color.neutral.0` | #FFFFFF | App canvas | Chips, inputs |
| `background.secondary` | `color.neutral.25` | #FAFAFB | Subtle section bands | Cards on white needing borders |
| `background.tertiary` | `color.neutral.50` | #F5F6F8 | Grouped/inset areas, list headers | Text fields needing 3:1 edge |
| `background.elevated` | `color.neutral.0` | #FFFFFF | Cards, sheets, modals | Page canvas |
| `background.input` | `color.neutral.50` | #F5F6F8 | Text-field fill | Disabled fields |
| `background.selected` | `color.brand.50` | #FBFDE8 | Selected row/tile/segment | Success meaning |
| `background.disabled` | `color.neutral.100` | #EDEFF2 | Inactive controls | Read-only fields |
| `background.inverse` | `color.neutral.900` | #181C24 | Toasts, tooltips | Large page areas |
| `surface.default` | `color.neutral.0` | #FFFFFF | Default card | Alerts |
| `surface.subtle` | `color.neutral.25` | #FAFAFB | Nested block in a card | Standalone cards |
| `surface.elevated` | `color.neutral.0` | #FFFFFF | Bottom sheet, modal | Inline blocks |
| `surface.brand` | `color.brand.500` | #CDE72F | Hero CTA, key promo strip | Decorative fills |
| `surface.brand.subtle` | `color.brand.50` | #FBFDE8 | Brand-tinted callout | Warnings |
| `surface.success` | `color.positive.50` | #EAF8F1 | Success banner, status chip | Whole cards for gains |
| `surface.error` | `color.negative.50` | #FDEEEF | Error banner, failed chip | Whole screens for small losses |
| `surface.warning` | `color.warning.50` | #FFF5E0 | Pending/verification banner | Destructive confirmations |
| `surface.info` | `color.info.50` | #EBF3FF | Tip, system message | Marketing |
| `surface.neutral` | `color.neutral.100` | #EDEFF2 | Neutral chip | Cards |
| `content.primary` | `color.neutral.900` | #181C24 | Body, headings, balances | Disabled state |
| `content.secondary` | `color.neutral.600` | #4F5666 | Labels, captions | Primary figures |
| `content.tertiary` | `color.neutral.500` | #636A78 | Meta, timestamps, helper text | Critical info |
| `content.placeholder` | `color.neutral.500` | #636A78 | Input placeholder | Entered values |
| `content.disabled` | `color.neutral.400` | #7F8695 | Inactive text (exempt, see section 10) | Any live content |
| `content.inverse` | `color.neutral.0` | #FFFFFF | Text on inverse/ink fills | Light surfaces |
| `content.brand` | `color.brand.800` | #55610A | Brand text/icon on light | Body text |
| `content.on-brand` | `color.neutral.900` | #181C24 | Text/icon on brand fill | White text on citron |
| `content.success` | `color.positive.700` | #0B7A4B | Success text/icon | Gain figures (use financial.positive) |
| `content.error` | `color.negative.700` | #B4182C | Error text/icon | Price drops (use financial.negative) |
| `content.warning` | `color.warning.700` | #8F5A00 | Warning text/icon | Errors |
| `content.info` | `color.info.700` | #1B49B8 | Info text/icon | Links in dense tables |
| `content.link` | `color.info.600` | #2563D9 | Inline links | Buttons |
| `border.subtle` | `color.neutral.100` | #EDEFF2 | Hairline inside cards | Input edges |
| `border.default` | `color.neutral.200` | #E1E4E9 | Card edge, divider-adjacent | Inputs needing 3:1 |
| `border.strong` | `color.neutral.300` | #CDD1D8 | Emphasised separators | Input edges |
| `border.input` | `color.neutral.400` | #7F8695 | Text field/checkbox/radio edge (3.65:1 on white) | Decorative dividers |
| `border.focus` | `color.info.600` | #2563D9 | Keyboard/switch focus ring | Selected state |
| `border.selected` | `color.neutral.900` | #181C24 | Selected tile/segment edge | Focus ring |
| `border.success` | `color.positive.100` | #CDEFDF | Success banner edge | Input validation (use positive.700) |
| `border.error` | `color.negative.600` | #D92D43 | Invalid input edge | Warnings |
| `border.warning` | `color.warning.600` | #B87400 | Warning edge | Errors |
| `border.info` | `color.info.100` | #C9DEFF | Info banner edge | Focus |
| `divider.default` | `color.neutral.200` | #E1E4E9 | List dividers | Card edges |
| `divider.grid` | `color.neutral.300` | #CDD1D8 | Table/grid lines | Chart grid (use chart.grid) |
| `action.primary.default` | `color.brand.500` | #CDE72F | Primary CTA fill | Secondary actions |
| `action.primary.pressed` | `color.brand.600` | #AFC71F | Primary CTA pressed | Hover-only cues |
| `action.primary.disabled` | `color.neutral.100` | #EDEFF2 | Primary CTA inactive | Read-only |
| `action.primary.content` | `color.neutral.900` | #181C24 | Label on primary CTA | White label |
| `action.secondary.default` | `color.neutral.0` | #FFFFFF | Secondary CTA fill (with border.input... ink border) | Primary CTA |
| `action.secondary.pressed` | `color.neutral.100` | #EDEFF2 | Secondary pressed | Disabled |
| `action.ink.default` | `color.neutral.900` | #181C24 | High-emphasis neutral CTA | Destructive |
| `action.ink.pressed` | `color.neutral.800` | #2B313C | Ink pressed | Primary CTA |
| `action.destructive.default` | `color.negative.600` | #D92D43 | Delete/sell-confirm fill | Warnings |
| `action.destructive.pressed` | `color.negative.800` | #8E1222 | Destructive pressed | Success |
| `action.success.default` | `color.positive.700` | #0B7A4B | Confirm buy/deposit | Brand emphasis |
| `action.success.pressed` | `color.positive.800` | #095E3A | Success pressed | Failure |
| `focus.default` | `color.info.600` | #2563D9 | Focus ring (3.0+:1 on white and brand) | Selected |
| `focus.error` | `color.negative.600` | #D92D43 | Focus on invalid field | Default focus |
| `focus.warning` | `color.warning.600` | #B87400 | Focus on warned field | Default focus |
| `focus.success` | `color.positive.600` | #0E9A5C | Focus on validated field | Default focus |

## 5. Financial Color Tokens

| Token | Primitive | HEX | Meaning | Companion cue (required) |
|---|---|---|---|---|
| `financial.positive` | `color.positive.700` | #0B7A4B | Gain figure/delta text | ▲ arrow + “+” sign |
| `financial.positive.subtle` | `color.positive.50` | #EAF8F1 | Delta chip fill | Chip behind delta |
| `financial.negative` | `color.negative.700` | #B4182C | Loss figure/delta text | ▼ arrow + “−” sign |
| `financial.negative.subtle` | `color.negative.50` | #FDEEEF | Delta chip fill | Chip behind delta |
| `financial.neutral` | `color.neutral.600` | #4F5666 | Unchanged/no-data figure | — dash or “0.00%” |
| `financial.neutral.subtle` | `color.neutral.100` | #EDEFF2 | Unchanged chip fill | Chip behind unchanged |
| `financial.warning` | `color.warning.700` | #8F5A00 | Pending/at-risk amount | Clock icon + “Pending” |
| `financial.warning.subtle` | `color.warning.50` | #FFF5E0 | Pending chip fill | Chip |
| `financial.info` | `color.info.700` | #1B49B8 | Estimates, indicative values | “≈ / Est.” prefix + info icon |
| `financial.info.subtle` | `color.info.50` | #EBF3FF | Info chip fill | Chip |

| Status token | HEX | Background token | HEX | Icon pairing |
|---|---|---|---|---|
| `status.success` | #0B7A4B | `status.success.background` | #EAF8F1 | check-circle |
| `status.warning` | #8F5A00 | `status.warning.background` | #FFF5E0 | clock / alert-triangle |
| `status.error` | #B4182C | `status.error.background` | #FDEEEF | x-circle |
| `status.info` | #1B49B8 | `status.info.background` | #EBF3FF | info |
| `status.neutral` | #4F5666 | `status.neutral.background` | #EDEFF2 | minus-circle |

## 6. Chart & Trading Palette

| Token | Value | Role |
|---|---|---|
| `chart.candle.bullish` | #0E9A5C | Bullish body/wick |
| `chart.candle.bearish` | #D92D43 | Bearish body/wick |
| `chart.text.bullish` | #0B7A4B | Up labels/last-price tag text |
| `chart.text.bearish` | #B4182C | Down labels |
| `chart.volume.positive` | rgba(14,154,92,0.28) | Volume up |
| `chart.volume.negative` | rgba(217,45,67,0.28) | Volume down |
| `chart.line.primary` | #181C24 | Main price line |
| `chart.line.secondary` | #2563D9 | Compare series 1 |
| `chart.line.benchmark` | #636A78 | Dashed index/benchmark |
| `chart.ma.short` | #B87400 | MA 7 |
| `chart.ma.mid` | #2563D9 | MA 25 |
| `chart.ma.long` | #7C4DDB | MA 99 |
| `chart.selection` | #F4FAC2 | Selected range fill |
| `chart.crosshair` | #3A414E | Crosshair line |
| `chart.grid` | #EDEFF2 | Gridlines |
| `chart.axis.label` | #4F5666 | Axis labels |
| `chart.tooltip.background` | #181C24 | Tooltip fill |
| `chart.tooltip.text` | #FFFFFF | Tooltip text |
| `chart.annotation` | #55610A | Annotation marker/label |
| `chart.forecast` | #636A78 | Dashed estimated data |
| `chart.nodata` | #CDD1D8 | Empty-state placeholder line |

Chart rules: bullish/bearish bodies use the **600** step (≥3:1 on white, graphic-object rule); any *text* showing direction uses the **700** step. Volume uses the same hues at 28% alpha so it never competes with candles. Max one dashed line (benchmark *or* forecast) per chart. Grid is `neutral.100`; axis text `neutral.600` (7.35:1).

Graphic-object contrast on `background.primary`:

| Foreground | Background | Ratio | Target / Result | Use |
|---|---|---|---|---|
| `chart.candle.bullish` (#0E9A5C) | `background.primary` (#FFFFFF) | 3.62:1 | ≥3 UI → **Pass** | Graphic object |
| `chart.candle.bearish` (#D92D43) | `background.primary` (#FFFFFF) | 4.77:1 | ≥3 UI → **Pass** | Graphic object |
| `chart.line.primary` (#181C24) | `background.primary` (#FFFFFF) | 17.07:1 | ≥3 UI → **Pass** | Graphic object |
| `chart.line.secondary` (#2563D9) | `background.primary` (#FFFFFF) | 5.43:1 | ≥3 UI → **Pass** | Graphic object |
| `chart.ma.short` (#B87400) | `background.primary` (#FFFFFF) | 3.79:1 | ≥3 UI → **Pass** | Graphic object |
| `chart.ma.long` (#7C4DDB) | `background.primary` (#FFFFFF) | 5.33:1 | ≥3 UI → **Pass** | Graphic object |
| `chart.annotation` (#55610A) | `background.primary` (#FFFFFF) | 6.77:1 | ≥3 UI → **Pass** | Graphic object |

**Color-vision-friendly alternative palette** (applies to `financial.*`, `status.success/error`, `chart.candle.*`, `chart.text.*`, `chart.volume.*` when the user turns on Color-vision mode):

| Token | Default | Color-vision mode |
|---|---|---|
| `financial.positive` / `chart.text.bullish` | #0B7A4B | #1649B0 (`color.cvd.positive`) |
| `financial.positive.subtle` | #EAF8F1 | #E6EDFB (`color.cvd.positive.subtle`) |
| `financial.negative` / `chart.text.bearish` | #B4182C | #B83A0A (`color.cvd.negative`) |
| `financial.negative.subtle` | #FDEEEF | #FDEDE5 (`color.cvd.negative.subtle`) |
| `chart.candle.bullish` | #0E9A5C | #1649B0 |
| `chart.candle.bearish` | #D92D43 | #D9480F (`color.cvd.negative.fill`) |
| `chart.volume.positive/negative` | 28% of default fills | rgba(22,73,176,0.28) / rgba(217,72,15,0.28) |
| `status.info` / `chart.line.secondary` / `chart.ma.mid` | #1B49B8 / #2563D9 | Move to violet `#7C4DDB` so blue stays exclusively “positive” in this mode |

## 7. State Colors

| State | Fill | Content | Border | Notes |
|---|---|---|---|---|
| Default (primary btn) | `action.primary.default` #CDE72F | `action.primary.content` #181C24 | none | Label 12.25:1 |
| Pressed | `action.primary.pressed` #AFC71F | `action.primary.content` | none | Solid step, **not** an opacity drop; label 8.95:1 |
| Selected | `background.selected` #FBFDE8 | `content.primary` | `border.selected` #181C24 | Border + tint, so it survives grayscale |
| Focused | unchanged | unchanged | `focus.default` #2563D9 ring (≥3:1) | Ring offset 2px in `background.primary` |
| Active (toggle on) | `action.ink.default` #181C24 | `content.inverse` | none | Used for tab/segment active |
| Disabled | `background.disabled` #EDEFF2 | `content.disabled` #7F8695 | none | WCAG exempts inactive controls; still 3.17:1 |
| Loading | keep default fill | `content.secondary` | none | Skeletons use `neutral.100` → `neutral.50` |
| Success | `surface.success` | `content.success` | `border.success` | Always with check icon |
| Error | `surface.error` | `content.error` | `border.error` #D92D43 | Always with x icon + message text |
| Warning | `surface.warning` | `content.warning` | `border.warning` #B87400 | Always with clock/triangle icon |
| Read-only | `background.tertiary` | `content.primary` | `border.subtle` | Keeps full-strength text so values stay legible; no input edge |
| Visited link | — | `info.700` #1B49B8 | — | Only for in-app article/help links |

## 8. Surface & Background Hierarchy

| Layer | Token | HEX | Typical use | Separation method |
|---|---|---|---|---|
| 0 Canvas | `background.primary` | #FFFFFF | Screen background | — |
| 1 Band | `background.secondary` | #FAFAFB | Section strip, list headers | Fill only |
| 2 Inset | `background.tertiary` / `background.input` | #F5F6F8 | Inputs, grouped tiles | Fill; inputs add `border.input` |
| 3 Chip / disabled | `surface.neutral` / `background.disabled` | #EDEFF2 | Chips, inactive | Fill |
| 4 Elevated | `surface.elevated` | #FFFFFF | Bottom sheet, modal | Scrim + shadow (shadow rgba(13,16,23,0.12)) |
| 5 Inverse | `background.inverse` | #181C24 | Toast, tooltip | Fill |

Use **fill contrast, not borders**, for cards on `background.secondary`; use a `border.default` hairline only for white cards on the white canvas, list rows (use dividers) and inputs.

## 9. Border & Divider System

| Token | HEX | Use |
|---|---|---|
| `border.subtle` | #EDEFF2 | Hairline inside cards |
| `border.default` | #E1E4E9 | Card edge, divider-adjacent |
| `border.strong` | #CDD1D8 | Emphasised separators |
| `border.input` | #7F8695 | Text field/checkbox/radio edge (3.65:1 on white) |
| `border.focus` | #2563D9 | Keyboard/switch focus ring |
| `border.selected` | #181C24 | Selected tile/segment edge |
| `border.success` | #CDEFDF | Success banner edge |
| `border.error` | #D92D43 | Invalid input edge |
| `border.warning` | #B87400 | Warning edge |
| `border.info` | #C9DEFF | Info banner edge |
| `divider.default` | #E1E4E9 | List dividers |
| `divider.grid` | #CDD1D8 | Table/grid lines |
| `chart.grid` | #EDEFF2 | Chart guide line |

## 10. Accessibility Validation

| Foreground | Background | Contrast Ratio | WCAG Target | Use |
|---|---|---|---|---|
| `content.primary` (#181C24) | `background.primary` (#FFFFFF) | 17.07:1 | ≥4.5 text → **AAA** | Body text, balances |
| `content.primary` (#181C24) | `background.tertiary` (#F5F6F8) | 15.78:1 | ≥4.5 text → **AAA** | Text on grouped areas |
| `content.secondary` (#4F5666) | `background.primary` (#FFFFFF) | 7.35:1 | ≥4.5 text → **AAA** | Secondary labels |
| `content.secondary` (#4F5666) | `background.tertiary` (#F5F6F8) | 6.80:1 | ≥4.5 text → **AA** | Labels on grouped areas |
| `content.tertiary` (#636A78) | `background.primary` (#FFFFFF) | 5.44:1 | ≥4.5 text → **AA** | Helper text, timestamps |
| `content.placeholder` (#636A78) | `background.input` (#F5F6F8) | 5.03:1 | ≥4.5 text → **AA** | Placeholder on input fill |
| `content.tertiary` (#636A78) | `surface.neutral` (#EDEFF2) | 4.72:1 | ≥4.5 text → **AA** | Meta text on neutral chip |
| `action.primary.content` (#181C24) | `action.primary.default` (#CDE72F) | 12.25:1 | ≥4.5 text → **AAA** | Primary button label |
| `action.primary.content` (#181C24) | `action.primary.pressed` (#AFC71F) | 8.95:1 | ≥4.5 text → **AAA** | Primary button label, pressed |
| `content.inverse` (#FFFFFF) | `action.ink.default` (#181C24) | 17.07:1 | ≥4.5 text → **AAA** | Ink button label |
| `content.inverse` (#FFFFFF) | `action.destructive.default` (#D92D43) | 4.77:1 | ≥4.5 text → **AA** | Destructive button label |
| `content.inverse` (#FFFFFF) | `action.success.default` (#0B7A4B) | 5.39:1 | ≥4.5 text → **AA** | Success button label |
| `content.inverse` (#FFFFFF) | `action.success.pressed` (#095E3A) | 7.85:1 | ≥4.5 text → **AAA** | Success button pressed |
| `content.inverse` (#FFFFFF) | `background.inverse` (#181C24) | 17.07:1 | ≥4.5 text → **AAA** | Toast/tooltip text |
| `content.brand` (#55610A) | `background.primary` (#FFFFFF) | 6.77:1 | ≥4.5 text → **AA** | Brand text on white |
| `content.brand` (#55610A) | `surface.brand.subtle` (#FBFDE8) | 6.55:1 | ≥4.5 text → **AA** | Brand text on tint |
| `content.success` (#0B7A4B) | `surface.success` (#EAF8F1) | 4.92:1 | ≥4.5 text → **AA** | Success banner text |
| `content.error` (#B4182C) | `surface.error` (#FDEEEF) | 6.00:1 | ≥4.5 text → **AA** | Error banner text |
| `content.warning` (#8F5A00) | `surface.warning` (#FFF5E0) | 5.34:1 | ≥4.5 text → **AA** | Warning banner text |
| `content.info` (#1B49B8) | `surface.info` (#EBF3FF) | 6.98:1 | ≥4.5 text → **AA** | Info banner text |
| `status.success` (#0B7A4B) | `status.success.background` (#EAF8F1) | 4.92:1 | ≥4.5 text → **AA** | Completed chip |
| `status.warning` (#8F5A00) | `status.warning.background` (#FFF5E0) | 5.34:1 | ≥4.5 text → **AA** | Pending chip |
| `status.error` (#B4182C) | `status.error.background` (#FDEEEF) | 6.00:1 | ≥4.5 text → **AA** | Failed chip |
| `status.info` (#1B49B8) | `status.info.background` (#EBF3FF) | 6.98:1 | ≥4.5 text → **AA** | Info chip |
| `status.neutral` (#4F5666) | `status.neutral.background` (#EDEFF2) | 6.38:1 | ≥4.5 text → **AA** | Inactive chip |
| `financial.positive` (#0B7A4B) | `background.primary` (#FFFFFF) | 5.39:1 | ≥4.5 text → **AA** | Gain figure on white |
| `financial.positive` (#0B7A4B) | `financial.positive.subtle` (#EAF8F1) | 4.92:1 | ≥4.5 text → **AA** | Delta chip |
| `financial.negative` (#B4182C) | `background.primary` (#FFFFFF) | 6.76:1 | ≥4.5 text → **AA** | Loss figure on white |
| `financial.negative` (#B4182C) | `financial.negative.subtle` (#FDEEEF) | 6.00:1 | ≥4.5 text → **AA** | Delta chip |
| `financial.neutral` (#4F5666) | `background.primary` (#FFFFFF) | 7.35:1 | ≥4.5 text → **AAA** | Unchanged figure |
| `content.link` (#2563D9) | `background.primary` (#FFFFFF) | 5.43:1 | ≥4.5 text → **AA** | Inline link |
| `focus.default` (#2563D9) | `background.primary` (#FFFFFF) | 5.43:1 | ≥3 UI/large → **AA** | Focus ring on white |
| `focus.default` (#2563D9) | `action.primary.default` (#CDE72F) | 3.90:1 | ≥3 UI/large → **AA (large text / UI 3:1)** | Focus ring adjacent to primary fill |
| `border.input` (#7F8695) | `background.primary` (#FFFFFF) | 3.65:1 | ≥3 UI/large → **AA (large text / UI 3:1)** | Input / checkbox edge |
| `border.input` (#7F8695) | `background.input` (#F5F6F8) | 3.38:1 | ≥3 UI/large → **AA (large text / UI 3:1)** | Input edge on fill |
| `border.error` (#D92D43) | `background.primary` (#FFFFFF) | 4.77:1 | ≥3 UI/large → **AA** | Invalid input edge |
| `action.primary.default` (#CDE72F) | `background.primary` (#FFFFFF) | 1.39:1 | ≥3 UI/large → **Fail** | Primary fill vs canvas (decorative; label carries identity) |
| `content.disabled` (#7F8695) | `background.disabled` (#EDEFF2) | 3.17:1 | ≥3 UI/large → **AA (large text / UI 3:1)** | Disabled label (exempt) |

**Documented non-passes**

- `action.primary.default` vs `background.primary` is 1.39:1. The button is identified by its 12.25:1 label, its position and its focus ring, so the fill is not relied on to define the component. Where a Citron button sits on pure white and must be distinguishable without its label (e.g. an icon-only variant), add a `neutral.900` 1.5px border.
- `content.disabled` on `background.disabled` is 3.17:1: WCAG exempts inactive components, and the lower contrast is the cue that the control is inert. Never use `content.disabled` for anything the user must read to proceed.
- `neutral.400` is **only** an edge/icon color; it must never carry text that is meant to be read.

## 11. Color-Vision Accessibility

| Pair | Normal vision ΔE | Protanopia ΔE | Deuteranopia ΔE |
|---|---|---|---|
| Default candle fills (#0E9A5C vs #D92D43) | 115 | 25 | 18 |
| Default text (#0B7A4B vs #B4182C) | 101 | 18 | 22 |
| Color-vision candle fills (#1649B0 vs #D9480F) | 123 | 106 | 124 |
| Color-vision text (#1649B0 vs #B83A0A) | 114 | 100 | 115 |

A ΔE below roughly 20–25 is hard to tell apart at small sizes. The default red/green pair collapses to about 18–25 under red-green deficiency, so it **cannot be trusted alone**; the blue/vermilion mode stays above 100.

- Never encode direction with color alone: every delta carries ▲/▼ and a +/− sign; every status carries an icon and a word.
- Candles: color-vision mode also supports hollow (bullish) vs filled (bearish) bodies as a user-selectable pattern cue.
- Provide a Settings → Appearance → *Price colors* switch: Default (green up / red down), Color-vision safe (blue up / vermilion down), and Reversed (red up / green down) for markets that use it.
- Avoid: green next to red with no gap or label; green vs brown/orange; blue vs purple at similar lightness; green text on Citron; red text on dark-green fills.
- Info blue is remapped to violet in color-vision mode so blue always means “positive” there.
- Test every screen in grayscale: if direction or status is lost, the cue is missing.

## 12. Usage Rules

- One Citron fill per screen. If two things compete, the second becomes `action.ink` or `action.secondary`.
- Semantic *text* uses the 700 step; semantic *fills* use the 50 step; semantic *graphics* use the 600 step. Never swap.
- Every green/red figure shows a sign. Chips pair `financial.*` text with the matching `.subtle` fill.
- Errors use `negative`; pending/verification uses `warning`; guidance uses `info`. Never red for non-errors.
- Pressed = next solid step, never a transparency drop; overlays only for scrims.
- Overlays: modal scrim `rgba(13,16,23,0.48)`; bottom-sheet scrim `rgba(13,16,23,0.40)`; tooltip fill `#181C24` at 96% (`rgba(24,28,36,0.96)`); toast fill solid `#181C24`. Use alpha only for scrims, volume bars and selection washes, where contrast with text is not required.
- Meaning → one token: a token is never reused for a different meaning.

## 13. Anti-Patterns

| Wrong | Why | Do instead |
|---|---|---|
| Whole portfolio card tinted green after a gain | Colors a surface, not a value; loud; fails the calm/high-trust goal | White card; green only on the delta text/chip |
| Red full-screen banner for a −0.3% move | Over-alarms; teaches users to ignore red | Neutral card; red delta chip with ▼ |
| Red for all warnings | Collapses pending vs failed | Warning amber for pending, red only for failed/blocked |
| Citron on every tappable element | Dilutes the primary action | Ink or outline for non-primary actions |
| White label on Citron button | 1.39:1 | `neutral.900` label (12.25:1) |
| `positive.600` for green text | 3.62:1 fails body-text AA | `positive.700` (5.39:1) |
| Placeholder in `neutral.400` | 3.65:1 on white, below 4.5:1 | `neutral.500` (5.44:1) |
| Green as a generic brand/success decoration | Weakens financial meaning | Reserve green for profit/success meaning only |
| Two accent systems (Citron + a second brand color) | Competing hierarchy | One accent + semantic set |

## 14. Mobile Fintech Application Examples

| Surface | Use | Avoid |
|---|---|---|
| Dashboard | `background.primary` canvas, `content.primary` balance, `financial.*` delta chip, one `action.primary` (Add money) | Tinted hero card, multiple Citron buttons |
| Portfolio | `surface.default`, `financial.positive/negative` per holding, `chart.*` | Row backgrounds colored by P&L |
| Wallet | `surface.default`, `content.secondary` labels, `action.primary` (Add) | Green for balances |
| Add money | `action.primary`, `border.input` fields, `surface.info` UPI hint | Red for amount limits unless exceeded |
| Withdraw money | `action.ink` confirm, `surface.warning` fee/limit notice | Citron confirm over a destructive step |
| Transfer | `action.primary`, `surface.info` recipient tips, `border.focus` on active field | Success green before completion |
| Payment | `action.success` only for final confirm, `status.warning` pending | Brand yellow for success |
| Transaction history | `divider.default`, `status.*` chips, `financial.*` amounts with ± | Colored row fills |
| Transaction details | `status.*` header chip, `content.secondary` labels | Large green/red banners |
| Buy | `action.success.default` for confirm if mirrored with Sell; or `action.primary` | Reusing brand for Sell |
| Sell | `action.destructive.default` | Same fill as Buy |
| Investment screen | `chart.*`, `financial.*`, `surface.info` for estimates | Forecast in solid positive green |
| Market watchlist | `divider.default`, `financial.*` per row | Zebra stripes in color |
| Asset details | `chart.line.primary`, `chart.selection`, `financial.*` header delta | More than 4 chart hues |
| Price charts | `chart.*` set; grid `neutral.100` | Colored gridlines |
| Order/trade screen | `action.success` Buy / `action.destructive` Sell, `chart.text.*` | Filled green/red anywhere except these buttons |
| KYC flow | `background.selected` for chosen doc type, `status.warning` pending, `status.success` verified | Red for 'not started' |
| Identity verification status | `status.*` chip + icon + text | Color-only status |
| Security settings | `status.success` enabled, `status.neutral` off, `surface.warning` recommendations | Red for 'off' |
| Profile | `surface.default`, `content.secondary` | Brand fills |
| Notifications | `surface.info`, `status.*` icon dots | Citron dots |
| Alerts | `surface.warning/info`, `content.*` pairs | Pale text colors |
| Empty states | `content.secondary`, `neutral.100` illustration fills, one primary CTA | Semantic colors |
| Loading states | `neutral.100`→`neutral.50` skeleton | Brand shimmer |
| Error states | `surface.error`, `content.error`, `border.error`, retry in `action.ink` | Citron retry on red |
| Maintenance | `surface.warning` banner, `content.primary` | Red (not an error) |
| Fraud/risk warnings | `surface.error` + `border.error`, `action.destructive` for 'Block' | Soft warning amber for confirmed fraud |
| Confirmation sheets | `surface.elevated`, `action.primary`, scrim 0.40 | Dark sheet over white app |
| Success confirmations | `status.success`, check icon, `action.primary` Done | Confetti hues beyond semantic set |
| Failure confirmations | `status.error`, x icon, retry `action.ink` | Brand yellow for failure |

## 15. Figma Variable Structure

- `Color / Primitive / Neutral / 0 … 950`
- `Color / Primitive / Brand / 50, 100, 300, 500, 600, 700, 800`
- `Color / Primitive / Positive | Negative | Warning | Info / …`
- `Color / Primitive / CVD / Positive, Negative, …`
- `Color / Semantic / Background / Primary … Inverse`
- `Color / Semantic / Surface / Default … Neutral`
- `Color / Semantic / Content / Primary … Link`
- `Color / Semantic / Border / Subtle … Info`
- `Color / Semantic / Action / Primary / Default, Pressed, Disabled, Content`
- `Color / Financial / Positive, Positive Subtle, Negative, … Info Subtle`
- `Color / Status / Success, Success Background, …`
- `Color / Chart / Candle / Bullish, Bearish, … `
- `Color / Overlay / Scrim, Sheet Scrim, Tooltip`

Use two Figma modes on the Semantic and Financial collections: **Default** and **Color-vision**. Primitives have one mode. The Light theme is the source of truth; the semantic layer is named by meaning so a second theme could be added later without renaming (the only mention of dark mode in this spec).

## 16. Developer Token Output

The complete machine-readable files are delivered alongside this spec (`tokens.json` in DTCG format with `{reference}` aliases, and `tokens.css`). Excerpt:

```css
:root{ /* Primitives */
  --color-neutral-0: #FFFFFF;
  --color-neutral-25: #FAFAFB;
  …
  --surface-success: var(--color-positive-50);
  --content-primary: var(--color-neutral-900);
  --action-primary-default: var(--color-brand-500);
  --financial-positive: var(--color-positive-700);
  --financial-negative: var(--color-negative-700);
  --financial-positive: var(--color-cvd-positive);
  --financial-negative: var(--color-cvd-negative);
}
[data-price-colors="color-vision"]{
  --financial-positive: var(--color-cvd-positive);
  --financial-negative: var(--color-cvd-negative);
}
```

```json
{
  "semantic": {
    "content": {
      "primary": {
        "$value": "{color.neutral.900}",
        "$type": "color",
        "$description": "Body, headings, balances"
      }
    },
    "financial": {
      "positive": {
        "_": {
          "$value": "{color.positive.700}",
          "$type": "color",
          "$description": "Gain figure/delta text",
          "subtle": {
            "$value": "{color.positive.50}",
            "$type": "color",
            "$description": "Delta chip fill"
          }
        },
        "subtle": {
          "$value": "{color.positive.50}",
          "$type": "color",
          "$description": "Delta chip fill"
        }
      }
    }
  }
}
```

## 17. Final Production Checklist

- [ ] **Contrast:** all text tokens in section 10 ≥ 4.5:1 on their intended surface; UI/graphics ≥ 3:1; the two documented non-passes reviewed.
- [ ] **Consistency:** each meaning maps to one token; no raw HEX in components.
- [ ] **Color meaning:** green/red/amber/blue appear only with the meanings in section 5.
- [ ] **Financial states:** every delta has sign + arrow + color; chips pair text and subtle fill.
- [ ] **Mobile usability:** pressed states are solid steps; focus ring visible on white and Citron; scrims defined.
- [ ] **Accessibility:** color-vision mode implemented and tested in protan/deutan/grayscale previews; no information color-only.
- [ ] **Token naming:** `category.role.state`; no appearance-based names.
- [ ] **Figma:** collections and modes as in section 15; variables bound, no local overrides.
- [ ] **Developer:** import `tokens.css` / `tokens.json`; color-vision override via `data-price-colors`.
- [ ] **Dark-mode independence:** no component hard-codes a primitive; semantic layer only.
- [ ] **Unverified items:** Binance's official hex values and its official color-vision feature set were not verifiable; none are claimed.