<script>
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
	web3.eth.defaultAccount = web3.eth.accounts[0];
	var ContractRepoContract = web3.eth.contract(PASTE ABI HERE!);
	var ContractRepo = ContractRepoContract.at('PASTE CONTRACT ADDRESS HERE');
    console.log(ContractRepo);
		
	ContractRepo.getAllContracts((error, result)=>{
        if(!error){
            console.log(result);
        }else{
           console.error(error);
        }
    });

    ContractRepo.getContractCount((error, result)=>{
        if(!error){
            console.log(result);
        }else{
           console.error(error);
        }
    });

    ContractRepo.getOngoingContracts(0,(error, result)=>{
        if(!error){
            console.log(result);
        }else{
            console.error(error);
        }
    });

    ContractRepo.getCompletedContracts((error, result)=>{
        if(!error){
            console.log(result);
        }else{
           console.error(error);
        }
    });

</script>