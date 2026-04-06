// ============================================================
// TimeCraft – main app
// Reads languages from window.TimeCraftLangs (populated by langs/*.js)
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
  { name: "Tropical", cls: "t-tropical" }
];

// ============================================================
// DOM
// ============================================================

const timeTextEl = document.getElementById("time-text");
const langSelect = document.getElementById("lang-select");
const themeSelect = document.getElementById("theme-select");
const wallpaperInput = document.getElementById("wallpaper-input");
const wallpaperEl = document.getElementById("wallpaper");
const clearBtn = document.getElementById("clear-wallpaper");

// Populate language dropdown from registered languages
languages.forEach((lang, i) => {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = lang.flag + " " + lang.name;
  langSelect.appendChild(opt);
});

// Populate theme dropdown
themeList.forEach((t, i) => {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = t.name;
  themeSelect.appendChild(opt);
});

// ============================================================
// Persistence
// ============================================================

const LANG_KEY = "timecraft-lang";
const THEME_KEY = "timecraft-theme";
const WP_KEY = "timecraft-wallpaper";

const sL = localStorage.getItem(LANG_KEY);
if (sL !== null && sL < languages.length) langSelect.value = sL;

const sT = localStorage.getItem(THEME_KEY);
if (sT !== null && sT < themeList.length) themeSelect.value = sT;

// ============================================================
// Appearance
// ============================================================

function applyAppearance() {
  const hasWp = wallpaperEl.style.backgroundImage !== "";
  document.body.className = themeList[themeSelect.value].cls + (hasWp ? " has-wallpaper" : "");
}

// ============================================================
// Wallpaper
// ============================================================

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

// ============================================================
// Events
// ============================================================

langSelect.addEventListener("change", () => {
  localStorage.setItem(LANG_KEY, langSelect.value);
  lastMinute = -1;
  updateDisplay();
});

themeSelect.addEventListener("change", () => {
  localStorage.setItem(THEME_KEY, themeSelect.value);
  applyAppearance();
});

// ============================================================
// Update loop
// ============================================================

let lastMinute = -1;

function updateDisplay() {
  const now = new Date();
  const m = now.getMinutes();
  const h = now.getHours();

  if (m !== lastMinute) {
    lastMinute = m;
    const lang = languages[langSelect.value];
    if (lang) {
      timeTextEl.textContent = lang.format(h, m);
    }
  }
}

applyAppearance();
updateDisplay();
setInterval(updateDisplay, 1000);
