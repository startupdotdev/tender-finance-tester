
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
import { format } from 'path';

interface PropsTypes {
  token: Token;
  removeToken: Function;
}

const CompoundTester = ({token: {name, address, chainId, underlyingAssetAddress}, removeToken}: PropsTypes) => {
  const web3React: Web3ReactContextInterface<Web3Provider> = useWeb3React<Web3Provider>();

  console.log("token", name, address, chainId, underlyingAssetAddress);
  // For easier debugging
  // const rinkebyCEth: string = "0xd6801a1DfFCd0a410336Ef88DeF4320D6DF1883e";
  // const rinkebyCDai: string = "0x6D7F0754FFeb405d23C51CE938289d4835bE3b14";
  // const rinkebyDai = "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea";

  const isCEth = underlyingAssetAddress ? false : true;

  async function supply(value: string) {
    if (isCEth) {
      console.log("supply() w/ cEth");

      const formattedValue = ethers.utils.parseEther(value);
      console.log("input value:", value, "formattedValue:", formattedValue.toString());
      
      let contract = new ethers.Contract(address, sampleAbi, web3React.library?.getSigner());
      let tx = await contract.mint({ value: ethers.utils.parseEther(value) });
    }
    else {
      console.log("supply() with cToken", name, address);

      const formattedValue = ethers.BigNumber.from(value);
      console.log("input value:", value, "formattedValue:", formattedValue.toString());

      let contract = new ethers.Contract(address, sampleCTokenAbi, web3React.library?.getSigner());
      let tx = await contract.mint(formattedValue);
    }
  }

  async function borrow(value: string) {  
    if (isCEth) {
      console.log("borrow() with cEth");

      const formattedValue = ethers.utils.parseEther(value);
      console.log("input value:", value, "formattedValue:", formattedValue);

      let contract = new ethers.Contract(address, sampleAbi, web3React.library?.getSigner());
      let tx = await contract.borrow(formattedValue);
    }
    else {
      console.log("borrow() with cToken", name, address);

      const formattedValue = value;
      console.log("input value:", value, "formattedValue:", formattedValue);

      let contract = new ethers.Contract(address, sampleCTokenAbi, web3React.library?.getSigner());
      let tx = await contract.borrow(formattedValue);
    }
  }

  async function redeem(value: string) {
    if (isCEth) {
      console.log("redeem() with cEth");

      const formattedValue = ethers.utils.parseEther(value);
      console.log("input value:", value, "formattedValue:", formattedValue);

      let contract = new ethers.Contract(address, sampleAbi, web3React.library?.getSigner());
      let tx = await contract.redeemUnderlying(formattedValue);
    }
    else {
      console.log("redeem() with cToken", name, "address:", address);

      const formattedValue = ethers.utils.parseEther(value);
      console.log("input value:", value, "formattedValue:", formattedValue);

      let contract = new ethers.Contract(address, sampleCTokenAbi, web3React.library?.getSigner());
      let tx = await contract.redeem(formattedValue);
    }
  }

  async function approve(value: string) {
    if (isCEth) {
      throw "Don't need to approve ETH";
    }

    // @ts-ignore
    let contract = new ethers.Contract(underlyingAssetAddress, sampleErc20Abi, web3React.library?.getSigner());
    let approvalVal = '1000000000000000000';
    let approvalTx = await contract.approve(address, approvalVal);
  }

  // Forgive the string coercion. Localstorage pain
  return web3React.chainId && `${web3React.chainId}` == chainId ?(
    <div className="box">
      <h2>{name}</h2>
      <p>{address}</p>
      <button onClick={() => removeToken()}>x Remove</button>

      <hr style={{margin: "2rem 0" }}/>
      
      <CompoundFunctionFactory name="Supply" fn={supply} />
      <CompoundFunctionFactory name="Borrow" fn={borrow} />
      <CompoundFunctionFactory name="Redeem" fn={redeem} />

      {isCEth === false && <CompoundFunctionFactory name="Approve" fn={approve} />}
    </div>
  ): <div>
    {name} only avail on chain {chainId}
  </div>;
};

export default CompoundTester;
