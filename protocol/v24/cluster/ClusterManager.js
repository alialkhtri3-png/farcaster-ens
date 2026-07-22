class ClusterManager {
  constructor(){
    this.nodes=[];
  }

  addNode(node){
    this.nodes.push(node);
  }

  list(){
    return this.nodes.map(n=>({
      id:n.id,
      status:n.status,
      protocol:n.protocol
    }));
  }

  status(){
    return {
      cluster:"SIP Cluster v24.0.0",
      nodes:this.nodes.length,
      state:"online"
    };
  }
}

module.exports = ClusterManager;
