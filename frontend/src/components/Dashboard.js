import React from 'react';

const Dashboard = ({ user, onLogout }) => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to ShopEase</h1>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </div>
      <div className="dashboard-content">
        <div className="user-info">
          <h2>Hello, {user.name}!</h2>
          <p>Email: {user.email}</p>
          <p>You have successfully logged in to ShopEase.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;