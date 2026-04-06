// Deutsch (German)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "eins", "zwei", "drei", "vier", "f\u00fcnf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zw\u00f6lf"];
  function hw(h) { return ones[h % 12 || 12]; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    if (off === 1) return "+1 Minute";
    return "+" + off + " Minuten";
  }
  return {
    name: "Deutsch", flag: "\ud83c\udde9\ud83c\uddea",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = "Es ist " + hw(h) + " Uhr"; break;
        case 5:  main = "Es ist f\u00fcnf nach " + hw(h); break;
        case 10: main = "Es ist zehn nach " + hw(h); break;
        case 15: main = "Es ist Viertel nach " + hw(h); break;
        case 20: main = "Es ist zwanzig nach " + hw(h); break;
        case 25: main = "Es ist f\u00fcnf vor halb " + hw(nH); break;
        case 30: main = "Es ist halb " + hw(nH); break;
        case 35: main = "Es ist f\u00fcnf nach halb " + hw(nH); break;
        case 40: main = "Es ist zwanzig vor " + hw(nH); break;
        case 45: main = "Es ist Viertel vor " + hw(nH); break;
        case 50: main = "Es ist zehn vor " + hw(nH); break;
        case 55: main = "Es ist f\u00fcnf vor " + hw(nH); break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
