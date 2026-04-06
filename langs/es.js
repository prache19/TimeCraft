// Espa\u00f1ol (Spanish)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "una", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce"];
  function hr(h) { return h % 12 || 12; }
  function hw(h) { return hr(h) === 1 ? "una" : ones[hr(h)]; }
  function verb(h) { return hr(h) === 1 ? "Es la" : "Son las"; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    if (off === 1) return "+1 minuto";
    return "+" + off + " minutos";
  }
  return {
    name: "Espa\u00f1ol", flag: "\ud83c\uddea\ud83c\uddf8",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = verb(h) + " " + hw(h) + " en punto"; break;
        case 5:  main = verb(h) + " " + hw(h) + " y cinco"; break;
        case 10: main = verb(h) + " " + hw(h) + " y diez"; break;
        case 15: main = verb(h) + " " + hw(h) + " y cuarto"; break;
        case 20: main = verb(h) + " " + hw(h) + " y veinte"; break;
        case 25: main = verb(h) + " " + hw(h) + " y veinticinco"; break;
        case 30: main = verb(h) + " " + hw(h) + " y media"; break;
        case 35: main = verb(nH) + " " + hw(nH) + " menos veinticinco"; break;
        case 40: main = verb(nH) + " " + hw(nH) + " menos veinte"; break;
        case 45: main = verb(nH) + " " + hw(nH) + " menos cuarto"; break;
        case 50: main = verb(nH) + " " + hw(nH) + " menos diez"; break;
        case 55: main = verb(nH) + " " + hw(nH) + " menos cinco"; break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
