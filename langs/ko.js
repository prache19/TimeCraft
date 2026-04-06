// 한국어 (Korean)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const hn = ["", "\ud55c", "\ub450", "\uc138", "\ub124", "\ub2e4\uc12f", "\uc5ec\uc12f", "\uc77c\uacf1", "\uc5ec\ub35f", "\uc544\ud649", "\uc5f4", "\uc5f4\ud55c", "\uc5f4\ub450"];
  function hw(h) { return hn[h % 12 || 12]; }
  function snap(m) {
    if (m <= 7)  return { base: 0,  off: m };
    if (m <= 22) return { base: 15, off: m - 15 };
    if (m <= 37) return { base: 30, off: m - 30 };
    if (m <= 52) return { base: 45, off: m - 45 };
    return { base: 60, off: m - 60 };
  }
  function extra(off) {
    if (off === 0) return "";
    return (off > 0 ? "+" : "") + off + " \ubd84";
  }
  return {
    name: "\ud55c\uad6d\uc5b4", flag: "\ud83c\uddf0\ud83c\uddf7",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      if (s.base === 0)       main = hw(h) + " \uc2dc \uc815\uac01";
      else if (s.base === 15) main = hw(h) + " \uc2dc \uc2ed\uc624 \ubd84";
      else if (s.base === 30) main = hw(h) + " \uc2dc \ubc18";
      else if (s.base === 45) main = hw(nH) + " \uc2dc \uc2ed\uc624 \ubd84 \uc804";
      else                    main = hw(nH) + " \uc2dc \uc815\uac01";
      return { main: main, extra: extra(s.off) };
    }
  };
})());
