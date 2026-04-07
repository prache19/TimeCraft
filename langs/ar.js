// العربية (Arabic)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const hw = ["", "الواحدة", "الثانية", "الثالثة", "الرابعة", "الخامسة", "السادسة", "السابعة", "الثامنة", "التاسعة", "العاشرة", "الحادية عشرة", "الثانية عشرة"];
  function hrW(h) { return hw[h % 12 || 12]; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    return "+" + off + " دقيقة";
  }

  // Word clock grid (9 rows x 8 cols) — array-of-arrays for Arabic script
  // Using whole words as cells for clean rendering.
  //
  // Key words:
  //   الساعة (the hour), و (and), إلا (minus/to)
  //   خمس (5), عشر (10), ربع (quarter), عشرون (20), خمس وعشرون (25)
  //   نصف (half), دقائق (minutes), دقيقة (minute)
  //   Hours: الواحدة..الثانية عشرة

  const GRID = [
    ["الساعة", "و", "إلا", "الربع", "النصف", "خمس", "عشر", "دقائق"],
    ["عشرون", "دقيقة", "الواحدة", "الثانية", "الثالثة", "نور", "ضوء", "قمر"],
    ["الرابعة", "الخامسة", "السادسة", "السابعة", "زمن", "وقت", "ساعة", "فجر"],
    ["الثامنة", "التاسعة", "العاشرة", "صبح", "ظهر", "عصر", "مغرب", "عشاء"],
    ["الحادية", "عشرة", "الثانية", "عشرة", "ليل", "نهار", "غروب", "شروق"],
  ];

  // Named positions: [row, colStart, colEnd] (inclusive)
  const W = {
    ALSAA:    [0, 0, 0],   // الساعة
    WA:       [0, 1, 1],   // و
    ILLA:     [0, 2, 2],   // إلا
    ALRUBUE:  [0, 3, 3],   // الربع
    ALNISF:   [0, 4, 4],   // النصف
    MKHAMS:   [0, 5, 5],   // خمس (minutes)
    MASHR:    [0, 6, 6],   // عشر (minutes)
    DAQAIQ:   [0, 7, 7],   // دقائق
    ISHROON:  [1, 0, 0],   // عشرون
    DAQIQA:   [1, 1, 1],   // دقيقة
    WAHIDA:   [1, 2, 2],   // الواحدة
    THANIYA:  [1, 3, 3],   // الثانية (hour 2)
    THALITHA: [1, 4, 4],   // الثالثة
    RABIAA:   [2, 0, 0],   // الرابعة
    KHAMISA:  [2, 1, 1],   // الخامسة
    SADISA:   [2, 2, 2],   // السادسة
    SABIAA:   [2, 3, 3],   // السابعة
    THAMINA:  [3, 0, 0],   // الثامنة
    TASIAA:   [3, 1, 1],   // التاسعة
    ASHIRA:   [3, 2, 2],   // العاشرة
    HADIYA:   [4, 0, 1],   // الحادية عشرة (11)
    THAN_ASH: [4, 2, 3],   // الثانية عشرة (12)
  };

  const HOUR_WORDS = {
    1: W.WAHIDA, 2: W.THANIYA, 3: W.THALITHA, 4: W.RABIAA,
    5: W.KHAMISA, 6: W.SADISA, 7: W.SABIAA, 8: W.THAMINA,
    9: W.TASIAA, 10: W.ASHIRA, 11: W.HADIYA, 12: W.THAN_ASH
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
    const words = [W.ALSAA];

    switch (base) {
      case 0:  // الساعة [hour]
        break;
      case 5:  // الساعة [hour] وخمس دقائق
        words.push(W.WA, W.MKHAMS, W.DAQAIQ); break;
      case 10: // الساعة [hour] وعشر دقائق
        words.push(W.WA, W.MASHR, W.DAQAIQ); break;
      case 15: // الساعة [hour] والربع
        words.push(W.WA, W.ALRUBUE); break;
      case 20: // الساعة [hour] وعشرون دقيقة
        words.push(W.WA, W.ISHROON, W.DAQIQA); break;
      case 25: // الساعة [hour] وخمس وعشرون دقيقة
        words.push(W.WA, W.MKHAMS, W.ISHROON, W.DAQIQA); break;
      case 30: // الساعة [hour] والنصف
        words.push(W.WA, W.ALNISF); break;
      case 35: // الساعة [nextHour] إلا خمس وعشرون دقيقة
        words.push(W.ILLA, W.MKHAMS, W.ISHROON, W.DAQIQA); break;
      case 40: // الساعة [nextHour] إلا عشرون دقيقة
        words.push(W.ILLA, W.ISHROON, W.DAQIQA); break;
      case 45: // الساعة [nextHour] إلا ربع
        words.push(W.ILLA, W.ALRUBUE); break;
      case 50: // الساعة [nextHour] إلا عشر دقائق
        words.push(W.ILLA, W.MASHR, W.DAQAIQ); break;
      case 55: // الساعة [nextHour] إلا خمس دقائق
        words.push(W.ILLA, W.MKHAMS, W.DAQAIQ); break;
    }

    words.push(HOUR_WORDS[h12]);
    return expand(words);
  }

  return {
    name: "العربية", flag: "🇸🇦",
    grid: {
      letters: GRID,
      highlight: highlight
    },
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = "الساعة " + hrW(h); break;
        case 5:  main = "الساعة " + hrW(h) + " وخمس دقائق"; break;
        case 10: main = "الساعة " + hrW(h) + " وعشر دقائق"; break;
        case 15: main = "الساعة " + hrW(h) + " والربع"; break;
        case 20: main = "الساعة " + hrW(h) + " وعشرون دقيقة"; break;
        case 25: main = "الساعة " + hrW(h) + " وخمس وعشرون دقيقة"; break;
        case 30: main = "الساعة " + hrW(h) + " والنصف"; break;
        case 35: main = "الساعة " + hrW(nH) + " إلا خمس وعشرون دقيقة"; break;
        case 40: main = "الساعة " + hrW(nH) + " إلا عشرون دقيقة"; break;
        case 45: main = "الساعة " + hrW(nH) + " إلا ربع"; break;
        case 50: main = "الساعة " + hrW(nH) + " إلا عشر دقائق"; break;
        case 55: main = "الساعة " + hrW(nH) + " إلا خمس دقائق"; break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
