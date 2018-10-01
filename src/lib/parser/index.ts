/**
 * uses an AST parser to analyse commits
 * currently supports ts and js files
 */
import extract from "esprima-extract-comments";


type KeyWord = "TODO"  | "FIXME";

const keyWords: KeyWord[] = ["TODO", "FIXME"];

interface RepoIssues {
   commentText: string;
   lineNumber: number;
   keyWord: KeyWord;
   fileName: string;
}

interface GithuBlob {
    type: string;
    content: string;
    path: string;
    name: string;
}

interface ExtractedBlob {
    type: string;
    value: string;
    range: number[];
    loc: any;
}

const findWord = (str: string): KeyWord | null => {
  const wordArr = keyWords.filter(word => str.includes(word));
  return wordArr ?  wordArr[0] : null;
};

function parseData (data: GithuBlob): RepoIssues[] {
    const extractedFile: ExtractedBlob[] = extract(data.content);
    return extractedFile
    .map( (obj: ExtractedBlob) => ({
        commentText: obj.value.replace("TODO:", " "),
        lineNumber: obj.loc,
        keyWord: findWord(obj.value) as KeyWord,
        fileName: data.name
    }))
    .filter(obj => keyWords.includes(obj.keyWord));
}

export default parseData;
