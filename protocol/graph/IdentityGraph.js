const graph={
 nodes:[],
 edges:[]
};

function addIdentity(id){
 graph.nodes.push(id);
}

function connect(a,b,type){
 graph.edges.push({
  from:a,
  to:b,
  type
 });
}

function stats(){
 return {
  nodes:graph.nodes.length,
  edges:graph.edges.length
 };
}

module.exports={
 addIdentity,
 connect,
 stats
};
