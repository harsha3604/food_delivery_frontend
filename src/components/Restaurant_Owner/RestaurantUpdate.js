import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function RestaurantUpdate() {
  const [restaurant, setRestaurant] = useState({
    name:"",
    description:"",
    address:"",
    phone_number:"",
    logo:null,
});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('access_token');
    axios.get(`http://localhost:8000/restaurants/${id}/update/`,{headers: {Authorization: `Bearer ${authToken}`,}})
      .then((response) => {
        setRestaurant(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);
  
  const handleInputChange = (e) =>{
    const {name,value} = e.target;
    setRestaurant({...restaurant,[name]:value});
};

const handleLogoChange = (e) =>{
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () =>{
      setRestaurant({...restaurant,logo:reader.result});
  }
};
  const handleSubmit = (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('access_token');
    axios.patch(`http://localhost:8000/restaurants/${id}/update/`,restaurant,{headers: {Authorization: `Bearer ${authToken}`,}})
      .then(() => {
        navigate(`/restaurants/user/${restaurant.user_id}`);
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  
    
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const confirmed = window.confirm("Are you Sure you want to delete all restaurant details?");
    const authToken = localStorage.getItem('access_token');
    if (confirmed){
    axios
    .delete(`http://localhost:8000/restaurants/${id}/update/`,{headers: {Authorization: `Bearer ${authToken}`,}})
    .then(() =>{navigate(`/restaurants/user/${restaurant.user_id}`);})
    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
    }
  };

  if (!restaurant) {
    return <div>Loading...</div>;
  }


  return (
    <>
    <div>
      <h1>{restaurant.name}</h1>
      <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type='text' id="name" name ="name" value={restaurant.name} onChange={handleInputChange}/>
                </label>
                <br/>
                <label>
                    Description:
                    <input type='text' id="description" name="description" value={restaurant.description} onChange={handleInputChange}/>
                </label>
                <br/>
                <label>
                    Address:
                    <input type='text' id="address" name="address" value={restaurant.address} onChange={handleInputChange}/>
                </label>
                <br/>
                <label>
                    Phone:
                    <input type='number' id="phone_number" name="phone_number" value={restaurant.phone_number} onChange={handleInputChange}/>
                </label>
                <br/>
                <label>
                    Logo:
                    <input type='file' id="logo" name="logo" onChange={handleLogoChange}/>
                </label>
                <button type="submit">Submit</button>
      </form>
      <button onClick={handleDelete}>Delete</button>
    </div>
    <Link to={`/restaurants/user/${restaurant.user_id}`}>Back</Link>
    </>
  );
}

export default RestaurantUpdate;
