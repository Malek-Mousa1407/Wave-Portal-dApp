const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  // Compiling the contract 
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
  // Hardhat will create a local Ethereum network for us, but just for this contract.
  // Fund the contract with 0.1 ether.
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.01'),
  });
  // Executing the script.
  await waveContract.deployed();

  console.log('Contract Address:', waveContract.address);
  /*
  * Get Contract balance
  */
  let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
  );

  /*
   * Send Wave
   */
  let waveTxn1 = await waveContract.wave('This is wave #1');
  await waveTxn1.wait();

  // let waveTxn2 = await waveContract.wave('This is wave #2');
  // await waveTxn2.wait();

  /*
   * Get Contract balance to see what happened!
   */
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);

  // let allWaves = await waveContract.getTotalWaves();
  // console.log(allWaves.toNumber());
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();