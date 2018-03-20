pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;


contract Verifier {

    address walletAddress;
    string email;
    string phoneNumber;
    string name;
    string employeeId;
    address[] documentsVerified;
    address[] officersVerified;
    address[] contractorsVerified;

    function Verifier() public {

    }
    
    function setVerifier (address _walletAddress, string _email, string _phoneNumber, string _name, 
    string _employeeId) public returns (bool) {
        walletAddress = _walletAddress;
        email = _email;
        phoneNumber = _phoneNumber;
        name = _name;
        employeeId = _employeeId;
        return true;
    }

    // function login(address userAddress, string role) public  returns (string) {
    // }

    // //unverified
    // function getAllUnverifiedGovernmentOfficers(string token) public returns (address[]) {
    //     //defined in GovernmentOfficerRepo
    // }    

    // function getAllUnverifiedContractors(string token) public returns (address[]) {
    //     //defined in ContractorRepo
    // }   

    // function getAllUnverifiedDocuments(string token) public returns (string[]) {
    //     //getProposalToVerify() in Tender.sol
    // }


    // verification
    function verifyGovernmentOfficer(address govtOfficer) public returns (bool) {
        officersVerified.push(govtOfficer);
        return true;
    }

    function verifyContractor(address contrator) public returns (bool) {
        contractorsVerified.push(contrator);
        return true;
    }

    function verifyProposalDocuments(address tender) public returns (bool) {
        documentsVerified.push(tender);
        return true;
    }

    function myVerifiedDocuments() public view returns (address[]) {
        return documentsVerified;
    }

    function myVerifiedOfficers() public view returns (address[]) {
        return officersVerified;
    }

    function myVerifiedContractors() public view returns (address[]) {
        return contractorsVerified;
    }

    function logout() public returns(bool) {

    }
}