import React from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="bg-white border-1 border-solid float-left text-2xl -mr-0.25 -mt-0.25 w-9 h-9" 
            onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default Square;