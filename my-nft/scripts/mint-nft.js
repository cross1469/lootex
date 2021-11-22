require("dotenv").config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

// Grab contract ABI
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
// smart contract deploy address
const contractAddress = "0x2c8394811cd1ba470200ae92b6da9ba5d234a502";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
  // get latest nonce(隨機數)
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");

  // setting transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    // The estimated gas needed to complete the transaction
    gas: 500000,
    // The estimated fee to bid per gas
    maxPriorityFeePerGas: 1999999987,
    // minting an NFT
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  // web3.eth.sendSignedTransaction will give us the transaction hash, which we can use to make sure our transaction was mined and didn't get dropped by the network
  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log("Promise failed:", err);
    });
}

mintNFT(
  "https://gateway.pinata.cloud/ipfs/QmWZTsG2sJxEEaYq2eH1iZsuBQC7ojxSzEUuJ6JP2ZrWuC"
);
