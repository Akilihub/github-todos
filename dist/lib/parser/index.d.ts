declare type KeyWord = "TODO" | "FIXME";
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
declare function parseData(data: GithuBlob): RepoIssues[];
export default parseData;
