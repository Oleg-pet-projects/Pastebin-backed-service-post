FROM node:18.18.0

WORKDIR /app/

COPY ./dist ./dist/

COPY ./prisma ./prisma/

COPY .env ./

COPY package.json ./

RUN npm i 

CMD ["npm", "run", "serve"]
