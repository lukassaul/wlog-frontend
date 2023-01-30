import React from "react";
import { useSelector } from 'react-redux'
import { RootState } from "../../app/store";
import { simpleContractAddress } from "../../contract";

function Faq()  {

  const IntroSection = () => {
    return (
      <div className="flex-row-spacebetween font-white">

        <div className="width60">
          <p className={process.env.REACT_APP_THEME === "PURPLE" ? 
            "purple_gradient_text font-weight-bold titlefs text-center word-wrap" 
            : 
            "font-weight-bold titlefs text-center word-wrap"}
          >Transparent Wrappers can improve LOG Handling and Trading</p>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="desc-container">
              <p className="text-justify">The proof of reserve is on-chain, which shows the exact 1:1 between
minted WLOG tokens and LOG stored by the custodians. When WLOG token
holders redeem their tokens for LOG, the tokens are burned (no CO2 is
added to the atmosphere in this process). The minting and burning of
tokens is in turn tracked and verifiable on the blockchains.</p>
            </div>
          </div>
        </div>

        <div>
          <img 
            src={process.env.REACT_APP_THEME === "PURPLE" ? 
            "https://res.cloudinary.com/dba8ifej6/image/upload/v1674704033/wrapped_log_purple_vhk3jk.png"
            : 
            "https://res.cloudinary.com/dba8ifej6/image/upload/v1674704034/wrapped_log_yellow_i7w2mp.png"} 
            className="imgSize100"
          />
        </div>

      </div>
    )
  }

  const ContractSection = () => {
    return (
      <div className={process.env.REACT_APP_THEME === "PURPLE" ? "purple_tree_section" : "green_tree_section"}>
        <div className="font-white">
          <p className="font-weight-bold text-center wordBreakAll">WLOG contract address ({simpleContractAddress})</p>
          <p className="font-weight-bold text-center wordBreak">Import WLOG token to your meta mask wallet</p>
        </div>
      </div>
    )
  }

  const ProofSection = () => {
    return (
      <div>
        <p className="pct subtitlefs font-weight-bold text-white">PROOF OF ASSETS</p>

        <div className="d-flex container-br purple_gradient_2 mv2h1 pv2h1 font-white">
          <div className="flex-fill p-2">
            <p className="subtitlefs font-weight-bold">Network</p>
            <div>
              <img src="/wlog_logo_colored.png" width="50px" height="50px" />
              <span className="fs15em font-weight-bold">100,000 WLOG</span>
            </div>
          </div>
          <div className="flex-fill p-2">
            <p className="subtitlefs font-weight-bold">Custody</p>
            <div>
              <img src="/logIcon.png" width="50px" height="50px"/>
              <span className="fs15em font-weight-bold">100,000 LOG</span>
            </div>
          </div>
        </div>

        <div className="pv4h1">
          <p className="font-white text-justify">The Woodcoin address below is a multisignature address that is associated with four (4) private keys and are controlled by the custodians.</p>
          <div className="custodianAddTable">
            <table className="table table-bordered table_purplelt_bg font-white">
              <thead>
                <th className="th-sm font-weight-bold">Woodcoin Address</th>
                <th className="th-sm font-weight-bold">Balance Amount</th>
              </thead>
              <tbody>
                <tr>
                  <td className="w-50 text text-truncate">

                    <span><a href="https://explorer.woodcoin.org/address/3Pcard62U2tfLWtsjSARZ28K7gvnBrAgaS" target="_blank">
                    3Pcard62U2tfLWtsjSARZ28K7gvnBrAgaS
                  </a></span>
                  </td>
                  <td>100,000.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="custodianAddDiv">
            <table>
              <tbody>
                <tr><td>Woodcoin Address</td></tr>
                <tr><td className="wordBreakAll"><a href="https://explorer.woodcoin.org/address/3Pcard62U2tfLWtsjSARZ28K7gvnBrAgaS" className="font-white" target="_blank">
                3Pcard62U2tfLWtsjSARZ28K7gvnBrAgaS
              </a></td></tr>
                <tr><td>Balance Amount</td></tr>
                <tr><td className="font-white">100,000.00</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  const CommunitySection = () => {
    return (
      <div className="dc">
        <div className={process.env.REACT_APP_THEME === "PURPLE" ? "purple_wood_section" : "dark_green_section"}>
            <div className="width70 d-flex flex-column justify-content-center">
                <div>
                  <p className="pct subtitlefs font-weight-bold font-white">JOIN THE COMMUNITY</p>
                  <div className="container">
                    <div className="column">
                      <div className="col-sm flex-row-spacearound mb2 g2">
                        <div className={process.env.REACT_APP_THEME === "PURPLE" ? "purple_gradient w25h280 flex-center-col g2" : "green_gradient w25h280 flex-center-col g2"}>
                          <a href="https://vtscc.org/" target="_blank">
                            <img
                              src={process.env.REACT_APP_THEME === "PURPLE" ? "https://res.cloudinary.com/dba8ifej6/image/upload/v1674616586/vermont_logo_ohqypx.png" : "https://res.cloudinary.com/dba8ifej6/image/upload/v1674620116/vermont_logo_white_vmdpcb.png"}
                              height="128px"
                              className="community_img"
                            />
                          </a>
                        </div>
                        <div className={process.env.REACT_APP_THEME === "PURPLE" ? "purple_gradient w35h320 flex-center-col g2" : "green_gradient w35h320 flex-center-col g2"}>
                          <img
                            src="/papa_flammy.png"
                            className="community_img largeImgCommunity"
                          />
                          <div>
                            <p className="font-white">"The handsome Pappa Flammy of <a href="https://www.youtube.com/watch?v=8oOS7uGY4nk" className="font-white" target="_blank">Flammable Maths fame.</a>"</p>
                          </div>
                        </div>
                        <div className={process.env.REACT_APP_THEME === "PURPLE" ? "purple_gradient w25h280 flex-center-col g2" : "green_gradient w25h280 flex-center-col g2"}>
                          <a href="https://hermesus.com/" target="_blank">
                            <img
                              src="https://res.cloudinary.com/dba8ifej6/image/upload/v1674476831/hermesus_logo_lyjokt.svg"
                              width="240px"
                              className="community_img"
                            />
                            <p className="font-white">Cryptocurrency Trading Platform With Custodial Services</p>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
      </div>
    )
  }

  return(
    <div className={process.env.REACT_APP_THEME === "PURPLE" ? "maincontainer main_black" : "maincontainer main_green_gradient"}>
      <div className="tree_rings_bg flex-col-g6">
        <div className="dashboard-container">
            <div className="d-flex flex-column justify-content-center">
              {IntroSection()}
            </div>
        </div>

        {ContractSection()}

        <div className="dashboard-container">
          <div className="width80 d-flex flex-column justify-content-center">
            {ProofSection()}
          </div>
        </div>

        {CommunitySection()}

        <div className="footer">
          &nbsp
        </div>
      </div>
      
  </div>
  )
}

export default Faq;
