import { getInputAsArray } from "../utils.ts";

// const data = [
//   "123 -> x",
//   "456 -> y",
//   "x AND y -> d",
//   "x OR y -> e",
//   "x LSHIFT 2 -> f",
//   "y RSHIFT 2 -> g",
//   "NOT x -> h",
//   "NOT y -> i",
//   "g -> a",
// ];

// reminder
// ~ NOT
// & AND
// | OR
// ^ XOR
const data = await getInputAsArray();
const parserSetValue = /^([0-9]+|[a-z]+) -> ([a-z]+)$/gi; //14146 -> b
const parserNOT = /^NOT ([a-z]+) -> ([a-z]+)$/gi;
const parserANDOR = /^([0-9]+|[a-z]+) (AND|OR) ([a-z]+) -> ([a-z]+)$/gi;
const parserSHIFT = /^([a-z]+) (RSHIFT|LSHIFT) ([0-9]+) -> ([a-z]+)$/gi;

interface ANDOR {
  type: "AND" | "OR";
  values: [a: string | number, b: string];
}

interface NOT {
  type: "NOT";
  value: string;
}

interface SHIFT {
  type: "RSHIFT" | "LSHIFT";
  value: string;
  count: number;
}

interface SET {
  type: "SET";
  value: string | number;
}

type OPERATION = ANDOR | NOT | SHIFT | SET;

const operations = new Map<string, OPERATION>();

data.forEach((raw) => {
  let parsed: string[] | null = null;

  if ((parsed = new RegExp(parserSetValue).exec(raw))) {
    const [, valueStr, dest] = parsed;
    operations.set(dest, {
      type: "SET",
      value: valueStr,
    });
  } else if ((parsed = new RegExp(parserNOT).exec(raw))) {
    const [, value, dest] = parsed;
    operations.set(dest, {
      type: "NOT",
      value,
    });
  } else if ((parsed = new RegExp(parserANDOR).exec(raw))) {
    const [, value1, type, value2, dest] = parsed;
    operations.set(dest, {
      type: type === "AND" ? type as "AND" : type as "OR",
      values: [value1, value2],
    });
  } else if ((parsed = new RegExp(parserSHIFT).exec(raw))) {
    const [, value, type, countStr, dest] = parsed;
    operations.set(dest, {
      type: type === "RSHIFT" ? type as "RSHIFT" : type as "LSHIFT",
      count: +countStr,
      value,
    });
  }
});

const uint16 = (n: number) => n & 0xFFFF;

const applyOps = {
  "AND": (a: number, b: number) => uint16(a & b),
  "OR": (a: number, b: number) => uint16(a | b),
  "RSHIFT": (a: number, b: number) => uint16(a >> b),
  "LSHIFT": (a: number, b: number) => uint16(a << b),
  "NOT": (a: number) => uint16(~a),
} as const;

const vars = new Map<string, number>();
const getWire = (dest: string | number): number => {
  if (!isNaN(+dest)) {
    return +dest;
  }

  if (typeof dest !== "string") {
    throw new Error("wut?");
  }

  if (vars.has(dest)) {
    return vars.get(dest)!;
  }

  const ops = operations.get(dest);
  if (!ops) {
    console.log({ dest, ops });
    throw new Error(`no var nor ops? dest=${dest}`);
  }
  let foundValues: [number, number], computed = 0;
  switch (ops.type) {
    case "AND":
    case "OR":
      foundValues = ops.values.map((value) => getWire(value)) as [
        number,
        number,
      ];
      vars.set(
        dest,
        computed = applyOps[ops.type](...foundValues),
      );
      break;
    case "RSHIFT":
    case "LSHIFT":
      vars.set(
        dest,
        computed = applyOps[ops.type](getWire(ops.value)!, ops.count),
      );
      break;
    case "NOT":
      vars.set(dest, computed = applyOps.NOT(getWire(ops.value)!));
      break;
    case "SET":
      vars.set(
        dest,
        computed = getWire(ops.value),
      );
      break;
  }

  return computed;
};

const a1 = getWire("a");
vars.clear();
vars.set("b", a1);
const a2 = getWire("a");

console.log({ a1, a2 });
