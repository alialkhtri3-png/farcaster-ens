class ValidatorNetwork {

 constructor(){
   this.validators=[];
 }

 add(node){
   this.validators.push(node);
 }

 status(){
   return {
    network:"SIP Validator Network",
    validators:this.validators.length,
    status:"active"
   };
 }

}

module.exports=ValidatorNetwork;
