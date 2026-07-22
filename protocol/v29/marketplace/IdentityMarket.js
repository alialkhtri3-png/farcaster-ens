class IdentityMarket {
 constructor(){
  this.market="SIP Identity Marketplace v29.0.0";
  this.assets=[];
 }
 register(asset){
  this.assets.push(asset);
 }
 status(){
  return {
   marketplace:this.market,
   assets:this.assets.length,
   state:"active"
  };
 }
}
module.exports=new IdentityMarket();
