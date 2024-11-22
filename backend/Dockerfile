FROM node:16-alpine
WORKDIR /app

# Copiar package.json primeiro para aproveitar cache do Docker
COPY package*.json ./
RUN npm ci --only=production

# Criar estrutura de diretórios
RUN mkdir -p src/fabric src/database src/routes src/config src/controllers src/models

# Copiar código fonte
COPY src/ ./src/

ENV NODE_ENV production
EXPOSE 4000
CMD ["node", "src/index.js"]