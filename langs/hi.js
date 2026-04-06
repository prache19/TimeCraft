// हिन्दी (Hindi)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "\u090f\u0915", "\u0926\u094b", "\u0924\u0940\u0928", "\u091a\u093e\u0930", "\u092a\u093e\u0901\u091a", "\u091b\u0939", "\u0938\u093e\u0924", "\u0906\u0920", "\u0928\u094c", "\u0926\u0938", "\u0917\u094d\u092f\u093e\u0930\u0939", "\u092c\u093e\u0930\u0939"];
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
    return (off > 0 ? "+" : "") + off + " \u092e\u0940\u0928\u093f\u091f";
  }
  return {
    name: "\u0939\u093f\u0928\u094d\u0926\u0940", flag: "\ud83c\uddee\ud83c\uddf3",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      if (s.base === 0)       main = hw(h) + " \u092c\u091c\u0947 \u0939\u0948\u0902";
      else if (s.base === 15) main = "\u0938\u0935\u093e " + hw(h) + " \u092c\u091c\u0947 \u0939\u0948\u0902";
      else if (s.base === 30) main = "\u0938\u093e\u0922\u093c\u0947 " + hw(h) + " \u092c\u091c\u0947 \u0939\u0948\u0902";
      else if (s.base === 45) main = "\u092a\u094c\u0928\u0947 " + hw(nH) + " \u092c\u091c\u0947 \u0939\u0948\u0902";
      else                    main = hw(nH) + " \u092c\u091c\u0947 \u0939\u0948\u0902";
      return { main: main, extra: extra(s.off) };
    }
  };
})());
