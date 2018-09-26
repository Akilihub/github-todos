/**
 * This is the entry point for your Probot App.
 * @param {import('probot').Application} app - Probot's Application class.
 */
module.exports = app => {
  app.log('Cheers, the app runs on a server!')

  app.on('push', async context => {
    const postIssue = context.issue({body: 'Thanks for opening a repository in this account.'})
    return context.github.issues.createComment(postIssue)
  })

  app.on('issues.opened', async context => {
    const issueComment = context.issue({ body: 'Thanks for opening this issue! So you can as well edit and comment on this issue.' })
    return context.github.issues.createComment(issueComment)
  })
}
