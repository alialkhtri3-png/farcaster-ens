const SIPRuntime=require("../runtime/SIPRuntime");

const sip=new SIPRuntime();

console.log("SIP v30 Runtime");
console.log(JSON.stringify(sip.info(),null,2));
