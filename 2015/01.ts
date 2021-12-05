import { getInput } from "../utils.ts";

// const data = "()())";
const data = await getInput();
let floor = 0;

let basementReached = false;
data.split("").forEach((char, idx) => {
  if (char === "(") floor++;
  else if (char === ")") floor--;

  if (!basementReached && floor === -1) {
    console.log("char pos basement", idx + 1);
    basementReached = true;
  }
});

console.log(floor);
