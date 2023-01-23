import  React, {useState, useEffect} from "react"
import Button from 'react-bootstrap/Button';
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
    useEffect(() => {
        GetLogAddressAPI().then(res => {
            if(res.data.address) {
                setLogAddress(res.data.address)

                let modalStorage = localStorage.getItem("hide_swap_instruction");

                //console.log("modalStorage: ", modalStorage)
                if (modalStorage) {
                    //console.log("storage", modalStorage);
                    if(modalShow)setModalShow(false)
                } else {
                    //console.log("else modalstorage")
                    if(!modalShow)setModalShow(true)
                }
            
            }
        })
    }, [])

    const clearStorage = () => {
        localStorage.removeItem("hide_swap_instruction");
    };


    return (<>
        <div className="dc">
            <div className="dashboard-container">
                <div className="wood-bg width100 d-flex flex-column justify-content-center">
                    <div className="width70 d-flex flex-column justify-content-center">
                        <div className="text-white pv4h1 dots-container justify-content-center">
                            <p className="font-weight-bold titlefs text-center word-wrap">SWAP</p>
                            <p className="font-weight-bold text-center word-wrap">WLOG contract address ({simpleContractAddress})</p>
                            <p className="font-weight-bold text-center word-wrap">Import WLOG token to your meta mask wallet</p>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <div className="desc-container">
                                    {logAddress ? <SwapForm address={logAddress} />: null }
                                </div>
                            </div>
                            <p onClick={() => setModalShow(true)} style={{cursor: 'pointer', color: '#3D766C', textAlign: 'left'}}>
                                Show Swap instructional modal
                            </p>
                            <button onClick={clearStorage}> Clear Storage</button>

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