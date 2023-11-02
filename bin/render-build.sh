#!/usr/bin/env bash
# exit on error
set -o errexit
bundle install --gemfile="Gemfile-3.2.2"
bundle exec rake assets:precompile
bundle exec rake assets:clean
bundle exec rake db:migrate --trace
