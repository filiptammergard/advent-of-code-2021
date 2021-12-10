export function partOne(input: string) {
  const lines = input.split("\n").map((line) => line.split(""));
  const firstIllegalChars: string[] = [];
  lines.forEach((line) => {
    const queue: string[] = [];
    line.every((char) => {
      if (["(", "[", "{", "<"].includes(char)) {
        queue.push(char);
      } else if (
        (char === ")" && queue.at(-1) === "(") ||
        (char === "]" && queue.at(-1) === "[") ||
        (char === "}" && queue.at(-1) === "{") ||
        (char === ">" && queue.at(-1) === "<")
      ) {
        queue.pop();
      } else {
        firstIllegalChars.push(char);
        return false;
      }
      return true;
    });
  });

  return firstIllegalChars.reduce((sum, curr) => {
    if (curr === ")") return sum + 3;
    else if (curr === "]") return sum + 57;
    else if (curr === "}") return sum + 1197;
    else if (curr === ">") return sum + 25137;
    return sum;
  }, 0);
}

export function partTwo(input: string) {
  const lines = input.split("\n").map((line) => line.split(""));
  const completionStrings: string[][] = [];
  lines.forEach((line) => {
    let queue: string[] = [];
    line.every((char) => {
      if (["(", "[", "{", "<"].includes(char)) {
        queue.push(char);
      } else if (
        (char === ")" && queue.at(-1) === "(") ||
        (char === "]" && queue.at(-1) === "[") ||
        (char === "}" && queue.at(-1) === "{") ||
        (char === ">" && queue.at(-1) === "<")
      ) {
        queue.pop();
      } else {
        queue = [];
        return false;
      }
      return true;
    });
    const completionString = queue.reverse().reduce((prev: string[], curr) => {
      if (curr === "(") return [...prev, ")"];
      else if (curr === "[") return [...prev, "]"];
      else if (curr === "{") return [...prev, "}"];
      else if (curr === "<") return [...prev, ">"];
      else return prev;
    }, []);
    if (completionString.length) completionStrings.push(completionString);
  });
  const scores = completionStrings.map((completionString) => {
    return completionString.reduce((acc, char) => {
      if (char === ")") return acc * 5 + 1;
      else if (char === "]") return acc * 5 + 2;
      else if (char === "}") return acc * 5 + 3;
      else if (char === ">") return acc * 5 + 4;
      return acc;
    }, 0);
  }, 0);
  const sortedScores = scores.sort((a, b) => a - b);
  const middleScore = sortedScores.at((sortedScores.length - 1) / 2);
  return middleScore;
}
