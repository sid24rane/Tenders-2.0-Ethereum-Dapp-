pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;

import "./Main.sol";

contract Verifier is Main{

    address walletAddress;
    string email;
    string phoneNumber;
    string name;
    string employeeId;   

    function Verifier(address _walletAddress,string _email,string _phoneNumber,string _name,string _employeeId){
        walletAddress = _walletAddress;
        email = _email;
        phoneNumber = _phoneNumber;
        name = _name;
        employeeId = _employeeId;
    }

    function login(address userAddress,string role) public  returns (string){
    }

    //unverified
    function getAllUnverifiedGovernmentOfficers(string token) public  returns (address[]){
    }    

    function getAllUnverifiedContractors(string token) public  returns (address[]){
    }   

    function getAllUnverifiedDocuments(string token) public  returns (string[]) {
    }


    // verification
    function verifyGovernmentOfficer(string token,address govtOfficer) public  returns (bool){
    }

    function verifyContractor(string token,) public returns (bool){
    }

    function verifyProposalDocuments(string token,) public returns (bool){
    }

    function logout() public returns(bool){

    }
}