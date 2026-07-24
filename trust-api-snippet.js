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
