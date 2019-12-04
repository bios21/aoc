import { getInput } from './utils.ts';

const DIR = {
    U: [1, 0],
    D: [-1, 0],
    R: [0, 1],
    L: [0, -1],
} as const;

const input = await getInput();

const [A, B] = input.split('\n')
    .map(
        line => line
            .split(',')
            .map(
                coord => ({dir: coord[0], walk: Number(coord.substr(1))})
            )
    )
    .map(
        line => {
            let x = 0, y = 0, dist = 0;
            let seen = new Map<string, [[number, number], number]>();
            for (const wire of line) {
                for (let i = 0; i < wire.walk; i++) {
                    dist++;
                    x += DIR[wire.dir][0];
                    y += DIR[wire.dir][1];
                    if (!seen.has([x, y].toString())) {
                        seen.set([x, y].toString(), [[x, y], dist]);
                    }
                }
            }
            return seen;
        });

const intersecs = [...new Set([...A.keys()].filter(k => B.has(k)))];
console.log(
    Math.min(
        ...intersecs
            .map(k => A.get(k)[0])
            .map(point => Math.abs(point[0]) + Math.abs(point[1]))
    )
);

console.log(
    Math.min(
        ...intersecs
            .map(k => A.get(k)[1] + B.get(k)[1])
    )
)