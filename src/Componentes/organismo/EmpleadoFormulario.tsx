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
          <div key={index} style={styles.unidad}>
            <div style={styles.unidadText}>
              <h3>Unidad {unidad.numeroUnidad}</h3>
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
            <div style={styles.formHeader}>
              <button style={styles.closeButton} onClick={closeForm}>
                <i className="fas fa-times"></i>
              </button>
              <div style={styles.avatar}></div>
            </div>
            <div style={styles.formWrapper}>
              <form onSubmit={handleAdd}>
                <div style={styles.inputGroup}>
                  <input type="text" placeholder="Número de unidad" style={styles.inputField} name="numeroUnidad" onChange={handleInputChange} />
                  {warnings.numeroUnidad && <small style={styles.warning}>{warnings.numeroUnidad}</small>}
                </div>
                <div style={styles.inputGroup}>
                  <input type="text" placeholder="Número de serie" style={styles.inputField} name="numeroSerie" onChange={handleInputChange} />
                  {warnings.numeroSerie && <small style={styles.warning}>{warnings.numeroSerie}</small>}
                </div>
                <div style={styles.inputGroup}>
                  <input type="text" placeholder="Número de placa" style={styles.inputField} name="numeroPlaca" onChange={handleInputChange} />
                  {warnings.numeroPlaca && <small style={styles.warning}>{warnings.numeroPlaca}</small>}
                </div>
                <div style={styles.inputGroup}>
                  <input type="text" placeholder="Marca" style={styles.inputField} name="marca" onChange={handleInputChange} />
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
    backgroundColor: '#e0e7d9',
    position: 'relative' as 'relative',
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end' as 'flex-end',
    padding: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    position: 'fixed' as 'fixed',
    top: 0,
    zIndex: 1000,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
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
    marginTop: '100px',
    display: 'flex',
    flexWrap: 'wrap' as 'wrap',
    justifyContent: 'flex-end' as 'flex-end',
  },
  unidad: {
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '180px',
    height: '200px',
    textAlign: 'center' as 'center',
    marginBottom: '10px',
    marginRight: '10px',
  },
  unidadText: {
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
    backgroundColor: '#a3c1ad',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '400px',
    textAlign: 'center' as 'center',
    position: 'relative' as 'relative',
  },
  formHeader: {
    display: 'flex',
    justifyContent: 'center' as 'center',
    marginBottom: '20px',
  },
  avatar: {
    width: '100px',
    height: '100px',
    backgroundColor: '#fff',
    borderRadius: '50%',
    marginBottom: '20px',
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
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box' as 'border-box',
  },
  warning: {
    color: 'red',
    fontSize: '12px',
    textAlign: 'left' as 'left',
    marginTop: '5px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center' as 'center',
    marginTop: '20px',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  }
};

export default UnidadFormulario;
