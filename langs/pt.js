// Português (Portuguese)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "uma", "duas", "tr\u00eas", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze"];
  function hr(h) { return h % 12 || 12; }
  function hw(h) { return ones[hr(h)]; }
  function verb(h) { return hr(h) === 1 ? "\u00c9" : "S\u00e3o"; }
  function snap(m) {
    if (m <= 7)  return { base: 0,  off: m };
    if (m <= 22) return { base: 15, off: m - 15 };
    if (m <= 37) return { base: 30, off: m - 30 };
    if (m <= 52) return { base: 45, off: m - 45 };
    return { base: 60, off: m - 60 };
  }
  function extra(off) {
    if (off === 0) return "";
    if (off === 1 || off === -1) return (off > 0 ? "+" : "") + off + " minuto";
    return (off > 0 ? "+" : "") + off + " minutos";
  }
  return {
    name: "Portugu\u00eas", flag: "\ud83c\udde7\ud83c\uddf7",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      if (s.base === 0)       main = verb(h) + " " + hw(h) + " em ponto";
      else if (s.base === 15) main = verb(h) + " " + hw(h) + " e um quarto";
      else if (s.base === 30) main = verb(h) + " " + hw(h) + " e meia";
      else if (s.base === 45) main = "Falta um quarto para " + hw(nH);
      else                    main = verb(nH) + " " + hw(nH) + " em ponto";
      return { main: main, extra: extra(s.off) };
    }
  };
})());
