# Приложение для управления учетными записями

## Описание
Это веб-приложение для управления учетными записями пользователей, разработанное с использованием Vue 3, TypeScript и Vite. Приложение позволяет создавать, редактировать и удалять учетные записи пользователей с сохранением данных в локальном хранилище.

## Используемые технологии
- **Vue 3** - прогрессивный JavaScript фреймворк
- **TypeScript** - типизированный JavaScript для лучшей разработки
- **Vite** - современный сборщик и сервер разработки
- **Pinia** - хранилище состояний для Vue приложений
- **Tailwind CSS** - утилитарный CSS фреймворк

## Функциональность
- Создание новых учетных записей пользователей
- Отображение списка существующих учетных записей
- Редактирование информации учетных записей
- Удаление учетных записей
- Сохранение данных в локальном хранилище браузера

## Структура проекта
```
/src
  /components
    - AccountForm.vue - Форма для создания/редактирования учетных записей
    - AccountItem.vue - Компонент для отображения учетной записи в списке
  /stores
    - accountStore.ts - Хранилище Pinia для управления данными
  /types
    - account.ts - TypeScript типы для учетных записей
  - App.vue - Корневой компонент приложения
  - main.ts - Точка входа приложения
```

## Установка и запуск

1. Установите зависимости:
```bash
npm install
```

2. Запуск сервера разработки:
```bash
npm run dev
```

3. Сборка для продакшена:
```bash
npm run build
```

## Примечания
- Приложение использует локальное хранилище браузера для сохранения данных
- Поддерживает валидацию данных ввода
- Имеет адаптивный дизайн для мобильных и настольных устройств

## Автор
**Abeeb Abiola Adeniyi**

---

© 2025 Все права защищены
