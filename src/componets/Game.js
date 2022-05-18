import React, { useState } from "react";
import Board from "./Board";


function Game() {
    const [stateHistory, setHistory] = useState([{ squares: Array(9).fill(null) }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    

    function handleClick(i) {
        const history = stateHistory.slice(0, stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? "X" : "O";

        setHistory([...history, {squares}]) //cleaner or faster
        setStepNumber(history.length)
        setXIsNext(!xIsNext)

    }

    function jumpTo(step) {

            setStepNumber(step)
            setXIsNext((step % 2) === 0) //
    }

    const history = stateHistory;
        const current = history[stepNumber];

        const moves = history.map((_step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        function calculateStatus(current) {
            const winner = calculateWinner(current.squares);
            let status;
            if (winner) {
                status = "Winner: " + winner;
            } else {
                status = "Next player: " + (xIsNext ? "X" : "O");
            }

            return status
        }
 
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        doSomething={(i) => {handleClick(i) }}
                    />
                </div>
                <div className="game-info">
                    <div>{calculateStatus(current)}</div>
                    <ol>{moves}</ol>
                </div>
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
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default Game
