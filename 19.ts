export function partOne(input: string) {
  const scanners = parseInput(input);
  const { beacons } = getBeacons(scanners);
  return beacons.length;
}

export function partTwo(input: string) {
  const scanners = parseInput(input);
  const { transforms } = getBeacons(scanners);
  return getManhattanDistance(scanners, transforms);
}

function parseInput(input: string) {
  return input.split("\n\n").map((scanner) =>
    scanner
      .split("\n")
      .slice(1)
      .map((line) => line.split(",").map(Number))
  );
}

const rotations = [
  ([x, y, z]: [x: number, y: number, z: number]) => [x, y, z],
  ([x, y, z]: [x: number, y: number, z: number]) => [y, z, x],
  ([x, y, z]: [x: number, y: number, z: number]) => [z, x, y],
  ([x, y, z]: [x: number, y: number, z: number]) => [-x, z, y],
  ([x, y, z]: [x: number, y: number, z: number]) => [z, y, -x],
  ([x, y, z]: [x: number, y: number, z: number]) => [y, -x, z],
  ([x, y, z]: [x: number, y: number, z: number]) => [x, z, -y],
  ([x, y, z]: [x: number, y: number, z: number]) => [z, -y, x],
  ([x, y, z]: [x: number, y: number, z: number]) => [-y, x, z],
  ([x, y, z]: [x: number, y: number, z: number]) => [x, -z, y],
  ([x, y, z]: [x: number, y: number, z: number]) => [-z, y, x],
  ([x, y, z]: [x: number, y: number, z: number]) => [y, x, -z],
  ([x, y, z]: [x: number, y: number, z: number]) => [-x, -y, z],
  ([x, y, z]: [x: number, y: number, z: number]) => [-y, z, -x],
  ([x, y, z]: [x: number, y: number, z: number]) => [z, -x, -y],
  ([x, y, z]: [x: number, y: number, z: number]) => [-x, y, -z],
  ([x, y, z]: [x: number, y: number, z: number]) => [y, -z, -x],
  ([x, y, z]: [x: number, y: number, z: number]) => [-z, -x, y],
  ([x, y, z]: [x: number, y: number, z: number]) => [x, -y, -z],
  ([x, y, z]: [x: number, y: number, z: number]) => [-y, -z, x],
  ([x, y, z]: [x: number, y: number, z: number]) => [-z, x, -y],
  ([x, y, z]: [x: number, y: number, z: number]) => [-x, -z, -y],
  ([x, y, z]: [x: number, y: number, z: number]) => [-z, -y, -x],
  ([x, y, z]: [x: number, y: number, z: number]) => [-y, -x, -z],
];

function transform(scanner: number[][], rotation: any, distance: number[]) {
  return scanner.map((beacon) => {
    return rotation(beacon).map((coord: number, i: number) => {
      return coord + distance[i];
    });
  });
}

function getBeacons(scanners: any) {
  const transforms: any = scanners.map(() => ({}));
  transforms[0] = {
    0: [
      {
        rotation: rotations[0],
        distance: [0, 0, 0],
      },
    ],
  };
  for (let i = 1; i < scanners.length; i++) {
    const scanner1 = scanners[i];

    scanner2Loop: for (let j = 0; j < scanners.length; j++) {
      if (i === j) {
        continue;
      }

      const scanner2 = scanners[j];
      for (const rotation of rotations) {
        const distCounts: Record<string, number> = {};
        for (const beacon1 of scanner1) {
          const [x1, y1, z1] = rotation(beacon1);
          for (const beacon2 of scanner2) {
            const [x2, y2, z2] = beacon2;
            const distance = [x2 - x1, y2 - y1, z2 - z1].join();
            distCounts[distance] = (distCounts[distance] ?? 0) + 1;
            if (distCounts[distance] === 12) {
              transforms[i][j] = [
                {
                  rotation,
                  distance: distance.split(",").map(Number),
                },
              ];
              continue scanner2Loop;
            }
          }
        }
      }
    }
  }

  while (transforms.some((transform: number[]) => !transform[0])) {
    for (let i = 1; i < transforms.length; i++) {
      if (transforms[i][0]) {
        continue;
      }

      for (const j in transforms[i]) {
        if (!transforms[j][0]) {
          continue;
        }

        transforms[i][0] = transforms[i][j].concat(transforms[j][0]);
        break;
      }
    }
  }
  const beacons = new Set(scanners[0].map((beacon: any) => beacon.join()));
  for (let i = 1; i < scanners.length; i++) {
    let scanner = scanners[i];
    for (const { rotation, distance } of transforms[i][0]) {
      scanner = transform(scanner, rotation, distance);
    }
    for (const beacon of scanner) {
      beacons.add(beacon.join());
    }
  }
  return { beacons: [...beacons], transforms };
}

function getManhattanDistance(scanners: any, transforms: any) {
  const scannerCoords = [[0, 0, 0]];
  for (let i = 1; i < scanners.length; i++) {
    let scanner = [[0, 0, 0]];
    for (const { rotation, distance } of transforms[i][0]) {
      scanner = transform(scanner, rotation, distance);
    }
    scannerCoords.push(scanner[0]);
  }

  let manhattanDistance = 0;
  for (let i = 0; i < scannerCoords.length - 1; i++) {
    const [x1, y1, z1] = scannerCoords[i];
    for (let j = 1; j < scannerCoords.length; j++) {
      const [x2, y2, z2] = scannerCoords[j];
      manhattanDistance = Math.max(
        manhattanDistance,
        Math.abs(x2 - x1) + Math.abs(y2 - y1) + Math.abs(z2 - z1)
      );
    }
  }
  return manhattanDistance;
}
