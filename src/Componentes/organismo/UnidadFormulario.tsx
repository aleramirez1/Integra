import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCar, FaHashtag, FaUser, FaTruck, FaTrademark } from 'react-icons/fa';
import Swal from 'sweetalert2';

interface UnidadProps {
  numeroPlaca: string;
  numeroSerie: string;
  nombreChofer: string;
  unidad: string;
  marca: string;
}

const UnidadFormulario: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [unidades, setUnidades] = useState<UnidadProps[]>([]);
  const [warning, setWarning] = useState('');

  const toggleForm = () => {
    setShowForm(!showForm);
    if (showForm) {
      setUnidades([]); 
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setUnidades([]); 
  };

  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const numeroPlaca = form.elements.namedItem('numeroPlaca') as HTMLInputElement;
    const numeroSerie = form.elements.namedItem('numeroSerie') as HTMLInputElement;
    const nombreChofer = form.elements.namedItem('nombreChofer') as HTMLInputElement;
    const unidad = form.elements.namedItem('unidad') as HTMLInputElement;
    const marca = form.elements.namedItem('marca') as HTMLInputElement;

    if (!numeroPlaca.value || !numeroSerie.value || !nombreChofer.value || !unidad.value || !marca.value) {
      showAlert('Por favor, complete todos los campos.');
      return;
    }

    if (!/^\d+$/.test(numeroPlaca.value)) {
      showAlert('Número de placa debe contener solo números.');
      return;
    }

    const newUnidad: UnidadProps = {
      numeroPlaca: numeroPlaca.value,
      numeroSerie: numeroSerie.value,
      nombreChofer: nombreChofer.value,
      unidad: unidad.value,
      marca: marca.value,
    };

    setUnidades([...unidades, newUnidad]);
    setShowForm(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    let warningMessage = '';

    if (!value) {
      warningMessage = 'Este campo es obligatorio.';
    } else if (!/^\d+$/.test(value) && event.target.name === 'numeroPlaca') {
      warningMessage = 'Número de placa debe contener solo números.';
    }

    setWarning(warningMessage);
  };

  const showAlert = (message: string) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  };

  return (
    <Container>
      <Header>
        <AddButton onClick={toggleForm}>
          <i className="fas fa-plus"></i>
        </AddButton>
      </Header>
      <UnidadesContainer>
        {unidades.map((unidad, index) => (
          <Card key={index}>
            <CardText>
              <h3>Número de Placa: {unidad.numeroPlaca}</h3>
              <h3>Número de Serie: {unidad.numeroSerie}</h3>
              <h3>Nombre del Chofer: {unidad.nombreChofer}</h3>
              <h3>Unidad: {unidad.unidad}</h3>
              <h3>Marca: {unidad.marca}</h3>
            </CardText>
          </Card>
        ))}
      </UnidadesContainer>
      {showForm && (
        <OverlayContainer>
          <FormContainer>
            <CloseButton onClick={closeForm}>
              <i className="fas fa-times"></i>
            </CloseButton>
            <FormWrapper>
              <Avatar src="/b11-10.jpg" alt="Avatar" />
              <form onSubmit={handleAdd}>
                <InputGroup>
                  <InputWrapper>
                    <FaCar className="icon" />
                    <InputField
                      type="text"
                      placeholder="Número de placa"
                      name="numeroPlaca"
                      onChange={handleInputChange}
                    />
                  </InputWrapper>
                  {warning && <Warning>{warning}</Warning>}
                </InputGroup>
                <InputGroup>
                  <InputWrapper>
                    <FaHashtag className="icon" />
                    <InputField
                      type="text"
                      placeholder="Número de serie"
                      name="numeroSerie"
                      onChange={handleInputChange}
                    />
                  </InputWrapper>
                  {warning && <Warning>{warning}</Warning>}
                </InputGroup>
                <InputGroup>
                  <InputWrapper>
                    <FaUser className="icon" />
                    <InputField
                      type="text"
                      placeholder="Nombre del chofer"
                      name="nombreChofer"
                      onChange={handleInputChange}
                    />
                  </InputWrapper>
                  {warning && <Warning>{warning}</Warning>}
                </InputGroup>
                <InputGroup>
                  <InputWrapper>
                    <FaTruck className="icon" />
                    <InputField
                      type="text"
                      placeholder="Unidad"
                      name="unidad"
                      onChange={handleInputChange}
                    />
                  </InputWrapper>
                  {warning && <Warning>{warning}</Warning>}
                </InputGroup>
                <InputGroup>
                  <InputWrapper>
                    <FaTrademark className="icon" />
                    <InputField
                      type="text"
                      placeholder="Marca"
                      name="marca"
                      onChange={handleInputChange}
                    />
                  </InputWrapper>
                  {warning && <Warning>{warning}</Warning>}
                </InputGroup>
                <ButtonContainer>
                  <SubmitButton type="submit">Agregar</SubmitButton>
                </ButtonContainer>
              </form>
            </FormWrapper>
          </FormContainer>
        </OverlayContainer>
      )}
    </Container>
  );
};



const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8;
  position: relative;
  padding-top: 50px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  z-index: 1000;
`;

const AddButton = styled.button`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.1);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #333;
  font-size: 24px;
`;

const UnidadesContainer = styled.div`
  position: relative;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Card = styled.div`
  background-color: #ffffff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  width: 250px;
  height: 180px;
  text-align: center;
  margin-bottom: 15px;
  margin-right: 15px;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const CardText = styled.div`
  text-align: center;
`;

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
  position: relative;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 5px 10px;

  .icon {
    margin-right: 10px;
  }
`;

const InputField = styled.input`
  width: 100%;
  border: none;
  background-color: transparent;
  padding: 10px 5px;
  font-size: 16px;
  outline: none;
`;

const Warning = styled.span`
  color: red;
  font-size: 12px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
`;

export default UnidadFormulario;
