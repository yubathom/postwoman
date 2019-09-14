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

node ./tests/e2e/pr_messages/message

# curl  -X POST \
#   --silent \
#   --output /dev/null \
#   -H "Authorization: token ${GITHUB_ACCESS_TOKEN}" \
#   -d "{\"body\": \"${DEPLOY_DOMAIN}\"}" "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments"

# CYPRESS_RUN_RESULT=$(CYPRESS_baseUrl="${DEPLOY_DOMAIN}" npx cypress run)

# tag_code="<code>"
# message_body=${tag_code}${CYPRESS_RUN_RESULT}
# body_template=./tests/e2e/pr_messages/template.json
# body_output=./tests/e2e/pr_messages/output.json

# jq \
#   --arg body "$message_body" \
#   '.["body"]=$body' \
#   <$body_template > $body_output

# curl -X POST \
#   -H "Authorization: token ${GITHUB_ACCESS_TOKEN}" \
#   -H 'Content-Type: application/json; charset=utf-8' \
#   -d @$body_output "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments"

