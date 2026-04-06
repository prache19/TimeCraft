// Français (French)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = [
    "", "une", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf",
    "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize",
    "dix-sept", "dix-huit", "dix-neuf"
  ];
  const tens = ["", "", "vingt", "trente", "quarante", "cinquante"];

  function w(n) {
    if (n < 20) return ones[n];
    const t = tens[Math.floor(n / 10)];
    const o = ones[n % 10];
    if (n % 10 === 1) return t + " et une";
    return o ? t + "-" + o : t;
  }

  return {
    name: "Fran\u00e7ais",
    flag: "\ud83c\uddeb\ud83c\uddf7",
    format(h, m) {
      const hr = h % 24;
      const hrW = hr === 0 ? "minuit"
        : hr === 1 ? "une heure"
        : (hr < 20 ? ones[hr] : w(hr)) + " heures";
      return m === 0 ? "Il est " + hrW : "Il est " + hrW + " " + w(m);
    }
  };
})());
