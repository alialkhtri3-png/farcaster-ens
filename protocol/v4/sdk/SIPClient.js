class SIPClient {

constructor(endpoint){
 this.endpoint = endpoint;
}

identity(address){
 return {
  request:"identity",
  address
 };
}

verify(credential){
 return {
  request:"verify",
  credential
 };
}

}

module.exports = SIPClient;
