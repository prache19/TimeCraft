// Fran\u00e7ais (French)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = ["", "une", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf",
    "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize",
    "dix-sept", "dix-huit", "dix-neuf", "vingt", "vingt et une", "vingt-deux", "vingt-trois"];
  function hrW(h) {
    const v = h % 24;
    if (v === 0) return "minuit";
    if (v === 1) return "une heure";
    return ones[v] + " heures";
  }
  function snap(m) {
    const base = Math.floor(m / 5) * 5;
    return { base: base, off: m - base };
  }
  function extra(off) {
    if (off === 0) return "";
    if (off === 1) return "+1 minute";
    return "+" + off + " minutes";
  }
  return {
    name: "Fran\u00e7ais", flag: "\ud83c\uddeb\ud83c\uddf7",
    format(h, m) {
      const s = snap(m), nH = (h + 1) % 24;
      let main;
      switch (s.base) {
        case 0:  main = "Il est " + hrW(h); break;
        case 5:  main = "Il est " + hrW(h) + " cinq"; break;
        case 10: main = "Il est " + hrW(h) + " dix"; break;
        case 15: main = "Il est " + hrW(h) + " et quart"; break;
        case 20: main = "Il est " + hrW(h) + " vingt"; break;
        case 25: main = "Il est " + hrW(h) + " vingt-cinq"; break;
        case 30: main = "Il est " + hrW(h) + " et demie"; break;
        case 35: main = "Il est " + hrW(nH) + " moins vingt-cinq"; break;
        case 40: main = "Il est " + hrW(nH) + " moins vingt"; break;
        case 45: main = "Il est " + hrW(nH) + " moins le quart"; break;
        case 50: main = "Il est " + hrW(nH) + " moins dix"; break;
        case 55: main = "Il est " + hrW(nH) + " moins cinq"; break;
      }
      return { main: main, extra: extra(s.off) };
    }
  };
})());
