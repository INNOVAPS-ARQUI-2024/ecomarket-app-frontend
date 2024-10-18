# Utiliza la imagen base de Nginx con Alpine
FROM nginx:alpine

# Copia la aplicación Angular compilada en la carpeta de distribución al directorio de Nginx
COPY dist/ecomarket-app-frontend /usr/share/nginx/html

# Expone el puerto 80 para el tráfico HTTP
EXPOSE 80
