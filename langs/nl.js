// Nederlands (Dutch)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = [
    "", "een", "twee", "drie", "vier", "vijf", "zes", "zeven", "acht", "negen",
    "tien", "elf", "twaalf", "dertien", "veertien", "vijftien", "zestien",
    "zeventien", "achttien", "negentien"
  ];
  const tens = ["", "", "twintig", "dertig", "veertig", "vijftig"];

  function w(n) {
    if (n < 20) return ones[n];
    const t = tens[Math.floor(n / 10)];
    const o = ones[n % 10];
    return o ? o + "\u00ebn" + t : t;
  }

  return {
    name: "Nederlands",
    flag: "\ud83c\uddf3\ud83c\uddf1",
    format(h, m) {
      const hr = ones[h % 12 || 12] || w(h % 12 || 12);
      return m === 0 ? "Het is " + hr + " uur" : "Het is " + hr + " uur " + w(m);
    }
  };
})());
