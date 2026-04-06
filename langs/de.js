// Deutsch (German)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "eins", "zwei", "drei", "vier", "f\u00fcnf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zw\u00f6lf"];
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
    if (off === 1 || off === -1) return (off > 0 ? "+" : "") + off + " Minute";
    return (off > 0 ? "+" : "") + off + " Minuten";
  }
  return {
    name: "Deutsch", flag: "\ud83c\udde9\ud83c\uddea",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      if (s.base === 0)       main = "Es ist " + hw(h) + " Uhr";
      else if (s.base === 15) main = "Es ist Viertel nach " + hw(h);
      else if (s.base === 30) main = "Es ist halb " + hw(nH);
      else if (s.base === 45) main = "Es ist Viertel vor " + hw(nH);
      else                    main = "Es ist " + hw(nH) + " Uhr";
      return { main: main, extra: extra(s.off) };
    }
  };
})());
