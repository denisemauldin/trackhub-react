#!/usr/bin/env bash

export PATH="$PATH:$HOME/.nvm/versions/node/v10.1.0/bin"
APP_PATH="/var/www/trackhub"

mkdir $APP_PATH/logs
(cd $APP_PATH && npm install)
(cd $APP_PATH && npm run build-dev)
