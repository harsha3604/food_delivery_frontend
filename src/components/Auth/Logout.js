import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const refresh_token = localStorage.getItem('refresh_token');
      // Send a POST request to the Django logout view
      await axios.post('http://localhost:8000/logout/', { refresh: refresh_token }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }).then(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login/');
      });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <button onClick={handleLogout} disabled={loading}>
      Logout
    </button>
  );
};

export default Logout;
