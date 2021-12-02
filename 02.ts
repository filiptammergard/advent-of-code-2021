const day = /\/(\d{2}).ts$/.exec(import.meta.url)?.[1];
const decoder = new TextDecoder("utf-8");
const input = await Deno.readFile(`${day}.txt`);
const data = decoder.decode(input);

console.log(`
Part one answer: ${partOne()}
Part two answer: ${partTwo()}
`);

function partOne() {
  const steps = data.split("\n").map((step) => ({
    direction: step.split(" ")[0],
    value: parseInt(step.split(" ")[1], 10),
  }));

  let horizontalPosition = 0;
  let depth = 0;

  steps.forEach((step) => {
    if (step.direction === "forward") {
      horizontalPosition += step.value;
    } else if (step.direction === "down") {
      depth += step.value;
    } else if (step.direction === "up") {
      depth -= step.value;
    }
  });

  return horizontalPosition * depth;
}

function partTwo() {
  const steps = data.split("\n").map((step) => ({
    direction: step.split(" ")[0],
    value: parseInt(step.split(" ")[1], 10),
  }));

  let horizontalPosition = 0;
  let depth = 0;
  let aim = 0;

  steps.forEach((step) => {
    if (step.direction === "forward") {
      horizontalPosition += step.value;
      depth += aim * step.value;
    } else if (step.direction === "down") {
      aim += step.value;
    } else if (step.direction === "up") {
      aim -= step.value;
    }
  });

  return horizontalPosition * depth;
}
