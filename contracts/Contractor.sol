pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;

import "./Main.sol";


contract Contractor is Main {

    address walletAddress;
    string name;
    string email;
    string phoneNumber;
    string panNumber;
    string gstNumber;

    address[] submittedBids;
    
    function Contractor(address _walletAddress, string _email, string _name,
    string _phoneNumber, string _panNumber, string _gstNumber) public {
        walletAddress = _walletAddress;
        name = _name;
        email = _email;
        phoneNumber = _phoneNumber;
        panNumber = _panNumber;
        gstNumber = _gstNumber;
    }

    function getAllTenders() public returns (address[]) {
            // from megaTenderrepo
            //defined in TenderRepo.sol
    }

    function placeBid() public returns (bool) {
        //defined in Tender.sol
    }

    function getOngoingContracts() public returns (address[]) {
        //defined in Tender.sol
    }

    function logout() public returns (bool) {
    }

}