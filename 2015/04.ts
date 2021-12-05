import { getInput } from "../utils.ts";
import { Md5 } from "https://deno.land/std@0.117.0/hash/md5.ts";

const data = "ckczppom";
// const data = await getInput();

const getMd5 = (str: string) => new Md5().update(str).toString("hex");

let i = 0, currentMd5 = "";
while (true) {
  currentMd5 = getMd5(`${data}${i}`);
  if (currentMd5.startsWith("000000")) {
    console.log({ i, currentMd5 });
    break;
  }

  i++;
}
