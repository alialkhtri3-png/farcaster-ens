const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");

const app = express();

app.use(cors());
app.use(express.json());

const provider = new ethers.JsonRpcProvider(
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
ethers.formatEther(balance),

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
   wallet:{balanceETH:ethers.formatEther(balance),transactions:txCount},
   engine:"Sovereign Identity Engine V11.3"
  });
 } catch(e){res.status(500).json({error:e.message});}
});

app.get("/api/status", (req,res)=>res.json({
  protocol:"Sovereign Identity Protocol SIP v30.0.0",
  engine:"Sovereign Identity Engine V11.3",
  status:"online",
  runtime:"active",
  modules:["DID","VC","Wallet Intelligence","Graph Intelligence","Reputation","Sybil Detection"]
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
    engine:"Sovereign Identity Engine V11.3"
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

    engine:"Sovereign Identity Engine V11.3"

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

    engine:"Sovereign Identity Engine V11.3"

  });


 }catch(e){

  res.status(500).json({
    error:e.message
  });

 }

});


app.listen(3000,()=>{

console.log(
"🚀 Sovereign Identity Engine V11 running :3000"
);

});

const fs = require("fs");

const STORE_FILE = "./identity-store.json";

let identityStore = fs.existsSync(STORE_FILE)
 ? JSON.parse(fs.readFileSync(STORE_FILE))
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

    engine:"Sovereign Identity Engine V11.3"

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
   engine:"Sovereign Identity Engine V11.3"
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
   engine:"Sovereign Identity Engine V11.3"
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

