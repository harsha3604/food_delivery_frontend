import React, { useState,useContext } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import '/home/harsha/food_app/food_app_fe/src/css/Auth.css';
import { AuthContext } from './UserLoginPersist';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  
  function handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:8000/login/', { username, password })
      .then(response => {
        localStorage.setItem('access_token', response.data.tokens['access']);
        localStorage.setItem('refresh_token', response.data.tokens['refresh']);
        localStorage.setItem('user_id',response.data.id)
        setUser(response);
        console.log(response);
        response.data.role === 1 ? navigate(`/restaurants/user/${response.data.id}/`) : navigate(`/view/`)
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
        // Handle error response here
      });


  }

  return (
    <>
      <div className='Login'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='Username'>
          <input type="text" value={username} placeholder="Username" onChange={event => setUsername(event.target.value)} />
          </div>
          <div className='Username'>
          <input type="password" value={password} placeholder='Password' onChange={event => setPassword(event.target.value)} />
          </div>
          <br/>
          <button type="submit" className='LoginButton'>Login</button>
        </form>
      </div>
    <div className='RouteButton'>
    <Link to={`/`} className='LinkRoute'>Home</Link>
    </div>
    </>
  );
}

export default Login;

