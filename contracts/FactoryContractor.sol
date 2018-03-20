pragma solidity ^0.4.20;

import "./Contractor.sol";

contract FactoryContractor {
    address[] allContractors;

    function FactoryContractor() public {

    }
    
    //----do not use---- adds the new contract to same byte code--useless shit.
    function registerNewContractor(address _walletAddress, string _email, string _name,
    string _phoneNumber, string _panNumber, string _gstNumber) public returns (address) {
        Contractor contractor = new Contractor();
        contractor.setContractor(_walletAddress, _email, _name,
        _phoneNumber, _panNumber, _gstNumber);
        allContractors.push(contractor);
        return contractor;
    }
}