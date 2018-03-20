pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;

import "./Contract.sol";


contract FactoryContract {
    address[] allContracts;

    function FactoryContract() {
    }

    function createContract(address govtOfficerAddress,
        address _contractorAddress, string _contractName, string _tenderId, 
        uint _completionTime, 
        string[] _constraints, 
        uint _finalQuotationAmount,
        string[] _taskDescription, 
        uint[] _deadlineForEachTask, 
        uint[] _amountForEachTask, 
        uint _reviewtime) public returns (address) {
        
        Contract newContract = new Contract();
        
        newContract.setContractBasic(govtOfficerAddress, 
        _contractorAddress, 
        _tenderId,
        _completionTime,
        _constraints
        );

        newContract.setContractAdvanced(_contractName, 
        _finalQuotationAmount,
        _taskDescription, 
        _deadlineForEachTask, 
        _amountForEachTask, 
        _reviewtime);

        allContracts.push(newContract);
        return newContract;
    }
}