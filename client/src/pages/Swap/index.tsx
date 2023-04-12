import  React, {useState, useEffect} from "react"
import Wallet from "../../components/Wallet";
import SwapForm from "../../components/SwapForm";
import SwapInstructionalModal from "../../components/SwapInstructionalModal";
import { GetLogAddressAPI } from "../../api/getLogAddress";
import { simpleContractAddress } from "../../contract";
import { SourceMap } from "module";
import { getWLOGBalance } from "../../utils/getTokenBalance";

function Swap() {
    const [modalShow, setModalShow] = useState(false);
    const [logAddress, setLogAddress] = useState(null);
    const [checked, setIsChecked] = useState(0);
    const [maxSwapAmount, setMaxSwapAmount] = useState('0');
    
    const handleDontShowCheckbox = (e: any) => {
        setIsChecked(e.target.checked);
        localStorage.setItem("hide_swap_instruction", e.target.checked);
    };

    /**
     * Call backend API to return woodcoin address
     * where the user should send the LOG to swap
    **/

    function generateAddress() {
        try {
            var hd = window.coinjs.hd(process.env.REACT_APP_XPUB)
            let x = Math.random() * 100;
            const INDEX = Math.floor(x)

            var address = hd.derive(INDEX)
            setLogAddress(address.keys.address)

            // let modalStorage = localStorage.getItem("hide_swap_instruction");

            // if (modalStorage) {
            //     if(modalShow)setModalShow(false)
            // } else {
            //     if(!modalShow)setModalShow(true)
            // }
            
        }catch(e) {
            console.log("ERROR")
        }
    }

    useEffect(() => {
        // GetLogAddressAPI().then(res => {
        //     if(res.data.address) {
        //         setLogAddress(res.data.address)

        //         let modalStorage = localStorage.getItem("hide_swap_instruction");

        //         //console.log("modalStorage: ", modalStorage)
        //         if (modalStorage) {
        //             //console.log("storage", modalStorage);
        //             if(modalShow)setModalShow(false)
        //         } else {
        //             //console.log("else modalstorage")
        //             if(!modalShow)setModalShow(true)
        //         }
            
        //     }
        // })
        generateAddress()
    }, [])

    const clearStorage = () => {
        localStorage.removeItem("hide_swap_instruction");
    };


    /**
     * Get Wlog balance to display the maximum amount available for swap
     */
    const getMaxSwap = async() => {
        let amount = await getWLOGBalance()
        setMaxSwapAmount(amount)
    }
    useEffect(() => {
        getMaxSwap()
    }, [])


    return (<>
        <div className={process.env.REACT_APP_THEME === "PURPLE" ? "maincontainer flex-auto main_black" : "maincontainer flex-auto"}>
            <div className="dashboard-container  tree_rings_bg">
                <div className="width100 d-flex flex-column justify-content-center align-items-center">
                    
                    <div className="flex-row-spacebetween">

                        <div className="flex-center-col width40 text-white">
                            <p className="mb0">The minimum swap is <span className="font-weight-bold">100 LOGs</span> and maximum is <span className="font-weight-bold">{maxSwapAmount} LOGs</span>.</p> 
                            <p className="fs3em">Transfer at your own risk.</p>
                            <p className="mb2">Make sure to send the correct amount because we don't offer a refund.</p>
                            <p className="text-center word-wrap">Please report any errors to <a href="https://discord.com/login?redirect_to=%2Fchannels%2F572007943600472066%2F925855127439556609" target="_blank">Woodcoin Discord</a></p>
                        </div>

                        <div className="text-white flex-center-col width70">

                            <div className="notificationContainer width90 text-white">
                                <p className="text-center word-wrap mb0">Warning - Redeem and Swap prototypes are for test purposes only - Transfer at your own risk.</p>
                            </div>
                            
                            <p className={process.env.REACT_APP_THEME === "PURPLE" ? 
                                "font-weight-bold titlefs text-center purple_gradient_text" 
                                : 
                                "font-weight-bold titlefs text-center"}
                            >
                                SWAP
                            </p>
                            <p className="text-center wordBreakWord mb0">WLOG contract address ({simpleContractAddress})</p>
                            <p className="text-center word-wrap">Import WLOG token to your meta mask wallet</p>

                            <p className="font-blue">A transaction fee of 2% will be deducted.</p>
                            
                            <div>
                                
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <div className="desc-container">
                                        {logAddress ? <SwapForm address={logAddress} />: null }
                                    </div>
                                </div> 
                                    
                                <p onClick={() => setModalShow(true)} style={{cursor: 'pointer', color: '#fff', textAlign: 'center'}}>
                                    Show Swap instructional modal
                                </p>
                                <p className="text-center text-white word-wrap">
                                    Wlog trading pair is now available in <a href="https://app.uniswap.org/#/swap?exactField=input&exactAmount=100&inputCurrency=0x89F8bE64Da35308260BA2d13d0d1e7Fd80A3A210" target="_blank">Uniswap</a> and <a href="https://www.sushi.com/swap" target="_blank">Sushiswap</a>.
                                </p>
                            </div>
                            {/* <p onClick={clearStorage}> Clear Storage</p> */}

                            <SwapInstructionalModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                address={logAddress}
                                handleDontShowCheckbox={handleDontShowCheckbox}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Swap;