# Usa una imagen base de Node.js con la versión LTS (Long Term Support)
FROM node:22.12.0-alpine3.19 as build-stage

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración del proyecto
COPY package.json yarn.lock ./

# Instala las dependencias del proyecto usando Yarn
RUN yarn install

# Copia el resto de los archivos del proyecto
COPY . .

# Compila la aplicación para producción
RUN yarn build

# Usa una imagen ligera de Nginx para servir la aplicación
FROM nginx:stable-alpine as production-stage

# Copia los archivos compilados desde la etapa de construcción
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expone el puerto 80 (puerto predeterminado de Nginx)
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]