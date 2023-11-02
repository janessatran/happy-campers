#!/usr/bin/env bash
# exit on error
set -o errexit
gem update --system
bundle install
bundle exec rake assets:precompile
bundle exec rake assets:clean
bundle exec rake db:migrate --trace
