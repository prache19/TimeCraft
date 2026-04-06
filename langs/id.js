// Indonesia (Indonesian)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = [
    "", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh",
    "delapan", "sembilan", "sepuluh", "sebelas", "dua belas"
  ];

  function w(n) {
    if (n <= 12) return ones[n];
    if (n < 20) return ones[n - 10] + " belas";
    const t = ones[Math.floor(n / 10)] + " puluh";
    const o = n % 10;
    return o ? t + " " + ones[o] : t;
  }

  return {
    name: "Indonesia",
    flag: "\ud83c\uddee\ud83c\udde9",
    format(h, m) {
      const hr = (h % 12 || 12) === 1 ? "satu" : (ones[h % 12 || 12] || w(h % 12 || 12));
      return m === 0 ? "Pukul " + hr + " tepat" : "Pukul " + hr + " lewat " + w(m) + " menit";
    }
  };
})());
