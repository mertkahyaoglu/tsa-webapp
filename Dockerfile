FROM ubuntu:14.04

MAINTAINER Mert Kahyaoğlu <mertkahyaoglu93@gmail.com>

RUN apt-get update

RUN apt-get install -y nodejs npm

COPY ./ /var/www/twitter-sentiment-analysis

RUN npm install

EXPOSE 8080

CMD ["node", "server.js"]
