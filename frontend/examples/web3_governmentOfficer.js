var governmentOfficerWalletAddress;
var governmentOfficerNodeAddress;

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

function registerGovernmentOfficer(name, email, walletAddress, employeeId, contact) {
    var success = false;
    FactoryGovernmentOfficerInstance.registerOfficer.sendTransaction(walletAddress,email,name,contact,employeeId,{gas:30000})
    .then((err, nodeAddress) => {
        if(err) console.log(err);
        console.log("New Officer Address : " + nodeAddress);
        success = true;
        governmentOfficerNodeAddress = nodeAddress;
        GovernmentOfficerRepoInstance.newOfficer.sendTransaction(governmentOfficerWalletAddress, nodeAddress, {gas:500000}).then((err,res)=>{
            if(err) console.log(err);
            console.log(" Added to MegaOfficerRepo : " + res);
        })
    })
    return success;
}

//TODO : take params in this function and update Tender.sol and FactoryTender.sol
function createTender(governmentOfficerNodeAddress, tenderName, id,
    bidSubmissionClosingDate, bidOpeningDate, covers, 
    clauses, taskName, taskDays) {
    var success = false;
    let governmentOfficerNodeAddress = GovernmentOfficerRepo.getNodeAddress.call(governmentOfficerWalletAddress);
    FactoryTenderInstance.createTender.sendTransaction(governmentOfficerNodeAddress, tenderName, id,
        bidSubmissionClosingDate, bidOpeningDate, covers, clauses, 
        taskName, taskDays, 
        {gas:500000}).then((err, address) => {
            if(err) console.log(err);
            console.log("New Tender Address : "+ address);
            success = true;
            TenderRepoInstance.newTender.sendTransaction(address, {gas:500000}).then((err, res)=>{
                if(err) console.log(err);
                console.log("Added to mega tender repo " + res);
            })

        })
    return success;
}

function createContract(tenderAddress, contractorAddress, amountForEachTask){
    tenderAddress.getTenderInfo.call({gas:500000}, (err,res) => {
        var basic = res.basic;
        var advanced = res.advanced;

        if (updateTenderToContract(basic.governmentOfficerAddress, contractorAddress, basic.tenderName, 
            basic.tenderId, 10000, advanced.constraints, 100000, advanced.taskName, 
            advanced.taskDays, amountForEachTask, 0)){ return true;}else return false;
    });
}

function updateTenderToContract (governmentOfficerNodeAddress,
    contractorAddress, contractName, tenderId, 
    completionTime, 
    constraints, 
    finalQuotationAmount,
    taskDescription, 
    deadlineForEachTask, 
    amountForEachTask, 
    reviewtime) {
    let governmentOfficerNodeAddress = GovernmentOfficerRepo.getNodeAddress.call(governmentOfficerWalletAddress);
    FactoryContractInstance.createContract.sendTransaction(governmentOfficerNodeAddress, contractorAddress, contractName, 
        tenderId,completionTime, constraints, finalQuotationAmount, taskDescription, deadlineForEachTask, 
        amountForEachTask, reviewtime, 
        {gas:500000}).then((err, address) => {
            if(err) {
                console.log(err);
                return false;
            }
            console.log("New contract Address : "+ address);
            ContractRepoInstance.addToContracts.call(address, {gas:500000}).then((err, res)=>{
                if(err) console.log(err);
                console.log("Added to mega contract repo " + res);
            })
            governmentOfficerNodeAddress.updateTenderToContract.sendTransaction(tenderAddress,address);
            contractorAddress.addToContracts.sendTransaction(address, {gas:500000}, (err, res) => {
                if(err) {
                    console.log(err);
                    return false;
                }
                console.log("Added new contract to contractor : " + res);
            })
           return true;
        });
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
            var tempName = tenderBasicInfo.tenderName;
            var bidCount = tempAddress.getProposalCount.call({gas : 5000000});
            var tempDate = tempAddress.getBiddindCloseDate.call({gas : 5000000});

            var tenderObj = {};
            tenderObj.name = tempName;
            tenderObj.closingDate = tempDate;
            tenderObj.bidCount = bidCount;
            tenderObj.address = tempAddress;
            expiredTenderInfo.push(tenderObj);
        }
        console.log(expiredTenderInfo);
        return expiredTenderInfo;
    })
}

function verifyTask(contractAddress, index) {
    contractAddress.verifyTask.sendTransaction(index, {gas:500000}, (err, res)=> {
        if(err) {
            console.log(err);
            return;
        }
        console.log("Verify Task : " + res);
    })
}

function updateContractStatusToComplete(contractAddress) { 
    governmentOfficerNodeAddress.markContractCompleted.sendTransaction(contractAddress, {gas:500000}, (err, res) => {
        if(err) {
            console.log(err);
            return;
        }
        ContractRepoInstance.updateContractStatusToComplete.sendTransaction(contractAddress, {gas:50000},(error,result)=>{
            if(error){
                console.log(error);
                return;
            }
            console.log(" Updated contract Status in ContractRepo : " + result);
            var contractorAddress = contractAddress.contractorAddress;
            contractorAddress.changeContractStatus.sendTransaction(contractAddress, {gas:500000}, (err, res) => {
                if(err){
                    console.log(err);
                    return;
                }
                console.log(" Updated contract Status in Contractor " + res);
            });
        });
    });
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
    contractAddress.getContractAdvanced.call({gas : 5000000}, (err, res) => {
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
    console.log("Tender Basic Obj : " + JSON.stringify(tempObject));
    return tempObject;
}
//getAllBidsOfAn ExpiredTender ==> return 
function getAllBids(expiredTenderAddress) {
    var bidInfo = [];
    expiredTenderAddress.getProposalCount.call({gas:500000}, (err, count) => {
        if(err){
            return false;
        }
        for(var index = 0; index < count; index++){
            expiredTenderAddress.getProposal.call(index, {gas:500000}, (err, res)=>{
                if(err){
                    console.log(err);
                    return;
                }
                bidInfo.push(res);
            });

        }
        return bidInfo;
    });
}

//get All Proposals of a Bid
function getProposalInfo(expiredTenderAddress, index){
    var bidInfo;
    expiredTenderAddress.getProposal.call(index, {gas:500000}, (err,res)=> {
        if(err){
            console.log(err);
            return;
        }
        bidInfo = res;
        console.log("getProposalInfo : " + JSON.stringify(res));
    });
    return bidInfo;
}

//verify Task
function verifyTask(contractAddress, index, flag) {
    contractAddress.verifyTask.call(index, {gas:500000}, (err, res) => {
        if(err){
            console.log(err);
            return false;
        }
        if(res){
            console.log("verification done");
            if(flag){
                //update to past contracts
                ContractRepoInstance.updateContractStatusToComplete.call(contractAddress, {gas:400000}, (err,res)=>{
                    if(err){
                        console.log(err);
                        return false;
                    }
                    console.log(res);
                    return true;
                });
            }
            return true;
        }
    })
}
