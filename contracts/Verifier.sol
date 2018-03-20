pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;

import "./Main.sol";


contract Verifier is Main {

    address walletAddress;
    string email;
    string phoneNumber;
    string name;
    string employeeId;
    address[] documentsVerified;
    address[] officersVerified;
    address[] contractorsVerified;

    function Verifier (address _walletAddress, string _email, string _phoneNumber, string _name, 
    string _employeeId) public {
        walletAddress = _walletAddress;
        email = _email;
        phoneNumber = _phoneNumber;
        name = _name;
        employeeId = _employeeId;
    }

    function login(address userAddress, string role) public  returns (string) {
    }

    //unverified
    function getAllUnverifiedGovernmentOfficers(string token) public returns (address[]) {
        //defined in GovernmentOfficerRepo
    }    

    function getAllUnverifiedContractors(string token) public returns (address[]) {
        //defined in ContractorRepo
    }   

    function getAllUnverifiedDocuments(string token) public returns (string[]) {
        //getProposalToVerify() in Tender.sol
    }


    // verification
    function verifyGovernmentOfficer(string token,address govtOfficer) public returns (bool) {
        officersVerified.push(govtOfficer);
        return true;
    }

    function verifyContractor(string token, address contrator) public returns (bool) {
        contractorsVerified.push(contrator);
        return true;
    }

    function verifyProposalDocuments(string token, address tender) public returns (bool) {
        documentsVerified.push(tender);
        return true;
    }

    function myVerifiedDocuments(string token) public returns (address[]) {
        return documentsVerified;
    }

    function myVerifiedOfficers(string token) public returns (address[]) {
        return officersVerified;
    }

    function myVerifiedContractors(string token) public returns (address[]) {
        return contractorsVerified;
    }

    function logout() public returns(bool) {

    }
}