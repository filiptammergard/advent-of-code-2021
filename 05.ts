export function partOne(input: string) {
  const pointPairs = parseInput(input);

  const diagram = [...Array(1000)].map(() => Array(1000).fill(0));

  pointPairs.forEach((pointPair) => {
    if (pointPair.x1 === pointPair.x2) {
      const { x1: x, y1, y2 } = pointPair;
      for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
        diagram[i][x] += 1;
      }
    } else if (pointPair.y1 === pointPair.y2) {
      const { x1, x2, y1: y } = pointPair;
      for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
        diagram[y][i] += 1;
      }
    }
  });

  const numberOfPointsWithAtLeastTwoOverlaps = diagram.reduce(
    (acc, row) =>
      acc +
      row.reduce((rowAcc, value) => (value >= 2 ? rowAcc + 1 : rowAcc), 0),
    0
  );

  return numberOfPointsWithAtLeastTwoOverlaps;
}

export function partTwo(input: string) {
  const pointPairs = parseInput(input);

  const diagram = [...new Array(1000)].map(() => Array(1000).fill(0));

  pointPairs.forEach((pointPair) => {
    if (pointPair.x1 === pointPair.x2) {
      const { x1: x, y1, y2 } = pointPair;
      for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
        diagram[i][x] += 1;
      }
    } else if (pointPair.y1 === pointPair.y2) {
      const { x1, x2, y1: y } = pointPair;
      for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
        diagram[y][i] += 1;
      }
    } else {
      const { x1, x2, y1, y2 } = pointPair;
      for (let i = Math.min(x1, x2), j = 0; i <= Math.max(x1, x2); i++, j++) {
        if (x2 > x1 && y2 > y1) {
          diagram[Math.min(y1, y2) + j][i] += 1;
        } else if (x2 > x1 && y2 < y1) {
          diagram[Math.max(y1, y2) - j][i] += 1;
        } else if (x2 < x1 && y2 > y1) {
          diagram[Math.max(y1, y2) - j][i] += 1;
        } else if (x2 < x1 && y2 < y1) {
          diagram[Math.min(y1, y2) + j][i] += 1;
        }
      }
    }
  });

  const numberOfPointsWithAtLeastTwoOverlaps = diagram.reduce(
    (acc, row) =>
      acc +
      row.reduce((rowAcc, value) => (value >= 2 ? rowAcc + 1 : rowAcc), 0),
    0
  );

  return numberOfPointsWithAtLeastTwoOverlaps;
}

function parseInput(input: string) {
  return input.split("\n").map((row) => ({
    x1: parseInt(row.split("->")[0].split(",")[0], 10),
    y1: parseInt(row.split("->")[0].split(",")[1], 10),
    x2: parseInt(row.split("->")[1].split(",")[0], 10),
    y2: parseInt(row.split("->")[1].split(",")[1], 10),
  }));
}
