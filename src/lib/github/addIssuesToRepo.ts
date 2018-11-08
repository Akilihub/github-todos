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
    const newGHIssueComments = currentGHIssue.comments.includes("- [x]") || !(currentGHIssue.comments === body)
     ? newIssueBody(currentGHIssue.comments, body)
     : currentGHIssue.comments;

    const fields = {
      owner,
      repo,
      newGHIssueComments,
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

function newIssueBody(currentIssueBody: string[], newIssueBody: any): string[] {
  // TODO: could we find means of using the precise `type` for `arr2` probably `string[]` than `any` ?
  return currentIssueBody.splice(0, currentIssueBody.length - 1, ...newIssueBody);
}
