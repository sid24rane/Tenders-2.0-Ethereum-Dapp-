pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;


contract GovernmentOfficerRepo {
    address[] officerAddress;
    mapping (address=>bool) public verifiedStatus;

    function getAllOfficer () public returns (address[]) {
        return officerAddress;
    }

    function getOfficerCount() public returns (uint256) {
        return officerAddress.length;
    }

    function getUnverifiedOfficer(uint256 index) public returns (address) {
        //loop at web3
        if (index > officerAddress.length) revert();
        if (!verifiedStatus[officerAddress[index]]) {
            return officerAddress[index]; 
        }
        revert();
    }

    function addToAllOfficer(address officerToAppend) public {
        officerAddress.push(officerToAppend);
        verifiedStatus[officerToAppend] = false;
    }
    
    function updateOfficerToVerified(address officerToVerify) public {
        verifiedStatus[officerToVerify] = true;
    }
}