export class StockfishEngine {
  private worker: Worker | null = null
  private isReady = false

  async init() {
    return new Promise((resolve) => {
      try {
        this.worker = new Worker('/stockfish.js')
        this.worker.onmessage = (e) => {
          if (e.data === 'uciok') {
            this.isReady = true
            resolve(true)
          }
        }
        this.worker.postMessage('uci')
      } catch (error) {
        console.log('Stockfish недоступен, используется режим без анализа')
        resolve(false)
      }
    })
  }

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

  terminate() {
    if (this.worker) {
      this.worker.terminate()
      this.worker = null
    }
  }
}

export const stockfishEngine = new StockfishEngine()