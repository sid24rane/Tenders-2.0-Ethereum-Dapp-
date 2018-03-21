var FactoryTender = "0x2c2b9c9a4a25e24b174f26114e8926a9f2128fe4";
var FactoryTenderContract = web3.eth.contract(FactoryTenderAbi);
var FactoryTenderInstance = FactoryTenderContract.at(FactoryTender);

var FactoryContract = "0x9fbda871d559710256a2502a2517b794b482db40";
var FactoryContractAbiDef = web3.eth.contract(FactoryContractAbi);
var FactoryContractInstance = FactoryContractAbiDef.at(FactoryContract);

var FactoryGovernmentOfficer = "0x30753e4a8aad7f8597332e813735def5dd395028";
var FactoryGovernmentOfficerContract = web3.eth.contract(FactoryGovernmentOfficerAbi);
var FactoryGovernmentOfficerInstance = FactoryGovernmentOfficerContract.at(FactoryGovernmentOfficer);

var FactoryContractor = "0x8f0483125fcb9aaaefa9209d8e9d7b9c8b9fb90f";
var FactoryContractorContract = web3.eth.contract(FactoryContractorAbi);
var FactoryContractorInstance = FactoryTenderContract.at(FactoryContractor);

var TenderRepo = "0x75c35c980c0d37ef46df04d31a140b65503c0eed";
var TenderRepoContract = web3.eth.contract(TenderRepoAbi);
var TenderRepoInstance = TenderRepoContract.at(TenderRepo);

var GovernmentOfficerRepo = "0xfb88de099e13c3ed21f80a7a1e49f8caecf10df6";
var GovernmentOfficerRepoContract = web3.eth.contract(GovernmentOfficerRepoAbi);
var GovernmentOfficerRepoInstance = GovernmentOfficerRepoContract.at(GovernmentOfficerRepo); 

var ContractorRepo = "0xf25186b5081ff5ce73482ad761db0eb0d25abfbf";
var ContractorRepoContract = web3.eth.contract(ContractorRepoAbi);
var ContractorRepoInstance = ContractRepoContract.at(ContractorRepo);

var ContractRepo = "0xf12b5dd4ead5f743c6baa640b0216200e89b60da";
var ContractRepoContract = web3.eth.contract(ContractRepoAbi);
var ContractRepoInstance = ContractRepoContract.at(ContractRepo);

var Tender = "0xf204a4ef082f5c04bb89f7d5e6568b796096735a";
var Contract = "0x8cdaf0cd259887258bc13a92c0a6da92698644c0";
var Contractor = "0x345ca3e014aaf5dca488057592ee47305d9b3e10";
var GovernmentOfficer = "0xaa588d3737b611bafd7bd713445b314bd453a5c8";

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}