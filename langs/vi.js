// Tiếng Việt (Vietnamese)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = [
    "", "m\u1ed9t", "hai", "ba", "b\u1ed1n", "n\u0103m", "s\u00e1u",
    "b\u1ea3y", "t\u00e1m", "ch\u00edn", "m\u01b0\u1eddi",
    "m\u01b0\u1eddi m\u1ed9t", "m\u01b0\u1eddi hai"
  ];

  function w(n) {
    if (n <= 12) return ones[n];
    if (n < 20) return "m\u01b0\u1eddi " + ones[n - 10];
    const t = ones[Math.floor(n / 10)] + " m\u01b0\u01a1i";
    const o = n % 10;
    if (!o) return t;
    if (o === 5) return t + " l\u0103m";
    if (o === 1) return t + " m\u1ed1t";
    return t + " " + ones[o];
  }

  return {
    name: "Ti\u1ebfng Vi\u1ec7t",
    flag: "\ud83c\uddfb\ud83c\uddf3",
    format(h, m) {
      const hr = ones[h % 12 || 12] || w(h % 12 || 12);
      return m === 0 ? hr + " gi\u1edd" : hr + " gi\u1edd " + w(m) + " ph\u00fat";
    }
  };
})());
