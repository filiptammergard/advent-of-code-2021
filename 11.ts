export function partOne(input: string) {
  const energies = input
    .split("\n")
    .map((row) => row.split("").map((value) => parseInt(value, 10)));
  let flashes = 0;
  const steps = 100;
  const flashed: boolean[][][] = [...Array(steps)].map(() =>
    [...Array(energies.length)].map(() =>
      [...Array(energies[0].length)].map(() => false)
    )
  );
  for (let s = 0; s < steps; s++) {
    energies.forEach((row, y) => {
      row.forEach((value, x) => {
        if (!flashed[s][y][x]) {
          if (value < 9) energies[y][x]++;
          else if (value === 9) flash(y, x, s);
        }
      });
    });
  }

  function flash(y: number, x: number, s: number) {
    flashes++;
    energies[y][x] = 0;
    flashed[s][y][x] = true;
    if (
      typeof energies[y - 1]?.[x - 1] === "number" &&
      !flashed[s][y - 1][x - 1]
    ) {
      if (energies[y - 1][x - 1] < 9) energies[y - 1][x - 1]++;
      else flash(y - 1, x - 1, s);
    }
    if (typeof energies[y - 1]?.[x] === "number" && !flashed[s][y - 1][x]) {
      if (energies[y - 1][x] < 9) energies[y - 1][x]++;
      else flash(y - 1, x, s);
    }
    if (
      typeof energies[y - 1]?.[x + 1] === "number" &&
      !flashed[s][y - 1][x + 1]
    ) {
      if (energies[y - 1][x + 1] < 9) energies[y - 1][x + 1]++;
      else flash(y - 1, x + 1, s);
    }
    if (typeof energies[y]?.[x - 1] === "number" && !flashed[s][y][x - 1]) {
      if (energies[y][x - 1] < 9) energies[y][x - 1]++;
      else flash(y, x - 1, s);
    }
    if (typeof energies[y]?.[x + 1] === "number" && !flashed[s][y][x + 1]) {
      if (energies[y][x + 1] < 9) energies[y][x + 1]++;
      else flash(y, x + 1, s);
    }
    if (
      typeof energies[y + 1]?.[x - 1] === "number" &&
      !flashed[s][y + 1][x - 1]
    ) {
      if (energies[y + 1][x - 1] < 9) energies[y + 1][x - 1]++;
      else flash(y + 1, x - 1, s);
    }
    if (typeof energies[y + 1]?.[x] === "number" && !flashed[s][y + 1][x]) {
      if (energies[y + 1][x] < 9) energies[y + 1][x]++;
      else flash(y + 1, x, s);
    }
    if (
      typeof energies[y + 1]?.[x + 1] === "number" &&
      !flashed[s][y + 1][x + 1]
    ) {
      if (energies[y + 1][x + 1] < 9) energies[y + 1][x + 1]++;
      else flash(y + 1, x + 1, s);
    }
  }
  return flashes;
}

export function partTwo(input: string) {
  const energies = input
    .split("\n")
    .map((row) => row.split("").map((value) => parseInt(value, 10)));
  let flashes = 0;
  const steps = 1000;
  let syncStep = 0;
  const flashed: boolean[][][] = [...Array(steps)].map(() =>
    [...Array(energies.length)].map(() =>
      [...Array(energies[0].length)].map(() => false)
    )
  );
  for (let s = 0; s < steps; s++) {
    energies.forEach((row, y) => {
      row.forEach((value, x) => {
        if (!flashed[s][y][x]) {
          if (value < 9) energies[y][x]++;
          else if (value === 9) flash(y, x, s);
        }
      });
    });
    const sync = flashed[s].every((row) => row.every((value) => value));
    if (sync) {
      syncStep = s + 1;
      break;
    }
  }

  function flash(y: number, x: number, s: number) {
    flashes++;
    energies[y][x] = 0;
    flashed[s][y][x] = true;
    if (
      typeof energies[y - 1]?.[x - 1] === "number" &&
      !flashed[s][y - 1][x - 1]
    ) {
      if (energies[y - 1][x - 1] < 9) energies[y - 1][x - 1]++;
      else flash(y - 1, x - 1, s);
    }
    if (typeof energies[y - 1]?.[x] === "number" && !flashed[s][y - 1][x]) {
      if (energies[y - 1][x] < 9) energies[y - 1][x]++;
      else flash(y - 1, x, s);
    }
    if (
      typeof energies[y - 1]?.[x + 1] === "number" &&
      !flashed[s][y - 1][x + 1]
    ) {
      if (energies[y - 1][x + 1] < 9) energies[y - 1][x + 1]++;
      else flash(y - 1, x + 1, s);
    }
    if (typeof energies[y]?.[x - 1] === "number" && !flashed[s][y][x - 1]) {
      if (energies[y][x - 1] < 9) energies[y][x - 1]++;
      else flash(y, x - 1, s);
    }
    if (typeof energies[y]?.[x + 1] === "number" && !flashed[s][y][x + 1]) {
      if (energies[y][x + 1] < 9) energies[y][x + 1]++;
      else flash(y, x + 1, s);
    }
    if (
      typeof energies[y + 1]?.[x - 1] === "number" &&
      !flashed[s][y + 1][x - 1]
    ) {
      if (energies[y + 1][x - 1] < 9) energies[y + 1][x - 1]++;
      else flash(y + 1, x - 1, s);
    }
    if (typeof energies[y + 1]?.[x] === "number" && !flashed[s][y + 1][x]) {
      if (energies[y + 1][x] < 9) energies[y + 1][x]++;
      else flash(y + 1, x, s);
    }
    if (
      typeof energies[y + 1]?.[x + 1] === "number" &&
      !flashed[s][y + 1][x + 1]
    ) {
      if (energies[y + 1][x + 1] < 9) energies[y + 1][x + 1]++;
      else flash(y + 1, x + 1, s);
    }
  }
  return syncStep;
}
