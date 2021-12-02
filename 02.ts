export function partOne(input: string) {
  const steps = input.split("\n").map((step) => ({
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

export function partTwo(input: string) {
  const steps = input.split("\n").map((step) => ({
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
