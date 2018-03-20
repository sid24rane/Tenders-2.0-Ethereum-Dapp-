var TenderRepo = "0x75c35c980c0d37ef46df04d31a140b65503c0eed";
var Tender = "0x82d50ad3c1091866e258fd0f1a7cc9674609d254";

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

var TenderRepoContract = web3.eth.contract(TenderRepoAbi);
var TenderRepoInstance = TenderRepoContract.at(TenderRepo);

var TenderContract = web3.eth.contract(TenderAbi);
