// Nederlands (Dutch)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "een", "twee", "drie", "vier", "vijf", "zes", "zeven", "acht", "negen", "tien", "elf", "twaalf"];
  function hw(h) { return ones[h % 12 || 12]; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    if (off === 1) return "+1 minuut";
    return "+" + off + " minuten";
  }

  // Word clock grid (9 rows x 11 cols)
  const GRID = [
    "HETKISVIJFM",
    "TIENDKWARTG",
    "OVERXVOORLP",
    "HALFBTWEEKN",
    "TWAALFDRIEQ",
    "VIJFZEVENXR",
    "ACHTNEGENWB",
    "ELFTIENDUUR",
    "EENVIERZESK"
  ];

  // Named cell ranges: [row, colStart, colEnd] (inclusive)
  const W = {
    HET:     [0, 0, 2],
    IS:      [0, 4, 5],
    MVIJF:   [0, 6, 9],    // "VIJF" (minutes)
    MTIEN:   [1, 0, 3],    // "TIEN" (minutes)
    KWART:   [1, 5, 9],
    OVER:    [2, 0, 3],
    VOOR:    [2, 5, 8],
    HALF:    [3, 0, 3],
    UUR:     [7, 8, 10],
    EEN:     [8, 0, 2],
    TWEE:    [3, 5, 8],
    DRIE:    [4, 6, 9],
    VIER:    [8, 3, 6],
    HVIJF:   [5, 0, 3],    // "VIJF" (hours)
    ZES:     [8, 7, 9],
    ZEVEN:   [5, 4, 8],
    ACHT:    [6, 0, 3],
    NEGEN:   [6, 4, 8],
    HTIEN:   [7, 3, 6],    // "TIEN" (hours)
    ELF:     [7, 0, 2],
    TWAALF:  [4, 0, 5]
  };

  const HOUR_WORDS = {
    1: W.EEN, 2: W.TWEE, 3: W.DRIE, 4: W.VIER, 5: W.HVIJF, 6: W.ZES,
    7: W.ZEVEN, 8: W.ACHT, 9: W.NEGEN, 10: W.HTIEN, 11: W.ELF, 12: W.TWAALF
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
    // Dutch uses next hour starting at :20 (tien voor half)
    const hourFor = base >= 20 ? (h + 1) % 24 : h;
    const h12 = hourFor % 12 || 12;
    const words = [W.HET, W.IS];

    switch (base) {
      case 0:  words.push(W.UUR); break;
      case 5:  words.push(W.MVIJF, W.OVER); break;
      case 10: words.push(W.MTIEN, W.OVER); break;
      case 15: words.push(W.KWART, W.OVER); break;
      case 20: words.push(W.MTIEN, W.VOOR, W.HALF); break;
      case 25: words.push(W.MVIJF, W.VOOR, W.HALF); break;
      case 30: words.push(W.HALF); break;
      case 35: words.push(W.MVIJF, W.OVER, W.HALF); break;
      case 40: words.push(W.MTIEN, W.OVER, W.HALF); break;
      case 45: words.push(W.KWART, W.VOOR); break;
      case 50: words.push(W.MTIEN, W.VOOR); break;
      case 55: words.push(W.MVIJF, W.VOOR); break;
    }

    words.push(HOUR_WORDS[h12]);
    return expand(words);
  }

  return {
    name: "Nederlands", flag: "\ud83c\uddf3\ud83c\uddf1",
    grid: {
      letters: GRID,
      highlight: highlight
    },
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = "Het is " + hw(h) + " uur"; break;
        case 5:  main = "Het is vijf over " + hw(h); break;
        case 10: main = "Het is tien over " + hw(h); break;
        case 15: main = "Het is kwart over " + hw(h); break;
        case 20: main = "Het is tien voor half " + hw(nH); break;
        case 25: main = "Het is vijf voor half " + hw(nH); break;
        case 30: main = "Het is half " + hw(nH); break;
        case 35: main = "Het is vijf over half " + hw(nH); break;
        case 40: main = "Het is tien over half " + hw(nH); break;
        case 45: main = "Het is kwart voor " + hw(nH); break;
        case 50: main = "Het is tien voor " + hw(nH); break;
        case 55: main = "Het is vijf voor " + hw(nH); break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
