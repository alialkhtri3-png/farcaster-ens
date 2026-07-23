#!/data/data/com.termux/files/usr/bin/bash

set -e

cd ~/farcaster-ens

echo "🚀 Updating SIP SDK..."

cd sdk

npm version patch

cd ..

git add sdk/package.json sdk/package-lock.json

git commit -m "chore: release SIP SDK $(node -p "require('./sdk/package.json').version")"

git push origin main

VERSION=$(node -p "require('./sdk/package.json').version")

git tag "sip-sdk-v$VERSION" -m "SIP SDK v$VERSION"

git push origin "sip-sdk-v$VERSION"

echo "✅ Released SIP SDK v$VERSION"

echo "Checking GitHub Actions..."

gh run list --workflow=sip-sdk-release.yml

echo "🎉 Done"
