// Français (French)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "une", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf",
    "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize",
    "dix-sept", "dix-huit", "dix-neuf", "vingt", "vingt et une", "vingt-deux", "vingt-trois"];
  function hrW(h) {
    const v = h % 24;
    if (v === 0) return "minuit";
    if (v === 1) return "une heure";
    return ones[v] + " heures";
  }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    if (off === 1) return "+1 minute";
    return "+" + off + " minutes";
  }

  // Word clock grid (9 rows x 13 cols)
  // Uses 12-hour cycle for grid display.
  //
  // Index reference:
  // 0123456789012
  //
  // Row 0: I L X E S T X H E U R E S    IL(0-1) EST(3-5) HEURES(7-12)
  // Row 1: M O I N S E T X D E M I E    MOINS(0-4) ET(5-6) DEMIE(8-12)
  // Row 2: V I N G T X C I N Q X X X    VINGT(0-4) MCINQ(6-9)
  // Row 3: L E Q U A R T X D I X X X    LEQUART(0-6): LE(0-1)+QUART(2-6)  MDIX(8-10)
  // Row 4: U N E X D E U X T R O I S    UNE(0-2) DEUX(4-7) TROIS(8-12)
  // Row 5: Q U A T R E X C I N Q X X    QUATRE(0-5) HCINQ(7-10)
  // Row 6: S I X X S E P T X H U I T    SIX(0-2) SEPT(4-7) HUIT(9-12)
  // Row 7: N E U F X D I X X O N Z E    NEUF(0-3) HDIX(5-7) ONZE(9-12)
  // Row 8: D O U Z E X H E U R E X X    DOUZE(0-4) HEURE(6-10)
  const GRID = [
    "ILXESTXHEURES",
    "MOINSETXDEMIE",
    "VINGTXCINQXXX",
    "LEQUARTXDIXXX",
    "UNEXDEUXTROIS",
    "QUATREXCINQXX",
    "SIXXSEPTXHUIT",
    "NEUFXDIXXONZE",
    "DOUZEXHEUREXV",
  ];

  // Named cell ranges: [row, colStart, colEnd] (inclusive)
  const W = {
    IL:       [0, 0, 1],
    EST:      [0, 3, 5],
    HEURES:   [0, 7, 12],
    MOINS:    [1, 0, 4],
    ET:       [1, 5, 6],
    DEMIE:    [1, 8, 12],
    VINGT:    [2, 0, 4],
    MCINQ:    [2, 6, 9],
    LEQUART:  [3, 0, 6],
    QUART:    [3, 2, 6],
    MDIX:     [3, 8, 10],
    UNE:      [4, 0, 2],
    DEUX:     [4, 4, 7],
    TROIS:    [4, 8, 12],
    QUATRE:   [5, 0, 5],
    HCINQ:    [5, 7, 10],
    SIX:      [6, 0, 2],
    SEPT:     [6, 4, 7],
    HUIT:     [6, 9, 12],
    NEUF:     [7, 0, 3],
    HDIX:     [7, 5, 7],
    ONZE:     [7, 9, 12],
    DOUZE:    [8, 0, 4],
    HEURE:    [8, 6, 10],
  };

  const HOUR_WORDS = {
    1: W.UNE, 2: W.DEUX, 3: W.TROIS, 4: W.QUATRE, 5: W.HCINQ, 6: W.SIX,
    7: W.SEPT, 8: W.HUIT, 9: W.NEUF, 10: W.HDIX, 11: W.ONZE, 12: W.DOUZE
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
    const words = [W.IL, W.EST];

    // Hour word
    words.push(HOUR_WORDS[h12]);

    // "heure" (singular for 1) vs "heures" (plural for 2-12)
    if (h12 === 1) {
      words.push(W.HEURE);
    } else {
      words.push(W.HEURES);
    }

    switch (base) {
      case 0:  break; // just the hour + heure(s)
      case 5:  words.push(W.MCINQ); break;
      case 10: words.push(W.MDIX); break;
      case 15: words.push(W.ET, W.QUART); break;
      case 20: words.push(W.VINGT); break;
      case 25: words.push(W.VINGT, W.MCINQ); break;
      case 30: words.push(W.ET, W.DEMIE); break;
      case 35: words.push(W.MOINS, W.VINGT, W.MCINQ); break;
      case 40: words.push(W.MOINS, W.VINGT); break;
      case 45: words.push(W.MOINS, W.LEQUART); break;
      case 50: words.push(W.MOINS, W.MDIX); break;
      case 55: words.push(W.MOINS, W.MCINQ); break;
    }

    return expand(words);
  }

  return {
    name: "Français", flag: "\ud83c\uddeb\ud83c\uddf7",
    grid: {
      letters: GRID,
      highlight: highlight
    },
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = "Il est " + hrW(h); break;
        case 5:  main = "Il est " + hrW(h) + " cinq"; break;
        case 10: main = "Il est " + hrW(h) + " dix"; break;
        case 15: main = "Il est " + hrW(h) + " et quart"; break;
        case 20: main = "Il est " + hrW(h) + " vingt"; break;
        case 25: main = "Il est " + hrW(h) + " vingt-cinq"; break;
        case 30: main = "Il est " + hrW(h) + " et demie"; break;
        case 35: main = "Il est " + hrW(nH) + " moins vingt-cinq"; break;
        case 40: main = "Il est " + hrW(nH) + " moins vingt"; break;
        case 45: main = "Il est " + hrW(nH) + " moins le quart"; break;
        case 50: main = "Il est " + hrW(nH) + " moins dix"; break;
        case 55: main = "Il est " + hrW(nH) + " moins cinq"; break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
