class IdentityNode {

 constructor(id){
  this.id=id;
  this.status="online";
 }

 resolve(did){
  return {
   did,
   node:this.id,
   resolved:true
  };
 }

}

module.exports = IdentityNode;
