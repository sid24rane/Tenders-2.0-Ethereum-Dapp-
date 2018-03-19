<script>
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
	web3.eth.defaultAccount = web3.eth.accounts[0];
	var VerifierContract = web3.eth.contract(PASTE ABI HERE!);
	var Verifier = VerifierContract.at('PASTE CONTRACT ADDRESS HERE');
    console.log(Verifier);
		
	Verifier.myVerifiedDocuments(string,(error, result)=>{
        if(!error){
            console.log(result);
        }else{
           console.error(error);
        }
    });

    Verifier.myVerifiedOfficers(string,(error, result)=>{
        if(!error){
            console.log(result);
        }else{
           console.error(error);
        }
    });

    Verifier.myVerifiedContractors(string,(error, result)=>{
        if(!error){
            console.log(result);
        }else{
           console.error(error);
        }
    });

    
</script>