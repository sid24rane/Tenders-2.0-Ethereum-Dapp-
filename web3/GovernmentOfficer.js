    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    web3.eth.defaultAccount = web3.eth.accounts[0];
    var GovernmentOfficerContract = web3.eth.contract(PASTE ABI HERE!);
    var GovernmentOfficer = GovernmentOfficerContract.at('PASTE CONTRACT ADDRESS HERE');
    console.log(GovernmentOfficer);

    GovernmentOfficer.getMyContracts(string, (error, result) => {
        if (!error) {
            console.log(result);
        } else {
            console.error(error);
        }
    });

    GovernmentOfficer.getPastContracts(string, (error, result) => {
        if (!error) {
            console.log(result);
        } else {
            console.error(error);
        }
    });

    GovernmentOfficer.getMyTenders(string, (error, result) => {
        if (!error) {
            console.log(result);
        } else {
            console.error(error);
        }
    });

    GovernmentOfficer.getPastTenders(string, (error, result) => {
        if (!error) {
            console.log(result);
        } else {
            console.error(error);
        }
    });