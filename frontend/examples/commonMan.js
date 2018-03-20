string TenderRepo = "";
string Tender = "";
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

var TenderRepoContract = web3.eth.contract(TenderRepoAbi);
var TenderRepoInstance = TenderRepoContract.at(TenderRepo);

var TenderContract = web3.eth.contract(TenderAbi);

function existingTenders = () => {
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

            var tenderObj = {};
            tenderObj.address = tempAddress;
            tenderObj.date=tempDate;
            tenderObj.bids = noOfBids;
            
            existingTenderInfo.push(tenderObj);
        }
    })
}

function getTenderInfo = (tenderAddress) => {
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