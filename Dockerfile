FROM node:14-slim

#docker-compose up -d --build --force-recreate --no-deps && lazydocker 

RUN apt-get update && apt-get install -yq curl git  g++ python make mc screen nano


ADD https://api.github.com/repos/mafiono/swapapp/git/refs/heads/master version.json
RUN git clone -b master https://github.com/mafiono/swapapp.git /root/swapapp

WORKDIR /root/swapapp

RUN npm i

CMD [ "npm", "start" ]

EXPOSE 80
