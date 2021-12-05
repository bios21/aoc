import { getInput } from "../utils.ts";

// const data = "^v^v^v^v^v";
const data = await getInput();

interface House {
  pos: [ns: number, ew: number];
  presentCount: number;
}
const houses: House[] = [{ pos: [0, 0], presentCount: 2 }];
let [santaNs, santaEw] = [0, 0];
let [robotNs, robotEw] = [0, 0];

data.split("").forEach((instuction, idx) => {
  const santaMove = idx % 2 === 0;
  let [ns, ew] = santaMove ? [santaNs, santaEw] : [robotNs, robotEw];
  switch (instuction) {
    case "^":
      ns = santaMove ? ++santaNs : ++robotNs;
      break;
    case "v":
      ns = santaMove ? --santaNs : --robotNs;
      break;
    case ">":
      ew = santaMove ? ++santaEw : ++robotEw;
      break;
    case "<":
      ew = santaMove ? --santaEw : --robotEw;
      break;
  }

  const deliveredHouse = houses.find((house) =>
    house.pos[0] === ns && house.pos[1] === ew
  );
  if (deliveredHouse) {
    deliveredHouse.presentCount++;
  } else {
    houses.push({
      pos: [ns, ew],
      presentCount: 1,
    });
  }
});

const atLeastOnePresent = houses.length;

console.log({ atLeastOnePresent });
