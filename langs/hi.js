// \u0939\u093f\u0928\u094d\u0926\u0940 (Hindi)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "\u090f\u0915", "\u0926\u094b", "\u0924\u0940\u0928", "\u091a\u093e\u0930", "\u092a\u093e\u0901\u091a", "\u091b\u0939", "\u0938\u093e\u0924", "\u0906\u0920", "\u0928\u094c", "\u0926\u0938", "\u0917\u094d\u092f\u093e\u0930\u0939", "\u092c\u093e\u0930\u0939"];
  function hw(h) { return ones[h % 12 || 12]; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    return "+" + off + " \u092e\u0940\u0928\u093f\u091f";
  }
  return {
    name: "\u0939\u093f\u0928\u094d\u0926\u0940", flag: "\ud83c\uddee\ud83c\uddf3",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = hw(h) + " \u092c\u091c\u0947 \u0939\u0948\u0902"; break;
        case 5:  main = hw(h) + " \u092c\u091c\u0915\u0930 \u092a\u093e\u0901\u091a \u092e\u0940\u0928\u093f\u091f"; break;
        case 10: main = hw(h) + " \u092c\u091c\u0915\u0930 \u0926\u0938 \u092e\u0940\u0928\u093f\u091f"; break;
        case 15: main = "\u0938\u0935\u093e " + hw(h) + " \u092c\u091c\u0947 \u0939\u0948\u0902"; break;
        case 20: main = hw(h) + " \u092c\u091c\u0915\u0930 \u092c\u0940\u0938 \u092e\u0940\u0928\u093f\u091f"; break;
        case 25: main = hw(h) + " \u092c\u091c\u0915\u0930 \u092a\u091a\u094d\u091a\u0940\u0938 \u092e\u0940\u0928\u093f\u091f"; break;
        case 30: main = "\u0938\u093e\u0922\u093c\u0947 " + hw(h) + " \u092c\u091c\u0947 \u0939\u0948\u0902"; break;
        case 35: main = hw(nH) + " \u092c\u091c\u0928\u0947 \u092e\u0947\u0902 \u092a\u091a\u094d\u091a\u0940\u0938 \u092e\u0940\u0928\u093f\u091f"; break;
        case 40: main = hw(nH) + " \u092c\u091c\u0928\u0947 \u092e\u0947\u0902 \u092c\u0940\u0938 \u092e\u0940\u0928\u093f\u091f"; break;
        case 45: main = "\u092a\u094c\u0928\u0947 " + hw(nH) + " \u092c\u091c\u0947 \u0939\u0948\u0902"; break;
        case 50: main = hw(nH) + " \u092c\u091c\u0928\u0947 \u092e\u0947\u0902 \u0926\u0938 \u092e\u0940\u0928\u093f\u091f"; break;
        case 55: main = hw(nH) + " \u092c\u091c\u0928\u0947 \u092e\u0947\u0902 \u092a\u093e\u0901\u091a \u092e\u0940\u0928\u093f\u091f"; break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
