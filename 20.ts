export function partOne(input: string) {
  const data = parseInput(input);
  const image = apply(data, 2);
  return image.flat().filter(Boolean).length;
}

export function partTwo(input: string) {
  const data = parseInput(input);
  const image = apply(data, 50);
  return image.flat().filter(Boolean).length;
}

function parseInput(input: string) {
  const algorithm = input
    .split("\n\n")[0]
    .split("")
    .map((char) => +(char === "#"));
  const image = input
    .split("\n\n")[1]
    .split("\n")
    .map((row) => row.split("").map((char) => +(char === "#")));
  return { algorithm, image };
}

function apply(
  data: { algorithm: number[]; image: number[][] },
  times: number
) {
  let { algorithm, image } = data;
  for (let t = 0; t < times; t++) {
    const nextImg = [];
    for (let i = -1; i < image.length + 1; i++) {
      const nextImgRow = [];
      for (let j = -1; j < image.length + 1; j++) {
        const pixels = [];
        for (let di = -1; di <= 1; di++) {
          for (let dj = -1; dj <= 1; dj++) {
            pixels.push(image[i + di]?.[j + dj] ?? algorithm[0] & t % 2);
          }
        }
        const num = parseInt(pixels.join(""), 2);
        nextImgRow.push(algorithm[num]);
      }
      nextImg.push(nextImgRow);
    }
    image = nextImg;
  }
  return image;
}
