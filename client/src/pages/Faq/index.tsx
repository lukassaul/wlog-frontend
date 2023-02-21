import React, { useRef, useState } from "react";
import { useSelector } from 'react-redux'
import { RootState } from "../../app/store";
import { simpleContractAddress } from "../../contract";

function Faq()  {
  const aboutRef = useRef()
  const transactionRef = useRef()
  const metamaskRef = useRef()

  const [showFAQ, setShowFAQ] = useState("ABOUT")

  const handleSectionShow = (section:string) => {
    setShowFAQ(section)
  }

  const TitleSection = () => {
    return (
      <div className={process.env.REACT_APP_THEME === "PURPLE" ? "purple_tree_section_nh" : "green_tree_section"}>
        <p className="font-weight-bold text-center font-white subtitlefs mb0">FAQs</p>
        <div className="width70 flex-start-css mv2h1 text-white">
          {/* <a href="#transactionRef" className="text-white text-justify">Adjusting Transaction fee in Woodcoin QT wallet</a>
          <a href="#Metamask" className="text-white text-justify">Setting up Metamask</a> */}

          <div className="divShowMobile flex-start-css">
            <p 
              className={ showFAQ === "ABOUT" ? "selectedFaq pointer" : "text-white pointer"}
              onClick={() => handleSectionShow("ABOUT")}
            >
              About LOG and WLOG
            </p>
            <p 
              className={ showFAQ === "TRANSACTION" ? "selectedFaq pointer" : "text-white pointer"}
              onClick={() => handleSectionShow("TRANSACTION")}
            >
              Adjusting Transaction fee in Woodcoin QT wallet
            </p>

            <p 
              className={ showFAQ === "METAMASK" ? "selectedFaq pointer" : "text-white pointer"}
              onClick={() => handleSectionShow("METAMASK")}
            >
              Setting up Metamask
            </p>
          </div>
        </div>
      </div>
    )
  }

  const Sidebar = () => {
    return (
      <div className="sidebar">
        <p 
          className={ showFAQ === "ABOUT" ? "selectedFaq pointer" : "text-white pointer"}
          onClick={() => handleSectionShow("ABOUT")}
        >
          About LOG and WLOG
        </p>

        <p 
          className={ showFAQ === "TRANSACTION" ? "selectedFaq pointer" : "text-white pointer"}
          onClick={() => handleSectionShow("TRANSACTION")}
        >
          Adjusting Transaction fee in Woodcoin QT wallet
        </p>

        <p 
          className={ showFAQ === "METAMASK" ? "selectedFaq pointer" : "text-white pointer"}
          onClick={() => handleSectionShow("METAMASK")}
        >
          Setting up Metamask
        </p>
      </div>
    )
  }
  
  const FaqSectionAbout = () => {
    return (
      <div className="dc mb4" id="aboutRef">
        <div className="width70 d-flex flex-column justify-content-center align-items-center gp2 text-white padding0Mobile1">
            <p className="subtitlefs mb4">About LOG and WLOG</p>

            <div className="width70 flex-start-css pv2h1">
              <p className="subtitlefs text-justify-bword">What is Woodcoin?</p>
              <p className="text-justify-bword">Woodcoin [LOG] is the original logarithmically growing money supply
coin, built with proof of work using the Skein hash function and relying
on the elliptic curve SECP256r1 for addressing and signatures.
</p>
            </div>

            <div className="width70 flex-start-css pv2h1">
              <p className="subtitlefs text-justify-bword">Why use WLOG?</p>
              <p className="text-justify-bword">WLOG enables us to use the so-called “decentralized exchcanges” to
enable easy access markets and get more liquidity for a more stable
value.</p>
            </div>

            <div className="width70 flex-start-css pv2h1">
              <p className="subtitlefs text-justify-bword">What about Privacy?</p>
              <p className="text-justify-bword">There are no privacy features, swaps and redeems are all public and the
records of LOG and WLOG are all public.</p>
            </div>

            <div className="width70 flex-start-css pv2h1">
              <p className="subtitlefs text-justify-bword">Where can I trade WLOG?</p>
              <p className="text-justify-bword"><a href="https://www.sushi.com/swap" target="_blank" className="font-white">Sushiswap</a> has some , any other defi market you like.</p>
            </div>

        </div>
      </div>
    )
  }

  const FaqSectionFee = () => {
    return (
      <div className="dc mb4" id="transactionRef">
        <div className="width70 d-flex flex-column justify-content-center align-items-center gp2 text-white padding0Mobile1">
            <p className="subtitlefs mb4">Adjusting Transaction fee in Woodcoin QT wallet</p>
            <div className="width70 flex-start-css pv2h1">
              <p className="text-justify-bword">In cryptocurrency, the transaction speed depends on the amount of fee you pay. You can reduce transaction time by paying a higher fee.</p>
              <p className="text-justify-bword">When using the Woodcoin QT wallet to transfer LOG, we recommend increasing the transaction fee to at least 0.001 LOG. Doing this can reduce the transaction time to 2-3 minutes.</p>
              <p className="text-justify-bword">Follow the instructions below if you want to adjust the transaction fee.</p>
            </div>

            <p className="text-justify-bword mv2h1">1. In your Woodcoin wallet, click on Settings in the top menu.</p>
            <img src="https://res.cloudinary.com/dba8ifej6/image/upload/v1675073771/qt_nav_menu_cdzxfk.png" className="imgSize550" alt="wallet qt nav" />

            <p className="text-justify-bword mv2h1">2. In the dropdown menu, click on Options.</p>
            <img src="https://res.cloudinary.com/dba8ifej6/image/upload/v1675073771/qt_nav_settings_sportf.png" className="imgSize550" alt="wallet qt options" />

            <p className="text-justify-bword mv2h1">3. In the Options window, click on the Wallet tab and adjust the Pay transaction fee amount to at least 0.001 LOG</p>
            <img src="https://res.cloudinary.com/dba8ifej6/image/upload/v1675073771/qt_nav_fee_bwuvu3.png" className="imgSize382" alt="wallet qt change fee" />
        </div>
      </div>
    )
  }

  const FaqSectionMetamask = () => {
    return (
      <div className="dc mb4" id="Metamask">
        <div className="width70 d-flex flex-column justify-content-center align-items-center gp2 text-white padding0Mobile1">
            <p className="subtitlefs mb4">Using Redeem functionality on Metamask wallet App</p>

            <p className="text-justify-bword subtitlefs">Add Polygon network</p>
            <img src="https://res.cloudinary.com/dba8ifej6/image/upload/v1675417186/Polygon_network_so2s7y.gif" className="imgSize320" alt="wallet qt nav" />
            <div className="width70 flex-start-css mv2h1">
              <p className="text-justify-bword">- Tap on the three horizontal bars in the upper left-hand corner</p>
              <p className="text-justify-bword">- Tap on Settings</p>
              <p className="text-justify-bword">- Tap on Networks</p>
              <p className="text-justify-bword">- If Polygon Mainnet is not yet available in the network list, tap on Add Network</p>
              <p className="text-justify-bword">- Tap on Polygon Mainnet</p>
              <p className="text-justify-bword">- Tap on Approve and then "Switch to network"</p>
            </div>

            <p className="text-justify-bword subtitlefs">Import Wlog Token</p>
            <img src="https://res.cloudinary.com/dba8ifej6/image/upload/v1675417186/import_tokens_ajkiku.gif" className="imgSize320" alt="wallet qt nav" />
            <div className="width70 flex-start-css mv2h1">
              <p className="text-justify-bword">- Tap Import Tokens</p>
              <p className="text-justify-bword">- Tap the Custom Token tab</p>
              <p className="text-justify-bword">- Paste the WLOG contract address to the Token Address input field (0x89F8bE64Da35308260BA2d13d0d1e7Fd80A3A210)</p>
              <p className="text-justify-bword">- Tap the IMPORT button, and WLOG will be available in your wallet</p>
            </div>

            <p className="text-justify-bword subtitlefs">Using metamask browser to access wlog.network</p>
            <img src="https://res.cloudinary.com/dba8ifej6/image/upload/v1675417186/WLog_network_ytp5go.gif" className="imgSize320" alt="wallet qt nav" />
            <div className="width70 flex-start-css mv2h1">
              <p className="text-justify-bword">- Tap on the three horizontal bars in the upper left-hand corner</p>
              <p className="text-justify-bword">- Tap on Browser</p>
              <p className="text-justify-bword">- Open a new tab using the search bar, or click the magnifying glass icon, and navigate to the wlog.network website </p>
            </div>

        </div>
    </div>
      
    )
  }

  return(
    <div className={process.env.REACT_APP_THEME === "PURPLE" ? "maincontainer main_black" : "maincontainer main_green_gradient"}>
      <div className="tree_rings_bg flex-col">
        
        {TitleSection()}

        <div className={process.env.REACT_APP_THEME === "PURPLE" ? "faq-wrapper purple_wood_section_bg" : "faq-wrapper dark_green_section_bg"}>
          {Sidebar()}

          <div className="wlborder width80">
            {showFAQ === "ABOUT" ? FaqSectionAbout() : null}

            {showFAQ === "TRANSACTION" ? FaqSectionFee() : null}

            {showFAQ === "METAMASK" ? FaqSectionMetamask() : null}
          </div>

        </div>

      </div>
      
  </div>
  )
}

export default Faq;
