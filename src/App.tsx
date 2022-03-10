import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useLocalStorage from './hooks/use-local-storage';
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

let DUMMY_TOKEN: Token = {
  id: uuidv4(),
  name: "cEth",
  address: "0x01212312312312312"
};

function App() {

  const [tokens, setTokens] = useLocalStorage<Token[]>("tokens", [DUMMY_TOKEN]);

  function addToken(token: Token) {
    setTokens([...tokens, token]);
    toast("New token added!");
  }

  function removeToken(id: string) {
    setTokens([...tokens.filter(t => t.id != id)]);
    toast("Token removed!");
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ToastContainer />
      <div className="App">
        <WalletInfo />
        <ConnectWallet />
        <AddToken addToken={addToken}/>
        
        {tokens.map((t) => {
          return <div className="w-full" key={t.id}>
            <CompoundTester removeToken={() => removeToken(t.id)} token={t} />
          </div>
        })}

      </div>
    </Web3ReactProvider>
  );
}

export default App;
