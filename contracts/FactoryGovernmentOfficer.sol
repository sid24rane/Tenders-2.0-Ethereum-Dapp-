    pragma solidity ^0.4.20;
    pragma experimental ABIEncoderV2;

    import "./GovernmentOfficer.sol";


    contract FactoryGovernmentOfficer {
        address[] allOfficers;

        function FactoryGovernmentOfficer() {
        }

        function registerOfficer(address _walletAddress, string _email, string _name, 
        string _phoneNumber, string _employeeId) public returns (address) {
            GovernmentOfficer newOfficer = new GovernmentOfficer();
            newOfficer.setGovernmentOfficer(_walletAddress, _email, _name, 
            _phoneNumber, _employeeId);
            allOfficers.push(newOfficer);
            return newOfficer;
        }

        function returnString() public returns (string) {
            return "HelloWorld";
        }

        function returnInt() public returns (uint) {
            return 10;
        }
    }