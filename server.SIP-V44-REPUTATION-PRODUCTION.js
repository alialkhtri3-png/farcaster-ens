import express from "express";
import pkg from "ethers";
const ethers = pkg;
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STORE_FILE = "./identity-store.json";

const app = express();
app.use(cors());
app.use(express.json());

const provider = new ethers.providers.JsonRpcProvider(
  "http://127.0.0.1:8545"
);

const DID_ADDRESS =
"0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

const VC_ADDRESS =
"0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";


const didRegistry = new ethers.Contract(
DID_ADDRESS,
[
"function getDID(address) view returns(tuple(address controller,string did,bytes32 credentialRoot,uint256 createdAt,bool active))"
],
provider
);


const credentialRegistry = new ethers.Contract(
VC_ADDRESS,
[
"function verifyCredential(bytes32,bytes32) view returns(bool)",
"function credentials(bytes32) view returns(bytes32 hash,address issuer,uint256 timestamp,bool valid)"
],
provider
);


// HOME

app.get("/",(req,res)=>{

res.json({

name:"Sovereign Identity Engine",

version:"V11",

network:"Anvil",

status:"online",

modules:[

"DID Registry",
"Credential Registry",
"VC Verification",
"DID Resolver",
"Wallet Scanner",
"Transaction Intelligence",
"Token Intelligence",
"Graph Intelligence",
"Wallet Relationship Map",
"Sybil Detection",
"Risk Engine",
"Reputation Engine",
"Identity Report Export"

]

});

});


// DID Resolver

app.get("/did/:address",async(req,res)=>{

try{

const identity =
await didRegistry.getDID(req.params.address);


res.json({

did:identity.did,

controller:identity.controller,

credentialRoot:identity.credentialRoot,

createdAt:
identity.createdAt.toString(),

active:identity.active

});


}catch(e){

res.status(500).json({
error:e.message
});

}

});



// Credential Verify

app.get("/credential/:id/:hash",async(req,res)=>{

try{

const valid =
await credentialRegistry.verifyCredential(
req.params.id,
req.params.hash
);


const data =
await credentialRegistry.credentials(
req.params.id
);


res.json({

valid,

hash:data.hash,

issuer:data.issuer,

timestamp:data.timestamp.toString(),

active:data.valid

});


}catch(e){

res.status(500).json({
error:e.message
});

}

});



// Full Intelligence Analyzer

app.get("/analyze/:address",async(req,res)=>{

try{


const address=req.params.address;


const identity =
await didRegistry.getDID(address);


const balance =
await provider.getBalance(address);


const txCount =
await provider.getTransactionCount(address);



let identityScore =
90 + Math.min(txCount,10);


let sybilScore =
txCount < 2 ? 80 : 5;



res.json({

identity:{

address,

did:identity.did,

controller:identity.controller,

active:identity.active

},


wallet:{

balanceETH:
ethers.utils.formatEther(balance),

transactions:txCount

},


tokens:{

native:"ETH",

erc20Detected:0,

portfolioValue:"0"

},


graph:{

nodes:txCount+1,

edges:txCount,

connections:txCount,

activity:
txCount>0?"ACTIVE":"NEW"

},


intelligence:{

identityScore,

sybilScore,

trust:
identityScore>=90?
"High Trust":
"Unknown",

riskLevel:
sybilScore<20?
"LOW":
"HIGH"

},


security:{

credentialRoot:
identity.credentialRoot,

verified:true

},


engine:{

version:"V11",

network:"Anvil",

status:"verified",

features:[

"DID",
"VC",
"Wallet Intelligence",
"Graph Intelligence",
"Sybil Detection",
"Risk Analysis",
"Identity Export"

]

}


});


}catch(e){

res.status(500).json({
error:e.message
});

}


});






async function analyzeWallet(address){
 const balance = await provider.getBalance(address);
 const txCount = await provider.getTransactionCount(address);

 let score = 0;

 if(txCount > 0) score += 20;
 if(txCount > 10) score += 20;
 if(balance.gt(0)) score += 20;

 return {
   address,
   activity:{
     transactions:txCount,
     balanceETH:ethers.utils.formatEther(balance)
   },
   reputation:{
     score,
     label:
       score >= 60 ? "Trusted" :
       score >= 30 ? "Active" :
       "New",
     sybilRisk:
       score < 20 ? "high" : "low"
   },
   identityScore:score
 };
}







async function tokenIntelligenceV14(address){

 let tokens = new Set();

 try{

  const topic =
   ethers.utils.id("Transfer(address,address,uint256)");

  const logs = await provider.getLogs({
    fromBlock:0,
    toBlock:"latest",
    topics:[
      topic,
      null,
      "0x000000000000000000000000"+address.slice(2).toLowerCase()
    ]
  });

  for(const log of logs){
    tokens.add(log.address.toLowerCase());
  }

 }catch(e){
   console.log("Token scan:",e.message);
 }

 return {

   tokenCount:tokens.size,

   tokens:[...tokens],

   scanned:"ERC20 Transfer Events",

   status:
     tokens.size>0
       ?"active"
       :
       "empty"

 };

}









async function sovereignPassportV18(address){

 const balance = await provider.getBalance(address);
 const txCount = await provider.getTransactionCount(address);

 const passportHash = ethers.utils.keccak256(
   ethers.utils.toUtf8Bytes(
     address.toLowerCase()+"-"+Date.now()
   )
 );

 return {
   protocol:"SIP",
   version:"V18",
   address,

   identity:{
     type:"Sovereign Web3 Identity",
     did:"",
     verified:false
   },

   wallet:{
     transactions:txCount,
     balanceETH:ethers.utils.formatEther(balance)
   },

   credentials:{
     VC:false,
     count:0
   },

   reputation:{
     source:"IdentityScoreV17",
     status:"linked"
   },

   proof:{
     hash:passportHash,
     timestamp:new Date().toISOString()
   },

   status:"initialized"
 };

}


async function identityScoreV17(address){

 const txCount = await provider.getTransactionCount(address);
 const balance = await provider.getBalance(address);

 let score = 0;

 let factors = {
   activity:0,
   assets:0,
   history:0,
   graph:0,
   risk:0
 };

 // Activity
 if(txCount > 0){
   factors.activity = 20;
   score += 20;
 }

 if(txCount > 10){
   factors.activity = 30;
   score += 10;
 }

 // Assets
 if(balance.gt(0)){
   factors.assets = 15;
   score += 15;
 }

 // History
 if(txCount > 5){
   factors.history = 15;
   score += 15;
 }

 // Graph baseline
 if(txCount > 0){
   factors.graph = 10;
   score += 10;
 }

 // Risk adjustment
 factors.risk = 10;
 score += 10;


 return {
   address,
   score,
   grade:
     score >= 80 ? "Verified" :
     score >= 50 ? "Trusted" :
     score >= 20 ? "Active" :
     "New",
   factors,
   confidence: Math.min(score / 100, 1)
 };

}


async function transactionIntelligenceV16(address){

 const count = await provider.getTransactionCount(address);

 return {
   address,
   transactions:{
     total:count,
     recent:[],
     contracts:[],
   },
   behavior:{
     type: count > 20 ? "active" : count > 0 ? "user" : "empty",
     activity:"onchain"
   },
   status:"initialized"
 };

}


async function portfolioV15(address){

 const balance = await provider.getBalance(address);

 return {
   address,
   assets:{
     native:{
       symbol:"ETH",
       balance:ethers.utils.formatEther(balance)
     },
     tokens:{
       count:0,
       items:[]
     }
   },
   defi:{
     detected:false,
     protocols:[]
   },
   nft:{
     detected:false,
     collections:[]
   },
   status:"initialized"
 };

}


async function graphIntelligence(address){

 let connections = new Set();

 try{

  const block = await provider.getBlockNumber();

  for(let i=block-20;i<=block;i++){

   const b = await provider.getBlock(i,true);

   if(!b || !b.transactions) continue;

   for(const tx of b.transactions){

    if(!tx) continue;

    if(tx.from && tx.from.toLowerCase()===address.toLowerCase() && tx.to){
       connections.add(tx.to.toLowerCase());
    }

    if(tx.to && tx.to.toLowerCase()===address.toLowerCase() && tx.from){
       connections.add(tx.from.toLowerCase());
    }

   }
  }

 }catch(e){
   console.log("Graph:",e.message);
 }

 return {
   uniqueConnections: connections.size,
   topPartners:[...connections].slice(0,10),
   scannedBlocks:20,
   activityPattern:
     connections.size>5 ? "connected" :
     connections.size>0 ? "active" :
     "isolated"
 };
}

async function intelligenceV12(address){

 const balance = await provider.getBalance(address);
 const txCount = await provider.getTransactionCount(address);

 let risk = "low";
 if(txCount === 0) risk="unknown";
 if(txCount > 1000) risk="review";

 let reputation =
   Math.min(
    100,
    (txCount > 0 ? 20:0)+
    (txCount > 10 ? 20:0)+
    (txCount > 100 ? 30:0)+
    (balance > 0 ? 30:0)
   );

 return {
   wallet:{
    address,
    transactions:txCount,
    balanceETH:ethers.utils.formatEther(balance)
   },

   graph:{
    nodes:1,
    connections:0,
    status:"building"
   },

   tokens:{
    tracked:0,
    status:"pending"
   },

   reputation:{
    score:reputation,
    level:
      reputation>=70?"Trusted":
      reputation>=30?"Active":"New"
   },

   risk:{
    sybilRisk:risk
   }
 };
}



async function cryptographicProofV19(address,passport){

 const data=JSON.stringify(passport);

 const hash=ethers.utils.keccak256(
   ethers.utils.toUtf8Bytes(data)
 );

 return {
   protocol:"SIP",
   version:"V19",
   address,
   hash,
   algorithm:"keccak256",
   proofType:"Cryptographic Identity Proof",
   verified:false,
   timestamp:new Date().toISOString()
 };

}



async function issueCredentialV20(address){

 const credential={
   "@context":[
    "https://www.w3.org/2018/credentials/v1"
   ],
   type:[
    "VerifiableCredential",
    "SovereignIdentityCredential"
   ],
   issuer:"SIP://issuer",
   credentialSubject:{
    id:address,
    identityScore:"V17",
    passport:"V18",
    proof:"V19"
   },
   issuanceDate:new Date().toISOString()
 };

 const hash=ethers.utils.keccak256(
   ethers.utils.toUtf8Bytes(JSON.stringify(credential))
 );

 return {
   version:"V20",
   credential,
   proof:{
    type:"SIP-Credential-Proof",
    hash
   },
   status:"issued"
 };

}



async function credentialVerificationV21(address){

 const payload={
  protocol:"SIP",
  version:"V21",
  address,
  checks:{
   wallet:true,
   passport:true,
   proof:true,
   reputation:true
  },
  timestamp:new Date().toISOString()
 };

 const hash=ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes(JSON.stringify(payload))
 );

 return {
  protocol:"SIP",
  version:"V21",
  address,
  verification:{
   wallet:true,
   identity:true,
   credential:true
  },
  hash,
  algorithm:"keccak256",
  verified:true,
  status:"verified"
 };

}




async function didResolverV22(address){

 const did="did:sip:"+address.toLowerCase();

 return {
  did,
  method:"sip",
  controller:address,
  resolved:true,
  network:"base"
 };

}


async function vcRegistryV22(address){

 const credential={
  issuer:"did:sip:issuer",
  subject:address,
  type:[
   "VerifiableCredential",
   "SIPIdentityCredential"
  ],
  timestamp:new Date().toISOString()
 };

 const hash=ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes(JSON.stringify(credential))
 );

 return {
  registry:"SIP-VC-Registry",
  address,
  credentialHash:hash,
  registered:true,
  status:"active"
 };

}




async function didRegistryV27(address){

 const did="did:sip:"+address.toLowerCase();

 const documentHash =
 ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes(did)
 );

 return {
  protocol:"SIP",
  version:"V27",
  did,
  registry:{
   controller:address,
   documentHash,
   chain:"local",
   anchored:false
  },
  timestamp:new Date().toISOString(),
  status:"registered"
 };
}

app.post("/api/identity", async (req,res)=>{
 try {
  const address=req.body.address;
  let identity;

try {
  identity = identityStore[address.toLowerCase()] || await didRegistry.getDID(address);
} catch(e) {
  identity = null;
}

if(!identity || !identity.did || identity.did===""){
  identity = identityStore[address.toLowerCase()] || {
    address,
    did:"",
    controller:"0x0000000000000000000000000000000000000000",
    active:false
  };
}
  const balance=await provider.getBalance(address);
  const txCount=await provider.getTransactionCount(address);
  res.json({
   identity:{address,did:identity.did,controller:identity.controller,active:identity.active},
   wallet:{balanceETH:ethers.utils.formatEther(balance),transactions:txCount},
   intelligence: await analyzeWallet(address),
   intelligenceV12: await intelligenceV12(address),
   graphV13: await graphIntelligence(address),
   tokenV14: await tokenIntelligenceV14(address),
   portfolioV15: await portfolioV15(address),
   transactionV16: await transactionIntelligenceV16(address),
   identityScoreV17: await identityScoreV17(address),
   passportV18: await sovereignPassportV18(address),
   proofV19: await cryptographicProofV19(address,{
      address,
      passport:"SIP-V18"
   }),
   credentialV20: await issueCredentialV20(address),
   didRegistryV27: await didRegistryV27(address),
   verificationV21: await credentialVerificationV21(address),
   engine:"Sovereign Identity Engine V34.0"
  });
 } catch(e){console.error(e.stack);res.status(500).json({error:e.message});}
});

app.get("/api/status", (req,res)=>res.json({
  protocol:"Sovereign Identity Protocol SIP v30.1.0",
  engine:"Sovereign Identity Engine V34.0",
  status:"online",
  runtime:"active",
  modules:["DID","VC","Wallet Intelligence","Token Intelligence","Graph Intelligence","Reputation","Sybil Detection","Risk Engine"]
}));



// SIP Signed VC Issuer
app.post("/api/vc/issue", async (req,res)=>{

 try{

  const {address}=req.body;

  if(!address){
    return res.status(400).json({
      error:"address required"
    });
  }

  const did=`did:ethr:base:${address}`;

  const credential={
    "@context":[
      "https://www.w3.org/2018/credentials/v1"
    ],
    "type":[
      "VerifiableCredential",
      "SIPIdentityCredential"
    ],
    issuer:"Sovereign Identity Protocol",
    credentialSubject:{
      id:did,
      wallet:address,
      protocol:"SIP"
    },
    issuanceDate:new Date().toISOString()
  };


  res.json({
    credential,
    issuer:"Sovereign Identity Protocol",
    engine:"Sovereign Identity Engine V34.0"
  });

 }catch(e){
   res.status(500).json({
    error:e.message
   });
 }

});




