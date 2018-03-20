pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;

import "./Contract.sol";


contract FactoryContract {
    address[] allContracts;

    function FactoryContract() {
    }

    function createContract(address tenderAddress,
        address _contractorAddress, 
         //address _specialOfficerAddress, 
        string _contractName, 
        string _contractDocumentUrl, 
        string[] _taskDescription, 
        uint[] _deadlineForEachTask, 
        uint[] _amountForEachTask, 
        uint _reviewtime) public returns (address) {
        Contract newContract = new Contract();
        newContract.setContract(address(this), _contractorAddress, _contractName, 
        _contractDocumentUrl, _taskDescription, _deadlineForEachTask, 
        _amountForEachTask, _reviewtime);
        allContracts.push(newContract);
        return newContract;
    }
}