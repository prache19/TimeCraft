// বাংলা (Bengali)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = [
    "", "\u098f\u0995", "\u09a6\u09c1\u0987", "\u09a4\u09bf\u09a8",
    "\u099a\u09be\u09b0", "\u09aa\u09be\u0981\u099a", "\u099b\u09af\u09bc",
    "\u09b8\u09be\u09a4", "\u0986\u099f", "\u09a8\u09af\u09bc", "\u09a6\u09b6",
    "\u098f\u0997\u09be\u09b0\u09cb", "\u09ac\u09be\u09b0\u09cb",
    "\u09a4\u09c7\u09b0\u09cb", "\u099a\u09cc\u09a6\u09cd\u09a6",
    "\u09aa\u09a8\u09c7\u09b0\u09cb", "\u09b7\u09cb\u09b2\u09cb",
    "\u09b8\u09a4\u09c7\u09b0\u09cb", "\u0986\u09a0\u09be\u09b0\u09cb",
    "\u0989\u09a8\u09bf\u09b6"
  ];
  const tens = [
    "", "", "\u09ac\u09bf\u09b6", "\u09a4\u09bf\u09b0\u09bf\u09b6",
    "\u099a\u09b2\u09cd\u09b2\u09bf\u09b6", "\u09aa\u099e\u09cd\u099a\u09be\u09b6"
  ];

  function w(n) {
    if (n < 20) return ones[n];
    if (n % 10 === 0) return tens[Math.floor(n / 10)];
    return tens[Math.floor(n / 10)] + " " + ones[n % 10];
  }

  return {
    name: "\u09ac\u09be\u0982\u09b2\u09be",
    flag: "\ud83c\udde7\ud83c\udde9",
    format(h, m) {
      const hr = ones[h % 12 || 12];
      if (m === 0) return hr + "\u099f\u09be \u09ac\u09be\u099c\u09c7";
      return hr + "\u099f\u09be \u09ac\u09c7\u099c\u09c7 " + w(m) + " \u09ae\u09bf\u09a8\u09bf\u099f";
    }
  };
})());
