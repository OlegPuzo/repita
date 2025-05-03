FROM node:14-alpine

WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package.json .
RUN npm install

# Копируем исходный код
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
