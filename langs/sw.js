// Kiswahili (Swahili)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "moja", "mbili", "tatu", "nne", "tano", "sita", "saba", "nane", "tisa", "kumi", "kumi na moja", "kumi na mbili"];
  function swHr(h) { return (((h % 12 || 12) + 6) % 12) || 12; }
  function hw(h) { return ones[swHr(h)]; }
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
    name: "Kiswahili", flag: "\ud83c\uddf9\ud83c\uddff",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      if (s.base === 0)       main = "Saa " + hw(h) + " kamili";
      else if (s.base === 15) main = "Saa " + hw(h) + " na robo";
      else if (s.base === 30) main = "Saa " + hw(h) + " na nusu";
      else if (s.base === 45) main = "Saa " + hw(nH) + " kasorobo";
      else                    main = "Saa " + hw(nH) + " kamili";
      return { main: main, extra: extra(s.off) };
    }
  };
})());
