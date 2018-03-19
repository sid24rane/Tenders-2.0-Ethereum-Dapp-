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

    modifier onlyLoggedIn{
    }

    function login(address userAddress,string role) public  returns (string){
    }

    //unverified
    function getAllUnverifiedGovernmentOfficers(string token) public onlyLoggedIn returns (address[]){
    }    

    function getAllUnverifiedContractors(string token) public onlyLoggedIn returns (address[]){
    }   

    function getAllUnverifiedDocuments(string token) public onlyLoggedIn returns (string[]) {
    }


    // verification
    function verifyGovernmentOfficer(string token,address govtOfficer) public OnlyLoggedIn returns (bool){
    }

    function verifyContractor(string token,) public returns (bool){
    }

    function verifyProposalDocuments(string token,) public returns (bool){
    }

    function logout() public returns(bool){

    }
}