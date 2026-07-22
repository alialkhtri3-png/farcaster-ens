class SecureChannel {
 send(message){
  return {
   encrypted:true,
   message
  };
 }
}

module.exports=SecureChannel;
