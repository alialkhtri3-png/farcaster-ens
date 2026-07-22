class SIPNodeService {

constructor(){
 this.status="running";
}

health(){
 return {
  protocol:"SIP",
  version:"4.0.0",
  status:this.status
 };
}

}

module.exports=SIPNodeService;
