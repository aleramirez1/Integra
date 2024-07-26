import React, { useState, useRef } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Swal from 'sweetalert2';

interface CardProps {
  name: string;
  info1: string;
  info2: string;
}

const EmpleadoFormulario: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [cards, setCards] = useState<CardProps[]>([
    { name: 'Alexia Ramirez', info1: 'Chofer', info2: '1' }
  ]);
  const [warnings, setWarnings] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    telNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const usernameRef = useRef<HTMLInputElement>(null);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const firstName = form.elements.namedItem('firstName') as HTMLInputElement;
    const lastName = form.elements.namedItem('lastName') as HTMLInputElement;
    const username = form.elements.namedItem('username') as HTMLInputElement;
    const email = form.elements.namedItem('email') as HTMLInputElement;
    const telNumber = form.elements.namedItem('telNumber') as HTMLInputElement;
    const password = form.elements.namedItem('password') as HTMLInputElement;
    const confirmPassword = form.elements.namedItem('confirmPassword') as HTMLInputElement;

    if (!firstName.value || !lastName.value || !username.value || !email.value || !telNumber.value || !password.value || !confirmPassword.value) {
      showAlert('Por favor, complete todos los campos.');
      return;
    }

    if (!/^\d{10}$/.test(telNumber.value)) {
      showAlert('El número de teléfono debe contener exactamente 10 dígitos.');
      return;
    }

    const passwordRegex = /(?=.*[A-Z])(?=.*\d)/;
    if (!passwordRegex.test(password.value)) {
      showAlert('La contraseña debe contener al menos una letra mayúscula y un dígito.');
      return;
    }

    if (password.value !== confirmPassword.value) {
      showAlert('Las contraseñas no coinciden.');
      return;
    }

    const newCard: CardProps = {
      name: `${firstName.value} ${lastName.value}`,
      info1: `Username: ${username.value}, Email: ${email.value}, Tel: ${telNumber.value}`,
      info2: 'Empleado',
    };

    setCards([...cards, newCard]);
    setShowForm(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let warningMessage = '';

    switch (name) {
      case 'telNumber':
        if (!/^\d{10}$/.test(value)) {
          warningMessage = 'El número de teléfono debe contener exactamente 10 dígitos.';
        }
        break;
      case 'password':
        setPasswordStrength(calculatePasswordStrength(value));
        break;
      case 'confirmPassword':
        const password = (document.querySelector('input[name="password"]') as HTMLInputElement).value;
        if (value !== password) {
          warningMessage = 'Las contraseñas no coinciden.';
        }
        break;
      default:
        if (!value) {
          warningMessage = 'Este campo es obligatorio.';
        }
        break;
    }

    setWarnings({
      ...warnings,
      [name]: warningMessage
    });
  };

  const handleBlurUsername = () => {
    if (usernameRef.current) {
      const regex = /[A-Z0-9]/;
      if (!regex.test(usernameRef.current.value)) {
        setWarnings({
          ...warnings,
          username: 'El nombre de usuario debe contener al menos una letra mayuscula o un digito.'
        });
      } else {
        setWarnings({
          ...warnings,
          username: ''
        });
      }
    }
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/(?=.*[A-Z])/.test(password)) strength++;
    if (/(?=.*\d)/.test(password)) strength++;
    if (/(?=.*[!@#$%^&*])/.test(password)) strength++;
    return strength;
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
      <div style={styles.cardsContainer}>
        {cards.map((card, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.avatarContainer}>
              <img src="/em.png" alt="User Avatar" style={styles.avatar} />
            </div>
            <div style={styles.cardText}>
              <h3>{card.name}</h3>
              <p>{card.info1}</p>
              <p>{card.info2}</p>
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
            <div style={styles.avatarContainer}>
              <img src="/em.png" alt="User Avatar" style={styles.avatar} />
            </div>
            <div style={styles.formWrapper}>
              <form onSubmit={handleAdd}>
                <div style={styles.inputGroup}>
                  <input type="text" placeholder="First Name" style={styles.inputField} name="firstName" onChange={handleInputChange} />
                  {warnings.firstName && <small style={styles.warning}>{warnings.firstName}</small>}
                  <input type="text" placeholder="Last Name" style={styles.inputField} name="lastName" onChange={handleInputChange} />
                  {warnings.lastName && <small style={styles.warning}>{warnings.lastName}</small>}
                </div>
                <div style={styles.inputWithIcon}>
                  <span style={styles.icon}><i className="fas fa-user"></i></span>
                  <input
                    type="text"
                    placeholder="Username"
                    style={styles.inputFieldFull}
                    name="username"
                    ref={usernameRef}
                    onChange={handleInputChange}
                    onBlur={handleBlurUsername}
                  />
                  {warnings.username && <small style={styles.warning}>{warnings.username}</small>}
                </div>
                <div style={styles.inputWithIcon}>
                  <span style={styles.icon}><i className="fas fa-envelope"></i></span>
                  <input type="email" placeholder="Email" style={styles.inputFieldFull} name="email" onChange={handleInputChange} />
                  {warnings.email && <small style={styles.warning}>{warnings.email}</small>}
                </div>
                <div style={styles.inputWithIcon}>
                  <span style={styles.icon}><i className="fas fa-phone"></i></span>
                  <input type="tel" placeholder="Tel. Number" style={styles.inputFieldFull} name="telNumber" onChange={handleInputChange} />
                  {warnings.telNumber && <small style={styles.warning}>{warnings.telNumber}</small>}
                </div>
                <div style={styles.inputWithIcon}>
                  <span style={styles.icon}><i className="fas fa-lock"></i></span>
                  <input type="password" placeholder="Password" style={styles.inputFieldFull} name="password" onChange={handleInputChange} />
                  {warnings.password && <small style={styles.warning}>{warnings.password}</small>}
                  <div style={{ ...styles.passwordStrengthBar, backgroundColor: getPasswordStrengthColor(passwordStrength) }} />
                </div>
                <div style={styles.inputWithIcon}>
                  <span style={styles.icon}><i className="fas fa-lock"></i></span>
                  <input type="password" placeholder="Confirm Password" style={styles.inputFieldFull} name="confirmPassword" onChange={handleInputChange} />
                  {warnings.confirmPassword && <small style={styles.warning}>{warnings.confirmPassword}</small>}
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

const getPasswordStrengthColor = (strength: number) => {
  switch (strength) {
    case 1:
      return 'red';
    case 2:
      return 'orange';
    case 3:
      return 'yellow';
    case 4:
      return 'green';
    default:
      return 'grey';
  }
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
  cardsContainer: {
    position: 'relative' as 'relative',
    marginTop: '100px',
    display: 'flex',
    flexWrap: 'wrap' as 'wrap',
    justifyContent: 'flex-end' as 'flex-end',
  },
  card: {
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
  avatarContainer: {
    marginBottom: '20px',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#ccc',
    margin: '0 auto 10px auto',
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
    backgroundColor: '#fff',
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
    justifyContent: 'space-between' as 'space-between',
    marginBottom: '10px',
  },
  inputField: {
    width: '48%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  inputWithIcon: {
    display: 'flex',
    alignItems: 'center' as 'center',
    marginBottom: '10px',
  },
  icon: {
    padding: '10px',
    backgroundColor: '#ccc',
    border: '1px solid #ccc',
    borderRadius: '5px 0 0 5px',
    color: 'white',
  },
  inputFieldFull: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '0 5px 5px 0',
  },
  buttonContainer: {
    textAlign: 'right' as 'right',
    marginTop: '10px',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  warning: {
    color: 'red',
    fontSize: '12px',
  },
  passwordStrengthBar: {
    height: '5px',
    borderRadius: '5px',
    marginTop: '5px',
    width: '100%',
  }
};

export default EmpleadoFormulario;
