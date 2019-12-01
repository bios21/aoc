export const getInput = async (nb?: string) => new TextDecoder("utf-8").decode(await Deno.readFile(`${nb ?? Deno.args[0].replace('.ts', '')}.input`));
export const getInputAsArray = async (nb?: string) => (await getInput(nb)).split('\n');
export const getInputAsNumbers = async (nb?: string) => (await getInputAsArray(nb)).map(Number);