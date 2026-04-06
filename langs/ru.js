// Русский (Russian)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = [
    "", "\u043e\u0434\u0438\u043d", "\u0434\u0432\u0430", "\u0442\u0440\u0438",
    "\u0447\u0435\u0442\u044b\u0440\u0435", "\u043f\u044f\u0442\u044c",
    "\u0448\u0435\u0441\u0442\u044c", "\u0441\u0435\u043c\u044c",
    "\u0432\u043e\u0441\u0435\u043c\u044c", "\u0434\u0435\u0432\u044f\u0442\u044c",
    "\u0434\u0435\u0441\u044f\u0442\u044c", "\u043e\u0434\u0438\u043d\u043d\u0430\u0434\u0446\u0430\u0442\u044c",
    "\u0434\u0432\u0435\u043d\u0430\u0434\u0446\u0430\u0442\u044c",
    "\u0442\u0440\u0438\u043d\u0430\u0434\u0446\u0430\u0442\u044c",
    "\u0447\u0435\u0442\u044b\u0440\u043d\u0430\u0434\u0446\u0430\u0442\u044c",
    "\u043f\u044f\u0442\u043d\u0430\u0434\u0446\u0430\u0442\u044c",
    "\u0448\u0435\u0441\u0442\u043d\u0430\u0434\u0446\u0430\u0442\u044c",
    "\u0441\u0435\u043c\u043d\u0430\u0434\u0446\u0430\u0442\u044c",
    "\u0432\u043e\u0441\u0435\u043c\u043d\u0430\u0434\u0446\u0430\u0442\u044c",
    "\u0434\u0435\u0432\u044f\u0442\u043d\u0430\u0434\u0446\u0430\u0442\u044c"
  ];
  const tens = [
    "", "", "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044c",
    "\u0442\u0440\u0438\u0434\u0446\u0430\u0442\u044c",
    "\u0441\u043e\u0440\u043e\u043a",
    "\u043f\u044f\u0442\u044c\u0434\u0435\u0441\u044f\u0442"
  ];

  function w(n) {
    if (n < 20) return ones[n];
    const t = tens[Math.floor(n / 10)];
    const o = ones[n % 10];
    return o ? t + " " + o : t;
  }

  function hourWord(v) {
    if (v === 1) return "\u0447\u0430\u0441";
    if (v >= 2 && v <= 4) return "\u0447\u0430\u0441\u0430";
    return "\u0447\u0430\u0441\u043e\u0432";
  }

  function minWord(m) {
    if (m % 10 === 1 && m !== 11) return "\u043c\u0438\u043d\u0443\u0442\u0430";
    if (m % 10 >= 2 && m % 10 <= 4 && (m < 10 || m > 20)) return "\u043c\u0438\u043d\u0443\u0442\u044b";
    return "\u043c\u0438\u043d\u0443\u0442";
  }

  return {
    name: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439",
    flag: "\ud83c\uddf7\ud83c\uddfa",
    format(h, m) {
      const v = h % 12 || 12;
      const hr = w(v) + " " + hourWord(v);
      return m === 0 ? hr : hr + " " + w(m) + " " + minWord(m);
    }
  };
})());
