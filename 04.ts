export function partOne(input: string) {
  const { draws, boards } = parseInput(input);

  const markedBoards = [...new Array(boards.length)].map(() =>
    [...new Array(boards[0].length)].map(() =>
      [...new Array(boards[0][0].length)].map(() => false)
    )
  );

  let winningDraw = 0;
  let winningBoard = 0;

  draws.every((draw, _drawIndex) => {
    boards.forEach((board, boardIndex) => {
      board.forEach((row, rowIndex) => {
        row.forEach((value, valueIndex) => {
          if (value === draw) {
            markedBoards[boardIndex][rowIndex][valueIndex] = true;
          }
        });
      });
    });

    const pivotedMarkedBoards = markedBoards.map((markedBoard) =>
      markedBoard[0].map((_, index) => markedBoard.map((row) => row[index]))
    );

    const isBingo = markedBoards.some((board, boardIndex) => {
      const isRowBingo = board.some((row, _rowIndex) =>
        row.every((value, _valueIndex) => !!value)
      );
      const isColumnBingo = pivotedMarkedBoards[boardIndex].some(
        (row, _rowIndex) => row.every((value, _valueIndex) => !!value)
      );
      const isBoardBingo = isRowBingo || isColumnBingo;
      if (isBoardBingo) {
        winningBoard = boardIndex;
      }
      return isBoardBingo;
    });

    if (isBingo) {
      winningDraw = draw;
      return false;
    }
    return true;
  });

  const unmarkedSum = boards[winningBoard].reduce((acc, row, rowIndex) => {
    const rowSum = row.reduce((rowAcc, value, valueIndex) => {
      if (!markedBoards[winningBoard][rowIndex][valueIndex]) {
        return rowAcc + value;
      }
      return rowAcc;
    }, 0);
    return acc + rowSum;
  }, 0);

  return unmarkedSum * winningDraw;
}

export function partTwo(input: string) {
  const { draws, boards } = parseInput(input);

  const markedBoards = [...new Array(boards.length)].map(() =>
    [...new Array(boards[0].length)].map(() =>
      [...new Array(boards[0][0].length)].map(() => false)
    )
  );

  let lastWinningDraw = 0;
  let lastWinningBoard = 0;

  draws.every((draw, _drawIndex) => {
    boards.forEach((board, boardIndex) => {
      board.forEach((row, rowIndex) => {
        row.forEach((value, valueIndex) => {
          if (value === draw) {
            markedBoards[boardIndex][rowIndex][valueIndex] = true;
          }
        });
      });
    });

    const pivotedMarkedBoards = markedBoards.map((markedBoard) =>
      markedBoard[0].map((_, index) => markedBoard.map((row) => row[index]))
    );

    const isAllBoardsBingo = markedBoards.every((board, boardIndex) => {
      const isRowBingo = board.some((row, _rowIndex) =>
        row.every((value, _valueIndex) => !!value)
      );
      const isColumnBingo = pivotedMarkedBoards[boardIndex].some(
        (row, _rowIndex) => row.every((value, _valueIndex) => !!value)
      );
      if (isRowBingo || isColumnBingo) {
        return true;
      }
      lastWinningBoard = boardIndex;
      return false;
    });

    if (isAllBoardsBingo) {
      lastWinningDraw = draw;
      return false;
    }

    return true;
  });

  const unmarkedSum = boards[lastWinningBoard].reduce((acc, row, rowIndex) => {
    const rowSum = row.reduce((rowAcc, value, valueIndex) => {
      if (!markedBoards[lastWinningBoard][rowIndex][valueIndex]) {
        return rowAcc + value;
      }
      return rowAcc;
    }, 0);
    return acc + rowSum;
  }, 0);

  return unmarkedSum * lastWinningDraw;
}

function parseInput(input: string) {
  const draws = input
    .split("\n\n")[0]
    .split(",")
    .map((draw) => parseInt(draw, 10));

  const boards = input
    .split("\n\n")
    .slice(1)
    .map((board) =>
      board
        .split("\n")
        .map((row) => row.trimStart())
        .map((row) => row.split(/\s+/).map((value) => parseInt(value, 10)))
    );
  return { draws, boards };
}
