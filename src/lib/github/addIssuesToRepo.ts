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

    /**
     * Am up to writing a function that removes no longer existing issue comments, so i want to replace the whole comments
     * array of the current issue for the new issue, such that when `currentGHIssue`, is returned, the issue comment to
     * exist is that of the new issue i.e `newGHIssueComments`
     */
    const currentGHIssueComments = find(ghIssueComment => ghIssueComment.comments === body, ghIssues);
    const newGHIssueComments = replaceArray(currentGHIssueComments.comments, body);

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

function replaceArray(arr1: string[], arr2: any): string[] {
  // TODO: could we find means of using the precise `type` for `arr2` probably `string[]` than `any` without type errors ?
  return arr1.splice(0, arr1.length - 1, ...arr2);
}