import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCar, FaHashtag, FaUser, FaTruck, FaTrademark, FaEdit, FaTrash } from 'react-icons/fa';
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
  const [editIndex, setEditIndex] = useState<number | null>(null);

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
    setEditIndex(null);
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

    if (editIndex !== null) {
      const updatedUnidades = [...unidades];
      updatedUnidades[editIndex] = newUnidad;
      setUnidades(updatedUnidades);
      setEditIndex(null);
    } else {
      setUnidades([...unidades, newUnidad]);
    }

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

  const handleEdit = (index: number) => {
    const unidad = unidades[index];
    setSelectedAvatar(unidad.avatar);
    setShowForm(true);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo.',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedUnidades = [...unidades];
        updatedUnidades.splice(index, 1);
        setUnidades(updatedUnidades);
        Swal.fire('Borrado', 'La unidad ha sido borrada.', 'success');
      }
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
            <Avatar src={unidad.avatar} alt="Avatar" />
            <CardText>
              <h3>Número de Placa: {unidad.numeroPlaca}</h3>
              <h3>Número de Serie: {unidad.numeroSerie}</h3>
              <h3>Nombre del Chofer: {unidad.nombreChofer}</h3>
              <h3>Unidad: {unidad.unidad}</h3>
              <h3>Marca: {unidad.marca}</h3>
            </CardText>
            <CardActions>
              <EditButton onClick={() => handleEdit(index)}>
                <FaEdit />
              </EditButton>
              <DeleteButton onClick={() => handleDelete(index)}>
                <FaTrash />
              </DeleteButton>
            </CardActions>
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
  width: 50px;
  height: 50px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const UnidadesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 70px;
`;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

const CardText = styled.div`
  text-align: center;
  margin-top: 10px;

  h3 {
    margin: 5px 0;
  }
`;

const CardActions = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
`;

const EditButton = styled.button`
  background-color: transparent;
  border: none;
  color: #ffc107;
  font-size: 18px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: #dc3545;
  font-size: 18px;
  cursor: pointer;
`;

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  position: relative;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 24px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  .icon {
    position: absolute;
    left: 10px;
    font-size: 18px;
    color: #6c757d;
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px 10px 10px 40px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 16px;
`;

const Warning = styled.p`
  color: #dc3545;
  font-size: 14px;
  margin-top: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SubmitButton = styled.button`
  background-color: #28a745;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const AvatarButton = styled.button`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  position: absolute;
  right: -10px;
  top: -10px;
  cursor: pointer;
`;

const AvatarsList = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const AvatarOption = styled.div`
  cursor: pointer;
`;

export default UnidadFormulario;
