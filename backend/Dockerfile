# Берем образ 
from node:alpine

# ENTRYPOINT ["tail", "-f", "/dev/null"]

# Выбираем рабочую папку
WORKDIR /usr/src/app

# копируем в рабочую папку все содержимое нашей папки за ислючением того что прописано в .dockerignore 
COPY . .

# Устанавливаем пакеты
RUN npm install


RUN npm run prisma

# Билдим проект из TS в JS
RUN npm run build


# Устанавливаем недостающие библиотеки
# RUN apk update && apk upgrade && apk add libssl1.1 

CMD [ "npm", "run", "start:prod" ]
