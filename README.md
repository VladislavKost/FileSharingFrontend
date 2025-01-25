# Описание проекта

Проект по созданию сервиса для обмена файлами. 
Сервис состоит из следующих страниц:
- Страница авторизации
- Страница регистрации
- Страница профиля пользователя
- Страница со списком своих файлов
- Страница со списком всех файлов (для администратора)
- Страница со списком пользователей (для администратора)

Структура проекта следующая:
1. Запросы на сервер отправляются через axios. Настройки axios находятся в файле `src/api.instance.js`. Url сервера подтягивается из .env файла. В папке api также находятся файлы с запросами на сервер и endpoints.
2. В папке store находятся файлы с хранилищем (state). Для хранения состояний используется Redux Toolkit. Для авторизации, файлов и пользователей используются разные хранилища.
3. В папке components находятся компоненты. В папке layouts находятся компоненты, которые используются на всех страницах.
4. В папке pages находятся компоненты, которые используются на отдельных страницах. Данные компоненты формируются с использование компонентов из папки components
5. Приватные роуты обернуты в компонент `PrivateRoute` из папки hocs.
6. Проверка авторизации пользователя проверяется запросом на сервер. Если refresh токен не валидный, то пользователь перенаправляется на страницу авторизации.

## Запуск проекта в docker контейнере
1. Находясь внутри папки проекта выполнить команду ```docker build -t file-sharing .```
2. После сборки контейнера выполнить команду ```docker run -p 3000:80 -d file-sharing```