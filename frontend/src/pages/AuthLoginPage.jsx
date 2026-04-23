// AuthLoginPage.jsx - login page that calls the real API and stores the JWT
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';
import AuthPage from '../components/auth/AuthPage';

export default function AuthLoginPage({ onToast }) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { login } = useAuth();

  // go back to where the user came from, or home if they came directly
  const from = location.state?.from?.pathname || '/';

  async function handleLogin(credentials) {
    try {
      const response = await loginUser(credentials.email, credentials.password);
      login(response);          // saves user + token to localStorage
      onToast('Welcome back, ' + response.name + '!');
      navigate(from, { replace: true });
    } catch (err) {
      onToast(err.message || 'Login failed. Please check your details.', 'error');
    }
  }

  return (
    <AuthPage
      mode="login"
      onLogin={handleLogin}
      onRegister={() => {}}           // not used on this page
      onSwitchMode={() => navigate('/auth/register')}
      onBack={() => navigate('/')}
    />
  );
}
