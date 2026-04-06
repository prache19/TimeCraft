// 한국어 (Korean)
window.TimeCraftLangs = window.TimeCraftLangs || [];
window.TimeCraftLangs.push((() => {
  const hn = [
    "", "\ud55c", "\ub450", "\uc138", "\ub124", "\ub2e4\uc12f",
    "\uc5ec\uc12f", "\uc77c\uacf1", "\uc5ec\ub35f", "\uc544\ud649",
    "\uc5f4", "\uc5f4\ud55c", "\uc5f4\ub450"
  ];
  const mt = ["", "", "\uc774\uc2ed", "\uc0bc\uc2ed", "\uc0ac\uc2ed", "\uc624\uc2ed"];
  const mo = ["", "\uc77c", "\uc774", "\uc0bc", "\uc0ac", "\uc624", "\uc721", "\uce60", "\ud314", "\uad6c"];

  function mw(n) {
    if (n < 10) return mo[n];
    const t = mt[Math.floor(n / 10)];
    const o = mo[n % 10];
    return o ? t + o : t;
  }

  return {
    name: "\ud55c\uad6d\uc5b4",
    flag: "\ud83c\uddf0\ud83c\uddf7",
    format(h, m) {
      const hr = hn[h % 12 || 12];
      return m === 0 ? hr + " \uc2dc \uc815\uac01" : hr + " \uc2dc " + mw(m) + " \ubd84";
    }
  };
})());
