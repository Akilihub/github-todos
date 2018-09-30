/**
 * uses an AST parser to analyse commits
 * currently supports ts and js files
 */
import extract from "esprima-extract-comments";

type KeyWord = "TODO"  | "FIXME";

interface RepoIssues {
   commentText: string;
   lineNumber: number;
   keyWord: KeyWord;
   fileName: string;
}

function parseData (data: any): RepoIssues[] {
    const extractedFile: any[] = extract(data.content);
    console.log(extractedFile);
    return extractedFile.map( function(obj) {
        return {
            commentText: obj.value,
            lineNumber: obj.loc,
            keyWord: obj.value.split(" ")[0],
            fileName: data.name
        };
    });
}

export default parseData;
