const express=require("express");

const app=express();
app.use(express.json());

app.get("/sip/status",(req,res)=>{
 res.json({
  protocol:"SIP",
  version:"5.0.0",
  status:"online"
 });
});

app.post("/sip/resolve",(req,res)=>{
 res.json({
  resolved:true,
  identity:req.body
 });
});

app.listen(3040,()=>{
 console.log("SIP Gateway running on 3040");
});
