pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;


contract Contractor {

    address walletAddress;
    string name;
    string email;
    string phoneNumber;
    string panNumber;
    string gstNumber;
    bool isVerified;

    function Contractor() public {

    }
    
    function setContractor(address _walletAddress, string _email, string _name,
    string _phoneNumber, string _panNumber, string _gstNumber) public {
        walletAddress = _walletAddress;
        name = _name;
        email = _email;
        phoneNumber = _phoneNumber;
        panNumber = _panNumber;
        gstNumber = _gstNumber;
        isVerified = false;
    }

    function updateOfficerVerifiedStatus() public {
        isVerified = true;
    }
}