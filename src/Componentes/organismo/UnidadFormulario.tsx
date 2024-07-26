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
  avatar: string;
}

const UnidadFormulario: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [unidades, setUnidades] = useState<UnidadProps[]>([]);
  const [warning, setWarning] = useState('');
  const [showAvatars, setShowAvatars] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('/b11-10.jpg');

  const avatars = [
    '/1-removebg-preview.png',
    '/u-removebg-preview.png',
    '/sch-removebg-preview.png',
    '/R-removebg-preview.png',
  ];

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
      avatar: selectedAvatar,
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

  const toggleAvatars = () => {
    setShowAvatars(!showAvatars);
  };

  const selectAvatar = (avatar: string) => {
    setSelectedAvatar(avatar);
    setShowAvatars(false);
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
            <Avatar src={unidad.avatar} alt="Avatar" />
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
              <AvatarContainer>
                <Avatar src={selectedAvatar} alt="Avatar" />
                <AvatarButton onClick={toggleAvatars}>+</AvatarButton>
              </AvatarContainer>
              {showAvatars && (
                <AvatarsList>
                  {avatars.map((avatar, index) => (
                    <AvatarOption key={index} onClick={() => selectAvatar(avatar)}>
                      <Avatar src={avatar} alt={`Avatar ${index}`} />
                    </AvatarOption>
                  ))}
                </AvatarsList>
              )}
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
  height: 200px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const CardText = styled.div`
  h3 {
    font-size: 16px;
    margin: 5px 0;
  }
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
`;

const AvatarButton = styled.button`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.1);
  }
`;

const AvatarsList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 15px;
`;

const AvatarOption = styled.div`
  margin: 5px;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const FormContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
  position: relative;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputGroup = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  padding-left: 30px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const Warning = styled.span`
  color: red;
  font-size: 12px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
`;

export default UnidadFormulario;
