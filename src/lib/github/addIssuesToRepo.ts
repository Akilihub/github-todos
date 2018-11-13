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

    const currentGHIssue = find(ghIssue => ghIssue.title === title, ghIssues);
    const currentCommentBody = stringifyCommentsArray(currentGHIssue.comments);
    const newGHIssueComments = !(currentCommentBody === body)
     ? newIssueBody(currentCommentBody, body)
     : currentCommentBody;

    const fields = {
      owner,
      repo,
      body: newGHIssueComments,
      title,
      labels: ["GH-TODO-BOT"],
      assignees,
      ...(currentGHIssue ? { number: currentGHIssue.number } : {})
    };

    return currentGHIssue
      ? octokit.issues.createComment(fields)
      : octokit.issues.create(fields);
  });

}

function stringifyCommentsArray (commentsArray: string[]): string {
  return commentsArray.join("\n");
}

function newIssueBody(currentIssueBody: string, newIssueBody: string): string {
  const regex = /currentIssueBody/gi;
  return currentIssueBody.replace(regex, newIssueBody);
}
