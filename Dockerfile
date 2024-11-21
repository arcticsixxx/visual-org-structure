FROM node:21-alpine

WORKDIR /app

COPY package.json .

RUN npm install --save

COPY . .

EXPOSE 3000

CMD ["npm", "start"]