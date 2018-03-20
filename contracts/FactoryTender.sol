pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;

import "./Tender.sol";


contract FactoryTender {
    address[] allTenders;

    function FactoryTender() {
    }

    function createTender(address governmentOfficerAddress, string tenderName, string tenderId, 
    //string organisationChain, string tenderRefNum,
    uint bidSubmissionClosingDate, uint bidOpeningDate, uint covers, string[] clauses,
    string[] taskName, uint[] taskDays, 
    string[] constraints) public returns (address) {
        Tender newTender = new Tender();
        newTender.setTenderBasic(this, tenderName, tenderId, 
        //organisationChain, tenderRefNum,
        bidSubmissionClosingDate, bidOpeningDate, covers);
        newTender.setTenderAdvanced(clauses,
        taskName, taskDays, 
        constraints);
        allTenders.push(newTender);
        return newTender;
    }
}