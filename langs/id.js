// Indonesia (Indonesian)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas", "dua belas"];
  function hw(h) { return ones[h % 12 || 12]; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    return "+" + off + " menit";
  }
  return {
    name: "Indonesia", flag: "\ud83c\uddee\ud83c\udde9",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = "Pukul " + hw(h) + " tepat"; break;
        case 5:  main = "Pukul " + hw(h) + " lewat lima menit"; break;
        case 10: main = "Pukul " + hw(h) + " lewat sepuluh menit"; break;
        case 15: main = "Pukul " + hw(h) + " seperempat"; break;
        case 20: main = "Pukul " + hw(h) + " lewat dua puluh menit"; break;
        case 25: main = "Pukul " + hw(h) + " lewat dua puluh lima menit"; break;
        case 30: main = "Pukul setengah " + hw(nH); break;
        case 35: main = "Pukul " + hw(nH) + " kurang dua puluh lima menit"; break;
        case 40: main = "Pukul " + hw(nH) + " kurang dua puluh menit"; break;
        case 45: main = "Pukul " + hw(nH) + " kurang seperempat"; break;
        case 50: main = "Pukul " + hw(nH) + " kurang sepuluh menit"; break;
        case 55: main = "Pukul " + hw(nH) + " kurang lima menit"; break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
