// Indonesia (Indonesian)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas", "dua belas"];
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
    return (off > 0 ? "+" : "") + off + " menit";
  }
  return {
    name: "Indonesia", flag: "\ud83c\uddee\ud83c\udde9",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      if (s.base === 0)       main = "Pukul " + hw(h) + " tepat";
      else if (s.base === 15) main = "Pukul " + hw(h) + " seperempat";
      else if (s.base === 30) main = "Pukul setengah " + hw(nH);
      else if (s.base === 45) main = "Pukul " + hw(nH) + " kurang seperempat";
      else                    main = "Pukul " + hw(nH) + " tepat";
      return { main: main, extra: extra(s.off) };
    }
  };
})());
