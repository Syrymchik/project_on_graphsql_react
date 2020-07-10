FROM node:12.17

LABEL maintainer="Syrym Stamkulov <stamkulovsyr@gmail.com>"

WORKDIR /usr/src/app/graphqlApp

COPY package.json /usr/src/app/graphqlApp/

RUN npm install

COPY server/* /usr/src/graphqlApp/server/

EXPOSE 3005

CMD npm run dev
