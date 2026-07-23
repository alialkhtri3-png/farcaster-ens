export default class SIPClient {
  constructor(endpoint="http://localhost:3000") {
    this.endpoint = endpoint;
    this.provider = null;
  }

  createDID(address) {
    return {
      id:`did:ethr:${address}`,
      controller:address,
      created:new Date().toISOString()
    };
  }

  async identity(address){
    const res = await fetch(`${this.endpoint}/api/identity`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({address})
    });
    return await res.json();
  }

  async verify(address){
    const res = await fetch(`${this.endpoint}/api/verify/${address}`);
    return await res.json();
  }
}
