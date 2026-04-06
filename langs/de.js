// Deutsch (German)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = [
    "", "eins", "zwei", "drei", "vier", "f\u00fcnf", "sechs", "sieben", "acht", "neun",
    "zehn", "elf", "zw\u00f6lf", "dreizehn", "vierzehn", "f\u00fcnfzehn", "sechzehn",
    "siebzehn", "achtzehn", "neunzehn"
  ];
  const tens = ["", "", "zwanzig", "drei\u00dfig", "vierzig", "f\u00fcnfzig"];

  function w(n) {
    if (n < 20) return ones[n];
    const t = tens[Math.floor(n / 10)];
    const o = ones[n % 10];
    return o ? o + "und" + t : t;
  }

  return {
    name: "Deutsch",
    flag: "\ud83c\udde9\ud83c\uddea",
    format(h, m) {
      const hr = ones[h % 12 || 12] || w(h % 12 || 12);
      return m === 0 ? "Es ist " + hr + " Uhr" : "Es ist " + hr + " Uhr " + w(m);
    }
  };
})());
