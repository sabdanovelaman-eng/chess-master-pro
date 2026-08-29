import { useState, useEffect } from 'react'
import { Puzzle } from '../types'
import './Puzzles.css'

const Puzzles = () => {
  const [puzzles, setPuzzles] = useState<Puzzle[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [solved, setSolved] = useState(0)
  const [difficulty, setDifficulty] = useState<1 | 2 | 3 | 4 | 5>(2)

  useEffect(() => {
    generatePuzzles()
  }, [difficulty])

  const generatePuzzles = () => {
    const newPuzzles: Puzzle[] = [
      {
        id: '1',
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
        moves: ['Bxc6', 'bxc6'],
        solution: ['Bxc6'],
        difficulty: 2,
        category: 'Тактика',
        rating: 1200
      },
      {
        id: '2',
        fen: '6k1/5ppp/8/8/8/8/5PPP/6K1 w - - 0 1',
        moves: ['g4', 'g3', 'f4'],
        solution: ['g4'],
        difficulty: 3,
        category: 'Эндшпиль',
        rating: 1400
      },
      {
        id: '3',
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/3P1N2/PPP2PPP/RNBQKB1R w KQkq - 0 4',
        moves: ['dxe5', 'Nxe5'],
        solution: ['dxe5'],
        difficulty: 1,
        category: 'Открытие',
        rating: 1000
      }
    ]
    setPuzzles(newPuzzles)
    setCurrentIndex(0)
  }

  const handleSolve = (moveCorrect: boolean) => {
    if (moveCorrect) {
      setSolved(solved + 1)
      alert('✅ Правильно!')
    } else {
      alert('❌ Неправильно. Попробуйте ещё раз!')
    }
    
    if (currentIndex < puzzles.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      alert(`Поздравляем! Вы решили ${solved + (moveCorrect ? 1 : 0)} задач из ${puzzles.length}`)
      generatePuzzles()
    }
  }

  const currentPuzzle = puzzles[currentIndex]

  return (
    <div className="puzzles-container">
      <h1>🧩 Тактические Задачи</h1>
      
      <div className="difficulty-selector">
        <label>Выберите сложность:</label>
        <div className="difficulty-buttons">
          {[1, 2, 3, 4, 5].map(level => (
            <button
              key={level}
              className={`difficulty-btn ${difficulty === level ? 'active' : ''}`}
              onClick={() => setDifficulty(level as 1 | 2 | 3 | 4 | 5)}
            >
              {level < 3 ? '⭐'.repeat(level) : '⭐'.repeat(level)}
            </button>
          ))}
        </div>
      </div>

      {currentPuzzle && (
        <div className="puzzle-card glass-effect">
          <div className="puzzle-header">
            <span className="puzzle-number">Задача {currentIndex + 1} из {puzzles.length}</span>
            <span className="puzzle-rating">📊 {currentPuzzle.rating}</span>
          </div>

          <div className="puzzle-content">
            <div className="puzzle-info">
              <p><strong>Категория:</strong> {currentPuzzle.category}</p>
              <p><strong>Цель:</strong> Найдите лучший ход</p>
            </div>

            <div className="puzzle-board-placeholder">
              📋 Шахматная доска (FEN: {currentPuzzle.fen.substring(0, 20)}...)
            </div>
          </div>

          <div className="puzzle-actions">
            {currentPuzzle.moves.map((move, idx) => (
              <button
                key={idx}
                className="move-btn"
                onClick={() => handleSolve(move === currentPuzzle.solution[0])}
              >
                {move}
              </button>
            ))}
          </div>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${((currentIndex + 1) / puzzles.length) * 100}%` }}></div>
          </div>
          <p className="progress-text">Решено: {solved}</p>
        </div>
      )}
    </div>
  )
}

export default Puzzles