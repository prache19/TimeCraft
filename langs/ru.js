// Русский (Russian)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "\u043e\u0434\u0438\u043d", "\u0434\u0432\u0430", "\u0442\u0440\u0438", "\u0447\u0435\u0442\u044b\u0440\u0435", "\u043f\u044f\u0442\u044c", "\u0448\u0435\u0441\u0442\u044c", "\u0441\u0435\u043c\u044c", "\u0432\u043e\u0441\u0435\u043c\u044c", "\u0434\u0435\u0432\u044f\u0442\u044c", "\u0434\u0435\u0441\u044f\u0442\u044c", "\u043e\u0434\u0438\u043d\u043d\u0430\u0434\u0446\u0430\u0442\u044c", "\u0434\u0432\u0435\u043d\u0430\u0434\u0446\u0430\u0442\u044c"];
  function hw(h) { return ones[h % 12 || 12]; }
  function hourWord(v) { return v === 1 ? "\u0447\u0430\u0441" : v >= 2 && v <= 4 ? "\u0447\u0430\u0441\u0430" : "\u0447\u0430\u0441\u043e\u0432"; }
  function snap(m) {
    if (m <= 7)  return { base: 0,  off: m };
    if (m <= 22) return { base: 15, off: m - 15 };
    if (m <= 37) return { base: 30, off: m - 30 };
    if (m <= 52) return { base: 45, off: m - 45 };
    return { base: 60, off: m - 60 };
  }
  function extra(off) {
    if (off === 0) return "";
    return (off > 0 ? "+" : "") + off + " \u043c\u0438\u043d\u0443\u0442";
  }
  return {
    name: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439", flag: "\ud83c\uddf7\ud83c\uddfa",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24, v = h % 12 || 12, vN = nH % 12 || 12;
      let main;
      if (s.base === 0)       main = hw(h) + " " + hourWord(v);
      else if (s.base === 15) main = "\u0447\u0435\u0442\u0432\u0435\u0440\u0442\u044c " + hw(h);
      else if (s.base === 30) main = "\u043f\u043e\u043b\u043e\u0432\u0438\u043d\u0430 " + hw(h);
      else if (s.base === 45) main = "\u0431\u0435\u0437 \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u0438 " + hw(nH);
      else                    main = hw(nH) + " " + hourWord(vN);
      return { main: main, extra: extra(s.off) };
    }
  };
})());
