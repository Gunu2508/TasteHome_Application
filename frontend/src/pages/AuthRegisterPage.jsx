// AuthRegisterPage.jsx - registration page that calls the real API
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../services/api';
import AuthPage from '../components/auth/AuthPage';

export default function AuthRegisterPage({ onToast }) {
  const navigate  = useNavigate();
  const { login } = useAuth();

  async function handleRegister(userData) {
    try {
      const response = await registerUser(userData.name, userData.email, userData.password);
      login(response);          // saves user + token to localStorage
      onToast('Welcome to TasteHome, ' + response.name + '!');
      navigate('/');
    } catch (err) {
      onToast(err.message || 'Registration failed. Please try again.', 'error');
    }
  }

  return (
    <AuthPage
      mode="register"
      onLogin={() => {}}              // not used on this page
      onRegister={handleRegister}
      onSwitchMode={() => navigate('/auth/login')}
      onBack={() => navigate('/')}
    />
  );
}
