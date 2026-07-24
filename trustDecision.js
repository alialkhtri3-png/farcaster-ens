function calculateTrustDecision(identity, behavior, reputation){

 let score =
   Math.round(
    (identity.identityScore || 0) * 0.4 +
    (behavior.behaviorScore || 0) * 0.3 +
    (reputation.trustScore || 0) * 0.3
   );

 let decision="ALLOW";
 let risk="LOW";

 if(score < 70){
   decision="REVIEW";
   risk="MEDIUM";
 }

 if(score < 40){
   decision="BLOCK";
   risk="HIGH";
 }

 return {
   trustScore:score,
   decision,
   riskLevel:risk,
   reasons:[
    "Identity analyzed",
    "Behavior analyzed",
    "Reputation analyzed"
   ]
 };
}

export { calculateTrustDecision };
