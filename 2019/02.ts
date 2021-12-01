import { getInput } from "../utils.ts";
const enum OptCode {
  ADD = 1,
  MULTIPLY = 2,
  STOP = 99,
}

const WALK = 4;

const raw = await getInput();

const d = raw.split(",").map(Number);

function run(data: number[]) {
  for (let i = 0; i < data.length; i = i + WALK) {
    const optcode: OptCode = data[i];
    const posI1 = data[i + 1];
    const posI2 = data[i + 2];
    const posO = data[i + 3];

    switch (optcode) {
      case OptCode.STOP:
        return data[0];
      case OptCode.ADD:
        data[posO] = data[posI1] + data[posI2];
        break;
      case OptCode.MULTIPLY:
        data[posO] = data[posI1] * data[posI2];
        break;
      default:
        throw new Error("1202Exception ! Wrong optcode !");
    }
  }
  return data[0];
}

for (let noun = 0; noun <= 99; noun++) {
  for (let verb = 0; verb <= 99; verb++) {
    const data = [...d];
    data[1] = noun;
    data[2] = verb;
    if (run(data) === 19690720) {
      console.log(100 * noun + verb);
      Deno.exit();
    }
  }
}
