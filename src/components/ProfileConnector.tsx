import { useState } from 'react'
import { useStore } from '../store/useStore'
import { chesscomApi } from '../services/chesscomApi'
import './ProfileConnector.css'

const ProfileConnector = () => {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { setUser, user } = useStore()

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const profile = await chesscomApi.getProfile(username)
      setUser(profile)
      setUsername('')
    } catch (err) {
      setError('Не удалось найти пользователя. Проверьте имя.')
    } finally {
      setLoading(false)
    }
  }

  if (user) {
    return (
      <div className="profile-card glass-effect">
        <div className="profile-header">
          {user.avatar && <img src={user.avatar} alt={user.username} className="avatar" />}
          <div>
            <h2>{user.username}</h2>
            <p className="rating">Рейтинг: {user.rating}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleConnect} className="connector-form glass-effect">
      <h3>Подключить Chess.com аккаунт</h3>
      <div className="form-group">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="ВведитеUsername с Chess.com"
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Загр��зка...' : 'Подключить'}
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </form>
  )
}

export default ProfileConnector