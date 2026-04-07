// 日本語 (Japanese)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const nums = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
  function hw(h) { return nums[h % 12 || 12]; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    return "+" + off + " 分";
  }

  // Word clock grid (8 rows x 8 cols)
  // Shared characters (五, 十, 二) have separate hour (H) and minute (M) positions.
  const GRID = [
    "一二三四時半分前",  // row 0: H一 H二 H三 H四 時 半 分 前
    "五六七八九桜富雅",  // row 1: H五 H六 H七 H八 H九 pad pad pad
    "十一二ちょうど京",  // row 2: H十 H11一 H12二 ちょうど pad
    "二十五和風花鳥月",  // row 3: M二 M十 M五 pad pad pad pad pad
    "空雲雨雪霧氷霜露",  // row 4: pad
    "松竹梅蘭菊藤桐柳",  // row 5: pad
    "山川海島森林原野",  // row 6: pad
    "鶴亀龍虎鷹鯉蝶蛍",  // row 7: pad
  ];

  // Named cell ranges: [row, colStart, colEnd] (inclusive)
  const W = {
    // Connectors
    JI:      [0, 4, 4],  // 時
    BAN:     [0, 5, 5],  // 半
    FUN:     [0, 6, 6],  // 分
    MAE:     [0, 7, 7],  // 前
    CHODO:   [2, 3, 6],  // ちょうど

    // Minute number characters
    MWU:     [3, 2, 2],  // 五 (minute)
    MSHI:    [3, 1, 1],  // 十 (minute)
    MNI:     [3, 0, 0],  // 二 (minute, for 二十)

    // Hour words
    H1:      [0, 0, 0],  // 一
    H2:      [0, 1, 1],  // 二
    H3:      [0, 2, 2],  // 三
    H4:      [0, 3, 3],  // 四
    H5:      [1, 0, 0],  // 五
    H6:      [1, 1, 1],  // 六
    H7:      [1, 2, 2],  // 七
    H8:      [1, 3, 3],  // 八
    H9:      [1, 4, 4],  // 九
    H10:     [2, 0, 0],  // 十
    H11_SHI: [2, 0, 0],  // 十 (prefix of 十一)
    H11_ICHI:[2, 1, 1],  // 一 (suffix of 十一)
    H12_SHI: [2, 0, 0],  // 十 (prefix of 十二)
    H12_NI:  [2, 2, 2],  // 二 (suffix of 十二)
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
    11: [W.H11_SHI, W.H11_ICHI],
    12: [W.H12_SHI, W.H12_NI],
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

    // 時 is always present
    words.push(W.JI);

    switch (base) {
      case 0:  words.push(W.CHODO); break;                                // ちょうど
      case 5:  words.push(W.MWU, W.FUN); break;                          // 五分
      case 10: words.push(W.MSHI, W.FUN); break;                         // 十分
      case 15: words.push(W.MSHI, W.MWU, W.FUN); break;                  // 十五分
      case 20: words.push(W.MNI, W.MSHI, W.FUN); break;                  // 二十分
      case 25: words.push(W.MNI, W.MSHI, W.MWU, W.FUN); break;          // 二十五分
      case 30: words.push(W.BAN); break;                                  // 半
      case 35: words.push(W.MNI, W.MSHI, W.MWU, W.FUN, W.MAE); break;   // 二十五分前
      case 40: words.push(W.MNI, W.MSHI, W.FUN, W.MAE); break;          // 二十分前
      case 45: words.push(W.MSHI, W.MWU, W.FUN, W.MAE); break;          // 十五分前
      case 50: words.push(W.MSHI, W.FUN, W.MAE); break;                  // 十分前
      case 55: words.push(W.MWU, W.FUN, W.MAE); break;                   // 五分前
    }

    return expand(words);
  }

  return {
    name: "日本語", flag: "🇯🇵",
    grid: {
      letters: GRID,
      highlight: highlight
    },
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = hw(h) + "時ちょうど"; break;
        case 5:  main = hw(h) + "時五分"; break;
        case 10: main = hw(h) + "時十分"; break;
        case 15: main = hw(h) + "時十五分"; break;
        case 20: main = hw(h) + "時二十分"; break;
        case 25: main = hw(h) + "時二十五分"; break;
        case 30: main = hw(h) + "時半"; break;
        case 35: main = hw(nH) + "時二十五分前"; break;
        case 40: main = hw(nH) + "時二十分前"; break;
        case 45: main = hw(nH) + "時十五分前"; break;
        case 50: main = hw(nH) + "時十分前"; break;
        case 55: main = hw(nH) + "時五分前"; break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
