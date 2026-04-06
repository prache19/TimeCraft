// \u0e44\u0e17\u0e22 (Thai)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "\u0e2b\u0e19\u0e36\u0e48\u0e07", "\u0e2a\u0e2d\u0e07", "\u0e2a\u0e32\u0e21", "\u0e2a\u0e35\u0e48", "\u0e2b\u0e49\u0e32", "\u0e2b\u0e01", "\u0e40\u0e08\u0e47\u0e14", "\u0e41\u0e1b\u0e14", "\u0e40\u0e01\u0e49\u0e32", "\u0e2a\u0e34\u0e1a", "\u0e2a\u0e34\u0e1a\u0e40\u0e2d\u0e47\u0e14", "\u0e2a\u0e34\u0e1a\u0e2a\u0e2d\u0e07"];
  function hw(h) { return ones[h % 12 || 12]; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    return "+" + off + " \u0e19\u0e32\u0e17\u0e35";
  }
  return {
    name: "\u0e44\u0e17\u0e22", flag: "\ud83c\uddf9\ud83c\udded",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = hw(h) + " \u0e19\u0e32\u0e2c\u0e34\u0e01\u0e32\u0e15\u0e23\u0e07"; break;
        case 5:  main = hw(h) + " \u0e19\u0e32\u0e2c\u0e34\u0e01\u0e32\u0e2b\u0e49\u0e32\u0e19\u0e32\u0e17\u0e35"; break;
        case 10: main = hw(h) + " \u0e19\u0e32\u0e2c\u0e34\u0e01\u0e32\u0e2a\u0e34\u0e1a\u0e19\u0e32\u0e17\u0e35"; break;
        case 15: main = hw(h) + " \u0e19\u0e32\u0e2c\u0e34\u0e01\u0e32\u0e2a\u0e34\u0e1a\u0e2b\u0e49\u0e32"; break;
        case 20: main = hw(h) + " \u0e19\u0e32\u0e2c\u0e34\u0e01\u0e32\u0e22\u0e35\u0e48\u0e2a\u0e34\u0e1a\u0e19\u0e32\u0e17\u0e35"; break;
        case 25: main = hw(h) + " \u0e19\u0e32\u0e2c\u0e34\u0e01\u0e32\u0e22\u0e35\u0e48\u0e2a\u0e34\u0e1a\u0e2b\u0e49\u0e32\u0e19\u0e32\u0e17\u0e35"; break;
        case 30: main = hw(h) + " \u0e19\u0e32\u0e2c\u0e34\u0e01\u0e32\u0e04\u0e23\u0e36\u0e48\u0e07"; break;
        case 35: main = "\u0e2d\u0e35\u0e01\u0e22\u0e35\u0e48\u0e2a\u0e34\u0e1a\u0e2b\u0e49\u0e32\u0e19\u0e32\u0e17\u0e35 " + hw(nH) + " \u0e19\u0e32\u0e2c\u0e34\u0e01\u0e32"; break;
        case 40: main = "\u0e2d\u0e35\u0e01\u0e22\u0e35\u0e48\u0e2a\u0e34\u0e1a\u0e19\u0e32\u0e17\u0e35 " + hw(nH) + " \u0e19\u0e32\u0e2c\u0e34\u0e01\u0e32"; break;
        case 45: main = "\u0e2d\u0e35\u0e01\u0e2a\u0e34\u0e1a\u0e2b\u0e49\u0e32\u0e19\u0e32\u0e17\u0e35 " + hw(nH) + " \u0e19\u0e32\u0e2c\u0e34\u0e01\u0e32"; break;
        case 50: main = "\u0e2d\u0e35\u0e01\u0e2a\u0e34\u0e1a\u0e19\u0e32\u0e17\u0e35 " + hw(nH) + " \u0e19\u0e32\u0e2c\u0e34\u0e01\u0e32"; break;
        case 55: main = "\u0e2d\u0e35\u0e01\u0e2b\u0e49\u0e32\u0e19\u0e32\u0e17\u0e35 " + hw(nH) + " \u0e19\u0e32\u0e2c\u0e34\u0e01\u0e32"; break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
