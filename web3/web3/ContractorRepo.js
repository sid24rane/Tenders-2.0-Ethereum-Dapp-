<script>
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
	web3.eth.defaultAccount = web3.eth.accounts[0];
	var ContractorRepoContract = web3.eth.contract(PASTE ABI HERE!);
	var ContractorRepo = ContractorRepoContract.at('PASTE CONTRACT ADDRESS HERE');
    console.log(ContractorRepo);
		
	ContractorRepo.getVerifiedContractorsCount((error, result)=>{
        if(!error){
            console.log(result);
        }else{
           console.error(error);
        }
    });

    ContractorRepo.getVerifiedContractors((error, result)=>{
        if(!error){
            console.log(result);
        }else{
           console.error(error);
        }
    });

    ContractorRepo.getVerifier(address,(error, result)=>{
        if(!error){
            console.log(result);
        }else{
            console.error(error);
        }
    });

    ContractorRepo.getContractors((error, result)=>{
        if(!error){
            console.log(result);
        }else{
           console.error(error);
        }
    });

    ContractorRepo.getContractorsCount((error, result)=>{
        if(!error){
            console.log(result);
        }else{
           console.error(error);
        }
    });

    ContractorRepo.getVerificationStatus(address,(error, result)=>{
        if(!error){
            console.log(result);
        }else{
            console.error(error);
        }
    });

    ContractorRepo.getUnverifiedContractors(0,(error, result)=>{
        if(!error){
            console.log(result);
        }else{
            console.error(error);
        }
    });


</script>