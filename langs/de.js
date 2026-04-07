// Deutsch (German)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf"];
  function hw(h) { return ones[h % 12 || 12]; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    if (off === 1) return "+1 Minute";
    return "+" + off + " Minuten";
  }

  // Word clock grid (10 rows x 11 cols)
  const GRID = [
    "ESKISTFÜNFM",
    "VIERTELZEHN",
    "ZWANZIGVORK",
    "NACHAHALBTD",
    "ZEHNBEINSQR",
    "DREIZWEIUHR",
    "SIEBENNEUNK",
    "ELFFÜNFACHT",
    "VIERSECHSWB",
    "ZEHNZWÖLFMP"
  ];

  // Named cell ranges: [row, colStart, colEnd] (inclusive)
  const W = {
    ES:       [0, 0, 1],
    IST:      [0, 3, 5],
    MFÜNF:    [0, 6, 9],    // "FÜNF" (minutes)
    VIERTEL:  [1, 0, 6],
    MZEHN:    [1, 7, 10],   // "ZEHN" (minutes)
    ZWANZIG:  [2, 0, 6],
    VOR:      [2, 7, 9],
    NACH:     [3, 0, 3],
    HALB:     [3, 5, 8],
    UHR:      [5, 8, 10],
    EINS:     [4, 5, 8],
    ZWEI:     [5, 4, 7],
    DREI:     [5, 0, 3],
    VIER:     [8, 0, 3],
    HFÜNF:    [7, 3, 6],    // "FÜNF" (hours)
    SECHS:    [8, 4, 8],
    SIEBEN:   [6, 0, 5],
    ACHT:     [7, 7, 10],
    NEUN:     [6, 6, 9],
    HZEHN:    [9, 0, 3],    // "ZEHN" (hours)
    ELF:      [7, 0, 2],
    ZWÖLF:    [9, 4, 8]
  };

  const HOUR_WORDS = {
    1: W.EINS, 2: W.ZWEI, 3: W.DREI, 4: W.VIER, 5: W.HFÜNF, 6: W.SECHS,
    7: W.SIEBEN, 8: W.ACHT, 9: W.NEUN, 10: W.HZEHN, 11: W.ELF, 12: W.ZWÖLF
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
    // German uses next hour starting at :25 (fünf vor halb)
    const hourFor = base >= 25 ? (h + 1) % 24 : h;
    const h12 = hourFor % 12 || 12;
    const words = [W.ES, W.IST];

    switch (base) {
      case 0:  words.push(W.UHR); break;
      case 5:  words.push(W.MFÜNF, W.NACH); break;
      case 10: words.push(W.MZEHN, W.NACH); break;
      case 15: words.push(W.VIERTEL, W.NACH); break;
      case 20: words.push(W.ZWANZIG, W.NACH); break;
      case 25: words.push(W.MFÜNF, W.VOR, W.HALB); break;
      case 30: words.push(W.HALB); break;
      case 35: words.push(W.MFÜNF, W.NACH, W.HALB); break;
      case 40: words.push(W.ZWANZIG, W.VOR); break;
      case 45: words.push(W.VIERTEL, W.VOR); break;
      case 50: words.push(W.MZEHN, W.VOR); break;
      case 55: words.push(W.MFÜNF, W.VOR); break;
    }

    words.push(HOUR_WORDS[h12]);
    return expand(words);
  }

  return {
    name: "Deutsch", flag: "\ud83c\udde9\ud83c\uddea",
    grid: {
      letters: GRID,
      highlight: highlight
    },
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = "Es ist " + hw(h) + " Uhr"; break;
        case 5:  main = "Es ist fünf nach " + hw(h); break;
        case 10: main = "Es ist zehn nach " + hw(h); break;
        case 15: main = "Es ist Viertel nach " + hw(h); break;
        case 20: main = "Es ist zwanzig nach " + hw(h); break;
        case 25: main = "Es ist fünf vor halb " + hw(nH); break;
        case 30: main = "Es ist halb " + hw(nH); break;
        case 35: main = "Es ist fünf nach halb " + hw(nH); break;
        case 40: main = "Es ist zwanzig vor " + hw(nH); break;
        case 45: main = "Es ist Viertel vor " + hw(nH); break;
        case 50: main = "Es ist zehn vor " + hw(nH); break;
        case 55: main = "Es ist fünf vor " + hw(nH); break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
