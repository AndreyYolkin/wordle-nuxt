# Wordle Nuxt

Проект для воршопа

Проект разбит по веткам:
- `1-step` - базовая версия игры
- `2-step` - версия с базовым API
- `3-step` - версия с базой данных
- `3.5-step` - версия с базой данных и аутентификацией
- `4-step` - версия с базой данных, аутентификацией и рейтингом

## Установка и подготовка

Не забудьте скопировать файл `.env.example` в `.env` и заполнить его своими значениями.

Github OAuth - https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app
Nuxt Auth - https://github.com/atinux/nuxt-auth-utils#quick-setup

```bash
npm install

npm run db:migrate
```

## Запуск

```bash
npm run dev
```

## Сборка

```bash
npm run build

# Собрать только серверную часть
npm run build:server

# Собрать только клиентскую часть
npm run build:client
```