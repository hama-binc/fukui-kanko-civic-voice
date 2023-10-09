import { CSV } from "https://js.sabae.cc/CSV.js";
import { makeVoice1 } from "./make_voice1.js";
import { makeVoice2 } from "./make_voice2.js";

const makeVoice = async () => {
  const data = [];
  (await makeVoice1()).forEach(d => data.push(d));
  (await makeVoice2()).forEach(d => data.push(d));
  return data;
};
const data = await makeVoice();
//console.log(data);
await Deno.writeTextFile("R5_voice.csv", CSV.stringify(data));
