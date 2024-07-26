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
      setUnidades([newUnidad, ...unidades]);
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
      warningMessage = 'Numero de placa debe contener solo números.';
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
      title: '¿Estas seguro?',
      text: 'No podras revertir esto.',
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
                </InputGroup>
                <InputGroup>
                  <InputWrapper>
                    <FaTruck className="icon" />
                    <InputField
                      type="text"
                      placeholder="unidad"
                      name="unidad"
                      value={formData.unidad}
                      onChange={handleInputChange}
                    />
                  </InputWrapper>
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
                </InputGroup>
                <SubmitButton type="submit">
                  {editIndex !== null ? 'Actualizar Unidad' : 'Agregar Unidad'}
                </SubmitButton>
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
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const AddButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
  font-size: 24px;
`;

const UnidadesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
`;

const Card = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const CardText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardActions = styled.div`
  display: flex;
  gap: 10px;
`;

const EditButton = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 18px;
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 18px;
`;

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const AvatarButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 18px;
`;

const AvatarsList = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const AvatarOption = styled.div`
  cursor: pointer;
`;

const InputGroup = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const InputField = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-left: 10px;
`;

const Warning = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
`;

export default UnidadFormulario;
