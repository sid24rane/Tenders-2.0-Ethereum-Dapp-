pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;


contract GovernmentOfficerRepo {
    address[] officers; //all officers verified + unverified
    address[] verifiedOfficers;
    mapping (address=>bool) public verifiedStatus; //true=>verified, false => unverified
    mapping (address=>address) public officerToVerifier;

    function GovernmentOfficerRepo() public {

    }

    function newOfficer(address officerToAppend) public {
        officers.push(officerToAppend);
        verifiedStatus[officerToAppend] = false;
    }
    
    function verifyOfficer(address officerAddress, address verifierAdress) public {
        verifiedOfficers.push(officerAddress);
        verifiedStatus[officerAddress] = true;
        officerToVerifier[officerAddress] = verifierAdress;
    }
    
    function getOfficersCount() public returns (uint256) {
        return officers.length;
    }

    function getVerifiedOfficersCount() public returns (uint256) {
        return verifiedOfficers.length;
    }

    function getOfficers () public returns (address[]) {
        return officers;
    }

    function getVerifiedOfficers () public returns (address[]) {
        return verifiedOfficers;
    }

    function getVerifier(address officerAddress) public returns (address) {
        return officerToVerifier[officerAddress];
    }

    function getVerifiedStatus(address officerAddress) returns (bool) {
        return verifiedStatus[officerAddress];
    }

    function getUnverifiedOfficers(uint256 index) public returns (address) {
        //loop at web3
        if (index > officers.length) revert();
        if (!verifiedStatus[officers[index]]) {
            return officers[index]; 
        }
        revert();
    }
    
}