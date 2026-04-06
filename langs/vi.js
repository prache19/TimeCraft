// Tiếng Việt (Vietnamese)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "m\u1ed9t", "hai", "ba", "b\u1ed1n", "n\u0103m", "s\u00e1u", "b\u1ea3y", "t\u00e1m", "ch\u00edn", "m\u01b0\u1eddi", "m\u01b0\u1eddi m\u1ed9t", "m\u01b0\u1eddi hai"];
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
    return (off > 0 ? "+" : "") + off + " ph\u00fat";
  }
  return {
    name: "Ti\u1ebfng Vi\u1ec7t", flag: "\ud83c\uddfb\ud83c\uddf3",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      if (s.base === 0)       main = hw(h) + " gi\u1edd \u0111\u00fang";
      else if (s.base === 15) main = hw(h) + " gi\u1edd m\u01b0\u1eddi l\u0103m";
      else if (s.base === 30) main = hw(h) + " gi\u1edd r\u01b0\u1ee1i";
      else if (s.base === 45) main = hw(nH) + " gi\u1edd k\u00e9m m\u01b0\u1eddi l\u0103m";
      else                    main = hw(nH) + " gi\u1edd \u0111\u00fang";
      return { main: main, extra: extra(s.off) };
    }
  };
})());
