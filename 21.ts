export function partOne(input: string) {
  let player1 = +input.split("\n")[0].split(": ")[1];
  let player2 = +input.split("\n")[1].split(": ")[1];
  let counter = 1;
  let score1 = 0;
  let score2 = 0;
  let rolls = 0;
  while (true) {
    rolls += 3;
    const add1 = counter <= 98 ? counter * 3 + 3 : counter === 99 ? 200 : 103;
    player1 += add1;
    counter += 3;
    counter = ((counter - 1) % 100) + 1;
    player1 = ((player1 - 1) % 10) + 1;
    score1 += player1;
    if (score1 >= 1000) break;
    rolls += 3;
    const add2 = counter <= 98 ? counter * 3 + 3 : counter === 99 ? 200 : 103;
    player2 += add2;
    counter += 3;
    counter = ((counter - 1) % 100) + 1;
    player2 = ((player2 - 1) % 10) + 1;
    score2 += player2;
    if (score2 >= 1000) break;
  }
  return rolls * Math.min(score1, score2);
}

export function partTwo(input: string) {
  const player1 = +input.split("\n")[0].split(": ")[1];
  const player2 = +input.split("\n")[1].split(": ")[1];
  const combinations = [
    [1, 1, 1],
    [1, 1, 2],
    [1, 1, 3],
    [1, 2, 1],
    [1, 2, 2],
    [1, 2, 3],
    [1, 3, 1],
    [1, 3, 2],
    [1, 3, 3],
    [2, 1, 1],
    [2, 1, 2],
    [2, 1, 3],
    [2, 2, 1],
    [2, 2, 2],
    [2, 2, 3],
    [2, 3, 1],
    [2, 3, 2],
    [2, 3, 3],
    [3, 1, 1],
    [3, 1, 2],
    [3, 1, 3],
    [3, 2, 1],
    [3, 2, 2],
    [3, 2, 3],
    [3, 3, 1],
    [3, 3, 2],
    [3, 3, 3],
  ];
  const wins = new Map();
  function roll(
    player1: number,
    player2: number,
    score1: number,
    score2: number
  ) {
    if (score2 >= 21) return [0, 1];
    const key = [player1, player2, score1, score2].join(",");
    const cached = wins.get(key);
    if (cached != null) return cached;
    const result = [0, 0];
    combinations.forEach((combination) => {
      const n1 =
        ((player1 + combination[0] + combination[1] + combination[2] - 1) %
          10) +
        1;
      const win = roll(player2, n1, score2, score1 + n1);
      result[0] += win[1];
      result[1] += win[0];
    });
    wins.set(key, result);
    return result;
  }
  const count = roll(player1, player2, 0, 0);
  return Math.max(...count);
}
