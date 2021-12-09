export function partOne(input: string) {
  return input
    .split("\n")
    .map((row) => row.split("").map((value) => parseInt(value, 10)))
    .reduce(
      (sum, row, y, map) =>
        sum +
        row.reduce(
          (rowSum, value, x) =>
            isLowest(map, y, x) ? rowSum + value + 1 : rowSum,
          0
        ),
      0
    );
}

export function partTwo(input: string) {
  const map = input
    .split("\n")
    .map((row) => row.split("").map((value) => parseInt(value, 10) < 9));

  const basins: number[] = [];

  map.forEach((row, y) => {
    row.forEach((value, x) => {
      if (!value) return;
      let queue: number[][] = [];
      let size = 0;
      queue.push([x, y]);
      while (queue.length) {
        const [x, y]: any = queue.at(-1);
        queue = queue.slice(0, -1);
        if (!map[y][x]) {
          continue;
        }
        size++;
        map[y][x] = false;
        x - 1 >= 0 && map[y][x - 1] && queue.push([x - 1, y]);
        x + 1 < map[0].length && map[y][x + 1] && queue.push([x + 1, y]);
        y - 1 >= 0 && map[y - 1][x] && queue.push([x, y - 1]);
        y + 1 < map.length && map[y + 1][x] && queue.push([x, y + 1]);
      }
      basins.push(size);
    });
  });
  return basins
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((sum, basin) => sum * basin, 1);
}

function isLowest(map: number[][], y: number, x: number) {
  return (
    map[y][x] < (x - 1 < 0 ? 9 : map[y][x - 1]) &&
    map[y][x] < (x + 1 >= map[0].length ? 9 : map[y][x + 1]) &&
    map[y][x] < (y - 1 < 0 ? 9 : map[y - 1][x]) &&
    map[y][x] < (y + 1 >= map.length ? 9 : map[y + 1][x])
  );
}
