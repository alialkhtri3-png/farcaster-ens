const protocol = require("../../manifest/SIPManifest.json");

function health(){
 return {
  protocol: protocol.name,
  version: protocol.version,
  status:"online",
  runtime:true
 };
}

module.exports={health};
