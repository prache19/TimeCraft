# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TimeCraft is a vanilla JavaScript web app that displays the current time spelled out in words across 20 languages. No build tools, no dependencies — open `index.html` directly in a browser.

## Architecture

### Layer Model
```
wallpaper  (z:0)  — user-uploaded image via FileReader → localStorage
overlay    (z:1)  — theme gradient applied here; dark tint when wallpaper active
container  (z:2)  — frosted glass time-box + controls
```

### Language Plugin System
Each `langs/*.js` file self-registers into a global array:
```js
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  return {
    name: "Display Name",
    flag: "🇽🇽",
    format(h, m) { /* h: 0-23, m: 0-59 → localized string */ }
  };
})());
```
- **Load order in `index.html` determines dropdown order.**
- `script.js` must load after all `langs/*.js` files.
- To add a language: create `langs/xx.js` with the pattern above, add `<script src="langs/xx.js">` before `script.js` in `index.html`.

### Theme System
Themes are defined in two places:
- **`script.js`** — `themeList` array maps theme names to CSS class names (e.g., `t-aurora`).
- **`style.css`** — each `body.t-*` class sets layered gradient backgrounds and a unique Google Font on `.time-text`. The `t-arctic` theme is a special case with light-on-dark-text inversion.

Google Fonts are loaded via a single `@import` at the top of `style.css`.

### Persistence
Three `localStorage` keys: `timecraft-lang` (index), `timecraft-theme` (index), `timecraft-wallpaper` (data URL). Wallpaper storage uses try/catch since large images may exceed quota.

### Update Loop
`setInterval` runs every 1 second but only touches the DOM when the minute changes (cached `lastMinute` comparison).

## Development

No build step. Edit files and refresh the browser. A local HTTP server is needed for wallpaper upload to work (file:// may block FileReader in some browsers):
```
npx serve .
```
