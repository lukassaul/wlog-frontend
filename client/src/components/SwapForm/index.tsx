import React, { useEffect, useState } from "react"
import {ethers} from "ethers"
import { 
    TitleTwo, 
    FormInputWholeAccount, 
    SwapWrapper,
    TwoColumnContainer
} from '../../globalStyles';
import Button from '../Button'
import QRCode from "react-qr-code";
import { swapRequest, clearLogState } from "../../features/swapSlice";
import { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { CheckLogTransactionAPI } from "../../api/logTrasactionChecker";

function SwapForm(props: any) {
    
    const dispatch = useDispatch<AppDispatch>()
    const swapStatus = useSelector((state: RootState) => state.swap)
    const network = useSelector((state: RootState) => state.network)

    const [copied, setCopied] = useState(false)
    
    const [txhash, setTxhash] = useState("")
    const [wlogAddress, setWlogAddress] = useState("")

    const [ addressValidationError, setAddressValidatorError] = useState("")
    const [ txhashValidationError, setTxhashValidatorError] = useState("")

    const [ formStep, setFormStep] = useState("FORM")

    function showCopiedNotification() {
        setCopied(true)
        setTimeout(function () {
            setCopied(false);
        }, 2000);
    }

    function txhashChecker(hash:string) {
        var pattern = /^[a-fA-F0-9]{64}$/
        return pattern.test(hash)
    }

    function ethAdddressChecker(address:string) {
        //var pattern = /^0x[a-fA-F0-9]{40}$/g
        //return pattern.test(address)

        return ethers.utils.isAddress(address)
    }


    async function swapCode() {
        // Check if receiving address and amount is submitted
        if (!wlogAddress && !txhash) {
            setAddressValidatorError("Ethereum wallet address is required")
            setTxhashValidatorError("Transaction hash is required")
            return
        }
        if (!wlogAddress) {
            setAddressValidatorError("Ethereum wallet address is required")
            return
        }
        if (!txhash) {
            setTxhashValidatorError("Transaction hash is required")
            return
        }
        // Check if txhash is valid
        var hashValidation = txhashChecker(txhash)
        if (!hashValidation) {
            //console.log("hashValidation false: ", hashValidation)
            setTxhashValidatorError("Invalid transaction hash")
            return
        }

        // Check if transaction id is already on blockchain
        let isSeenOnBlockchain = await CheckLogTransactionAPI(txhash)
        //console.log("isSeenOnBlockchain: ", isSeenOnBlockchain.data)
        if (isSeenOnBlockchain.status !== 200) {
            setTxhashValidatorError("Transaction not found in blockchain")
            return
        }


        // Check if receiving address is valid
        var validation = ethAdddressChecker(wlogAddress)
        if (validation) {
            try {
                console.log("Handle swap request")
                setFormStep("REVIEW")
            }catch(e){
                console.log("burn error: ", e)
            }
        } else {
            setAddressValidatorError("Invalid Ethereum wallet address")
        }
    }

    function proceedSwap() {
        var data = {
            txid: txhash,
            userWlogAddress: wlogAddress,
            depositAddress: props.address,
            network: network?.network
        }

        dispatch(swapRequest(data))
        console.log("SEnd to api: ", data)
        setFormStep("SUCCESS")
    }

    //console.log("swap status: ", swapStatus)

    return (
        <form>
            <SwapWrapper className={process.env.REACT_APP_THEME === "PURPLE" ? "purple_wood_section" : "green_wood_section"}>
                <TwoColumnContainer>
                    <div>
                        <div style={{ height: "auto", margin: "0 auto", maxWidth: 128, width: "100%" }}>
                            <QRCode
                                size={256}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                value={props.address}
                                viewBox={`0 0 256 256`}
                            />
                        </div>
                        <p className="font-bold mb0">Log Address</p>
                        <p 
                            className="fs12px pointer mb0" 
                            style={{marginBottom: '0 !important', color: '#00F0FF'}} 
                            onClick={() => {showCopiedNotification(); navigator.clipboard.writeText(props.address)}}
                        >
                            {props.address}
                        </p>
                        <div style={{height: "24px"}}>
                            {copied ? <span className="font-success fs12px">LOG address copied</span> : null}
                        </div>
                    </div>
                    <div className="g1" style={{width: '60%'}}>
                        
                        {formStep === "FORM" ?
                            <>
                                <FormInputWholeAccount
                                    name="transactionId"
                                    type="text"
                                    placeholder='Transaction Id'
                                    aria-label='transactionId'
                                    className="mb1halfem"
                                    onChange={(e) => {
                                        setTxhash(e.target.value)
                                        if(e.target.value !== "")setTxhashValidatorError("")
                                    }} 
                                />
                                {txhashValidationError ? <p className="eMessage">{txhashValidationError}</p> : null}
                                <FormInputWholeAccount
                                    name="wlogAddress"
                                    type="text"
                                    placeholder='WLOG Address'
                                    aria-label='wlogAddress'
                                    className="mb1halfem" 
                                    onChange={(e) => {
                                        setWlogAddress(e.target.value)
                                        if(e.target.value !== "")setAddressValidatorError("")
                                    }}
                                />
                                {addressValidationError ? <p className="eMessage">{addressValidationError}</p> : null}
                                {/* <FormInputWholeAccount
                                    name="amount"
                                    type="number"
                                    placeholder='Amount'
                                    aria-label='amount'
                                    className="mb1halfem" 
                                    onChange={(e) => {
                                        setAmount(parseInt(e.target.value))
                                        if(e.target.value !== "")setAmountValidatorError("")
                                    }}
                                />
                                {amountValidationError ? <p className="eMessage">{amountValidationError}</p> : null} */}

                                <Button onClick={(e) => { e.preventDefault(); swapCode()}}>Submit</Button>
                            </>
                            :
                            null
                        }

                        {formStep === "REVIEW" ?
                            <>
                                <p className="font-gray">The WLOG token will be sent to these address:</p>
                                <p className="font-green">{wlogAddress}</p>

                                <div>
                                    <Button onClick={(e) => { e.preventDefault(); setFormStep("FORM")}}>Change Address</Button>
                                    <Button onClick={(e) => { e.preventDefault(); proceedSwap()}}>Continue</Button>
                                </div>
                            </>
                            :
                            null
                        }

                        {formStep === "SUCCESS" ?
                            <>
                                {swapStatus.isLogSuccess ?
                                    <div className="status-container font-green g1">
                                        <img src="wlog_status_form.png" width={"81px"}/>
                                        <span>Wlog sent to your address</span>
                                        <Button 
                                            onClick={(e) => { 
                                                e.preventDefault()
                                                setFormStep("FORM")
                                                dispatch(clearLogState())
                                            }}
                                        >
                                                Okay
                                        </Button>
                                    </div>
                                    :
                                    null
                                }
                                {swapStatus.isLogFetching ?
                                    <div className="status-container font-green g1">
                                        <img src="wlog_status_form.png" width={"81px"}/>
                                        <span className="loadingWallet">Processing swap request ...</span>
                                    </div>
                                    :
                                    null
                                }
                                {swapStatus.errorLogMessage ?
                                    <div className="status-container font-green g1">
                                        <img src="wlog_status_form.png" width={"81px"}/>
                                        <span className="eMessage">{ swapStatus.errorLogMessage }</span>
                                        <Button 
                                            onClick={(e) => { 
                                                e.preventDefault()
                                                setFormStep("FORM")
                                                dispatch(clearLogState())
                                            }}
                                        >
                                                Okay
                                        </Button>
                                    </div>
                                    :
                                    null
                                }
                            </>
                            :
                            null
                        }   
                    </div>
                </TwoColumnContainer>
            </SwapWrapper>
        </form>
    )
}

export default SwapForm;
