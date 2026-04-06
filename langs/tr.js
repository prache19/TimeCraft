// Türkçe (Turkish)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = [
    "", "bir", "iki", "\u00fc\u00e7", "d\u00f6rt", "be\u015f", "alt\u0131",
    "yedi", "sekiz", "dokuz", "on", "on bir", "on iki", "on \u00fc\u00e7",
    "on d\u00f6rt", "on be\u015f", "on alt\u0131", "on yedi", "on sekiz", "on dokuz"
  ];
  const tens = ["", "", "yirmi", "otuz", "k\u0131rk", "elli"];

  function w(n) {
    if (n < 20) return ones[n];
    const t = tens[Math.floor(n / 10)];
    const o = ones[n % 10];
    return o ? t + " " + o : t;
  }

  return {
    name: "T\u00fcrk\u00e7e",
    flag: "\ud83c\uddf9\ud83c\uddf7",
    format(h, m) {
      const hr = ones[h % 12 || 12] || w(h % 12 || 12);
      return m === 0 ? "Saat " + hr : "Saat " + hr + " " + w(m);
    }
  };
})());
