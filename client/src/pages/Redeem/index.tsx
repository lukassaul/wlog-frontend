import  React, {useState, useEffect} from "react"
import { useEthers, useEtherBalance, Localhost } from '@usedapp/core'
import Button from 'react-bootstrap/Button';
import Wallet from "../../components/Wallet";
import RedeemForm from "../../components/RedeemForm";
import RedeemInstructionalModal from "../../components/RedeemInstructionalModal";
import ConnectWalletModal from "../../components/ConnectWalletModal";
import ConnectToWalletForm from "../../components/ConnectToWalletForm";
import { GetLogBalanceBEAPI } from "../../api/getLogBalanceBackend";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { logBalanceGetRequest } from "../../features/redeemSlice";

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
    // useEffect(() => {
    //     let modalStorage = localStorage.getItem("hide_redeem_instruction");

    //     if (modalStorage) {
    //         if(modalShow)setModalShow(false)
    //     } else {
    //         if(!modalShow && !walletModalShow)setModalShow(true)
    //     }       
    // }, [])

    const clearStorage = () => {
        localStorage.removeItem("hide_redeem_instruction");
    };

    /** 
     * 
    **/
    useEffect(() => {
        if(account) setWalletModalShow(false)
    }, [account])

    useEffect(() => {
        GetLogBalanceBEAPI()
    }, [])

    /**
     * Get Wlog balance to display the maximum amount available for swap
     */
    const dispatch = useDispatch<AppDispatch>()
    const {
        maxRedeemAmount,
        isGetLogBalanceSuccess,
        isGetLogBalanceFetching,
        errorGetLogBalanceMessage
    } = useSelector((state: RootState) => state.redeem)
    
    useEffect(() => {
        dispatch(logBalanceGetRequest("address"));
    }, [dispatch]);


    return (<>
        <div className={process.env.REACT_APP_THEME === "PURPLE" ? "maincontainer flex-auto main_black" : "maincontainer flex-auto main_green"}>
            <div className="dashboard-container-no-pad tree_rings_bg">
                <div className="width100 d-flex flex-column justify-content-center align-items-center">
                    <div className="width70 d-flex flex-column justify-content-center">
                        <div className="text-white justify-content-center">
                            <div className="notificationContainer text-white">
                                <p className="mb0">The maximum redeem amount is <span className="font-weight-bold">{maxRedeemAmount} WLOGs</span>.</p>
                            </div>
                            <p className={process.env.REACT_APP_THEME === "PURPLE" ? 
                                "font-weight-bold titlefs text-center purple_gradient_text" 
                                : 
                                "font-weight-bold titlefs text-center"
                            }>Redeem</p>
                            
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <div className="desc-container">
                                    {account && maxRedeemAmount ? 
                                        <RedeemForm maxRedeemAmount={maxRedeemAmount} />
                                        :
                                        <ConnectToWalletForm setWalletModalShow={setWalletModalShow}/>
                                    }
                                </div>
                            </div>

                            <p onClick={() => setModalShow(true)} style={{cursor: 'pointer', color: '#c1c1c1', textAlign: 'center'}}>
                                Show Redeem instructional modal
                            </p>
                            {/* <button onClick={clearStorage}> Clear Storage</button> */}

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