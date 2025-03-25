# --------------------------
# Build stage
# --------------------------
  FROM node:18-alpine as build

  WORKDIR /usr/src/app

  RUN apk add --no-cache openssl

  COPY package*.json ./

  RUN npm install

  COPY . .

  COPY src/infrastructure/persistence/database/migrations ./src/infrastructure/persistence/database/migrations

  RUN npm run build
  RUN npx prisma generate --schema src/infrastructure/persistence/database/schema.prisma
  RUN npm prune --production

  # --------------------------
  # Production stage
  # --------------------------
  FROM node:18-alpine

  ENV NODE_ENV production

  WORKDIR /usr/src/app

  RUN apk add --no-cache openssl

  COPY --from=build /usr/src/app/node_modules ./node_modules/
  COPY --from=build /usr/src/app/node_modules/.prisma ./node_modules/.prisma
  COPY --from=build /usr/src/app/dist ./dist/
  COPY --from=build /usr/src/app/package.json ./
  COPY --from=build /usr/src/app/src/infrastructure/persistence/database/schema.prisma ./src/infrastructure/persistence/database/schema.prisma
  COPY --from=build /usr/src/app/src/infrastructure/persistence/database/migrations ./src/infrastructure/persistence/database/migrations

  COPY wait-for-it.sh /usr/local/bin/wait-for-it
  RUN chmod +x /usr/local/bin/wait-for-it


  EXPOSE 3000

  CMD ["npm", "run", "start:prod"]
