import React, { useState, useEffect } from 'react';
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

  const [formData, setFormData] = useState({
    numeroPlaca: '',
    numeroSerie: '',
    nombreChofer: '',
    unidad: '',
    marca: '',
  });

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
      resetFormData();
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setUnidades([]);
    setEditIndex(null);
    resetFormData();
  };

  const resetFormData = () => {
    setFormData({
      numeroPlaca: '',
      numeroSerie: '',
      nombreChofer: '',
      unidad: '',
      marca: '',
    });
    setSelectedAvatar('/b11-10.jpg');
  };

  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { numeroPlaca, numeroSerie, nombreChofer, unidad, marca } = formData;

    if (!numeroPlaca || !numeroSerie || !nombreChofer || !unidad || !marca) {
      showAlert('Por favor, complete todos los campos.');
      return;
    }

    if (!/^\d+$/.test(numeroPlaca)) {
      showAlert('Número de placa debe contener solo números.');
      return;
    }

    const newUnidad: UnidadProps = {
      numeroPlaca,
      numeroSerie,
      nombreChofer,
      unidad,
      marca,
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
    resetFormData();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    let warningMessage = '';

    if (!value) {
      warningMessage = 'Este campo es obligatorio.';
    } else if (!/^\d+$/.test(value) && name === 'numeroPlaca') {
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
    setFormData({
      numeroPlaca: unidad.numeroPlaca,
      numeroSerie: unidad.numeroSerie,
      nombreChofer: unidad.nombreChofer,
      unidad: unidad.unidad,
      marca: unidad.marca,
    });
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

  useEffect(() => {
    if (editIndex !== null) {
      const unidad = unidades[editIndex];
      setFormData({
        numeroPlaca: unidad.numeroPlaca,
        numeroSerie: unidad.numeroSerie,
        nombreChofer: unidad.nombreChofer,
        unidad: unidad.unidad,
        marca: unidad.marca,
      });
      setSelectedAvatar(unidad.avatar);
    }
  }, [editIndex]);

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
                      value={formData.numeroPlaca}
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
                      value={formData.numeroSerie}
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
                      value={formData.nombreChofer}
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
                      value={formData.unidad}
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
                      value={formData.marca}
                      onChange={handleInputChange}
                    />
                  </InputWrapper>
                  {warning && <Warning>{warning}</Warning>}
                </InputGroup>
                <ButtonContainer>
                  <SubmitButton type="submit">Guardar</SubmitButton>
                  <CancelButton type="button" onClick={closeForm}>
                    Cancelar
                  </CancelButton>
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
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const AddButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #0056b3;
  }
`;

const UnidadesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Card = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  width: 30%;
  margin: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const CardText = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    margin: 5px 0;
  }
`;

const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EditButton = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #218838;
  }
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #c82333;
  }
`;

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  color: #000;
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const AvatarButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #0056b3;
  }
`;

const AvatarsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
`;

const AvatarOption = styled.div`
  cursor: pointer;
  margin: 5px;
`;

const InputGroup = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
`;

const InputField = styled.input`
  border: none;
  outline: none;
  width: 100%;
  margin-left: 10px;
`;

const Warning = styled.span`
  color: #dc3545;
  font-size: 12px;
  margin-top: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const SubmitButton = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #218838;
  }
`;

const CancelButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #c82333;
  }
`;

export default UnidadFormulario;
