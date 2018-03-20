pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;


contract TenderRepo {
    address[] public tenders;
    
    enum TenderStatus {
        activeOnBid,
        biddingComplete,
        contractDeployed
    }

    mapping (address => TenderStatus) public tenderMapping;

    function TenderRepo() public {
        
    }

    function newTender(address tenderToAppend) public returns (bool) {
        tenders.push(tenderToAppend);
        tenderMapping[tenderToAppend] = TenderStatus.activeOnBid;
        return true;
    }

    function getAllTenders() public view returns (address[]) {
        //to be used by verifier
        return tenders;
    }

    function getTenderCount() public view returns (uint256) {
        return tenders.length;
    }

    function getOngoingTenders(uint256 index) public view returns (address) {
        //loop at web3
        if (index > tenders.length) revert();
        if (tenderMapping[tenders[index]] == TenderStatus.activeOnBid) {
            return tenders[index]; 
        }
        revert();
    }

    function updateTenderStatusToBiddingComplete(address tenderAddress) public {
        tenderMapping[tenderAddress] = TenderStatus.biddingComplete;
    }

    function updateTenderStatusToDeployed(address tenderAddress) public {
        tenderMapping[tenderAddress] = TenderStatus.contractDeployed;
    }
}