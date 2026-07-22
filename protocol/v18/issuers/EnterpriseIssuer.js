class EnterpriseIssuer{
 issue(data){
  return {
   credential:data,
   issuer:"SIP Enterprise"
  };
 }
}

module.exports=EnterpriseIssuer;
