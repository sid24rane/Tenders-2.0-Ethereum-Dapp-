function getExistingTenders(){
    var existingTenderInfo = [];

    TenderRepoInstance.getTenderCount.call((err, count) => {
        if(err){
            console.log(err);
            return;
        }

        for(var i=0; i < count; i++) {
            var tempAddress = TenderRepoInstance.getOngoingTenders.call(i);
            var tempDate = tempAddress.getBiddindCloseDate.call({gas : 5000000});
            var noOfBids = tempAddress.getProposalCount.call({gas : 5000000});
            var tempName = tempAddress.getTenderName.call({gas:5000000})     
            var tenderObj = {};
            tenderObj.address = tempAddress;
            tenderObj.name = tempName;
            tenderObj.closingDate=tempDate;
            tenderObj.bidCount = noOfBids;
            
            existingTenderInfo.push(tenderObj);
        }
        console.log(existingTenderInfo);
        return existingTenderInfo;
    })
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

function getOnGoingContracts() {
    var onGoingContractAddress = [];
    ContractRepoInstance.getContractCount.call({gas:500000}, (err, count) => {
        if(err){
            console.log(err);
            return;
        }
        for(var i= 0; i < count; i++) {
            var address = ContractRepoInstance.getOngoingContracts.call(index,{gas:500000});
            if(address != null){
                var contractBasic = address.getContractBasic.call({gas:500000});
                var contractAdvanced = address.getContractAdvanced.call({gas:500000});

                var contractInfo = {};
                contractInfo.name = contractAdvanced.name;
                contractInfo.completionDate = contractBasic.completionDate;
                contractInfo.finalQuotationAmount = contractAdvanced.finalQuotationAmount;
                contractInfo.address = address;
                onGoingContractAddress.push(contractInfo);
            }
        }   
        return onGoingContractAddress;
    });
}

function getOnGoingContractDetails(contractAddress){
    var contractBasic = address.getContractBasic.call({gas:500000});
    var contractAdvanced = address.getContractAdvanced.call({gas:500000});
    var tempObject = {};
    tempObject.basic = contractBasic;
    tempObject.advanced = contractAdvanced;
    tempObject.tasks = []
    var count = address.getNumberOfTasks.call({gas:500000});
    for(var i=0; i < count; i++){
        var task = address.getTask.call(i, {gas:5000000});
        tempObject.tasks.push(task);
    }

    return tempObject;
}