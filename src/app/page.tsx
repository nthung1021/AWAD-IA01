'use client'

import React, { useState } from 'react';
import Board from './component/Board';

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    const buttonLabel = move > 0 ? `Go to move #${move}` : 'Go to game start';

    if (move === currentMove) {
      const hereLabel = move > 0 ? `You are at move #${move}` : 'You are at game start';
      return (
        <li key={move}>
          <span className="italic text-gray-700">{hereLabel}</span>
        </li>
      );
    }

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

  return (
    <>
      <h1 className="text-4xl font-bold text-center m-10">Simple Tic-tac-toe Game</h1>
      <div className="flex flex-row justify-center gap-20">
        <div className="">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="ml-10">
          <h2 className="text-xl font-bold mb-3">Steps</h2>
          <ol className="">{moves}</ol>
        </div>
      </div>
    </>
  );
}

export default Game;
