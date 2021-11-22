async function main() {
  // get the contract factory (factory 會回傳一個 object)
  const MyNFT = await ethers.getContractFactory("MyNFT");

  // Call deploy 執行 deploy 動作，並回傳一個 Promise resolve Contract object
  const myNFT = await MyNFT.deploy();
  console.log("Contract deployed to address:", myNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
