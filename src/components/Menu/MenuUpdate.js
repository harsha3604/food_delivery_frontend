import React, { useEffect, useState} from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const MenuUpdate = () =>{
    const [menu,setMenu] = useState({});
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const { id2,id } = useParams();

    const navigate = useNavigate();

    useEffect (() => {
        const authToken = localStorage.getItem('access_token');
        axios
        .get(`http://localhost:8000/restaurants/${id}/menu/${id2}/`,{headers: {Authorization: `Bearer ${authToken}`,}})
        .then((response) => {
          setMenu(response.data);
          setName(response.data.name);
          setDescription(response.data.description);
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

    },[id,id2]);


    const handleNameChange = (e) => {
        setName(e.target.value);
      };
      const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
      };


      
    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = {name, description};
        const authToken = localStorage.getItem('access_token');
        axios    
        .patch(`http://localhost:8000/restaurants/${id}/menu/${id2}/`, data,{headers: {Authorization: `Bearer ${authToken}`,}})
        .then((response) =>{
            console.log(response.data);
            setName("");
            setDescription("")})
        .then(() => {navigate(`/restaurants/${id}/`);})
        .catch(error =>{
            console.log(error);
        });
    }

    const handleDelete = (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem('access_token');
        const confirmed = window.confirm("Are you Sure you want to delete all menu details?");
        if (confirmed){
        axios
        .delete(`http://localhost:8000/restaurants/${id}/menu/${id2}/`,{headers: {Authorization: `Bearer ${authToken}`,}})
        .then(() =>{navigate(`/restaurants/${id}/`);})
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


    return(
        <>
            <h1>Menu Update</h1>
            <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" id="name" value={name} onChange={handleNameChange} />
            </label>
            <br />
            <label>
                Description:
                <input type="text" id="description" value={description} onChange={handleDescriptionChange} />
            </label>
            <br />
            <button type="submit">Update Menu</button>
            </form>
            <Link to={`/restaurants/${id}/`}>Back</Link>
            <button onClick={handleDelete}>Delete</button>
        </>
    );
};

export default MenuUpdate;