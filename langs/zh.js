// 中文 (Chinese)
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
    return "+" + off + " 分钟";
  }

  // Word clock grid (8 rows x 8 cols)
  // Shared characters (五, 十, 一, 二) have separate hour (H) and minute (M) positions.
  const GRID = [
    "一二三点整半刻分",  // row 0: H一 H二 H三 点 整 半 刻 分
    "四五六差七八九现",  // row 1: H四 H五 H六 差 H七 H八 H九 pad
    "十一二春夏秋冬风",  // row 2: H十 H11一 H12二 pad pad pad pad pad
    "二十五一山水云雾",  // row 3: M二 M十 M五 M一 pad pad pad pad
    "光明日月星辰天地",  // row 4: pad
    "龙凤花鸟鱼虫金玉",  // row 5: pad
    "东南西北江河湖海",  // row 6: pad
    "诗书画琴棋茶酒歌",  // row 7: pad
  ];

  // Named cell ranges: [row, colStart, colEnd] (inclusive)
  const W = {
    // Connector / structure
    DIAN:    [0, 3, 3],  // 点
    ZHENG:   [0, 4, 4],  // 整
    BAN:     [0, 5, 5],  // 半
    KE:      [0, 6, 6],  // 刻
    FEN:     [0, 7, 7],  // 分
    CHA:     [1, 3, 3],  // 差

    // Minute number characters
    MWU:     [3, 2, 2],  // 五 (minute)
    MSHI:    [3, 1, 1],  // 十 (minute)
    MYI:     [3, 3, 3],  // 一 (minute, for 一刻)
    MER:     [3, 0, 0],  // 二 (minute, for 二十)

    // Hour words
    H1:      [0, 0, 0],  // 一
    H2:      [0, 1, 1],  // 二
    H3:      [0, 2, 2],  // 三
    H4:      [1, 0, 0],  // 四
    H5:      [1, 1, 1],  // 五
    H6:      [1, 2, 2],  // 六
    H7:      [1, 4, 4],  // 七
    H8:      [1, 5, 5],  // 八
    H9:      [1, 6, 6],  // 九
    H10:     [2, 0, 0],  // 十
    H11_SHI: [2, 0, 0],  // 十 (prefix of 十一)
    H11_YI:  [2, 1, 1],  // 一 (suffix of 十一)
    H12_SHI: [2, 0, 0],  // 十 (prefix of 十二)
    H12_ER:  [2, 2, 2],  // 二 (suffix of 十二)
  };

  // Multi-range hour mappings
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
    11: [W.H11_SHI, W.H11_YI],
    12: [W.H12_SHI, W.H12_ER],
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

    // 点 is always present
    words.push(W.DIAN);

    switch (base) {
      case 0:  words.push(W.ZHENG); break;                              // 整
      case 5:  words.push(W.MWU, W.FEN); break;                        // 五分
      case 10: words.push(W.MSHI, W.FEN); break;                       // 十分
      case 15: words.push(W.MYI, W.KE); break;                         // 一刻
      case 20: words.push(W.MER, W.MSHI, W.FEN); break;                // 二十分
      case 25: words.push(W.MER, W.MSHI, W.MWU, W.FEN); break;        // 二十五分
      case 30: words.push(W.BAN); break;                                // 半
      case 35: words.push(W.CHA, W.MER, W.MSHI, W.MWU, W.FEN); break; // 差二十五分
      case 40: words.push(W.CHA, W.MER, W.MSHI, W.FEN); break;        // 差二十分
      case 45: words.push(W.CHA, W.MYI, W.KE); break;                  // 差一刻
      case 50: words.push(W.CHA, W.MSHI, W.FEN); break;                // 差十分
      case 55: words.push(W.CHA, W.MWU, W.FEN); break;                 // 差五分
    }

    return expand(words);
  }

  return {
    name: "中文", flag: "🇨🇳",
    grid: {
      letters: GRID,
      highlight: highlight
    },
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = hw(h) + "点整"; break;
        case 5:  main = hw(h) + "点五分"; break;
        case 10: main = hw(h) + "点十分"; break;
        case 15: main = hw(h) + "点一刻"; break;
        case 20: main = hw(h) + "点二十分"; break;
        case 25: main = hw(h) + "点二十五分"; break;
        case 30: main = hw(h) + "点半"; break;
        case 35: main = hw(nH) + "点差二十五分"; break;
        case 40: main = hw(nH) + "点差二十分"; break;
        case 45: main = hw(nH) + "点差一刻"; break;
        case 50: main = hw(nH) + "点差十分"; break;
        case 55: main = hw(nH) + "点差五分"; break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
