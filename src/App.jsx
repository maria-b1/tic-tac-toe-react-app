import React from 'react'
import { useEffect, useState } from 'react'

// Game logic utilities
import {
  checkEndGame,
  checkWinnerFrom,
  nextTurn,
  provideInitialArray,
  provideDefaultTurn,
  validateBoard,
  validateTurn
} from './logic/board'

// Confetti animations
import { createConfetti, resetConfetti } from './logic/confetti'

// LocalStorage helpers
import {
  loadBoardFromStorage,
  loadTurnFromStorage,
  resetGameStorage,
  saveGameToStorage
} from './logic/storage'

// Board tile UI component
import { BoardTile } from './components/BoardTile'

function App() {
  // Load board from storage or initialize
  const [board, setBoard] = useState(
    loadBoardFromStorage(validateBoard, provideInitialArray)
  )

  // Load current turn or set default
  const [turn, setTurn] = useState(
    loadTurnFromStorage(validateTurn, provideDefaultTurn)
  )

  // State for winner and winning combo
  const [winner, setWinner] = useState(null)
  const [winnerCombo, setWinnerCombo] = useState(null)

  // Reset game state
  const handleReset = () => {
    setBoard(provideInitialArray)
    setTurn(provideDefaultTurn)
    setWinner(null)
    setWinnerCombo(null)
    resetConfetti()
    resetGameStorage()
  }

  // Prevent move if tile filled or game is over
  const canBoardBeUpdated = (index) => board[index] === null && winner === null

  // Update a board tile with new value
  const updateBoardTile = (index, value) => {
    const newBoard = [...board]
    newBoard[index] = value
    setBoard(newBoard)
    return newBoard
  }

  // Main click handler for board tiles
  const onBoardTileAction = (index) => {
    if (!canBoardBeUpdated(index)) return

    const newBoard = updateBoardTile(index, turn)
    const newTurn = nextTurn(turn)
    setTurn(newTurn)

    // Save current board and turn to localStorage
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
  }

  // Watch board for win/tie updates
  useEffect(() => {
    const [newWinner, newWinnerCombo] = checkWinnerFrom(board)

    if (newWinner !== null) {
      createConfetti()
      setWinner(newWinner)
      setWinnerCombo(newWinnerCombo)
    } else if (checkEndGame(board)) {
      setWinner(false) // Indicates a tie
    }
  }, [board])

  return (
    <main className="App">
      <header>
        <a href="./" className="branding">
          <img src="tic-tac-toe.svg" className="logo" alt="Tic-Tac-Toe logo" />
          <h1 className="title">
            <span>Tic</span>-<span>Tac</span>-<span>Toe</span>
          </h1>
        </a>
      </header>

      <section className="board">
        {board.map((value, index) => (
          <BoardTile
            key={index}
            value={value}
            action={onBoardTileAction}
            index={index}
            highlight={winnerCombo?.includes(index)} // Highlights winning tiles
          />
        ))}
      </section>

      <footer>
        <button onClick={handleReset}>Reset</button>

        {winner === null && (
          <p data-testid="turn-indicator">{turn}&apos;s turn</p> // Show turn
        )}
        {winner === false && <p>TIE!</p>} // Show tie
        {winner && (
          <p>
            <span>{winner}</span> won! // Show winner
          </p>
        )}
      </footer>
    </main>
  )
}

export default App
