pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;

import "./Tender.sol";


contract FactoryTender {
    address[] allTenders;

    function FactoryTender() {
    }

    function createTender(address _governmentOfficerAddress, string _tenderName, string _tenderId, 
    string _organisationChain, string _tenderRefNum, string _tenderType, string _tenderCategory,
    uint _bidSubmissionClosingDate, uint _bidOpeningDate, uint _covers, string[] _clauses,
    string[] _taskName, uint[] _taskDays, string[] _constraints) public returns (address) {
        Tender newTender = new Tender();
        newTender.setTenderBasic(address(this), _tenderName, _tenderId, 
        _organisationChain, _tenderRefNum, _tenderType, _tenderCategory,
        _bidSubmissionClosingDate, _bidOpeningDate, _covers);
        newTender.setTenderAdvanced(_clauses,
        _taskName, _taskDays, _constraints);
        allTenders.push(newTender);
        return newTender;
    }
}