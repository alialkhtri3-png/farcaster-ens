#!/bin/bash
set -e

echo "🚀 SIP V56 DEPLOYMENT READY"

cat > Dockerfile <<'EOF'
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node","server.js"]
EOF


cat > docker-compose.yml <<'EOF'
services:
  sip-api:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
EOF


cat > deploy/README.md <<'EOF'
# SIP V56 Deployment

Run:

docker compose up --build

API:

GET /api/status

Production:

- Docker
- Environment variables
- Health checks
EOF


git add -A

git commit -m "SIP V56 deployment production layer" || true

git push

echo "✅ SIP V56 DEPLOY READY"
