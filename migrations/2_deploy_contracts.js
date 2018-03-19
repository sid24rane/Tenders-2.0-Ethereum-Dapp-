var TenderContract = artifacts.require("./TenderContract.sol");

module.exports = function(deployer) {
  deployer.deploy(TenderContract);
};
