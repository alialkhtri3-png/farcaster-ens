class IdentityConnector {

connect(provider){

return {
 provider,
 connected:true,
 protocol:"SIP"
};

}

}

module.exports = IdentityConnector;
