/**
 * extracts a list of open issues created by the app
 */

export interface openIssues {
    title: string; // issue title
    id: string; // issue id
};

export default async function autoCreatedIssues (context: any): Promise<openIssues> {
    const octokit = context.github;
    const opts = {
      filter: 'subscribed', 
      state: 'open'
    }
    const result = await octokit.issues.getAll(opts);
    return result.files.map(file => ( {name: file.title, url: file.number} ));
}