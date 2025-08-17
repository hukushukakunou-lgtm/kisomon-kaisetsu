FROM php:8.1-apache

WORKDIR /var/www/html
COPY . /var/www/html/

# アプリはコンテナ内で 80 番を使う想定
EXPOSE 80

CMD ["apache2-foreground"]
