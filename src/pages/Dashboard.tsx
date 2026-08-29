import { useEffect, useState } from 'react'
import { useStore } from '../store/useStore'
import { chesscomApi } from '../services/chesscomApi'
import { GameAnalysis, UserProgress } from '../types'
import ProfileConnector from '../components/ProfileConnector'
import './Dashboard.css'

const Dashboard = () => {
  const { user, setProgress, loading, setLoading } = useStore()
  const [games, setGames] = useState<GameAnalysis[]>([])
  const [stats, setStats] = useState(null)

  useEffect(() => {
    if (user) {
      loadUserData()
    }
  }, [user])

  const loadUserData = async () => {
    setLoading(true)
    try {
      const [gamesData, statsData] = await Promise.all([
        chesscomApi.getGames(user!.username),
        chesscomApi.getStats(user!.username)
      ])
      
      setGames(gamesData.slice(0, 10))
      setStats(statsData)
      
      const progress: UserProgress = {
        userId: user!.id,
        totalGames: statsData.games_played || 0,
        wins: statsData.wins || 0,
        losses: statsData.losses || 0,
        draws: statsData.draws || 0,
        ratingHistory: [],
        puzzlesSolved: 0,
        averageAccuracy: 0,
        strengths: [],
        weaknesses: []
      }
      setProgress(progress)
    } catch (error) {
      console.error('Ошибка загрузки данных:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="dashboard">
        <ProfileConnector />
      </div>
    )
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Добро пожаловать, {user.username}!</h1>
        <p>Рейтинг: <span className="rating-badge">{user.rating}</span></p>
      </div>

      {loading ? (
        <div className="loading">Загрузка данных...</div>
      ) : (
        <div className="dashboard-grid">
          <div className="stat-card glass-effect">
            <div className="stat-icon">🎮</div>
            <h3>Всего партий</h3>
            <p className="stat-value">{stats?.games_played || 0}</p>
          </div>

          <div className="stat-card glass-effect">
            <div className="stat-icon">✅</div>
            <h3>Побед</h3>
            <p className="stat-value" style={{ color: '#4CAF50' }}>{stats?.wins || 0}</p>
          </div>

          <div className="stat-card glass-effect">
            <div className="stat-icon">❌</div>
            <h3>Поражений</h3>
            <p className="stat-value" style={{ color: '#ff6b6b' }}>{stats?.losses || 0}</p>
          </div>

          <div className="stat-card glass-effect">
            <div className="stat-icon">🤝</div>
            <h3>Ничьих</h3>
            <p className="stat-value" style={{ color: '#FFD700' }}>{stats?.draws || 0}</p>
          </div>
        </div>
      )}

      {games.length > 0 && (
        <div className="recent-games glass-effect">
          <h2>Последние партии</h2>
          <div className="games-list">
            {games.map((game, idx) => (
              <div key={idx} className="game-item">
                <span className="opponent">vs {game.opponent}</span>
                <span className={`result ${game.result}`}>
                  {game.result === 'win' ? '✅ Победа' : game.result === 'loss' ? '❌ Поражение' : '🤝 Ничья'}
                </span>
                <span className="date">{new Date(game.date).toLocaleDateString('ru-RU')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard