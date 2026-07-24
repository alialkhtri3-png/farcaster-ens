import crypto from "crypto";

export function apiKeyGuard(req,res,next){
  const key=req.headers["x-api-key"];

  if(!key){
    return res.status(401).json({
      error:"Missing API Key"
    });
  }

  next();
}

export function generateApiKey(){
  return "sip_"+crypto.randomBytes(24).toString("hex");
}
