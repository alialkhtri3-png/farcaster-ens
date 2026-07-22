function calculate(identity){

 let score=0;

 if(identity.credentials)
   score+=30;

 if(identity.walletAge)
   score+=20;

 if(identity.activity)
   score+=20;

 if(identity.verified)
   score+=30;

 return {
  score,
  level:
   score>=80 ? "trusted" :
   score>=50 ? "verified" :
   "unknown"
 };
}

module.exports={calculate};
