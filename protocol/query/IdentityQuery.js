const store=require("../node/database/store");

function findByDid(did){
 const db=store.list();

 return db.identities.filter(
  i=>i.did===did
 );
}

function all(){
 return store.list();
}

module.exports={
 findByDid,
 all
};
