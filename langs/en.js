// English
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = [
    "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve"
  ];

  function hourWord(h) { return ones[h % 12 || 12]; }

  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }

  function extraText(off) {
    if (off === 0) return "";
    if (off === 1) return "+1 minute";
    return "+" + off + " minutes";
  }

  // Word clock grid (10 rows x 11 cols)
  const GRID = [
    "ITLISASAMPM",
    "ACQUARTERDC",
    "TWENTYFIVEX",
    "HALFSTENFTO",
    "PASTERUNINE",
    "ONESIXTHREE",
    "FOURFIVETWO",
    "EIGHTELEVEN",
    "SEVENTWELVE",
    "TENSEOCLOCK"
  ];

  // Named cell ranges: [row, colStart, colEnd] (inclusive)
  const W = {
    IT:       [0, 0, 1],
    IS:       [0, 3, 4],
    MFIVE:    [2, 6, 9],   // "FIVE" (minutes)
    MTEN:     [3, 5, 7],   // "TEN"  (minutes)
    QUARTER:  [1, 2, 8],
    TWENTY:   [2, 0, 5],
    HALF:     [3, 0, 3],
    TO:       [3, 9, 10],
    PAST:     [4, 0, 3],
    OCLOCK:   [9, 5, 10],
    ONE:      [5, 0, 2],
    TWO:      [6, 8, 10],
    THREE:    [5, 6, 10],
    FOUR:     [6, 0, 3],
    HFIVE:    [6, 4, 7],   // "FIVE" (hours)
    SIX:      [5, 3, 5],
    SEVEN:    [8, 0, 4],
    EIGHT:    [7, 0, 4],
    NINE:     [4, 7, 10],
    HTEN:     [9, 0, 2],   // "TEN"  (hours)
    ELEVEN:   [7, 5, 10],
    TWELVE:   [8, 5, 10]
  };

  const HOUR_WORDS = {
    1: W.ONE, 2: W.TWO, 3: W.THREE, 4: W.FOUR, 5: W.HFIVE, 6: W.SIX,
    7: W.SEVEN, 8: W.EIGHT, 9: W.NINE, 10: W.HTEN, 11: W.ELEVEN, 12: W.TWELVE
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
    const words = [W.IT, W.IS];

    switch (base) {
      case 0:  words.push(W.OCLOCK); break;
      case 5:  words.push(W.MFIVE, W.PAST); break;
      case 10: words.push(W.MTEN, W.PAST); break;
      case 15: words.push(W.QUARTER, W.PAST); break;
      case 20: words.push(W.TWENTY, W.PAST); break;
      case 25: words.push(W.TWENTY, W.MFIVE, W.PAST); break;
      case 30: words.push(W.HALF, W.PAST); break;
      case 35: words.push(W.TWENTY, W.MFIVE, W.TO); break;
      case 40: words.push(W.TWENTY, W.TO); break;
      case 45: words.push(W.QUARTER, W.TO); break;
      case 50: words.push(W.MTEN, W.TO); break;
      case 55: words.push(W.MFIVE, W.TO); break;
    }

    words.push(HOUR_WORDS[h12]);
    return expand(words);
  }

  return {
    name: "English",
    flag: "\ud83c\uddec\ud83c\udde7",
    grid: {
      letters: GRID,
      highlight: highlight
    },
    format(h, m) {
      const s = snap(m);
      const nextH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = "It is " + hourWord(h) + " o\u2019clock"; break;
        case 5:  main = "It is five past " + hourWord(h); break;
        case 10: main = "It is ten past " + hourWord(h); break;
        case 15: main = "It is quarter past " + hourWord(h); break;
        case 20: main = "It is twenty past " + hourWord(h); break;
        case 25: main = "It is twenty-five past " + hourWord(h); break;
        case 30: main = "It is half past " + hourWord(h); break;
        case 35: main = "It is twenty-five to " + hourWord(nextH); break;
        case 40: main = "It is twenty to " + hourWord(nextH); break;
        case 45: main = "It is quarter to " + hourWord(nextH); break;
        case 50: main = "It is ten to " + hourWord(nextH); break;
        case 55: main = "It is five to " + hourWord(nextH); break;
      }
      return { main: main, extra: extraText(s.off) };
    }
  };
})());
