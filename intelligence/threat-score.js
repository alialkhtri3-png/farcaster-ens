function calculateThreatScore(events=[]){
 let score=0;

 for(const e of events){
  if(e.type==="fraud") score+=40;
  if(e.type==="sybil") score+=30;
  if(e.type==="exploit") score+=50;
 }

 return {
  threatScore:score,
  level:
   score>=70 ? "HIGH" :
   score>=30 ? "MEDIUM" :
   "LOW"
 };
}

module.exports={calculateThreatScore};
