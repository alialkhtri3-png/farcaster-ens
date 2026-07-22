class DistributedIdentityStore {

 constructor(){
  this.storage={};
 }

 save(did,data){
  this.storage[did]=data;
 }

 resolve(did){
  return this.storage[did];
 }

}

module.exports = DistributedIdentityStore;
