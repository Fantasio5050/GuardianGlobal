# Étape 1 : Construction de l'application Angular
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod


FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/guardian /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
