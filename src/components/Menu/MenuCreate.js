import React, { useState} from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import { Link } from "react-router-dom";


const MenuCreate = () => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const authToken = localStorage.getItem('access_token');


  const handleSubmit =  (event) => {
    event.preventDefault();
    const data = {name, description,id};
    axios    
    .post(`http://localhost:8000/restaurants/${id}/menu/create/`, data,{headers: {Authorization: `Bearer ${authToken}`,}})
    .then((response) =>{
        console.log(response.data);
        setName('');
        setDescription('')})
    .then(() => {navigate(`/restaurants/${id}`);})
    .catch(error =>{
        console.log(error);
    });
    
  };

  return (
    <>
    <h1>Menu Creation</h1>
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <br />
      <label>
        Description:
        <input type="text" value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>
      <br />
      <button type="submit">Create Menu</button>
    </form>
    <Link to={`/restaurants/${id}`}>Back</Link>
    </>
  );
};



export default MenuCreate;