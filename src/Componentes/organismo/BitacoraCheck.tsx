import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa'; // Importa el ícono de eliminación de Font Awesome

const Container = styled.div<{ expanded: boolean }>`
  max-width: ${({ expanded }) => (expanded ? '100vw' : '800px')};
  margin: ${({ expanded }) => (expanded ? '0' : '2rem auto')};
  padding: 2rem;
  background-color: #ffffff;
  border: 2px solid #007bb5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: ${({ expanded }) => (expanded ? 'fixed' : 'relative')};
  top: ${({ expanded }) => (expanded ? '0' : 'auto')};
  left: ${({ expanded }) => (expanded ? '0' : 'auto')};
  width: ${({ expanded }) => (expanded ? '100vw' : 'auto')};
  height: ${({ expanded }) => (expanded ? '100vh' : 'auto')};
  overflow: ${({ expanded }) => (expanded ? 'auto' : 'visible')};
  text-align: center;
  z-index: 1000;
  transition: all 0.3s ease-in-out;
`;

const HistoryContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border: 2px solid #007bb5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
`;

const Button = styled.button<{ selected: boolean; color: string }>`
  padding: 1rem 2rem;
  border: 2px solid #007bb5;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  color: ${({ selected }) => (selected ? '#ffffff' : '#007bb5')};
  background-color: ${({ selected, color }) => (selected ? color : '#ffffff')};
  border-color: ${({ selected, color }) => (selected ? color : '#007bb5')};
  margin: 0.5rem 0;
  
  &:hover {
    background-color: ${({ selected, color }) => (selected ? color : '#e0e0e0')};
  }
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 2px solid #007bb5;
  border-radius: 5px;
  outline: none;
  margin-bottom: 1rem;
  cursor: pointer;
  
  &:focus {
    border-color: #005a80;
  }
`;

const Message = styled.div`
  margin-top: 3rem;
  font-size: 1.1rem;
  color: #000000;
  font-weight: bold;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  gap: 1rem;
`;

const SaveButton = styled.button<{ disabled: boolean }>`
  padding: 0.5rem 1rem;
  background-color: #007bb5;
  border: 2px solid #007bb5;
  border-radius: 5px;
  color: #ffffff;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: 1rem;
  font-weight: bold;
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
  
  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#007bb5' : '#005a80')};
  }
`;

const HistoryButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bb5;
  border: 2px solid #007bb5;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  position: absolute;
  bottom: 4.7rem; 
  left: 50%;
  transform: translateX(-50%);
  
  &:hover {
    background-color: #005a80;
  }
`;

const NewUnitButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bb5;
  border: 2px solid #007bb5;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  
  &:hover {
    background-color: #005a80;
  }
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bb5;
  border: 2px solid #007bb5;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  margin: 0.5rem;
  
  &:hover {
    background-color: #005a80;
  }
`;

const Table = styled.table`
  width: 100%;
  margin-top: 2rem;
  border-collapse: collapse;
  border: 1px solid #007bb5;
`;

const TableHeader = styled.th`
  background-color: #007bb5;
  color: #ffffff;
  padding: 0.75rem;
  border: 1px solid #007bb5;
`;

const TableData = styled.td`
  padding: 0.75rem;
  border: 1px solid #007bb5;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #ff0000;
  font-size: 1.2rem;
  
  &:hover {
    color: #cc0000;
  }
