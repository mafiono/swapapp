FROM node:14

#docker-compose up -d --build --force-recreate --no-deps && lazydocker 

RUN apt-get update && apt-get install -yq curl git  g++ python make mc screen nano


ADD https://api.github.com/repos/iceymann18777/CurrencyWallet/git/refs/heads/master version.json
RUN git clone -b master https://github.com/iceymann18777/CurrencyWallet.git /root/CurrencyWallet

WORKDIR /root/CurrencyWallet

RUN npm i

CMD [ "npm", "start" ]

EXPOSE 81

