// Tiếng Việt (Vietnamese)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín", "mười", "mười một", "mười hai"];
  function hw(h) { return ones[h % 12 || 12]; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    return "+" + off + " phút";
  }

  //         0  1  2  3  4  5  6  7  8  9  10 11 12
  // Row 0:  M  Ộ  T  G  I  Ờ  Đ  Ú  N  G  B  A  X   MỘT(0-2)hr GIỜ(3-5) ĐÚNG(6-9) BA(10-11)hr
  // Row 1:  H  A  I  B  Ố  N  S  Á  U  C  H  Í  N   HAI(0-2)hr BỐN(3-5) SÁU(6-8) CHÍN(9-12)
  // Row 2:  N  Ă  M  B  Ả  Y  T  Á  M  R  Ư  Ở  I   NĂM(0-2)hr BẢY(3-5) TÁM(6-8) RƯỞI(9-12)
  // Row 3:  M  Ư  Ờ  I  M  Ộ  T  K  L  Q  V  X  D   MƯỜIMỘT(0-6) hr11; MƯỜI(0-3) part
  // Row 4:  M  Ư  Ờ  I  H  A  I  P  G  N  B  X  Q   MƯỜIHAI(0-6) hr12; MƯỜI(0-3) hr10
  // Row 5:  K  É  M  P  H  Ú  T  N  Ă  M  D  X  V   KÉM(0-2) PHÚT(3-6) NĂM(7-9)min
  // Row 6:  M  Ư  Ờ  I  L  Ă  M  G  K  B  D  X  Q   MƯỜI(0-3)min LĂM(4-6)
  // Row 7:  H  A  I  M  Ư  Ơ  I  T  R  N  G  X  V   HAI(0-2)min MƯƠI(3-6)
  // Row 8:  L  B  D  G  K  X  T  R  V  S  K  N  Z   filler
  // Row 9:  M  Z  N  B  D  G  K  X  V  S  G  L  R   filler
  const GRID = [
    "MỘTGIỜĐÚNGBAX",
    "HAIBỐNSÁUCHÍN",
    "NĂMBẢYTÁMRƯỞI",
    "MƯỜIMỘTKLQVXD",
    "MƯỜIHAIPGNBXQ",
    "KÉMPHÚTNĂMDXV",
    "MƯỜILĂMGKBDXQ",
    "HAIMƯƠITRNGRV",
    "LBDGKXTRVSKNZ",
    "MZNBDGKXVSGLR"
  ];

  const W = {
    // Hour words
    MỘT:      [0, 0, 2],
    HHAI:     [1, 0, 2],
    BA:       [0, 10, 11],
    BỐN:     [1, 3, 5],
    HNĂM:    [2, 0, 2],
    SÁU:     [1, 6, 8],
    BẢY:     [2, 3, 5],
    TÁM:     [2, 6, 8],
    CHÍN:    [1, 9, 12],
    HMƯỜI:   [4, 0, 3],
    HMƯỜIMỘT:[3, 0, 6],
    HMƯỜIHAI:[4, 0, 6],
    // Always
    GIỜ:     [0, 3, 5],
    ĐÚNG:    [0, 6, 9],
    RƯỞI:    [2, 9, 12],
    // Connectors
    KÉM:     [5, 0, 2],
    PHÚT:    [5, 3, 6],
    // Minute words
    MNĂM:    [5, 7, 9],
    MMƯỜI:   [6, 0, 3],
    LĂM:    [6, 4, 6],
    MHAI:    [7, 0, 2],
    MƯƠI:   [7, 3, 6],
    HAIMƯƠI: [7, 0, 6]
  };

  const HOUR_WORDS = {
    1: W.MỘT, 2: W.HHAI, 3: W.BA, 4: W.BỐN, 5: W.HNĂM,
    6: W.SÁU, 7: W.BẢY, 8: W.TÁM, 9: W.CHÍN,
    10: W.HMƯỜI, 11: W.HMƯỜIMỘT, 12: W.HMƯỜIHAI
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
    const words = [W.GIỜ];

    switch (base) {
      case 0:  words.push(W.ĐÚNG); break;
      case 5:  words.push(W.MNĂM, W.PHÚT); break;
      case 10: words.push(W.MMƯỜI, W.PHÚT); break;
      case 15: words.push(W.MMƯỜI, W.LĂM); break;
      case 20: words.push(W.HAIMƯƠI, W.PHÚT); break;
      case 25: words.push(W.HAIMƯƠI, W.LĂM, W.PHÚT); break;
      case 30: words.push(W.RƯỞI); break;
      case 35: words.push(W.KÉM, W.HAIMƯƠI, W.LĂM); break;
      case 40: words.push(W.KÉM, W.HAIMƯƠI); break;
      case 45: words.push(W.KÉM, W.MMƯỜI, W.LĂM); break;
      case 50: words.push(W.KÉM, W.MMƯỜI); break;
      case 55: words.push(W.KÉM, W.MNĂM); break;
    }

    words.push(HOUR_WORDS[h12]);
    return expand(words);
  }

  return {
    name: "Tiếng Việt", flag: "🇻🇳",
    grid: {
      letters: GRID,
      highlight: highlight
    },
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = hw(h) + " giờ đúng"; break;
        case 5:  main = hw(h) + " giờ năm phút"; break;
        case 10: main = hw(h) + " giờ mười phút"; break;
        case 15: main = hw(h) + " giờ mười lăm"; break;
        case 20: main = hw(h) + " giờ hai mươi phút"; break;
        case 25: main = hw(h) + " giờ hai mươi lăm phút"; break;
        case 30: main = hw(h) + " giờ rưởi"; break;
        case 35: main = hw(nH) + " giờ kém hai mươi lăm"; break;
        case 40: main = hw(nH) + " giờ kém hai mươi"; break;
        case 45: main = hw(nH) + " giờ kém mười lăm"; break;
        case 50: main = hw(nH) + " giờ kém mười"; break;
        case 55: main = hw(nH) + " giờ kém năm"; break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
