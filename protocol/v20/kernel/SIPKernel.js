class SIPKernel {
 constructor(){
  this.modules=[];
 }

 register(module){
  this.modules.push(module);
 }

 status(){
  return {
   protocol:"SIP",
   version:"20.0.0",
   modules:this.modules.length
  };
 }
}

module.exports=SIPKernel;
