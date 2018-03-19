pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;

import "./Main.sol";


contract SpecialOfficer is Main {
    
    address walletAddress;
    string email;
    string phoneNumber;
    string name;
    string employeeId; 

    function SpecialOfficer (address _walletAddress, string _email, string _phoneNumber, 
    string _name, string _employeeId) public {
        walletAddress = _walletAddress;
        email = _email;
        phoneNumber = _phoneNumber;
        name = _name;
        employeeId = _employeeId;
    }

    function login(address userAddress, string role) public  returns (string) {
    }

    function logout() public returns (bool) {

    }
}