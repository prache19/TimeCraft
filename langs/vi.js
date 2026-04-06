// Ti\u1ebfng Vi\u1ec7t (Vietnamese)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "m\u1ed9t", "hai", "ba", "b\u1ed1n", "n\u0103m", "s\u00e1u", "b\u1ea3y", "t\u00e1m", "ch\u00edn", "m\u01b0\u1eddi", "m\u01b0\u1eddi m\u1ed9t", "m\u01b0\u1eddi hai"];
  function hw(h) { return ones[h % 12 || 12]; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    return "+" + off + " ph\u00fat";
  }
  return {
    name: "Ti\u1ebfng Vi\u1ec7t", flag: "\ud83c\uddfb\ud83c\uddf3",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = hw(h) + " gi\u1edd \u0111\u00fang"; break;
        case 5:  main = hw(h) + " gi\u1edd n\u0103m ph\u00fat"; break;
        case 10: main = hw(h) + " gi\u1edd m\u01b0\u1eddi ph\u00fat"; break;
        case 15: main = hw(h) + " gi\u1edd m\u01b0\u1eddi l\u0103m"; break;
        case 20: main = hw(h) + " gi\u1edd hai m\u01b0\u01a1i ph\u00fat"; break;
        case 25: main = hw(h) + " gi\u1edd hai m\u01b0\u01a1i l\u0103m ph\u00fat"; break;
        case 30: main = hw(h) + " gi\u1edd r\u01b0\u1ee1i"; break;
        case 35: main = hw(nH) + " gi\u1edd k\u00e9m hai m\u01b0\u01a1i l\u0103m"; break;
        case 40: main = hw(nH) + " gi\u1edd k\u00e9m hai m\u01b0\u01a1i"; break;
        case 45: main = hw(nH) + " gi\u1edd k\u00e9m m\u01b0\u1eddi l\u0103m"; break;
        case 50: main = hw(nH) + " gi\u1edd k\u00e9m m\u01b0\u1eddi"; break;
        case 55: main = hw(nH) + " gi\u1edd k\u00e9m n\u0103m"; break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
