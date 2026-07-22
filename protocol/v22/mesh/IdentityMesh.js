class IdentityMesh {
 constructor(){
  this.peers=[];
 }

 connect(peer){
  this.peers.push(peer);
 }

 status(){
  return {
   mesh:"active",
   peers:this.peers.length
  };
 }
}

module.exports=IdentityMesh;
