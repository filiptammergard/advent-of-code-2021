async function solve() {
  const dayInput = prompt("What day do you want to get answers for?");

  if (!dayInput) {
    console.error("No day was entered.");
    return;
  }

  const day = dayInput?.padStart(2, "0");

  const solutionPath = `./${day}.ts`;
  const inputPath = `${day}.txt`;

  try {
    await Deno.open(inputPath);
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      console.error(`Input file for day ${dayInput} does not exist.`);
    } else if (e instanceof Deno.errors.PermissionDenied) {
      console.error(
        "You don't have permissions to read the input file. Don't forget to pass the --allow-read flag!"
      );
    }
    return;
  }

  const input = await Deno.readTextFile(inputPath);

  try {
    await import(solutionPath);
  } catch {
    console.error(`Solution for day ${dayInput} does not exist.`);
    return;
  }

  const { partOne, partTwo } = await import(solutionPath);

  if (!partOne || !partTwo) {
    console.error(`Solution for day ${dayInput} does not exist.`);
    return;
  }

  const partOneAnswer = partOne(input);
  const partTwoAnswer = partTwo(input);

  const output = `
  Part one answer: ${partOneAnswer}
  Part two answer: ${partTwoAnswer}
  `;
  console.log(output);
}

solve();
