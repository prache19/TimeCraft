// \ud55c\uad6d\uc5b4 (Korean)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const hn = ["", "\ud55c", "\ub450", "\uc138", "\ub124", "\ub2e4\uc12f", "\uc5ec\uc12f", "\uc77c\uacf1", "\uc5ec\ub35f", "\uc544\ud649", "\uc5f4", "\uc5f4\ud55c", "\uc5f4\ub450"];
  function hw(h) { return hn[h % 12 || 12]; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    return "+" + off + " \ubd84";
  }
  return {
    name: "\ud55c\uad6d\uc5b4", flag: "\ud83c\uddf0\ud83c\uddf7",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = hw(h) + " \uc2dc \uc815\uac01"; break;
        case 5:  main = hw(h) + " \uc2dc \uc624 \ubd84"; break;
        case 10: main = hw(h) + " \uc2dc \uc2ed \ubd84"; break;
        case 15: main = hw(h) + " \uc2dc \uc2ed\uc624 \ubd84"; break;
        case 20: main = hw(h) + " \uc2dc \uc774\uc2ed \ubd84"; break;
        case 25: main = hw(h) + " \uc2dc \uc774\uc2ed\uc624 \ubd84"; break;
        case 30: main = hw(h) + " \uc2dc \ubc18"; break;
        case 35: main = hw(nH) + " \uc2dc \uc774\uc2ed\uc624 \ubd84 \uc804"; break;
        case 40: main = hw(nH) + " \uc2dc \uc774\uc2ed \ubd84 \uc804"; break;
        case 45: main = hw(nH) + " \uc2dc \uc2ed\uc624 \ubd84 \uc804"; break;
        case 50: main = hw(nH) + " \uc2dc \uc2ed \ubd84 \uc804"; break;
        case 55: main = hw(nH) + " \uc2dc \uc624 \ubd84 \uc804"; break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
