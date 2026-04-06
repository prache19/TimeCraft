// Italiano (Italian)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "una", "due", "tre", "quattro", "cinque", "sei", "sette", "otto", "nove", "dieci", "undici", "dodici"];
  function hr(h) { return h % 12 || 12; }
  function hw(h) { return ones[hr(h)]; }
  function verb(h) { return hr(h) === 1 ? "\u00c8 l'" : "Sono le "; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    if (off === 1) return "+1 minuto";
    return "+" + off + " minuti";
  }
  return {
    name: "Italiano", flag: "\ud83c\uddee\ud83c\uddf9",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = verb(h) + hw(h) + " in punto"; break;
        case 5:  main = verb(h) + hw(h) + " e cinque"; break;
        case 10: main = verb(h) + hw(h) + " e dieci"; break;
        case 15: main = verb(h) + hw(h) + " e un quarto"; break;
        case 20: main = verb(h) + hw(h) + " e venti"; break;
        case 25: main = verb(h) + hw(h) + " e venticinque"; break;
        case 30: main = verb(h) + hw(h) + " e mezza"; break;
        case 35: main = verb(nH) + hw(nH) + " meno venticinque"; break;
        case 40: main = verb(nH) + hw(nH) + " meno venti"; break;
        case 45: main = verb(nH) + hw(nH) + " meno un quarto"; break;
        case 50: main = verb(nH) + hw(nH) + " meno dieci"; break;
        case 55: main = verb(nH) + hw(nH) + " meno cinque"; break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
