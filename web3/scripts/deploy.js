const hre = require("hardhat");

async function main() {
  const SubscriptionAdExchange = await hre.ethers.getContractFactory("SubscriptionAdExchange");

  const subscriptionAdExchange = await SubscriptionAdExchange.deploy();

  await subscriptionAdExchange.deployed();

  console.log("SubscriptionAdExchange deployed to:", subscriptionAdExchange.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});