// ไทย (Thai)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "\u0e2b\u0e19\u0e36\u0e48\u0e07", "\u0e2a\u0e2d\u0e07", "\u0e2a\u0e32\u0e21", "\u0e2a\u0e35\u0e48", "\u0e2b\u0e49\u0e32", "\u0e2b\u0e01", "\u0e40\u0e08\u0e47\u0e14", "\u0e41\u0e1b\u0e14", "\u0e40\u0e01\u0e49\u0e32", "\u0e2a\u0e34\u0e1a", "\u0e2a\u0e34\u0e1a\u0e40\u0e2d\u0e47\u0e14", "\u0e2a\u0e34\u0e1a\u0e2a\u0e2d\u0e07"];
  function hw(h) { return ones[h % 12 || 12]; }
  function snap(m) {
    if (m <= 7)  return { base: 0,  off: m };
    if (m <= 22) return { base: 15, off: m - 15 };
    if (m <= 37) return { base: 30, off: m - 30 };
    if (m <= 52) return { base: 45, off: m - 45 };
    return { base: 60, off: m - 60 };
  }
  function extra(off) {
    if (off === 0) return "";
    return (off > 0 ? "+" : "") + off + " \u0e19\u0e32\u0e17\u0e35";
  }
  return {
    name: "\u0e44\u0e17\u0e22", flag: "\ud83c\uddf9\ud83c\udded",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      if (s.base === 0)       main = hw(h) + " \u0e19\u0e32\u0e2c\u0e34\u0e01\u0e32\u0e15\u0e23\u0e07";
      else if (s.base === 15) main = hw(h) + " \u0e19\u0e32\u0e2c\u0e34\u0e01\u0e32\u0e2a\u0e34\u0e1a\u0e2b\u0e49\u0e32";
      else if (s.base === 30) main = hw(h) + " \u0e19\u0e32\u0e2c\u0e34\u0e01\u0e32\u0e04\u0e23\u0e36\u0e48\u0e07";
      else if (s.base === 45) main = "\u0e2d\u0e35\u0e01\u0e2a\u0e34\u0e1a\u0e2b\u0e49\u0e32\u0e19\u0e32\u0e17\u0e35 " + hw(nH) + " \u0e19\u0e32\u0e2c\u0e34\u0e01\u0e32";
      else                    main = hw(nH) + " \u0e19\u0e32\u0e2c\u0e34\u0e01\u0e32\u0e15\u0e23\u0e07";
      return { main: main, extra: extra(s.off) };
    }
  };
})());
