#!/usr/bin/env node

const node = require("../runtime/MeshRuntime");

console.log(JSON.stringify(node.info(), null, 2));
