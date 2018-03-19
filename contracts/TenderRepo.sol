pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;


contract TenderRepo {
    address[] public tenderAddress;

    enum TenderStatus {
        activeOnBid,
        biddingComplete,
        contractDeployed
    }

    mapping (address => TenderStatus) public tenderMapping;

    function TenderRepo() public {
        
    }

    function addToTenders(address tenderToAppend) public {
        tenderAddress.push(tenderToAppend);
        tenderMapping[tenderToAppend] = TenderStatus.activeOnBid;
    }

    function getAllTenders() public returns (address[]) {
        //to be used by verifier
        return tenderAddress;
    }

    function getTenderCount() public returns (uint256) {
        return tenderAddress.length;
    }

    function getOngoingTenders(uint256 index) public returns (address) {
        //loop at web3
        if (index > tenderAddress.length) revert();
        if (tenderMapping[tenderAddress[index]] == TenderStatus.activeOnBid) {
            return tenderAddress[index]; 
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