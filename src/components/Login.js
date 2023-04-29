import React, { useState } from 'react';
import './Login.css';

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Check if the entered username and password match
    if (username === 'phillwar' && password === 'Warphill') {
      props.onLogin();
    } else {
      alert('Invalid username or password');
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input className="form-input" type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <label>
          Password:
          <input className="form-input" type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
