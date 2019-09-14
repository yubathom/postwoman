const cypress = require('cypress')
const axios = require('axios');
const DEPLOY_DOMAIN = `https://postwoman-preview-pr-${process.env.TRAVIS_PULL_REQUEST}.surge.sh`

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

function e2e (url, messageBuilder) {
  cypress.run({
    config: {
      baseUrl: url,
      video: false
    }
  })
  .then((result) => {
    const config = {
      baseUrl: `https://api.github.com/repos/${process.env.TRAVIS_REPO_SLUG}/issues/${process.env.TRAVIS_PULL_REQUEST}/comments`,
      headers: {
        'Authorization': `token ${process.env.GITHUB_ACCESS_TOKEN}`
      }, 
      data: messageBuilder(result)
    }
    axios.post(config)
    .then(res => {
      console.log(`Message sent:
        ${res}
      `)
    })
    .catch(err => console.error(`Failed to send message:
      ${err}
    `))
  })
  .catch((err) => {
    console.error(`Failed to run tests:
      ${err}
    `)
  })
}

e2e(DEPLOY_DOMAIN, niceMessage)
