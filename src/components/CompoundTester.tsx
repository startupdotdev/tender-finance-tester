
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import Compound from '@compound-finance/compound-js';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { CompoundInstance } from '@compound-finance/compound-js/dist/nodejs/types';
import CompoundFunctionFactory  from "./compound/compoundFunctionFactory";

const CompoundTester = () => {

  const web3React: Web3ReactContextInterface<Web3Provider> = useWeb3React<Web3Provider>();

  // @ts-ignore
  const compound: CompoundInstance = new Compound(web3React.library?.getSigner());

  console.log("compound", compound);

  // @ts-ignore
  function supply(token: string, value: number | string | BigNumber) {
    // TODO validate token
    // TODO: validate number
    // @ts-ignore
    compound.supply(token, value);
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
      <h2>Compound SDK</h2>
      <CompoundFunctionFactory name="Supply" fn={supply} />
      <CompoundFunctionFactory name="Borrow" fn={borrow} />
      <CompoundFunctionFactory name="Redeem" fn={redeem} />
    </div>
  );
};

export default CompoundTester;
