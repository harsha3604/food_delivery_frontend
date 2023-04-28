import React from "react";
import { Link,useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import { useState} from "react";

const MenuItemCreate = () =>{
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [description,setDescription] = useState('');
    const {id,id2} = useParams();
    const navigate = useNavigate();

    
    const InputName = (e) =>{
        setName(e.target.value);
    };
    const InputDescription = (e) =>{
        setDescription(e.target.value);
    };
    const InputPrice= (e) =>{
        setPrice(e.target.value);
    };

    const Create = (e) =>{
        e.preventDefault();
        const authToken = localStorage.getItem('access_token');
        axios
        .post(`http://localhost:8000/restaurants/${id}/menu/${id2}/create/`,{name,description,price},{headers: {Authorization: `Bearer ${authToken}`,}})
        .then((response) =>{
            console.log(response.data);
            setName('');
            setDescription('');
            setPrice('');
        })
        .then(() => {navigate(`/restaurants/${id}/`);})
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
                    <input type='text' value={name} onChange={InputName}/>
                </label>
                <br/>
                <label>
                    Description:
                    <input type='text' value={description} onChange={InputDescription}/>
                </label>
                <br/>
                <label>
                    Price:
                    <input type='number' value={price} onChange={InputPrice}/>
                </label>
                <button type="submit">Submit</button>
            </form>
            <Link to={`/restaurants/${id}`}>Back</Link>
        </div>
        </>
    )
};

export default MenuItemCreate;

