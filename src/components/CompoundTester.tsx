
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import Compound from '@compound-finance/compound-js';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { CompoundInstance } from '@compound-finance/compound-js/dist/nodejs/types';
import CompoundFunctionFactory  from "./compound/compoundFunctionFactory";
import { BigNumber, ethers } from 'ethers';
import sampleAbi from '../lib/connectors/sampleAbi';

interface Token {
  name: string;
  address: string;
}

interface PropsTypes {
  token: Token
}

const CompoundTester = ({token: {name, address}}: PropsTypes) => {

  const web3React: Web3ReactContextInterface<Web3Provider> = useWeb3React<Web3Provider>();

  // @ts-ignore
  const compound: CompoundInstance = new Compound(web3React.library?.getSigner());
  const testaddr: string = "0xd6801a1DfFCd0a410336Ef88DeF4320D6DF1883e";

  // @ts-ignore
  async function supply(token: string, value: string) {
    // TODO validate token
    // TODO: validate number
    // @ts-ignore
    // compound.supply(token, value);

    // TODO: start with Rinkeby cEth 0xd6801a1DfFCd0a410336Ef88DeF4320D6DF1883e

    let contract = new ethers.Contract(testaddr, sampleAbi, web3React.library?.getSigner());
    let tx = await contract.mint({value: ethers.utils.parseUnits(value, 6) });
    // TODO: test this
  }

  function borrow(token: string, value: number | string | BigNumber) {
    // TODO validate token
    // TODO: validate number
    // @ts-ignore
    compound.borrow(token, value);
  }

  function redeem(token: string, value: number | string | BigNumber) {
    // TODO validate token
    // TODO: validate number
    // @ts-ignore
    compound.redeem(token, value);
  }

  return (
    <div className="wallet-info">
      <h2>Token {name} ({address})</h2>
      <button>x Remove</button>
      <CompoundFunctionFactory name="Supply" fn={supply} />
      <CompoundFunctionFactory name="Borrow" fn={borrow} />
      <CompoundFunctionFactory name="Redeem" fn={redeem} />
    </div>
  );
};

export default CompoundTester;
