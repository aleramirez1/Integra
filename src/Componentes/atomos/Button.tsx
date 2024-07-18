import React from 'react';
import styled, { keyframes } from 'styled-components';

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
};

const ButtonContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const breatheAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
`;

const colorChangeAnimation = keyframes`
  0% {
    background-color: rgb(255, 0, 0);
  }
  25% {
    background-color: rgb(0, 255, 0);
  }
  50% {
    background-color: rgb(0, 0, 255);
  }
  75% {
    background-color: rgb(255, 255, 0);
  }
  100% {
    background-color: rgb(255, 0, 255);
  }
`;

const starAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const StyledButton = styled.button`
  position: relative;
  overflow: hidden;
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-image: linear-gradient(45deg, #ffbf00, #ff0080, #8200ff, #00ffbf), linear-gradient(to bottom, #00c6ff, #0072ff);
  background-size: 400% 400%, auto;
  z-index: 1;
  animation: ${colorChangeAnimation} 10s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

const BackgroundPulse = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  background-color: rgba(255, 0, 150, 0.3);
  border-radius: 10px;
  z-index: 0;
  animation: ${breatheAnimation} 3s ease-out infinite;
`;

const Star = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: rgba(255, 255, 255, 0.9);
  animation: ${starAnimation} 2s linear infinite;
`;

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <ButtonContainer>
      <StyledButton onClick={handleButtonClick}>
        {children}
        <Star>★</Star>
      </StyledButton>
      <BackgroundPulse />
    </ButtonContainer>
  );
};

export default Button;
