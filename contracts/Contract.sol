pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;


contract Contract {   
    address public governmentOfficerAddress;
    address public contractorAddress;
    //address public specialOfficerAddress;

    bool public governmentOfficerVerified;
    //bool public specialOfficerVerified;

    string public contractName;
    string public contractDocumentUrl;

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
    
    function setContract (
        address _governmentOfficerAddress, 
        address _contractorAddress, 
        //address _specialOfficerAddress, 
        string _contractName, 
        string _contractDocumentUrl, 
        string[] _taskDescription, 
        uint[] _deadlineForEachTask, 
        uint[] _amountForEachTask, 
        uint _reviewtime) public payable {
        governmentOfficerAddress = _governmentOfficerAddress;
        contractorAddress = _contractorAddress;
        //specialOfficerAddress = _specialOfficerAddress;
        contractName = _contractName;
        contractDocumentUrl = _contractDocumentUrl;
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
        //ContractDeployed();
    }

    function getNumberOfTasks() public constant returns (uint) {
        return tasks.length;
    }

    function getTask(uint index) public constant returns(string, uint, uint, TaskStatus, uint) {
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

    function withdrawForTask(uint _taskIndex) public onlyContractor {
        if (_taskIndex >= tasks.length) revert();
        Task storage task = tasks[_taskIndex];

        if (msg.sender != contractorAddress) revert();
        if (task.status != TaskStatus.complete) revert();

        uint amount = task.amount*(1 ether);
        task.status = TaskStatus.contractorPaid;
        msg.sender.transfer(amount);
    }
}
