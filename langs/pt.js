// Português (Portuguese)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = [
    "", "uma", "duas", "tr\u00eas", "quatro", "cinco", "seis", "sete", "oito", "nove",
    "dez", "onze", "doze", "treze", "catorze", "quinze", "dezesseis",
    "dezessete", "dezoito", "dezenove"
  ];
  const tens = ["", "", "vinte", "trinta", "quarenta", "cinquenta"];

  function w(n) {
    if (n < 20) return ones[n];
    const t = tens[Math.floor(n / 10)];
    const o = ones[n % 10];
    return o ? t + " e " + o : t;
  }

  return {
    name: "Portugu\u00eas",
    flag: "\ud83c\udde7\ud83c\uddf7",
    format(h, m) {
      const v = h % 12 || 12;
      const verb = v === 1 ? "\u00c9" : "S\u00e3o";
      const hr = ones[v] || w(v);
      return verb + " " + hr + (m === 0 ? " em ponto" : " e " + w(m));
    }
  };
})());
