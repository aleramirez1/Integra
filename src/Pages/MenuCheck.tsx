import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #4c6968, #23bec6);
  padding: 30px 20px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  color: white;
  font-family: Arial, sans-serif;
  justify-content: space-between;
  flex-wrap: wrap;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 5px 10px;
  }
`;

const LogoContainer = styled.div`
  width: 70px;
  height: 70px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  order: 2; 

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const LogoImage = styled.img`
  width: 120%;
  height: 120%;
  object-fit: contain;
`;

const MenuContent = styled.div`
  text-align: center;
  margin-right: auto;
  margin-left: 3px;
  order: 3; 

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const MenuTitle = styled.h1`
  font-size: 24px;
  margin: 0;
  font-weight: bold;
  letter-spacing: 8px;

  @media (max-width: 768px) {
    font-size: 18px;
    letter-spacing: 4px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  order: 3; 

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 10px;
    padding: 10px 0;
    background: linear-gradient(135deg, #698390, #0ff0e5);
    box-sizing: border-box;
    position: absolute;
    top: 100%;
    left: 0;
    display: none; 
  }
`;

const NavItem = styled(Link)`
  color: white;
  font-size: 14px;
  text-decoration: none;
  position: relative;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  transition: background 0.3s, transform 0.3s, color 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
    color: #000000;
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: white;
    transition: width 0.3s;
  }

  &:hover::after {
    width: 100%;
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  order: 2; 

  @media (min-width: 769px) {
    display: none;
  }
`;

const OutsideImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; 
`;

const OutsideImage = styled.img`
  width: 400px;
  height: auto;
`;

const MenuCheck= () => {
  const [isOpen, setIsOpen] = useState(false); 
  const logoUrl = '/nvo.png';
  const outsideImageUrl = '/lc-removebg-preview.png'; 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <MenuContainer>
        <LogoContainer>
          <LogoImage src={logoUrl} alt="Logo" />
        </LogoContainer>
        <MenuContent>
          <MenuTitle>TRANSPORT-COMMUNICATION</MenuTitle>
        </MenuContent>
        <MenuButton onClick={toggleMenu}>
          ☰
        </MenuButton>
        <Nav>
          <NavItem to="/bita">Bitacora</NavItem>
          <NavItem to="/">Mapa</NavItem>
        </Nav>
      </MenuContainer>
      <OutsideImageContainer>
        <OutsideImage src={outsideImageUrl} alt="Outside Image" />
      </OutsideImageContainer>
    </>
  );
};

export default MenuCheck;
