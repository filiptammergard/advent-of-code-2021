export function partOne(input: string) {
  const map = input
    .split("\n")
    .map((row) => row.split("").map((value) => parseInt(value, 10)));

  const graph: Point[] = [];
  const width = map[0].length;
  const height = map.length;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      graph.push({
        value: map[y][x],
        key: `${x}:${y}`,
        x,
        y,
        neighbours: [],
      });
    }
  }

  graph.forEach((point) => {
    point.neighbours = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ]
      .map(([aX, aY]) => {
        const nX = aX + point.x;
        const nY = aY + point.y;
        return graph.find((item) => item.x == nX && item.y == nY);
      })
      .filter((e) => e);
  });

  const start = graph.find((point) => point.x === 0 && point.y === 0) as Point;
  const end = graph.find(
    (point) => point.x === width - 1 && point.y === height - 1
  ) as Point;

  const path = findPath(graph, start, end);

  const risk = path.slice(1).reduce((acc, curr) => acc + (curr?.value || 0), 0);
  return risk;
}

export function partTwo(input: string) {
  let map = input
    .split("\n")
    .map((row) => row.split("").map((value) => parseInt(value, 10)));

  const rep = 5;
  for (let y = 0; y < map.length; y++) {
    let row = map[y];
    for (let i = 1; i < rep; i++) {
      row = row.map((cell) => add(cell, 1));
      map[y] = map[y].concat(row);
    }
  }
  let copy = map.map((row) => row.slice());
  for (let i = 1; i < rep; i++) {
    copy = copy.map((row) => row.map((cell) => add(cell, 1)));
    map = map.concat(copy);
  }
  const dictionary: Record<string, Point> = {};
  const graph: Point[] = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const key = `${x}:${y}`;
      const item = {
        value: map[y][x],
        key,
        x,
        y,
        neighbours: [],
      };
      graph.push(item);
      dictionary[key] = item;
    }
  }
  graph.forEach((point) => {
    point.neighbours = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ]
      .map(([aX, aY]) => {
        const nX = aX + point.x;
        const nY = aY + point.y;
        const key = `${nX}:${nY}`;
        return dictionary[key];
      })
      .filter((e) => e);
  });

  const start = graph.find((item) => item.x === 0 && item.y === 0) as Point;
  const end = graph.find(
    (item) => item.x == map[0].length - 1 && item.y == map.length - 1
  ) as Point;

  const path = findPath2(graph, start, end);

  const risk = path.slice(1).reduce((acc, curr) => acc + (curr?.value || 0), 0);
  return risk;
}

interface Point {
  value: number;
  key: string;
  x: number;
  y: number;
  neighbours: any;
}

function findPath(graph: Point[], start: Point, end: Point) {
  const distance: Record<string, number> = {};
  const prev: Record<string, Point> = {};
  const queue: Point[] = [];

  graph.forEach((point) => {
    distance[point.key] = Infinity;
    queue.push(point);
  });
  distance[start.key] = 0;

  while (queue.length) {
    const { item, index } = findLowestDistance();
    queue.splice(index, 1);
    if (item === end) {
      break;
    }

    for (const adj of item?.neighbours) {
      if (!queue.includes(adj)) continue;
      const alt = distance[item?.key ?? ""] + adj.value;
      if (alt < distance[adj.key]) {
        distance[adj.key] = alt;
        if (item) prev[adj.key] = item;
      }
    }
  }

  const path = [end];
  let current = end.key;
  while (current != start.key) {
    const p = prev[current ?? ""];
    path.unshift(p);
    current = p.key;
  }

  return path;

  function findLowestDistance() {
    let lowest = Infinity;
    let lowestItem = null;
    let index = -1;
    for (let i = 0; i < queue.length; i++) {
      const item = queue[i];
      if (lowest > distance[item.key]) {
        lowestItem = item;
        lowest = distance[item.key];
        index = i;
      }
    }
    return { item: lowestItem, index };
  }
}
function findPath2(graph: Point[], start: Point, end: Point) {
  const distance: Record<string, number> = {};
  const prev: Record<string, Point> = {};
  const queue: Point[] = [];

  graph.forEach((point) => {
    distance[point.key] = Infinity;
    queue.push(point);
  });
  distance[start.key] = 0;

  while (queue.length) {
    const item = queue.shift();
    if (item == end) {
      break;
    }

    for (const adj of item?.neighbours) {
      if (!queue.includes(adj)) continue;
      const alt = distance[item?.key ?? ""] + adj.value;
      if (alt < distance[adj.key]) {
        distance[adj.key] = alt;
        if (item) prev[adj.key] = item;
        updateQueue(adj);
      }
    }
  }

  const path = [end];
  let current = end.key;
  while (current != start.key) {
    const p = prev[current ?? ""];
    path.unshift(p);
    current = p.key;
  }

  return path;

  function updateQueue(item: Point) {
    const itemDistance = distance[item.key];
    const index = queue.indexOf(item);
    for (let i = 0; i < index; i++) {
      const vert = queue[i];
      const dist = distance[vert.key];
      if (itemDistance < dist) {
        queue.splice(index, 1);
        queue.splice(i, 0, item);
        return;
      }
    }
  }
}

function add(x: number, y: number) {
  const z = x + y;
  if (z > 9) return 1;
  return z;
}
