// Türkçe (Turkish)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz", "on", "on bir", "on iki"];
  function hw(h) { return ones[h % 12 || 12]; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    return "+" + off + " dakika";
  }

  //         0  1  2  3  4  5  6  7  8  9  10 11
  // Row 0:  S  A  A  T  Ü  Ç  D  Ö  R  T  G  Ş    SAAT(0-3) ÜÇ(4-5) DÖRT(6-9)
  // Row 1:  B  İ  R  İ  K  İ  A  L  T  I  Z  P    BİR(0-2) İKİ(3-5) ALTI(6-9)
  // Row 2:  S  E  K  İ  Z  Y  E  D  İ  O  N  R    SEKİZ(0-4) YEDİ(5-8) ON(9-10)hr
  // Row 3:  D  O  K  U  Z  H  B  E  Ş  Ğ  Ç  R    DOKUZ(0-4) BEŞ(6-8)hr
  // Row 4:  O  N  B  İ  R  O  N  İ  K  İ  X  Ü    ONBİR(0-4) ONİKİ(5-9)
  // Row 5:  G  E  Ç  İ  Y  O  R  B  E  Ş  N  M    GEÇİYOR(0-6) BEŞ(7-9)min
  // Row 6:  Ç  E  Y  R  E  K  V  A  R  Z  Ö  Ş    ÇEYREK(0-5)past VAR(6-8)
  // Row 7:  Y  İ  R  M  İ  B  E  Ş  L  Ö  Ğ  T    YİRMİ(0-4) YİRMİBEŞ(0-7)
  // Row 8:  B  U  Ç  U  K  Ö  O  N  Ğ  I  P  Ü    BUÇUK(0-4) ON(6-7)min
  // Row 9:  Ç  E  Y  R  E  K  Ş  Ö  Ğ  Ü  Ç  R    ÇEYREK(0-5)to
  // Row 10: L  Ş  Ö  Ğ  Ü  Ç  İ  R  T  Ö  Ş  K    filler
  // Row 11: M  Z  Ö  Ş  Ğ  Ü  Ç  Ö  Ş  Ğ  İ  L    filler
  const GRID = [
    "SAATÜÇDÖRTGŞ",
    "BİRİKİALTIZP",
    "SEKİZYEDİONR",
    "DOKUZHBEŞĞÇR",
    "ONBİRONİKİXÜ",
    "GEÇİYORBEŞNM",
    "ÇEYREKVARZÖŞ",
    "YİRMİBEŞLÖĞT",
    "BUÇUKÖONĞIPÜ",
    "ÇEYREKŞÖĞÜÇR",
    "LŞÖĞÜÇIRTÖŞK",
    "MZÖŞĞÜÇÖŞĞIL"
  ];

  const W = {
    SAAT:     [0, 0, 3],
    BİR:      [1, 0, 2],
    İKİ:      [1, 3, 5],
    ÜÇ:       [0, 4, 5],
    DÖRT:     [0, 6, 9],
    HBEŞ:     [3, 6, 8],
    ALTI:     [1, 6, 9],
    YEDİ:     [2, 5, 8],
    SEKİZ:    [2, 0, 4],
    DOKUZ:    [3, 0, 4],
    HON:      [2, 9, 10],
    HONBİR:   [4, 0, 4],
    HONİKİ:   [4, 5, 9],
    MBEŞ:     [5, 7, 9],
    MON:      [8, 6, 7],
    ÇEYREK_G: [6, 0, 5],
    ÇEYREK_V: [9, 0, 5],
    YİRMİ:   [7, 0, 4],
    YİRMİBEŞ:[7, 0, 7],
    BUÇUK:    [8, 0, 4],
    GEÇİYOR:  [5, 0, 6],
    VAR:      [6, 6, 8]
  };

  const HOUR_WORDS = {
    1: W.BİR, 2: W.İKİ, 3: W.ÜÇ, 4: W.DÖRT, 5: W.HBEŞ,
    6: W.ALTI, 7: W.YEDİ, 8: W.SEKİZ, 9: W.DOKUZ,
    10: W.HON, 11: W.HONBİR, 12: W.HONİKİ
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
    const words = [W.SAAT];

    switch (base) {
      case 0:  break;
      case 5:  words.push(W.MBEŞ, W.GEÇİYOR); break;
      case 10: words.push(W.MON, W.GEÇİYOR); break;
      case 15: words.push(W.ÇEYREK_G, W.GEÇİYOR); break;
      case 20: words.push(W.YİRMİ, W.GEÇİYOR); break;
      case 25: words.push(W.YİRMİBEŞ, W.GEÇİYOR); break;
      case 30: words.push(W.BUÇUK); break;
      case 35: words.push(W.YİRMİBEŞ, W.VAR); break;
      case 40: words.push(W.YİRMİ, W.VAR); break;
      case 45: words.push(W.ÇEYREK_V, W.VAR); break;
      case 50: words.push(W.MON, W.VAR); break;
      case 55: words.push(W.MBEŞ, W.VAR); break;
    }

    words.push(HOUR_WORDS[h12]);
    return expand(words);
  }

  return {
    name: "Türkçe", flag: "🇹🇷",
    grid: {
      letters: GRID,
      highlight: highlight
    },
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = "Saat " + hw(h); break;
        case 5:  main = "Saat " + hw(h) + "'i beş geçiyor"; break;
        case 10: main = "Saat " + hw(h) + "'i on geçiyor"; break;
        case 15: main = "Saat " + hw(h) + "'i çeyreği geçiyor"; break;
        case 20: main = "Saat " + hw(h) + "'i yirmi geçiyor"; break;
        case 25: main = "Saat " + hw(h) + "'i yirmi beş geçiyor"; break;
        case 30: main = "Saat " + hw(h) + " buçuk"; break;
        case 35: main = "Saat " + hw(nH) + "'e yirmi beş var"; break;
        case 40: main = "Saat " + hw(nH) + "'e yirmi var"; break;
        case 45: main = "Saat " + hw(nH) + "'e çeyrek var"; break;
        case 50: main = "Saat " + hw(nH) + "'e on var"; break;
        case 55: main = "Saat " + hw(nH) + "'e beş var"; break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
