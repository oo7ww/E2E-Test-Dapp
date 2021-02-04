/*global ethereum, MetamaskOnboarding */

/*
The `piggybankContract` is compiled from:

  pragma solidity ^0.4.0;
  contract PiggyBank {

      uint private balance;
      address public owner;

      function PiggyBank() public {
          owner = msg.sender;
          balance = 0;
      }

      function deposit() public payable returns (uint) {
          balance += msg.value;
          return balance;
      }

      function withdraw(uint withdrawAmount) public returns (uint remainingBal) {
          require(msg.sender == owner);
          balance -= withdrawAmount;

          msg.sender.transfer(withdrawAmount);

          return balance;
      }
  }
*/
const cfx = new window.Conflux.Conflux({
  url: 'http://test.confluxrpc.org',
  //chainId: 1
});

const privateKey = '0x' + 'b919f9d775811912c73831947bab55dccb0d124ca9ae04a42633a27b9ff05925';
const new_owner = cfx.wallet.addPrivateKey(privateKey);
const forwarderOrigin = 'http://localhost:9010';

const initialize = () => {
  //Basic Actions Section
  const onboardButton = document.getElementById('connectButton');
  const getAccountsButton = document.getElementById('getAccounts');
  const getAccountsResult = document.getElementById('getAccountsResult');
  const getBalanceButton = document.getElementById('getBalance');
  const getBalanceResult = document.getElementById('getBalanceResult');
  const sendButton = document.getElementById('send');
  const txHash = document.getElementById('txHash');
  // Ethereum Signature Section
  const ethSign = document.getElementById('ethSign')
  const ethSignResult = document.getElementById('ethSignResult')
  const { ethereum } = window;

  //------Inserted Code------\\

  const onClickConnect = async () => {
      await ethereum.request({ method: 'eth_requestAccounts' });
  };

  const MetaMaskClientCheck = () => {
      onboardButton.onclick = onClickConnect;
      onboardButton.disable = true;
  };
  
  MetaMaskClientCheck();
  //Eth_Accounts-getAccountsButton
  getAccountsButton.addEventListener('click', async () => {
    //we use eth_accounts because it returns a list of addresses owned by us.
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    //We take the first address in the array of addresses and display it
    getAccountsResult.innerHTML = accounts[0] || 'Not able to get accounts';
  });

  getBalanceButton.addEventListener('click', async () => {
    //we use eth_accounts because it returns a list of addresses owned by us.
    //let balance = await ethereum.request({ method: 'eth_getBalance', params: [ ethereum.selectedAddress ] });
    const balance = await cfx.getBalance(new_owner.address);
    //We take the first address in the array of addresses and display it
    getBalanceResult.innerHTML = balance || 'Not able to get balance';
  });

  /**
   * eth_sign
   */
  ethSign.onclick = async () => {
    try {
      // const msg = 'Sample message to hash for signature'
      // const msgHash = keccak256(msg)
      const msg_tx = '0xb3e99ed9c3f4a81f5bfc58d21455597f98a9b8656c6499cfbf9af07a85ba92bf';
      const ethResult = await ethereum.request({
        method: 'eth_sign',
        params: [ethereum.selectedAddress, msg_tx],
      })
      ethSignResult.innerHTML = JSON.stringify(ethResult)
    } catch (err) {
      console.error(err)
      ethSign.innerHTML = `Error: ${err.message}`
    }
  }

  sendButton.addEventListener('click', async() => {
    try {
      let signature = await ethereum.request({ method: 'eth_sign', params: ['0x111dB228942d555C2620F9613347600f176Bcc22', '0xe2800182520894111db228942d555c2620f9613347600f176bcc228080836f21e20180']});
      txHash.innerHTML = JSON.stringify(signature) || 'failed';
    } catch(err) {
      txHash.innerHTML = 'failed';
      console.log(err);
    }
  });
  //------/Inserted Code------\\
};
window.addEventListener('DOMContentLoaded', initialize);
