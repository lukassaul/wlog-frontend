import React from "react"
import QRCode from "react-qr-code";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEthers } from '@usedapp/core'

function ConnectWalletModal(props: any) {
    const { activateBrowserWallet, account, deactivate } = useEthers();

    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
            Connect to a wallet
        </Modal.Header>
        <Modal.Body>
            <div className="pv2">
                <ul className="pl0">
                    <li>
                        <div 
                            className="wallet_container" 
                            onClick={() => {
                                activateBrowserWallet({ type: 'metamask' })
                                props.setWalletModalShow(false)
                            }}
                        >
                            <p className="mb0">Metamask</p>
                            <img src="icon_metamask.png"/>
                        </div>
                    </li>
                    {/* <li>
                        <div className="wallet_container" onClick={() => activateBrowserWallet({ type: 'walletConnect' })}>
                            <p className="mb0">WalletConnect</p>
                            <img src="icon_walletconnect.png"/>
                        </div>
                    </li> */}
                    <li>
                        <div 
                            className="wallet_container" 
                            onClick={() => {
                                activateBrowserWallet({ type: 'coinbase' })
                                props.setWalletModalShow(false)
                            }}
                        >
                            <p className="mb0">Coinbase Wallet</p>
                            <img src="icon_coinbase.png"/>
                        </div>
                    </li>
                    {/* <li>
                        <div className="wallet_container">
                            <p className="mb0">Formatic</p>
                            <img src="icon_formatic.png"/>
                        </div>
                    </li> */}
                    <li>
                        <div 
                            className="wallet_container" 
                            onClick={() => {
                                activateBrowserWallet({ type: 'portis' })
                                props.setWalletModalShow(false)
                            }}
                        >
                            <p className="mb0">Portis</p>
                            <img src="icon_portis.png"/>
                        </div>
                    </li>
                </ul>
                <p>
                    <span className="font-darkgray mrhalf">New to Ethereum?</span>
                    <a 
                        href="https://ethereum.org/en/wallets/" 
                        className="font-darkgreen2"
                        target="_blank"
                    >
                        Learn more about wallets
                    </a>
                </p>
            </div>
        </Modal.Body>
      </Modal>
    );
  }

export default ConnectWalletModal