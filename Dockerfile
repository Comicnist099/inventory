FROM node:18 AS build

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN npx prisma generate --schema=prisma/schema.prisma

EXPOSE 3000

CMD ["sh", "-c", "pnpm prisma migrate deploy && pnpm run start"]

