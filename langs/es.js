// Español (Spanish)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = [
    "", "una", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve",
    "diez", "once", "doce", "trece", "catorce", "quince", "diecis\u00e9is",
    "diecisiete", "dieciocho", "diecinueve"
  ];
  const tens = ["", "", "veinte", "treinta", "cuarenta", "cincuenta"];

  function w(n) {
    if (n < 20) return ones[n];
    if (n < 30) return n === 20 ? "veinte" : "veinti" + ones[n - 20];
    const t = tens[Math.floor(n / 10)];
    const o = ones[n % 10];
    return o ? t + " y " + o : t;
  }

  return {
    name: "Espa\u00f1ol",
    flag: "\ud83c\uddea\ud83c\uddf8",
    format(h, m) {
      const v = h % 12 || 12;
      const verb = v === 1 ? "Es la" : "Son las";
      const hr = v === 1 ? "una" : ones[v] || w(v);
      return verb + " " + hr + (m === 0 ? " en punto" : " y " + w(m));
    }
  };
})());
