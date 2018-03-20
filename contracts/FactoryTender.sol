pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;

import "./Tender.sol";


contract FactoryTender {
    address[] allTenders;

    function FactoryTender() {
    }

    function createTender(address _governmentOfficerAddress, string _tenderName, string[] _clauses, 
    string[] _constraints, uint _deadline) public returns (address) {
        Tender newTender = new Tender();
        newTender.setTender(address(this), _tenderName, _clauses, 
        _constraints, _deadline);
        allTenders.push(newTender);
        return newTender;
    }
}