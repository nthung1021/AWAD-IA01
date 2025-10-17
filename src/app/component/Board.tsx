import React from "react";
import Square from "./Square";

function Board({ xIsNext, squares, onPlay, boardSize }) {
  function handleClick(i) {
    const result = calculateWinner(squares, boardSize);
    if (result || squares[i]) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const result = calculateWinner(squares, boardSize);
  const winLen = getWinLength(boardSize);

  let status: string;
  if (result?.winner) {
    status = "Winner: " + result.winner;
  } else if (squares.every((v) => v !== null)) {
    status = "Draw: no more moves";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const winningLine = result?.line ?? [];

  // Build the board with nested loops
  const boardRows = [];
  for (let r = 0; r < boardSize; r++) {
    const row = [];
    for (let c = 0; c < boardSize; c++) {
      const i = r * boardSize + c;
      row.push(
        <Square
          key={i}
          value={squares[i]}
          onSquareClick={() => handleClick(i)}
          isHighlight={winningLine.includes(i)}
        />
      );
    }
    boardRows.push(
      <div className="clear-both table" key={r}>
        {row}
      </div>
    );
  }

  return (
    <>
      <div className="mb-1 text-xl font-bold">{status}</div>
      <div className="mb-3 text-sm opacity-70">Win condition: {winLen} in a row</div>
      {boardRows}
    </>
  );
}

function getWinLength(boardSize) {
  if (boardSize === 3) return 3;
  if (boardSize === 4) return 4;
  return 5; // 5x5 or larger
}

function calculateWinner(squares, boardSize) {
  const K = getWinLength(boardSize);
  const get = (r, c) => squares[r * boardSize + c];

  const dirs = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  for (let r = 0; r < boardSize; r++) {
    for (let c = 0; c < boardSize; c++) {
      const startVal = get(r, c);
      if (!startVal) continue;

      for (const [dr, dc] of dirs) {
        const endR = r + (K - 1) * dr;
        const endC = c + (K - 1) * dc;

        if (endR < 0 || endR >= boardSize || endC < 0 || endC >= boardSize) {
          continue;
        }

        const line = [r * boardSize + c];
        let ok = true;

        for (let step = 1; step < K; step++) {
          const rr = r + step * dr;
          const cc = c + step * dc;
          if (get(rr, cc) !== startVal) {
            ok = false;
            break;
          }
          line.push(rr * boardSize + cc);
        }

        if (ok) {
          return { winner: startVal, line };
        }
      }
    }
  }
  return null;
}

export default Board;
