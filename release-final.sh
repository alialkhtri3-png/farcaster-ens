#!/data/data/com.termux/files/usr/bin/bash

set -e

echo "🚀 SIP SDK Auto Release"

cd sdk

NEW_VERSION=$(npm version patch --no-git-tag-version | sed 's/v//')

cd ..

git add sdk/package.json sdk/package-lock.json
git commit -m "chore: release SIP SDK $NEW_VERSION"
git push origin main

TAG="sip-sdk-v$NEW_VERSION"

git tag "$TAG" -m "SIP SDK $NEW_VERSION"
git push origin "$TAG"

echo "⏳ Waiting GitHub Actions..."

sleep 20

RUN_ID=$(gh run list \
--workflow=sip-sdk-release.yml \
--limit 1 \
--json databaseId \
-q '.[0].databaseId')

echo "Run ID: $RUN_ID"

gh run watch "$RUN_ID" || true

RESULT=$(gh run view "$RUN_ID" \
--json conclusion \
-q .conclusion)

if [ "$RESULT" != "success" ]; then
    echo "❌ Release failed"
    gh run view "$RUN_ID"
    exit 1
fi

echo "📦 Installing published package..."

npm install \
"@alialkhtri3-png/sip-sdk@$NEW_VERSION" \
--registry=https://npm.pkg.github.com

echo "🔍 Verify"

npm ls @alialkhtri3-png/sip-sdk

git status

echo "🎉 SIP SDK $NEW_VERSION released successfully"
