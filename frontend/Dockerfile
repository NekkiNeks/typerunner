# Шаг 1: Создаем контейнер Node JS
FROM node:16-alpine as build

# Выбираем рабочую папку в контейнере
WORKDIR /usr/local/app

# копируем в рабочую папку все содержимое нашей папки за ислючением того что прописано в .dockerignore 
COPY . .

# Выполняем команду чтобы установить модули в контейнере (нужнео только если их там нет)
RUN npm install

# Получаем аргументы из docker-compose
ARG VITE_BACKEND_ADDRESS

# Билдим приложение
RUN npm run build

# Шаг 2: Создаем контейнер nginx

# Берем последнюю версию образа nginx
FROM nginx:alpine

# Копируем сбилженный ранее проект в папку nginx'а
COPY --from=build /usr/local/app/dist /usr/share/nginx/html 

# Копируем файл конфигурации nginx (Должен находиться в папке)
COPY nginx.conf /etc/nginx/nginx.conf

# Открываем порт (на котором работает nginx)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]