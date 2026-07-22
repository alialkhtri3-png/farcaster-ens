#!/usr/bin/env node

const ClusterManager=require("../cluster/ClusterManager");

const cluster=new ClusterManager();

cluster.addNode({
 id:"sip-node-primary",
 status:"online",
 protocol:"SIP v24.0.0"
});

console.log("SIP Cluster Network");
console.log(JSON.stringify(cluster.status(),null,2));
console.log(JSON.stringify(cluster.list(),null,2));
