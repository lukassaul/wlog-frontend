import React from 'react';
import { DAppProvider, Localhost } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import { getDefaultProvider } from 'ethers'
import './App.css';
import Wallet from './components/Wallet';



function App() {


  const config = {
    networks: [Localhost],
    readOnlyChainId: Localhost.chainId,
    readOnlyUrls: {
      [Localhost.chainId]: "http://localhost:8545",
    },
    notifications: {
      expirationPeriod: 1000, //milliseconds
      checkInterval: 1000, // milliseconds
    }
  }

  return (
    <DAppProvider config={config}>
      <div className="App">
        <header className="App-header">
          <Wallet />
        </header>
      </div>
    </DAppProvider>
  );
}

export default App;
