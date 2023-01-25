import React from "react";
import { useSelector } from 'react-redux'
import { RootState } from "../../app/store";

function Home()  {

  return(
    <div className="maincontainer">
      <div className="dc">
        <div className="dashboard-container">
          <div className="wood-bg d-flex flex-column justify-content-center">
            <div className="width70 d-flex flex-column justify-content-center">
              <div className="text-white pv2 dots-container justify-content-center">

                <p className="font-weight-bold titlefs text-center word-wrap">Transparent Wrappers can improve LOG Handling and Trading</p>
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

              {/* <div className="dots-container d-flex flex-column justify-content-center align-items-center">
                <p className="text-center font-weight-bold bigtitlefs text-white word-wrap">COMING SOON!</p>
              </div> */}

              <p className="pct subtitlefs font-weight-bold text-white">PROOF OF ASSETS</p>

              <div className="d-flex container-br darkgreen_container mv2h1 pv2h1 font-white">
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
                  <p>The Woodcoin address below is a multisignature address that is associated with four (4) private keys and are controlled by the custodians.</p>
                <table className="table table-bordered">
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

            </div>
          </div>
        </div>
      </div>

      <div className="dc">
      {process.env.REACT_APP_THEME === "PURPLE" ?
        <div className="wood_section">
            <div className="width70 d-flex flex-column justify-content-center">
                <div>
                  <p className="pct subtitlefs font-weight-bold font-white">JOIN THE COMMUNITY</p>
                  <div className="container">
                    <div className="column">
                      <div className="col-sm flex-row-spacearound mb2 g2">
                        <div className="purple_gradient w25h280 flex-center-col g2">
                          <a href="https://vtscc.org/" target="_blank">
                            <img
                              src="https://res.cloudinary.com/dba8ifej6/image/upload/v1674616586/vermont_logo_ohqypx.png"
                              height="128px"
                              className="community_img"
                            />
                          </a>
                        </div>
                        <div className="purple_gradient w35h320 flex-center-col g2">
                          <img
                            src="/papa_flammy.png"
                            width="320px"
                            height="auto"
                            className="community_img"
                          />
                          <div>
                            <p className="font-white">"The handsome Pappa Flammy of <a href="https://www.youtube.com/watch?v=8oOS7uGY4nk" className="font-white" target="_blank">Flammable Maths fame.</a>"</p>
                          </div>
                        </div>
                        <div className="purple_gradient w25h280 flex-center-col g2">
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
        :
        <div className="dark_green_section">
            <div className="width70 d-flex flex-column justify-content-center">
                <div>
                  <p className="pct subtitlefs font-weight-bold font-white">JOIN THE COMMUNITY</p>
                  <div className="container">
                    <div className="column">
                      <div className="col-sm flex-row-spacearound mb2 g2">
                        <div className="green_gradient w25h280 flex-center-col g2">
                          <a href="https://vtscc.org/" target="_blank">
                            <img
                              src="https://res.cloudinary.com/dba8ifej6/image/upload/v1674620116/vermont_logo_white_vmdpcb.png"
                              height="128px"
                              className="community_img"
                            />
                          </a>
                        </div>
                        <div className="green_gradient w35h320 flex-center-col g2">
                          <img
                            src="/papa_flammy.png"
                            width="320px"
                            height="auto"
                            className="community_img"
                          />
                          <div>
                            <p className="font-white">"The handsome Pappa Flammy of <a href="https://www.youtube.com/watch?v=8oOS7uGY4nk" className="font-white" target="_blank">Flammable Maths fame.</a>"</p>
                          </div>
                        </div>
                        <div className="green_gradient w25h280 flex-center-col g2">
                          <a href="https://hermesus.com/" target="_blank" style={{ textDecoration: 'none'}}>
                            <img
                              src="https://res.cloudinary.com/dba8ifej6/image/upload/v1674476831/hermesus_logo_lyjokt.svg"
                              width="240px"
                              className="community_img"
                            />
                            <p className="font-white mt1">Cryptocurrency Trading Platform With Custodial Services</p>
                          </a>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
            </div>
        </div>
      }
      </div>

      <div className="footer bg-darkgreen">
        &nbsp
      </div>
  </div>
  )
}

export default Home;
