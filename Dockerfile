FROM node:12.17

LABEL maintainer="Syrym Stamkulov <stamkulovsyr@gmail.com>"

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 3000
#CMD [ "npm", "run", "server" ]

#CMD npm run dev
CMD npm run start
