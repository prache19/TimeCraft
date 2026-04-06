// Italiano (Italian)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "una", "due", "tre", "quattro", "cinque", "sei", "sette", "otto", "nove", "dieci", "undici", "dodici"];
  function hr(h) { return h % 12 || 12; }
  function hw(h) { return ones[hr(h)]; }
  function verb(h) { return hr(h) === 1 ? "\u00c8 l'" : "Sono le "; }
  function snap(m) {
    if (m <= 7)  return { base: 0,  off: m };
    if (m <= 22) return { base: 15, off: m - 15 };
    if (m <= 37) return { base: 30, off: m - 30 };
    if (m <= 52) return { base: 45, off: m - 45 };
    return { base: 60, off: m - 60 };
  }
  function extra(off) {
    if (off === 0) return "";
    if (off === 1 || off === -1) return (off > 0 ? "+" : "") + off + " minuto";
    return (off > 0 ? "+" : "") + off + " minuti";
  }
  return {
    name: "Italiano", flag: "\ud83c\uddee\ud83c\uddf9",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      if (s.base === 0)       main = verb(h) + hw(h) + " in punto";
      else if (s.base === 15) main = verb(h) + hw(h) + " e un quarto";
      else if (s.base === 30) main = verb(h) + hw(h) + " e mezza";
      else if (s.base === 45) main = verb(nH) + hw(nH) + " meno un quarto";
      else                    main = verb(nH) + hw(nH) + " in punto";
      return { main: main, extra: extra(s.off) };
    }
  };
})());
