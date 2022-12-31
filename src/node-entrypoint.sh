#!/bin/bash

[ ! -d /var/www/node_modules ] && npm install;

npm install && node main.js
