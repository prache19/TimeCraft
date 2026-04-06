// Français (French)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "une", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf",
    "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize",
    "dix-sept", "dix-huit", "dix-neuf", "vingt", "vingt et une", "vingt-deux", "vingt-trois"];
  function hrW(h) {
    const v = h % 24;
    if (v === 0) return "minuit";
    if (v === 1) return "une heure";
    return ones[v] + " heures";
  }
  function snap(m) {
    if (m <= 7)  return { base: 0,  off: m };
    if (m <= 22) return { base: 15, off: m - 15 };
    if (m <= 37) return { base: 30, off: m - 30 };
    if (m <= 52) return { base: 45, off: m - 45 };
    return { base: 60, off: m - 60 };
  }
  function extra(off) {
    if (off === 0) return "";
    if (off === 1 || off === -1) return (off > 0 ? "+" : "") + off + " minute";
    return (off > 0 ? "+" : "") + off + " minutes";
  }
  return {
    name: "Fran\u00e7ais", flag: "\ud83c\uddeb\ud83c\uddf7",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      if (s.base === 0)       main = "Il est " + hrW(h);
      else if (s.base === 15) main = "Il est " + hrW(h) + " et quart";
      else if (s.base === 30) main = "Il est " + hrW(h) + " et demie";
      else if (s.base === 45) main = "Il est " + hrW(nH) + " moins le quart";
      else                    main = "Il est " + hrW(nH);
      return { main: main, extra: extra(s.off) };
    }
  };
})());
