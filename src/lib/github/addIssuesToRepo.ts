/**
 * API function that add comments to existing bot created issues or to new issues
 */

import { find, uniq } from "ramda";
import { getBasicRepoProps } from "./utils";

import { Context, Issue } from "./types";
import { getAllRepoIssues } from "./repoIssuesList";

export default async function addIssuesToRepo (context: Context, newIssues: Issue[]): Promise<void> {
  const octokit = context.github;
  const { owner, repo } = getBasicRepoProps (context);
  const ghIssues = await getAllRepoIssues(context);

  newIssues.forEach(async ({title, body, authors}) => {
    const assignees = uniq(authors);

    /**
     * Am up to writing a function that removes checked out or no longer existing issue comments.
     */

    const currentGHIssueComments = find(ghIssueComment => ghIssueComment.comments === body, ghIssues);
    const newGHIssueComments = currentGHIssueComments.comments.includes(" - [x] ") || !(currentGHIssueComments.comments === body) ? replaceCommentArray(currentGHIssueComments.comments, body) : currentGHIssueComments.comments;

    const fields = {
      owner,
      repo,
      body,
      title,
      labels: ["GH-TODO-BOT"],
      assignees,
      ...(currentGHIssueComments ?  {number: currentGHIssueComments.number, comments: newGHIssueComments } : {})
    };

    return currentGHIssueComments
      ? octokit.issues.createComment(fields)
      : octokit.issues.create(fields);
  });

}

function replaceCommentArray(arr1: string[], arr2: any): string[] {
  // TODO: could we find means of using the precise `type` for `arr2` probably `string[]` than `any` without `body` in line (24, 186) showing error?
  return arr1.splice(0, arr1.length - 1, ...arr2);
}