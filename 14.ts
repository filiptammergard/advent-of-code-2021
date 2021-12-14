export function partOne(input: string) {
  let [template, rules] = [
    input.split("\n\n")[0],
    input
      .split("\n\n")[1]
      .split("\n")
      .map((rule) => rule.split(" -> ")),
  ];
  for (let step = 0; step < 10; step++) {
    let temp = template.at(0) ?? "";
    for (let i = 0; i < template.length - 1; i++) {
      const pair = template.slice(i, i + 2);
      rules.forEach((rule) => {
        if (pair === rule[0]) {
          temp = `${temp}${rule[1]}${pair.at(1)}`;
        }
      });
    }
    template = temp;
  }
  const occurrances = template.split("").reduce(
    (acc: Record<string, number>, letter) => ({
      ...acc,
      [letter]: (acc[letter] ?? 0) + 1,
    }),
    {}
  );
  return (
    Math.max(...Object.values(occurrances)) -
    Math.min(...Object.values(occurrances))
  );
}

export function partTwo(input: string) {
  const [template, rules] = [
    input.split("\n\n")[0],
    input
      .split("\n\n")[1]
      .split("\n")
      .map((rule) => rule.split(" -> ")),
  ];
  const pairRules = rules.reduce(
    (acc: Record<string, string[]>, rule) => ({
      ...acc,
      [rule[0]]: [rule[0].at(0) + rule[1], rule[1] + rule[0].at(1)],
    }),
    {}
  );
  let pairCounts: Record<string, number> = {};
  for (let i = 0; i < template.length - 1; i++) {
    const pair = template.slice(i, i + 2);
    pairCounts[pair] = (pairCounts[pair] ?? 0) + 1;
  }
  for (let step = 0; step < 40; step++) {
    const nextCounts: Record<string, number> = {};
    Object.keys(pairCounts).forEach((pair) => {
      pairRules[pair].forEach((nextPair) => {
        nextCounts[nextPair] = (nextCounts[nextPair] ?? 0) + pairCounts[pair];
      });
    });
    pairCounts = nextCounts;
  }
  const occurrances = Object.keys(pairCounts).reduce(
    (acc: Record<string, number>, pair) => ({
      ...acc,
      [pair[1]]: (acc[pair[1]] ?? 0) + pairCounts[pair],
    }),
    {}
  );
  return (
    Math.max(...Object.values(occurrances)) -
    Math.min(...Object.values(occurrances))
  );
}
