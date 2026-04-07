// Português (Portuguese)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "uma", "duas", "tr\u00eas", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze"];
  function hr(h) { return h % 12 || 12; }
  function hw(h) { return ones[hr(h)]; }
  function verb(h) { return hr(h) === 1 ? "\u00c9" : "S\u00e3o"; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    if (off === 1) return "+1 minuto";
    return "+" + off + " minutos";
  }

  // Word clock grid (10 rows x 13 cols)
  //
  // Index reference:
  // 0123456789012
  //
  // Row 0: É X S Ã O E F A L T A M X    É(0) SÃO(2-4) E(5) FALTAM(6-11)
  // Row 1: F A L T A U M Q U A R T O    FALTA(0-4) UMQUARTO(5-12)
  // Row 2: V I N T E E C I N C O X X    VINTE(0-4) ECINCO(5) MCINCO(6-10)
  // Row 3: E M P O N T O X M E I A X    EMPONTO(0-6) MEIA(8-11)
  // Row 4: D E Z X X P A R A X X X X    MDEZ(0-2) PARA(5-8)
  // Row 5: U M A X D U A S X T R Ê S    UMA(0-2) DUAS(4-7) TRÊS(9-12)
  // Row 6: Q U A T R O X C I N C O X    QUATRO(0-5) HCINCO(7-11)
  // Row 7: S E I S X S E T E X D E Z    SEIS(0-3) SETE(5-8) HDEZ(10-12)
  // Row 8: O I T O X N O V E X X L Z    OITO(0-3) NOVE(5-8)
  // Row 9: O N Z E X D O Z E X X K F    ONZE(0-3) DOZE(5-8)
  const GRID = [
    "\u00c9XSÃOEFALTAMX",
    "FALTAUMQUARTO",
    "VINTEECINCOXX",
    "EMPONTOXMEIAX",
    "DEZXXPARAXXXX",
    "UMAXDUASXTR\u00caS",
    "QUATROXCINCOX",
    "SEISXSETEXDEZ",
    "OITOXNOVEXXLZ",
    "ONZEXDOZEXXKF",
  ];

  // Named cell ranges: [row, colStart, colEnd] (inclusive)
  const W = {
    É:          [0, 0, 0],
    SÃO:        [0, 2, 4],
    E:          [0, 5, 5],      // general "e" connector
    FALTAM:     [0, 6, 11],
    FALTA:      [1, 0, 4],
    UMQUARTO:   [1, 5, 12],
    VINTE:      [2, 0, 4],
    ECINCO:     [2, 5, 5],     // the "e" in "vinte e cinco"
    MCINCO:     [2, 6, 10],    // "cinco" (minutes)
    EMPONTO:    [3, 0, 6],
    MEIA:       [3, 8, 11],
    MDEZ:       [4, 0, 2],     // "dez" (minutes)
    PARA:       [4, 5, 8],
    UMA:        [5, 0, 2],
    DUAS:       [5, 4, 7],
    TRÊS:       [5, 9, 12],
    QUATRO:     [6, 0, 5],
    HCINCO:     [6, 7, 11],   // "cinco" (hours)
    SEIS:       [7, 0, 3],
    SETE:       [7, 5, 8],
    HDEZ:       [7, 10, 12],  // "dez" (hours)
    OITO:       [8, 0, 3],
    NOVE:       [8, 5, 8],
    ONZE:       [9, 0, 3],
    DOZE:       [9, 5, 8],
  };

  const HOUR_WORDS = {
    1: W.UMA, 2: W.DUAS, 3: W.TRÊS, 4: W.QUATRO, 5: W.HCINCO, 6: W.SEIS,
    7: W.SETE, 8: W.OITO, 9: W.NOVE, 10: W.HDEZ, 11: W.ONZE, 12: W.DOZE
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

    if (base >= 35) {
      // "Faltam [min] para [hour]" or "Falta um quarto para [hour]"
      if (base === 45) {
        words.push(W.FALTA);
      } else {
        words.push(W.FALTAM);
      }

      switch (base) {
        case 35: words.push(W.VINTE, W.ECINCO, W.MCINCO); break;
        case 40: words.push(W.VINTE); break;
        case 45: words.push(W.UMQUARTO); break;
        case 50: words.push(W.MDEZ); break;
        case 55: words.push(W.MCINCO); break;
      }

      words.push(W.PARA);
    } else {
      // "É/São [hour] e [min]" or "É/São [hour] em ponto"
      if (h12 === 1) {
        words.push(W.É);
      } else {
        words.push(W.SÃO);
      }

      switch (base) {
        case 0:  words.push(W.EMPONTO); break;
        case 5:  words.push(W.E, W.MCINCO); break;
        case 10: words.push(W.E, W.MDEZ); break;
        case 15: words.push(W.E, W.UMQUARTO); break;
        case 20: words.push(W.E, W.VINTE); break;
        case 25: words.push(W.E, W.VINTE, W.ECINCO, W.MCINCO); break;
        case 30: words.push(W.E, W.MEIA); break;
      }
    }

    words.push(HOUR_WORDS[h12]);
    return expand(words);
  }

  return {
    name: "Portugu\u00eas", flag: "\ud83c\udde7\ud83c\uddf7",
    grid: {
      letters: GRID,
      highlight: highlight
    },
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = verb(h) + " " + hw(h) + " em ponto"; break;
        case 5:  main = verb(h) + " " + hw(h) + " e cinco"; break;
        case 10: main = verb(h) + " " + hw(h) + " e dez"; break;
        case 15: main = verb(h) + " " + hw(h) + " e um quarto"; break;
        case 20: main = verb(h) + " " + hw(h) + " e vinte"; break;
        case 25: main = verb(h) + " " + hw(h) + " e vinte e cinco"; break;
        case 30: main = verb(h) + " " + hw(h) + " e meia"; break;
        case 35: main = "Faltam vinte e cinco para " + hw(nH); break;
        case 40: main = "Faltam vinte para " + hw(nH); break;
        case 45: main = "Falta um quarto para " + hw(nH); break;
        case 50: main = "Faltam dez para " + hw(nH); break;
        case 55: main = "Faltam cinco para " + hw(nH); break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
