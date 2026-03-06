# Stage 1: Install dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build the application
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Run the application
FROM node:22-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nuxt && \
    adduser --system --uid 1001 nuxt

COPY --from=builder --chown=nuxt:nuxt /app/.output ./.output

USER nuxt

EXPOSE 3000

ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["node", ".output/server/index.mjs"]
