export function partOne(input: string) {
  const map = input.split("\n").map((row) => row.split(""));
  let preCuMap: string[][] | null = null;
  let curCuMap: string[][] = map;
  const nextPoint: Record<string, ({ x, y }: Point, map: string[][]) => Point> =
    {
      ">": ({ x, y }, map) => ({
        y,
        x: (x + 1) % map[y].length,
      }),
      v: ({ x, y }, map) => ({
        y: (y + 1) % map.length,
        x,
      }),
    };

  function step(map: string[][]) {
    const mapCopy: string[][] = [];
    map.forEach((row) => {
      mapCopy.push([...row]);
    });
    map = stepToNextSpace(mapCopy, ">");
    return stepToNextSpace(mapCopy, "v");
  }

  function stepToNextSpace(map: string[][], dir: string) {
    const movable: Point[] = canMoveToNextSpace(map, dir);
    for (const { x, y } of movable) {
      const nextPt = nextPoint[dir]({ x, y }, map);
      map[y][x] = ".";
      map[nextPt.y][nextPt.x] = dir;
    }
    return map;
  }
  function canMoveToNextSpace(map: string[][], dir: string) {
    const movable: Point[] = [];
    map.forEach((row, y) => {
      row.forEach((_value, x) => {
        if (map[y][x] === dir) {
          if (canMove(nextPoint[dir]({ x, y }, map), map)) {
            movable.push({ x, y });
          }
        }
      });
    });
    return movable;
  }

  let i = 0;
  while (!areMapsEqual(preCuMap, curCuMap)) {
    preCuMap = curCuMap;
    curCuMap = step(curCuMap);
    i++;
  }

  return i;
}

type Point = { x: number; y: number };

function canMove({ x, y }: Point, map: string[][]) {
  return map[y][x] === ".";
}

function areMapsEqual(prev: string[][] | null, curr: string[][]) {
  if (prev === null) return false;
  for (let y = 0; y < curr.length; y++) {
    if (prev[y].join("") !== curr[y].join("")) return false;
  }
  return true;
}

export function partTwo() {
  return "There is no part 2";
}
