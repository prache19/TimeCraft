// English
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = [
    "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve"
  ];

  function hourWord(h) { return ones[h % 12 || 12]; }

  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }

  function extraText(off) {
    if (off === 0) return "";
    if (off === 1) return "+1 minute";
    return "+" + off + " minutes";
  }

  return {
    name: "English",
    flag: "\ud83c\uddec\ud83c\udde7",
    format(h, m) {
      const s = snap(m);
      const nextH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = "It is " + hourWord(h) + " o\u2019clock"; break;
        case 5:  main = "It is five past " + hourWord(h); break;
        case 10: main = "It is ten past " + hourWord(h); break;
        case 15: main = "It is quarter past " + hourWord(h); break;
        case 20: main = "It is twenty past " + hourWord(h); break;
        case 25: main = "It is twenty-five past " + hourWord(h); break;
        case 30: main = "It is half past " + hourWord(h); break;
        case 35: main = "It is twenty-five to " + hourWord(nextH); break;
        case 40: main = "It is twenty to " + hourWord(nextH); break;
        case 45: main = "It is quarter to " + hourWord(nextH); break;
        case 50: main = "It is ten to " + hourWord(nextH); break;
        case 55: main = "It is five to " + hourWord(nextH); break;
      }
      return { main: main, extra: extraText(s.off) };
    }
  };
})());
