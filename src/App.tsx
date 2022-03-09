import {useEffect, useState} from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from '@ethersproject/providers';

import ConnectWallet from './components/ConnectWallet';
import WalletInfo from './components/WalletInfo';
import CompoundTester from './components/CompoundTester';
import AddToken from './components/AddToken';

import { v4 as uuidv4 } from 'uuid';

import './App.css';

function getLibrary(
  provider: ExternalProvider | JsonRpcFetchFunc
): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

interface Token {
  id: string;
  name: string;
  address: string;
  chainId?: string;
}

function App() {
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    // TODO: Refactor to use local storage (ideally w/o infinte loop)
    if (tokens.length > 0) {
      return;
    }

    setTokens([
      {
        id: uuidv4(),
        name: "cEth",
        address: "0x01212312312312312"
      },

      {
        id: uuidv4(),
        name: "sheeEth",
        address: "0x01212312312312312"
      },

      {
        id: uuidv4(),
        name: "bagCoin2",
        address: "0x01212312312312312"
      }
    ]);
  });

  function addToken(token: Token) {
    setTokens([...tokens, token]);
  }

  function removeToken(id: string) {
    setTokens([...tokens.filter(t => t.id != id)]);
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="App">
        <WalletInfo />
        <ConnectWallet />
        <AddToken addToken={addToken}/>
        {tokens.map((token) => {
          return <div className="w-full" key={token.id}>
            <CompoundTester removeToken={() => removeToken(token.id)} token={token} />
          </div>
        })}

      </div>
    </Web3ReactProvider>
  );
}

export default App;
