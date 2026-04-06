// Kiswahili (Swahili)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "moja", "mbili", "tatu", "nne", "tano", "sita", "saba", "nane", "tisa", "kumi", "kumi na moja", "kumi na mbili"];
  function swHr(h) { return (((h % 12 || 12) + 6) % 12) || 12; }
  function hw(h) { return ones[swHr(h)]; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    return "+" + off + " dakika";
  }
  return {
    name: "Kiswahili", flag: "\ud83c\uddf9\ud83c\uddff",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = "Saa " + hw(h) + " kamili"; break;
        case 5:  main = "Saa " + hw(h) + " na dakika tano"; break;
        case 10: main = "Saa " + hw(h) + " na dakika kumi"; break;
        case 15: main = "Saa " + hw(h) + " na robo"; break;
        case 20: main = "Saa " + hw(h) + " na dakika ishirini"; break;
        case 25: main = "Saa " + hw(h) + " na dakika ishirini na tano"; break;
        case 30: main = "Saa " + hw(h) + " na nusu"; break;
        case 35: main = "Saa " + hw(nH) + " kasoro dakika ishirini na tano"; break;
        case 40: main = "Saa " + hw(nH) + " kasoro dakika ishirini"; break;
        case 45: main = "Saa " + hw(nH) + " kasorobo"; break;
        case 50: main = "Saa " + hw(nH) + " kasoro dakika kumi"; break;
        case 55: main = "Saa " + hw(nH) + " kasoro dakika tano"; break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
