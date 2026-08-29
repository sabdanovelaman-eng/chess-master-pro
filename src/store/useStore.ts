import { create } from 'zustand'
import { ChessUser, UserProgress, GameAnalysis } from '../types'

interface Store {
  user: ChessUser | null
  progress: UserProgress | null
  games: GameAnalysis[]
  loading: boolean
  setUser: (user: ChessUser | null) => void
  setProgress: (progress: UserProgress) => void
  setGames: (games: GameAnalysis[]) => void
  setLoading: (loading: boolean) => void
  addGame: (game: GameAnalysis) => void
}

export const useStore = create<Store>((set) => ({
  user: null,
  progress: null,
  games: [],
  loading: false,
  setUser: (user) => set({ user }),
  setProgress: (progress) => set({ progress }),
  setGames: (games) => set({ games }),
  setLoading: (loading) => set({ loading }),
  addGame: (game) => set((state) => ({ games: [game, ...state.games] }))
}))