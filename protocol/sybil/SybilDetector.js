function analyze(graph){

 let risk="low";

 if(graph.edges > graph.nodes * 10){
  risk="high";
 }

 return {
  sybilRisk:risk
 };
}

module.exports={analyze};
