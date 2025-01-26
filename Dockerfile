FROM node:alpine AS development

# Define non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

WORKDIR /usr/src/app

COPY package*.json .

COPY tsconfig.json .

RUN chown -R nodejs:nodejs /usr/src/app

RUN npm ci

COPY . .

RUN npm run build

FROM node:alpine AS production

ARG NODE_ENV=production

ENV NODE_ENV=$NODE_ENV

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci --only=production

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/index.js"]