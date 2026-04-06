// \u65e5\u672c\u8a9e (Japanese)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const nums = ["", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341", "\u5341\u4e00", "\u5341\u4e8c"];
  function hw(h) { return nums[h % 12 || 12]; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    return "+" + off + " \u5206";
  }
  return {
    name: "\u65e5\u672c\u8a9e", flag: "\ud83c\uddef\ud83c\uddf5",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = hw(h) + "\u6642\u3061\u3087\u3046\u3069"; break;
        case 5:  main = hw(h) + "\u6642\u4e94\u5206"; break;
        case 10: main = hw(h) + "\u6642\u5341\u5206"; break;
        case 15: main = hw(h) + "\u6642\u5341\u4e94\u5206"; break;
        case 20: main = hw(h) + "\u6642\u4e8c\u5341\u5206"; break;
        case 25: main = hw(h) + "\u6642\u4e8c\u5341\u4e94\u5206"; break;
        case 30: main = hw(h) + "\u6642\u534a"; break;
        case 35: main = hw(nH) + "\u6642\u4e8c\u5341\u4e94\u5206\u524d"; break;
        case 40: main = hw(nH) + "\u6642\u4e8c\u5341\u5206\u524d"; break;
        case 45: main = hw(nH) + "\u6642\u5341\u4e94\u5206\u524d"; break;
        case 50: main = hw(nH) + "\u6642\u5341\u5206\u524d"; break;
        case 55: main = hw(nH) + "\u6642\u4e94\u5206\u524d"; break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
