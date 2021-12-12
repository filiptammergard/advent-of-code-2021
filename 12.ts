export function partOne(input: string) {
  const data = input.split("\n");
  const paths = data.reduce(
    (acc: any, line) => ({
      ...acc,
      [line.split("-")[0]]: [
        ...(acc[line.split("-")[0]] ?? []),
        line.split("-")[1],
      ],
      [line.split("-")[1]]: [
        ...(acc[line.split("-")[1]] ?? []),
        line.split("-")[0],
      ],
    }),
    {}
  );
  const found = [];
  function findPaths(cave: string, current: string[]) {
    if (cave === "end") {
      found.push([...current, cave]);
      return;
    }
    const next = [...current, cave];
    paths[cave].forEach((path: string) => {
      if (path.toLowerCase() !== path || current.indexOf(path) === -1)
        findPaths(path, next);
    });
  }
  findPaths("start", []);
  return found.length;
}

export function partTwo(input: string) {
  const data = input.split("\n");
  const paths = data.reduce(
    (acc: any, line) => ({
      ...acc,
      [line.split("-")[0]]: [
        ...(acc[line.split("-")[0]] ?? []),
        line.split("-")[1],
      ],
      [line.split("-")[1]]: [
        ...(acc[line.split("-")[1]] ?? []),
        line.split("-")[0],
      ],
    }),
    {}
  );
  const found = [];
  function findPaths(cave: string, current: string[]) {
    if (cave === "start" && current.length > 0) return;
    if (cave === "end") {
      found.push([...current, cave]);
      return;
    }
    const next = [...current, cave];
    const counts: any = {};
    for (const a of next)
      if (a.toLowerCase() === a) counts[a] = (counts[a] ?? 0) + 1;
    const hasDuplicate = Object.values(counts).some((value: any) => value > 1);
    paths[cave].forEach((path: string) => {
      if (
        !hasDuplicate ||
        path.toLowerCase() !== path ||
        current.indexOf(path) === -1
      )
        findPaths(path, next);
    });
  }
  findPaths("start", []);
  return found.length;
}
