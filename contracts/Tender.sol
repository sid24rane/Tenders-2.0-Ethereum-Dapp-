pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;


contract Tender {   
    address public governmentOfficerAddress;
    string public tenderName;
    string[] public clauses;
    string[] public constraints;
    uint deadline;

    struct ContractorProposal {
        address contractorAddress;
        string[] quotationClause;
        uint[] quotationAmount;
        //mapping(string=>uint) quotations;
        string[] constraintDocuments;
        ProposalStatus status;
    }

    enum ProposalStatus {
        verified,
        unverified,
        rejected
    }

    ContractorProposal[] public allContractorProposals;
    mapping (address => ProposalStatus) isProposalVerified;

    function Tender(address _governmentOfficerAddress, string _tenderName, string[] _clauses, 
    string[] _constraints, uint _deadline) public {
        governmentOfficerAddress = _governmentOfficerAddress;   
        tenderName = _tenderName;
        clauses = _clauses;
        constraints = _constraints;
        deadline = _deadline;
    }

    function bid(string token, address _contractorAddress,
    string[] _quotationClause, uint[] _quotationAmount, string[] _constraintDocuments) public  {
        ContractorProposal storage temp = allContractorProposals[allContractorProposals.length++];
        temp.contractorAddress = _contractorAddress;
        for (uint i=0; i < _quotationClause.length; i++) {
            temp.quotationClause[i] = _quotationClause[i];
            temp.quotationAmount[i] = _quotationAmount[i];
        }
        for (uint j=0; j < _constraintDocuments.length; j++) {
            temp.constraintDocuments[i] = _constraintDocuments[i];
        }
        temp.status = ProposalStatus.unverified;
    }  

    function getProposalCount() public returns (uint256) {
        return allContractorProposals.length;
    }

    function getProposalsToVerify(uint index) returns (string[], string[][], address) {
        //loop at web3
        string[][] tempDocuments;
        address tempAddresses;
        if (allContractorProposals[index].status == ProposalStatus.unverified) {
            tempDocuments.push(allContractorProposals[index].constraintDocuments);
            tempAddresses = allContractorProposals[index].contractorAddress;
        }
        return (constraints, tempDocuments, tempAddresses);
    }

    function verifyProposal(address contractorAddress) public {
        isProposalVerified[contractorAddress] = ProposalStatus.verified;
    }

    function rejectProposal(address contractorAddress) public {
        isProposalVerified[contractorAddress] = ProposalStatus.rejected;
    }

    function getVerifiedProposals(uint index) returns (string[], string[][], address, uint[]) {
        //loop at web3
        string[][] tempDocuments;
        address tempAddresses;
        uint[] tempAmount;
        if (allContractorProposals[index].status == ProposalStatus.verified) {
            tempDocuments.push(allContractorProposals[index].constraintDocuments);
            tempAddresses = allContractorProposals[index].contractorAddress;
            tempAmount = allContractorProposals[index].quotationAmount;
        }
        return (constraints, tempDocuments, tempAddresses, tempAmount);
    }
    
}