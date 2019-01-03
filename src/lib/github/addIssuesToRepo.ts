/**
 * API function that add comments to existing bot created issues or to new issues
 */
import { find } from "ramda";
import { getBasicRepoProps } from "./utils";

import { Context, Issue } from "./types";
import { getAllRepoIssues } from "./repoIssuesList";

export const labels: String[] = ["GH-TODO-BOT"];

export default async function addIssuesToRepo (context: Context, newIssues: Issue[]): Promise<void> {
  const octokit = context.github;
  const { owner, repo } = getBasicRepoProps (context);
  const ghIssues = await getAllRepoIssues(context);
  newIssues.forEach(async ({title, body }) => {
    // const assignees = uniq(authors);
    const currentGHIssue = find(ghIssue => ghIssue.title === title, ghIssues);
    const fields = {
      owner,
      repo,
      body,
      title,
      labels,
      ...(currentGHIssue ? { number: currentGHIssue.number } : {})
    };
    return currentGHIssue
      ? octokit.issues.createComment(fields)
      : octokit.issues.create(fields);
  });

}