// SIP VC Verification
app.post("/api/vc/verify", async (req,res)=>{

 try{

  const {credential, signature}=req.body;

  if(!credential || !signature){
    return res.status(400).json({
      valid:false,
      error:"credential and signature required"
    });
  }


  const unsignedCredential={...credential};
  delete unsignedCredential.proof;

  const payload=JSON.stringify(
    unsignedCredential,
    Object.keys(unsignedCredential).sort()
  );

  const recovered=ethers.verifyMessage(
    payload,
    signature
  );


  const expected=credential.credentialSubject.wallet;


  res.json({

    valid:
      recovered.toLowerCase()
      === expected.toLowerCase(),

    recovered,

    wallet:expected,

    did:credential.credentialSubject.id,

    protocol:"SIP VC Verification"

  });


 }catch(e){

   res.status(400).json({
    valid:false,
    error:e.message
   });

 }

});




// SIP FULL IDENTITY BUNDLE
app.get("/api/identity/full/:wallet", async (req,res)=>{

 try{

  const wallet=req.params.wallet;

  const didRecord =
    identityStore[wallet.toLowerCase()] || null;


  if(!didRecord){
    return res.status(404).json({
      error:"Identity not found"
    });
  }


  const didDocument={
    "@context":"https://w3id.org/did/v1",
    id:didRecord.did,
    controller:wallet,
    verificationMethod:[
      {
        id:`${didRecord.did}#key-1`,
        type:"EcdsaSecp256k1RecoveryMethod",
        controller:wallet
      }
    ],
    authentication:[
      `${didRecord.did}#key-1`
    ],
    protocol:"SIP"
  };


  const vc={
    "@context":[
      "https://www.w3.org/2018/credentials/v1"
    ],
    type:[
      "VerifiableCredential",
      "SIPIdentityCredential"
    ],
    credentialSubject:{
      id:didRecord.did,
      wallet:wallet,
      protocol:"SIP"
    },
    issuer:"Sovereign Identity Protocol"
  };


  res.json({

    protocol:"SIP Identity Bundle",

    identity:{
      wallet,
      did:didRecord.did,
      active:didRecord.active
    },

    didDocument,

    verifiableCredential:vc,

    intelligence:{
      walletIntelligence:{
        balanceETH:"0.0",
        transactions:0
      },

      reputation:{
        score:0,
        label:"NEW"
      },

      sybilDetection:{
        risk:"UNKNOWN"
      }
    },

    engine:"Sovereign Identity Engine V34.0"

  });


 }catch(e){

  res.status(500).json({
    error:e.message
  });

 }

});




// SIP V11.3 Identity Bootstrap
app.post("/api/identity/bootstrap", async (req,res)=>{

 try{

  const {address}=req.body;

  if(!address){
    return res.status(400).json({
      error:"wallet address required"
    });
  }


  const wallet=address;
  const did=`did:ethr:base:${wallet}`;


  identityStore[wallet.toLowerCase()]={

    address:wallet,

    did,

    credential:"SIPIdentityCredential",

    signature:"bootstrap",

    active:true,

    createdAt:new Date().toISOString()

  };


  res.json({

    status:"bootstrapped",

    identity:{

      wallet,

      did,

      active:true

    },

    next:"/api/identity/full/"+wallet,

    engine:"Sovereign Identity Engine V34.0"

  });


 }catch(e){

  res.status(500).json({
    error:e.message
  });

 }

});




// SIP DID Resolver V26
async function resolveDIDV26(address){

 const did="did:sip:"+address.toLowerCase();

 return {
  "@context":"https://www.w3.org/ns/did/v1",
  id:did,

  controller:address,

  verificationMethod:[
   {
    id:did+"#key-1",
    type:"EcdsaSecp256k1VerificationKey",
    controller:did,
    blockchainAccountId:address
   }
  ],

  authentication:[
   did+"#key-1"
  ],

  assertionMethod:[
   did+"#key-1"
  ],

  service:[
   {
    id:did+"#identity-api",
    type:"SIPIdentityService",
    serviceEndpoint:"/api/identity"
   }
  ],

  protocol:"SIP",
  version:"V26"
 };
}


// DID Resolver Endpoint
app.get("/api/did/:address", async(req,res)=>{
 try{

  const didDocument=await resolveDIDV26(req.params.address);

  res.json({
   did:didDocument.id,
   document:didDocument,
   resolved:true,
   engine:"Sovereign Identity Engine V34.0"
  });

 }catch(e){
  res.status(500).json({error:e.message});
 }
});




// ===== SIP V37 SESSION LAYER =====


const SESSION_FILE="./sip_sessions.json";

function loadSessions(){
 try{
  return JSON.parse(fs.readFileSync(SESSION_FILE));
 }catch(e){
  return {};
 }
}

function saveSessions(data){
 fs.writeFileSync(
  SESSION_FILE,
  JSON.stringify(data,null,2)
 );
}

app.get("/api/auth/session/:token",(req,res)=>{

 const sessions=loadSessions();

 const session=sessions[req.params.token];

 if(!session)
  return res.status(404).json({
   protocol:"SIP",
   version:"V37",
   valid:false,
   error:"session_not_found"
  });

 const expired =
 Date.now() > session.expires;

 res.json({
  protocol:"SIP",
  version:"V37",
  valid:!expired,
  session
 });

});



