// 한국어 (Korean)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const hn = ["", "한", "두", "세", "네", "다섯", "여섯", "일곱", "여덟", "아홉", "열", "열한", "열두"];
  function hw(h) { return hn[h % 12 || 12]; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    return "+" + off + " 분";
  }

  // Word clock grid (8 rows x 10 cols)
  // Each Korean syllable block = 1 cell.
  //
  // Row 0:  세  네  시  정  각  분  전  반  이  십
  //  col:   0   1   2   3   4   5   6   7   8   9
  //
  // Row 1:  다  섯  여  섯  일  곱  오  봄  여  름
  //  col:   0   1   2   3   4   5   6   7   8   9
  //
  // Row 2:  여  덟  아  홉  열  한  두  가  을  겨
  //  col:   0   1   2   3   4   5   6   7   8   9
  //
  // Row 3-7: padding
  //
  // Hours:  한=H1(2,5) 두=H2(2,6) 세=H3(0,0) 네=H4(0,1)
  //         다섯=H5(1,0-1) 여섯=H6(1,2-3) 일곱=H7(1,4-5)
  //         여덟=H8(2,0-1) 아홉=H9(2,2-3)
  //         열=H10(2,4)  열+한=H11(2,4-5)  열+두=H12(2,4)+(2,6)
  // Minute: 이=MI(0,8) 십=MSIP(0,9) 오=MO(1,6)
  // Connectors: 시(0,2) 정(0,3) 각(0,4) 분(0,5) 전(0,6) 반(0,7)

  const GRID = [
    "세네시정각분전반이십",  // row 0
    "다섯여섯일곱오봄여름",  // row 1
    "여덟아홉열한두가을겨",  // row 2
    "바람구름하늘달빛별솔",  // row 3: pad
    "산들강물꽃잎새소리울",  // row 4: pad
    "나무숲길돌담집마을잔",  // row 5: pad
    "풀밭논두렁고개언덕뫼",  // row 6: pad
    "서녘노을아침저녁사계",  // row 7: pad
  ];

  // Named cell ranges: [row, colStart, colEnd] (inclusive)
  const W = {
    // Connectors
    SI:      [0, 2, 2],  // 시
    JEONG:   [0, 3, 3],  // 정
    GAK:     [0, 4, 4],  // 각
    BUN:     [0, 5, 5],  // 분
    JEON:    [0, 6, 6],  // 전
    BAN:     [0, 7, 7],  // 반

    // Minute number characters
    MI:      [0, 8, 8],  // 이 (for 이십)
    MSIP:    [0, 9, 9],  // 십
    MO:      [1, 6, 6],  // 오

    // Hour words
    H3:      [0, 0, 0],  // 세
    H4:      [0, 1, 1],  // 네
    H5:      [1, 0, 1],  // 다섯
    H6:      [1, 2, 3],  // 여섯
    H7:      [1, 4, 5],  // 일곱
    H8:      [2, 0, 1],  // 여덟
    H9:      [2, 2, 3],  // 아홉
    H10:     [2, 4, 4],  // 열
    H1:      [2, 5, 5],  // 한  (also suffix of 열한)
    H2:      [2, 6, 6],  // 두  (also suffix of 열두)
  };

  const HOUR_WORDS = {
    1:  [W.H1],
    2:  [W.H2],
    3:  [W.H3],
    4:  [W.H4],
    5:  [W.H5],
    6:  [W.H6],
    7:  [W.H7],
    8:  [W.H8],
    9:  [W.H9],
    10: [W.H10],
    11: [W.H10, W.H1],   // 열한 = 열 + 한
    12: [W.H10, W.H2],   // 열두 = 열 + 두
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
    const words = [];

    // Hour
    const hw = HOUR_WORDS[h12];
    for (const w of hw) words.push(w);

    // 시 is always present
    words.push(W.SI);

    switch (base) {
      case 0:  words.push(W.JEONG, W.GAK); break;                      // 정각
      case 5:  words.push(W.MO, W.BUN); break;                         // 오 분
      case 10: words.push(W.MSIP, W.BUN); break;                       // 십 분
      case 15: words.push(W.MSIP, W.MO, W.BUN); break;                 // 십오 분
      case 20: words.push(W.MI, W.MSIP, W.BUN); break;                 // 이십 분
      case 25: words.push(W.MI, W.MSIP, W.MO, W.BUN); break;           // 이십오 분
      case 30: words.push(W.BAN); break;                                // 반
      case 35: words.push(W.MI, W.MSIP, W.MO, W.BUN, W.JEON); break;  // 이십오 분 전
      case 40: words.push(W.MI, W.MSIP, W.BUN, W.JEON); break;         // 이십 분 전
      case 45: words.push(W.MSIP, W.MO, W.BUN, W.JEON); break;         // 십오 분 전
      case 50: words.push(W.MSIP, W.BUN, W.JEON); break;               // 십 분 전
      case 55: words.push(W.MO, W.BUN, W.JEON); break;                 // 오 분 전
    }

    return expand(words);
  }

  return {
    name: "한국어", flag: "🇰🇷",
    grid: {
      letters: GRID,
      highlight: highlight
    },
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = hw(h) + " 시 정각"; break;
        case 5:  main = hw(h) + " 시 오 분"; break;
        case 10: main = hw(h) + " 시 십 분"; break;
        case 15: main = hw(h) + " 시 십오 분"; break;
        case 20: main = hw(h) + " 시 이십 분"; break;
        case 25: main = hw(h) + " 시 이십오 분"; break;
        case 30: main = hw(h) + " 시 반"; break;
        case 35: main = hw(nH) + " 시 이십오 분 전"; break;
        case 40: main = hw(nH) + " 시 이십 분 전"; break;
        case 45: main = hw(nH) + " 시 십오 분 전"; break;
        case 50: main = hw(nH) + " 시 십 분 전"; break;
        case 55: main = hw(nH) + " 시 오 분 전"; break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
