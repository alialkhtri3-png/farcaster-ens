class SIPClient {
  identity(address){
    return {
      address,
      protocol:"SIP",
      resolver:"active"
    };
  }
}

module.exports=SIPClient;
