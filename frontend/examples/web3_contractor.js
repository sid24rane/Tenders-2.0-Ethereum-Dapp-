var contractorWalletAddress;
var contractorNodeAddress;

function registerContractor(name, email, walletAddress, pan, contact, gst) {
    var success = false;
    FactoryContractorInstance.registerNewContractor.call(walletAddress,email,name,contact,pan,gst,{gas:30000})
    .then((err, nodeAddress) => {
        if(err) console.log(err);
        console.log("New Contractor Address : " + nodeAddress);
        success = true;
        contractorNodeAddress = nodeAddress;
        ContractorRepoInstance.newContractor.call(contractorNodeAddress, nodeAddress, {gas:500000}).then((err,res)=>{
            if(err) console.log(err);
            console.log(" Added to MegaContractorRepo : " + res);
        })
    })
    return success;
}

var existingTenderInfo = [];
function getExistingTenders(){
    //this func returns all tenders on which Contractor can bid;

    TenderRepoInstance.getTenderCount.call((err, count) => {
        if(err){
            console.log(err);
            return;
        }

        for(var i=0; i < count; i++) {
            var tempAddress = TenderRepoInstance.getOngoingTenders.call(i);
            var tempBasic = tempAddress.getTenderBasic.call({gas : 5000000});

            var tenderObj = {};
            tenderObj.address = tempAddress;
            tenderObj.name = tempBasic.tenderName;
            tenderObj.bidSubmissionClosingDate = tempBasic.bidSubmissionClosingDate;
            tenderObj.bidOpeningDate = tempBasic.bidOpeningDate;
            
            console.log("Existing tenders for Contractors info : "  + JSON.stringify(tenderObj));
            existingTenderInfo.push(tenderObj);
        }
        console.log(existingTenderInfo);
        return existingTenderInfo;
    })
}

var placedBidsInfo = [];
function placedBids(contractorAddress) {
    
    contractorAddress.getPlacedBids.call({gas:5000000}, (err, res) => {
        if(err){
            console.log(err);
            return;
        }
        console.log("Placed Bids Address : " + res);
        for(var i = 0; i < res.length; i++) {
            var bidStatus = contractorAddress.getBidStatus(res[i]).call();
            if(bidStatus){
                res[i].getTenderBasic.call({gas : 5000000}, (err, result) => {
                    if(err){
                        console.log(err);
                        return;
                    }
                    console.log(JSON.stringify(result));
                    var tempObj = {};
                    tempObj.tenderInfo = result;
                    tempObj.status = TenderRepoInstance.getTenderStatus.call(res[i],{gas:500000});
                    placedBidsInfo.push(tempObj);
                });
            }    
        }
        return placedBidsInfo;
    });

}

function getTenderInfo(tenderAddress) {
    var tenderBasicInfo;
    var tenderAdvancedInfo;

    tenderAddress.getTenderBasic.call({gas : 5000000}, (err, res) => {
        if(err){
            console.log(err);
            return;
        }
        tenderBasicInfo = res;
    });
    tenderAddress.getTenderAdvanced.call({gas : 5000000}, (err, res) => {
        if(err){
            console.log(err);
            return;
        }
        tenderAdvancedInfo = res;
    });
    //return both the params
    var tempObject = {};
    tempObject.basic = tenderBasicInfo;
    tempObject.advanced = tenderAdvancedInfo;
    console.log("Tender Basic Obj : " + JSON.stringify(tempObject));
    return tempObject;
}

var activeContracts = [];
function getActiveContractsBasicInfo(contractorAddress) {
    var activeContractsBasicInfo = [];
    
    contractorAddress.getContracts.call({gas:500000}, (err, contracts)=>{
        if(err){
            console.log(err);
            return;
        }
        for(var i = 0; i < contracts.length; i++){
            var contractStatus = contractorAddress.getContractStatus.call(contracts[i], {gas:500000});
            if(contractStatus) {
                activeContracts.push(contracts[i]);
                activeContractsBasicInfo.push(getContractInfo(contracts[i], 0));
            }
        }
        var tempObj = {};
        tempObj.allInfo = activeContractsBasicInfo;
        tempObj.activeContracts = activeContracts;
        return tempObj;
    });
}

//call with value 1 if only advanced info required
function getContractInfo(contractAddress, value) {
    var contractBasicInfo;
    var contractAdvancedInfo;
    var tasks;

    contractAddress.getContractBasic.call({gas : 5000000}, (err, res) => {
        if(err){
            console.log(err);
            return;
        }
        contractBasicInfo = res;
        if(value == 0){
            return contractBasicInfo;
        }
    });
    contractAddress.getContractAdvanced.call({gas : 5000000}, (err, res) => {
        if(err){
            console.log(err);
            return;
        }
        contractAdvancedInfo = res;
        if(value == 1){
            return contractAdvancedInfo;
        }
    });

    var tempObject = {};
    tempObject.basic = contractBasicInfo;
    tempObject.advanced = contractAdvancedInfo;

    var count = contractAddress.getNumberOfTasks.call({gas:500000});
    for(var i=0; i < count; i++){
        var task = contractAddress.getTask.call(i, {gas:5000000});
        tempObject.tasks.push(task);
    }

    console.log("Contract Basic Obj : " + JSON.stringify(tempObject));
    return tempObject;
}

function placeBid(tenderAddress, quotation){
    
    tenderAddress.bid.call(contractorAddress, quotation.quotationClause, quotation.quotationAmount, documents, {gas:50000000}, 
    (err,res) => {
        if(err){
            console.log(err);
            return;
        }
        console.log("Bid added in Tender.sol : " + res);
        contractorAddress.placeBid.call(tenderAddress, {gas:500000}, (err, res)=>{
            if(err){
                console.log(err);
                return;
            }
            console.log("Bid added in Contractor.sol : " + res);
            return true;
        })    
    });
}

function markTaskAsCompleted(contractAddress, index){
    contractAddress.taskCompletedByContractor.sendTransaction(index, {gas:500000}, (err, res) => {
        if(err){
            console.log(err);
            return false;
        }
        console.log("Withdrawn from contact successfully : " + res);
    });
    return true;
}

function withdrawMoneyForTask(contractAddress, index) {
    contractAddress.withdrawForTask.sendTransaction(index, {gas:500000}, (err,res)=>{
        if(err){
            console.log(err);
            return false;
        }
        console.log("Withdrawn from contact successfully : " + res);
    });
    return true;
}