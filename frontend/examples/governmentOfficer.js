<<<<<<< HEAD


var governmentOfficerWalletAddress;
var governmentOfficerNodeAddress;

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}


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



=======


var governmentOfficerWalletAddress;
var governmentOfficerNodeAddress;

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

function register(name, email, walletAddress, employeeId, contact) {
    var success = false;
    FactoryGovernmentOfficerInstance.registerOfficer.call(walletAddress,email,name,contact,employeeId,{gas:30000})
    .then((err, nodeAddress) => {
        if(err) console.log(err);
        console.log("New Officer Address : " + nodeAddress);
        success = true;
        governmentOfficerNodeAddress = nodeAddress;
        GovernmentOfficerRepoInstance.newOfficer.call(governmentOfficerWalletAddress, nodeAddress, {gas:500000}).then((err,res)=>{
            if(err) console.log(err);
            console.log(" Added to MegaOfficerRepo : " + res);
        })
    })
    return success;
}

//TODO : take params in this function and update Tender.sol and FactoryTender.sol
function createTender(governmentOfficerNodeAddress, tenderName, id, organisationChain, 
    referenceNumber, type, category, bidSubmissionClosingDate, bidOpeningDate, covers, 
    clauses, taskName, taskDays) {
    var success = false;
    let governmentOfficerNodeAddress = GovernmentOfficerRepo.getNodeAddress.call(governmentOfficerWalletAddress);
    FactoryTenderInstance.createTender.call(governmentOfficerNodeAddress, tenderName, id, organisationChain, 
        referenceNumber, type, category, bidSubmissionClosingDate, bidOpeningDate, covers, 
        clauses, taskName, taskDays, {gas:500000}).then((err, address) => {
            if(err) console.log(err);
            console.log("New Tender Address : "+ address);
            success = true;
            TenderRepoInstance.newTender.call(address, {gas:500000}).then((err, res)=>{
                if(err) console.log(err);
                console.log("Added to mega tender repo " + res);
            })

        })
    return success;
}

function updateTenderToContract (tenderAddress, contractorAddress, contractName, 
    contractDocumentUrl, taskDescription, deadlineForEachTask, amountForEachTask, reviewtime) {
    var success = false;
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
            success = true;

        })
    return success;
}

//ACTIVE CONTRACTS IN GUI
function getOngoingContracts(){
    var existingContractInfo = [];

    governmentOfficerNodeAddress.getMyContracts.call((err, res) => {
        if(err){
            console.log(err);
            return;
        }
        var activeContracts = res;
        for(var i=0; i < activeContracts.length; i++) {
            var tempAddress = activeContracts[i];
            var tempName = tempAddress.getContractName.call({gas : 5000000});
            var tempDate = tempAddress.getCompletionDate.call({gas : 5000000});

            var tenderObj = {};
            tenderObj.name = tempName;
            tenderObj.completionDate=tempDate;
            existingTenderInfo.push(tenderObj);
        }
        console.log(existingTenderInfo);
        return existingTenderInfo;
    })
}

function getContractInfo(contractAddress) {
    var contractBasicInfo;
    var contractAdvancedInfo;

    contractAddress.getContractBasic.call({gas : 5000000}, (err, res) => {
        if(err){
            console.log(err);
            return;
        }
        contractBasicInfo = res;
    });
    tenderAddress.getContractAdvanced.call({gas : 5000000}, (err, res) => {
        if(err){
            console.log(err);
            return;
        }
        contractAdvancedInfo = res;
    });
    //return both the params
    var tempObject = {};
    tempObject.basic = contractBasicInfo;
    tempObject.advanced = contractAdvancedInfo;
    console.log("Contract Basic Obj : " + JSON.stringify(tempObject));
    return tempObject;
}

// function getPastContracts () {
//     governmentOfficerNodeAddress.getPastContracts.call({gas:500000}, (err, res) => {
//         if(err){
//             console.log(err);
//             return;
//         }

//         console.log("Govt Officers Past Contract Addresses : " + res);
//         return res;
//     })
// }

function getExpiredTenders() {
    var expiredTenderInfo = [];

    governmentOfficerNodeAddress.getExpiredTenders.call({gas:500000}, (err, res) => {
        if(err){
            console.log(err);
            return;
        }
        var expiredTenders = res;
        for(var i=0; i < expiredTenders.length; i++) {
            var tempAddress = expiredTenders[i];
            var tenderBasicInfo;
            tenderAddress.getTenderBasic.call({gas : 5000000}, (err, res) => {
                if(err){
                    console.log(err);
                    return;
                }
                tenderBasicInfo = res;
            });
            var tempName = tenderBasicInfo[1];
            var bidCount = tempAddress.getProposalCount.call({gas : 5000000});
            var tempDate = tempAddress.getBiddindCloseDate.call({gas : 5000000});

            var tenderObj = {};
            tenderObj.name = tempName;
            tenderObj.closingDate = tempDate;
            tenderObj.bids = bidCount;
            existingTenderInfo.push(tenderObj);
        }
        console.log(existingTenderInfo);
        return existingTenderInfo;
    })
}

function verifyTask (contractAddress, index) {
    contractAddress.verifyTask.call(index, {gas:500000}, (err, res)=> {
        if(err) {
            console.log(err);
            return;
        }
        console.log("Verify Task : " + res);
    })
}

function updateContractStatusToComplete (contractAddress) { 
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



>>>>>>> cebb956b3104cc02d5fda9c9b157c5b73a3698f4
