import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
function RestaurantListView() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('access_token');
    axios.get("http://localhost:8000/restaurants/",{headers: {Authorization: `Bearer ${authToken}`,}})
      .then((response) => setRestaurants(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleLogout = async () => {
    setLoading(true);
      const confirmed = window.confirm("Are you Sure you want to logout?");
      const refresh_token = localStorage.getItem('refresh_token');
      if (confirmed){
      // Send a POST request to the Django logout view
      await axios.post('http://localhost:8000/logout/', { refresh: refresh_token }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }).then(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_id');
        navigate('/login/');
      }).catch(error =>{console.log(error.log)})
    setLoading(false);
  };}





  return (
    <div>
      <h1>Variety of restaurants to choose from.  <Link to={'/cart/customer/'}>Cart History</Link></h1>
      <>
        {restaurants.map((restaurant) => (
        <ul>
          <li key={restaurant.id}>
          <h1>{restaurant.name}</h1>
          <Link to={`/view/${restaurant.id}/`}>View Restaurant Details</Link>
          </li>
        </ul>
        ))}
    <button onClick={handleLogout} disabled={loading}>
      Logout
    </button>
      </>
    </div>
  );
}

export default RestaurantListView;