import React from "react"
import QRCode from "react-qr-code";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function RedeemInstructionalModal(props: any) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="purple_gradient"
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
            <div className="pv0h1">
                <ul>
                    <li>
                        <span className="cyanbg">1</span>Check Wallet connection
                        <div> 
                            <div className="flex-center-css">
                                <p style={{marginLeft: '3em'}}>Make sure you are connected to the Meta Mask wallet, 
if you haven't connected yet you can click this button to connect.</p>
                                <p className={process.env.REACT_APP_THEME === "PURPLE" ? "purpleButton" : "yellowButton"}>Connect to Wallet</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <span className="purplebg">2</span>Fill up Woodcoin address field.
                        <div>
                            <div className="flex-center-css mv1">
                                <p style={{marginLeft: '3em'}}>Enter your woodcoin address where you want the LOG to be sent.</p>
                                <div className="instructional-input">Woodcoin Address</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <span className="pinkbg">3</span>Enter the amount you want to redeem.
                        <div>
                            <div className="flex-center-css mv1">
                                <div className="instructional-input">Amount</div>
                                <p className={process.env.REACT_APP_THEME === "PURPLE" ? "purpleButton mv1" : "greenButton mv1"}>Redeem</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <label>
                <input type="checkbox" onChange={props.handleDontShowCheckbox} className="mr1"/>
                Don't Show me again
            </label>
            <span className={process.env.REACT_APP_THEME === "PURPLE" ? "purpleButton pointer" : "greenButton pointer"} onClick={props.onHide}>Okay</span>
        </Modal.Footer>
      </Modal>
    );
  }

export default RedeemInstructionalModal