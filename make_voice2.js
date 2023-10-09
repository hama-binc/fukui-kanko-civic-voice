import { CSV } from "https://js.sabae.cc/CSV.js";

export const makeVoice2 = async () => {
  const list = [
    ["chugakusei", "中学生"],
    ["kokosei", "高校生"],
    ["ippan", "一般"],
  ];

  const data = [];
  for (const l of list) {
    const d0 = await CSV.fetchJSON("R5bijon_" + l[0] + "_kekka.csv");
    d0.forEach(d => {
      d.属性 = l[1];
      data.push(d);
    });
  }

  const q1 = "鯖江市の将来像について、夢や希望、アイデアなど、想いを自由に書いてください。";
  const q2 = "その他、市に対して言いたいことを、自由に書いてください。";
  const qh1 = "あなたが社会人になっても鯖江市に住み続けたい？ [※１～２を選択した人の次の設問はQ７です]";
  const qh2 = "あなたが社会人になっても鯖江市（市外の方は今住んでるまち）に住み続けたい？ [※１～２を選択した人の次の設問はQ７です]";
  const qh3 = "あなたは鯖江市に住み続けたいですか？ [※１～２を選択した人の次の設問はQ９です]";
  const voice = data.filter(d => d[q1] || d[q1]).map(d => {
    const age = d.属性 == "一般" ? d["あなたの年齢は？"] : d.属性;
    const happiness = d.属性 == "一般" ? d[qh3] : d.属性 == "中学生" ? d[qh1] : d[qh2];
    return {
      voice: (d[q1] ? d[q1].trim() + "\n" : "") + (d[q2] ? d[q2].trim() + "\n" : ""),
      age,
      sex: d["あなたの性別は？"],
      happiness,
    };
  });
  return voice;
};

//console.log(voice);
