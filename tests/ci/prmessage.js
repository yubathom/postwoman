const fs = require('fs')
const cypress = require('cypress')
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

function e2e (testUrl, messageBuilder) {
  cypress.run({
    config: {
      baseUrl: testUrl,
      video: false
    }
  })
  .then((result) => {
    const content = messageBuilder(result)
    fs.writeFileSync('./tests/ci/body_template.json', JSON.stringify(content))
  })
  .catch((err) =>console.error(`Failed to run tests: /n${err}`))
}

e2e(DEPLOY_DOMAIN, niceMessage)
