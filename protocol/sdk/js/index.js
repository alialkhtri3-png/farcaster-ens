export class SIPClient {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async resolveIdentity(address) {
    const res = await fetch(
      `${this.endpoint}/identity/${address}`
    );
    return res.json();
  }

  async verifyCredential(credential) {
    const res = await fetch(
      `${this.endpoint}/verify`,
      {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(credential)
      }
    );
    return res.json();
  }
}
