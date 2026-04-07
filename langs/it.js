// Italiano (Italian)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "una", "due", "tre", "quattro", "cinque", "sei", "sette", "otto", "nove", "dieci", "undici", "dodici"];
  function hr(h) { return h % 12 || 12; }
  function hw(h) { return ones[hr(h)]; }
  function verb(h) { return hr(h) === 1 ? "\u00c8 l'" : "Sono le "; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    if (off === 1) return "+1 minuto";
    return "+" + off + " minuti";
  }

  // Word clock grid (11 rows x 13 cols)
  //
  // Index reference:
  // 0123456789012
  //
  // Row  0: È X S O N O L E X L X X X    È(0) SONO(2-5) LE(6-7) L(9)
  // Row  1: E X M E N O I N P U N T O    E(0) MENO(2-5) INPUNTO(6-12)
  // Row  2: V E N T I C I N Q U E X X    VENTICINQUE(0-10)
  // Row  3: C I N Q U E X M E Z Z A X    MCINQUE(0-5) MEZZA(7-11)
  // Row  4: D I E C I U N Q U A R T O    MDIECI(0-4) UNQUARTO(5-12)
  // Row  5: V E N T I X D U E X T R E    VENTI(0-4) DUE(6-8) TRE(10-12)
  // Row  6: U N A X Q U A T T R O X X    UNA(0-2) QUATTRO(4-10)
  // Row  7: C I N Q U E X S E I X L X    HCINQUE(0-5) SEI(7-9)
  // Row  8: S E T T E X O T T O X N Z    SETTE(0-4) OTTO(6-9)
  // Row  9: N O V E X D I E C I X L R    NOVE(0-3) HDIECI(5-9)
  // Row 10: U N D I C I X D O D I C I    UNDICI(0-5) DODICI(7-12)
  const GRID = [
    "ÈXSONOLEXLXXX",
    "EXMENOINPUNTO",
    "VENTICINQUEXX",
    "CINQUEXMEZZAX",
    "DIECIUNQUARTO",
    "VENTIXDUEXTRE",
    "UNAXQUATTROXX",
    "CINQUEXSEIXLX",
    "SETTEXOTTOXNZ",
    "NOVEXDIECIXLR",
    "UNDICIXDODICI",
  ];

  // Named cell ranges: [row, colStart, colEnd] (inclusive)
  const W = {
    È:            [0, 0, 0],
    SONO:         [0, 2, 5],
    LE:           [0, 6, 7],
    L:            [0, 9, 9],
    E:            [1, 0, 0],
    MENO:         [1, 2, 5],
    INPUNTO:      [1, 6, 12],
    VENTICINQUE:  [2, 0, 10],
    MCINQUE:      [3, 0, 5],
    MEZZA:        [3, 7, 11],
    MDIECI:       [4, 0, 4],
    UNQUARTO:     [4, 5, 12],
    VENTI:        [5, 0, 4],
    DUE:          [5, 6, 8],
    TRE:          [5, 10, 12],
    UNA:          [6, 0, 2],
    QUATTRO:      [6, 4, 10],
    HCINQUE:      [7, 0, 5],
    SEI:          [7, 7, 9],
    SETTE:        [8, 0, 4],
    OTTO:         [8, 6, 9],
    NOVE:         [9, 0, 3],
    HDIECI:       [9, 5, 9],
    UNDICI:       [10, 0, 5],
    DODICI:       [10, 7, 12],
  };

  const HOUR_WORDS = {
    1: W.UNA, 2: W.DUE, 3: W.TRE, 4: W.QUATTRO, 5: W.HCINQUE, 6: W.SEI,
    7: W.SETTE, 8: W.OTTO, 9: W.NOVE, 10: W.HDIECI, 11: W.UNDICI, 12: W.DODICI
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
    // Singular: È l'una  vs  Plural: Sono le [X]
    const words = h12 === 1 ? [W.È, W.L] : [W.SONO, W.LE];

    switch (base) {
      case 0:  words.push(W.INPUNTO); break;
      case 5:  words.push(W.E, W.MCINQUE); break;
      case 10: words.push(W.E, W.MDIECI); break;
      case 15: words.push(W.E, W.UNQUARTO); break;
      case 20: words.push(W.E, W.VENTI); break;
      case 25: words.push(W.E, W.VENTICINQUE); break;
      case 30: words.push(W.E, W.MEZZA); break;
      case 35: words.push(W.MENO, W.VENTICINQUE); break;
      case 40: words.push(W.MENO, W.VENTI); break;
      case 45: words.push(W.MENO, W.UNQUARTO); break;
      case 50: words.push(W.MENO, W.MDIECI); break;
      case 55: words.push(W.MENO, W.MCINQUE); break;
    }

    words.push(HOUR_WORDS[h12]);
    return expand(words);
  }

  return {
    name: "Italiano", flag: "\ud83c\uddee\ud83c\uddf9",
    grid: {
      letters: GRID,
      highlight: highlight
    },
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = verb(h) + hw(h) + " in punto"; break;
        case 5:  main = verb(h) + hw(h) + " e cinque"; break;
        case 10: main = verb(h) + hw(h) + " e dieci"; break;
        case 15: main = verb(h) + hw(h) + " e un quarto"; break;
        case 20: main = verb(h) + hw(h) + " e venti"; break;
        case 25: main = verb(h) + hw(h) + " e venticinque"; break;
        case 30: main = verb(h) + hw(h) + " e mezza"; break;
        case 35: main = verb(nH) + hw(nH) + " meno venticinque"; break;
        case 40: main = verb(nH) + hw(nH) + " meno venti"; break;
        case 45: main = verb(nH) + hw(nH) + " meno un quarto"; break;
        case 50: main = verb(nH) + hw(nH) + " meno dieci"; break;
        case 55: main = verb(nH) + hw(nH) + " meno cinque"; break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
