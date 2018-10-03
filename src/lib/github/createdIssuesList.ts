/**
 * extracts a list of open issues created by the app
 */

export interface OpenIssues {
    title: string; // issue title
    id: string; // issue id
}

export default async function appCreatedIssues (context: any): Promise<OpenIssues[]> {
    const octokit = context.github;

    const opts = {
      filter: "subscribed",
      state: "open"
    };

    const result = await octokit.issues.getAll(opts);
    return result.issues.map(issue => {
        return {
            title: issue.title,
            id: issue.number
        };
    });
}