string GovernmentOfficerRepo = "";
string ContractorRepo = "";
string TenderRepo = "";
string ContractRepo = "";
string FactoryGovernmentOfficer = "";
string FactoryContractor = "";
string FactoryTender = "";
string FactoryContract = "";

string governmentOfficerWalletAddress;
string governmentOfficerNodeAddress;

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

var FactoryGovernmentOfficerContract = web3.eth.contract(FactoryGovernmentOfficerAbi);
var FactoryGovernmentOfficerInstance = FactoryGovernmentOfficerContract.at(FactoryGovernmentOfficer);

var GovernmentOfficerRepoContract = web3.eth.contract(GovernmentOfficerRepoAbi);
var GovernmentOfficerRepoInstance = GovernmentOfficerRepoContract.at(GovernmentOfficerRepo); 

var TenderRepoContract = web3.eth.contract(TenderRepoAbi);
var TenderRepoInstance = TenderRepoContract.at(TenderRepo);

var FactoryTenderContract = web3.eth.contract(FactoryTenderAbi);
var FactoryTenderInstance = FactoryTenderContract.at(FactoryTender);



function register = (name, email, walletAddress, employeeId, contact) => {
    FactoryGovernmentOfficerInstance.registerOfficer.call(walletAddress,email,name,contact,employeeId,{gas:30000})
    .then((err, nodeAddress) => {
        if(err) console.log(err);
        console.log("New Officer Address : " + nodeAddress);
        governmentOfficerNodeAddress = nodeAddress;
        GovernmentOfficerRepoInstance.newOfficer.call(governmentOfficerWalletAddress, nodeAddress, {gas:500000}).then((err,res)=>{
            if(err) console.log(err);
            console.log(" Added to MegaOfficerRepo : " + res);
        })
    })
}

//TODO : take params in this function and update Tender.sol and FactoryTender.sol
function createTender = (governmentOfficerNodeAddress, tenderName, id, organisationChain, 
    referenceNumber, type, category, bidSubmissionClosingDate, bidOpeningDate, covers, 
    clauses, taskName, taskDays) => {
    let governmentOfficerNodeAddress = GovernmentOfficerRepo.getNodeAddress.call(governmentOfficerWalletAddress);
    FactoryTenderInstance.createTender.call(governmentOfficerNodeAddress, tenderName, id, organisationChain, 
        referenceNumber, type, category, bidSubmissionClosingDate, bidOpeningDate, covers, 
        clauses, taskName, taskDays, {gas:500000}).then((err, address) => {
            if(err) console.log(err);
            console.log("New Tender Address : "+ address);
            TenderRepoInstance.newTender.call(address, {gas:500000}).then((err, res)=>{
                if(err) console.log(err);
                console.log("Added to mega tender repo " + res);
            })

        })
}

function updateTenderToContract = (tenderAddress, contractorAddress, contractName, 
    contractDocumentUrl, taskDescription, deadlineForEachTask, amountForEachTask, reviewtime) => {
    let governmentOfficerNodeAddress = GovernmentOfficerRepo.getNodeAddress.call(governmentOfficerWalletAddress);
    FactoryContractInstance.createContract.call(tenderAddress, contractorAddress, contractName, 
        contractDocumentUrl, taskDescription, deadlineForEachTask, amountForEachTask, reviewtime, 
        {gas:500000}).then((err, address) => {
            if(err) console.log(err);
            console.log("New contract Address : "+ address);
            ContractorRepoInstance.addToContracts.call(address, {gas:500000}).then((err, res)=>{
                if(err) console.log(err);
                console.log("Added to mega contract repo " + res);
            })
            governmentOfficerNodeAddress.updateTenderToContract.call(tenderAddress,address);

        })
}

//ACTIVE CONTRACTS IN GUI
function getOngoingContracts = () => {
    governmentOfficerNodeAddress.getMyContracts.call({gas:500000}, (err, res) => {
        if(err){
            console.log(err);
            return;
        }

        console.log("Govt Officers Contract Addresses : " + res);
        return res;
    })
}

function getPastContracts = () => {
    governmentOfficerNodeAddress.getPastContracts.call({gas:500000}, (err, res) => {
        if(err){
            console.log(err);
            return;
        }

        console.log("Govt Officers Past Contract Addresses : " + res);
        return res;
    })
}

function getExpiredTenders = () => {
    governmentOfficerNodeAddress.getExpiredContracts.call({gas:500000}, (err, res) => {
        if(err){
            console.log(err);
            return;
        }

        console.log("Govt Officers Expired Contract Addresses : " + res);
        return res;
    })
}

function verifyTask = (contractAddress, index) => {
    contractAddress.verifyTask.call(index, {gas:500000}, (err, res)=> {
        if(err) {
            console.log(err);
            return;
        }
        console.log("Verify Task : " + res);
    })
}

function updateContractStatusToComplete = (contractAddress) => { 
    governmentOfficerNodeAddress.markContractCompleted.call(contractAddress, {gas:500000}, (err, res) => {
        if(err) {
            console.log(err);
            return;
        }
        ContractRepoInstance.updateContractStatusToComplete.call(contractAddress, {gas:50000},(error,result)=>{
            if(error){
                console.log(error);
                return;
            }
            console.log(" Updated contract Status in ContractRepo" + result);
        });
    });
}

//how to update tasks



