import React from 'react';
import { DAppProvider, Goerli, Polygon, Mumbai } from '@usedapp/core'
import { Mainnet, MetamaskConnector, CoinbaseWalletConnector } from '@usedapp/core'
import { WalletConnectConnector } from '@usedapp/wallet-connect-connector'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { PortisConnector } from '@usedapp/portis-connector'
import { formatEther } from '@ethersproject/units'
import { getDefaultProvider } from 'ethers'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import './App.css';
import Wallet from './components/Wallet';
import Header from './components/Header';
import Swap from './pages/Swap';
import Redeem from './pages/Redeem';
import Home from './pages/Home';
import { simpleContractAddress } from './contract';


function App() {

  const PORTIS_DAPP_ID = 'b7acf773-2ab1-4189-8eba-21fce8f57181'
  const config = {
    networks: [Mumbai],
    readOnlyChainId: Mumbai.chainId,
    readOnlyUrls: {
      //[Goerli.chainId]: "https://optimism-goerli.infura.io/v3/5f889400e82546ae9e9052bca6de4706"
      [Mumbai.chainId]: "https://polygon-mumbai.infura.io/v3/5f889400e82546ae9e9052bca6de4706"
    },
    notifications: {
      expirationPeriod: 1000, //milliseconds
      checkInterval: 1000, // milliseconds
    },
    connectors: {
      metamask: new MetamaskConnector(),
      coinbase: new CoinbaseWalletConnector(),
      portis: new PortisConnector(PORTIS_DAPP_ID, 'mainnet'),
      //walletConnect: new WalletConnectProvider({ infuraId: '5f889400e82546ae9e9052bca6de4706' }),
    },
    // multicallAddresses: {
    //   [Goerli.chainId]: simpleContractAddress,
    // },
  }

  return (
    <DAppProvider config={config}>
      <Router>
        <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/swap" element={<Swap />} />
              <Route path="/redeem" element={<Redeem />} />
            </Routes>
        </div>
      </Router>
    </DAppProvider>
  );
}

export default App;
