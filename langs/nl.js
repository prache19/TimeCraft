// Nederlands (Dutch)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "een", "twee", "drie", "vier", "vijf", "zes", "zeven", "acht", "negen", "tien", "elf", "twaalf"];
  function hw(h) { return ones[h % 12 || 12]; }
  function snap(m) {
    if (m <= 7)  return { base: 0,  off: m };
    if (m <= 22) return { base: 15, off: m - 15 };
    if (m <= 37) return { base: 30, off: m - 30 };
    if (m <= 52) return { base: 45, off: m - 45 };
    return { base: 60, off: m - 60 };
  }
  function extra(off) {
    if (off === 0) return "";
    if (off === 1 || off === -1) return (off > 0 ? "+" : "") + off + " minuut";
    return (off > 0 ? "+" : "") + off + " minuten";
  }
  return {
    name: "Nederlands", flag: "\ud83c\uddf3\ud83c\uddf1",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      if (s.base === 0)       main = "Het is " + hw(h) + " uur";
      else if (s.base === 15) main = "Het is kwart over " + hw(h);
      else if (s.base === 30) main = "Het is half " + hw(nH);
      else if (s.base === 45) main = "Het is kwart voor " + hw(nH);
      else                    main = "Het is " + hw(nH) + " uur";
      return { main: main, extra: extra(s.off) };
    }
  };
})());
