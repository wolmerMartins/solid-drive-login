FROM node:14.0.0-stretch

ENV NODE_ENV=development

EXPOSE 3000

WORKDIR /app

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

RUN npm install \
    && mv node_modules ../

RUN useradd -g 1000 -u 1001 solid \
    && chown -R solid /app

USER solid

COPY . /app

CMD ["npm", "start"]
