import { Link, useLocation } from 'react-router-dom'
import { useStore } from '../store/useStore'
import './Navigation.css'

const Navigation = () => {
  const location = useLocation()
  const { user } = useStore()

  const isActive = (path: string) => location.pathname === path ? 'active' : ''

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          ♚ Chess Master Pro
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              Панель
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/analyze" className={`nav-link ${isActive('/analyze')}`}>
              Анализ
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/trainer" className={`nav-link ${isActive('/trainer')}`}>
              Тренер
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/puzzles" className={`nav-link ${isActive('/puzzles')}`}>
              Задачи
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className={`nav-link ${isActive('/profile')}`}>
              {user ? `${user.username} (${user.rating})` : 'Профиль'}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation