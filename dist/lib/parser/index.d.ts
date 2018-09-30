declare type KeyWord = "TODO" | "FIXME";
interface repoIssues {
    commentText: string;
    lineNumber: number;
    keyWord: KeyWord;
    fileName: string;
}
declare function parseData(data: any): repoIssues[];
export default parseData;
