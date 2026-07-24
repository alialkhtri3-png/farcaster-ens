#!/bin/bash
set -e

echo "🚀 SIP V58 API INTEGRATION"

cp server.js server.js.V57-backup

cat > trust-api-snippet.js <<'EOF'
const { calculateTrustDecision } = require("./trustDecision");

app.get("/api/trust-decision/:address", async (req,res)=>{
 try {

  const address=req.params.address;

  const identity={
    identityScore:77
  };

  const behavior={
    behaviorScore:70
  };

  const reputation={
    trustScore:20
  };

  const result=calculateTrustDecision(
    identity,
    behavior,
    reputation
  );

  res.json({
    protocol:"SIP",
    version:"V58",
    address:address.toLowerCase(),
    ...result,
    signals:{
      identity:identity.identityScore,
      behavior:behavior.behaviorScore,
      reputation:reputation.trustScore
    }
  });

 } catch(e){
  res.status(500).json({
   error:e.message
  });
 }
});
EOF


cat trust-api-snippet.js >> server.js

node --check server.js

git add -A

git commit -m "SIP V58 trust decision API endpoint" || true

git push

echo "✅ SIP V58 API READY"
