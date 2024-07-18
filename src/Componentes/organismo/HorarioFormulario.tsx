import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh; 
  background-color: #b3e5fc; 
  padding: 20px; 
  box-sizing: border-box;
`;

const StyledImage = styled.img`
  width: 35%; 
  height: auto; 
  margin: 10px auto; 
  display: block; 

  @media (max-width: 768px) {
    width: 105%; 
    height: auto;
    margin-top: 5px; 
  }
`;

const BackContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  margin-bottom: 10px;
`;

const BackArrow = styled.div`
  width: 12px;
  height: 12px;
  border-top: 2px solid black;
  border-right: 2px solid black;
  transform: rotate(-135deg);
  cursor: pointer;
`;

const HorarioFormulario: React.FC = () => {
  return (
    <Container>
      <BackContainer>
        <BackArrow onClick={() => window.history.back()} />
      </BackContainer>
      <StyledImage src="/hora.jpg" alt="Imagen de ejemplo" />
    </Container>
  );
}

export default HorarioFormulario;
