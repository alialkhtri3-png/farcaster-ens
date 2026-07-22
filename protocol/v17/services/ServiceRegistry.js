class ServiceRegistry {

 constructor(){
  this.services=[];
 }

 register(service){
  this.services.push(service);
 }

 list(){
  return this.services;
 }

}

module.exports=ServiceRegistry;
