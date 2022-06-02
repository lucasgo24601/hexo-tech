echo "================================================= initializing"
git submodule update --init -f
cd publish
git checkout master
cd ..
node ./src/clean.js
hexo clean
echo "================================================= deploy"
hexo deploy
node ./src/fixPath.js
node ./src/move.js
hexo clean