// Polski (Polish)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "pierwsza", "druga", "trzecia", "czwarta", "piąta", "szósta", "siódma", "ósma", "dziewiąta", "dziesiąta", "jedenasta", "dwunasta"];
  function hw(h) { return ones[h % 12 || 12]; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    if (off === 1) return "+1 minuta";
    return "+" + off + " minut";
  }

  // Word clock grid: 12 rows x 13 columns (Latin + Polish diacritics)
  //
  // Row  0: JEST(0-3) ZA(4-5) W(6) PÓŁ(7-9) DO(10-11)
  // Row  1: PO(0-1) KWADRANS(2-9)
  // Row  2: DWADZIEŚCIA(0-10)
  // Row  3: PIĘĆ(0-3) DZIESIĘĆ(4-11)
  // Row  4: PIERWSZA(0-7) ÓSMA(8-11)
  // Row  5: DRUGA(0-4) TRZECIA(5-11)
  // Row  6: CZWARTA(0-6) PIĄTA(7-11)
  // Row  7: SZÓSTA(0-5) SIÓDMA(6-11)
  // Row  8: DZIEWIĄTA(0-8)
  // Row  9: DZIESIĄTA(0-8)
  // Row 10: JEDENASTA(0-8)
  // Row 11: DWUNASTA(0-7)

  var gridLetters = [
    "JESTZAWPÓŁDOŃ",
    "POKWADRANSŹŃĄ",
    "DWADZIEŚCIAŁŹ",
    "PIĘĆDZIESIĘĆŚ",
    "PIERWSZAÓSMAŻ",
    "DRUGATRZECIAŚ",
    "CZWARTAPIĄTAŃ",
    "SZÓSTASIÓDMAĘ",
    "DZIEWIĄTAŚŃĄĆ",
    "DZIESIĄTAŁŚŃĆ",
    "JEDENASTAĘŚŃĆ",
    "DWUNASTAĘŚŃĆĄ"
  ];

  // W[name] = [row, colStart, colEnd] inclusive
  var W = {
    JEST:       [0, 0, 3],
    ZA:         [0, 4, 5],
    WW:         [0, 6, 6],    // W (single letter)
    POL:        [0, 7, 9],    // PÓŁ
    DO:         [0, 10, 11],
    PO:         [1, 0, 1],
    KWADRANS:   [1, 2, 9],
    DWADZIESCIA:[2, 0, 10],
    PIEC:       [3, 0, 3],    // PIĘĆ
    DZIESIEC:   [3, 4, 11],   // DZIESIĘĆ
    // Hour words
    H_PIERWSZA: [4, 0, 7],
    H_OSMA:     [4, 8, 11],
    H_DRUGA:    [5, 0, 4],
    H_TRZECIA:  [5, 5, 11],
    H_CZWARTA:  [6, 0, 6],
    H_PIATA:    [6, 7, 11],
    H_SZOSTA:   [7, 0, 5],
    H_SIODMA:   [7, 6, 11],
    H_DZIEWIATA:[8, 0, 8],
    H_DZIESIATA:[9, 0, 8],
    H_JEDENASTA:[10, 0, 8],
    H_DWUNASTA: [11, 0, 7]
  };

  var HOUR_WORDS = {
    1:  W.H_PIERWSZA,
    2:  W.H_DRUGA,
    3:  W.H_TRZECIA,
    4:  W.H_CZWARTA,
    5:  W.H_PIATA,
    6:  W.H_SZOSTA,
    7:  W.H_SIODMA,
    8:  W.H_OSMA,
    9:  W.H_DZIEWIATA,
    10: W.H_DZIESIATA,
    11: W.H_JEDENASTA,
    12: W.H_DWUNASTA
  };

  function expand(ranges) {
    var cells = [];
    for (var i = 0; i < ranges.length; i++) {
      var r = ranges[i];
      for (var c = r[1]; c <= r[2]; c++) cells.push([r[0], c]);
    }
    return cells;
  }

  function gridHighlight(h, m) {
    var base = Math.floor(m / 5) * 5;
    var hourFor = base >= 35 ? (h + 1) % 24 : h;
    var h12 = hourFor % 12 || 12;
    // For :30, format uses nH = (h+1)%24, so next hour
    // For :00-:25, format uses h (current hour)
    var words = [W.JEST]; // "Jest" is always shown

    switch (base) {
      case 0:
        words.push(HOUR_WORDS[h % 12 || 12]);
        break;
      case 5:
        words.push(W.PIEC, W.PO, HOUR_WORDS[h % 12 || 12]);
        break;
      case 10:
        words.push(W.DZIESIEC, W.PO, HOUR_WORDS[h % 12 || 12]);
        break;
      case 15:
        words.push(W.KWADRANS, W.PO, HOUR_WORDS[h % 12 || 12]);
        break;
      case 20:
        words.push(W.DWADZIESCIA, W.PO, HOUR_WORDS[h % 12 || 12]);
        break;
      case 25:
        words.push(W.DWADZIESCIA, W.PIEC, W.PO, HOUR_WORDS[h % 12 || 12]);
        break;
      case 30:
        // "Jest w pół do [next hour]"
        words.push(W.WW, W.POL, W.DO, HOUR_WORDS[((h + 1) % 24) % 12 || 12]);
        break;
      case 35:
        words.push(W.ZA, W.DWADZIESCIA, W.PIEC, HOUR_WORDS[h12]);
        break;
      case 40:
        words.push(W.ZA, W.DWADZIESCIA, HOUR_WORDS[h12]);
        break;
      case 45:
        words.push(W.ZA, W.KWADRANS, HOUR_WORDS[h12]);
        break;
      case 50:
        words.push(W.ZA, W.DZIESIEC, HOUR_WORDS[h12]);
        break;
      case 55:
        words.push(W.ZA, W.PIEC, HOUR_WORDS[h12]);
        break;
    }
    return expand(words);
  }

  return {
    name: "Polski", flag: "🇵🇱",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = "Jest " + hw(h); break;
        case 5:  main = "Jest pięć po " + hw(h); break;
        case 10: main = "Jest dziesięć po " + hw(h); break;
        case 15: main = "Jest kwadrans po " + hw(h); break;
        case 20: main = "Jest dwadzieścia po " + hw(h); break;
        case 25: main = "Jest dwadzieścia pięć po " + hw(h); break;
        case 30: main = "Jest w pół do " + hw(nH); break;
        case 35: main = "Jest za dwadzieścia pięć " + hw(nH); break;
        case 40: main = "Jest za dwadzieścia " + hw(nH); break;
        case 45: main = "Jest za kwadrans " + hw(nH); break;
        case 50: main = "Jest za dziesięć " + hw(nH); break;
        case 55: main = "Jest za pięć " + hw(nH); break;
      }
      return { main: main, extra: extra(s.off) };
    },
    grid: {
      letters: gridLetters,
      highlight: gridHighlight
    }
  };
})());
