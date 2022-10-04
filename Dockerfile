FROM node:14 as base

WORKDIR /src
COPY package*.json .
EXPOSE 8081

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . .
CMD ["node", "api"]

FROM base as development
ENV NODE_ENV=development
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
