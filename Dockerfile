# Utiliza la imagen base de Nginx con Alpine
FROM nginx:alpine

# Copia la aplicación Angular compilada en la carpeta de distribución al directorio de Nginx
COPY dist/ecomarket-app-frontend /usr/share/nginx/html

# Copia el archivo de configuración de Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80 para el tráfico HTTP
EXPOSE 80
