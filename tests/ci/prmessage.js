const cypress = require('cypress')
const axios = require('axios');
const DEPLOY_DOMAIN = `https://postwoman-preview-pr-${process.env.TRAVIS_PULL_REQUEST}.surge.sh`
const GITHUBAPI = `https://api.github.com/repos/${process.env.TRAVIS_REPO_SLUG}/issues/${process.env.TRAVIS_PULL_REQUEST}/comments`

function niceMessage (result) {
  if (typeof(result) !== 'object') throw new Error('Result of e2e testing must be a Object')
  return {
    "body": `
e2e testing results at: ${result.config.baseUrl}
| Decription    | Results                     |
| :-------------- | ------------------------: |
| Test duration   | ${result.totalDuration}   |
| Total tests     | ${result.totalTests}      |
| Failed          | ${result.totalFailed}     |
| Passed          | ${result.totalPassed}     |
| Pending         | ${result.totalPending}    |
| Skipped         | ${result.totalSkipped}    |
    `
  }
}

function e2e (testUrl, messageBuilder) {
  cypress.run({
    config: {
      baseUrl: testUrl,
      video: false
    }
  })
  .then((result) => {
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      }, 
      data: messageBuilder(result)
    }
    axios.post(GITHUBAPI, config)
    .then(githubRes =>  console.log(`Message sent: /n ${githubRes}`))
    .catch(githubErr => console.error(`Failed to send message: /n ${githubErr}`))
  })
  .catch((err) =>console.error(`Failed to run tests: /n${err}`))
}

e2e(DEPLOY_DOMAIN, niceMessage)
