'use client'

import { useState } from 'react'
import Fireworks from './components/Fireworks'

type Player = 'X' | 'O' | null

export default function Home() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X')
  const [winner, setWinner] = useState<Player>(null)
  const [winningLine, setWinningLine] = useState<number[]>([])

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ]

  const checkWinner = (newBoard: Player[]) => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinner(newBoard[a])
        setWinningLine(combo)
        return true
      }
    }
    return false
  }

  const handleClick = (index: number) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    if (!checkWinner(newBoard)) {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer('X')
    setWinner(null)
    setWinningLine([])
  }

  const isDraw = board.every(cell => cell !== null) && !winner

  const playerColors = {
    X: 'text-neon-yellow',
    O: 'text-neon-blue'
  }

  const playerBorderColors = {
    X: 'border-neon-yellow shadow-neon-yellow',
    O: 'border-neon-blue shadow-neon-blue'
  }

  const playerHoverColors = {
    X: 'hover:bg-neon-yellow',
    O: 'hover:bg-neon-blue'
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 scanlines">
      {winner && <Fireworks winner={winner} />}
      <div className="text-center mb-8">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 neon-glow text-neon-pink flicker">
          TIC TAC TOE
        </h1>
        <div className="space-y-4">
          {!winner && !isDraw && (
            <div className="flex items-center justify-center gap-4">
              <span className={`text-6xl md:text-8xl font-bold ${playerColors[currentPlayer]} neon-glow pulse-neon`}>
                {currentPlayer}
              </span>
              <span className="text-2xl md:text-3xl text-white">'s Turn</span>
            </div>
          )}
          <p className={`text-2xl ${winner ? playerColors[winner] : 'text-neon-blue'} neon-glow`}>
            {winner ? `Player ${winner} Wins!` : isDraw ? 'It\'s a Draw!' : ''}
          </p>
        </div>
      </div>

      <div className={`grid grid-cols-3 gap-2 mb-8 p-6 rounded-lg border-4 transition-all duration-300 max-w-fit mx-auto ${!winner && !isDraw ? playerBorderColors[currentPlayer] : 'border-neon-pink'} ${!winner && !isDraw ? 'shadow-lg' : ''}`}>
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`
              w-24 h-24 md:w-32 md:h-32 
              text-4xl md:text-6xl font-bold
              border-4 rounded-lg
              transition-all duration-200
              ${winningLine.includes(index) ? 'border-neon-green' : 'border-neon-pink'}
              ${cell === 'X' ? 'text-neon-yellow' : cell === 'O' ? 'text-neon-blue' : ''}
              ${!cell && !winner ? `${playerHoverColors[currentPlayer]} hover:bg-opacity-20 hover:scale-105` : ''}
              ${cell || winner ? 'cursor-not-allowed' : 'cursor-pointer'}
              neon-glow
              bg-retro-bg
            `}
            disabled={!!cell || !!winner}
          >
            {cell && <span className="pulse-neon">{cell}</span>}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="btn btn-lg btn-primary text-xl px-8 py-4 rounded-full neon-glow hover:scale-110 transition-transform"
      >
        NEW GAME
      </button>

      <div className="mt-8 text-center">
        <p className="text-neon-green neon-glow text-lg">
          Player 1: <span className="text-neon-yellow">X</span> | Player 2: <span className="text-neon-blue">O</span>
        </p>
      </div>
    </div>
  )
}