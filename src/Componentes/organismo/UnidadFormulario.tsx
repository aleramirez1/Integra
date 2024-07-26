import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Swal from 'sweetalert2';

interface UnidadProps {
  numeroUnidad: string;
  numeroSerie: string;
  numeroPlaca: string;
  marca: string;
}

const UnidadFormulario: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [unidades, setUnidades] = useState<UnidadProps[]>([]);
  const [warnings, setWarnings] = useState({
    numeroUnidad: '',
    numeroSerie: '',
    numeroPlaca: '',
    marca: ''
  });

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const numeroUnidad = form.elements.namedItem('numeroUnidad') as HTMLInputElement;
    const numeroSerie = form.elements.namedItem('numeroSerie') as HTMLInputElement;
    const numeroPlaca = form.elements.namedItem('numeroPlaca') as HTMLInputElement;
    const marca = form.elements.namedItem('marca') as HTMLInputElement;

    if (!numeroUnidad.value || !numeroSerie.value || !numeroPlaca.value || !marca.value) {
      showAlert('Por favor, complete todos los campos.');
      return;
    }

    if (!/^\d+$/.test(numeroUnidad.value)) {
      showAlert('Número de unidad debe contener solo números.');
      return;
    }

    if (!/^\d+$/.test(numeroSerie.value)) {
      showAlert('Número de serie debe contener solo números.');
      return;
    }

    if (!/^\d+$/.test(numeroPlaca.value)) {
      showAlert('Número de placa debe contener solo números.');
      return;
    }

    const newUnidad: UnidadProps = {
      numeroUnidad: numeroUnidad.value,
      numeroSerie: numeroSerie.value,
      numeroPlaca: numeroPlaca.value,
      marca: marca.value
    };

    setUnidades([...unidades, newUnidad]);
    setShowForm(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let warningMessage = '';

    if (!value) {
      warningMessage = 'Este campo es obligatorio.';
    } else if ((name === 'numeroUnidad' || name === 'numeroSerie' || name === 'numeroPlaca') && !/^\d+$/.test(value)) {
      warningMessage = 'Este campo debe contener solo números.';
    }

    setWarnings({
      ...warnings,
      [name]: warningMessage
    });
  };

  const showAlert = (message: string) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.addButton} onClick={toggleForm}>
          <i className="fas fa-plus"></i>
        </button>
      </div>
      <div style={styles.unidadesContainer}>
        {unidades.map((unidad, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.cardText}>
              <h3>{unidad.numeroUnidad}</h3>
              <p>Número de Serie: {unidad.numeroSerie}</p>
              <p>Número de Placa: {unidad.numeroPlaca}</p>
              <p>Marca: {unidad.marca}</p>
            </div>
          </div>
        ))}
      </div>
      {showForm && (
        <div style={styles.overlayContainer}>
          <div style={styles.formContainer}>
            <button style={styles.closeButton} onClick={closeForm}>
              <i className="fas fa-times"></i>
            </button>
            <div style={styles.formWrapper}>
              <form onSubmit={handleAdd}>
                <div style={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Número de unidad"
                    style={styles.inputField}
                    name="numeroUnidad"
                    onChange={handleInputChange}
                  />
                  {warnings.numeroUnidad && <small style={styles.warning}>{warnings.numeroUnidad}</small>}
                </div>
                <div style={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Número de serie"
                    style={styles.inputField}
                    name="numeroSerie"
                    onChange={handleInputChange}
                  />
                  {warnings.numeroSerie && <small style={styles.warning}>{warnings.numeroSerie}</small>}
                </div>
                <div style={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Número de placa"
                    style={styles.inputField}
                    name="numeroPlaca"
                    onChange={handleInputChange}
                  />
                  {warnings.numeroPlaca && <small style={styles.warning}>{warnings.numeroPlaca}</small>}
                </div>
                <div style={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Marca"
                    style={styles.inputField}
                    name="marca"
                    onChange={handleInputChange}
                  />
                  {warnings.marca && <small style={styles.warning}>{warnings.marca}</small>}
                </div>
                <div style={styles.buttonContainer}>
                  <button type="submit" style={styles.submitButton}>Agregar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center' as 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    position: 'relative' as 'relative',
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end' as 'flex-end',
    padding: '10px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    position: 'fixed' as 'fixed',
    top: 0,
    zIndex: 1000,
  },
  addButton: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    fontSize: '16px',
  },
  closeButton: {
    position: 'absolute' as 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#333',
    fontSize: '20px',
  },
  unidadesContainer: {
    position: 'relative' as 'relative',
    marginTop: '60px',
    display: 'flex',
    flexWrap: 'wrap' as 'wrap',
    justifyContent: 'flex-end' as 'flex-end',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '160px',
    height: '180px',
    textAlign: 'center' as 'center',
    marginBottom: '10px',
    marginRight: '10px',
  },
  cardText: {
    textAlign: 'center' as 'center',
  },
  overlayContainer: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center' as 'center',
    position: 'relative' as 'relative',
  },
  formWrapper: {
    width: '100%',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    marginBottom: '10px',
  },
  inputField: {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    width: '100%',
    fontSize: '14px',
  },
  warning: {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center' as 'center',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default UnidadFormulario;
