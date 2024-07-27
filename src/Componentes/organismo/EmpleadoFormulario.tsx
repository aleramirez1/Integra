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
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const usernameRef = useRef<HTMLInputElement>(null);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditIndex(null);
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

    if (editIndex !== null) {
      const updatedCards = [...cards];
      updatedCards[editIndex] = newCard;
      setCards(updatedCards);
      setEditIndex(null);
    } else {
      setCards([...cards, newCard]);
    }
    
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
          username: 'El nombre de usuario debe contener al menos una letra mayúscula o un dígito.'
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

  const handleEdit = (index: number) => {
    const card = cards[index];
    const [firstName, lastName] = card.name.split(' ');
    const [username, email, telNumber] = card.info1.match(/Username: (.+), Email: (.+), Tel: (\d+)/)!.slice(1);

    setEditIndex(index);
    setShowForm(true);
    
    setTimeout(() => {
      const form = document.querySelector('form') as HTMLFormElement;
      (form.elements.namedItem('firstName') as HTMLInputElement).value = firstName;
      (form.elements.namedItem('lastName') as HTMLInputElement).value = lastName;
      (form.elements.namedItem('username') as HTMLInputElement).value = username;
      (form.elements.namedItem('email') as HTMLInputElement).value = email;
      (form.elements.namedItem('telNumber') as HTMLInputElement).value = telNumber;
    }, 0);
  };

  const handleDelete = (index: number) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
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
              <div style={styles.cardActions}>
                <button style={styles.editButton} onClick={() => handleEdit(index)}>
                  <i className="fas fa-edit"></i>
                </button>
                <button style={styles.deleteButton} onClick={() => handleDelete(index)}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
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
                  <input type="tel" placeholder="Tel Number" style={styles.inputFieldFull} name="telNumber" onChange={handleInputChange} />
                  {warnings.telNumber && <small style={styles.warning}>{warnings.telNumber}</small>}
                </div>
                <div style={styles.inputWithIcon}>
                  <span style={styles.icon}><i className="fas fa-lock"></i></span>
                  <input type="password" placeholder="Password" style={styles.inputFieldFull} name="password" onChange={handleInputChange} />
                  {warnings.password && <small style={styles.warning}>{warnings.password}</small>}
                </div>
                <div style={styles.passwordStrengthContainer}>
                  <div style={styles.passwordStrengthBar(passwordStrength >= 1)}></div>
                  <div style={styles.passwordStrengthBar(passwordStrength >= 2)}></div>
                  <div style={styles.passwordStrengthBar(passwordStrength >= 3)}></div>
                  <div style={styles.passwordStrengthBar(passwordStrength >= 4)}></div>
                </div>
                <div style={styles.inputWithIcon}>
                  <span style={styles.icon}><i className="fas fa-lock"></i></span>
                  <input type="password" placeholder="Confirm Password" style={styles.inputFieldFull} name="confirmPassword" onChange={handleInputChange} />
                  {warnings.confirmPassword && <small style={styles.warning}>{warnings.confirmPassword}</small>}
                </div>
                <button type="submit" style={styles.submitButton}>Save</button>
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
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    padding: '10px',
    background: '#f7f7f7',
    borderBottom: '1px solid #ddd',
  },
  addButton: {
    fontSize: '20px',
    padding: '10px',
    borderRadius: '50%',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap' as 'wrap',
    justifyContent: 'center',
    width: '100%',
    padding: '10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    width: '200px',
    padding: '10px',
    margin: '10px',
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'center' as 'center',
  },
  avatarContainer: {
    width: '80px',
    height: '80px',
    borderRadius: '40%',
    overflow: 'hidden',
    marginBottom: '30px',
  },
  avatar: {
    width: '100%',
    height: 'auto',
  },
  cardText: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '10px',
  },
  editButton: {
    fontSize: '16px',
    padding: '5px',
    background: '#ffc107',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteButton: {
    fontSize: '16px',
    padding: '5px',
    background: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  overlayContainer: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    position: 'relative' as 'relative',
    width: '400px',
    padding: '20px',
    background: '#fff',
    borderRadius: '10px',
  },
  closeButton: {
    position: 'absolute' as 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '20px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
  },
  inputGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '10px',
  },
  inputField: {
    width: '48%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  inputWithIcon: {
    position: 'relative' as 'relative',
    width: '100%',
    marginBottom: '10px',
  },
  inputFieldFull: {
    width: '100%',
    padding: '10px 10px 10px 30px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  icon: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '10px',
    transform: 'translateY(-50%)',
    color: '#aaa',
  },
  passwordStrengthContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '10px',
  },
  passwordStrengthBar: (isActive: boolean) => ({
    width: '23%',
    height: '5px',
    backgroundColor: isActive ? '#4caf50' : '#ddd',
  }),
  submitButton: {
    width: '100%',
    padding: '10px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  warning: {
    color: 'red',
    fontSize: '12px',
  },
};

export default EmpleadoFormulario;
