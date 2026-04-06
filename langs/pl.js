// Polski (Polish)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "pierwsza", "druga", "trzecia", "czwarta", "pi\u0105ta", "sz\u00f3sta", "si\u00f3dma", "\u00f3sma", "dziewi\u0105ta", "dziesi\u0105ta", "jedenasta", "dwunasta"];
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
    if (off === 1 || off === -1) return (off > 0 ? "+" : "") + off + " minuta";
    return (off > 0 ? "+" : "") + off + " minut";
  }
  return {
    name: "Polski", flag: "\ud83c\uddf5\ud83c\uddf1",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      if (s.base === 0)       main = "Jest " + hw(h);
      else if (s.base === 15) main = "Jest kwadrans po " + hw(h);
      else if (s.base === 30) main = "Jest w p\u00f3\u0142 do " + hw(nH);
      else if (s.base === 45) main = "Jest za kwadrans " + hw(nH);
      else                    main = "Jest " + hw(nH);
      return { main: main, extra: extra(s.off) };
    }
  };
})());
