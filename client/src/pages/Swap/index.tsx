import  React, {useState, useEffect} from "react"
import Wallet from "../../components/Wallet";
import SwapForm from "../../components/SwapForm";
import SwapInstructionalModal from "../../components/SwapInstructionalModal";
import { GetLogAddressAPI } from "../../api/getLogAddress";
import { simpleContractAddress } from "../../contract";
import { SourceMap } from "module";

function Swap() {
    const [modalShow, setModalShow] = useState(false);
    const [logAddress, setLogAddress] = useState(null);
    const [checked, setIsChecked] = useState(0);
    
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

            let modalStorage = localStorage.getItem("hide_swap_instruction");

            //console.log("modalStorage: ", modalStorage)
            if (modalStorage) {
                //console.log("storage", modalStorage);
                if(modalShow)setModalShow(false)
            } else {
                //console.log("else modalstorage")
                if(!modalShow)setModalShow(true)
            }
            
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


    return (<>
        <div className={process.env.REACT_APP_THEME === "PURPLE" ? "maincontainer flex-auto main_black" : "maincontainer flex-auto"}>
            <div className="dashboard-container  tree_rings_bg">
                <div className="width100 d-flex flex-column justify-content-center align-items-center">
                    <div className="width70 d-flex flex-column justify-content-center">
                        <div className="text-white justify-content-center">
                            <div className="notificationContainer text-white">
                                <p className="mb0">The minimum swap is 100 LOGs. Make sure to send the correct amount because we don't offer a refund.</p>
                            </div>
                            <p className={process.env.REACT_APP_THEME === "PURPLE" ? 
                                "font-weight-bold titlefs text-center purple_gradient_text" 
                                : 
                                "font-weight-bold titlefs text-center"}
                            >
                                SWAP
                            </p>
                            <p className="font-weight-bold text-center wordBreakWord">WLOG contract address ({simpleContractAddress})</p>
                            <p className="font-weight-bold text-center word-wrap">Import WLOG token to your meta mask wallet</p>

                            
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
                                    Wlog/Matic trading pair is now available in <a href="https://www.sushi.com/swap" target="_blank">Sushiswap</a>
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