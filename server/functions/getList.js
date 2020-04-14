const fs = require('fs-extra')

const path = require('path');

const frontMatter = require('front-matter')

const defaultOptions = {
    withContent: false
};

const searchPath = path.join(__dirname,'../blog')

const host = require('../config').host

function getList(opts = defaultOptions){
    let fileContentList = [];

    const fileList = fs.readdirSync(searchPath);
    const mdType = /\.md$/;

    for (let i = 0; i < fileList.length; i += 1) {

        if(mdType.test(fileList[i])) {
            const fileContent = fs.readFileSync(path.join(searchPath, fileList[i]));
            let fileParseContent = frontMatter(fileContent.toString());
            console.log('fileParseContent:', fileParseContent);
            if(!opts.withContent) delete fileParseContent.body;
            else {
                fileParseContent.body = fileParseContent.body.replace(/\!\[(.*?)\]\((\.\/)?resources\//g,"![$1](" + host + "/resources/")
            }
            // 和之前的版本进行兼容：
            fileContentList.push({
                title: fileParseContent.attributes.title,
                tags: fileParseContent.attributes.tags,
                date: fileParseContent.attributes.date,
                _content: fileParseContent.body,
                pathName: fileList[i]
            })
        }
    }

    return fileContentList;
}

function getCertain(pathName){

    if(!pathName) return {};

    let fileContent = fs.readFileSync(path.join(searchPath, pathName));
    // 对 md 文件引用的图片路径进行替换
    fileContent = fileContent.toString().replace(/\!\[(.*?)\]\((\.\/)?imgs\//g,"![$1](" + host + "/")
    let fileParseContent = frontMatter(fileContent);

    return {
        title: fileParseContent.attributes.title,
        tags: fileParseContent.attributes.tags,
        date: fileParseContent.attributes.date,
        _content: fileParseContent.body,
        pathName: pathName
    };
}

module.exports = {
    getList,
    getCertain
};

// console.log(getList());
