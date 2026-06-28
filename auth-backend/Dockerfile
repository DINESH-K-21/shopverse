FROM node:22

WORKDIR /auth-backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]