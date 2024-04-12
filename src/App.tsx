import React from "react";
import SudokuGame from "./components/SudokuGame/SudokuGame";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sudoku Game</h1>
      </header>
      <main>
        <SudokuGame />
      </main>
      <footer>
        <p>Enjoy our Sudoku challenge!</p>
      </footer>
    </div>
  );
};

export default App;
