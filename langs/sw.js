// Kiswahili (Swahili)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = [
    "", "moja", "mbili", "tatu", "nne", "tano", "sita", "saba",
    "nane", "tisa", "kumi", "kumi na moja", "kumi na mbili"
  ];
  const tensW = { 2: "ishirini", 3: "thelathini", 4: "arobaini", 5: "hamsini" };

  function w(n) {
    if (n <= 12) return ones[n];
    if (n < 20) return "kumi na " + ones[n - 10];
    const t = tensW[Math.floor(n / 10)];
    const o = n % 10;
    return o ? t + " na " + ones[o] : t;
  }

  return {
    name: "Kiswahili",
    flag: "\ud83c\uddf9\ud83c\uddff",
    format(h, m) {
      // Swahili clock: 7AM = saa moja (subtract 6)
      const sHr = (((h % 12 || 12) + 6) % 12) || 12;
      const hr = ones[sHr] || w(sHr);
      return m === 0 ? "Saa " + hr : "Saa " + hr + " na dakika " + w(m);
    }
  };
})());
