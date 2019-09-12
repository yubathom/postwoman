#!/usr/bin/env bash
if [ “$TRAVIS_PULL_REQUEST” == “false” ]; then
echo “Not a PR. Skipping surge deployment.”
exit 0
fi
npm i -g surge

export SURGE_LOGIN=${SURGE_LOGIN}
export SURGE_TOKEN=${SURGE_TOKEN}
export DEPLOY_DOMAIN=https://postwoman-pr-${TRAVIS_PULL_REQUEST}.surge.sh

surge --project ./dist --domain $DEPLOY_DOMAIN;

curl -H "Authorization: token ${GITHUB_ACCESS_TOKEN}" -X POST \
-d "{\"body\": \"Pull request preview deployed at:\\n${$DEPLOY_DOMAIN}\"}"\
"https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments"