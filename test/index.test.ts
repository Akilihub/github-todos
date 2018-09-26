import { Application } from 'probot'
// Requiring our app implementation
import   myProbotApp  from '..'

// const repoCreatedPayload = require('./fixtures/repos.created.json')

import { } from 'jest'

describe('My Probot app', () => {
  let app, github

  beforeEach(() => {
    app = new Application()
    // Initialize the app based on the code from index.js
    app.load(myProbotApp)
    // This is an easy way to mock out the GitHub API
    github = {
      issues: {
        createComment: jest.fn().mockReturnValue(Promise.resolve({}))
      }
    }
    // Passes the mocked out GitHub API into out app instance
    app.auth = () => Promise.resolve(github)
  })


  // test('creates an issue when code is pushed to a repository', async () => {
  //   // Simulates delivery of an issues.opened webhook
  //   await app.receive({
  //     name: 'push',
  //     payload: repoCreatedPayload
  //   })

  //   // This test passes if the code in your index.js file calls `context.github.issues.createComment`
  //   expect(github.issues.createComment).toHaveBeenCalled()
  // })
})
