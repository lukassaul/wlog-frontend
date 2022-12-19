import { useEffect, useState, useMemo } from 'react'
import { useEthers, useEtherBalance, Localhost } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import { useTotalSupply, useGetAdmin,  useContractMethod } from '../hooks'
import { BigNumber } from "ethers";



function Wallet() {
    
    const { activateBrowserWallet, account, deactivate } = useEthers();
    const localhostBalance = useEtherBalance(account, {chainId: Localhost.chainId});
    const totalSupply = useTotalSupply();
    const admin = useGetAdmin();
    console.log("admin: ", admin)

    const { state: mintState, send: setMint} = useContractMethod('mint')
    const [ inputAddress, setInputAddress ] = useState("");
    const [ amount, setAmout] = useState(0);


    function handleMint() {
        const address = inputAddress;
        const amountValue = amount;
        if (address && amountValue) {
            setMint(address, amountValue)
        }
    }

    useEffect(() => {
        console.log("Set:")
        console.log(mintState)
    }, [mintState])

    return (
        <div>
            <h3>
                Convert Woodcoin to ERC20 WLog
            </h3>
            {
                account
                    ?
                    <div>
                        <p>Your account: {account}</p> <br />
                        <button onClick={deactivate} className="btn">
                            Disconnect
                        </button>
                        <hr />
                        {/* Display wallet balance */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px 20px' }}>
                            
                            {
                                localhostBalance &&
                                <div className="bal">
                                    <h4>Balance</h4>
                                    {formatEther(localhostBalance)}
                                    <h3>Total Supply</h3>
                                    {formatEther(totalSupply)}
                                </div>
                            }
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px 20px' }}>
                            <div>
                                <input 
                                    type="string"
                                    placeholder='Input address'
                                    onChange={(e) => {
                                        setInputAddress((e.target.value))
                                    }}
                                />
                                <br />
                                <input 
                                    type="number"
                                    placeholder='Input amount'
                                    onChange={(e) => {
                                        setAmout(parseInt(e.target.value))
                                    }}
                                />
                                <button onClick={handleMint} className="btn">
                                    Mint
                                </button>
                            </div>
                        </div>
                    </div>
                    : <p>
                        Please connect wallet. <br />
                        <button
                            onClick={() => activateBrowserWallet()}
                            className="btn"
                            // onMouseOver={changeBackground}
                            // onMouseOut={resetBackground}
                        >
                            Connect Wallet
                        </button>
                    </p>
            }


        </div>
    )
}

export default Wallet;