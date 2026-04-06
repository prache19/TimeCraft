// \u09ac\u09be\u0982\u09b2\u09be (Bengali)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "\u098f\u0995", "\u09a6\u09c1\u0987", "\u09a4\u09bf\u09a8", "\u099a\u09be\u09b0", "\u09aa\u09be\u0981\u099a", "\u099b\u09af\u09bc", "\u09b8\u09be\u09a4", "\u0986\u099f", "\u09a8\u09af\u09bc", "\u09a6\u09b6", "\u098f\u0997\u09be\u09b0\u09cb", "\u09ac\u09be\u09b0\u09cb"];
  function hw(h) { return ones[h % 12 || 12]; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    return "+" + off + " \u09ae\u09bf\u09a8\u09bf\u099f";
  }
  return {
    name: "\u09ac\u09be\u0982\u09b2\u09be", flag: "\ud83c\udde7\ud83c\udde9",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = hw(h) + "\u099f\u09be \u09ac\u09be\u099c\u09c7"; break;
        case 5:  main = hw(h) + "\u099f\u09be \u09ac\u09c7\u099c\u09c7 \u09aa\u09be\u0981\u099a \u09ae\u09bf\u09a8\u09bf\u099f"; break;
        case 10: main = hw(h) + "\u099f\u09be \u09ac\u09c7\u099c\u09c7 \u09a6\u09b6 \u09ae\u09bf\u09a8\u09bf\u099f"; break;
        case 15: main = "\u09b8\u09cb\u09af\u09bc\u09be " + hw(h) + "\u099f\u09be"; break;
        case 20: main = hw(h) + "\u099f\u09be \u09ac\u09c7\u099c\u09c7 \u0995\u09c1\u09dc\u09bf \u09ae\u09bf\u09a8\u09bf\u099f"; break;
        case 25: main = hw(h) + "\u099f\u09be \u09ac\u09c7\u099c\u09c7 \u09aa\u0981\u099a\u09bf\u09b6 \u09ae\u09bf\u09a8\u09bf\u099f"; break;
        case 30: main = "\u09b8\u09be\u09a1\u09bc\u09c7 " + hw(h) + "\u099f\u09be"; break;
        case 35: main = hw(nH) + "\u099f\u09be \u09ac\u09be\u099c\u09a4\u09c7 \u09aa\u0981\u099a\u09bf\u09b6 \u09ae\u09bf\u09a8\u09bf\u099f"; break;
        case 40: main = hw(nH) + "\u099f\u09be \u09ac\u09be\u099c\u09a4\u09c7 \u0995\u09c1\u09dc\u09bf \u09ae\u09bf\u09a8\u09bf\u099f"; break;
        case 45: main = "\u09aa\u09cc\u09a8\u09c7 " + hw(nH) + "\u099f\u09be"; break;
        case 50: main = hw(nH) + "\u099f\u09be \u09ac\u09be\u099c\u09a4\u09c7 \u09a6\u09b6 \u09ae\u09bf\u09a8\u09bf\u099f"; break;
        case 55: main = hw(nH) + "\u099f\u09be \u09ac\u09be\u099c\u09a4\u09c7 \u09aa\u09be\u0981\u099a \u09ae\u09bf\u09a8\u09bf\u099f"; break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
