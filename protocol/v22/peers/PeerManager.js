class PeerManager {
 constructor(){
  this.peers=new Map();
 }

 add(id,node){
  this.peers.set(id,node);
 }

 list(){
  return [...this.peers.keys()];
 }
}

module.exports=PeerManager;
