async function main(){

const Registry =
await ethers.getContractFactory(
"SovereignIdentityRegistry"
);

const registry =
await Registry.deploy();

await registry.deployed();

console.log(
"SovereignIdentityRegistry:",
registry.address
);

}

main()
.catch(e=>{
console.error(e);
process.exit(1);
});
