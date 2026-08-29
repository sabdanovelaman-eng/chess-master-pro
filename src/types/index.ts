export interface ChessUser {
  id: string;
  username: string;
  rating: number;
  avatar: string;
  createdAt: Date;
}

export interface GameAnalysis {
  id: string;
  pgn: string;
  analysis: MoveAnalysis[];
  bestMoves: string[];
  mistakes: Mistake[];
  rating: number;
  opponent: string;
  result: 'win' | 'loss' | 'draw';
  date: Date;
  gameType: 'rapid' | 'blitz' | 'bullet' | 'classical';
}

export interface MoveAnalysis {
  move: string;
  evaluation: number;
  depth: number;
  bestMove: string;
  missed: boolean;
}

export interface Mistake {
  move: string;
  type: 'blunder' | 'mistake' | 'inaccuracy';
  evaluation: number;
  bestMove: string;
  moveNumber: number;
}

export interface Puzzle {
  id: string;
  fen: string;
  moves: string[];
  solution: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  category: string;
  rating: number;
}

export interface UserProgress {
  userId: string;
  totalGames: number;
  wins: number;
  losses: number;
  draws: number;
  ratingHistory: { date: Date; rating: number }[];
  puzzlesSolved: number;
  averageAccuracy: number;
  strengths: string[];
  weaknesses: string[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: number;
  content: string;
  examples: string[];
  quiz: Question[];
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}