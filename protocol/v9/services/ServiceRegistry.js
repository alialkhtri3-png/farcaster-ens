class ServiceRegistry {

constructor(){
 this.services=[];
}

register(service){
 this.services.push(service);
 return {
  registered:true,
  service
 };
}

list(){
 return this.services;
}

}

module.exports = ServiceRegistry;
