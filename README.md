# Саше посмотреть

Список фильмов по категориям. Статусы общие для всех, кто открыл ссылку.

## Локально

Нужен Node 20+.

```bash
npm install
npm run dev
```

## Добавить фильм

Правьте `src/data/films.ts`. У каждого фильма должен быть уникальный `id` латиницей — по нему Firebase помнит статус. После правки задеплойте сайт.

## Правила Firestore

В Firebase Console: **Databases & Storage → Cloud Firestore → Rules**. Вставьте содержимое `firestore.rules` и нажмите **Publish**. Иначе через 30 дней test mode закроет доступ.

## Выложить на GitHub Pages

1. Создайте репозиторий и запушьте код в ветку `main`.
2. GitHub → **Settings → Pages → Source: GitHub Actions**.
3. После пуша сайт появится по адресу `https://<логин>.github.io/<репозиторий>/`.
