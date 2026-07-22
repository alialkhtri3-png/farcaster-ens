const registry=require("../chains/ChainRegistry.json");

function resolve(address){

 return {
  address,
  chains:registry.chains.map(
   c=>({
    chain:c.name,
    status:"available"
   })
  ),
  protocol:"SIP"
 };
}

module.exports={resolve};
