FROM node:18

WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# ❌ УДАЛИ: COPY . . — он больше не нужен!

# Установим nodemon глобально для авто-перезагрузки
RUN npm install -g nodemon

# Порт (для информации)
EXPOSE 8080

# Запускаем сервер в режиме разработки
CMD ["nodemon", "index.js"]