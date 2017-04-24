#!/bin/sh
echo "UPDATE STARTING AT: $(date)"

git reset --hard
git clean -fd
git fetch --tags --prune
git pull

npm install
npm prune
npm update
npm run build:prod
pm2 delete 'framework'
port=9191 pm2 start --name 'framework' npm -- run serve

echo "UPDATE FINISHED AT: $(date)"
