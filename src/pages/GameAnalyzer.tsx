import { useState } from 'react'
import { Chess } from 'chess.js'
import './GameAnalyzer.css'

const GameAnalyzer = () => {
  const [pgn, setPgn] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {
    if (!pgn.trim()) {
      alert('Пожалуйста, введите PGN партии')
      return
    }

    setLoading(true)
    try {
      const game = new Chess()
      game.loadPgn(pgn)
      
      // Базовый анализ партии
      const moves = game.moves({ verbose: true })
      setAnalysis({
        totalMoves: moves.length,
        lastMove: game.moves()[game.moves().length - 1],
        result: pgn.includes('1-0') ? 'Белые победили' : pgn.includes('0-1') ? 'Черные победили' : 'Ничья'
      })
    } catch (error) {
      alert('Ошибка при анализе PGN: ' + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="analyzer">
      <h1>Анализатор партий</h1>
      <p className="subtitle">Загрузите PGN вашей партии для анализа с помощью Stockfish</p>
      
      <div className="analyzer-container glass-effect">
        <div className="form-section">
          <label>Вставьте PGN партии:</label>
          <textarea
            value={pgn}
            onChange={(e) => setPgn(e.target.value)}
            placeholder="[Event \"Casual Game\"]\n[Site \"Chess.com\"]\n1. e4 e5 2. Nf3..."
            rows={10}
          />
          <button onClick={handleAnalyze} disabled={loading} className="analyze-btn">
            {loading ? '⏳ Анализирую...' : '🔍 Анализировать'}
          </button>
        </div>

        {analysis && (
          <div className="analysis-result">
            <h2>Результаты анализа</h2>
            <div className="result-grid">
              <div className="result-item">
                <span className="label">Всего ходов:</span>
                <span className="value">{analysis.totalMoves}</span>
              </div>
              <div className="result-item">
                <span className="label">Результат:</span>
                <span className="value">{analysis.result}</span>
              </div>
              <div className="result-item">
                <span className="label">Последний ход:</span>
                <span className="value">{analysis.lastMove}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GameAnalyzer