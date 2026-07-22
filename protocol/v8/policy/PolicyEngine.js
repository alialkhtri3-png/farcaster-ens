class PolicyEngine {

check(identity,policy){

return {
 identity,
 policy,
 allowed:true
};

}

}

module.exports = PolicyEngine;