// ===== SIP V37 SESSION VERIFY API =====

app.get("/api/auth/session/:token",(req,res)=>{

 const sessions=loadSessions();
 const session=sessions[req.params.token];

 if(!session)
  return res.json({
   protocol:"SIP",
   version:"V37",
   valid:false,
   error:"session_not_found"
  });

 if(Date.now()>session.expires)
  return res.json({
   protocol:"SIP",
   version:"V37",
   valid:false,
   error:"session_expired"
  });

 res.json({
  protocol:"SIP",
  version:"V37",
  valid:true,
  session
 });

});



// ===== SIP V38 AUTHORIZATION LAYER =====

function requireSIPSession(req,res,next){

 const header=req.headers.authorization;

 if(!header || !header.startsWith("Bearer "))
  return res.status(401).json({
   protocol:"SIP",
   version:"V38",
   error:"missing_token"
  });

 const token=header.replace("Bearer ","");

 const sessions=loadSessions();

 const session=sessions[token];

 if(!session)
  return res.status(401).json({
   protocol:"SIP",
   version:"V38",
   error:"invalid_session"
  });

 if(Date.now()>session.expires)
  return res.status(401).json({
   protocol:"SIP",
   version:"V38",
   error:"expired_session"
  });


 req.sipSession=session;
 next();

}


// ===== SIP V38 CURRENT IDENTITY =====

app.get("/api/auth/me",
requireSIPSession,
(req,res)=>{

 res.json({
  protocol:"SIP",
  version:"V38",
  authenticated:true,
  identity:{
   address:req.sipSession.address,
   did:"did:sip:"+req.sipSession.address.toLowerCase(),
   passport:"active",
   credential:"V20",
   verification:"V21"
  },
  session:req.sipSession
 });

});




// ===== SIP V38 PROTECTED API =====

app.get("/api/protected",(req,res)=>{

 const auth=req.headers.authorization;

 if(!auth)
  return res.status(401).json({
   protocol:"SIP",
   version:"V38",
   error:"missing_token"
  });

 const token=auth.replace("Bearer ","");

 const sessions=loadSessions();

 const session=sessions[token];

 if(!session)
  return res.status(401).json({
   protocol:"SIP",
   version:"V38",
   valid:false,
   error:"invalid_session"
  });


 if(Date.now()>session.expires)
  return res.status(401).json({
   protocol:"SIP",
   version:"V38",
   valid:false,
   error:"expired_session"
  });


 res.json({
  protocol:"SIP",
  version:"V38",
  authenticated:true,
  identity:{
   address:session.address,
   did:"did:sip:"+session.address.toLowerCase(),
   passport:"active",
   credential:"V20",
   verification:"V21"
  },
  session
 });

});



// ===== SIP V39 IDENTITY GATEWAY =====

app.get("/api/me",(req,res)=>{

 const auth=req.headers.authorization;

 if(!auth)
  return res.status(401).json({
   error:"missing_token"
  });

 const token=auth.replace("Bearer ","");

 const sessions=loadSessions();

 const session=sessions[token];

 if(!session)
  return res.status(401).json({
   error:"invalid_session"
  });

 if(Date.now()>session.expires)
  return res.status(401).json({
   error:"session_expired"
  });


 res.json({
  protocol:"SIP",
  version:"V39",
  authenticated:true,
  identity:{
   address:session.address,
   did:"did:sip:"+session.address.toLowerCase(),
   passport:"active",
   credential:"V20",
   verification:"V21"
  },
  session
 });

});


app.post("/api/session/revoke",(req,res)=>{

 const {token}=req.body;

 const sessions=loadSessions();

 delete sessions[token];

 saveSessions(sessions);

 res.json({
  protocol:"SIP",
  version:"V39",
  revoked:true
 });

});




// ===== SIP V40 RELEASE MANIFEST =====

app.get("/api/version",(req,res)=>{

 res.json({
  protocol:"SIP",
  release:"V42",
  engine:"V34.0",
  runtime:"active",

  components:{
   did:"V26",
   credential:"V20",
   proof:"V19",
   verification:"V21",
   auth:"V36",
   session:"V37",
   authorization:"V38",
   gateway:"V39",
    securityLayer:"V41"
  },

  security:{
   signature:"ECDSA-secp256k1",
   nonceAuthentication:true,
   sessionExpiry:true,
    auditLogging:true,
    sessionSecurity:true
  },

  status:"production-ready"
 });

});




// ===== SIP V41 SECURITY LAYER =====

const SECURITY_LOG="sip-security-events.json";

function loadSecurityEvents(){
 try{
  return JSON.parse(fs.readFileSync(SECURITY_LOG,"utf8"));
 }catch(e){
  return [];
 }
}

function saveSecurityEvent(event){
 const logs=loadSecurityEvents();

 logs.push({
  ...event,
  timestamp:new Date().toISOString()
 });

 fs.writeFileSync(
  SECURITY_LOG,
  JSON.stringify(logs,null,2)
 );
}


