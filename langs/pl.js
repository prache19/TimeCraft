// Polski (Polish)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "pierwsza", "druga", "trzecia", "czwarta", "pi\u0105ta", "sz\u00f3sta", "si\u00f3dma", "\u00f3sma", "dziewi\u0105ta", "dziesi\u0105ta", "jedenasta", "dwunasta"];
  function hw(h) { return ones[h % 12 || 12]; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    if (off === 1) return "+1 minuta";
    return "+" + off + " minut";
  }
  return {
    name: "Polski", flag: "\ud83c\uddf5\ud83c\uddf1",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = "Jest " + hw(h); break;
        case 5:  main = "Jest pi\u0119\u0107 po " + hw(h); break;
        case 10: main = "Jest dziesi\u0119\u0107 po " + hw(h); break;
        case 15: main = "Jest kwadrans po " + hw(h); break;
        case 20: main = "Jest dwadzie\u015bcia po " + hw(h); break;
        case 25: main = "Jest dwadzie\u015bcia pi\u0119\u0107 po " + hw(h); break;
        case 30: main = "Jest w p\u00f3\u0142 do " + hw(nH); break;
        case 35: main = "Jest za dwadzie\u015bcia pi\u0119\u0107 " + hw(nH); break;
        case 40: main = "Jest za dwadzie\u015bcia " + hw(nH); break;
        case 45: main = "Jest za kwadrans " + hw(nH); break;
        case 50: main = "Jest za dziesi\u0119\u0107 " + hw(nH); break;
        case 55: main = "Jest za pi\u0119\u0107 " + hw(nH); break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
