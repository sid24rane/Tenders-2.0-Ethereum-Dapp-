pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;


contract Contract {   
    address public governmentOfficerAddress;
    address public contractorAddress;
    string tenderId;
    uint public creationDate;
    uint public completionDate;
    string[] public constraints;
    uint finalQuotationAmount;
    //address public specialOfficerAddress;

    bool public governmentOfficerVerified;
    //bool public specialOfficerVerified;

    string public contractName;

    mapping (uint=>Task) private taskIndexMapping;
    
    struct Task {
        string description;
        uint deadlineTime;
        uint amount; 
        TaskStatus status;
        uint completionTime; 
    }

    enum TaskStatus {
        pending,
        reportedComplete,
        partiallyVerified,
        complete,
        contractorPaid
    }

    Task[] public tasks;

    modifier onlyGovernmentOfficer {
        if (msg.sender != governmentOfficerAddress) {
            revert();
            _;
        }
    }

    modifier onlyContractor {
        if (msg.sender != contractorAddress) {
            revert();
            _;
        }
    }

    // modifier onlySpecialOfficer {
    //     if (msg.sender != specialOfficerAddress) {
    //         revert();
    //         _;
    //     }
    // }

    function Contract() public {

    }
    
    function setContractBasic (
        address _governmentOfficerAddress, 
        address _contractorAddress, 
        string _tenderId,
        uint _completionDate,
        string[] _constraints
        ) public payable {
        governmentOfficerAddress = _governmentOfficerAddress;
        contractorAddress = _contractorAddress;
        tenderId = _tenderId;
        constraints = _constraints;
        creationDate = now;
        completionDate = _completionDate;
    }

    function setContractAdvanced (
        string _contractName, 
        uint _finalQuotationAmount,
        string[] _taskDescription, 
        uint[] _deadlineForEachTask, 
        uint[] _amountForEachTask, 
        uint _reviewtime) public payable {
        
        contractName = _contractName;
        finalQuotationAmount = _finalQuotationAmount;
        uint totalAmount = 0;
        for (uint i=0; i < _taskDescription.length; i++) {
            Task storage task = tasks[tasks.length++];
            task.description = _taskDescription[i];
            task.deadlineTime = _deadlineForEachTask[i];
            task.amount = _amountForEachTask[i];
            totalAmount += task.amount*(1 ether);
            task.status = TaskStatus.pending;
            taskIndexMapping[i] = task;
        }
        if (totalAmount > msg.value*(1 ether)) {
            revert();
        }
        if (totalAmount > finalQuotationAmount) {
            revert();
        }
        //ContractDeployed();
    }

    function getContractBasic() public view returns (string, address, address, string,
    uint, uint) {
        return (contractName, governmentOfficerAddress, contractorAddress, tenderId,
        creationDate, completionDate);
    }

    function getContractAdvanced() public view returns (string, uint, string[]) {
        return (contractName, finalQuotationAmount, 
        constraints);
    }

    function getContractName() public view returns (string) {
        return contractName;
    }

    function getCompletionDate() public view returns (uint) {
        return completionDate;
    }

    function getNumberOfTasks() public view returns (uint) {
        return tasks.length;
    }

    function getTask(uint256 index) public view returns (string, uint, uint, TaskStatus, uint) {
        return (tasks[index].description, tasks[index].deadlineTime, tasks[index].amount,
        tasks[index].status, tasks[index].completionTime);
    }

    function taskCompletedByContractor(uint _taskIndex) public onlyContractor {
        if (_taskIndex >= tasks.length) revert();
        Task storage task = tasks[_taskIndex];

        if (msg.sender != contractorAddress) revert();
        if (task.status != TaskStatus.pending) revert();
        if (now > task.deadlineTime) revert();
        task.status = TaskStatus.reportedComplete;
        task.completionTime = now;
        //eventToFire
    }

    function verifyTask(uint _taskIndex) public onlyGovernmentOfficer returns (bool) {
        if (_taskIndex >= tasks.length) revert();
        Task storage task = tasks[_taskIndex];

        if (task.status != TaskStatus.reportedComplete) revert();
        if (msg.sender == governmentOfficerAddress) {
            governmentOfficerVerified = true;
            task.status = TaskStatus.complete;
            return true;
        // }else if (msg.sender == specialOfficerAddress) {
        //     specialOfficerVerified = true;
        //     task.status = TaskStatus.partiallyVerified;
        // }
        }else {
            revert();
        }

        // if (governmentOfficerVerified && specialOfficerVerified) {
        //     task.status = TaskStatus.complete;
        // }
    }

    function withdrawForTask(uint _taskIndex) public onlyContractor returns (bool) {
        if (_taskIndex >= tasks.length) revert();
        Task storage task = tasks[_taskIndex];

        if (msg.sender != contractorAddress) revert();
        if (task.status != TaskStatus.complete) revert();

        uint amount = task.amount*(1 ether);
        task.status = TaskStatus.contractorPaid;
        msg.sender.transfer(amount);
        return true;
    }
}
