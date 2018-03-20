pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;


contract Contract {   
    address public governmentOfficerAddress;
    address public contractorAddress;
    string public tenderId;
    string public organisationChain;
    string public tenderRefNum;
    string public tenderType;
    string public tenderCategory;
    uint public creationDate;
    uint public completionDate;
    uint public covers;
    string[] public quotationClauses;
    uint[] public quotationAmount;
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
        string _organisationChain,
        string _tenderRefNum,
        string _tenderType,
        string _tenderCategory,
        uint _creationDate,
        uint _completionDate,
        uint _covers) public payable {
        governmentOfficerAddress = _governmentOfficerAddress;
        contractorAddress = _contractorAddress;
        tenderId = _tenderId;
        organisationChain = _organisationChain;
        tenderRefNum = _tenderRefNum;
        tenderType = _tenderType;
        tenderCategory = _tenderCategory;
        creationDate = _creationDate;
        completionDate = _completionDate;
        covers = _covers;
    }
    function setContractAdvanced (
        string _contractName, 
        uint _finalQuotationAmount,
        string[] _quotationClauses,
        uint[] _quotationAmount,
        string[] _constraints,
        string[] _taskDescription, 
        uint[] _deadlineForEachTask, 
        uint[] _amountForEachTask, 
        uint _reviewtime) public payable {
        contractName = _contractName;
        finalQuotationAmount = _finalQuotationAmount;
        quotationClauses = _quotationClauses;
        quotationAmount = _quotationAmount;
        constraints = _constraints;
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

    function getContractBasic() public view returns ( address, address, string, string, string, string, string,
    uint, uint, uint ) {
        return (governmentOfficerAddress, contractorAddress, tenderId, organisationChain, tenderRefNum, 
        tenderType, tenderCategory, creationDate, completionDate, covers);
    }

    function getContractAdvanced() public view returns (string, uint, string[], uint[], string[], Task[]) {
        return (contractName, finalQuotationAmount, quotationClauses, quotationAmount, 
        constraints, tasks);
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
