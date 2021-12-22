export function partOne(input: string) {
  const steps = input.split("\n");
  const region: Cuboid = { x1: 50, x2: -50, y1: 50, y2: -50, z1: 50, z2: -50 };
  let cuboids: Cuboid[] = [];
  steps.forEach((step) => {
    const [operation, instructions] = step.split(" ");
    const [xr, yr, zr] = instructions.split(",");
    const [x1, x2] = xr.split("=")[1].split("..").map(Number);
    const [y1, y2] = yr.split("=")[1].split("..").map(Number);
    const [z1, z2] = zr.split("=")[1].split("..").map(Number);
    const cuboid: Cuboid = {
      x1,
      y1,
      z1,
      x2: x2 + 1,
      y2: y2 + 1,
      z2: z2 + 1,
    };
    cuboids = cuboids.flatMap((c) => sub(c, cuboid));
    if (operation === "on" && contains(cuboid, region)) cuboids.push(cuboid);
  });
  return cuboids.map((cuboid) => getVolume(cuboid)).reduce((a, b) => a + b, 0n);
}

export function partTwo(input: string) {
  const steps = input.split("\n");
  let cuboids: Cuboid[] = [];
  steps.forEach((step) => {
    const [operation, instructions] = step.split(" ");
    const [xr, yr, zr] = instructions.split(",");
    const [x1, x2] = xr.split("=")[1].split("..").map(Number);
    const [y1, y2] = yr.split("=")[1].split("..").map(Number);
    const [z1, z2] = zr.split("=")[1].split("..").map(Number);
    const cuboid: Cuboid = {
      x1,
      y1,
      z1,
      x2: x2 + 1,
      y2: y2 + 1,
      z2: z2 + 1,
    };
    cuboids = cuboids.flatMap((c) => sub(c, cuboid));
    if (operation === "on") cuboids.push(cuboid);
  });
  return cuboids.map((cuboid) => getVolume(cuboid)).reduce((a, b) => a + b, 0n);
}

interface Cuboid {
  x1: number;
  y1: number;
  z1: number;
  x2: number;
  y2: number;
  z2: number;
}

function getVolume(cuboid: Cuboid) {
  return (
    BigInt(cuboid.x2 - cuboid.x1) *
    BigInt(cuboid.y2 - cuboid.y1) *
    BigInt(cuboid.z2 - cuboid.z1)
  );
}

function sub(a: Cuboid, b: Cuboid) {
  if (contains(b, a)) {
    return [];
  }
  if (!intersects(a, b)) {
    return [a];
  }
  const xSplits = [b.x1, b.x2].filter((x) => a.x1 < x && x < a.x2);
  const ySplits = [b.y1, b.y2].filter((y) => a.y1 < y && y < a.y2);
  const zSplits = [b.z1, b.z2].filter((z) => a.z1 < z && z < a.z2);
  const xv = [a.x1, ...xSplits, a.x2];
  const yv = [a.y1, ...ySplits, a.y2];
  const zv = [a.z1, ...zSplits, a.z2];
  const cuboids: Cuboid[] = [];
  for (let i = 0; i < xv.length - 1; i++) {
    for (let j = 0; j < yv.length - 1; j++) {
      for (let k = 0; k < zv.length - 1; k++) {
        cuboids.push({
          x1: xv[i],
          y1: yv[j],
          z1: zv[k],
          x2: xv[i + 1],
          y2: yv[j + 1],
          z2: zv[k + 1],
        });
      }
    }
  }
  return cuboids.filter((cuboid) => !contains(b, cuboid));
}

function contains(a: Cuboid, b: Cuboid) {
  return (
    a.x1 <= b.x1 &&
    a.x2 >= b.x2 &&
    a.y1 <= b.y1 &&
    a.y2 >= b.y2 &&
    a.z1 <= b.z1 &&
    a.z2 >= b.z2
  );
}

function intersects(a: Cuboid, b: Cuboid) {
  return (
    a.x1 <= b.x2 &&
    a.x2 >= b.x1 &&
    a.y1 <= b.y2 &&
    a.y2 >= b.y1 &&
    a.z1 <= b.z2 &&
    a.z2 >= b.z1
  );
}
