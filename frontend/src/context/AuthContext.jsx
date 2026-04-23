// AuthContext.jsx - keeps track of who is logged in across the whole app
// The user and JWT token are saved to localStorage so the session survives a page refresh
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  function loadStoredUser() {
    try {
      const saved = localStorage.getItem('tastehome_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  }

  const [user, setUser] = useState(loadStoredUser);

  // called after a successful login or register API response
  function login(apiResponse) {
    localStorage.setItem('tastehome_token', apiResponse.token);
    const userInfo = { id: apiResponse.id, name: apiResponse.name, email: apiResponse.email };
    localStorage.setItem('tastehome_user', JSON.stringify(userInfo));
    setUser(userInfo);
  }

  function logout() {
    localStorage.removeItem('tastehome_token');
    localStorage.removeItem('tastehome_user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// convenience hook so components just call useAuth() instead of useContext(AuthContext)
export function useAuth() {
  return useContext(AuthContext);
}