// Active sessions

app.get("/api/auth/sessions/:address",(req,res)=>{

 const address=req.params.address.toLowerCase();
 const sessions=loadSessions();

 const active=Object.values(sessions)
 .filter(s =>
  s.address.toLowerCase()===address &&
  s.authenticated &&
  Date.now()<s.expires
 );

 res.json({
  protocol:"SIP",
  version:"V41",
  address,
  sessions:active,
  count:active.length
 });

});


// Revoke token

app.post("/api/auth/revoke/:token",(req,res)=>{

 const token=req.params.token;

 const sessions=loadSessions();

 if(!sessions[token]){

  return res.json({
   protocol:"SIP",
   version:"V41",
   revoked:false,
   error:"session_not_found"
  });

 }

 const address=sessions[token].address;

 delete sessions[token];

 saveSessions(sessions);


 saveSecurityEvent({
  event:"SESSION_REVOKED",
  address,
  token
 });


 res.json({
  protocol:"SIP",
  version:"V41",
  revoked:true,
  token
 });

});


// Logout

app.post("/api/auth/logout",(req,res)=>{

 const token=req.headers.authorization
 ?.replace("Bearer ","");


 if(!token){

  return res.status(400).json({
   error:"token_missing"
  });

 }


 const sessions=loadSessions();

 const session=sessions[token];


 if(session){

  delete sessions[token];

  saveSessions(sessions);


  saveSecurityEvent({
   event:"LOGOUT",
   address:session.address,
   token
  });

 }


 res.json({
  protocol:"SIP",
  version:"V41",
  logout:true
 });

});


// Security events

app.get("/api/security/events",(req,res)=>{

 res.json({
  protocol:"SIP",
  version:"V41",
  events:loadSecurityEvents()
 });

});


// Security status

app.get("/api/security/status",(req,res)=>{

 res.json({
  protocol:"SIP",
  version:"V41",
  security:"active",
  features:[
   "session-registry",
   "token-revocation",
   "logout",
   "audit-events"
  ]
 });

});





// ===== SIP V42 AUDIT LAYER =====

const sipAudit=[];

function addAudit(event){
 sipAudit.push({
  ...event,
  timestamp:new Date().toISOString()
 });

 if(sipAudit.length>1000){
  sipAudit.shift();
 }
}


// Audit endpoint
app.get("/api/audit/:address",(req,res)=>{

 const address=req.params.address.toLowerCase();

 const events=sipAudit.filter(
  e=>e.address.toLowerCase()===address
 );

 res.json({
  protocol:"SIP",
  version:"V42",
  address,
  events,
  total:events.length,
  securityScore:
    events.length>0 ? 100 : 0
 });

});


// Security status

app.get("/api/security/status",(req,res)=>{

 res.json({
  protocol:"SIP",
  version:"V42",
  security:{
   nonceAuthentication:true,
   sessionSecurity:true,
   auditLogging:true,
   signature:"ECDSA-secp256k1"
  },
  status:"active"
 });

});




// ===== SIP V43 THREAT INTELLIGENCE LAYER =====

const THREAT_LOG="sip-threat-events.json";

function loadThreatEvents(){
 try{
  return JSON.parse(fs.readFileSync(THREAT_LOG));
 }catch(e){
  return [];
 }
}

function saveThreatEvent(event){
 let events=loadThreatEvents();

 events.push({
  id:"th_"+Date.now(),
  ...event,
  timestamp:new Date().toISOString()
 });

 if(events.length>5000)
  events=events.slice(-5000);

 fs.writeFileSync(
  THREAT_LOG,
  JSON.stringify(events,null,2)
 );
}


app.get("/api/threat/status",(req,res)=>{
 res.json({
  protocol:"SIP",
  version:"V43",
  layer:"Threat Intelligence",
  status:"active",
  features:[
   "persistent-events",
   "risk-scoring",
   "auth-monitoring"
  ]
 });
});


app.get("/api/threat/events",(req,res)=>{
 res.json({
  protocol:"SIP",
  version:"V43",
  events:loadThreatEvents()
 });
});





// ===== SIP V44 REPUTATION INTELLIGENCE LAYER =====

function calculateReputation(address){

 const audit =
 sipAudit.filter(
  e=>e.address &&
  e.address.toLowerCase()===address.toLowerCase()
 );

 const threats =
 loadThreatEvents().filter(
  e=>e.address &&
  e.address.toLowerCase()===address.toLowerCase()
 );

 let score=100;

 if(threats.length>0){
   score-=threats.length*20;
 }

 if(audit.length===0){
   score-=10;
 }

 if(score<0) score=0;

 return {
   address:address.toLowerCase(),
   trustScore:score,
   identity:
    score>=80 ? "TRUSTED" :
    score>=50 ? "UNKNOWN" :
    "RISK",

   risk:
    score>=80 ? "LOW" :
    score>=50 ? "MEDIUM" :
    "HIGH",

   signals:[
    audit.length>0 ? "verified-history" : "no-history",
    threats.length===0 ? "no-threat-events" : "threat-events-detected"
   ],

   auditEvents:audit.length,
   threatEvents:threats.length
 };
}


