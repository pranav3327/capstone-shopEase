import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    setCurrentView('login');
  };

  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="App">
      <div className="auth-container">
        <div className="auth-header">
          <h1>ShopEase</h1>
          <div className="auth-tabs">
            <button 
              className={currentView === 'login' ? 'active' : ''}
              onClick={() => setCurrentView('login')}
            >
              Login
            </button>
            <button 
              className={currentView === 'signup' ? 'active' : ''}
              onClick={() => setCurrentView('signup')}
            >
              Sign Up
            </button>
          </div>
        </div>
        
        {currentView === 'login' ? (
          <Login onLogin={handleLogin} onSwitchToSignup={() => setCurrentView('signup')} />
        ) : (
          <Signup onLogin={handleLogin} onSwitchToLogin={() => setCurrentView('login')} />
        )}
      </div>
    </div>
  );
}

export default App;