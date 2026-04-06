// T\u00fcrk\u00e7e (Turkish)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "bir", "iki", "\u00fc\u00e7", "d\u00f6rt", "be\u015f", "alt\u0131", "yedi", "sekiz", "dokuz", "on", "on bir", "on iki"];
  function hw(h) { return ones[h % 12 || 12]; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    return "+" + off + " dakika";
  }
  return {
    name: "T\u00fcrk\u00e7e", flag: "\ud83c\uddf9\ud83c\uddf7",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = "Saat " + hw(h); break;
        case 5:  main = "Saat " + hw(h) + "'i be\u015f ge\u00e7iyor"; break;
        case 10: main = "Saat " + hw(h) + "'i on ge\u00e7iyor"; break;
        case 15: main = "Saat " + hw(h) + "'i \u00e7eyre\u011fi ge\u00e7iyor"; break;
        case 20: main = "Saat " + hw(h) + "'i yirmi ge\u00e7iyor"; break;
        case 25: main = "Saat " + hw(h) + "'i yirmi be\u015f ge\u00e7iyor"; break;
        case 30: main = "Saat " + hw(h) + " bu\u00e7uk"; break;
        case 35: main = "Saat " + hw(nH) + "'e yirmi be\u015f var"; break;
        case 40: main = "Saat " + hw(nH) + "'e yirmi var"; break;
        case 45: main = "Saat " + hw(nH) + "'e \u00e7eyrek var"; break;
        case 50: main = "Saat " + hw(nH) + "'e on var"; break;
        case 55: main = "Saat " + hw(nH) + "'e be\u015f var"; break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
