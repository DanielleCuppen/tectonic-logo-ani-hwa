# Tectonic logo intro — HWA de Jong (standalone)

Playground for **three variants** of the logo intro, separate from [hwadejong-2026](https://github.com/DanielleCuppen/hwadejong-2026) (private site repo).

## Editing the animation — rebuild?

| Where you edit | Build required? |
|----------------|-----------------|
| **`tectonic-logo-ani-hwa`** — `css/demo.css`, `js/demo.js`, `index.html` | **No.** Save → **hard refresh** (clear cache if needed). |
| **`hwadejong-2026`** — `resources/css/app.css`, `resources/js/app.js`, Blade | **Yes** (for the site): `npm run dev` while working, or `npm run build` for assets on `.test`. |

**Timing:** `SCATTER_HOLD_MS` (100 ms, variant 1 on load = production header) · **`SCATTER_HOLD_REPLAY_MS`** (450 ms, **Play** button / variants 2–3). **`is-settled`** on the stage is set via `classList` (not Alpine `:class`). **Motion** (px/rotate): `css/demo.css` under `.logo-tectonic-stage:not(.is-settled)`.

## Run locally

1. **Recommended:** local HTTP server (reliable paths + cache):

```bash
cd ~/Documents/GitHub/tectonic-logo-ani-hwa
python3 -m http.server 8765
```

Open **http://127.0.0.1:8765/index.html**

2. **Optional:** `file://` works but cache/CDN can be flaky — prefer the server above.

Requires **internet** for Alpine 3 via jsDelivr (scripts at bottom of `index.html`).

## Behaviour on load

| Variant | Auto-intro on load |
|---------|---------------------|
| **1 Brand** | Yes — `logoTectonicIntro({ playOnInit: true })` (same as site header) |
| **2 Thirds** | No — static logo; animation via **Play** |
| **3 Fault** | No — same |

**Play:** button with `data-tectonic-replay` (plain JS in `demo.js`).  
**Console (F12):** `TectonicLogoDemo.replay("thirds")` · `TectonicLogoDemo.replay("fault")` · `TectonicLogoDemo.status()`

### Mobile (under 768px)

Same rules as the **hwadejong-2026** header:

- The **tectonic plate intro does not run** (CSS hides `.logo-tectonic-plates`; JS skips the animation).
- You only see the **static** logo SVG.
- **Play** does nothing visible — not broken, by design.

### Reduced motion (`prefers-reduced-motion: reduce`)

- Intro is **skipped everywhere** (any viewport width).
- **No plate layers** — static logo only, immediately.
- The demo page shows a **notice** when this setting is active.

**Troubleshoot:** hard refresh; Network tab should show `demo.js` and Alpine CDN as **200**; `status()` should show `mdPlus`, `reducedMotion`, and `hasAlpineData`.

## Variants (clip layout)

| # | Name | Split |
|---|------|--------|
| 1 | **Brand** | 1250 / 1134.36 / 176.34 (viewBox 2560) |
| 2 | **Thirds** | 33.333% × 3 |
| 3 | **Fault** | Angled `polygon` clips (demo choreography) |

## Sync with hwadejong-2026

- **Markup/CSS:** `logo-tectonic-stage`, `is-settled`, `logoImg`, plate classes — see `resources/views/sections/header.blade.php` and `resources/css/app.css`.
- **JS:** `demo.js` mirrors `logoTectonicIntro()` and `reduced-motion` on `<html>` from `resources/js/app.js` (demo adds `is-playing`, replay hold, and document-level Play handling).
- **Demo-only:** `demo-stage-canvas` (extra bleed), `[data-variant]` clip overrides for thirds/fault.

## Ideas (v3)

Golden-ratio splits, parallax depth, separate top band, mask SVG — experiment under `[data-variant="fault"]` in `css/demo.css`.

## Credits

Logo © Herman de Jong. Demo code MIT — see `LICENSE`.
