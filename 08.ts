export function partOne(input: string) {
  return input
    .split("\n")
    .map((output) => output.split(" | ")[1].split(" "))
    .reduce(
      (prev, curr) =>
        prev +
        curr.reduce(
          (acc, value) => ([2, 3, 4, 7].includes(value.length) ? acc + 1 : acc),
          0
        ),
      0
    );
}

export function partTwo(input: string) {
  const signals = input.split("\n").map((output) =>
    output
      .split(" | ")[0]
      .split(" ")
      .map((value) => value.split(""))
  );
  const output = input.split("\n").map((output) =>
    output
      .split(" | ")[1]
      .split(" ")
      .map((value) => value.split(""))
  );

  const numbers: string[][] | undefined[] = [...Array(10)];
  const segments = [...Array(7)];

  return signals.reduce((acc, curr, index) => {
    numbers[1] = curr.find((value) => value.length === 2);
    numbers[4] = curr.find((value) => value.length === 4);
    numbers[7] = curr.find((value) => value.length === 3);
    numbers[8] = curr.find((value) => value.length === 7);
    segments[0] = numbers[7]?.find((value) => !numbers[1]?.includes(value));
    numbers[6] = curr.find(
      (value) =>
        value.length === 6 &&
        numbers[1]?.some((oneValue) => !value.includes(oneValue))
    );
    segments[2] = numbers[1]?.find((value) => !numbers[6]?.includes(value));
    segments[5] = numbers[1]?.find((value) => value !== segments[2]);
    numbers[5] = curr.find(
      (value) => value.length === 5 && !value.includes(segments[2])
    );
    segments[6] = numbers[5]?.find(
      (value) => value !== segments[0] && !numbers[4]?.includes(value)
    );
    segments[4] = numbers[6]?.find((value) => !numbers[5]?.includes(value));
    numbers[3] = curr.find(
      (value) =>
        value.length === 5 &&
        value.includes(segments[2]) &&
        !value.includes(segments[4])
    );
    segments[3] = numbers[3]?.find(
      (value) => value !== segments[6] && !numbers[7]?.includes(value)
    );
    segments[1] = numbers[8]?.find((value) => !segments.includes(value));
    numbers[2] = curr.find(
      (value) =>
        value.length === 5 &&
        value.includes(segments[2]) &&
        value.includes(segments[4])
    );
    numbers[0] = curr.find(
      (value) => value.length === 6 && !value.includes(segments[3])
    );
    numbers[9] = curr.find(
      (value) => value.length === 6 && !value.includes(segments[4])
    );
    return (
      acc +
      parseInt(
        output[index].reduce((outputAcc, outputCurr) => {
          let number = "";
          for (let i = 0; i <= 9; i++) {
            if (outputCurr.sort().join() === numbers[i]?.sort().join()) {
              number = `${outputAcc}${i}`;
              break;
            }
          }
          return number;
        }, ""),
        10
      )
    );
  }, 0);
}
