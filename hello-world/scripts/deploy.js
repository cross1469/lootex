async function main() {
  // get the contract factory (factory 會回傳一個 object)
  const HelloWorld = await ethers.getContractFactory("HelloWorld");

  // Call deploy 執行 deploy 動作，並回傳一個 Promise resolve Contract object
  const hello_world = await HelloWorld.deploy("Hello World!");
  console.log("Contract deployed to address:", hello_world.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
