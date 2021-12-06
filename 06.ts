export function partOne(input: string) {
  const fishes = input.split(",").map((age) => parseInt(age, 10));

  const days = 80;

  for (let day = 0; day < days; day++) {
    const born: number[] = [];
    for (let fish = 0; fish < fishes.length; fish++) {
      if (fishes[fish] > 0) {
        fishes[fish]--;
      } else {
        born.push(8);
        fishes[fish] = 6;
      }
    }
    fishes.push(...born);
  }

  return fishes.length;
}

export function partTwo(input: string) {
  const fishes = input.split(",").map((age) => parseInt(age, 10));

  const days = 256;

  const ages = Array(9).fill(0);
  fishes.map((fish) => {
    ages[fish]++;
  });

  for (let day = 0; day < days; day++) {
    let born = 0;
    for (let age = 0; age < ages.length; age++) {
      const count = ages[age];
      if (age === 0) {
        born = count;
      } else {
        ages[age - 1] = count;
      }
    }
    ages[6] += born;
    ages[8] = born;
  }

  return ages.reduce((a, b) => a + b);
}
