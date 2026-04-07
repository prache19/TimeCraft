// ============================================================
// TimeCraft – main app
// Reads languages from window.TimeCraftLangs (populated by langs/*.js)
// Each lang.format(h, m) returns { main: "...", extra: "..." }
// ============================================================

const languages = window.TimeCraftLangs || [];

const themeList = [
  { name: "Aurora Borealis", cls: "t-aurora" },
  { name: "Sunset Beach", cls: "t-sunset" },
  { name: "Deep Ocean", cls: "t-ocean" },
  { name: "Enchanted Forest", cls: "t-forest" },
  { name: "Starry Night", cls: "t-starry" },
  { name: "Sakura", cls: "t-sakura" },
  { name: "Golden Hour", cls: "t-golden" },
  { name: "Arctic Frost", cls: "t-arctic" },
  { name: "Ember Glow", cls: "t-ember" },
  { name: "Lavender Dreams", cls: "t-lavender" },
  { name: "Midnight City", cls: "t-midnight" },
  { name: "Tropical", cls: "t-tropical" },
  { name: "Mountain Peaks", cls: "t-mountain" },
  { name: "City Skyline", cls: "t-city" },
  { name: "Ocean Waves", cls: "t-waves" },
  { name: "Desert Dunes", cls: "t-desert" }
];

// DOM
const timeTextEl = document.getElementById("time-text");
const timeExtraEl = document.getElementById("time-extra");
const wordGridEl = document.getElementById("word-grid");
const langSelect = document.getElementById("lang-select");
const themeSelect = document.getElementById("theme-select");
const wallpaperInput = document.getElementById("wallpaper-input");
const wallpaperEl = document.getElementById("wallpaper");
const clearBtn = document.getElementById("clear-wallpaper");
const settingsBtn = document.getElementById("settings-btn");
const settingsPanel = document.getElementById("settings-panel");

// Populate dropdowns
languages.forEach((lang, i) => {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = lang.flag + " " + lang.name;
  langSelect.appendChild(opt);
});

themeList.forEach((t, i) => {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = t.name;
  themeSelect.appendChild(opt);
});

// Persistence
const LANG_KEY = "timecraft-lang";
const THEME_KEY = "timecraft-theme";
const WP_KEY = "timecraft-wallpaper";

const sL = localStorage.getItem(LANG_KEY);
if (sL !== null && sL < languages.length) langSelect.value = sL;

const sT = localStorage.getItem(THEME_KEY);
if (sT !== null && sT < themeList.length) themeSelect.value = sT;

// Appearance
function applyAppearance() {
  const hasWp = wallpaperEl.style.backgroundImage !== "";
  document.body.className = themeList[themeSelect.value].cls + (hasWp ? " has-wallpaper" : "");
}

// Wallpaper
function setWallpaper(dataUrl) {
  wallpaperEl.style.backgroundImage = 'url("' + dataUrl + '")';
  clearBtn.style.display = "inline-block";
  applyAppearance();
}

function removeWallpaper() {
  wallpaperEl.style.backgroundImage = "";
  clearBtn.style.display = "none";
  localStorage.removeItem(WP_KEY);
  applyAppearance();
}

const savedWp = localStorage.getItem(WP_KEY);
if (savedWp) setWallpaper(savedWp);

wallpaperInput.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    setWallpaper(e.target.result);
    try { localStorage.setItem(WP_KEY, e.target.result); } catch (_) {}
  };
  reader.readAsDataURL(file);
  this.value = "";
});

clearBtn.addEventListener("click", removeWallpaper);

// Settings panel toggle
function toggleSettings() {
  const isOpen = settingsPanel.classList.contains("open");
  if (isOpen) {
    settingsPanel.classList.remove("open");
    settingsPanel.addEventListener("transitionend", function handler() {
      settingsPanel.hidden = true;
      settingsPanel.removeEventListener("transitionend", handler);
    });
  } else {
    settingsPanel.hidden = false;
    requestAnimationFrame(() => settingsPanel.classList.add("open"));
  }
}

settingsBtn.addEventListener("click", toggleSettings);

// Events
langSelect.addEventListener("change", () => {
  localStorage.setItem(LANG_KEY, langSelect.value);
  currentGridLang = -1;
  lastMinute = -1;
  updateDisplay();
});

themeSelect.addEventListener("change", () => {
  localStorage.setItem(THEME_KEY, themeSelect.value);
  applyAppearance();
});

// Word grid rendering
let gridCells = [];  // span elements [row][col]
let currentGridLang = -1;

function buildGrid(lang) {
  wordGridEl.innerHTML = "";
  gridCells = [];

  const rows = lang.grid.letters;
  // Detect word-mode grids (array-of-arrays vs string rows)
  const isWordMode = Array.isArray(rows[0]);
  wordGridEl.classList.toggle("word-mode", isWordMode);

  for (let r = 0; r < rows.length; r++) {
    const rowDiv = document.createElement("div");
    rowDiv.className = "grid-row";
    const rowCells = [];
    for (let c = 0; c < rows[r].length; c++) {
      const span = document.createElement("span");
      span.className = "grid-cell";
      span.textContent = rows[r][c];
      rowDiv.appendChild(span);
      rowCells.push(span);
    }
    wordGridEl.appendChild(rowDiv);
    gridCells.push(rowCells);
  }

}

function updateGrid(lang, h, m) {
  const litSet = new Set();
  const cells = lang.grid.highlight(h, m);
  for (const pos of cells) litSet.add(pos[0] + "," + pos[1]);

  for (let r = 0; r < gridCells.length; r++) {
    for (let c = 0; c < gridCells[r].length; c++) {
      gridCells[r][c].classList.toggle("lit", litSet.has(r + "," + c));
    }
  }
}

// Update loop
let lastMinute = -1;

function updateDisplay() {
  const now = new Date();
  const m = now.getMinutes();
  const h = now.getHours();

  if (m !== lastMinute) {
    lastMinute = m;
    const langIdx = parseInt(langSelect.value);
    const lang = languages[langIdx];
    if (!lang) return;

    if (lang.grid) {
      // Word clock grid mode
      if (currentGridLang !== langIdx) {
        buildGrid(lang);
        currentGridLang = langIdx;
      }
      wordGridEl.hidden = false;
      timeTextEl.style.display = "none";
      timeExtraEl.style.display = "";
      updateGrid(lang, h, m);
      // Show extra minutes text from format()
      const result = lang.format(h, m);
      let extra = result.extra || "";
      extra = extra.replace(/^-/, "+");
      timeExtraEl.textContent = extra;
    } else {
      // Text mode (fallback for non-grid languages)
      wordGridEl.hidden = true;
      timeTextEl.style.display = "";
      timeExtraEl.style.display = "";
      currentGridLang = -1;
      const result = lang.format(h, m);
      timeTextEl.textContent = result.main;
      let extra = result.extra || "";
      extra = extra.replace(/^-/, "+");
      timeExtraEl.textContent = extra;
    }
  }
}

applyAppearance();
updateDisplay();
setInterval(updateDisplay, 1000);

// Reset selections on page close
window.addEventListener("beforeunload", () => {
  localStorage.removeItem(LANG_KEY);
  localStorage.removeItem(THEME_KEY);
  localStorage.removeItem(WP_KEY);
});
