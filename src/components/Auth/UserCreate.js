import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '/home/harsha/food_app/food_app_fe/src/css/Auth.css';

const UserCreate = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('2');
  const navigate=useNavigate();



  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/register/', {
        username,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        role,
      }).then(navigate('/login/'));
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div className='Signup'>
    <h1>Register</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <br/>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <br/>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <br/>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
      />
      <br/>
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
      />
      <br/>
      <label htmlFor="role">Role:</label>
      <select id="role" value={role} onChange={handleRoleChange} className='RoleSelect'>
        <option value="2">Customer</option>
        <option value="1">Owner</option>
      </select>
      <br/>
      <br/>
      <button type="submit" className='SignupButton'>Register</button>
    </form>
    </div>
    <br/>
    <div className='RouteButton'>
    <Link to={`/`} className='LinkRoute'>Back to Home</Link>
    </div>
    </>
  );
};

export default UserCreate;
