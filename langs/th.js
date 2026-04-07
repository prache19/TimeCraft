// ไทย (Thai)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า", "สิบ", "สิบเอ็ด", "สิบสอง"];
  function hw(h) { return ones[h % 12 || 12]; }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    return "+" + off + " นาที";
  }

  // Word clock grid (8 rows x 9 cols) — array-of-arrays for Thai script
  // Each cell is a complete Thai syllable cluster.
  //
  // Key words:
  //   นาฬิกา (o'clock), ตรง (exact), ครึ่ง (half)
  //   ห้า (5), สิบ (10), สิบห้า (15), ยี่สิบ (20), ยี่สิบห้า (25)
  //   นาที (minutes), อีก (more/to)
  //   Hours: หนึ่ง สอง สาม สี่ ห้า หก เจ็ด แปด เก้า สิบ สิบเอ็ด สิบสอง

  const GRID = [
    ["อีก", "นาฬิกา", "ตรง", "ครึ่ง", "ห้า", "นาที", "เวลา", "ยาม", "ค่ำ"],
    ["สิบ", "ยี่สิบ", "สิบห้า", "หนึ่ง", "สอง", "เช้า", "สาย", "บ่าย", "เย็น"],
    ["สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "ตี", "ทุ่ม", "โมง"],
    ["เก้า", "สิบ", "สิบเอ็ด", "สิบสอง", "ดึก", "รุ่ง", "แจ้ง", "กลาง", "วัน"],
  ];

  // Named positions: [row, colStart, colEnd] (inclusive)
  const W = {
    EEK:      [0, 0, 0],   // อีก (to/more)
    NALIKA:   [0, 1, 1],   // นาฬิกา
    TRONG:    [0, 2, 2],   // ตรง (exact/sharp)
    KRUENG:   [0, 3, 3],   // ครึ่ง (half)
    MHA:      [0, 4, 4],   // ห้า (minute-5)
    NATI:     [0, 5, 5],   // นาที
    MSIB:     [1, 0, 0],   // สิบ (minute-10)
    MYEESIB:  [1, 1, 1],   // ยี่สิบ (minute-20)
    MSIBHA:   [1, 2, 2],   // สิบห้า (minute-15)
    NUENG:    [1, 3, 3],   // หนึ่ง
    SONG:     [1, 4, 4],   // สอง
    SAAM:     [2, 0, 0],   // สาม
    SII:      [2, 1, 1],   // สี่
    HHA:      [2, 2, 2],   // ห้า (hour)
    HOK:      [2, 3, 3],   // หก
    JET:      [2, 4, 4],   // เจ็ด
    PAET:     [2, 5, 5],   // แปด
    KAO:      [3, 0, 0],   // เก้า
    HSIB:     [3, 1, 1],   // สิบ (hour-10)
    SIBET:    [3, 2, 2],   // สิบเอ็ด (hour-11)
    SIBSONG:  [3, 3, 3],   // สิบสอง (hour-12)
  };

  const HOUR_WORDS = {
    1: W.NUENG, 2: W.SONG, 3: W.SAAM, 4: W.SII, 5: W.HHA, 6: W.HOK,
    7: W.JET, 8: W.PAET, 9: W.KAO, 10: W.HSIB, 11: W.SIBET, 12: W.SIBSONG
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

    switch (base) {
      case 0:  // [hour] นาฬิกา ตรง
        words.push(HOUR_WORDS[h % 12 || 12], W.NALIKA, W.TRONG); break;
      case 5:  // [hour] นาฬิกา ห้า นาที
        words.push(HOUR_WORDS[h % 12 || 12], W.NALIKA, W.MHA, W.NATI); break;
      case 10: // [hour] นาฬิกา สิบ นาที
        words.push(HOUR_WORDS[h % 12 || 12], W.NALIKA, W.MSIB, W.NATI); break;
      case 15: // [hour] นาฬิกา สิบห้า
        words.push(HOUR_WORDS[h % 12 || 12], W.NALIKA, W.MSIBHA); break;
      case 20: // [hour] นาฬิกา ยี่สิบ นาที
        words.push(HOUR_WORDS[h % 12 || 12], W.NALIKA, W.MYEESIB, W.NATI); break;
      case 25: // [hour] นาฬิกา ยี่สิบ ห้า นาที
        words.push(HOUR_WORDS[h % 12 || 12], W.NALIKA, W.MYEESIB, W.MHA, W.NATI); break;
      case 30: // [hour] นาฬิกา ครึ่ง
        words.push(HOUR_WORDS[h % 12 || 12], W.NALIKA, W.KRUENG); break;
      case 35: // อีก ยี่สิบ ห้า นาที [nextHour] นาฬิกา
        words.push(W.EEK, W.MYEESIB, W.MHA, W.NATI, HOUR_WORDS[h12], W.NALIKA); break;
      case 40: // อีก ยี่สิบ นาที [nextHour] นาฬิกา
        words.push(W.EEK, W.MYEESIB, W.NATI, HOUR_WORDS[h12], W.NALIKA); break;
      case 45: // อีก สิบห้า นาที [nextHour] นาฬิกา
        words.push(W.EEK, W.MSIBHA, W.NATI, HOUR_WORDS[h12], W.NALIKA); break;
      case 50: // อีก สิบ นาที [nextHour] นาฬิกา
        words.push(W.EEK, W.MSIB, W.NATI, HOUR_WORDS[h12], W.NALIKA); break;
      case 55: // อีก ห้า นาที [nextHour] นาฬิกา
        words.push(W.EEK, W.MHA, W.NATI, HOUR_WORDS[h12], W.NALIKA); break;
    }

    return expand(words);
  }

  return {
    name: "ไทย", flag: "🇹🇭",
    grid: {
      letters: GRID,
      highlight: highlight
    },
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = hw(h) + " นาฬิกาตรง"; break;
        case 5:  main = hw(h) + " นาฬิกาห้านาที"; break;
        case 10: main = hw(h) + " นาฬิกาสิบนาที"; break;
        case 15: main = hw(h) + " นาฬิกาสิบห้า"; break;
        case 20: main = hw(h) + " นาฬิกายี่สิบนาที"; break;
        case 25: main = hw(h) + " นาฬิกายี่สิบห้านาที"; break;
        case 30: main = hw(h) + " นาฬิกาครึ่ง"; break;
        case 35: main = "อีกยี่สิบห้านาที " + hw(nH) + " นาฬิกา"; break;
        case 40: main = "อีกยี่สิบนาที " + hw(nH) + " นาฬิกา"; break;
        case 45: main = "อีกสิบห้านาที " + hw(nH) + " นาฬิกา"; break;
        case 50: main = "อีกสิบนาที " + hw(nH) + " นาฬิกา"; break;
        case 55: main = "อีกห้านาที " + hw(nH) + " นาฬิกา"; break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
