import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useStore } from './store/useStore'
import { stockfishEngine } from './services/stockfishEngine'
import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'
import GameAnalyzer from './pages/GameAnalyzer'
import Trainer from './pages/Trainer'
import Profile from './pages/Profile'
import Puzzles from './pages/Puzzles'
import './App.css'

function App() {
  const { setLoading } = useStore()

  useEffect(() => {
    // Инициализация Stockfish при загрузке
    const initEngine = async () => {
      setLoading(true)
      try {
        await stockfishEngine.init()
        console.log('Stockfish инициализирован')
      } catch (error) {
        console.log('Stockfish недоступен, работаем в облегченном режиме')
      } finally {
        setLoading(false)
      }
    }

    initEngine()

    return () => {
      stockfishEngine.terminate()
    }
  }, [])

  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analyze" element={<GameAnalyzer />} />
            <Route path="/trainer" element={<Trainer />} />
            <Route path="/puzzles" element={<Puzzles />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App