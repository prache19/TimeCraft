// \u0420\u0443\u0441\u0441\u043a\u0438\u0439 (Russian)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "\u043e\u0434\u0438\u043d", "\u0434\u0432\u0430", "\u0442\u0440\u0438", "\u0447\u0435\u0442\u044b\u0440\u0435", "\u043f\u044f\u0442\u044c", "\u0448\u0435\u0441\u0442\u044c", "\u0441\u0435\u043c\u044c", "\u0432\u043e\u0441\u0435\u043c\u044c", "\u0434\u0435\u0432\u044f\u0442\u044c", "\u0434\u0435\u0441\u044f\u0442\u044c", "\u043e\u0434\u0438\u043d\u043d\u0430\u0434\u0446\u0430\u0442\u044c", "\u0434\u0432\u0435\u043d\u0430\u0434\u0446\u0430\u0442\u044c"];
  function hw(h) { return ones[h % 12 || 12]; }
  function hourWord(v) { return v === 1 ? "\u0447\u0430\u0441" : v >= 2 && v <= 4 ? "\u0447\u0430\u0441\u0430" : "\u0447\u0430\u0441\u043e\u0432"; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    return "+" + off + " \u043c\u0438\u043d\u0443\u0442";
  }
  return {
    name: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439", flag: "\ud83c\uddf7\ud83c\uddfa",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24, v = h % 12 || 12, vN = nH % 12 || 12;
      let main;
      switch (s.base) {
        case 0:  main = hw(h) + " " + hourWord(v); break;
        case 5:  main = "\u043f\u044f\u0442\u044c \u043c\u0438\u043d\u0443\u0442 " + hw(h); break;
        case 10: main = "\u0434\u0435\u0441\u044f\u0442\u044c \u043c\u0438\u043d\u0443\u0442 " + hw(h); break;
        case 15: main = "\u0447\u0435\u0442\u0432\u0435\u0440\u0442\u044c " + hw(h); break;
        case 20: main = "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044c \u043c\u0438\u043d\u0443\u0442 " + hw(h); break;
        case 25: main = "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044c \u043f\u044f\u0442\u044c \u043c\u0438\u043d\u0443\u0442 " + hw(h); break;
        case 30: main = "\u043f\u043e\u043b\u043e\u0432\u0438\u043d\u0430 " + hw(h); break;
        case 35: main = "\u0431\u0435\u0437 \u0434\u0432\u0430\u0434\u0446\u0430\u0442\u0438 \u043f\u044f\u0442\u0438 " + hw(nH); break;
        case 40: main = "\u0431\u0435\u0437 \u0434\u0432\u0430\u0434\u0446\u0430\u0442\u0438 " + hw(nH); break;
        case 45: main = "\u0431\u0435\u0437 \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u0438 " + hw(nH); break;
        case 50: main = "\u0431\u0435\u0437 \u0434\u0435\u0441\u044f\u0442\u0438 " + hw(nH); break;
        case 55: main = "\u0431\u0435\u0437 \u043f\u044f\u0442\u0438 " + hw(nH); break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
