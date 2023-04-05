import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DAppProvider, Goerli, Polygon, Mumbai } from '@usedapp/core'
import { Mainnet, MetamaskConnector, CoinbaseWalletConnector } from '@usedapp/core'
import { WalletConnectConnector } from '@usedapp/wallet-connect-connector'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { PortisConnector } from '@usedapp/portis-connector'
import { formatEther } from '@ethersproject/units'
import { getDefaultProvider } from 'ethers'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import Wallet from './components/Wallet';
import Header from './components/Header';
import Footer from './components/Footer';
import Swap from './pages/Swap';
import Redeem from './pages/Redeem';
import Home from './pages/Home';
import { simpleContractAddress } from './contract';
import { setNetwork } from './features/networkSlice';
import { AppDispatch } from './app/store';
import Faq from './pages/Faq';
import ScrollToTop from './SrollToTop';


const mumbai_config = {
  networks: [Mumbai],
  readOnlyChainId: Mumbai.chainId,
  readOnlyUrls: {
    [Mumbai.chainId]: "https://polygon-mumbai.infura.io/v3/5f889400e82546ae9e9052bca6de4706"
  },
  notifications: {
    expirationPeriod: 1000, //milliseconds
    checkInterval: 1000, // milliseconds
  },
  connectors: {
    metamask: new MetamaskConnector(),
    coinbase: new CoinbaseWalletConnector(),
  },
}

const polygon_config = {
  networks: [Polygon],
  readOnlyChainId: Polygon.chainId,
  readOnlyUrls: {
    [Polygon.chainId]: "https://polygon-mainnet.infura.io/v3/5f889400e82546ae9e9052bca6de4706"
  },
  notifications: {
    expirationPeriod: 1000, //milliseconds
    checkInterval: 1000, // milliseconds
  },
  connectors: {
    metamask: new MetamaskConnector(),
    coinbase: new CoinbaseWalletConnector(),
  },
}

function App() {

  const dispatch = useDispatch<AppDispatch>()
  const [networkEnv, setNetworkEnv] = useState(process.env.REACT_APP_NETWORK)

  useEffect(() => {
    
    if(process.env.REACT_APP_NETWORK) setNetworkEnv(process.env.REACT_APP_NETWORK)
   
  }, [process.env.REACT_APP_NETWORK])

  useEffect(() => {
    if(networkEnv === "POLYGON_MUMBAI") {
      dispatch(setNetwork("Polygon-mumbai"))
    }
    if(networkEnv === "POLYGON") {
      dispatch(setNetwork("Polygon"))
    }
  }, [networkEnv])

  function Layout() {
    return (
        <ScrollToTop>
          <div className={process.env.REACT_APP_THEME === "PURPLE" ? "App flex-col main_black" : "App flex-col main_green"}>
              <Header />
              <Outlet />
              <Footer />
          </div>
        </ScrollToTop>
    );
  }

  const router = createBrowserRouter([
    {
      element: <Layout/>,
      children: [  
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/swap',
          element: <Swap />
        },
        {
          path: '/redeem',
          element: <Redeem />
        },
        {
          path: '/faqs',
          element: <Faq />
        }
      ]
    }
  ])
  

  return (
      <DAppProvider config={process.env.REACT_APP_NETWORK === "POLYGON_MUMBAI" ? mumbai_config : polygon_config}>
        
        <div className={process.env.REACT_APP_THEME === "PURPLE" ? "App flex-col main_black" : "App flex-col main_green"}>
            
            <RouterProvider router={router} />
            
        </div>

      </DAppProvider>
    );
}

export default App;
