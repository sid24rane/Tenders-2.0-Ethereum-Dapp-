pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;

//import "./GovernmentOfficer.sol";


contract GovernmentOfficerRepo {
    address[] public officers; //all officers verified + unverified
    address[] public verifiedOfficers;
    mapping (address=>bool) public verifiedStatus; //true=>verified, false => unverified
    mapping (address=>address) public officerToVerifier;
    mapping (address=>address) public walletAddressToNode;
    function GovernmentOfficerRepo() public {

    }

    //----do not use---- adds the new contract to same byte code
    // function registerOfficer(address _walletAddress, string _email, string _name, 
    // string _phoneNumber, string _employeeId) public returns (address) {
    //     GovernmentOfficer officer = new GovernmentOfficer();
    //     officer.setGovernmentOfficer(_walletAddress, _email, _name, 
    //     _phoneNumber, _employeeId);
    //     this.newOfficer(address(officer));
    //     return officer;
    // }

    function newOfficer(address walletAddress, address nodeAddress) public returns (bool) {
        officers.push(nodeAddress);
        verifiedStatus[nodeAddress] = false;
        mapWalletAddressToNode(walletAddress, nodeAddress);
        return true;
    }
    
    function mapWalletAddressToNode(address walletAddress, address nodeAddress) public {
        walletAddressToNode[walletAddress] = nodeAddress;
    }

    function getNodeAddress(address walletAddress) public view returns (address) {
        return walletAddressToNode[walletAddress];
    }
    
    function verifyOfficer(address officerAddress, address verifierAdress) public {
        verifiedOfficers.push(officerAddress);
        verifiedStatus[officerAddress] = true;
        officerToVerifier[officerAddress] = verifierAdress;
    }
    
    function getOfficersCount() public view returns (uint256) {
        return officers.length;
    }

    function getVerifiedOfficersCount() public view returns (uint256) {
        return verifiedOfficers.length;
    }

    function getOfficers () public view returns (address[]) {
        return officers;
    }

    function getVerifiedOfficers () public view returns (address[]) {
        return verifiedOfficers;
    }

    function getVerifier(address officerAddress) public view returns (address) {
        return officerToVerifier[officerAddress];
    }

    function getVerifiedStatus(address officerAddress) public view returns (bool) {
        return verifiedStatus[officerAddress];
    }

    function getUnverifiedOfficers(uint256 index) public view returns (address) {
        //loop at web3
        if (index > officers.length) revert();
        if (!verifiedStatus[officers[index]]) {
            return officers[index]; 
        }
        revert();
    }
    
}