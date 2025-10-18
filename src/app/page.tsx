"use client";

type MovePos = [number, number] | null;

import React, { useState } from "react";
import Board from "./component/Board";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [boardSize, setBoardSize] = useState(3);
  const [sortAsc, setSortAsc] = useState(true);

  const [movePositions, setMovePositions] = useState<MovePos[]>([null]);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: (string | null)[]) {
    const trimmedHistory = history.slice(0, currentMove + 1);
    const trimmedPositions = movePositions.slice(0, currentMove + 1);

    const prevSquares = trimmedHistory[trimmedHistory.length - 1];
    let changedIndex = -1;
    for (let i = 0; i < nextSquares.length; i++) {
      if (prevSquares[i] !== nextSquares[i]) {
        changedIndex = i;
        break;
      }
    }

    const nextHistory = [...trimmedHistory, nextSquares];

    let pos: MovePos = null;
    if (changedIndex >= 0) {
      const row = Math.floor(changedIndex / boardSize) + 1;
      const col = (changedIndex % boardSize) + 1;
      pos = [row, col];
    }
    const nextPositions = [...trimmedPositions, pos];

    setHistory(nextHistory);
    setMovePositions(nextPositions);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: React.SetStateAction<number>) {
    setCurrentMove(nextMove);
  }

  function handleBoardSizeChange(e: { target: { value: string; }; }) {
    const newSize = Math.max(3, Math.min(10, parseInt(e.target.value) || 3));
    setBoardSize(newSize);
    const totalSquares = newSize * newSize;
    setHistory([Array(totalSquares).fill(null)]);
    setMovePositions([null]);
    setCurrentMove(0);
  }

  const moveItems = history.map((_, move) => {
    const pos = movePositions[move];
    const posLabel = move > 0 && pos ? ` (${pos[0]}, ${pos[1]})` : "";

    if (move === currentMove) {
      const hereLabel =
        move > 0
          ? `You are at move #${move}${posLabel}`
          : "You are at game start";
      return (
        <li key={move}>
          <span className="italic text-gray-700">{hereLabel}</span>
        </li>
      );
    }

    const buttonLabel =
      move > 0
        ? `Go to move #${move}${posLabel}`
        : "Go to game start";
    return (
      <li key={move}>
        <button
          className="bg-gray-300 p-1 my-1 border-2 rounded-sm"
          onClick={() => jumpTo(move)}
        >
          {buttonLabel}
        </button>
      </li>
    );
  });

  const moves = sortAsc ? moveItems : [...moveItems].reverse();

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-center">Simple Tic-Tac-Toe Game</h1>

      <div className="mb-4 flex justify-center items-center mt-6">
        <label className="mr-2 font-semibold text-xl">Board Size:</label>
        <input
          type="number"
          min="3"
          max="10"
          value={boardSize}
          onChange={handleBoardSizeChange}
          className="border-2 p-1 w-16 text-center"
        />
      </div>

      <div className="flex flex-row justify-center gap-20 mt-10">
        <div className="flex flex-col items-center">
          <Board
            key={boardSize}
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            boardSize={boardSize}
          />
        </div>

        <div className="mt-4 min-w-56">
          <button
            className="mb-3 bg-blue-500 text-white px-3 py-1 rounded"
            onClick={() => setSortAsc((v) => !v)}
          >
            Sort moves: {sortAsc ? "Ascending" : "Descending"}
          </button>
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}
