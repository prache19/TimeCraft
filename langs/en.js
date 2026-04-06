// English
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = [
    "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve"
  ];

  function hourWord(h) { return ones[h % 12 || 12]; }

  // snap to nearest landmark: 0, 15, 30, 45, 60
  function snap(m) {
    if (m <= 7)  return { base: 0,  off: m };
    if (m <= 22) return { base: 15, off: m - 15 };
    if (m <= 37) return { base: 30, off: m - 30 };
    if (m <= 52) return { base: 45, off: m - 45 };
    return { base: 60, off: m - 60 };
  }

  function extraText(off) {
    if (off === 0) return "";
    if (off === 1 || off === -1) return (off > 0 ? "+" : "") + off + " minute";
    return (off > 0 ? "+" : "") + off + " minutes";
  }

  return {
    name: "English",
    flag: "\ud83c\uddec\ud83c\udde7",
    format(h, m) {
      const s = snap(m);
      const nextH = (h + 1) % 24;
      let main;
      if (s.base === 0)       main = "It is " + hourWord(h) + " o\u2019clock";
      else if (s.base === 15) main = "It is quarter past " + hourWord(h);
      else if (s.base === 30) main = "It is half past " + hourWord(h);
      else if (s.base === 45) main = "It is quarter to " + hourWord(nextH);
      else                    main = "It is " + hourWord(nextH) + " o\u2019clock";
      return { main: main, extra: extraText(s.off) };
    }
  };
})());
