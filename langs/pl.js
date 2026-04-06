// Polski (Polish)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = [
    "", "jeden", "dwa", "trzy", "cztery", "pi\u0119\u0107", "sze\u015b\u0107",
    "siedem", "osiem", "dziewi\u0119\u0107", "dziesi\u0119\u0107",
    "jedena\u015bcie", "dwana\u015bcie", "trzyna\u015bcie", "czterna\u015bcie",
    "pi\u0119tna\u015bcie", "szesna\u015bcie", "siedemna\u015bcie",
    "osiemna\u015bcie", "dziewi\u0119tna\u015bcie"
  ];
  const tens = [
    "", "", "dwadzie\u015bcia", "trzydzie\u015bci",
    "czterdzie\u015bci", "pi\u0119\u0107dziesi\u0105t"
  ];

  function w(n) {
    if (n < 20) return ones[n];
    const t = tens[Math.floor(n / 10)];
    const o = ones[n % 10];
    return o ? t + " " + o : t;
  }

  return {
    name: "Polski",
    flag: "\ud83c\uddf5\ud83c\uddf1",
    format(h, m) {
      const hr = ones[h % 12 || 12] || w(h % 12 || 12);
      return m === 0 ? "Jest " + hr : "Jest " + hr + " " + w(m);
    }
  };
})());
