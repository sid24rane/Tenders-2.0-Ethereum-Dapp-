function getUnverifiedOfficers() {
    var unverifiedOfficersInfo = [];
    GovernmentOfficerRepoInstance.getOfficersCount.call({gas:500000}, (err, length)=> {
        if(err){
            console.log(err);
            return;
        }

        for(var index=0; index<length; index++){
            var address = GovernmentOfficerRepoInstance.getUnverifiedOfficers.call(index,{gas:500000});
            var officerObject = {};
            officerObject.name = address.name;
            officerObject.empId = address.employeeId;
            officerObject.address = address;
            unverifiedOfficersInfo.push(officerObject);
        }    
    })
    return unverifiedOfficersInfo;
    
}

function acceptGovernmentOfficer(officerAddress, verifierAddress) {
    GovernmentOfficerRepoInstance.verifyOfficer.call(officerObjectAddress, verifierAddress, {gas:5000000}, (err,res)=>{
        if(err){
            console.log(err);
            return 0;
        }
        console.log("Repo updated with accept status");
        officerAddress.updateOfficerVerifiedStatus.call({gas:5000000}, (err,res)=>{
            if(err){
                console.log(err);
                return 0;
            }
            console.log("Officer updated with accept status");

            verifierAddress.verifyGovernmentOfficer.call(officerAddress, {gas:500000},(err, res) => {
                if(err){
                    console.log(err);
                    return 0;
                }
                console.log("Verifier updated with accept status");
                return 1;
            });
        });
    });
}

function rejectGovernmentOfficer() {
    return 1;
}

function getUnverifiedContractors() {
    var unverifiedContractorsInfo = [];
    ContractorsRepoInstance.getContractorsCount.call({gas:500000}, (err, length)=> {
        if(err){
            console.log(err);
            return;
        }

        for(var index=0; index<length; index++){
            var address = ContractorsRepoInstance.getUnverifiedContractors.call(index,{gas:500000});
            var contractorObject = {};
            contractorObject.name = address.name;
            contractorObject.gstNumber = address.gstNumber;
            contractorObject.address = address;
            unverifiedContractorsInfo.push(officerObject);
        }    
    })
    return unverifiedContractorsInfo;
    
}

function acceptContractor(contractorAddress, verifierAddress) {
    ContractorsRepoInstance.verifyContractor.call(contractorAddress, verifierAddress, {gas:50000}, (err,res)=>{
        if(err){
            console.log(err);
            return 0;
        }
        console.log("contractor Repo updated with accept status");
        contractorAddress.updateOfficerVerifiedStatus.call({gas:50000}, (err,res)=>{
            if(err){
                console.log(err);
                return 0;
            }
            console.log("contractor updated with accept status");
            verifierAddress.verifyContractor.call(contractorAddress, {gas:500000},(err, res) => {
                if(err){
                    console.log(err);
                    return 0;
                }
                console.log("Verifier updated with accept contractor status");
                return 1;
            });
        });
    });
}

function rejectContractor() {
    return 1;
}