
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

const FILE_PATH = path.resolve("./public/service-worker.js");

const fixPath = (filePath) =>{
    if (fs.existsSync(filePath) == false) {
        console.log("null")
        return
    }

    let text = fs.readFileSync(filePath , {encoding: 'utf8'});
    text = text.replace(/blog-tech/g, 'blog-tech/');
    fs.writeFileSync(filePath, text);
}

console.log("===== start fix path =====")
fixPath(FILE_PATH)
console.log("===== end fix path =====")
