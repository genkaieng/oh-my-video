FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /home/pptruser/app

COPY package.json tsconfig.json .
RUN npm install

COPY src ./src
RUN npm run build

ENTRYPOINT ["npm", "run"]

CMD ["start"]
