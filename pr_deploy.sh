#!/usr/bin/env bash
if [ “$TRAVIS_PULL_REQUEST” == “false” ]; then
echo “Not a PR. Skipping surge deployment.”
exit 0
fi
npm i -g surge

export SURGE_LOGIN=${SURGE_LOGIN}
export SURGE_TOKEN=${SURGE_TOKEN}
export DEPLOY_DOMAIN=https://postwoman-preview-pr-${TRAVIS_PULL_REQUEST}.surge.sh

surge --project ./dist --domain $DEPLOY_DOMAIN;

export CYPRESS_RUN_RESULT=`CYPRESS_baseUrl="${DEPLOY_DOMAIN}" npx cypress run`

curl  --silent --output /dev/null -H "Authorization: token ${GITHUB_ACCESS_TOKEN}" -X POST \
-d "{\"body\": \"${DEPLOY_DOMAIN}\"}" \
"https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments"

curl  --silent --output /dev/null -H "Authorization: token ${GITHUB_ACCESS_TOKEN}" -X POST \
-d "{\"body\": \"```${CYPRESS_RUN_RESULT}```\"}" \
"https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments"
