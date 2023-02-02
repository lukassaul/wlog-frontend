import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container } from '../../globalStyles';

export const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 1.2rem;
  color: #FFF;
  padding: 1em 0.5em;
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  width: 100%;
  @media screen and (max-width: 1088px) {
    padding: 0 0.5em;
    justify-content: flex-start;
  }
`;

export const NavLogo = styled(Link)`
    color: #FFF;
    font-family: Arial;
    justify-self: flex-start;
    cursor: pointer;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 900;
    display: flex;
    align-items: center;
    &:hover {
        color: #C1C1C1;
    }
`;

export const NavLocation = styled.p`
    color: #FFF;
    font-family: Arial;
    justify-self: flex-start;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 300;
    display: flex;
    padding-top: 1rem;
    margin-left: 0.5rem;
`;

export const MobileIcon = styled.div`
    display: none;

    @media screen and (max-width: 1088px) {
        display: block;
        position: absolute;
        top: 0;
        right: 32px;
        transform: translate(-100%, 60%);
        font-size: 1rem;
    }
    @media screen and (max-width: 820px) {
        display: block;
        position: absolute;
        top: 0;
        right: 16px;
        transform: translate(-100%, 60%);
        font-size: 1rem;
    }
    @media screen and (max-width: 480px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1rem;
    }
`;

export const NavMenu = styled.ul<{click: boolean}>`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  @media screen and (max-width: 1088px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    position: absolute;
    top: 36px;
    left: ${({ click }) => (click ? 0 : '-100%')};
    opacity: 1;
    transition: all 0.5s ease;
    background: linear-gradient(180deg, #963D97 0%, #1F6AAC 100%);
    //box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
    z-index: 99;
  }
`;

export const NavItem = styled.li`
  height: 36px;
  border-bottom: 2px solid transparent;
  font-size: 0.9rem;
  &:hover {
    border-bottom: 2px solid #ccc;
  }
  /* @media screen and (max-width: 1088px) {
    width: 100%;
    &:hover {
      border: none;
    }
  } */
`;

export const NavItemIput = styled.li`
    margin-left: 0.5em;
    margin-right: 0.5em;
  /* @media screen and (max-width: 1088px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
  } */
`;

export const NavItemBtn = styled.li`
    margin-left: 5px;
  /* @media screen and (max-width: 1088px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
  } */
`;

export const NavLinks = styled(Link)`
  color: #FFF;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 1rem 1.5rem;
  height: 100%;
  &:hover {
    color: #C1C1C1;
  };
  @media screen and (max-width: 1088px) {
    text-align: center;
    /* padding: 2rem; */
    width: 100%;
    display: table;
    color: #FFF;
    &:hover {
      color: #4b59f7;
      transition: all 0.3s ease;
    }
  }
`;

export const NavInput = styled.input`
    display: block;
    margin-left: 5px;
    max-width: 105px;
    border: none;
    border-bottom: 1px solid #000;

    ::placeholder {
        color: #000000;
        font-size: 1rem;
    }
`;

export const NavBtnLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 6px 16px;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
`;

export const NavInputContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const ProfileName = styled.p`
  font-weight: 700;
  font-size: 15px;
`;
