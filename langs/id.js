// Indonesia (Indonesian)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas", "dua belas"];
  function hw(h) { return ones[h % 12 || 12]; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    return "+" + off + " menit";
  }

  //          0  1  2  3  4  5  6  7  8  9  10 11 12 13 14
  // Row 0:   P  U  K  U  L  S  A  T  U  T  E  P  A  T  X   PUKUL(0-4) SATU(5-8) TEPAT(9-13)
  // Row 1:   D  U  A  T  I  G  A  E  M  P  A  T  L  G  K   DUA(0-2)hr TIGA(3-6) EMPAT(7-11)
  // Row 2:   L  I  M  A  E  N  A  M  T  U  J  U  H  B  N   LIMA(0-3)hr ENAM(4-7) TUJUH(8-12)
  // Row 3:   D  E  L  A  P  A  N  S  E  M  B  I  L  A  N   DELAPAN(0-6) SEMBILAN(7-14)
  // Row 4:   S  E  P  U  L  U  H  S  E  B  E  L  A  S  K   SEPULUH(0-6)hr SEBELAS(7-13)
  // Row 5:   D  U  A  B  E  L  A  S  L  E  W  A  T  G  N   DUABELAS(0-7) LEWAT(8-12)
  // Row 6:   K  U  R  A  N  G  S  E  T  E  N  G  A  H  X   KURANG(0-5) SETENGAH(6-13)
  // Row 7:   S  E  P  E  R  E  M  P  A  T  M  E  N  I  T   SEPEREMPAT(0-9) MENIT(10-14)
  // Row 8:   L  I  M  A  S  E  P  U  L  U  H  B  G  K  N   LIMA(0-3)min SEPULUH(4-10)min
  // Row 9:   D  U  A  P  U  L  U  H  L  I  M  A  G  K  N   DUAPULUH(0-7) LIMA(8-11) -> combo(0-11)
  // Row 10:  L  B  D  G  K  X  T  R  V  S  K  N  Z  P  Q   filler
  // Row 11:  M  Z  N  B  D  G  K  X  V  S  G  L  R  P  Q   filler
  const GRID = [
    "PUKULSATUTEPATX",
    "DUATIGAEMPATLGK",
    "LIMAENMATUJUHBN",
    "DELAPANSEMBILAN",
    "SEPULUHSEBELASK",
    "DUABELASLEWATGN",
    "KURANGSETENGAHX",
    "SEPEREMPATMENIT",
    "LIMASEPULUHBGKN",
    "DUAPULUHLIMAGKN",
    "LBDGKXTRVSKNNQP",
    "MZNBDGKXVSGLRPQ"
  ];

  const W = {
    PUKUL:       [0, 0, 4],
    TEPAT:       [0, 9, 13],
    LEWAT:       [5, 8, 12],
    KURANG:      [6, 0, 5],
    SETENGAH:    [6, 6, 13],
    SEPEREMPAT:  [7, 0, 9],
    MENIT:       [7, 10, 14],
    // Hour words
    SATU:        [0, 5, 8],
    HDUA:        [1, 0, 2],
    TIGA:        [1, 3, 6],
    EMPAT:       [1, 7, 11],
    HLIMA:       [2, 0, 3],
    ENAM:        [2, 4, 7],
    TUJUH:       [2, 8, 12],
    DELAPAN:     [3, 0, 6],
    SEMBILAN:    [3, 7, 14],
    HSEPULUH:    [4, 0, 6],
    SEBELAS:     [4, 7, 13],
    DUABELAS:    [5, 0, 7],
    // Minute words
    MLIMA:       [8, 0, 3],
    MSEPULUH:    [8, 4, 10],
    DUAPULUH:    [9, 0, 7],
    DUAPULUHLIMA:[9, 0, 11]
  };

  const HOUR_WORDS = {
    1: W.SATU, 2: W.HDUA, 3: W.TIGA, 4: W.EMPAT, 5: W.HLIMA,
    6: W.ENAM, 7: W.TUJUH, 8: W.DELAPAN, 9: W.SEMBILAN,
    10: W.HSEPULUH, 11: W.SEBELAS, 12: W.DUABELAS
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
    // Indonesian setengah (half) uses next hour, same as >= 35
    const hourFor = base >= 30 ? (h + 1) % 24 : h;
    const h12 = hourFor % 12 || 12;
    const words = [W.PUKUL];

    switch (base) {
      case 0:  words.push(W.TEPAT); break;
      case 5:  words.push(W.LEWAT, W.MLIMA, W.MENIT); break;
      case 10: words.push(W.LEWAT, W.MSEPULUH, W.MENIT); break;
      case 15: words.push(W.SEPEREMPAT); break;
      case 20: words.push(W.LEWAT, W.DUAPULUH, W.MENIT); break;
      case 25: words.push(W.LEWAT, W.DUAPULUHLIMA, W.MENIT); break;
      case 30: words.push(W.SETENGAH); break;
      case 35: words.push(W.KURANG, W.DUAPULUHLIMA, W.MENIT); break;
      case 40: words.push(W.KURANG, W.DUAPULUH, W.MENIT); break;
      case 45: words.push(W.KURANG, W.SEPEREMPAT); break;
      case 50: words.push(W.KURANG, W.MSEPULUH, W.MENIT); break;
      case 55: words.push(W.KURANG, W.MLIMA, W.MENIT); break;
    }

    words.push(HOUR_WORDS[h12]);
    return expand(words);
  }

  return {
    name: "Indonesia", flag: "🇮🇩",
    grid: {
      letters: GRID,
      highlight: highlight
    },
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = "Pukul " + hw(h) + " tepat"; break;
        case 5:  main = "Pukul " + hw(h) + " lewat lima menit"; break;
        case 10: main = "Pukul " + hw(h) + " lewat sepuluh menit"; break;
        case 15: main = "Pukul " + hw(h) + " seperempat"; break;
        case 20: main = "Pukul " + hw(h) + " lewat dua puluh menit"; break;
        case 25: main = "Pukul " + hw(h) + " lewat dua puluh lima menit"; break;
        case 30: main = "Pukul setengah " + hw(nH); break;
        case 35: main = "Pukul " + hw(nH) + " kurang dua puluh lima menit"; break;
        case 40: main = "Pukul " + hw(nH) + " kurang dua puluh menit"; break;
        case 45: main = "Pukul " + hw(nH) + " kurang seperempat"; break;
        case 50: main = "Pukul " + hw(nH) + " kurang sepuluh menit"; break;
        case 55: main = "Pukul " + hw(nH) + " kurang lima menit"; break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
