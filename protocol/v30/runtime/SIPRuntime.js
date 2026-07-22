class SIPRuntime {
  constructor(){
    this.version="SIP v30.0.0";
    this.status="online";
  }

  info(){
    return {
      protocol:this.version,
      status:this.status
    };
  }
}

module.exports=SIPRuntime;