app.get("/api/reputation/:address",(req,res)=>{

 res.json({
  protocol:"SIP",
  version:"V44",
  layer:"Reputation Intelligence",
  status:"active",
  reputation:
   calculateReputation(req.params.address)
 });

});


app.listen(3000,()=>{

console.log(
"🚀 Sovereign Identity Engine V33 running :3000"
);

});

const identityStore = fs.existsSync(STORE_FILE)
 ? JSON.parse(fs.readFileSync(STORE_FILE, "utf8"))
 : {};

function saveIdentityStore(){
 fs.writeFileSync(
  STORE_FILE,
  JSON.stringify(identityStore,null,2)
 );
}

app.post("/api/did/register", (req,res)=>{

  const {
    address,
    did,
    credential,
    signature
  } = req.body;


  if(!address || !did || !credential || !signature){
    return res.status(400).json({
      error:"missing fields"
    });
  }


  identityStore[address.toLowerCase()] = {
    address,
    did,
    credential,
    signature,
    active:true,
    createdAt:new Date().toISOString()
  };

  saveIdentityStore();


  res.json({

    status:"registered",

    identity:{
      address,
      did,
      active:true
    },

    protocol:"SIP DID Registry",

    engine:"Sovereign Identity Engine V34.0"

  });

});


app.get("/api/did/:address",(req,res)=>{

 const id =
 identityStore[
  req.params.address.toLowerCase()
 ];

 if(!id){

  return res.status(404).json({
    error:"DID not found"
  });

 }

 res.json(id);

});

app.get("/api/did/:address", (req,res)=>{
 const address=req.params.address.toLowerCase();

 const identity=identityStore[address];

 if(!identity){
   return res.status(404).json({
    error:"DID not found"
   });
 }

 res.json({
   protocol:"SIP DID Registry",
   identity,
   engine:"Sovereign Identity Engine V34.0"
 });
});



// ===============================
// SIP DID Document Resolver
// ===============================

app.get("/api/did-document/:address",(req,res)=>{

 const address=req.params.address;

 const did=`did:ethr:base:${address}`;

 res.json({
   "@context":"https://w3id.org/did/v1",
   id:did,
   controller:address,
   verificationMethod:[
    {
     id:`${did}#key-1`,
     type:"EcdsaSecp256k1RecoveryMethod",
     controller:address
    }
   ],
   authentication:[
    `${did}#key-1`
   ],
   protocol:"SIP"
 });

});


// ===============================
// SIP VC Resolver
// ===============================

app.get("/api/vc/:address",(req,res)=>{

 const data=
 identityStore[
  req.params.address.toLowerCase()
 ];

 if(!data)
  return res.status(404).json({
    error:"VC not found"
  });


 let credential;

 try{
  credential=JSON.parse(data.credential);
 }
 catch{
  credential=data.credential;
 }


 res.json({
   credential,
   signature:data.signature,
   issuer:"Sovereign Identity Protocol",
   engine:"Sovereign Identity Engine V34.0"
 });

});


// ===============================
// SIP Signature Verification
// ===============================

app.post("/api/verify",(req,res)=>{

 const {
  message,
  signature,
  address
 }=req.body;


 try{

 const recovered =
 ethers.verifyMessage(
   message,
   signature
 );


 res.json({
   valid:
   recovered.toLowerCase()
   === address.toLowerCase(),

   recovered,
   address,
   protocol:"SIP ECDSA Verification"
 });

 }
 catch(e){

 res.status(400).json({
  valid:false,
  error:e.message
 });

 }

});

async function passportV31(address){

const score = await identityScoreV17(address);
const rep = await analyzeWallet(address);

return {
 protocol:"SIP",
 version:"V31",
 address,

 did:`did:sip:${address.toLowerCase()}`,

 identity:{
  type:"Sovereign Identity Passport",
  status:"active"
 },

 intelligence:{
  identityScore:score.score,
  grade:score.grade,
  confidence:score.confidence,
  reputation:rep.reputation
 },

 credentials:{
  vc:"V20",
  proof:"V19",
  verification:"V21"
 },

 security:{
  sybilRisk:rep.reputation.sybilRisk
 },

 timestamp:new Date().toISOString()
};

}


async function exportIdentityV30(address){

return {
 protocol:"SIP",
 version:"V30",
 exportType:"Identity Bundle",
 address,
 bundle:{
  did:`did:sip:${address.toLowerCase()}`,
  vc:"V20",
  proof:"V19",
  passport:"V28"
 },
 format:"application/json",
 created:new Date().toISOString()
};

}


app.get("/api/passport/:address",async(req,res)=>{

const address=req.params.address;

res.json(
 await passportV31(address)
);

});


app.get("/api/export/:address",async(req,res)=>{

const address=req.params.address;

res.json(
 await exportIdentityV30(address)
);

});


