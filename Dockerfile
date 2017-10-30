FROM ruby:2.4.0
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev
RUN apt-get install -y imagemagick libmagickwand-dev

RUN apt-get install -y nodejs npm
RUN gem update bundler rake
RUN bundle install
RUN npm cache clean
RUN npm install n -g
RUN n stable
RUN ln -sf /usr/local/bin/node /usr/bin/node
RUN npm install -g yarn

ENV APP_HOME /word_diary
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock

ENV BUNDLE_GEMFILE=$APP_HOME/Gemfile \
                     BUNDLE_JOBS=8 \
                       BUNDLE_PATH=/bundle
RUN bundle install
ADD . $APP_HOME
