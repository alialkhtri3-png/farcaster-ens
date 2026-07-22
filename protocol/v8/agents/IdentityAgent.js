class IdentityAgent {

constructor(identity){
 this.identity = identity;
}

evaluate(request){

return {
 identity:this.identity,
 decision:"verified",
 automated:true
};

}

}

module.exports = IdentityAgent;
