const day = "01";

const decoder = new TextDecoder("utf-8");
const input = await Deno.readFile(`day${day}/input.txt`);
const data = decoder.decode(input);

console.log(`
Part one answer: ${partOne()}
Part two answer: ${partTwo()}
`);

function partOne() {
  const measurements = data
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

function partTwo() {
  const measurements = data
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
