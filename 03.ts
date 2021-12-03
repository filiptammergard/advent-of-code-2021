export function partOne(input: string) {
  const rows = input
    .split("\n")
    .map((row) => row.split("").map((bit) => parseInt(bit, 10)));

  const bitSum = rows.reduce(
    (acc, row) => acc.map((bit, index) => bit + row[index]),
    new Array(rows[0].length).fill(0)
  );

  const gammaRate = bitSum.map((bit) => Number(bit > rows.length / 2)).join("");
  const gammaRateDecimal = parseInt(gammaRate, 2);

  const epsilonRate = bitSum
    .map((bit) => Number(bit < rows.length / 2))
    .join("");
  const epsilonRateDecimal = parseInt(epsilonRate, 2);

  return gammaRateDecimal * epsilonRateDecimal;
}

export function partTwo(input: string) {
  const rows = input
    .split("\n")
    .map((row) => row.split("").map((bit) => parseInt(bit, 10)));

  let oxygenGeneratorRatingRows = rows;

  for (let bit = 0; bit < rows[0].length; bit++) {
    if (oxygenGeneratorRatingRows.length === 1) break;
    const positionSum: number[] = Array(rows[0].length).fill(0);
    oxygenGeneratorRatingRows.forEach((row) => {
      row.forEach((bit, index) => {
        bit === 1 ? (positionSum[index] += 1) : (positionSum[index] -= 1);
      });
    });
    const mostCommon = positionSum.map((position) => (position >= 0 ? 1 : 0));
    const rowsToKeep = oxygenGeneratorRatingRows.filter(
      (row) => row[bit] === mostCommon[bit]
    );
    oxygenGeneratorRatingRows = rowsToKeep;
  }

  let co2ScrubberRatingRows = rows;

  for (let bit = 0; bit < rows[0].length; bit++) {
    if (co2ScrubberRatingRows.length === 1) break;
    const positionSum: number[] = Array(rows[0].length).fill(0);
    co2ScrubberRatingRows.forEach((row) => {
      row.forEach((bit, index) => {
        bit === 1 ? (positionSum[index] += 1) : (positionSum[index] -= 1);
      });
    });
    const leastCommon = positionSum.map((position) => (position >= 0 ? 0 : 1));
    const rowsToKeep = co2ScrubberRatingRows.filter(
      (row) => row[bit] === leastCommon[bit]
    );
    co2ScrubberRatingRows = rowsToKeep;
  }

  const oxygenGeneratorRatingDecimal = parseInt(
    oxygenGeneratorRatingRows[0].join(""),
    2
  );
  const co2ScrubberRatingDecimal = parseInt(
    co2ScrubberRatingRows[0].join(""),
    2
  );

  return oxygenGeneratorRatingDecimal * co2ScrubberRatingDecimal;
}
