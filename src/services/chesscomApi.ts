import axios from 'axios'
import { GameAnalysis, ChessUser } from '../types'

const API_URL = 'https://api.chess.com/pub'

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000
})

export const chesscomApi = {
  // Получить профиль пользователя
  async getProfile(username: string): Promise<ChessUser> {
    try {
      const response = await api.get(`/player/${username}`)
      return {
        id: response.data.url,
        username: response.data.username,
        rating: response.data.chess_blitz?.last?.rating || 1200,
        avatar: response.data.avatar || '',
        createdAt: new Date(response.data.joined * 1000)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      throw error
    }
  },

  // Получить все партии пользователя
  async getGames(username: string): Promise<GameAnalysis[]> {
    try {
      const response = await api.get(`/player/${username}/games`)
      return response.data.games.map((game: any) => ({
        id: game.url,
        pgn: game.pgn,
        result: game.white.result,
        opponent: game.white.username === username ? game.black.username : game.white.username,
        rating: game.white.rating || 1200,
        gameType: 'rapid',
        date: new Date(game.end_time * 1000),
        analysis: [],
        bestMoves: [],
        mistakes: []
      }))
    } catch (error) {
      console.error('Error fetching games:', error)
      throw error
    }
  },

  // Получить статистику
  async getStats(username: string) {
    try {
      const response = await api.get(`/player/${username}/stats`)
      return response.data
    } catch (error) {
      console.error('Error fetching stats:', error)
      throw error
    }
  }
}

export default chesscomApi