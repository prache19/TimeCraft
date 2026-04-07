# TimeCraft - Project Plan

## Current State (v1.0)

TimeCraft is a vanilla JavaScript web app that displays the current time as a **word clock grid** across 19 languages. No build tools, no dependencies.

### Completed Features

- **Word Clock Grid Display**: QLOCKTWO-style letter grids where words light up to show time
- **19 Languages**: English, German, Dutch, Spanish, French, Italian, Portuguese, Chinese, Japanese, Korean, Turkish, Vietnamese, Indonesian, Swahili, Russian, Polish, Arabic, Thai, Hindi (Hinglish)
- **16 Themes**: Aurora Borealis, Sunset Beach, Deep Ocean, Enchanted Forest, Starry Night, Sakura, Golden Hour, Arctic Frost, Ember Glow, Lavender Dreams, Midnight City, Tropical, Mountain Peaks, City Skyline, Ocean Waves, Desert Dunes
- **Settings Panel**: Gear icon in bottom-right corner with compact dropdown for Language, Theme, and Wallpaper controls
- **Wallpaper Upload**: Custom background image via FileReader + localStorage
- **Responsive Design**: Grid cells and layout scale with viewport using `clamp()`
- **Dual Grid Modes**: Character grids (Latin/Cyrillic/CJK) and word-mode grids (Arabic, Thai) with auto-detection

### Architecture

```
Layer Model:
  wallpaper  (z:0) - user-uploaded image
  overlay    (z:1) - theme gradient
  container  (z:2) - frosted glass time-box + grid
  settings   (z:5) - gear button + dropdown panel

Language Plugin System:
  langs/*.js -> window.TimeCraftLangs[] -> { name, flag, grid, format(h,m) }
  grid: { letters: string[] | string[][], highlight(h,m): [row,col][] }

Update Loop:
  setInterval(1s) -> only touch DOM when minute changes
```

---

## Roadmap

### Phase 1: Polish & UX Improvements

| Task | Priority | Description |
|------|----------|-------------|
| Smooth grid transitions | High | Animate letter highlights with staggered fade for a more organic feel |
| Responsive breakpoints | High | Test and tune grid sizing for mobile (<480px), tablet, and desktop |
| Keyboard shortcuts | Medium | `L` to cycle language, `T` to cycle theme, `Esc` to close settings |
| Touch gestures | Medium | Swipe left/right on grid to change language, long-press for settings |
| Accessibility | Medium | ARIA labels for grid cells, screen reader support with live region for time |

### Phase 2: New Features

| Task | Priority | Description |
|------|----------|-------------|
| Dark/Light mode toggle | High | Separate from themes - a global brightness preference |
| Clock face mode | Medium | Alternative circular analog display alongside grid mode |
| Multiple time zones | Medium | Show secondary timezone below main grid |
| Alarm/reminder | Low | Simple browser notification at a set time |
| Ambient sound | Low | Optional background audio per theme (rain, waves, forest) |

### Phase 3: More Languages & Grids

| Task | Priority | Description |
|------|----------|-------------|
| Bengali grid | Medium | Re-add with proper Bangla syllable grid |
| Tamil, Telugu, Kannada | Low | Indian regional languages |
| Hebrew | Low | RTL grid like Arabic |
| Greek | Low | Greek alphabet grid |
| Improve complex script grids | Medium | Refine Arabic/Thai word-mode grids for better visual alignment |

### Phase 4: Distribution & Sharing

| Task | Priority | Description |
|------|----------|-------------|
| PWA support | High | Service worker + manifest for installable app |
| Screenshot/share | Medium | Export current clock as image for sharing |
| Embed mode | Low | Iframe-friendly version with URL params for lang/theme |
| Widget mode | Low | Compact version for desktop widgets or browser new-tab |

---

## Technical Debt

- **localStorage quota**: Large wallpaper images may exceed quota. Consider compressing or using IndexedDB.
- **Grid validation**: No runtime check that grid row lengths are consistent. A dev-time lint would help.
- **Theme + grid font interaction**: Some theme fonts (cursive like Dancing Script) don't look great on the grid. Consider a separate grid font override per theme.
- **Performance on low-end devices**: 19 language files loaded upfront. Consider lazy-loading non-default languages.

---

## File Structure

```
TimeCraft/
  index.html          - Main HTML (grid container, settings panel)
  script.js           - App logic (grid rendering, settings, update loop)
  style.css           - All styling (themes, grid, settings, layers)
  langs/
    en.js             - English (reference grid implementation)
    zh.js, ja.js, ko.js  - CJK character grids
    de.js, nl.js      - Germanic grids
    es.js, fr.js, it.js, pt.js  - Romance grids
    tr.js, vi.js, id.js, sw.js  - Latin misc grids
    ru.js, pl.js      - Slavic grids
    ar.js, th.js      - Word-mode grids (complex scripts)
    hi.js             - Hinglish (romanized Hindi)
  docs/
    plan.md           - This file
  CLAUDE.md           - AI assistant instructions
```
