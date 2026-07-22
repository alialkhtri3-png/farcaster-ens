module.exports={
 resolve(request){
  return {
   request,
   protocol:"SIP",
   status:"resolved"
  };
 }
};
