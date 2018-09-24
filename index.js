/**
 * This is the entry point for your Probot App.
 * @param {import('probot').Application} app - Probot's Application class.
 */
module.exports = app => {
  app.log('Cheers, the app runs on a server!')

  app.on('issues.opened', async context => {
    const issueComment = context.issue({ body: 'Thanks for opening this issue! So you canas well edit and comment on this issue.' })
    return context.github.issues.createComment(issueComment)
  })
}
