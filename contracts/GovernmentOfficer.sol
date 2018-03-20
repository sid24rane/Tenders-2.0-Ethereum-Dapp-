pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;


contract GovernmentOfficer {
    
    address public walletAddress;
    string public email;
    string public phoneNumber;
    string public name;
    string public employeeId; 
    bool isVerified;

    address[] public tenders;
    address[] public pastTenders;
    address[] public expiredTenders;

    address[] public contracts;
    address[] public pastContracts;

    mapping (address=>bool) public contractStatus; //true => past, false => active
    mapping (address=>address) public tenderToContract;

    function GovernmentOfficer() public {

    }

    function setGovernmentOfficer(address _walletAddress, string _email, string _name, 
    string _phoneNumber, string _employeeId) {
        walletAddress = _walletAddress;
        email = _email;
        phoneNumber = _phoneNumber;
        name = _name;
        employeeId = _employeeId;
        isVerified = false;
    }

    function getMyContracts() public view returns (address[]) {
        return contracts;
    }

    function getPastContracts() public view returns (address[]) {
        return pastContracts;
    }

    function markContractCompleted (address contractAddress) public returns (bool) {
        //remove from contracts and add to pastContracts
        for (uint256 i=0; i < contracts.length; i++) {
            if (contracts[i] == contractAddress) {
                pastContracts.push(contractAddress);
                contractStatus[contractAddress] = true;
                delete contracts[i];
                return true;
            }
        }
        return false;
    }

    function addToMyContracts(address contractAddress) public view returns (address) {
        //call when createContract button is clicked => web3
        contracts.push(contractAddress);
    }

    function addToMyTenders(address tenderAddress) public view returns (address) {
        //look at web3 for address 
        tenders.push(tenderAddress);
    }

    function getMyTenders() public view returns (address[]) {
        return tenders;
    }

    function getPastTenders() public view returns (address[]) {
        return pastTenders;
    }

    function updateTenderToExpired(address tenderAddress) 
    public returns (bool) {
        //removeFromMyTender and add to past Tenders
        for (uint i=0; i < tenders.length; i++) {
            if (tenders[i] == tenderAddress) {
                expiredTenders.push(tenderAddress);
                delete tenders[i];
                return true;
            }
        }
        return false;
    }

    function getExpiredTenders() public view returns (address[]) {
        return expiredTenders;
    }

    function updateTenderToContract(address tenderAddress, address contractAddress) 
    public returns (bool) {
        //removeFromMyTender and add to past Tenders
        for (uint i=0; i < tenders.length; i++) {
            if (expiredTenders[i] == tenderAddress) {
                pastTenders.push(tenderAddress);
                tenderToContract[expiredTenders[i]] = contractAddress;
                contracts.push(contractAddress);
                contractStatus[contractAddress] = false;
                delete expiredTenders[i];
                return true;
            }
        }
        return false;
    }

    function updateOfficerVerifiedStatus() public {
        isVerified = true;
    }

}