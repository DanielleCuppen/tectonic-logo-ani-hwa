# Tectonic logo intro — HWA de Jong (standalone)

Publieke speeltuin voor **drie varianten** van het logo-intro (los van [hwadejong-2026](https://github.com/DanielleCuppen/hwadejong-2026)). Open `index.html` lokaal of via GitHub Pages.

## Varianten

| # | Naam | Snede | Idee |
|---|------|--------|------|
| 1 | **Brand** | 1250 / 1134,36 / 176,34 (viewBox 2560) | Zelfde naden als productie: grijs – oranje – smal grijs. |
| 2 | **Derden** | 33,333% / 33,333% / 33,333% | Neutrale vergelijking: geen kleurlogica, pure geometrie. |
| 3 | **Breuk** | Schuine `polygon`-clips op de **brand-naden** | Zelfde kolommen als v1, maar schuine voegen; middenplaat komt van onder, zijden schuin. |

## V3 — verder experimenteren

- **Golden ratio** (≈ 38,2% / 23,6% / 38,2%) — rustiger dan derden, nog steeds “design”.
- **Parallax-diepte** — zelfde clips, verschillende `scale` + `z-index` vóór settle.
- **Horizontale platen** — dunne band boven (class `d` in SVG) apart animeren (1 regel, geen 4e verticaal vak).
- **Mask-SVG** — exacte path-vlakken i.p.v. rechthoekige clips (zwaarder, wel pixel-perfect H-uitsparing).

## Gebruik

```bash
# Optioneel: simpele server (SVG + clip-path werken ook via file:// meestal)
npx --yes serve .
```

**Opnieuw afspelen:** knop “Opnieuw” per variant. **`prefers-reduced-motion`:** direct statisch logo, geen intro.

## Credits

Logo © Herman de Jong. Demo-code MIT — zie `LICENSE`.
