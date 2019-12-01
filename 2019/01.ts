import { getInputAsNumbers } from './utils.ts';

const getFuel = (mass: number) => Math.floor(mass / 3) - 2;
const parsed = await getInputAsNumbers();
const result1 = parsed.reduce((p, c) => p + getFuel(c), 0);

console.log(result1);


const getFuelWithFuel = (mass: number) => {
    let massWithFuel = getFuel(mass);
    let sum = massWithFuel;
    while (massWithFuel > 0) {
        let calc = getFuel(massWithFuel);
        if (calc >= 0) {
            sum += (massWithFuel = calc);
        }
        else massWithFuel = 0;
    }

    return sum;
}

const result2 = parsed.reduce((p, c) => p + getFuelWithFuel(c), 0)
console.log(result2);