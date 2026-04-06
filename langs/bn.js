// বাংলা (Bengali)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "\u098f\u0995", "\u09a6\u09c1\u0987", "\u09a4\u09bf\u09a8", "\u099a\u09be\u09b0", "\u09aa\u09be\u0981\u099a", "\u099b\u09af\u09bc", "\u09b8\u09be\u09a4", "\u0986\u099f", "\u09a8\u09af\u09bc", "\u09a6\u09b6", "\u098f\u0997\u09be\u09b0\u09cb", "\u09ac\u09be\u09b0\u09cb"];
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
    return (off > 0 ? "+" : "") + off + " \u09ae\u09bf\u09a8\u09bf\u099f";
  }
  return {
    name: "\u09ac\u09be\u0982\u09b2\u09be", flag: "\ud83c\udde7\ud83c\udde9",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      if (s.base === 0)       main = hw(h) + "\u099f\u09be \u09ac\u09be\u099c\u09c7";
      else if (s.base === 15) main = "\u09b8\u09cb\u09af\u09bc\u09be " + hw(h) + "\u099f\u09be";
      else if (s.base === 30) main = "\u09b8\u09be\u09a1\u09bc\u09c7 " + hw(h) + "\u099f\u09be";
      else if (s.base === 45) main = "\u09aa\u09cc\u09a8\u09c7 " + hw(nH) + "\u099f\u09be";
      else                    main = hw(nH) + "\u099f\u09be \u09ac\u09be\u099c\u09c7";
      return { main: main, extra: extra(s.off) };
    }
  };
})());
