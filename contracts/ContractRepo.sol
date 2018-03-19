pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;


contract ContractRepo {
    address[] public contractAddress;
    address[] public completedContracts; //used for quick access to Completed Contracts

    enum ContractStatus {
        onGoing,
        complete
    }

    mapping (address => ContractStatus) public contractMapping;

    function ContractRepo() public {

    }

    function addToContracts(address contractToAppend) public {
        contractAddress.push(contractToAppend);
        contractMapping[contractToAppend] = ContractStatus.onGoing;
    }

    function getAllContracts() public view returns (address[]){
        return contractAddress;
    }

    function getContractCount() public view returns (uint256){
        return contractAddress.length;
    }

    function getOngoingContracts(uint256 index) public view returns (address) {
        //loop at web3
        if (index > contractAddress.length) revert();
        if (contractMapping[contractAddress[index]] == ContractStatus.onGoing) {
            return contractAddress[index]; 
        }
        revert();
    }

    function getCompletedContracts() public view returns (address[]) {
        return completedContracts;
    }

    function updateContractStatusToComplete(address contractAddress) public {
        contractMapping[contractAddress] = ContractStatus.complete;
        completedContracts.push(contractAddress);
    }

}