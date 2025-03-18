# Étape 1 : Construire l'application Angular
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Étape 2 : Servir avec Nginx
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Supprimer les fichiers par défaut de Nginx
RUN rm -rf ./*

# Copier les fichiers générés par Angular dans Nginx
COPY --from=build /app/dist/guardian/browser /usr/share/nginx/html

# Ajouter une configuration personnalisée Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
