class SecurityEngine {

 constructor(){
   this.events=[];
 }

 report(event){
   this.events.push({
     id:Date.now(),
     event,
     status:"recorded"
   });
 }

 status(){
   return {
     security:"SIP Security v27.0.0",
     events:this.events.length,
     state:"active"
   };
 }

}

module.exports = new SecurityEngine();
