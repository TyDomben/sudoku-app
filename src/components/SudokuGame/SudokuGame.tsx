import React, { useState, useEffect } from "react";
import { generate, solve } from "sudoku-core";
import { Box, TextField, Button, Grid } from "@mui/material";
import "./SudokuGame.css";
// Assuming 'Board' is the correct type from 'sudoku-core'
type Board = (number | null)[];

const SudokuGame: React.FC = () => {
  const [puzzle, setPuzzle] = useState<(number | null)[]>([]);
  const [userInputs, setUserInputs] = useState<{
    [key: number]: number | null;
  }>({});

  useEffect(() => {
    newGame("easy"); // Use a string literal corresponding to a valid difficulty level
  }, []);

  const newGame = (
    difficulty: "easy" | "medium" | "hard" | "expert" | "master"
  ) => {
    const newPuzzle = generate(difficulty);
    console.log("New puzzle generated:", newPuzzle); // Log the new puzzle
    setPuzzle(newPuzzle);
    setUserInputs({});
  };

  const handleCellChange = (index: number, value: string) => {
    if (puzzle[index] !== null) return;

    const newValue = value === "" ? null : parseInt(value, 10);
    setUserInputs((prevInputs) => {
      const updatedInputs = {
        ...prevInputs,
        [index]: newValue,
      };
      console.log(`Cell ${index} changed to:`, newValue, updatedInputs); // Log the change
      return updatedInputs;
    });
  };

  const checkSolution = () => {
    // Create a board from the initial puzzle and user inputs
    const currentBoard = puzzle.map((value, index) =>
      userInputs[index] !== undefined ? userInputs[index] : value
    );
  
    // Call the solve function from the sudoku-core library
    const solutionResult = solve(currentBoard);
  
    // Ensure that the solve function returned a valid solution board
    if (solutionResult.solved && solutionResult.board) {
      console.log("The puzzle is correctly solved!");
      return true;
    } else {
      // Check each cell only if we have a solution board
      const isCorrectSoFar = solutionResult.board && currentBoard.every((value, index) => {
        // If the cell is empty or matches the solution, it's correct so far
        return value === null || value === solutionResult.board?.[index];
      });
  
      console.log(`The current inputs are ${isCorrectSoFar ? 'correct' : 'incorrect'}.`);
      return isCorrectSoFar ?? false;
    }
  };
  
  

  return (
    <Box sx={{ flexGrow: 1, padding: 3, maxWidth: 450, margin: "auto" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9, 1fr)", // creates a 9x9 grid
          gap: "2px", // space between cells
          backgroundColor: "#000", // for gaps to appear as lines
          padding: "2px", // for the outer edge to have the same spacing
        }}
      >
        {puzzle.map((cell, index) => {
          const row = Math.floor(index / 9);
          const col = index % 9;
          const isRightBorder = (col + 1) % 3 === 0 && col !== 8; // right border for 3x3 grid
          const isBottomBorder = (row + 1) % 3 === 0 && row !== 8; // bottom border for 3x3 grid
          const borderStyle = {
            borderTop: "1px solid #000",
            borderLeft: "1px solid #000",
            borderRight: isRightBorder ? "3px solid #000" : "1px solid #000",
            borderBottom: isBottomBorder ? "3px solid #000" : "1px solid #000",
            backgroundColor: "#fff",
          };

          return (
            <TextField
              key={index}
              variant="outlined"
              value={userInputs[index] ?? cell ?? ""}
              onChange={(e) => handleCellChange(index, e.target.value)}
              inputProps={{ style: { textAlign: "center", padding: "10px" } }}
              disabled={cell !== null}
              style={{
                ...borderStyle,
                width: "100%",
                height: "50px", // Adjust the size as needed
              }}
            />
          );
        })}
      </div>
      <Button
        variant="contained"
        onClick={() =>
          alert(checkSolution() ? "Correct so far!" : "Incorrect!")
        }
        sx={{ mt: 3, ml: 2 }}
      >
        Check Solution
      </Button>
    </Box>
  );
};

// Export the SudokuGame component
export default SudokuGame;
