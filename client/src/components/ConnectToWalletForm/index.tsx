import React, {useEffect, useState} from "react"
import { useEthers, useConnector, useEtherBalance, useTokenBalance, Localhost } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import {Icon} from '@iconify/react'
import { useTotalSupply, useGetAdmin,  useContractMethod, useTotalMinted } from '../../hooks'
import { simpleContractAddress } from "../../contract"
import Button from '../Button'
import { BigNumber } from "ethers"
import { WholeWrapper, FormInputWholeAccount } from "../../globalStyles"

function ConnectToWalletForm(props: any) {
    const { account, deactivate, chainId } = useEthers();
    const { connector, isLoading } = useConnector()
    const totalSupply = useTotalSupply();
    var tokenBalance = useTokenBalance(simpleContractAddress, "0x89ac3DE52a6f7A9Bd0570020bA8e1AfA66A947aE")
    //var localhostBalance = useEtherBalance("0x89ac3DE52a6f7A9Bd0570020bA8e1AfA66A947aE", {chainId: 5});
    const localhostBalance = useEtherBalance(account)
   
    const [ amount, setAmout] = useState(0);
    const [ receivingAddress, setReceivingAddress] = useState("");
    const { state: burnState, send: setBurn} = useContractMethod('burn')
    const [ addressValidationError, setAddressValidatorError] = useState("")
    const [ amountValidationError, setAmountValidatorError] = useState("")
    const [ burnStatus, setBurnStatus ] = useState("None")
    const [ statusMessage, setStatuseMessage ] = useState("")
    
    /*
    * Create input validation
    * Check if the given receiving Log address is a valid woodcoin address
    */
    function clearInputs() {
        setReceivingAddress("")
        setAmout(0)
    }

   
    return (
        <form>
            <WholeWrapper>
                
                <div className="flex-center-fullheight pv2">
                    <p className="font-weight-bold font-green text-center word-wrap">Make sure you are connected to your browser wallet, 
    if you haven't connected yet you can click this button to connect.</p>

                    {isLoading ?
                        <>
                            <p className="loadingWallet">Connecting to your wallet...</p>
                            <Icon icon="line-md:loading-twotone-loop" color="#ffc700" />
                        </>
                        :
                        <Button onClick={(e)=> { 
                            e.preventDefault(); 
                            clearInputs()
                            props.setWalletModalShow(true)
                        }}>
                            Connect
                        </Button>
                    }
                </div>
                    
            </WholeWrapper>
        </form>
    )
}

export default ConnectToWalletForm;
