// 中文 (Chinese)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const nums = ["", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341", "\u5341\u4e00", "\u5341\u4e8c"];
  function hw(h) { return nums[h % 12 || 12]; }
  function snap(m) {
    if (m <= 7)  return { base: 0,  off: m };
    if (m <= 22) return { base: 15, off: m - 15 };
    if (m <= 37) return { base: 30, off: m - 30 };
    if (m <= 52) return { base: 45, off: m - 45 };
    return { base: 60, off: m - 60 };
  }
  function extra(off) {
    if (off === 0) return "";
    return (off > 0 ? "+" : "") + off + " \u5206\u949f";
  }
  return {
    name: "\u4e2d\u6587", flag: "\ud83c\udde8\ud83c\uddf3",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      if (s.base === 0)       main = hw(h) + "\u70b9\u6574";
      else if (s.base === 15) main = hw(h) + "\u70b9\u4e00\u523b";
      else if (s.base === 30) main = hw(h) + "\u70b9\u534a";
      else if (s.base === 45) main = hw(nH) + "\u70b9\u5dee\u4e00\u523b";
      else                    main = hw(nH) + "\u70b9\u6574";
      return { main: main, extra: extra(s.off) };
    }
  };
})());
