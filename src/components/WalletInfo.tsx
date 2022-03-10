import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { chainIdToNetwork } from '../lib/connectors/constants';

const WalletInfo = () => {
  const { active, chainId, account, error } = useWeb3React<Web3Provider>();
  return (
    <div className="box">
      <h3>Tender.Finance Tester</h3>
      <p>active: {active.toString()}</p>
      {active && (
        <div>
          <p>account: {account}</p>
          <p>Chain: {chainId && chainIdToNetwork[chainId]}</p>
        </div>
      )}
      {error && <p className="text-error">error: {error.message}</p>}
    </div>
  );
};

export default WalletInfo;
