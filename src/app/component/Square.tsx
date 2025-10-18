import React from "react";

type Mark = "X" | "O" | null;

interface SquareProps {
  value: Mark;
  onSquareClick: () => void;
  isHighlight?: boolean;
}

function Square({ value, onSquareClick, isHighlight = false }: SquareProps) {
  return (
    <button
      className={
        `bg-white border-1 border-solid float-left text-2xl -mr-0.25 -mt-0.25 w-9 h-9 ` +
        (isHighlight ? " bg-yellow-200 font-bold" : "")
      }
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default Square;
