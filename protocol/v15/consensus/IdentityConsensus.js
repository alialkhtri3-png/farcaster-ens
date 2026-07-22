class IdentityConsensus {

 validate(identity){
   return {
    identity,
    verified:true,
    consensus:"SIP"
   };
 }

}

module.exports=IdentityConsensus;
