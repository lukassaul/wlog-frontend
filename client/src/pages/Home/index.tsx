import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from 'react-redux'
import moment from "moment";
import Table from 'react-bootstrap/Table';
import TableFooter from "./TableFooter";
import { formatUnits } from '@ethersproject/units'
import { RootState, AppDispatch } from "../../app/store";
import { simpleContractAddress } from "../../contract";
import { GetLogBalanceAPI } from "../../api/getLogBalance";
import { getTokenBalance } from "../../utils/getTokenBalance";
import { getTokenMinted } from "../../utils/getTokenBalance";
import { formatCurrency } from "../../utils/numberFormatter";
import { useTotalSupply, useTotalMinted } from "../../hooks";
import { ethers } from "ethers";
import WLOG from "../../abi/WLOG.json";
import { reportGetRequest } from "../../features/reportSlice";
import useTable from "../../hooks/useTable";
import ReportTable from "./ReportTable";


function Home()  {
  const dispatch = useDispatch<AppDispatch>()
  const { transactions, isGetReportFetching, isGetReportSuccess } = useSelector((state: RootState) => state.report)

  const [logBalance, setLogBalance] = useState<string>()
  const [wlogBalance, setWLogBalance] = useState<string>()
  const [totalMinted, setTotalMinted] = useState<string>()
  
  const provider = new ethers.providers.JsonRpcProvider('https://polygon-mainnet.infura.io/v3/5f889400e82546ae9e9052bca6de4706');

  const getBal = async () => {
    let logBalApi = await GetLogBalanceAPI()
    if(logBalApi.data.balance) {
      setLogBalance(formatCurrency(logBalApi.data.balance))
    }

    let tbal = await getTokenBalance(process.env.REACT_APP_WLOGADDRESS)
    if(tbal) {
      setWLogBalance(tbal)
    }

    let mint = await getTokenMinted()
    if (mint) {
      setTotalMinted(mint)
    }
  }

  useEffect(() => {
    getBal()
    dispatch(reportGetRequest("report"))
  }, [])


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
            className="imgSize100 logImage"
          />
        </div>

      </div>
    )
  }

  const ContractSection = () => {
    return (
      <div className={process.env.REACT_APP_THEME === "PURPLE" ? "purple_tree_section" : "green_tree_section"}>
        <div className="font-white">
          <p className="font-weight-bold text-center wordBreakAll">
            WLOG Polygon contract address 
            <a 
              href="https://polygonscan.com/token/0x89F8bE64Da35308260BA2d13d0d1e7Fd80A3A210"
              target="_blank"
              style={{textDecoration: 'none', marginLeft: '8px'}}
            >
              ({simpleContractAddress})
            </a>
          </p>
          <p className="font-weight-bold text-center wordBreak">Import WLOG token to your meta mask wallet</p>
        </div>
      </div>
    )
  }


  const ProofSection = () => {
    return (
      <div>
        <p className="pct subtitlefs font-weight-bold text-white">PROOF OF ASSETS</p>

        <div className={process.env.REACT_APP_THEME === "PURPLE" ? 
          "d-flex container-br purple_gradient_2 mv2h1 pv2h1 font-white"
          :
          "d-flex container-br green_gradient_2 mv2h1 pv2h1 font-white"
        }>
          <div className="flex-fill p-2">
            <p className="subtitlefs font-weight-bold">Minted</p>
            <div>
              <img src="/wlog_logo_colored.png" width="50px" height="50px" />
              <span className="fs15em font-weight-bold"> { totalMinted } WLOG</span>
            </div>
          </div>
          <div className="flex-fill p-2">
            <p className="subtitlefs font-weight-bold">Custody</p>
            <div>
              <img src="/logIcon.png" width="50px" height="50px"/>
              <span className="fs15em font-weight-bold"> {totalMinted} LOG</span>
            </div>
          </div>
        </div>

        <div className="pv4h1 font-gray">
          <p className="text-justify">The Woodcoin address below is a multisignature address that is associated with four (4) private keys and are controlled by the custodians.</p>
          <div className="custodianAddTable">
            <table className="table table-bordered table_purplelt_bg taStart font-gray">
              <tbody>
                <tr>
                  <td className="w-50 text text-justify">
                    <p className="mrhalf">Woodcoin Address: </p>
                    <span><a href="https://explorer.woodcoin.org/address/3Pcard62U2tfLWtsjSARZ28K7gvnBrAgaS" target="_blank" className="font-white">
                    {process.env.REACT_APP_LOGADDRESS}
                  </a></span>
                  </td>
                  <td className="w-50 text text-truncate">
                    <p>Balance:</p>
                    <p>{logBalance}</p>
                  </td>
                  {/* <td className="w-50 text  text-justify">
                    <p className="mrhalf">Wlog Address: </p>
                      <span><a href="https://polygonscan.com/token/0x89f8be64da35308260ba2d13d0d1e7fd80a3a210?a=0x0a46ecf048619c53eca2f969eec0ba071c9a827c" target="_blank" className="font-white">
                      {process.env.REACT_APP_WLOGADDRESS}
                    </a></span>
                  </td> */}
                </tr>
                {/* <tr>
                  <td className="w-50 text text-truncate">
                    <span>Balance: {logBalance}</span>
                  </td>
                  <td className="w-50 text text-truncate">
                    <span>Balance: {wlogBalance}</span>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
          <div className="custodianAddDiv">
            <table className="table table-bordered table_purplelt_bg font-gray">
              <tbody>
                <tr><td>Woodcoin Address</td></tr>
                <tr><td className="wordBreakAll"><a href="https://explorer.woodcoin.org/address/3Pcard62U2tfLWtsjSARZ28K7gvnBrAgaS" className="font-white" target="_blank">
                {process.env.REACT_APP_LOGADDRESS}
              </a></td></tr>
                <tr><td>Balance</td></tr>
                <tr><td className="font-white">{logBalance}</td></tr>

                <tr><td>WLog Address</td></tr>
                <tr><td className="wordBreakAll"><a href="https://polygonscan.com/token/0x89f8be64da35308260ba2d13d0d1e7fd80a3a210?a=0x0a46ecf048619c53eca2f969eec0ba071c9a827c" className="font-white" target="_blank">
                {process.env.REACT_APP_WLOGADDRESS}
              </a></td></tr>
                <tr><td>Balance</td></tr>
                <tr><td className="font-white">{wlogBalance}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  const CommunitySection = () => {
    return (
      <div className="dc mb4">
        <div className={process.env.REACT_APP_THEME === "PURPLE" ? "purple_wood_section" : "green_wood_section"}>
            <div className="width70 d-flex flex-column justify-content-center">
                <div>
                  <p className="pct subtitlefs font-weight-bold font-white">JOIN THE COMMUNITY</p>
                  <div className="container">
                    <div className="column">
                      <div className="col-sm flex-row-spacearound-centersm mb2 g2">
                        <div className={process.env.REACT_APP_THEME === "PURPLE" ? "purple_gradient w25h280 flex-center-col g2 community" : "green_gradient w25h280 flex-center-col g2 community"}>
                          <a href="https://vtscc.org/" target="_blank">
                            <img
                              src={process.env.REACT_APP_THEME === "PURPLE" ? "https://res.cloudinary.com/dba8ifej6/image/upload/v1674616586/vermont_logo_ohqypx.png" : "https://res.cloudinary.com/dba8ifej6/image/upload/v1674620116/vermont_logo_white_vmdpcb.png"}
                              height="128px"
                              className="community_img"
                            />
                          </a>
                        </div>
                        <div className={process.env.REACT_APP_THEME === "PURPLE" ? "purple_gradient w35h320 flex-center-col g2 community" : "green_gradient w35h320 flex-center-col g2 community"}>
                          <img
                            src="/papa_flammy.png"
                            className="community_img largeImgCommunity"
                          />
                          <div>
                            <p className="font-white"><a href="https://www.youtube.com/watch?v=8oOS7uGY4nk" className="font-white" target="_blank">Flammable Maths</a> is a good place to learn about LOGs.</p>
                          </div>
                        </div>
                        <div className={process.env.REACT_APP_THEME === "PURPLE" ? "purple_gradient w25h280 flex-center-col g2 community" : "green_gradient w25h280 flex-center-col g2 community"}>
                          <a href="https://hermesus.com/" target="_blank" className="anchorNoStyle">
                            <img
                              src="https://res.cloudinary.com/dba8ifej6/image/upload/v1674476831/hermesus_logo_lyjokt.svg"
                              className="community_img imgSize240"
                            />
                            <p className="font-white mt1 fs12px">Cryptocurrency Trading Platform With Custodial Services</p>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="column">
                      <div className="col-sm flex-row-spacearound-centersm mb2 g2">
                        <div className={process.env.REACT_APP_THEME === "PURPLE" ? "purple_gradient w25h280 flex-center-col g2 community" : "green_gradient w25h280 flex-center-col g2 community"}>
                          <a href="https://woodcoin.info/" target="_blank" className="anchorNoStyle">
                            <p className="font-white subtitlefs">woodcoin.info</p>
                            <p className="font-white fs12px">The trees, and public coins, are something that all people need.</p>
                          </a>
                        </div>
                        <div className={process.env.REACT_APP_THEME === "PURPLE" ? "purple_gradient w25h280 flex-center-col g2 community" : "green_gradient w25h280 flex-center-col g2 community"}>
                          <a href="https://twigchain.com/" target="_blank" className="anchorNoStyle">
                            <img
                              src="https://res.cloudinary.com/dba8ifej6/image/upload/v1675061881/logo_twigchain_b7unlc.png"
                              //width="240px"
                              className="community_img"
                            />
                            <p className="font-white mt1 fs12px">Woodcoin Block Explorer</p>
                          </a>
                        </div>
                        <div className={process.env.REACT_APP_THEME === "PURPLE" ? "purple_gradient w25h280 flex-center-col g2 community" : "green_gradient w25h280 flex-center-col g2 community"}>
                          <a href="https://woodcoin.org/" target="_blank">
                            <img
                              src="https://res.cloudinary.com/dba8ifej6/image/upload/v1675061881/logo_woodcoinOrg_ixlfyj.png"
                              //width="240px"
                              className="community_img"
                            />
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


  const TransactionSection = () => {
    let swapTx = transactions.swapTxToday
    let redeemTx = transactions.redeemTxToday
    let allTx = transactions.allTx
    
    return (
      <div className="width70 mv4h1">
        <div className="flex-row-spacearound mb2">
          <div>
            <p className="fs15em font-white">Number of Swap transactions today</p>
            <p className="fs2em font-yellow">{swapTx.length > 0 ? swapTx.lenght : "No transactions"}</p>
          </div>
          <div>
            <p className="fs15em font-white">Number of Redeem transactions today</p>
            <p className="fs2em font-yellow">{redeemTx.length > 0 ? redeemTx.lenght : "No transactions"}</p>
          </div>
        </div>
        <div>
          <ReportTable data={transactions.allTx} rowsPerPage={20} />
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
      </div>
      {isGetReportSuccess && transactions.allTx.length > 0 ? 
        <div className="dashboard-container">
          {TransactionSection()}
        </div>
        : 
        null
      }
      
  </div>
  )
}

export default Home;