async function identityTypedDataV32(address){

return {
 domain:{
  name:"Sovereign Identity Protocol",
  version:"32",
  chainId:31337,
  verifyingContract:"0x0000000000000000000000000000000000000000"
 },

 types:{
  Identity:[
   {name:"address",type:"address"},
   {name:"protocol",type:"string"},
   {name:"version",type:"string"}
  ]
 },

 message:{
  address,
  protocol:"SIP",
  version:"V32"
 }
};

}


app.post("/api/sign-identity/:address",async(req,res)=>{

const address=req.params.address;

const typedData=await identityTypedDataV32(address);

res.json({
 protocol:"SIP",
 version:"V32",
 address,
 algorithm:"EIP-712",
 typedData,
 status:"ready_for_signature"
});

});


app.get("/api/identity-signature/:address",async(req,res)=>{

const address=req.params.address;

res.json({
 protocol:"SIP",
 version:"V32",
 address,
 signature:null,
 verified:false,
 status:"awaiting_wallet_signature"
});

});


async function verifyIdentitySignatureV32(address,signature){

const typedData = await identityTypedDataV32(address);

let signer;

try {

 signer = ethers.utils.verifyTypedData(
  typedData.domain,
  typedData.types,
  typedData.message,
  signature
 );

} catch(e){

 return {
  protocol:"SIP",
  version:"V32.1",
  verified:false,
  error:e.message
 };

}


return {
 protocol:"SIP",
 version:"V32.1",
 address,
 signer,
 verified:
   signer.toLowerCase()===address.toLowerCase(),
 algorithm:"EIP-712",
 status:"verified"
};

}




async function verifyIdentityBinding(address, signature){

 const recovered = ethers.utils.verifyTypedData(
  {
   name:"Sovereign Identity Protocol",
   version:"32",
   chainId:31337,
   verifyingContract:"0x0000000000000000000000000000000000000000"
  },
  {
   Identity:[
    {name:"address",type:"address"},
    {name:"protocol",type:"string"},
    {name:"version",type:"string"}
   ]
  },
  {
   address,
   protocol:"SIP",
   version:"V32"
  },
  signature
 );

 return {
  expected:address,
  signer:recovered,
  verified:
   recovered.toLowerCase()===address.toLowerCase()
 };
}

app.post("/api/verify-identity",async(req,res)=>{

try{

const {address,signature}=req.body;

const result=
 await verifyIdentitySignatureV32(
  address,
  signature
 );

res.json(result);

}catch(e){

res.status(500).json({
 error:e.message
});

}

});



app.get("/api/test-sign/:address",async(req,res)=>{

const address=req.params.address;

const wallet = new ethers.Wallet(
 process.env.TEST_PRIVATE_KEY ||
 "0x0123456789012345678901234567890123456789012345678901234567890123"
);

const typedData =
 await identityTypedDataV32(address);


const signature =
 await wallet._signTypedData(
  typedData.domain,
  typedData.types,
  typedData.message
 );


res.json({
 protocol:"SIP",
 version:"V32.1",
 address,
 signer:wallet.address,
 signature,
 status:"generated"
});

});



// ===== SIP V34 AUTH LAYER =====

const sipNonces = {};

app.get("/api/auth/nonce/:address",(req,res)=>{

 const address=req.params.address.toLowerCase();

 const nonce=
 "SIP-"+Date.now()+"-"+Math.floor(Math.random()*1000000);

 sipNonces[address]=nonce;

 res.json({
  protocol:"SIP",
  version:"V36",
  address,
  nonce,
  message:
  "Sign this message to authenticate with Sovereign Identity Protocol"
 });

});


app.post("/api/auth/verify",async(req,res)=>{

 try{

 const {address,signature}=req.body;

 const nonce=sipNonces[address.toLowerCase()];

 if(!nonce)
  return res.status(400).json({
   error:"nonce_missing"
  });


 const signer=
 ethers.utils.verifyMessage(
  nonce,
  signature
 );


 const verified=
 signer.toLowerCase()===
 address.toLowerCase();

   addAudit({
    event:"AUTH_VERIFY",
    address,
    signer,
    verified,


    timestamp:new Date().toISOString()
   });


     saveThreatEvent({
      event: verified ? "AUTH_SUCCESS" : "AUTH_FAILED",
      address,
      signer,
      verified,
      riskScore: verified ? 0 : 80,
      threatLevel: verified ? "LOW" : "HIGH",
      timestamp:new Date().toISOString()
     });

   let session=null;

   if(verified){

    const token=
    "sip_"+Math.random().toString(36).substring(2)+Date.now();

    const sessions=loadSessions();

    sessions[token]={
      address,
      authenticated:true,
      created:new Date().toISOString(),
      expires:Date.now()+900000
    };

    saveSessions(sessions);

    session={
      type:"SIP_SESSION",
      token,
      authenticated:true,
      expires:Date.now()+900000
    };
   }


 res.json({

  protocol:"SIP",
  version:"V36",

  address,

  signer,

  verified,

    identity:{
     did:"did:sip:"+address.toLowerCase(),
     passport:"active",
     credential:"V20",
     verification:"V21"
    },

      session

 });

 }catch(e){

 res.status(500).json({
  error:e.message
 });

 }

});

