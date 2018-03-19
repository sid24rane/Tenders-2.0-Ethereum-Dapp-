var GovernmentOfficerRepo = artifacts.require("./GovernmentOfficerRepo.sol");
var TenderRepo = artifacts.require("./TenderRepo.sol");
var ContractRepo = artifacts.require("./ContractRepo.sol");
var ContractorRepo = artifacts.require("./ContractorRepo.sol");

module.exports = function(deployer) {
  deployer.deploy(GovernmentOfficerRepo);
  deployer.deploy(TenderRepo);
  deployer.deploy(ContractRepo);
  deployer.deploy(ContractorRepo);
};
