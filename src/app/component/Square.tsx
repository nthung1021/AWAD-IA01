import React from 'react';

function Square({ value, onSquareClick, isHighlight = false }) {
  return (
    <button
      className={
        `bg-white border-1 border-solid float-left text-2xl -mr-0.25 -mt-0.25 w-9 h-9 ` +
        (isHighlight ? ' bg-yellow-200 font-bold' : '')
      }
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default Square;
