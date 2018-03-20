<script>
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
	web3.eth.defaultAccount = web3.eth.accounts[0];
	var GovernmentOfficerRepoContract = web3.eth.contract(PASTE ABI HERE!);
	var GovernmentOfficerRepo = GovernmentOfficerRepoContract.at('PASTE CONTRACT ADDRESS HERE');
    console.log(GovernmentOfficerRepo);
		
	GovernmentOfficerRepo.getOfficersCount((error, result)=>{
        if(!error){
            console.log(result);
        }else{
           console.error(error);
        }
    });

    GovernmentOfficerRepo.getVerifiedOfficersCount((error, result)=>{
        if(!error){
            console.log(result);
        }else{
           console.error(error);
        }
    });

    GovernmentOfficerRepo.getOfficers((error, result)=>{
        if(!error){
            console.log(result);
        }else{
           console.error(error);
        }
    });

    GovernmentOfficerRepo.getVerifiedOfficers((error, result)=>{
        if(!error){
            console.log(result);
        }else{
           console.error(error);
        }
    });

    GovernmentOfficerRepo.getVerifier(address,(error, result)=>{
        if(!error){
            console.log(result);
        }else{
           console.error(error);
        }
    });

    GovernmentOfficerRepo.getVerifiedStatus(address,(error, result)=>{
        if(!error){
            console.log(result);
        }else{
           console.error(error);
        }
    });

    GovernmentOfficerRepo.getUnverifiedOfficers(0,(error, result)=>{
        if(!error){
            console.log(result);
        }else{
           console.error(error);
        }
    });

    
</script>