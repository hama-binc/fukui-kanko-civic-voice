import { CSV } from "https://js.sabae.cc/CSV.js";

// 問14　鯖江市が策定した「第２期 鯖江市まち・ひと・しごと創生総合戦略」を知っていますか

const data = await CSV.fetchJSON("R5sisei_kekka.csv");
const q = "問14";
const cnt = {};
for (const d of data) {
  const v = d[q];
  const c = cnt[v];
  if (c) {
    c.cnt++;
  } else {
    cnt[v] = { cnt: 1 };
  }
}
for (const name in cnt) {
  console.log(name + " " + cnt[name].cnt + " " + (cnt[name].cnt / data.length * 100).toFixed(1) + "%");
}
console.log(data.length);
