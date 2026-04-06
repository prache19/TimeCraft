// Türkçe (Turkish)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "bir", "iki", "\u00fc\u00e7", "d\u00f6rt", "be\u015f", "alt\u0131", "yedi", "sekiz", "dokuz", "on", "on bir", "on iki"];
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
    return (off > 0 ? "+" : "") + off + " dakika";
  }
  return {
    name: "T\u00fcrk\u00e7e", flag: "\ud83c\uddf9\ud83c\uddf7",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      if (s.base === 0)       main = "Saat " + hw(h);
      else if (s.base === 15) main = "Saat " + hw(h) + " \u00e7eyre\u011fi ge\u00e7iyor";
      else if (s.base === 30) main = "Saat " + hw(h) + " bu\u00e7uk";
      else if (s.base === 45) main = "Saat " + hw(nH) + "'e \u00e7eyrek var";
      else                    main = "Saat " + hw(nH);
      return { main: main, extra: extra(s.off) };
    }
  };
})());
