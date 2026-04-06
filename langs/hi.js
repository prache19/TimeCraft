// हिन्दी (Hindi)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const ones = [
    "", "\u090f\u0915", "\u0926\u094b", "\u0924\u0940\u0928", "\u091a\u093e\u0930",
    "\u092a\u093e\u0901\u091a", "\u091b\u0939", "\u0938\u093e\u0924", "\u0906\u0920",
    "\u0928\u094c", "\u0926\u0938", "\u0917\u094d\u092f\u093e\u0930\u0939",
    "\u092c\u093e\u0930\u0939", "\u0924\u0947\u0930\u0939", "\u091a\u094c\u0926\u0939",
    "\u092a\u0902\u0926\u094d\u0930\u0939", "\u0938\u094b\u0932\u0939",
    "\u0938\u0924\u094d\u0930\u0939", "\u0905\u0920\u093e\u0930\u0939",
    "\u0909\u0928\u094d\u0928\u0940\u0938"
  ];
  const tens = [
    "", "", "\u092c\u0940\u0938", "\u0924\u0940\u0938",
    "\u091a\u093e\u0932\u0940\u0938", "\u092a\u091a\u093e\u0938"
  ];

  function w(n) {
    if (n < 20) return ones[n];
    if (n % 10 === 0) return tens[Math.floor(n / 10)];
    return tens[Math.floor(n / 10)] + " " + ones[n % 10];
  }

  return {
    name: "\u0939\u093f\u0928\u094d\u0926\u0940",
    flag: "\ud83c\uddee\ud83c\uddf3",
    format(h, m) {
      const hr = ones[h % 12 || 12];
      if (m === 0) return hr + " \u092c\u091c\u0947 \u0939\u0948\u0902";
      return hr + " \u092c\u091c\u0915\u0930 " + w(m) + " \u092e\u0940\u0928\u093f\u091f";
    }
  };
})());
