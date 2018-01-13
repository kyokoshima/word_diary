FROM node:6

ENV APP_HOME /client
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

COPY . $APP_HOME

RUN npm install create-react-app
RUN npm install

