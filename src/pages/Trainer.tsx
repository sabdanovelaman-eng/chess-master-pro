import { useState } from 'react'
import './Trainer.css'

interface Lesson {
  id: string
  title: string
  description: string
  icon: string
}

const Trainer = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [completedLessons, setCompletedLessons] = useState<string[]>([])

  const lessons: Lesson[] = [
    {
      id: '1',
      title: 'Основы Дебюта',
      description: 'Изучите принципы открытия партий: контроль центра, развитие фигур, безопасность короля',
      icon: '♔'
    },
    {
      id: '2',
      title: 'Тактика для Начинающих',
      description: 'Научитесь видеть вилки, булавки и связки. Основные тактические приёмы в шахматах',
      icon: '⚔️'
    },
    {
      id: '3',
      title: 'Стратегия Миттельшпиля',
      description: 'Слабые поля, структура пешек, позиционная борьба. Как развивать преимущество',
      icon: '🎯'
    },
    {
      id: '4',
      title: 'Техника Эндшпиля',
      description: 'Король и пешка, ладейные окончания. Как выигрывать с минимумом фигур',
      icon: '👑'
    },
    {
      id: '5',
      title: 'Анализ Своих Игр',
      description: 'Как разбирать партии, находить ошибки и учиться на них',
      icon: '📊'
    },
    {
      id: '6',
      title: 'Психология Игры',
      description: 'Управление стрессом, концентрация и тайм-менеджмент на турнирах',
      icon: '🧠'
    }
  ]

  const handleCompleteLesson = (id: string) => {
    if (!completedLessons.includes(id)) {
      setCompletedLessons([...completedLessons, id])
      alert('✅ Урок завершён!')
    }
  }

  return (
    <div className="trainer-container">
      <h1>👨‍🏫 AI Тренер по Шахматам</h1>
      <p className="trainer-subtitle">Персональная система обучения для вашего прогресса</p>

      {selectedLesson ? (
        <div className="lesson-detail glass-effect">
          <button className="back-btn" onClick={() => setSelectedLesson(null)}>← Назад</button>
          
          <div className="lesson-header">
            <div className="lesson-icon">{selectedLesson.icon}</div>
            <h2>{selectedLesson.title}</h2>
          </div>

          <div className="lesson-content">
            <h3>Содержание урока</h3>
            <p>{selectedLesson.description}</p>

            <div className="theory-section">
              <h4>📚 Теория</h4>
              <p>Здесь располагается подробное объяснение материала с диаграммами, примерами и видео.</p>
            </div>

            <div className="examples-section">
              <h4>🔍 Примеры</h4>
              <p>Классические партии гроссмейстеров, иллюстрирующие данный материал.</p>
            </div>

            <div className="exercises-section">
              <h4>💪 Упражнения</h4>
              <p>Практические задачи для закрепления материала.</p>
              <div className="quiz">
                <div className="question">
                  <p><strong>Вопрос 1:</strong> Назовите три главных принципа открытия?</p>
                  <div className="options">
                    <button className="option">A) Контроль центра</button>
                    <button className="option">B) Развитие фигур</button>
                    <button className="option">C) Безопасность короля</button>
                    <button className="option">D) Все вышеперечисленное ✅</button>
                  </div>
                </div>
              </div>
            </div>

            <button 
              className="complete-btn" 
              onClick={() => handleCompleteLesson(selectedLesson.id)}
              disabled={completedLessons.includes(selectedLesson.id)}
            >
              {completedLessons.includes(selectedLesson.id) ? '✅ Завершено' : '✓ Завершить урок'}
            </button>
          </div>
        </div>
      ) : (
        <div className="lessons-grid">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="lesson-card glass-effect">
              <div className="lesson-card-header">
                <div className="lesson-card-icon">{lesson.icon}</div>
                {completedLessons.includes(lesson.id) && <div className="completed-badge">✅</div>}
              </div>
              <h3>{lesson.title}</h3>
              <p>{lesson.description}</p>
              <button 
                className="start-btn"
                onClick={() => setSelectedLesson(lesson)}
              >
                {completedLessons.includes(lesson.id) ? 'Повторить' : 'Начать'}
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="progress-overview glass-effect">
        <h3>📈 Ваш Прогресс</h3>
        <div className="progress-stats">
          <div className="stat">
            <span className="stat-label">Завершено уроков</span>
            <span className="stat-value">{completedLessons.length}/{lessons.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Прогресс</span>
            <span className="stat-value">{Math.round((completedLessons.length / lessons.length) * 100)}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Trainer