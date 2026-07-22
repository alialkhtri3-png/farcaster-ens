class NetworkManager {
 constructor(){
  this.nodes=[];
 }

 register(node){
  this.nodes.push(node);
 }

 status(){
  return {
   network:"SIP",
   nodes:this.nodes.length
  };
 }
}

module.exports=NetworkManager;
