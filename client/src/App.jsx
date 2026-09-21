import React, { useState } from "react";
import Users from './components/Users';
import Games from './components/Games';

function App() {
  const [notification, setNotification] = useState({ message: '', type: ''});

  // Make sure this matches your backend!
  const API_URL = 'http://localhost:3000/api/v1';

  // Global message handler passed down to components
  const showMessage = (msg, type = 'success') => {
    setNotification({ message: msg, type});
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 3000);
  }


return (
  <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '900px', margin: 'auto' }}>
    <h1 style={{ textAlign: 'center' }}>Games Collection Manager</h1>

  {notification.message && (
    <div style={{
      padding: '10',
      marginBottom: '20px',
      borderRadius: '5px',
      textAlign: 'center',
      fontWeight: 'bold',
      backgroundColor: notification.type === 'error' ? '#ffe6e6' : '#36ffe6',
      color: notification.type === 'error' ? '#cc0000' : '#006600',
      border: `1px solid ${notification.type === 'error' ? '#cc0000' : '#006600'}`
    }}>
      {notification.message}
    </div>
  )}

  <div style={{ display: 'flex', gap: '40px' }}>
    <Users API_URL={API_URL} showMessage={showMessage} />
    <Games API_URL={API_URL} showMessage={showMessage} />
  </div>
</div>
)
}

export default App;