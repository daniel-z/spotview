#!/bin/bash

# print outputs and exit on first failure
set -xe

if [ $TRAVIS_BRANCH == "master" ] ; then
    # setup ssh agent, git config and remote
    eval "$(ssh-agent -s)"
    ssh-add $KEY_PATH
    ls -l
    git remote add deploy "$DEPLOY_USER@$REMOTE_REPO:$REMOTE_REPO_PATH"
    git config user.name $GIT_USERNAME
    git config user.email $GIT_EMAIL

    # commit compressed files and push it to remote
    rm -f .gitignore
    cp .travis/deployignore .gitignore
    git add build/
    git status # debug
    git commit -m $GIT_COMMIT_MESSAGE
    git push -f deploy HEAD:master
else
    echo "No deploy script for branch '$TRAVIS_BRANCH'"
fi