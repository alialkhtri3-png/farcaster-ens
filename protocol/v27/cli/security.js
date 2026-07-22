const security=require("../security/SecurityEngine");
const monitor=require("../monitoring/ThreatMonitor");

security.report("network-start");

console.log("SIP Security Intelligence");

console.log(JSON.stringify(
security.status(),
null,
2
));

console.log(JSON.stringify(
monitor.scan(),
null,
2
));
