// \u0627\u0644\u0639\u0631\u0628\u064a\u0629 (Arabic)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const hw = ["", "\u0627\u0644\u0648\u0627\u062d\u062f\u0629", "\u0627\u0644\u062b\u0627\u0646\u064a\u0629", "\u0627\u0644\u062b\u0627\u0644\u062b\u0629", "\u0627\u0644\u0631\u0627\u0628\u0639\u0629", "\u0627\u0644\u062e\u0627\u0645\u0633\u0629", "\u0627\u0644\u0633\u0627\u062f\u0633\u0629", "\u0627\u0644\u0633\u0627\u0628\u0639\u0629", "\u0627\u0644\u062b\u0627\u0645\u0646\u0629", "\u0627\u0644\u062a\u0627\u0633\u0639\u0629", "\u0627\u0644\u0639\u0627\u0634\u0631\u0629", "\u0627\u0644\u062d\u0627\u062f\u064a\u0629 \u0639\u0634\u0631\u0629", "\u0627\u0644\u062b\u0627\u0646\u064a\u0629 \u0639\u0634\u0631\u0629"];
  function hrW(h) { return hw[h % 12 || 12]; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    return "+" + off + " \u062f\u0642\u064a\u0642\u0629";
  }
  return {
    name: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629", flag: "\ud83c\uddf8\ud83c\udde6",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = "\u0627\u0644\u0633\u0627\u0639\u0629 " + hrW(h); break;
        case 5:  main = "\u0627\u0644\u0633\u0627\u0639\u0629 " + hrW(h) + " \u0648\u062e\u0645\u0633 \u062f\u0642\u0627\u0626\u0642"; break;
        case 10: main = "\u0627\u0644\u0633\u0627\u0639\u0629 " + hrW(h) + " \u0648\u0639\u0634\u0631 \u062f\u0642\u0627\u0626\u0642"; break;
        case 15: main = "\u0627\u0644\u0633\u0627\u0639\u0629 " + hrW(h) + " \u0648\u0627\u0644\u0631\u0628\u0639"; break;
        case 20: main = "\u0627\u0644\u0633\u0627\u0639\u0629 " + hrW(h) + " \u0648\u0639\u0634\u0631\u0648\u0646 \u062f\u0642\u064a\u0642\u0629"; break;
        case 25: main = "\u0627\u0644\u0633\u0627\u0639\u0629 " + hrW(h) + " \u0648\u062e\u0645\u0633 \u0648\u0639\u0634\u0631\u0648\u0646 \u062f\u0642\u064a\u0642\u0629"; break;
        case 30: main = "\u0627\u0644\u0633\u0627\u0639\u0629 " + hrW(h) + " \u0648\u0627\u0644\u0646\u0635\u0641"; break;
        case 35: main = "\u0627\u0644\u0633\u0627\u0639\u0629 " + hrW(nH) + " \u0625\u0644\u0627 \u062e\u0645\u0633 \u0648\u0639\u0634\u0631\u0648\u0646 \u062f\u0642\u064a\u0642\u0629"; break;
        case 40: main = "\u0627\u0644\u0633\u0627\u0639\u0629 " + hrW(nH) + " \u0625\u0644\u0627 \u0639\u0634\u0631\u0648\u0646 \u062f\u0642\u064a\u0642\u0629"; break;
        case 45: main = "\u0627\u0644\u0633\u0627\u0639\u0629 " + hrW(nH) + " \u0625\u0644\u0627 \u0631\u0628\u0639"; break;
        case 50: main = "\u0627\u0644\u0633\u0627\u0639\u0629 " + hrW(nH) + " \u0625\u0644\u0627 \u0639\u0634\u0631 \u062f\u0642\u0627\u0626\u0642"; break;
        case 55: main = "\u0627\u0644\u0633\u0627\u0639\u0629 " + hrW(nH) + " \u0625\u0644\u0627 \u062e\u0645\u0633 \u062f\u0642\u0627\u0626\u0642"; break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
