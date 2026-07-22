class IdentityVM {
 execute(action){
  return {
   executed:true,
   action
  };
 }
}

module.exports=IdentityVM;
