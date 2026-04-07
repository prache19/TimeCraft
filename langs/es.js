// Español (Spanish)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "una", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce"];
  function hr(h) { return h % 12 || 12; }
  function hw(h) { return hr(h) === 1 ? "una" : ones[hr(h)]; }
  function verb(h) { return hr(h) === 1 ? "Es la" : "Son las"; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    if (off === 1) return "+1 minuto";
    return "+" + off + " minutos";
  }

  // Word clock grid (11 rows x 13 cols)
  //
  // Index reference:
  // 0123456789012
  //
  // Row  0: E S X L A X S O N L A S X    ES(0-1) LA(3-4) SON(6-8) LAS(9-11)
  // Row  1: M E N O S Y E N P U N T O    MENOS(0-4) Y(5) ENPUNTO(6-12)
  // Row  2: V E I N T I C I N C O X B    VEINTICINCO(0-10)
  // Row  3: C I N C O X M E D I A X X    MCINCO(0-4) MEDIA(6-10)
  // Row  4: D I E Z X X C U A R T O X    MDIEZ(0-3) CUARTO(6-11)
  // Row  5: V E I N T E D O C E X G R    VEINTE(0-5) DOCE(6-9)
  // Row  6: U N A X D O S X T R E S X    UNA(0-2) DOS(4-6) TRES(8-11)
  // Row  7: C U A T R O X C I N C O X    CUATRO(0-5) HCINCO(7-11)
  // Row  8: S E I S X S I E T E X N Z    SEIS(0-3) SIETE(5-9)
  // Row  9: O C H O X N U E V E X Y P    OCHO(0-3) NUEVE(5-9)
  // Row 10: D I E Z X X O N C E X X K    HDIEZ(0-3) ONCE(6-9)
  const GRID = [
    "ESXLAXSONLASX",
    "MENOSYENPUNTO",
    "VEINTICINCOXB",
    "CINCOXMEDIAXX",
    "DIEZXXCUARTOX",
    "VEINTEDOCEXGR",
    "UNAXDOSXTRESX",
    "CUATROXCINCOX",
    "SEISXSIETEXNZ",
    "OCHOXNUEVEXYP",
    "DIEZXXONCEXXK",
  ];

  // Named cell ranges: [row, colStart, colEnd] (inclusive)
  const W = {
    ES:           [0, 0, 1],
    LA:           [0, 3, 4],
    SON:          [0, 6, 8],
    LAS:          [0, 9, 11],
    MENOS:        [1, 0, 4],
    Y:            [1, 5, 5],
    ENPUNTO:      [1, 6, 12],
    VEINTICINCO:  [2, 0, 10],
    MCINCO:       [3, 0, 4],
    MEDIA:        [3, 6, 10],
    MDIEZ:        [4, 0, 3],
    CUARTO:       [4, 6, 11],
    VEINTE:       [5, 0, 5],
    DOCE:         [5, 6, 9],
    UNA:          [6, 0, 2],
    DOS:          [6, 4, 6],
    TRES:         [6, 8, 11],
    CUATRO:       [7, 0, 5],
    HCINCO:       [7, 7, 11],
    SEIS:         [8, 0, 3],
    SIETE:        [8, 5, 9],
    OCHO:         [9, 0, 3],
    NUEVE:        [9, 5, 9],
    HDIEZ:        [10, 0, 3],
    ONCE:         [10, 6, 9],
  };

  const HOUR_WORDS = {
    1: W.UNA, 2: W.DOS, 3: W.TRES, 4: W.CUATRO, 5: W.HCINCO, 6: W.SEIS,
    7: W.SIETE, 8: W.OCHO, 9: W.NUEVE, 10: W.HDIEZ, 11: W.ONCE, 12: W.DOCE
  };

  function expand(ranges) {
    const cells = [];
    for (const r of ranges) {
      for (let c = r[1]; c <= r[2]; c++) cells.push([r[0], c]);
    }
    return cells;
  }

  function highlight(h, m) {
    const base = Math.floor(m / 5) * 5;
    const hourFor = base >= 35 ? (h + 1) % 24 : h;
    const h12 = hourFor % 12 || 12;
    // Singular (Es la) vs plural (Son las)
    const words = h12 === 1 ? [W.ES, W.LA] : [W.SON, W.LAS];

    switch (base) {
      case 0:  words.push(W.ENPUNTO); break;
      case 5:  words.push(W.Y, W.MCINCO); break;
      case 10: words.push(W.Y, W.MDIEZ); break;
      case 15: words.push(W.Y, W.CUARTO); break;
      case 20: words.push(W.Y, W.VEINTE); break;
      case 25: words.push(W.Y, W.VEINTICINCO); break;
      case 30: words.push(W.Y, W.MEDIA); break;
      case 35: words.push(W.MENOS, W.VEINTICINCO); break;
      case 40: words.push(W.MENOS, W.VEINTE); break;
      case 45: words.push(W.MENOS, W.CUARTO); break;
      case 50: words.push(W.MENOS, W.MDIEZ); break;
      case 55: words.push(W.MENOS, W.MCINCO); break;
    }

    words.push(HOUR_WORDS[h12]);
    return expand(words);
  }

  return {
    name: "Español", flag: "\ud83c\uddea\ud83c\uddf8",
    grid: {
      letters: GRID,
      highlight: highlight
    },
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = verb(h) + " " + hw(h) + " en punto"; break;
        case 5:  main = verb(h) + " " + hw(h) + " y cinco"; break;
        case 10: main = verb(h) + " " + hw(h) + " y diez"; break;
        case 15: main = verb(h) + " " + hw(h) + " y cuarto"; break;
        case 20: main = verb(h) + " " + hw(h) + " y veinte"; break;
        case 25: main = verb(h) + " " + hw(h) + " y veinticinco"; break;
        case 30: main = verb(h) + " " + hw(h) + " y media"; break;
        case 35: main = verb(nH) + " " + hw(nH) + " menos veinticinco"; break;
        case 40: main = verb(nH) + " " + hw(nH) + " menos veinte"; break;
        case 45: main = verb(nH) + " " + hw(nH) + " menos cuarto"; break;
        case 50: main = verb(nH) + " " + hw(nH) + " menos diez"; break;
        case 55: main = verb(nH) + " " + hw(nH) + " menos cinco"; break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
