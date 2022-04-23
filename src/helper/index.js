const path = require("path");
const fs = require("fs");

const root = path.dirname("../", require.main.filename);
const dirPath = path.join(root, "public", "assets");

const getImageFromFolder = (dirPath)=>{
    const files = fs.readdirSync(dirPath);
    return files;
}

module.exports = {dirPath, getImageFromFolder}