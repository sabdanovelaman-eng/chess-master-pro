import { useStore } from '../store/useStore'
import { useEffect, useState } from 'react'
import './Profile.css'

const Profile = () => {
  const { user, progress } = useStore()
  const [stats, setStats] = useState(null)

  useEffect(() => {
    // Здесь можно загрузить дополнительные данные профиля
  }, [user])

  if (!user) {
    return (
      <div className="profile">
        <p className="no-user">Пожалуйста, подключите свой аккаунт Chess.com для просмотра профиля</p>
      </div>
    )
  }

  return (
    <div className="profile">
      <div className="profile-header glass-effect">
        <div className="profile-avatar">
          {user.avatar ? <img src={user.avatar} alt={user.username} /> : <div className="avatar-placeholder">👤</div>}
        </div>
        <div className="profile-info">
          <h1>{user.username}</h1>
          <p className="created-date">Создан: {new Date(user.createdAt).toLocaleDateString('ru-RU')}</p>
          <div className="rating-display">
            <span className="rating-label">Текущий рейтинг</span>
            <span className="rating-number">{user.rating}</span>
          </div>
        </div>
      </div>

      {progress && (
        <div className="stats-section glass-effect">
          <h2>📊 Статистика</h2>
          <div className="stats-grid">
            <div className="stat-box">
              <h3>Всего партий</h3>
              <p className="stat-big">{progress.totalGames}</p>
            </div>
            <div className="stat-box">
              <h3>Побед</h3>
              <p className="stat-big win">{progress.wins}</p>
            </div>
            <div className="stat-box">
              <h3>Поражений</h3>
              <p className="stat-big loss">{progress.losses}</p>
            </div>
            <div className="stat-box">
              <h3>Ничьих</h3>
              <p className="stat-big draw">{progress.draws}</p>
            </div>
            <div className="stat-box">
              <h3>Процент побед</h3>
              <p className="stat-big">{progress.totalGames > 0 ? ((progress.wins / progress.totalGames) * 100).toFixed(1) : 0}%</p>
            </div>
            <div className="stat-box">
              <h3>Решено задач</h3>
              <p className="stat-big">{progress.puzzlesSolved}</p>
            </div>
          </div>
        </div>
      )}

      <div className="achievements glass-effect">
        <h2>🏆 Достижения</h2>
        <div className="achievements-grid">
          <div className="achievement">
            <span className="achievement-icon">🏅</span>
            <p>Новичок</p>
            <small>Первая партия</small>
          </div>
          <div className="achievement">
            <span className="achievement-icon">⭐</span>
            <p>Звезда</p>
            <small>10 побед</small>
          </div>
          <div className="achievement">
            <span className="achievement-icon">💎</span>
            <p>Мастер</p>
            <small>50 побед</small>
          </div>
          <div className="achievement">
            <span className="achievement-icon">👑</span>
            <p>Чемпион</p>
            <small>Рейтинг 2000+</small>
          </div>
          <div className="achievement">
            <span className="achievement-icon">🧩</span>
            <p>Тактик</p>
            <small>50 решённых задач</small>
          </div>
          <div className="achievement">
            <span className="achievement-icon">📚</span>
            <p>Учёный</p>
            <small>Все уроки пройдены</small>
          </div>
        </div>
      </div>

      <div className="account-actions glass-effect">
        <h2>⚙️ Действия</h2>
        <div className="buttons-group">
          <button className="action-btn primary">📥 Обновить данные</button>
          <button className="action-btn">🔄 Переподключить аккаунт</button>
          <button className="action-btn danger">🗑️ Отключить аккаунт</button>
        </div>
      </div>
    </div>
  )
}

export default Profile