#!/usr/bin/env bash
if [ “$TRAVIS_PULL_REQUEST” == “false” ]; then
echo “Not a PR. Skipping surge deployment.”
else
  npm i -g surge

  SURGE_LOGIN=${SURGE_LOGIN}
  SURGE_TOKEN=${SURGE_TOKEN}
  DEPLOY_DOMAIN=https://postwoman-preview-pr-${TRAVIS_PULL_REQUEST}.surge.sh

  surge --project ./dist --domain $DEPLOY_DOMAIN;

  node ./tests/ci/prmessage
exit 0
fi
