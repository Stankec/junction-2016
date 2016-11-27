#!/bin/bash

cd /usr/src/app

# ./bin/delayed_job start
# rake db:drop db:create db:migrate
rake db:create db:migrate
whenever --update-crontab
/usr/sbin/service cron start
./bin/rails server -b 0.0.0.0 --pid /tmp/puma.pid
