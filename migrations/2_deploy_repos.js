var GovernmentOfficerRepo = artifacts.require("./GovernmentOfficerRepo.sol");
var TenderRepo = artifacts.require("./TenderRepo.sol");
var ContractRepo = artifacts.require("./ContractRepo.sol");
var ContractorRepo = artifacts.require("./ContractorRepo.sol");
var Contract = artifacts.require("./Contract.sol");
var Contractor = artifacts.require("./Contractor.sol");
var GovernmentOfficer = artifacts.require("./GovernmentOfficer.sol");
var Tender = artifacts.require("./Tender.sol");
var Verifier = artifacts.require("./Tender.sol");

module.exports = function(deployer) {
  deployer.deploy(GovernmentOfficerRepo);
  deployer.deploy(TenderRepo);
  deployer.deploy(ContractRepo);
  deployer.deploy(ContractorRepo);
  deployer.deploy(Contract);
  deployer.deploy(Contractor);
  deployer.deploy(GovernmentOfficer);
  deployer.deploy(Tender);
  deployer.deploy(Verifier);

};
