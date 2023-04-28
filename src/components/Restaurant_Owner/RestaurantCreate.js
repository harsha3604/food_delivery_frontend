import React, { useState} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function RestaurantCreate(){
    const [restaurant, setRestaurant] = useState({
        name:"",
        description:"",
        address:"",
        phone_number:"",
        logo:null,
    });
    const user_id = localStorage.getItem('user_id');
    const navigate = useNavigate();
    const authToken = localStorage.getItem('access_token');



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

    const Create = (e) =>{
        e.preventDefault();
        axios
        .post(`http://localhost:8000/restaurants/create/`,restaurant,{headers:{Authorization: `Bearer ${authToken}`,}})
        .then((response) =>{
            console.log(response.data);
        })
        .then(() => {navigate(`/restaurants/user/${user_id}`);})
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

    return(
        <>
        <div>
            <form onSubmit={Create}>
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
            <Link to={`/restaurants/user/${user_id}`}>Back</Link>
        </div>
        </>
    );
}


export default RestaurantCreate;