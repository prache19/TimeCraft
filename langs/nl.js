// Nederlands (Dutch)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "een", "twee", "drie", "vier", "vijf", "zes", "zeven", "acht", "negen", "tien", "elf", "twaalf"];
  function hw(h) { return ones[h % 12 || 12]; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    if (off === 1) return "+1 minuut";
    return "+" + off + " minuten";
  }
  return {
    name: "Nederlands", flag: "\ud83c\uddf3\ud83c\uddf1",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = "Het is " + hw(h) + " uur"; break;
        case 5:  main = "Het is vijf over " + hw(h); break;
        case 10: main = "Het is tien over " + hw(h); break;
        case 15: main = "Het is kwart over " + hw(h); break;
        case 20: main = "Het is tien voor half " + hw(nH); break;
        case 25: main = "Het is vijf voor half " + hw(nH); break;
        case 30: main = "Het is half " + hw(nH); break;
        case 35: main = "Het is vijf over half " + hw(nH); break;
        case 40: main = "Het is tien over half " + hw(nH); break;
        case 45: main = "Het is kwart voor " + hw(nH); break;
        case 50: main = "Het is tien voor " + hw(nH); break;
        case 55: main = "Het is vijf voor " + hw(nH); break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
