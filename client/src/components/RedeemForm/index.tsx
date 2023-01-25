import React, {useEffect, useState} from "react"
import { 
    useEthers, 
    useConnector, 
    useEtherBalance, 
    useTokenBalance,
    useLogs,
    Localhost 
} from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import {Icon} from '@iconify/react'
import { useTotalSupply, useGetAdmin,  useContractMethod, useTotalMinted } from '../../hooks'
import { simpleContractAddress, ssReceivingAddress } from "../../contract"
//import check from '../../utils/addressValidator'
import { 
    TitleTwo, 
    FormInputWholeAccount, 
    WholeWrapper,
    TwoColumnContainer
} from '../../globalStyles';
import Button from '../Button'
import { BigNumber } from "ethers"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../../app/store"
import { redeemRequest, clearLogState } from "../../features/redeemSlice"

function RedeemForm(props: any) {

    const dispatch = useDispatch<AppDispatch>()
    const network = useSelector((state: RootState) => state.network)
    const redeemStatus = useSelector((state: RootState) => state.redeem)
    
    const { account, deactivate, chainId } = useEthers();
    const { connector, isLoading } = useConnector()
    const totalSupply = useTotalSupply();
    var tokenBalance = useTokenBalance(simpleContractAddress, account)
    const localhostBalance = useEtherBalance(account, {chainId: Localhost.chainId});
   
    const [ amount, setAmout] = useState(0);
    const [ receivingAddress, setReceivingAddress] = useState("");
    const { state: burnState, send: transfer, events: burnEvents, resetState: resetBurnState} = useContractMethod('transfer')
    const [ addressValidationError, setAddressValidatorError] = useState("")
    const [ amountValidationError, setAmountValidatorError] = useState("")
    const [ burnStatus, setBurnStatus ] = useState("None")
    const [ statusMessage, setStatuseMessage ] = useState("")

    const [ formStep, setFormStep] = useState("FORM")
    
    /*
    * Create input validation
    * Check if the given receiving Log address is a valid woodcoin address
    */
    function clearInputs() {
        setReceivingAddress("")
        setAmout(0)
    }

    /**
     * Handle burn state 
    **/
    useEffect(() => {
        let stat = burnState.status
        setBurnStatus(stat)
        if(stat === "Exception") resetBurnState()
        if(stat === "PendingSignature") setStatuseMessage("Pending signature ...")
        if(stat === "Mining") setStatuseMessage("Transferring Wlog ...")
        if(stat === "Success") {
            setStatuseMessage("Submitting redeem request to api ...")
            if (burnState.receipt) {

                const data = {
                    txid: burnState.receipt.transactionHash,
                    amount,
                    //fromAddress: burnState.receipt?.from,
                    txTimeStamp: Date.now(),
                    userLogAddress: receivingAddress,
                    network: network?.network
                }

                //console.log("REDEEM DATA: ", data)
                resetBurnState()
                setFormStep("FORM")
                setAmout(0)
                setReceivingAddress("")
                // Send redeemData to backend api
                dispatch(redeemRequest(data))
            }

        }
    }, [burnState])

    function handleBurn() {
        console.log("requesting burn")
        const amountValue = amount * 100000000;
        if (amountValue) {
            transfer(ssReceivingAddress, amountValue)
        }
    }

    function validate() {

        // Clear burn state, esp success and error message
        dispatch(clearLogState())

        // Check if receiving address and amount is submitted
        if (!receivingAddress && !amount) {
            setAddressValidatorError("Receiving address is required")
            setAmountValidatorError("Amount is required")
            return
        }
        if (!receivingAddress) {
            setAddressValidatorError("Receiving address is required")
            return
        }
        if (!amount) {
            setAmountValidatorError("Amount is required")
            return
        }
        // Check if receiving address is valid
        var validation = window.coinjs.addressDecode(receivingAddress)
        if (validation) {
            try {
                setFormStep("REVIEW")
            }catch(e){
                console.log("burn error: ", e)
            }
        } else {
            setAddressValidatorError("Invalid receiving address")
        }
    }

    //console.log("tokenBalance: ", formatEther(tokenBalance))
    // console.log("localhostBalance: ", localhostBalance)
    return (
        <form>
            <WholeWrapper>
                {burnStatus === "None" || burnStatus === "Exception" || burnStatus === "Success" ?
                <>
                    {account?
                        <div className="flex-row-spacebetween bb pb2 font-green g1">
                            <div className="flex-start-css">
                                <div><p className="formlabel">Account:</p> {account}</div>
                                {chainId? <div><span className="formlabel">Chain id:</span> {Localhost.chainId}</div>: null}
                                <div><span className="formlabel">Connected with:</span> {connector?.connector?.name ?? 'None'}</div>
                                { tokenBalance ?
                                    <div className="bal font-green">
                                        <span className="formlabel">Balance:</span> {formatEther(tokenBalance)}
                                    </div>
                                    :  null
                                }
                            </div>
                            <div>
                                <Button onClick={(e) => { e.preventDefault(); deactivate()}}>Disconnect Wallet</Button>
                            </div>
                        </div>
                        :
                        <div className="pv2">
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
                    }

                    {formStep === "FORM" ?
                        <>
                            <FormInputWholeAccount
                                name="woodcoinAddress"
                                type="text"
                                placeholder='Receiving LOG Address'
                                aria-label='woodcoinAddress'
                                className={addressValidationError ? "mb1halfem border border-danger" : "mb1hafem"}
                                value={receivingAddress}
                                onChange={(e) => {
                                    setReceivingAddress(e.target.value)
                                    if(e.target.value !== "")setAddressValidatorError("")
                                }} />
                            {addressValidationError ? <p className="eMessage">{addressValidationError}</p> : null}
                            <FormInputWholeAccount
                                name="amount"
                                type="number"
                                placeholder='Amount'
                                aria-label='amount'
                                className={amountValidationError ? "mb1halfem border border-danger" : "mb1hafem"}
                                value={amount}
                                onChange={(e) => {
                                    setAmout(parseInt(e.target.value))
                                    if(e.target.value !== "")setAmountValidatorError("")
                                }} />
                            {amountValidationError ? <p className="eMessage">{amountValidationError}</p> : null}

                            <Button disabled={account? false : true} onClick={(e) => { e.preventDefault(); validate()}}>Submit</Button>
                        </>
                        :
                        null 
                    }

                    {formStep === "REVIEW" ?
                        <>
                            <p className="font-gray">Your LOG will be sent to these address:</p>
                            <p className="font-green">{receivingAddress}</p>

                            <div>
                                <Button onClick={(e) => { e.preventDefault(); setFormStep("FORM")}}>Change Address</Button>
                                <Button onClick={(e) => { e.preventDefault(); handleBurn()}}>Continue</Button>
                            </div>
                        </>
                        :
                        null
                    }

                    {redeemStatus.isRedeemSuccess ?
                        <p className="font-green">Successful redeem request. Woodcoin (LOG) has been sent to your address.</p>
                        :
                        null
                    }
                    {redeemStatus.isRedeemFetching ?
                        <p className="font-gray">Processing your redeem request.</p>
                        :
                        null
                    }

                    {redeemStatus.errorRedeemMessage ?
                        <p className="font-gray">{redeemStatus.errorRedeemMessage}</p>
                        :
                        null
                    }


                </>
                :
                <div className="status-container">
                    <div className="message-container font-green g1">
                        <img src="wlog_status_form.png" width={"81px"}/>
                        <span className="loadingWallet">{statusMessage}</span>
                        <Icon icon="line-md:loading-twotone-loop" color="#ffc700" />
                    </div>
                </div>
            }
            </WholeWrapper>
        </form>
    )
}

export default RedeemForm;
