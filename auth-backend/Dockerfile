FROM node:22-alpine

WORKDIR /auth-backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]