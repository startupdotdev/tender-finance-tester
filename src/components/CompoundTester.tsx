
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import Compound from '@compound-finance/compound-js';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { CompoundInstance } from '@compound-finance/compound-js/dist/nodejs/types';

const CompoundTester = () => {
  const web3React: Web3ReactContextInterface<Web3Provider> = useWeb3React<Web3Provider>();

  // @ts-ignore
  const compound: CompoundInstance = new Compound(web3React.library?.getSigner());

  console.log("compound", compound);

  let c = Compound;
  
  // @ts-ignore
  console.log("Compound.ETH", Compound.ETH);

  // @ts-ignore
  compound.supply(Compound.ETH, 0.00001)

  return (
    <div className="wallet-info">
      <p>test</p>
    </div>
  );
};

export default CompoundTester;
