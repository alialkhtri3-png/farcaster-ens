module.exports={
 upgrade(version){
   return {
    protocol:"SIP",
    upgraded:true,
    version
   };
 }
};
