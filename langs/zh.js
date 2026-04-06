// 中文 (Chinese)
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
    name: "\u4e2d\u6587",
    flag: "\ud83c\udde8\ud83c\uddf3",
    format(h, m) {
      const hr = w(h % 12 || 12);
      if (m === 0) return "\u73b0\u5728\u662f" + hr + "\u70b9\u6574";
      const mn = m < 10 ? "\u96f6" + w(m) : w(m);
      return "\u73b0\u5728\u662f" + hr + "\u70b9" + mn + "\u5206";
    }
  };
})());
