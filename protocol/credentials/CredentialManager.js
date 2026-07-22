const fs=require("fs");

const DB="protocol/storage/IdentityStore.json";

function load(){
 return JSON.parse(fs.readFileSync(DB));
}

function issue(credential){
 const db=load();

 db.credentials.push({
  ...credential,
  status:"active",
  issuedAt:new Date().toISOString()
 });

 fs.writeFileSync(DB,JSON.stringify(db,null,2));

 return credential;
}

function revoke(id){
 const db=load();

 const item=db.credentials.find(c=>c.id===id);

 if(item){
  item.status="revoked";
 }

 fs.writeFileSync(DB,JSON.stringify(db,null,2));

 return item;
}

module.exports={
 issue,
 revoke
};
