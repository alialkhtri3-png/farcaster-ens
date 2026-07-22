const fs=require("fs");

const DB="protocol/storage/IdentityStore.json";

function read(){
 return JSON.parse(fs.readFileSync(DB));
}

function addIdentity(identity){
 const db=read();
 db.identities.push(identity);
 fs.writeFileSync(DB,JSON.stringify(db,null,2));
 return identity;
}

function list(){
 return read();
}

module.exports={addIdentity,list};
