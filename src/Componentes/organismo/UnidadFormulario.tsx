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
    if (!showForm) {
      setUnidades([]);
      resetFormData();
    }
  };

  const closeForm = () => {
    setShowForm(false);
    resetFormData();
    setEditIndex(null);
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
                  <SubmitButton type="submit">
                    {editIndex !== null ? 'Actualizar' : 'Agregar'}
                  </SubmitButton>
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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
`;

const AddButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #45a049;
  }

  .fas {
    margin-right: 5px;
  }
`;

const UnidadesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 250px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const CardText = styled.div`
  h3 {
    margin: 0.5rem 0;
  }
`;

const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
`;

const EditButton = styled.button`
  background-color: #ffc107;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: #e0a800;
  }

  svg {
    font-size: 16px;
  }
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }

  svg {
    font-size: 16px;
  }
`;

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #000;
  font-size: 1.5rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const AvatarButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 1rem;

  &:hover {
    background-color: #45a049;
  }
`;

const AvatarsList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const AvatarOption = styled.div`
  margin: 0.5rem;
  cursor: pointer;

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid transparent;
    transition: border-color 0.2s;

    &:hover {
      border-color: #4caf50;
    }
  }
`;

const InputGroup = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  position: relative;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  margin-left: 0.5rem;
  flex: 1;

  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const Warning = styled.span`
  color: red;
  font-size: 0.8rem;
  position: absolute;
  bottom: -20px;
  left: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 0.5rem;

  &:hover {
    background-color: #45a049;
  }
`;

const CancelButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #d32f2f;
  }
`;

export default UnidadFormulario;
