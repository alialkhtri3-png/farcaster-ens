class SIPNode {
  constructor(id = "sip-node-" + Date.now()) {
    this.id = id;
    this.status = "offline";
    this.peers = [];
  }

  start() {
    this.status = "online";
    console.log("SIP Node Online");
    console.log("Node ID:", this.id);
    console.log("Network: SIP Mesh v23");
  }

  connect(peer) {
    this.peers.push(peer);
  }

  info() {
    return {
      id: this.id,
      status: this.status,
      peers: this.peers.length,
      protocol: "SIP v23.0.0"
    };
  }
}

module.exports = SIPNode;
