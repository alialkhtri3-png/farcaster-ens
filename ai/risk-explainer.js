function explainRisk(data){
 return {
  summary:"Identity security analysis completed",
  score:data.score || 0,
  factors:[
   "Identity",
   "Behavior",
   "Reputation"
  ],
  recommendation:
   data.score >= 80 ? "ALLOW" :
   data.score >= 50 ? "REVIEW" :
   "BLOCK"
 };
}

module.exports={explainRisk};
