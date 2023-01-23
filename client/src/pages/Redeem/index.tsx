import  React, {useState, useEffect} from "react"
import { useEthers, useEtherBalance, Localhost } from '@usedapp/core'
import Button from 'react-bootstrap/Button';
import Wallet from "../../components/Wallet";
import RedeemForm from "../../components/RedeemForm";
import RedeemInstructionalModal from "../../components/RedeemInstructionalModal";
import ConnectWalletModal from "../../components/ConnectWalletModal";
import ConnectToWalletForm from "../../components/ConnectToWalletForm";

function Redeem() {
    const { account, deactivate } = useEthers();

    const [modalShow, setModalShow] = useState(false);
    const [walletModalShow, setWalletModalShow] = useState(false);
    const [checked, setIsChecked] = useState(0);

    const handleDontShowCheckbox = (e: any) => {
        setIsChecked(e.target.checked);
        localStorage.setItem("hide_redeem_instruction", e.target.checked);
    };

    /**
     * Call backend API to return woodcoin address
     * where the user should send the LOG to swap
    **/
    useEffect(() => {
        let modalStorage = localStorage.getItem("hide_redeem_instruction");

        //.log("modalStorage: ", modalStorage)
        if (modalStorage) {
            //console.log("storage", modalStorage);
            if(modalShow)setModalShow(false)
        } else {
            //console.log("else modalstorage")
            //console.log("modalShow: ", modalShow)
            //console.log("walletModalShow: ", walletModalShow)
            if(!modalShow && !walletModalShow)setModalShow(true)
        }       
    }, [])

    const clearStorage = () => {
        localStorage.removeItem("hide_redeem_instruction");
    };

    /** 
     * 
    **/
    useEffect(() => {
        if(account) setWalletModalShow(false)
    }, [account])

    return (<>
        <div className="dc">
            <div className="dashboard-container">
                <div className="wood-bg width100 d-flex flex-column justify-content-center">
                    <div className="width70 d-flex flex-column justify-content-center">
                        <div className="text-white pv4h1 dots-container justify-content-center">
                            <p className="font-weight-bold titlefs text-center word-wrap">Redeem</p>
                            
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <div className="desc-container">
                                    {account ? 
                                        <RedeemForm />
                                        :
                                        <ConnectToWalletForm setWalletModalShow={setWalletModalShow}/>
                                    }
                                </div>
                            </div>

                            <p onClick={() => setModalShow(true)} style={{cursor: 'pointer', color: '#3D766C', textAlign: 'left'}}>
                                Show Redeem instructional modal
                            </p>
                            <button onClick={clearStorage}> Clear Storage</button>

                            <RedeemInstructionalModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                handleDontShowCheckbox={handleDontShowCheckbox}
                            />

                            <ConnectWalletModal
                                show={walletModalShow}
                                onHide={() => setWalletModalShow(false)}
                                setWalletModalShow={setWalletModalShow}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Redeem;