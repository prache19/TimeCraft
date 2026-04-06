// ไทย (Thai)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = [
    "", "\u0e2b\u0e19\u0e36\u0e48\u0e07", "\u0e2a\u0e2d\u0e07", "\u0e2a\u0e32\u0e21",
    "\u0e2a\u0e35\u0e48", "\u0e2b\u0e49\u0e32", "\u0e2b\u0e01", "\u0e40\u0e08\u0e47\u0e14",
    "\u0e41\u0e1b\u0e14", "\u0e40\u0e01\u0e49\u0e32", "\u0e2a\u0e34\u0e1a",
    "\u0e2a\u0e34\u0e1a\u0e40\u0e2d\u0e47\u0e14", "\u0e2a\u0e34\u0e1a\u0e2a\u0e2d\u0e07"
  ];
  const mo = [
    "", "\u0e2b\u0e19\u0e36\u0e48\u0e07", "\u0e2a\u0e2d\u0e07", "\u0e2a\u0e32\u0e21",
    "\u0e2a\u0e35\u0e48", "\u0e2b\u0e49\u0e32", "\u0e2b\u0e01", "\u0e40\u0e08\u0e47\u0e14",
    "\u0e41\u0e1b\u0e14", "\u0e40\u0e01\u0e49\u0e32"
  ];
  const mt = [
    "", "\u0e2a\u0e34\u0e1a", "\u0e22\u0e35\u0e48\u0e2a\u0e34\u0e1a",
    "\u0e2a\u0e32\u0e21\u0e2a\u0e34\u0e1a", "\u0e2a\u0e35\u0e48\u0e2a\u0e34\u0e1a",
    "\u0e2b\u0e49\u0e32\u0e2a\u0e34\u0e1a"
  ];

  function mw(n) {
    if (n < 10) return mo[n];
    if (n === 10) return "\u0e2a\u0e34\u0e1a";
    if (n < 20) return "\u0e2a\u0e34\u0e1a" + mo[n - 10];
    if (n === 20) return "\u0e22\u0e35\u0e48\u0e2a\u0e34\u0e1a";
    const t = mt[Math.floor(n / 10)];
    const o = n % 10 === 1 ? "\u0e40\u0e2d\u0e47\u0e14" : mo[n % 10];
    return o ? t + o : t;
  }

  return {
    name: "\u0e44\u0e17\u0e22",
    flag: "\ud83c\uddf9\ud83c\udded",
    format(h, m) {
      const hr = ones[h % 12 || 12];
      return m === 0
        ? hr + " \u0e19\u0e32\u0e2c\u0e34\u0e01\u0e32\u0e15\u0e23\u0e07"
        : hr + " \u0e19\u0e32\u0e2c\u0e34\u0e01\u0e32 " + mw(m) + " \u0e19\u0e32\u0e17\u0e35";
    }
  };
})());
