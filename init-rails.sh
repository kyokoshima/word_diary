#!/bin/sh
echo "command bundle install"
bundle install

echo "command rails db:create db:migrate"
rails db:create db:migrate

echo "command bundle exec rails s -p 3000 -b '0.0.0.0"
bundle exec rails s -p 3000 -b '0.0.0.0'
