import React from "react"
import QRCode from "react-qr-code";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function SwapInstructionalModal(props: any) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="purple_modal_gradient">
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
            <div className="pv0h1 text-white">
                <ul>
                    <li>
                        <span className="cyanbg">1</span>Send Woodcoin to the address shown or scan the QR code.
                        <div>
                            <div className="flex-center-css minHeight190">
                                <div style={{ height: "auto", margin: "0 auto", maxWidth: 94, width: "100%" }}>
                                    <QRCode
                                        size={256}
                                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                        value={props.address}
                                        viewBox={`0 0 256 256`}
                                    />
                                </div>
                                <p className="font-gray font-weight-bold mb0" style={{marginTop: '1em'}}>Log Address</p>
                                <p className="font-green mb0">{props.address}</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <span className="purplebg">2</span>Enter the Polygon address where you want the WLOG to be sent.
                        <div>
                            <div className="flex-center-css minHeight190 g1">
                                {/* <div className="instructional-input">Transaction ID</div> */}
                                <div className="instructional-input">Wlog Address</div>
                                {/* <div className="instructional-input">Amount</div> */}
                            </div>
                        </div>
                    </li>
                    <li>
                        <span className="pinkbg">3</span>Wait for your WLOG
                        <div>
                            <div className="flex-center-css">
                            <p className="mb0" style={{marginTop: '1em'}}>The system will return a transaction id for the WLOG transfer.</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </Modal.Body>
        <Modal.Footer className="text-white">
            <label>
                <input type="checkbox" onChange={props.handleDontShowCheckbox} className="mr1"/>
                Don't Show me again
            </label>
            <span className={process.env.REACT_APP_THEME === "PURPLE" ? "purpleButton pointer" : "greenButton pointer"} onClick={props.onHide}>Okay</span>
        </Modal.Footer>
        </div>
      </Modal>
    );
  }

export default SwapInstructionalModal