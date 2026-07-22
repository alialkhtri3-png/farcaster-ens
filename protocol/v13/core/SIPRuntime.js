class SIPRuntime {
  constructor(){
    this.status="online";
    this.layers=[
      "DID",
      "Credentials",
      "Graph",
      "Reputation",
      "Blockchain",
      "Network"
    ];
  }

  health(){
    return {
      protocol:"SIP",
      version:"13.0.0",
      status:this.status,
      layers:this.layers
    };
  }
}

module.exports = SIPRuntime;
