FROM php:7-apache

WORKDIR /var/www/html/

EXPOSE 443

RUN a2enmod ssl
#RUN openssl req -subj ‘/CN=eu-central-1.compute.amazonaws.com/O=RiPro/C=CH’ -new -newkey rsa:2048 -days 365 -nodes -x509 -keyout /etc/ssl/certs/server.key -out /etc/ssl/certs/server.crt
COPY server.conf /etc/apache2/sites-enabled/
COPY server.key /etc/ssl/certs/
COPY server.crt /etc/ssl/certs/

RUN apt-get update && \
    apt-get install -y --no-install-recommends git zip unzip

RUN groupadd apache && \
    useradd -d /var/www/html -g apache apache && \
    mkdir /var/www/html/quote && \
    mkdir /var/www/html/demonstrator && \
    chown -R apache:apache /var/www/html

#COPY ./*.json /var/www/html/
RUN chown -R apache:apache /var/www/html

#RUN su apache -c "curl --silent --show-error https://getcomposer.org/installer | php" && \
#	su apache -c "php composer.phar install"

#COPY *.ico /var/www/html/
COPY ./quote /var/www/html/quote
COPY ./demonstrator /var/www/html/demonstrator

RUN chown -R apache:apache /var/www/html

