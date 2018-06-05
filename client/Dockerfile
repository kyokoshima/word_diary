FROM node:6

ENV APP_HOME /client
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

COPY package.json package.json

RUN npm install create-react-app
RUN npm install

COPY . $APP_HOME
