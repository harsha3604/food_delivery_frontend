import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,useNavigate,useParams} from "react-router-dom";
import '/home/harsha/food_app/food_app_fe/src/css/Restaurant_Owner.css';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user_id = useParams();
  console.log(user_id)
  useEffect(() => {
    const authToken = localStorage.getItem('access_token');
    axios.get(`http://localhost:8000/restaurants/user/${user_id.user_id}`,{headers: {Authorization: `Bearer ${authToken}`,}})
      .then((response) => setRestaurants(response.data))
      .catch((error) => console.log(error));
  }, [user_id]);



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
    <>
    <div>
      <h1>Your Restaurants   <Link to={'/cart/owner/'}>Your Orders</Link></h1>
      <Link to={`/restaurants/create`}>Create A New Restaurant</Link>
        <table>
          {restaurants.map((restaurant) => (
          <tbody>
          <tr>
          <td>{restaurant.name}</td>
          <td><Link to={`/restaurants/${restaurant.id}/`}>View</Link></td>
          <td><Link to={`/restaurants/${restaurant.id}/update/`}>Update</Link></td>
          </tr>
          </tbody>
        ))}
        </table>
        <button onClick={handleLogout} disabled={loading}>Logout</button>
    </div>
    </>
  );
}

export default RestaurantList;