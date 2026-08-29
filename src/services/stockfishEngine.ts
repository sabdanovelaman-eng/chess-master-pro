// Сервис для работы с Stockfish
export class StockfishEngine {
  private worker: Worker | null = null
  private isReady = false

  async init() {
    return new Promise((resolve) => {
      try {
        // Используем веб-воркер для Stockfish
        this.worker = new Worker('/stockfish.js')
        this.worker.onmessage = (e) => {
          if (e.data === 'uciok') {
            this.isReady = true
            resolve(true)
          }
        }
        this.worker.postMessage('uci')
      } catch (error) {
        console.log('Stockfish не инициализирован, используется режим без анализа')
        resolve(false)
      }
    })
  }

  // Анализировать позицию
  async analyze(fen: string, depth: number = 20): Promise<any> {
    if (!this.worker || !this.isReady) return null

    return new Promise((resolve) => {
      const timeout = setTimeout(() => resolve(null), 3000)
      
      this.worker!.onmessage = (e) => {
        if (e.data.includes('bestmove')) {
          clearTimeout(timeout)
          const parts = e.data.split(' ')
          resolve({
            bestMove: parts[1],
            evaluation: 0
          })
        }
      }

      this.worker!.postMessage(`position fen ${fen}`)
      this.worker!.postMessage(`go depth ${depth}`)
    })
  }

  // Получить все лучшие ходы
  async getMultiPv(fen: string, depth: number = 20, pv: number = 3): Promise<any[]> {
    if (!this.worker || !this.isReady) return []

    return new Promise((resolve) => {
      const results: any[] = []
      const timeout = setTimeout(() => resolve(results), 3000)

      this.worker!.onmessage = (e) => {
        if (e.data.includes('bestmove')) {
          clearTimeout(timeout)
          resolve(results)
        }
      }

      this.worker!.postMessage(`setoption name MultiPV value ${pv}`)
      this.worker!.postMessage(`position fen ${fen}`)
      this.worker!.postMessage(`go depth ${depth}`)
    })
  }

  terminate() {
    if (this.worker) {
      this.worker.terminate()
      this.worker = null
    }
  }
}

export const stockfishEngine = new StockfishEngine()