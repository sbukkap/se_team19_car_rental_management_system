FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install

COPY .env .

COPY . .

CMD ["npm", "start"]