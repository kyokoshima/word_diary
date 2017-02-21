FROM ruby:2.4.0
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN apt-get install -y imagemagick libmagickwand-dev
RUN apt-get install -y npm

ENV APP_HOME /word_diary
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD Gemfile /word_diary/Gemfile
ADD Gemfile.lock /word_diary/Gemfile.lock
ENV BUNDLE_GEMFILE=$APP_HOME/Gemfile \
                     BUNDLE_JOBS=8 \
                       BUNDLE_PATH=/bundle
RUN bundle install
ADD . /word_diary
