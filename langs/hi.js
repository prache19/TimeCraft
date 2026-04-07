// Hindi (Hinglish — romanized)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "ek", "do", "teen", "char", "panch", "chah", "saat", "aath", "nau", "das", "gyarah", "barah"];
  function hw(h) { return ones[h % 12 || 12]; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    return "+" + off + " minit";
  }

  // Word clock grid (12 rows x 11 cols)
  // Ordered to read top-to-bottom as per time flow:
  //   prefix → hour → verb → connector → minutes → unit
  //
  // Row 0:  SAVA, SADHE        (prefixes for :15, :30)
  // Row 1:  PAUNE, EK, DO      (prefix for :45, hours 1-2)
  // Row 2:  TEEN, CHAR          (hours 3-4)
  // Row 3:  PANCH(hr), CHAH    (hours 5-6)
  // Row 4:  SAAT, AATH          (hours 7-8)
  // Row 5:  NAU, DAS(hr)        (hours 9-10)
  // Row 6:  GYARAH, BARAH       (hours 11-12)
  // Row 7:  BAJE, BAJKAR        (verbs)
  // Row 8:  BAJNE, MEIN         (verb + connector for "to")
  // Row 9:  HAIN, PANCH(min)    (status + minute 5)
  // Row 10: DAS(min), BEES      (minutes 10, 20)
  // Row 11: PACHIS, MINIT       (minute 25 + unit)

  const GRID = [
    "SAVASADHEKM",
    "PAUNEXEKDOX",
    "TEENCHARXKM",
    "PANCHCHAHXM",
    "SAATAATHXKM",
    "NAUDASXKLMX",
    "GYARAHBARAH",
    "BAJEBAJKARX",
    "BAJNEMEINXK",
    "HAINPANCHXM",
    "DASBEESXKLM",
    "PACHISMINIT"
  ];

  // Named cell ranges: [row, colStart, colEnd] (inclusive)
  const W = {
    SAVA:    [0, 0, 3],
    SADHE:   [0, 4, 8],
    PAUNE:   [1, 0, 4],
    EK:      [1, 6, 7],
    DO:      [1, 8, 9],
    TEEN:    [2, 0, 3],
    CHAR:    [2, 4, 7],
    HPANCH:  [3, 0, 4],
    CHAH:    [3, 5, 8],
    SAAT:    [4, 0, 3],
    AATH:    [4, 4, 7],
    NAU:     [5, 0, 2],
    HDAS:    [5, 3, 5],
    GYARAH:  [6, 0, 5],
    BARAH:   [6, 6, 10],
    BAJE:    [7, 0, 3],
    BAJKAR:  [7, 4, 9],
    BAJNE:   [8, 0, 4],
    MEIN:    [8, 5, 8],
    HAIN:    [9, 0, 3],
    MPANCH:  [9, 4, 8],
    MDAS:    [10, 0, 2],
    BEES:    [10, 3, 6],
    PACHIS:  [11, 0, 5],
    MINIT:   [11, 6, 10]
  };

  const HOUR_WORDS = {
    1: W.EK, 2: W.DO, 3: W.TEEN, 4: W.CHAR, 5: W.HPANCH, 6: W.CHAH,
    7: W.SAAT, 8: W.AATH, 9: W.NAU, 10: W.HDAS, 11: W.GYARAH, 12: W.BARAH
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
    const curH12 = h % 12 || 12;
    const words = [];

    switch (base) {
      case 0:  words.push(HOUR_WORDS[curH12], W.BAJE, W.HAIN); break;
      case 5:  words.push(HOUR_WORDS[curH12], W.BAJKAR, W.MPANCH, W.MINIT); break;
      case 10: words.push(HOUR_WORDS[curH12], W.BAJKAR, W.MDAS, W.MINIT); break;
      case 15: words.push(W.SAVA, HOUR_WORDS[curH12], W.BAJE, W.HAIN); break;
      case 20: words.push(HOUR_WORDS[curH12], W.BAJKAR, W.BEES, W.MINIT); break;
      case 25: words.push(HOUR_WORDS[curH12], W.BAJKAR, W.PACHIS, W.MINIT); break;
      case 30: words.push(W.SADHE, HOUR_WORDS[curH12], W.BAJE, W.HAIN); break;
      case 35: words.push(HOUR_WORDS[h12], W.BAJNE, W.MEIN, W.PACHIS, W.MINIT); break;
      case 40: words.push(HOUR_WORDS[h12], W.BAJNE, W.MEIN, W.BEES, W.MINIT); break;
      case 45: words.push(W.PAUNE, HOUR_WORDS[h12], W.BAJE, W.HAIN); break;
      case 50: words.push(HOUR_WORDS[h12], W.BAJNE, W.MEIN, W.MDAS, W.MINIT); break;
      case 55: words.push(HOUR_WORDS[h12], W.BAJNE, W.MEIN, W.MPANCH, W.MINIT); break;
    }

    return expand(words);
  }

  return {
    name: "\u0939\u093f\u0928\u094d\u0926\u0940", flag: "\ud83c\uddee\ud83c\uddf3",
    grid: {
      letters: GRID,
      highlight: highlight
    },
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = hw(h) + " baje hain"; break;
        case 5:  main = hw(h) + " bajkar panch minit"; break;
        case 10: main = hw(h) + " bajkar das minit"; break;
        case 15: main = "sava " + hw(h) + " baje hain"; break;
        case 20: main = hw(h) + " bajkar bees minit"; break;
        case 25: main = hw(h) + " bajkar pachis minit"; break;
        case 30: main = "sadhe " + hw(h) + " baje hain"; break;
        case 35: main = hw(nH) + " bajne mein pachis minit"; break;
        case 40: main = hw(nH) + " bajne mein bees minit"; break;
        case 45: main = "paune " + hw(nH) + " baje hain"; break;
        case 50: main = hw(nH) + " bajne mein das minit"; break;
        case 55: main = hw(nH) + " bajne mein panch minit"; break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
