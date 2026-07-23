#!/data/data/com.termux/files/usr/bin/bash
set -e

VERSION=$(node -p "require('./sdk/package.json').version")

echo "🚀 Releasing SIP SDK..."

cd ~/farcaster-ens/sdk
npm version patch

NEW_VERSION=$(node -p "require('./package.json').version")

cd ..

git add sdk/package.json sdk/package-lock.json
git commit -m "chore: release SIP SDK $NEW_VERSION" || true
git push origin main

git tag "sip-sdk-v$NEW_VERSION" -m "SIP SDK v$NEW_VERSION" || true
git push origin "sip-sdk-v$NEW_VERSION"

echo "⏳ Waiting GitHub Actions..."

sleep 20

gh run list --workflow=sip-sdk-release.yml --limit 1

echo "📦 Installing published SDK..."

npm install "@alialkhtri3-png/sip-sdk@$NEW_VERSION" \
--registry=https://npm.pkg.github.com

echo "🔍 Verifying..."

npm ls @alialkhtri3-png/sip-sdk

git status

echo "✅ SIP SDK $NEW_VERSION released successfully"
