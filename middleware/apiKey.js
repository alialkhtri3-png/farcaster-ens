module.exports = function apiKey(req,res,next){

 const key=req.headers["x-api-key"];

 if(!key){
   return res.status(401).json({
    error:"Missing API Key"
   });
 }

 next();
}
