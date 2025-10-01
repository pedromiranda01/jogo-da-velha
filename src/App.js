import React, { useState } from "react";
import "./App.css";

function Board({ squares, onClick }) {
  return (
    <div className="board">
      {squares.map((square, index) => (
        <button className="square" key={index} onClick={() => onClick(index)}>
          {square}
        </button>
      ))}
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? "X" : "O";
    setSquares(newSquares);

    const newWinner = calculateWinner(newSquares);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
  };

  const isBoardFull = squares.every((square) => square !== null);
  const isDraw = !winner && isBoardFull;

  return (
    <div className="game">
      <h1>Jogo da Velha</h1>
      <Board squares={squares} onClick={handleClick} />
      {winner ? (
        <div className="status">Vencedor: {winner}</div>
      ) : isDraw ? (
        <div className="status">Empatou!</div>
      ) : (
        <div className="status">Próxima jogada: {xIsNext ? "X" : "O"}</div>
      )}
      <button className="reset" onClick={resetGame}>
        Reiniciar Jogo
      </button>
    </div>
  );
}

export default App;



