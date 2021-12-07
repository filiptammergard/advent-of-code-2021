export function partOne(input: string) {
  const positions = input.split(",").map((position) => parseInt(position, 10));
  return positions.reduce(
    (min, curr) =>
      Math.min(
        positions.reduce((sum, position) => sum + Math.abs(curr - position), 0),
        min
      ),
    Infinity
  );
}

export function partTwo(input: string) {
  const positions = input.split(",").map((position) => parseInt(position, 10));
  const [minP, maxP] = [Math.min(...positions), Math.max(...positions)];
  return [...Array(maxP - minP)].reduce((min, _, index) => {
    const cost = positions.reduce(
      (sum, position) =>
        sum +
        (Math.abs(minP + index - position) *
          (Math.abs(minP + index - position) + 1)) /
          2,
      0
    );
    return Math.min(min, cost);
  }, Infinity);
}
