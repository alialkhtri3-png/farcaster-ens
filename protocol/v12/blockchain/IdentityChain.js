class IdentityChain {

 constructor(){
  this.blocks=[];
 }

 addIdentity(identity){
  const block={
   id:this.blocks.length,
   identity,
   timestamp:Date.now()
  };

  this.blocks.push(block);
  return block;
 }

 getChain(){
  return this.blocks;
 }

}

module.exports = IdentityChain;
