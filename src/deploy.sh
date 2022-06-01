echo "==================== initializing"
git submodule update --init -f
node ./src/clean.js
hexo clean
echo "==================== build"
hexo deploy
node ./src/move.js
hexo clean
echo "==================== deploy"
git add .
git commit -m "deploy"
git push -f