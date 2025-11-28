# Genera el compilado
FROM node:22 as build

WORKDIR /app

# Copiar las dependencias
COPY package*.json ./
COPY prisma ./prisma

# Instalar las dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Generar el cliente de prisma para el build
RUN npx prisma generate

# Compilar NESTJS
RUN npm run build

# GENERAR EL SERVIDOR API
FROM node:22

WORKDIR /app

# Instalas solo dependencias de produccion
COPY package*.json ./
RUN npm install --omit-dev

# Copiar el prisma schema
COPY prisma ./prisma

# Copiar el compilado
COPY --from=build /app/dist ./dist

# Generar el cliente en producción
RUN npx prisma generate

EXPOSE 3010

CMD ["node", "dist/src/main.js"]