// Русский (Russian)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять", "десять", "одиннадцать", "двенадцать"];
  function hw(h) { return ones[h % 12 || 12]; }
  function hourWord(v) { return v === 1 ? "час" : v >= 2 && v <= 4 ? "часа" : "часов"; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    return "+" + off + " минут";
  }

  // Word clock grid: 14 rows x 14 columns (Cyrillic)
  //
  // Row  0: ОДИННАДЦАТЬ(0-10)
  // Row  1: ДВЕНАДЦАТЬ(0-9) ЧАС(10-12)
  // Row  2: ТРИ(0-2) ЧЕТЫРЕ(3-8) ДВА(9-11)
  // Row  3: ПЯТЬ(0-3)[hour] ШЕСТЬ(4-8) СЕМЬ(9-12)
  // Row  4: ВОСЕМЬ(0-5) ДЕВЯТЬ(6-11)
  // Row  5: ДЕСЯТЬ(0-5)[hour] ОДИН(6-9) ЧАС(10-12)
  // Row  6: ЧАСА(0-3) ЧАСОВ(4-8) БЕЗ(9-11)
  // Row  7: ПОЛОВИНА(0-7)
  // Row  8: ПЯТЬ(0-3)[min] МИНУТ(4-8) ПЯТИ(9-12)[gen]
  // Row  9: ДЕСЯТЬ(0-5)[min] МИНУТ(6-10)
  // Row 10: ДВАДЦАТЬ(0-7) МИНУТ(8-12)
  // Row 11: ДВАДЦАТИ(0-7) ДЕСЯТИ(8-13)
  // Row 12: ЧЕТВЕРТЬ(0-7)
  // Row 13: ЧЕТВЕРТИ(0-7)

  const gridLetters = [
    "ОДИННАДЦАТЬЖШЩ",
    "ДВЕНАДЦАТЬЧАСЪ",
    "ТРИЧЕТЫРЕДВАЮЦ",
    "ПЯТЬШЕСТЬСЕМЬЙ",
    "ВОСЕМЬДЕВЯТЬЩФ",
    "ДЕСЯТЬОДИНЧАСЪ",
    "ЧАСАЧАСОВБЕЗЪЖ",
    "ПОЛОВИНАЖШЩЦЙФ",
    "ПЯТЬМИНУТПЯТИЪ",
    "ДЕСЯТЬМИНУТЖЩЦ",
    "ДВАДЦАТЬМИНУТЪ",
    "ДВАДЦАТИДЕСЯТИ",
    "ЧЕТВЕРТЬЖШЩЦЙФ",
    "ЧЕТВЕРТИЖШЩЦЙФ"
  ];

  // W[name] = [row, colStart, colEnd] inclusive
  const W = {
    // Hour words
    H_ODINNADCAT: [0, 0, 10],  // ОДИННАДЦАТЬ
    H_DVENADCAT:  [1, 0, 9],   // ДВЕНАДЦАТЬ
    H_TRI:        [2, 0, 2],   // ТРИ
    H_CHETYRE:    [2, 3, 8],   // ЧЕТЫРЕ
    H_DVA:        [2, 9, 11],  // ДВА
    H_PYAT:       [3, 0, 3],   // ПЯТЬ
    H_SHEST:      [3, 4, 8],   // ШЕСТЬ
    H_SEM:        [3, 9, 12],  // СЕМЬ
    H_VOSEM:      [4, 0, 5],   // ВОСЕМЬ
    H_DEVYAT:     [4, 6, 11],  // ДЕВЯТЬ
    H_DESYAT:     [5, 0, 5],   // ДЕСЯТЬ
    H_ODIN:       [5, 6, 9],   // ОДИН
    // Hour descriptors
    CHAS:         [5, 10, 12], // ЧАС
    CHASA:        [6, 0, 3],   // ЧАСА
    CHASOV:       [6, 4, 8],   // ЧАСОВ
    // Minute words
    POLOVINA:     [7, 0, 7],   // ПОЛОВИНА
    M_PYAT:       [8, 0, 3],   // ПЯТЬ (minutes)
    MINUT1:       [8, 4, 8],   // МИНУТ (after пять)
    M_PYATI:      [8, 9, 12],  // ПЯТИ (genitive)
    M_DESYAT:     [9, 0, 5],   // ДЕСЯТЬ (minutes)
    MINUT2:       [9, 6, 10],  // МИНУТ (after десять)
    DVADCAT:      [10, 0, 7],  // ДВАДЦАТЬ
    MINUT3:       [10, 8, 12], // МИНУТ (after двадцать)
    DVADCATI:     [11, 0, 7],  // ДВАДЦАТИ
    M_DESYATI:    [11, 8, 13], // ДЕСЯТИ
    CHETVERT:     [12, 0, 7],  // ЧЕТВЕРТЬ
    CHETVERTI:    [13, 0, 7],  // ЧЕТВЕРТИ
    BEZ:          [6, 9, 11],  // БЕЗ
  };

  const HOUR_WORDS = {
    1:  W.H_ODIN,
    2:  W.H_DVA,
    3:  W.H_TRI,
    4:  W.H_CHETYRE,
    5:  W.H_PYAT,
    6:  W.H_SHEST,
    7:  W.H_SEM,
    8:  W.H_VOSEM,
    9:  W.H_DEVYAT,
    10: W.H_DESYAT,
    11: W.H_ODINNADCAT,
    12: W.H_DVENADCAT
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
    var v = h % 12 || 12;
    var words = [];

    switch (base) {
      case 0:
        words.push(HOUR_WORDS[v]);
        if (v === 1) words.push(W.CHAS);
        else if (v >= 2 && v <= 4) words.push(W.CHASA);
        else words.push(W.CHASOV);
        break;
      case 5:
        words.push(W.M_PYAT, W.MINUT1, HOUR_WORDS[v]);
        break;
      case 10:
        words.push(W.M_DESYAT, W.MINUT2, HOUR_WORDS[v]);
        break;
      case 15:
        words.push(W.CHETVERT, HOUR_WORDS[v]);
        break;
      case 20:
        words.push(W.DVADCAT, W.MINUT3, HOUR_WORDS[v]);
        break;
      case 25:
        words.push(W.DVADCAT, W.M_PYAT, W.MINUT1, HOUR_WORDS[v]);
        break;
      case 30:
        words.push(W.POLOVINA, HOUR_WORDS[v]);
        break;
      case 35:
        words.push(W.BEZ, W.DVADCATI, W.M_PYATI, HOUR_WORDS[h12]);
        break;
      case 40:
        words.push(W.BEZ, W.DVADCATI, HOUR_WORDS[h12]);
        break;
      case 45:
        words.push(W.BEZ, W.CHETVERTI, HOUR_WORDS[h12]);
        break;
      case 50:
        words.push(W.BEZ, W.M_DESYATI, HOUR_WORDS[h12]);
        break;
      case 55:
        words.push(W.BEZ, W.M_PYATI, HOUR_WORDS[h12]);
        break;
    }
    return expand(words);
  }

  return {
    name: "Русский", flag: "🇷🇺",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24, v = h % 12 || 12, vN = nH % 12 || 12;
      let main;
      switch (s.base) {
        case 0:  main = hw(h) + " " + hourWord(v); break;
        case 5:  main = "пять минут " + hw(h); break;
        case 10: main = "десять минут " + hw(h); break;
        case 15: main = "четверть " + hw(h); break;
        case 20: main = "двадцать минут " + hw(h); break;
        case 25: main = "двадцать пять минут " + hw(h); break;
        case 30: main = "половина " + hw(h); break;
        case 35: main = "без двадцати пяти " + hw(nH); break;
        case 40: main = "без двадцати " + hw(nH); break;
        case 45: main = "без четверти " + hw(nH); break;
        case 50: main = "без десяти " + hw(nH); break;
        case 55: main = "без пяти " + hw(nH); break;
      }
      return { main: main, extra: extra(s.off) };
    },
    grid: {
      letters: gridLetters,
      highlight: gridHighlight
    }
  };
})());
