const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

const TARGET_FOLDER_PATH = path.resolve("./publish");
const SAVE_DIR_FILES = [".git", "README.md"]

const cleanFun = (rootPath) => {
    if (fs.existsSync(rootPath) == false) {
        return
    }
    let list = fs.readdirSync(rootPath)
    list.forEach(item => {
        if (SAVE_DIR_FILES.indexOf(item) != -1) {
            return
        }
        let path = rootPath + "/" + item;
        if (fs.lstatSync(path).isDirectory()) {
            fse.removeSync(path)
        } else {
            fs.unlinkSync(path);
        }
    })
}

cleanFun(TARGET_FOLDER_PATH)