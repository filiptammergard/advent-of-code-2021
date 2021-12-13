export function partOne(input: string) {
  const { dots, folds } = parseInput(input);
  const maxX = dots.map((row) => row[0]).sort((a, b) => b - a)[0];
  const maxY = dots.map((row) => row[1]).sort((a, b) => b - a)[1];
  let pattern = [...new Array(maxY + 1)].map(() =>
    [...new Array(maxX + 1)].map(() => " ")
  );
  dots.forEach((dot) => {
    pattern[dot[1]][dot[0]] = "#";
  });
  folds.forEach((fold, index) => {
    if (index === 0) {
      if (fold[0] === "y") {
        for (let i = +fold[1] + 1; i < pattern.length; i++) {
          for (let j = 0; j < pattern[0].length; j++) {
            if (pattern[i][j] === "#") {
              pattern[+fold[1] - i + +fold[1]][j] = "#";
            }
          }
        }
        pattern = pattern.slice(0, +fold[1]);
      } else if (fold[0] === "x") {
        for (let i = 0; i < pattern.length; i++) {
          for (let j = +fold[1] + 1; j < pattern[0].length; j++) {
            if (pattern[i][j] === "#") {
              pattern[i][+fold[1] - j + +fold[1]] = "#";
            }
          }
        }
        pattern = pattern.map((row) => row.slice(0, +fold[1]));
      }
    }
  });
  return pattern.reduce(
    (sum, row) =>
      sum + row.reduce((acc, value) => (value === "#" ? acc + 1 : acc), 0),
    0
  );
}
export function partTwo(input: string) {
  const { dots, folds } = parseInput(input);
  const maxX = dots.map((row) => row[0]).sort((a, b) => b - a)[0];
  const maxY = dots.map((row) => row[1]).sort((a, b) => b - a)[1];
  let pattern = [...new Array(maxY + 1)].map(() =>
    [...new Array(maxX + 1)].map(() => " ")
  );
  dots.forEach((dot) => {
    pattern[dot[1]][dot[0]] = "#";
  });
  folds.forEach((fold) => {
    if (fold[0] === "y") {
      for (let i = +fold[1] + 1; i < pattern.length; i++) {
        for (let j = 0; j < pattern[0].length; j++) {
          if (pattern[i][j] === "#") {
            pattern[+fold[1] - i + +fold[1]][j] = "#";
          }
        }
      }
      pattern = pattern.slice(0, +fold[1]);
    } else if (fold[0] === "x") {
      for (let i = 0; i < pattern.length; i++) {
        for (let j = +fold[1] + 1; j < pattern[0].length; j++) {
          if (pattern[i][j] === "#") {
            pattern[i][+fold[1] - j + +fold[1]] = "#";
          }
        }
      }
      pattern = pattern.map((row) => row.slice(0, +fold[1]));
    }
  });
  console.log(pattern.map((row) => row.join("")));
  return "See console log above.";
}

function parseInput(input: string) {
  const dots = input
    .split("\n\n")[0]
    .split("\n")
    .map((row) => row.split(",").map((value) => parseInt(value, 10)));
  const folds = input
    .split("\n\n")[1]
    .split("\n")
    .map((row) => row.split("fold along ")[1])
    .map((value) => value.split("="));
  return { dots, folds };
}
