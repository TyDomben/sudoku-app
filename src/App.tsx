import React from "react";
import "./App.css"; // Assuming you have some CSS for basic styling
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
      <footer>{/* You might want to add a footer for your app */}</footer>
    </div>
  );
};

export default App;
