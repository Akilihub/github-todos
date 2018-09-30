"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const esprima_extract_comments_1 = require("esprima-extract-comments");
function parseData(data) {
    const extractedFile = esprima_extract_comments_1.extract(data.content);
    return extractedFile.map(function (obj) {
        return {
            commentText: obj.value,
            lineNumber: obj.loc,
            keyWord: obj.value[0],
            fileName: data.name
        };
    });
}
exports.default = parseData;
//# sourceMappingURL=index.js.map