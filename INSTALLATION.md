# Chess Master Pro - Инструкция по Установке

## 🎯 Шаг 1: Подготовка

Убедитесь, что у вас установлены:
- Node.js версия 18 или выше
- npm или yarn
- Git

Проверить версию Node.js:
```bash
node --version  # должно быть v18+
npm --version   # должно быть 9+
```

## 📥 Шаг 2: Клонирование Репозитория

```bash
# Клонируйте проект
git clone https://github.com/sabdanovelaman-eng/chess-master-pro.git

# Перейдите в директорию
cd chess-master-pro
```

## ⚙️ Шаг 3: Установка Зависимостей

```bash
# С npm
npm install

# Или с yarn
yarn install

# Или с pnpm
pnpm install
```

## 🔧 Шаг 4: Конфигурация

Создайте файл `.env` на основе `.env.example`:

```bash
cp .env.example .env
```

Отредактируйте `.env` (опционально):
```env
# Дефолтные значения уже установлены
VITE_API_URL=http://localhost:3000/api
```

## 🚀 Шаг 5: Запуск

```bash
# Режим разработки (с hot reload)
npm run dev

# Откройте http://localhost:3000 в браузере
```

Должно вывести что-то вроде:
```
➜  Local:   http://localhost:3000/
```

## 🏗️ Шаг 6: Сборка для Продакшена

```bash
# Собрать оптимизированную версию
npm run build

# Файлы будут в папке dist/

# Превью сборки локально
npm run preview
```

## 🎮 Шаг 7: Первый Запуск

1. **Откройте приложение** - http://localhost:3000
2. **Введите username** - Ваше имя пользователя из Chess.com
3. **Нажмите "Подключить"** - Данные загрузятся автоматически
4. **Начните использовать:**
   - 📊 **Панель** - Просмотр статистики
   - 🔍 **Анализ** - Загрузка PGN партий
   - 🧩 **Задачи** - Решение тактических позиций
   - 🧠 **Тренер** - Изучение курсов
   - 👤 **Профиль** - Просмотр достижений

## 🐛 Решение Проблем

### Ошибка: "Cannot find module"
```bash
# Удалите node_modules и переустановите
rm -rf node_modules package-lock.json
npm install
```

### Порт 3000 занят
```bash
# Используйте другой порт
VITE_PORT=3001 npm run dev
```

### Stockfish не инициализируется
- Это нормально! Приложение работает и без Stockfish
- Базовая функциональность оста��тся доступна

### Проблемы с Chess.com API
- Проверьте интернет соединение
- Убедитесь что username правильный
- API может быть временно недоступен

## 📚 Структура Проекта

```
chess-master-pro/
├── src/
│   ├── pages/          # Все страницы (Dashboard, Trainer и т.д.)
│   ├── components/     # React компоненты
│   ├── services/       # API и логика
│   ├── store/          # State management
│   ├── types/          # TypeScript типы
│   ├── App.tsx         # Главный компонент
│   ├── main.tsx        # Точка входа
│   └── index.css       # Глобальные стили
├── public/             # Статические файлы
├── vite.config.ts      # Конфигурация Vite
├── tailwind.config.js  # Tailwind CSS
├── tsconfig.json       # TypeScript конфиг
└── package.json        # Зависимости
```

## 🚀 Дополнительные Команды

```bash
# Проверка типов TypeScript
npm run type-check

# Запуск с конкретным портом
VITE_PORT=3001 npm run dev

# Аналитика размера бандла
npm install --save-dev rollup-plugin-visualizer
```

## 🌐 Деплой

### Vercel (Рекомендуется)
```bash
# Установите Vercel CLI
npm i -g vercel

# Деплой
vercel
```

### Netlify
```bash
# Установите Netlify CLI
npm i -g netlify-cli

# Деплой
netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
npm run build
# Загрузите содержимое dist/ на gh-pages ветку
```

## 💡 Советы

- 🔄 Используйте **npm run dev** во время разработки
- 📦 Запускайте **npm run build** перед продакшеном
- 🐛 Открывайте DevTools (F12) для отладки
- 💾 Сохраняйте .env файл в .gitignore
- 🎨 Кастомизируйте стили в src/index.css

## ✅ Проверка Установки

Если вы видите:
- ✅ Приложение открывается в браузере
- ✅ Можно ввести username Chess.com
- ✅ Нет ошибок в консоли
- ✅ Навигация работает

**Всё установлено правильно! 🎉**

## 📞 Помощь

Если возникли проблемы:
1. Проверьте [README.md](./README.md)
2. Откройте [issue на GitHub](https://github.com/sabdanovelaman-eng/chess-master-pro/issues)
3. Проверьте логи в консоли браузера (F12)

---

**Enjoy Chess Master Pro! ♟️**