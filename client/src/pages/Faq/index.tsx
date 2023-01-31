import React from "react";
import { useSelector } from 'react-redux'
import { RootState } from "../../app/store";
import { simpleContractAddress } from "../../contract";

function Faq()  {

  const TitleSection = () => {
    return (
      <div className={process.env.REACT_APP_THEME === "PURPLE" ? "purple_tree_section_nh" : "green_tree_section"}>
        <p className="font-weight-bold text-center font-white subtitlefs mb0">FAQs</p>
      </div>
    )
  }

  const FaqSection = () => {
    return (
      <div className="dc mb4">
        <div className={process.env.REACT_APP_THEME === "PURPLE" ? "purple_wood_section" : "dark_green_section"}>
            <div className="width70 d-flex flex-column justify-content-center align-items-center gp2 text-white padding0Mobile1">
                <p className="text-justify">Lorem ipsum dolor sit amet consectetur. Elit porta pharetra tellus tortor eleifend dictum eget. Morbi condimentum a etiam libero risus. Tortor mi imperdiet amet congue sit. Cursus id egestas euismod a vulputate. Enim egestas duis turpis rutrum lacus. Turpis volutpat nulla sed tincidunt iaculis nulla. Morbi vulputate risus porttitor at.</p>
                <img src="https://res.cloudinary.com/dba8ifej6/image/upload/v1675073771/qt_nav_menu_cdzxfk.png" className="imgSize550" alt="wallet qt nav" />

                <p className="text-justify">Lorem ipsum dolor sit amet consectetur. Elit porta pharetra tellus tortor eleifend dictum eget. Morbi condimentum a etiam libero risus. Tortor mi imperdiet amet congue sit. Cursus id egestas euismod a vulputate. Enim egestas duis turpis rutrum lacus. Turpis volutpat nulla sed tincidunt iaculis nulla. Morbi vulputate risus porttitor at.</p>
                <img src="https://res.cloudinary.com/dba8ifej6/image/upload/v1675073771/qt_nav_settings_sportf.png" className="imgSize550" alt="wallet qt options" />

                <p className="text-justify">Lorem ipsum dolor sit amet consectetur. Elit porta pharetra tellus tortor eleifend dictum eget. Morbi condimentum a etiam libero risus. Tortor mi imperdiet amet congue sit. Cursus id egestas euismod a vulputate. Enim egestas duis turpis rutrum lacus. Turpis volutpat nulla sed tincidunt iaculis nulla. Morbi vulputate risus porttitor at.</p>
                <img src="https://res.cloudinary.com/dba8ifej6/image/upload/v1675073771/qt_nav_fee_bwuvu3.png" className="imgSize382" alt="wallet qt change fee" />
            </div>
        </div>
      </div>
    )
  }

  return(
    <div className={process.env.REACT_APP_THEME === "PURPLE" ? "maincontainer main_black" : "maincontainer main_green_gradient"}>
      <div className="tree_rings_bg flex-col-g6">
        
        {TitleSection()}

        {FaqSection()}

      </div>
      
  </div>
  )
}

export default Faq;
