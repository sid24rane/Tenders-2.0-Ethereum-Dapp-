var FactoryTender = "";
var FactoryTenderContract = web3.eth.contract(FactoryTenderAbi);
var FactoryTenderInstance = FactoryTenderContract.at(FactoryTender);

var FactoryContract = "";
var FactoryContractAbiDef = web3.eth.contract(FactoryContractAbi);
var FactoryContractInstance = FactoryContractAbiDef.at(FactoryContract);

var FactoryGovernmentOfficer = "";
var FactoryGovernmentOfficerContract = web3.eth.contract(FactoryGovernmentOfficerAbi);
var FactoryGovernmentOfficerInstance = FactoryGovernmentOfficerContract.at(FactoryGovernmentOfficer);

var FactoryContractor = "";
var FactoryContractorContract = web3.eth.contract(FactoryContractorAbi);
var FactoryContractorInstance = FactoryTenderContract.at(FactoryContractor);

var TenderRepo = "0x75c35c980c0d37ef46df04d31a140b65503c0eed";
var TenderRepoContract = web3.eth.contract(TenderRepoAbi);
var TenderRepoInstance = TenderRepoContract.at(TenderRepo);

var GovernmentOfficerRepo = "";
var GovernmentOfficerRepoContract = web3.eth.contract(GovernmentOfficerRepoAbi);
var GovernmentOfficerRepoInstance = GovernmentOfficerRepoContract.at(GovernmentOfficerRepo); 

var ContractorRepo = "";
var ContractorRepoContract = web3.eth.contract(ContractorRepoAbi);
var ContractorRepoInstance = ContractRepoContract.at(ContractorRepo);

var ContractRepo = "";
var ContractRepoContract = web3.eth.contract(ContractRepoAbi);
var ContractRepoInstance = ContractRepoContract.at(ContractRepo);

var Tender = "0x82d50ad3c1091866e258fd0f1a7cc9674609d254";
var Contract = "";
var Contractor = "";
var GovernmentOfficer = "";

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}