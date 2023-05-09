import React, { useEffect } from "react"
import './TicTacToe.css'
import { Board } from "./Board"
import { useState } from "react";

export const TicTacToe = () => {
    console.log("porkkana")
    const initialBoard=['','','','','','','','','',];
    const [gameState, setGameState] = useState(initialBoard);
    const [isXTurn, setIsXTurn] = useState(true);
    const [status, setStatus] = useState('');
    const [scores, setScores] = useState({xScore: 0, oScore: 0})

    const onSquareClick = (index) => {
        let strings = Array.from(gameState)
        if(status.includes("Winner")) {
            return;
        }
        if (strings[index] !== '') {
            return;
        }
        strings[index] = isXTurn ? 'X' : 'O'
        setGameState(strings)
        setIsXTurn(!isXTurn)
    }
    useEffect(() => {
        const winner = checkWinner();
        if (winner) {
            setStatus(`Winner: ${winner}`)
        } else if (!gameState.includes('')) {
            setStatus(`It's a draw`)
        } else {
            setStatus(`${isXTurn ? 'X' : 'O'}'s turn`)
        }
    })
    useEffect(() => {
        const winner = checkWinner()
        if (winner === null) {
            return
        }
        if (winner === "X") {
            setScores({xScore: scores.xScore + 1, oScore: scores.oScore})
        } else {
            setScores({xScore: scores.xScore, oScore: scores.oScore + 1})
        }
    })
    function clearScoreboard() {
        setScores({xScore:0, oScore:0})
        setGameState(initialBoard)
        setIsXTurn(true)
    }
    const checkWinner = () => {
        const lines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        for (let i=0; i<lines.length; i++) {
            const [a,b,c] = lines[i]
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return gameState[a]
            }
        }
    }
    return (
        <div>
            <div className="game">
                <h1>Tic-Tac-Toe</h1>
                <Board gameState={gameState} onSquareClick={onSquareClick}/>
                {status.includes("Winner") && (
                    <>
                        <span style={{color: "green"}}> {status} </span>
                        <button onClick={() => {
                            setGameState(initialBoard)
                            setIsXTurn(true)
                        }}>Play again

                        </button>
                    </>
                )}

            </div>
        </div>
    )
}