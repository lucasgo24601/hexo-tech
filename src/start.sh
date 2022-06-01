echo "================================================= initializing"
git submodule update --init -f
node ./src/clean.js
hexo clean
echo "================================================= deploy"
hexo deploy
node ./src/move.js
hexo clean