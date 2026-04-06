// العربية (Arabic)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const hw = ["", "\u0627\u0644\u0648\u0627\u062d\u062f\u0629", "\u0627\u0644\u062b\u0627\u0646\u064a\u0629", "\u0627\u0644\u062b\u0627\u0644\u062b\u0629", "\u0627\u0644\u0631\u0627\u0628\u0639\u0629", "\u0627\u0644\u062e\u0627\u0645\u0633\u0629", "\u0627\u0644\u0633\u0627\u062f\u0633\u0629", "\u0627\u0644\u0633\u0627\u0628\u0639\u0629", "\u0627\u0644\u062b\u0627\u0645\u0646\u0629", "\u0627\u0644\u062a\u0627\u0633\u0639\u0629", "\u0627\u0644\u0639\u0627\u0634\u0631\u0629", "\u0627\u0644\u062d\u0627\u062f\u064a\u0629 \u0639\u0634\u0631\u0629", "\u0627\u0644\u062b\u0627\u0646\u064a\u0629 \u0639\u0634\u0631\u0629"];
  function hrW(h) { return hw[h % 12 || 12]; }
  function snap(m) {
    if (m <= 7)  return { base: 0,  off: m };
    if (m <= 22) return { base: 15, off: m - 15 };
    if (m <= 37) return { base: 30, off: m - 30 };
    if (m <= 52) return { base: 45, off: m - 45 };
    return { base: 60, off: m - 60 };
  }
  function extra(off) {
    if (off === 0) return "";
    return (off > 0 ? "+" : "") + off + " \u062f\u0642\u064a\u0642\u0629";
  }
  return {
    name: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629", flag: "\ud83c\uddf8\ud83c\udde6",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      if (s.base === 0)       main = "\u0627\u0644\u0633\u0627\u0639\u0629 " + hrW(h);
      else if (s.base === 15) main = "\u0627\u0644\u0633\u0627\u0639\u0629 " + hrW(h) + " \u0648\u0627\u0644\u0631\u0628\u0639";
      else if (s.base === 30) main = "\u0627\u0644\u0633\u0627\u0639\u0629 " + hrW(h) + " \u0648\u0627\u0644\u0646\u0635\u0641";
      else if (s.base === 45) main = "\u0627\u0644\u0633\u0627\u0639\u0629 " + hrW(nH) + " \u0625\u0644\u0627 \u0631\u0628\u0639";
      else                    main = "\u0627\u0644\u0633\u0627\u0639\u0629 " + hrW(nH);
      return { main: main, extra: extra(s.off) };
    }
  };
})());
