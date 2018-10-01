"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const esprima_extract_comments_1 = __importDefault(require("esprima-extract-comments"));
const keyWords = ["TODO", "FIXME"];
const findWord = (str) => {
    const wordArr = keyWords.filter(word => str.includes(word));
    return (wordArr) ? wordArr[0] : null;
};
function parseData(data) {
    const extractedFile = esprima_extract_comments_1.default(data.content);
    console.log(extractedFile);
    return extractedFile
        .map((obj) => ({
        commentText: obj.value.replace("TODO:", " "),
        lineNumber: obj.loc,
        keyWord: findWord(obj.value),
        fileName: data.name
    }))
        .filter(obj => keyWords.includes(obj.keyWord));
}
exports.default = parseData;
//# sourceMappingURL=index.js.map