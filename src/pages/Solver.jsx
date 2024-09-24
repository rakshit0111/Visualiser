import React, { useState } from "react";
import { Sun, Moon } from 'lucide-react';

export default function SudokuSolver() {
  const initialGrid = Array(9).fill().map(() => Array(9).fill(""));
  const [grid, setGrid] = useState(initialGrid);
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const solveSudoku = (grid) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === "") {
          for (let num = 1; num <= 9; num++) {
            if (isValid(grid, row, col, num.toString())) {
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
      setError("");
    }
  };

  const handleSolveClick = () => {
    const newGrid = grid.map((rowArr) => [...rowArr]);
    if (solveSudoku(newGrid)) {
      setGrid(newGrid);
      setError("");
    } else {
      setError("No solution exists for the given Sudoku puzzle.");
    }
  };

  const handleClearClick = () => {
    setGrid(initialGrid);
    setError("");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-lg relative`}>
        <button
          onClick={toggleDarkMode}
          className={`absolute top-2 right-2 p-2 rounded-full ${isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'}`}
          aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
        <h1 className={`text-3xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-indigo-700'}`}>Sudoku Solver</h1>
        <div className={`grid grid-cols-9 gap-0.5 mb-6 ${isDarkMode ? 'bg-indigo-700' : 'bg-indigo-900'} p-0.5 rounded`}>
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                value={cell}
                maxLength={1}
                onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                className={`w-10 h-10 text-center text-lg font-semibold outline-none
                  ${(rowIndex + 1) % 3 === 0 && rowIndex !== 8 ? `border-b-2 ${isDarkMode ? 'border-indigo-700' : 'border-indigo-900'}` : ''}
                  ${(colIndex + 1) % 3 === 0 && colIndex !== 8 ? `border-r-2 ${isDarkMode ? 'border-indigo-700' : 'border-indigo-900'}` : ''}
                  ${cell 
                    ? isDarkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-800'
                    : isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}
                  ${isDarkMode 
                    ? 'focus:bg-indigo-500 focus:text-white' 
                    : 'focus:bg-indigo-200 focus:text-indigo-900'}
                  transition-colors duration-200`}
              />
            ))
          )}
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleSolveClick}
            className={`${isDarkMode ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'} text-white py-2 px-4 rounded transition-colors duration-200`}
          >
            Solve
          </button>
          <button
            onClick={handleClearClick}
            className={`${isDarkMode ? 'bg-red-500 hover:bg-red-600' : 'bg-red-600 hover:bg-red-700'} text-white py-2 px-4 rounded transition-colors duration-200`}
          >
            Clear
          </button>
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}