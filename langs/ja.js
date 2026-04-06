// 日本語 (Japanese)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const nums = [
    "", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94",
    "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341",
    "\u5341\u4e00", "\u5341\u4e8c"
  ];

  function w(n) {
    if (n <= 12) return nums[n];
    if (n < 20) return "\u5341" + nums[n - 10];
    return nums[Math.floor(n / 10)] + "\u5341" + (n % 10 ? nums[n % 10] : "");
  }

  return {
    name: "\u65e5\u672c\u8a9e",
    flag: "\ud83c\uddef\ud83c\uddf5",
    format(h, m) {
      const hr = w(h % 12 || 12);
      return m === 0 ? hr + "\u6642\u3067\u3059" : hr + "\u6642" + w(m) + "\u5206\u3067\u3059";
    }
  };
})());
