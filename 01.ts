export function partOne(input: string) {
  const measurements = input
    .split("\n")
    .map((measurement) => parseInt(measurement, 10));

  const count = measurements.reduce((acc, measurement, index) => {
    if (measurements[index + 1] > measurement) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return count;
}

export function partTwo(input: string) {
  const measurements = input
    .split("\n")
    .map((measurement) => parseInt(measurement, 10));

  const count = measurements.reduce((acc, measurement, index) => {
    if (measurements[index + 3] > measurement) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return count;
}
