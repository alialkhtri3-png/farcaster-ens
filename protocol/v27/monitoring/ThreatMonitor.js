class ThreatMonitor {

 scan(){
   return {
     threats:0,
     network:"healthy",
     protocol:"SIP v27.0.0"
   };
 }

}

module.exports = new ThreatMonitor();
