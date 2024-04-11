import React, { useState, useEffect } from 'react';
import sudoku from 'sudoku';

const SudokuGame: React.FC = () => {
  const [board, setBoard] = useState<Array<number | null>>([]);

  useEffect(() => {
    // Generate a new puzzle
    const newPuzzle = sudoku.makepuzzle();
    // Initialize your board state with the puzzle
    // Note: You might need to adjust this based on how the puzzle is represented by the library
    setBoard(newPuzzle);
  }, []);

  const handleCellChange = (index: number, value: number) => {
    // Logic to update the cell's value based on user input
    // Ensure to validate the value and the index before updating
    const newBoard = [...board];
    newBoard[index] = value;
    setBoard(newBoard);
  };

  return (
    <div className="sudoku-board">
      {board.map((cell, index) => (
        <input
          key={index}
          type="number"
          value={cell === null ? '' : cell}
          onChange={(e) => handleCellChange(index, parseInt(e.target.value))}
          className="sudoku-cell"
        />
      ))}
    </div>
  );
};

export default SudokuGame;
