# TENDER 2.0

This is a platform for tender creation and contract assignment process.Through this we attempt to bring transparency in the process using a emerging Block-Chain Technology.

## Problem Statement
Lack of transparency in the tendering process and assigning contracts to agencies for road development has led to unwise use of money and the spirit of speculation. 

## Proposed Solution
We plan to bring transparency in this system by making the records of tenders public using Blockchain technology. Bidding of tenders will take place on our platform and comparatives of bids will be verified by all.
Once the tenders have been approved, the final payment system for the contract will also be blockchain based payment which ensures that no records have been tempered with and defect liability clauses in contract are implemented properly. 

## Use Cases

There are four main actors interacting with the system.

#### Government Official
- Creates new tenders 
- Monitor existing tenders
- Give the contract for a particular tender to the contractor
- Monitor ongoing contracts
- Verify the task completed by the contractor

#### Contractor
- View all Tenders
- Place bids on the active Tenders
- Gets contract assigned from Government officials
- Withdraw Tokens once task completion verified by Officials

#### Verifier
- Authenticates Government officials and contractors

#### Common People
- View all tenders
- View status of all ongoing contracts
- View the insights of past contracts

## Benefits
* ###### Transparency in System
* ###### Diminishing Corruption
* ###### No one can view bids before closing date
* ###### Decentralized Database
* ###### Login using only wallet address
* ###### Encrypted data
* ###### Milestone (Task Completion) Tracking
* ###### Review time with penalty
* ###### Own Cryptocurrency

## Prerequisites
#### Geth Client
			https://geth.ethereum.org/downloads/
    
#### Node.js
			https://nodejs.org/en/download/
            
#### truffle
			http://truffleframework.com/docs/getting_started/installation
			
#### Ganache (optional)
			http://truffleframework.com/ganache/

#### MetaMask
			https://metamask.io/

## Running the Dapp locally

You can run the app locally using truffle. 

    git clone https://github.com/scoco97/TenderSystem---Blockchain
    cd TenderSystem---Blockchain
    npm install -g truffle     // if not already installed
    npm install truffle-default-builder --save
    truffle serve

You'll need to either be running a local ethereum node, or be using an Ethereum browser like Mist or Metamask. Point your Ethereum browser at the Ropsten TestNet.

Access your locally running app at `http://localhost:8080`

Then you have to map the addresses of the the contracts deployed in the web3_main.js, and your application is ready to run.            
    
## Built With

