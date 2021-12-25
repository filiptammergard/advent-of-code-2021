export function partOne(input: string) {
  const rules = parseRules(input);
  return rules.reduce((prev, { index1, index2, addend }) => {
    const [a, b] = addend > 0 ? [9 - addend, 9] : [9, 9 + addend];
    return prev + a * 10 ** (13 - index1) + b * 10 ** (13 - index2);
  }, 0);
}

export function partTwo(input: string) {
  const rules = parseRules(input);
  return rules.reduce((prev, { index1, index2, addend }) => {
    const [a, b] = addend > 0 ? [1, 1 + addend] : [1 - addend, 1];
    return prev + a * 10 ** (13 - index1) + b * 10 ** (13 - index2);
  }, 0);
}

interface Rule {
  index1: number;
  index2: number;
  addend: number;
}

const parseRules = (input: string) => {
  const rules: Rule[] = [];
  const stack: [number, number][] = [];
  input
    .split("\ninp w")
    .map((block) => [...block.matchAll(/-?\d+/g)].map((d) => +d))
    .forEach(({ [2]: a, [3]: b, [9]: c }, index2) => {
      if (a === 1) {
        stack.push([c, index2]);
      } else {
        const [c, index1] = stack.pop()!;
        const addend = b + c;
        rules.push({ index1, index2, addend });
      }
    });
  return rules.sort((a, b) => a.index1 - b.index1);
};
