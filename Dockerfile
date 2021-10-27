FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm i bcrypt

RUN npm i jsonwebtoken

COPY . .

EXPOSE 3000:3000

CMD ["npm", "start"]