* [Vue.js](https://vuejs.org/v2/guide/index.html) - The web framework used
* [Ethereum](https://www.ethereum.org/) - Used for smart contract deployment

## Screenshots
* ![Creating Tender](https://lh5.googleusercontent.com/bx5oHEspBCTidvZ_Cy8I_NbYy1GkBlRj4EgzUZQfulRnINSK0YxmxvdfnSocP5Y_MgJJ9UDXkFSilZFIcqmS=w1366-h612-rw)
* ![Existing Tender](https://lh3.googleusercontent.com/C0JbJ0M35W4idDJbo5wgmTtkNlJR-egZNMGVYXnTWVpWk9BfKeiG1-g0BGSjUClqd7xdpa4mPW3V9aCeSYenac6K_A8KecrKZoZMmS1h_UBbc60KDDaOGmmgVbztbAFPl_ByPbLZQ33BE9yBQMpAfC4XxPoQXODlzZ3iBkWZf9r8fn9-yEZxgmHsuccuR3Bo2K-PK4Aui412m1LWdZifsVJ_fNmNeOmV2qp1dSafrHnzBz8FUF42du3ctJrrFpCICU7TS4jF4oxdmcM1-1vp5sFyUt0-lXh_J-n3j1OprAkyoXmKcRNcEF8Lyw8iU0zKJOZHm7qNjUcda-YLWqFMo2Z1pMWC0Qd_VhXlbe0K6JsUvz5GGktVJbeEjddUWOzaI6CiHxfY_7I-WvVCX0WBVqErcocJS93Yrb7BnL8R68wakruECEAlBg_QG76CzCKY9BkhVhnxvLGjLaabsBmtQay_96pRTbY7G22Z3eRnt1lWmD5Tdb42cYF1a7HizHY0_1yjM4NFDBajmx83ZOICOmnRwM5TwNq3aq841r8ZmjdZOH3ap-_2iNPF8C2VbwGu63RJpZuCnOFjCt_GWisUu563BfDQ3Z8gUaZETg=w1090-h613-no)
* ![Expired Tender](https://lh3.googleusercontent.com/-P5eZcJGQAx36Hxcx-MWo3-_XC8kG0uzdRgXqs_im1humxpGxCtGQH6CVrpln17vB4k_dCpOqINvpE9pELOnvXDW2HqZus6sizS1OriCkuALlpJVbyPUzNv0gudtW-SenwvNq9OFnTmPfGITQiviyqeSZejkVVLcndcz8aR3Xo8wwyaaOhyavS-KDw607Xu8vCUNxJt535p_Q0SIiYTtHqrN96dYzKFGsOeuaTqZuXZeX9hYyRi_44I19_Ufr6zfRHC7GsCdrBxo0MgH9Qr5oFeDcgeow5mBfqDBPZVTqzx1yBInShlOBW69XzlxHOt3dC8iQUMud8POWSNxNZjuKqfj76pZwjH3KcC1yluy1iVbSt3GzYz0j4WcpfadEz_kKGLQRZYIdX0OR6jOZiOUY173fAWurbAx1KY1n5QVXV5BKJPNLOBhIa0rec9hC9e1Ks73-HUbA8_GRFEDdeDZCe61dvdfWClFPxpgHDqQzNZopbazh2av0G097pzD4kE6jP_9WgY2dYVvgIPGBDtFP_mq-N-oD7eQZkJ2dQmx5rCkykm77xkA4rcUietag46lZWJ1Ej5cJ-PWFS2cOIaL-qdt3C507zApggGEhw=w1090-h613-no)
* ![Ongoing Contracts](https://lh3.googleusercontent.com/u1nLfc0WuhqhFqRejUF5fpEmL7aN5AV1DgMfGpwRrNeLw9dlliggXntlIQO64eS6ht_C76QIvNsPf93JtVWQonGUBgnl5ewHpqqPpVuyaSqvQhPTAZrUlt9e9UyM9WLS4Tz1NrooX_Bjz5H5KBKkP33VDd3AIFzNjfQ8emlRrrj6jrDV2UPCaYP41YFdDyL_rjR_CzfWsKXkDXCre3XcHjC1Gx5_GtnW8fsYfGT71tBRsYrZkvPIoKdzLHJZijf6HeRdCj8MA6ZHH_0zTHr2TsO-cwXM6Nd1QqJgAnV-x24J58ntbU86jYW4DvAR9o-rXm3TlwYyWQog2RQgDwNFdYkSND7a-nrcf3s3jJjBC2252yCOGk2OFUEphdd_u6dEYQAAx9LBfJhnVdtRV2TFsrRmQMyf94t6ocfoSjV8FzRS6wt-BvrfTgY2PkHSSjBxoyBUoe1Gb8GHX6JgjkkNJy0ESOuoAqAfzgt7i7Yq0w3g7L38tIHzlkCz2TxSnWEiCF1qMipVbAl8DwmhmySpt671ULcLCLXA8K5x8Ichc7zjwNhl6haBbasXFbh_CAxC34a1vR9szdeWu-Rz7aIS9ttnAD9VfreapaqUlA=w1090-h613-no)
* ![Placed Bids](https://drive.google.com/file/d/1h5MRoD-OlgC40sAxeV-VFySQG-mx_XIA/view?usp=sharing)
* ![Placing Bids](https://drive.google.com/file/d/1DaocsAnXJ9y6AcaqTGzxhrPykmGZblTt/view?usp=sharing)
* ![Tender To Contract](https://drive.google.com/file/d/1zGfQrHau1GU22nnBSGCvi8XrI5dFiSNf/view?usp=sharing)
* ![Tender To Contractr](https://drive.google.com/file/d/1wreLzAkwvCTu3_Hi_3EMqVaf-TC-gafM/view?usp=sharing)
* ![Verify Docs](https://drive.google.com/file/d/1NwppjSnm-Ckhzx2faGfM_JqhYuXkXo2L/view?usp=sharing)
* ![Verify Officer](https://drive.google.com/file/d/1esPP1QDrDvOXLAuI51mnY7eBn2lKGp8l/view?usp=sharing)
* ![View DOcs TO Verify](https://drive.google.com/file/d/1-8rPa-6jepBFon4BIY6_Gd5yBjW_9L8-/view?usp=sharing)
## Presentation
* [Tender 2.0](http://prezi.com/zp0s9b-1qmq2/?utm_campaign=share&utm_medium=copy)
## Authors

* **Siddhesh Rane** - *Initial work*
* **Siddhesh Gangan** - *Initial work* 
* **Yash Jain** - *Initial work*
* **Pranamya Jain** - *Initial work*




