// scripts/deploy.js

const { ethers } = require('ethers');
const fs = require('fs');
require('dotenv').config();

async function main() {
    // Connect to the Ethereum network
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    // Load the contract's ABI and bytecode
    const contractName = 'MySmartContract';
    const contractPath = `./artifacts/contracts/${contractName}.json`;
    const { abi, evm } = JSON.parse(fs.readFileSync(contractPath, 'utf8'));

    // Create a contract factory
    const contractFactory = new ethers.ContractFactory(abi, evm.bytecode.object, wallet);

    // Deploy the contract
    console.log(`Deploying ${contractName}...`);
    const contract = await contractFactory.deploy();
    await contract.deployed();

    console.log(`${contractName} deployed to: ${contract.address}`);

    // Save the contract address to a file
    fs.writeFileSync(`./deployed/${contractName}-address.json`, JSON.stringify({ address: contract.address }, null, 2));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
