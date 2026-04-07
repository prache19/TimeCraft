// Kiswahili (Swahili)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "moja", "mbili", "tatu", "nne", "tano", "sita", "saba", "nane", "tisa", "kumi", "kumi na moja", "kumi na mbili"];
  function swHr(h) { return (((h % 12 || 12) + 6) % 12) || 12; }
  function hw(h) { return ones[swHr(h)]; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    return "+" + off + " dakika";
  }

  //          0  1  2  3  4  5  6  7  8  9  10 11 12 13
  // Row 0:   S  A  A  M  O  J  A  K  A  M  I  L  I  X   SAA(0-2) MOJA(3-6) KAMILI(7-12)
  // Row 1:   M  B  I  L  I  T  A  T  U  N  N  E  G  K   MBILI(0-4) TATU(5-8) NNE(9-11)
  // Row 2:   T  A  N  O  S  I  T  A  S  A  B  A  G  X   TANO(0-3)hr SITA(4-7) SABA(8-11)
  // Row 3:   N  A  N  E  T  I  S  A  N  A  D  G  K  X   NANE(0-3) TISA(4-7) NA(8-9)
  // Row 4:   K  U  M  I  N  A  M  O  J  A  B  G  X  K   KUMINAMOJA(0-9); KUMI(0-3) for hr10
  // Row 5:   K  U  M  I  N  A  M  B  I  L  I  G  X  K   KUMINAMBILI(0-10); KUMI(0-3)
  // Row 6:   D  A  K  I  K  A  T  A  N  O  R  G  X  K   DAKIKA(0-5) TANO(6-9)min
  // Row 7:   K  U  M  I  R  O  B  O  N  U  S  U  X  K   KUMI(0-3)min ROBO(4-7) NUSU(8-11)
  // Row 8:   K  A  S  O  R  O  B  O  I  G  X  K  N  M   KASOROBO(0-7)
  // Row 9:   K  A  S  O  R  O  D  G  X  K  N  B  M  L   KASORO(0-5)
  // Row 10:  I  S  H  I  R  I  N  I  N  A  T  A  N  O   ISHIRINI(0-7) ISHIRININATANO(0-13)
  // Row 11:  L  B  D  G  K  X  T  R  V  S  K  N  Z  P   filler
  // Row 12:  M  Z  N  B  D  G  K  X  V  S  G  L  R  P   filler
  const GRID = [
    "SAAMOJAKAMILIX",
    "MBILITATUNNEGK",
    "TANOSITASABAGX",
    "NANETISANADGKX",
    "KUMINAMOJABGXK",
    "KUMINAMBILIGXK",
    "DAKIKATANORGXK",
    "KUMIROBONUSUXK",
    "KASOROBOIGXKNM",
    "KASORODGXKNBML",
    "ISHIRININATANO",
    "LBDGKXTRVSKNNP",
    "MZNBDGKXVSGLRP"
  ];

  const W = {
    SAA:          [0, 0, 2],
    KAMILI:       [0, 7, 12],
    NA:           [3, 8, 9],
    DAKIKA:       [6, 0, 5],
    ROBO:         [7, 4, 7],
    NUSU:         [7, 8, 11],
    KASOROBO:     [8, 0, 7],
    KASORO:       [9, 0, 5],
    // Hour words
    MOJA:         [0, 3, 6],
    MBILI:        [1, 0, 4],
    TATU:         [1, 5, 8],
    NNE:          [1, 9, 11],
    HTANO:        [2, 0, 3],
    SITA:         [2, 4, 7],
    SABA:         [2, 8, 11],
    NANE:         [3, 0, 3],
    TISA:         [3, 4, 7],
    HKUMI:        [4, 0, 3],
    HKUMINAMOJA:  [4, 0, 9],
    HKUMINAMBILI: [5, 0, 10],
    // Minute words
    MTANO:        [6, 6, 9],
    MKUMI:        [7, 0, 3],
    ISHIRINI:     [10, 0, 7],
    ISHIRININATANO:[10, 0, 13]
  };

  const HOUR_WORDS = {
    1: W.MOJA, 2: W.MBILI, 3: W.TATU, 4: W.NNE, 5: W.HTANO,
    6: W.SITA, 7: W.SABA, 8: W.NANE, 9: W.TISA,
    10: W.HKUMI, 11: W.HKUMINAMOJA, 12: W.HKUMINAMBILI
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
    const swH = (((hourFor % 12 || 12) + 6) % 12) || 12;
    const words = [W.SAA];

    switch (base) {
      case 0:  words.push(W.KAMILI); break;
      case 5:  words.push(W.NA, W.DAKIKA, W.MTANO); break;
      case 10: words.push(W.NA, W.DAKIKA, W.MKUMI); break;
      case 15: words.push(W.NA, W.ROBO); break;
      case 20: words.push(W.NA, W.DAKIKA, W.ISHIRINI); break;
      case 25: words.push(W.NA, W.DAKIKA, W.ISHIRININATANO); break;
      case 30: words.push(W.NA, W.NUSU); break;
      case 35: words.push(W.KASORO, W.DAKIKA, W.ISHIRININATANO); break;
      case 40: words.push(W.KASORO, W.DAKIKA, W.ISHIRINI); break;
      case 45: words.push(W.KASOROBO); break;
      case 50: words.push(W.KASORO, W.DAKIKA, W.MKUMI); break;
      case 55: words.push(W.KASORO, W.DAKIKA, W.MTANO); break;
    }

    words.push(HOUR_WORDS[swH]);
    return expand(words);
  }

  return {
    name: "Kiswahili", flag: "🇹🇿",
    grid: {
      letters: GRID,
      highlight: highlight
    },
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = "Saa " + hw(h) + " kamili"; break;
        case 5:  main = "Saa " + hw(h) + " na dakika tano"; break;
        case 10: main = "Saa " + hw(h) + " na dakika kumi"; break;
        case 15: main = "Saa " + hw(h) + " na robo"; break;
        case 20: main = "Saa " + hw(h) + " na dakika ishirini"; break;
        case 25: main = "Saa " + hw(h) + " na dakika ishirini na tano"; break;
        case 30: main = "Saa " + hw(h) + " na nusu"; break;
        case 35: main = "Saa " + hw(nH) + " kasoro dakika ishirini na tano"; break;
        case 40: main = "Saa " + hw(nH) + " kasoro dakika ishirini"; break;
        case 45: main = "Saa " + hw(nH) + " kasorobo"; break;
        case 50: main = "Saa " + hw(nH) + " kasoro dakika kumi"; break;
        case 55: main = "Saa " + hw(nH) + " kasoro dakika tano"; break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
