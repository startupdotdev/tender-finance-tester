
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import Compound from '@compound-finance/compound-js';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { CompoundInstance } from '@compound-finance/compound-js/dist/nodejs/types';
import CompoundFunctionFactory  from "./compound/compoundFunctionFactory";
import { BigNumber, ethers } from 'ethers';
import sampleAbi from '../lib/connectors/sampleAbi';
import sampleErc20Abi from '../lib/connectors/sampleErc20Abi';
import sampleCTokenAbi from '../lib/connectors/sampleCTokenAbi';

interface PropsTypes {
  token: Token;
  removeToken: Function;
}

const CompoundTester = ({token: {name, address, chainId}, removeToken}: PropsTypes) => {

  const web3React: Web3ReactContextInterface<Web3Provider> = useWeb3React<Web3Provider>();

  // @ts-ignore
  const compound: CompoundInstance = new Compound(web3React.library?.getSigner());
  const rinkebyCEth: string = "0xd6801a1DfFCd0a410336Ef88DeF4320D6DF1883e";
  const rinkebyCDai: string = "0x6D7F0754FFeb405d23C51CE938289d4835bE3b14";

  // @ts-ignore
  async function supply(value: string) {
    // TODO validate token
    // TODO: validate number    

    const isCEth = false;
    // // cEth is a special case, sending ETH not ERC20
    if (isCEth) {
      // TODO: use real value here
      value = '0.001';
      let contract = new ethers.Contract(rinkebyCEth, sampleAbi, web3React.library?.getSigner());
      let tx = await contract.mint({ value: ethers.utils.parseEther(value) });
    }
    // All other ERC20 cTokens
    else {
      value = '20000000000000000';

      // TODO: use underlying asset address 
      // this hardcoded val is rinkeby Dai that Compound is expecting
      let underlyingErc20Address = "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea";

      // TODO: pull this into it's own approve button?
      let rinkebyDaiContract = new ethers.Contract(underlyingErc20Address, sampleErc20Abi, web3React.library?.getSigner());
      let approvalVal = '1000000000000000000';
      let approveDaiTransferTx = await rinkebyDaiContract.approve(rinkebyCDai, approvalVal);
      
      let contract = new ethers.Contract(rinkebyCDai, sampleCTokenAbi, web3React.library?.getSigner());
      let tx = await contract.mint(ethers.BigNumber.from(value));
    }
  }

  async function borrow(value: string) {
    console.log("borrow()");

    // TODO validate token
    // TODO: validate number
    // @ts-ignore

    // TODO: Wire up form
  
    const isCEth = true;
    // cEth is a special case, sending ETH not ERC20
    if (isCEth) {
      value = '0.001';
      let contract = new ethers.Contract(rinkebyCEth, sampleAbi, web3React.library?.getSigner());
      let tx = await contract.borrow(ethers.utils.parseEther(value));
    }
    // All other ERC20 cTokens
    else {
      value = '10000000000000000';
      let contract = new ethers.Contract(rinkebyCDai, sampleCTokenAbi, web3React.library?.getSigner());
      let tx = await contract.borrow(value);
    }
  }

  async function redeem(value: string) {
    // TODO validate token
    // TODO: validate number
    // @ts-ignore
    // compound.redeem(token, value);

    // TODO: Wire up form

    const isCEth = false;
    // // cEth is a special case, sending ETH not ERC20
    if (isCEth) {
      value = '0.001';

      let contract = new ethers.Contract(rinkebyCEth, sampleAbi, web3React.library?.getSigner());
      let tx = await contract.redeemUnderlying(ethers.utils.parseEther(value));
    }
    // All other ERC20 cTokens
    else {
      value = '10000000000000000';
      let contract = new ethers.Contract(rinkebyCDai, sampleCTokenAbi, web3React.library?.getSigner());
      let tx = await contract.redeem(ethers.utils.parseEther(value));
    }
  }

  async function approve(value: string) {
    // TODO
  }

  // Forgive the string coercion. Localstorage pain
  return web3React.chainId && `${web3React.chainId}` == chainId ?(
    <div className="box">
      <h2>Token {name} ({address})</h2>
      <button onClick={() => removeToken()}>x Remove</button>

      <hr style={{margin: "2rem 0" }}/>
      
      <CompoundFunctionFactory name="Supply" fn={supply} />
      <CompoundFunctionFactory name="Borrow" fn={borrow} />
      <CompoundFunctionFactory name="Redeem" fn={redeem} />
      <CompoundFunctionFactory name="Approve" fn={approve} />
    </div>
  ): <div>
    {name} only avail on chain {chainId}
  </div>;
};

export default CompoundTester;
