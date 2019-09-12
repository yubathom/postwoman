#!/usr/bin/env bash
if [ “$TRAVIS_PULL_REQUEST” == “false” ]; then
echo “Not a PR. Skipping surge deployment.”
exit 0
fi
npm i -g surge

SURGE_LOGIN=${SURGE_LOGIN}
SURGE_TOKEN=${SURGE_TOKEN}
DEPLOY_DOMAIN=https://postwoman-preview-pr-${TRAVIS_PULL_REQUEST}.surge.sh

surge --project ./dist --domain $DEPLOY_DOMAIN;

curl  -X POST \
  --silent \
  --output /dev/null \
  -H "Authorization: token ${GITHUB_ACCESS_TOKEN}" \
  -d "{\"body\": \"${DEPLOY_DOMAIN}\"}" "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments"

CYPRESS_RUN_RESULT=$(CYPRESS_baseUrl="${DEPLOY_DOMAIN}" npx cypress run)
CYPRESS_RUN_RESULT=${CYPRESS_RUN_RESULT%$'\r'}

curl -X POST \
  --silent \
  --output /dev/null \
  -H "Authorization: token ${GITHUB_ACCESS_TOKEN}" \
  -d -e '{"body":"'"$CYPRESS_RUN_RESULT"'"}' "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments"

echo -e $CYPRESS_RUN_RESULT
