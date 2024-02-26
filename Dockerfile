
FROM node:20.11.1-alpine

COPY . /app
WORKDIR /app

RUN npm install
CMD ["npm", "run", "start"]
