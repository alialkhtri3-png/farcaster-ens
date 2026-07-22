class ProofOfIdentity {

 verify(identity){

  return {
   identity,
   verified:true,
   consensus:"proof-of-identity"
  };

 }

}

module.exports = ProofOfIdentity;
