module.exports={
 elect(nodes){
  if(!nodes.length) return null;

  return {
    leader:nodes[0],
    method:"SIP leader election v25"
  };
 }
};