`;

const unitPattern = /^(01|02|04|05|06|07|08|013|015|016|017|021)$/;

const BitacoraCheck: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [message, setMessage] = useState('');
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [buttonsDisabled, setButtonsDisabled] = useState(true);
  const [savedData, setSavedData] = useState<Array<{ direction: string; unit: string; time: string; day: string }>>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [unitRegistered, setUnitRegistered] = useState(false); // Estado para verificar si se ha registrado una unidad

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name === 'unit') {
      setSelectedUnit(value);
    } else if (name === 'day') {
      setSelectedDay(value);
    }
  };

  const handleButtonClick = (direction: string) => {
    setSelectedButton(direction);
  };

  const handleNewUnit = () => {
    setButtonsDisabled(false);
    setMessage('');
    setSelectedUnit('');
    setUnitRegistered(true); // Marca la unidad como registrada
  };

  const handleSave = () => {
    if (unitPattern.test(selectedUnit) && selectedButton && unitRegistered && selectedDay) {
      const currentTime = new Date().toLocaleTimeString();
      const newData = {
        direction: selectedButton,
        unit: selectedUnit,
        time: currentTime,
        day: selectedDay, // Usa el día seleccionado
      };

      setSavedData([...savedData, newData]);
      setMessage('Datos guardados exitosamente.');
      setButtonsDisabled(true);
      setSelectedUnit('');
      setSelectedButton(null);
      setUnitRegistered(false); // Reinicia el estado de registro de unidad
    } else {
      setMessage('Por favor, complete todos los campos antes de guardar.');
    }
  };

  const handleViewHistory = () => {
    setShowHistory(!showHistory);
  };

  const handleClearHistory = () => {
    setSavedData([]);
    setMessage('Historial limpiado.');
  };

  const handleDelete = (index: number) => {
    const newSavedData = savedData.filter((_, i) => i !== index);
    setSavedData(newSavedData);
    setMessage('Registro eliminado.');
  };

  return (
    <Container expanded={showHistory}>
      {!showHistory ? (
        <>
          <SelectContainer>
            <Select name="day" value={selectedDay} onChange={handleSelectChange}>
              <option value="" disabled>Seleccione un día</option>
              <option value="Lunes">Lunes</option>
              <option value="Martes">Martes</option>
              <option value="Miércoles">Miércoles</option>
              <option value="Jueves">Jueves</option>
              <option value="Viernes">Viernes</option>
              <option value="Sábado">Sábado</option>
              <option value="Domingo">Domingo</option>
            </Select>
            <Select name="unit" value={selectedUnit} onChange={handleSelectChange}>
              <option value="" disabled>Seleccione una unidad</option>
              <option value="01">Unidad 01</option>
              <option value="02">Unidad 02</option>
              <option value="04">Unidad 04</option>
              <option value="05">Unidad 05</option>
              <option value="06">Unidad 06</option>
              <option value="07">Unidad 07</option>
              <option value="08">Unidad 08</option>
              <option value="013">Unidad 013</option>
              <option value="015">Unidad 015</option>
              <option value="016">Unidad 016</option>
              <option value="017">Unidad 017</option>
              <option value="021">Unidad 021</option>
            </Select>
          </SelectContainer>
          <ButtonContainer>
            <Button
              selected={selectedButton === 'De Tuxtla-Suchiapa'}
              color="#00bfff"
              onClick={() => handleButtonClick('De Tuxtla-Suchiapa')}
              disabled={buttonsDisabled}
            >
              De Tuxtla-Suchiapa
            </Button>
            <Button
              selected={selectedButton === 'De Suchiapa-Tuxtla'}
              color={selectedButton === 'De Suchiapa-Tuxtla' ? '#008000' : '#ffffff'}
              onClick={() => handleButtonClick('De Suchiapa-Tuxtla')}
              disabled={buttonsDisabled}
            >
              De Suchiapa-Tuxtla
            </Button>
          </ButtonContainer>
          <ButtonWrapper>
            <NewUnitButton onClick={handleNewUnit}>Registrar Nueva Unidad</NewUnitButton>
            <SaveButton onClick={handleSave} disabled={!unitRegistered || !selectedUnit || !selectedDay || !selectedButton}>
              Guardar
            </SaveButton>
          </ButtonWrapper>
          <Message>{message}</Message>
          <HistoryButton onClick={handleViewHistory}>
            Ver Historial
          </HistoryButton>
        </>
      ) : (
        <HistoryContainer>
          <Table>
            <thead>
              <tr>
                <TableHeader>Dirección</TableHeader>
                <TableHeader>Unidad</TableHeader>
                <TableHeader>Hora</TableHeader>
                <TableHeader>Día</TableHeader>
                <TableHeader>Eliminar</TableHeader> {/* Nueva columna para eliminar */}
              </tr>
            </thead>
            <tbody>
              {savedData.map((data, index) => (
                <tr key={index}>
                  <TableData>{data.direction}</TableData>
                  <TableData>{data.unit}</TableData>
                  <TableData>{data.time}</TableData>
                  <TableData>{data.day}</TableData>
                  <TableData>
                    <DeleteButton onClick={() => handleDelete(index)}>
                      <FaTrash />
                    </DeleteButton>
                  </TableData>
                </tr>
              ))}
            </tbody>
          </Table>
          <ButtonWrapper>
            <ActionButton onClick={handleViewHistory}>
              Ocultar Historial
            </ActionButton>
            <ActionButton onClick={handleClearHistory}>
              Limpiar
            </ActionButton>
          </ButtonWrapper>
        </HistoryContainer>
      )}
    </Container>
  );
};

export default BitacoraCheck;
