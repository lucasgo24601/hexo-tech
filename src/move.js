const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

const SOURCE_FOLDER_PATH = path.resolve("./public");
const TARGET_FOLDER_PATH = path.resolve("./publish");
const SAVE_DIR_FILES = [".git", "README.md"]

const cleanFun = (rootPath) => {
    if (fs.existsSync(rootPath) == false) {
        console.log("null")
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

const moveFun = (source , target) => {
    if (fs.existsSync(source) == false) {
        console.log("move fail")
        return
    }
    let list = fs.readdirSync(source)
    list.forEach((item) => {
        let sourcePath = source + "/" + item
        let targetPath = target + "/" + item
        fse.copySync(sourcePath, targetPath)
    })
}
console.log("===== start clean =====")
cleanFun(TARGET_FOLDER_PATH)
console.log("===== end clean =====")
console.log("===== start move =====")
moveFun(SOURCE_FOLDER_PATH, TARGET_FOLDER_PATH);
cleanFun(SOURCE_FOLDER_PATH)
console.log("===== end move =====")