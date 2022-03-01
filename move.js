const fs = require('fs');
const fse = require('fs-extra');

const SOURCE_FOLDER_PATH = "./public";
const TARGET_FOLDER_PATH = "./publish";
const SAVE_DIR_FILES = [".git", "README.md"]

const cleanFun = (rootPath) => {
    let list = fs.readdirSync(rootPath)
    list.forEach(item => {
        if (SAVE_DIR_FILES.indexOf(item) != -1) {
            return
        }
        let path = rootPath + "/" + item;
        if (fs.lstatSync(path).isDirectory()) {
            fse.removeSync(path)
        } else {
            fs.rmSync(path);
        }
    })
}

const moveFun = () => {
    let list = fs.readdirSync(SOURCE_FOLDER_PATH)
    list.forEach((item) => {
        let sourcePath = SOURCE_FOLDER_PATH + "/" + item
        let targetPath = TARGET_FOLDER_PATH + "/" + item
        fse.copySync(sourcePath, targetPath)
    })
}
console.log("===== start clean =====")
cleanFun(TARGET_FOLDER_PATH)
console.log("===== end clean =====")
console.log("===== start move =====")
moveFun()
cleanFun(SOURCE_FOLDER_PATH)
console.log("===== end move =====")