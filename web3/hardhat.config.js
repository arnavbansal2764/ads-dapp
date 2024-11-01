require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    myQuickNode: {
      url: "https://late-flashy-tab.ethereum-sepolia.quiknode.pro/88449c5ddb3f0234d1887112454977e03d836069/",
      accounts: [
        "2b6b61454b986a6324aff69f91da707f3f6713ad007093b594cbf68e02f5af7b",
      ],
    },
  },
  solidity: "0.8.20",
};