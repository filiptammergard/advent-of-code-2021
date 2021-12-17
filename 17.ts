export function partOne(input: string) {
  const target = input.match(/-?\d+/g)!.map(Number);
  let highestY = -Infinity;
  for (let y = -1000; y <= 1000; y++) {
    for (let x = 1; x <= 1000; x++) {
      const result = startProbe(x, y, target);
      if (result !== null) highestY = result;
    }
  }
  return highestY;
}

export function partTwo(input: string) {
  const target = input.match(/-?\d+/g)!.map(Number);
  let count = 0;
  for (let y = -1000; y <= 1000; y++) {
    for (let x = 1; x <= 1000; x++) {
      if (startProbe(x, y, target) !== null) count++;
    }
  }
  return count;
}

function startProbe(
  xInitVelocity: number,
  yInitVelocity: number,
  target: number[]
) {
  const [xMin, xMax, yMin, yMax] = target;
  let x = 0;
  let y = 0;
  let xVelocity = xInitVelocity;
  let yVelocity = yInitVelocity;
  let highestY = -Infinity;
  while (x <= xMax && y >= yMin) {
    x += xVelocity;
    y += yVelocity;
    xVelocity -= Math.sign(xVelocity);
    yVelocity--;
    if (y > highestY) highestY = y;
    if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) return highestY;
  }
  return null;
}
