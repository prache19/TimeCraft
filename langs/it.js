// Italiano (Italian)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = [
    "", "una", "due", "tre", "quattro", "cinque", "sei", "sette", "otto", "nove",
    "dieci", "undici", "dodici", "tredici", "quattordici", "quindici", "sedici",
    "diciassette", "diciotto", "diciannove"
  ];
  const tens = ["", "", "venti", "trenta", "quaranta", "cinquanta"];

  function w(n) {
    if (n < 20) return ones[n];
    let t = tens[Math.floor(n / 10)];
    const o = ones[n % 10];
    if (o && (o[0] === "o" || o[0] === "u")) t = t.slice(0, -1);
    return o ? t + o : t;
  }

  return {
    name: "Italiano",
    flag: "\ud83c\uddee\ud83c\uddf9",
    format(h, m) {
      const v = h % 12 || 12;
      const verb = v === 1 ? "\u00c8 l'" : "Sono le ";
      const hr = ones[v] || w(v);
      return verb + hr + (m === 0 ? " in punto" : " e " + w(m));
    }
  };
})());
