module.exports={
 check(node){
  return {
   node:node.id,
   healthy:node.status==="online",
   timestamp:Date.now()
  };
 }
};
