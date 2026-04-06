// English
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = [
    "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
    "seventeen", "eighteen", "nineteen"
  ];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty"];

  function w(n) {
    if (n < 20) return ones[n];
    const t = tens[Math.floor(n / 10)];
    const o = ones[n % 10];
    return o ? t + "-" + o : t;
  }

  return {
    name: "English",
    flag: "\ud83c\uddec\ud83c\udde7",
    format(h, m) {
      const hr = ones[h % 12 || 12];
      const mn = m === 0 ? "o\u2019clock" : m < 10 ? "oh " + ones[m] : w(m);
      return "It is " + hr + " " + mn;
    }
  };
})());
