const express=require("express");
const node=require("../config/node.json");
const manifest=require("../../manifest/SIPManifest.json");

const app=express();

app.get("/health",(req,res)=>{
 res.json({
  status:"online",
  node:node.nodeId,
  protocol:manifest.name,
  version:manifest.version
 });
});

app.get("/manifest",(req,res)=>{
 res.json(manifest);
});

app.get("/protocol/status",(req,res)=>{
 res.json({
  node,
  runtime:true,
  identity:true,
  credentials:true,
  reputation:true
 });
});

app.get("/resolve/:did",(req,res)=>{
 res.json({
  did:req.params.did,
  resolved:true,
  protocol:"SIP"
 });
});

app.listen(3030,()=>{
 console.log("SIP Node running on port 3030");
});
