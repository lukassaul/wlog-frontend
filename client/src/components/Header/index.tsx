import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import {
    Nav,
    NavbarContainer,
    NavLogo,
    NavLocation,
    MobileIcon,
    NavLinks,
    NavItem,
    NavItemBtn,
    NavMenu,
    NavBtnLink,
    NavItemIput,
    ProfileName
} from './styles';
import { FormInput, CenteredContainerNav, CenteredContainerNavMobile } from "../../globalStyles"
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

function Header() {

    const navigate = useNavigate()
    const network = useSelector((state: RootState) => state.network)

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };


    return (
        <Nav className={process.env.REACT_APP_THEME === "PURPLE" ? "black_gradient" : "green_bg"}>
            <NavbarContainer>
                <NavLogo to='/'>
                    <div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '.5em'}}>
                            <img src="/wlog_logo.png" alt="Wlog logo"/> WLOG
                        </div>
                        <p>Wrapped Polygonal Logs</p>
                    </div>
                </NavLogo>
                <MobileIcon onClick={handleClick}>
                    {click ? <span style={{fontSize: '18px'}}>X</span> : <img src="https://res.cloudinary.com/dba8ifej6/image/upload/v1675074779/hamburger_white_ub0ycg.png" alt="Menu icon" style={{width: '18px'}}/>}
                </MobileIcon>

                <NavMenu onClick={handleClick} click={click}>
                    {/* <NavItem>
                        <NavLinks to='/faqs' onClick={closeMobileMenu}>
                            FAQs
                        </NavLinks>
                    </NavItem> */}
                    <NavItem>
                        <NavLinks to='/swap' onClick={closeMobileMenu}>
                            Swap
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to='/redeem' onClick={closeMobileMenu}>
                            Redeem
                        </NavLinks>
                    </NavItem>
                    {/* <NavItem>
                        <NavLinks to='#' onClick={closeMobileMenu}>
                            {network?.network}
                        </NavLinks>
                    </NavItem> */}
                </NavMenu>
            </NavbarContainer>
        </Nav>
    )
}

export default Header;
