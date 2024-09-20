import React, { useState } from "react";

const SudokuSolver = () => {
  const initialGrid = Array(9).fill().map(() => Array(9).fill(""));

  const [grid, setGrid] = useState(initialGrid);

 
  const isValid = (grid, row, col, num) => {
    for (let x = 0; x < 9; x++) {
      if (grid[row][x] === num || grid[x][col] === num) return false;
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[startRow + i][startCol + j] === num) return false;
      }
    }
    return true;
  };

  // Solving the Sudoku using backtracking
  const solveSudoku = (grid) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === "") {
          for (let num = 1; num <= 9; num++) {
            if (isValid(grid, row, col, num)) {
              grid[row][col] = num.toString();
              if (solveSudoku(grid)) {
                return true;
              }
              grid[row][col] = "";
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const handleInputChange = (e, row, col) => {
    const value = e.target.value;
    if (value === "" || (value >= "1" && value <= "9")) {
      const newGrid = grid.map((rowArr, r) =>
        rowArr.map((val, c) => (r === row && c === col ? value : val))
      );
      setGrid(newGrid);
    }
  };

  const handleSolveClick = () => {
    const newGrid = grid.map((rowArr) => [...rowArr]); // Create a copy of the grid
    solveSudoku(newGrid);
    setGrid(newGrid);
  };

  const handleClearClick = () => {
    setGrid(initialGrid);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Sudoku Solver</h1>
      <div className="grid grid-cols-9 gap-1">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              value={cell}
              maxLength="1"
              onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
              className="w-10 h-10 border text-center text-xl font-semibold"
            />
          ))
        )}
      </div>
      <div className="mt-6">
        <button
          onClick={handleSolveClick}
          className="bg-green-500 text-white py-2 px-4 rounded-md mr-4 hover:bg-green-600"
        >
          Solve
        </button>
        <button
          onClick={handleClearClick}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SudokuSolver;
