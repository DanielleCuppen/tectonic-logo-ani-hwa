# Tectonic logo intro — HWA de Jong (standalone)

Speeltuin voor **drie varianten** van het logo-intro, los van [hwadejong-2026](https://github.com/DanielleCuppen/hwadejong-2026).

## Animatie aanpassen — opnieuw bouwen?

| Waar je editeert | Build nodig? |
|------------------|--------------|
| **`tectonic-logo-ani-hwa`** — `css/demo.css`, `js/demo.js`, `index.html` | **Nee.** Opslaan → **hard refresh** in de browser (eventueel cache legen). |
| **`hwadejong-2026`** — `resources/css/app.css`, `resources/js/app.js`, Blade | **Ja** (voor de site): `npm run dev` terwijl je werkt, of `npm run build` voor gebundelde assets op `.test`. |

Intro **timing**: `SCATTER_HOLD_MS` (100 ms, variant 1 bij load = header) · **`SCATTER_HOLD_REPLAY_MS`** (450 ms, knop Afspelen / variant 2–3). **`is-settled` op de stage** wordt daar via `classList` gezet (niet Alpine `:class` — dat liep achter en verstopte platen bij Afspelen). **Beweging** (px/rotate): `css/demo.css` onder `.logo-tectonic-stage:not(.is-settled)`.

## Openen

1. **Direct (werkt):** open `index.html` in de browser (`file://`).  
   - Vereist **internet** voor Alpine 3 via jsDelivr (`index.html` → scripts onderaan).  
   - Open het bestand **vanuit deze map**, zodat `css/`, `js/` en `assets/` kloppen.

2. **Optioneel:** lokale server (zelfde resultaat, handig bij GitHub Pages-test):

```bash
npx --yes serve .
```

## Gedrag bij load

| Variant | Auto-intro bij load |
|---------|---------------------|
| **1 Brand** | Ja — `logoTectonicIntro()` (zelfde als site-header) |
| **2 Derden** | Nee — statisch logo; animatie via **Afspelen** |
| **3 Breuk** | Nee — idem |

**Afspelen:** knop met `data-tectonic-replay` (plain JS in `demo.js`, geen Alpine `@click`).  
**Console (F12):** `TectonicLogoDemo.replay("thirds")` · `TectonicLogoDemo.replay("fault")` · `TectonicLogoDemo.status()` — geen aparte “democontrole”; oude snippets die `logoTectonicIntroStatic` of `@click` aanroepen horen **niet** meer bij deze versie.  
**Desktop:** intro alleen ≥768px (zoals header). Smaller venster → knop lijkt idle.  
**`prefers-reduced-motion`:** overal direct statisch logo (geen platen).  
**Troubleshoot:** hard refresh; in Network moeten `js/demo.js` en Alpine-CDN **200** zijn; `status()` toont `mdPlus` en `hasAlpineData`.

## Varianten (snede)

| # | Naam | Snede |
|---|------|--------|
| 1 | **Brand** | 1250 / 1134,36 / 176,34 (viewBox 2560) |
| 2 | **Derden** | 33,333% × 3 |
| 3 | **Breuk** | Schuine `polygon`-clips (demo-choreografie) |

## Sync met hwadejong-2026

- **Markup/CSS:** `logo-tectonic-stage`, `is-settled`, `logoImg`, plate-klassen — zie `resources/views/sections/header.blade.php` en `resources/css/app.css`.
- **JS:** `demo.js` spiegelt `logoTectonicIntro()` + `reduced-motion` op `<html>` uit `resources/js/app.js`.
- **Alleen demo:** `logoTectonicIntroStatic()`, `demo-stage-canvas` (extra ruimte), variant 2/3 clip-overrides.

## V3 — ideeën

Golden ratio-snedes, parallax-diepte, horizontale top-band apart, mask-SVG — zie eerdere notities in commits of experimenteer in `css/demo.css` onder `[data-variant="fault"]`.

## Credits

Logo © Herman de Jong. Demo-code MIT — `LICENSE`.
