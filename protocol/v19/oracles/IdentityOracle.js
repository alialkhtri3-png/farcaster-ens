class IdentityOracle {
 resolve(did){
   return {
    did,
    verified:true
   };
 }
}

module.exports = IdentityOracle;
