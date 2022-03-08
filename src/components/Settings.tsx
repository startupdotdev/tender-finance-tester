import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { chainIdToNetwork } from '../lib/connectors/constants';

const Settings = () => {
  const { chainId } = useWeb3React<Web3Provider>();

  // TODO: Warn about supported networks?

  return (
    <div className="wallet-info">
      <h2>
        Settings
      </h2>
      <p>Current Network: {chainId && chainIdToNetwork[chainId]}</p>
      <p> Token Address <input/> </p>
    </div>
  );
};

export default Settings;
