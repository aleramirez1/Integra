import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border: 2px solid #007bb5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ScheduleContainer = styled.div`
  margin-top: 1rem;
  max-width: 100%;
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: bold;
  color: #0497dc;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  opacity: 0.5;
  margin: 0 auto; 
  text-align: center; 
`;

const TableHeader = styled.th`
  border: 1px solid #007bb5;
  padding: 1rem;
  background-color: #007bb5;
  text-align: center;
  color: #ffffff;
  font-size: 1.1rem;
`;

const TableCell = styled.td`
  border: 1px solid #007bb5;
  padding: 1rem;
  height: 10px;
  text-align: center;
`;

const EditableCell = styled.input<{ disabled: boolean }>`
  width: 100%;
  height: 100%;
  border: none;
  text-align: center;
  background: transparent;
  font-size: 1rem;
  &:focus {
    outline: none;
  }
  ${({ disabled }) =>
    disabled &&
    `
    background: #e0e0e0;
    pointer-events: none;
  `}
`;

const CheckBoxCell = styled.input<{ disabled: boolean }>`
  ${({ disabled }) =>
    disabled &&
    `
    pointer-events: none;
  `}
`;

const ImageContainer = styled.div`
  width: 200px;
  height: auto;
  margin: 2rem auto 0;
`;

const ElephantImage = styled.img`
  width: 100%;
  height: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bb5;
  border: 2px solid #007bb5;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  margin: 0 1rem;
  &:hover {
    background-color: #005a80;
  }
`;

const BitacoraCheck: React.FC = () => {
  const [rows, setRows] = useState([
    { hora: '', unidad: '', lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false, disabled: false }
  ]);
  const [currentDay, setCurrentDay] = useState<number>(new Date().getDay());

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    const updatedRows = [...rows];

    updatedRows[index] = {
      ...updatedRows[index],
      [name]: type === 'checkbox' ? checked : value
    };

    setRows(updatedRows);
  };

  const addRow = () => {
    const lastRow = rows[rows.length - 1];
    if (Object.values(lastRow).some(value => value === '')) {
      Swal.fire({
        icon: 'error',
        title: 'No se puede agregar fila',
        text: 'Por favor completa todos los campos antes de agregar una nueva fila.',
      });
    } else {
      const updatedRows = rows.map(row => ({ ...row, disabled: true }));
      setRows([...updatedRows, {
        hora: '', 
        unidad: '', 
        lunes: false, 
        martes: false, 
        miercoles: false, 
        jueves: false, 
        viernes: false, 
        sabado: false, 
        domingo: false,
        disabled: false
      }]);
    }
  };

  const saveData = () => {
    const hasEmptyFields = rows.some(row => row.hora === '' || row.unidad === '');
    const hasSelectedDays = rows.some(row => row.lunes || row.martes || row.miercoles || row.jueves || row.viernes || row.sabado || row.domingo);

    if (hasEmptyFields || !hasSelectedDays) {
      Swal.fire({
        icon: 'error',
        title: 'No se puede guardar',
        text: 'Por favor completa todos los campos de hora y unidad y selecciona al menos un día.',
      });
    } else {
      const updatedRows = rows.map(row => ({ ...row, disabled: true }));
      setRows(updatedRows);
      console.log('Datos guardados:', rows.map(row => {
        const { disabled, ...data } = row;
        return data;
      }));
    }
  };

  useEffect(() => {
    const today = new Date().getDay();
    setCurrentDay(today);
  }, []);

  return (
    <Container>
      <ScheduleContainer>
        <Title>Bitácora</Title>
        <Table>
          <thead>
            <tr>
              <TableHeader>Hora</TableHeader>
              <TableHeader>Unidad</TableHeader>
              <TableHeader>Lunes</TableHeader>
              <TableHeader>Martes</TableHeader>
              <TableHeader>Miércoles</TableHeader>
              <TableHeader>Jueves</TableHeader>
              <TableHeader>Viernes</TableHeader>
              <TableHeader>Sábado</TableHeader>
              <TableHeader>Domingo</TableHeader>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <TableCell>
                  <EditableCell
                    type="text"
                    name="hora"
                    value={row.hora}
                    pattern="[0-9]*"
                    disabled={row.disabled}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </TableCell>
                <TableCell>
                  <EditableCell
                    type="text"
                    name="unidad"
                    value={row.unidad}
                    pattern="[0-9]*"
                    disabled={row.disabled}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </TableCell>
                <TableCell>
                  <CheckBoxCell
                    type="checkbox"
                    name="lunes"
                    checked={row.lunes || currentDay === 1}
                    disabled={row.disabled || currentDay !== 1}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </TableCell>
                <TableCell>
                  <CheckBoxCell
                    type="checkbox"
                    name="martes"
                    checked={row.martes || currentDay === 2}
                    disabled={row.disabled || currentDay !== 2}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </TableCell>
                <TableCell>
                  <CheckBoxCell
                    type="checkbox"
                    name="miercoles"
                    checked={row.miercoles || currentDay === 3}
                    disabled={row.disabled || currentDay !== 3}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </TableCell>
                <TableCell>
                  <CheckBoxCell
                    type="checkbox"
                    name="jueves"
                    checked={row.jueves || currentDay === 4}
                    disabled={row.disabled || currentDay !== 4}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </TableCell>
                <TableCell>
                  <CheckBoxCell
                    type="checkbox"
                    name="viernes"
                    checked={row.viernes || currentDay === 5}
                    disabled={row.disabled || currentDay !== 5}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </TableCell>
                <TableCell>
                  <CheckBoxCell
                    type="checkbox"
                    name="sabado"
                    checked={row.sabado || currentDay === 6}
                    disabled={row.disabled || currentDay !== 6}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </TableCell>
                <TableCell>
                  <CheckBoxCell
                    type="checkbox"
                    name="domingo"
                    checked={row.domingo || currentDay === 0}
                    disabled={row.disabled || currentDay !== 0}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScheduleContainer>
      <ButtonContainer>
        <Button onClick={addRow}>Agregar fila</Button>
        <Button onClick={saveData}>Guardar</Button>
      </ButtonContainer>
      <ImageContainer>
        <ElephantImage src="/bita-removebg-preview.png" alt="Elefante" />
      </ImageContainer>
    </Container>
  );
};

export default BitacoraCheck;