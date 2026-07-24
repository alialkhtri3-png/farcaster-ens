#!/data/data/com.termux/files/usr/bin/bash

echo "🚀 Sovereign Identity V42 Installer"

pkg update -y
pkg install nodejs git openssl -y

npm install

if [ -f .env.example ]; then
  cp .env.example .env
fi

echo "✅ Installation complete"

npm start
