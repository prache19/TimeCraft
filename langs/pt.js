// Portugu\u00eas (Portuguese)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "uma", "duas", "tr\u00eas", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze"];
  function hr(h) { return h % 12 || 12; }
  function hw(h) { return ones[hr(h)]; }
  function verb(h) { return hr(h) === 1 ? "\u00c9" : "S\u00e3o"; }
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
    name: "Portugu\u00eas", flag: "\ud83c\udde7\ud83c\uddf7",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = verb(h) + " " + hw(h) + " em ponto"; break;
        case 5:  main = verb(h) + " " + hw(h) + " e cinco"; break;
        case 10: main = verb(h) + " " + hw(h) + " e dez"; break;
        case 15: main = verb(h) + " " + hw(h) + " e um quarto"; break;
        case 20: main = verb(h) + " " + hw(h) + " e vinte"; break;
        case 25: main = verb(h) + " " + hw(h) + " e vinte e cinco"; break;
        case 30: main = verb(h) + " " + hw(h) + " e meia"; break;
        case 35: main = "Faltam vinte e cinco para " + hw(nH); break;
        case 40: main = "Faltam vinte para " + hw(nH); break;
        case 45: main = "Falta um quarto para " + hw(nH); break;
        case 50: main = "Faltam dez para " + hw(nH); break;
        case 55: main = "Faltam cinco para " + hw(nH); break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
