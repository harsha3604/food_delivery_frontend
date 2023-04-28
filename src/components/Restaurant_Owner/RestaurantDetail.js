import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom";
const RestaurantDetail = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [menus,setMenus] = useState([]);
  const [menuitems,setMenuItems] = useState([]);
  const { id } = useParams();


  useEffect(() => 
  {
    const authToken = localStorage.getItem('access_token')
    axios
      .get(`http://localhost:8000/restaurants/${id}/`,{headers:{Authorization: `Bearer ${authToken}`,}})
      .then((response) => {setRestaurant(response.data);})
      .then((response) => console.log(response))
      .catch(error => {console.log(error.response);});

  },
  [id]);

  useEffect(() =>
  {
    const authToken = localStorage.getItem('access_token')
    axios
    .get(`http://localhost:8000/restaurants/${id}/menu/`,{headers:{Authorization: `Bearer ${authToken}`,}})
    .then((response) => {setMenus(response.data);})
    .catch(error =>{console.log(error.response);});
  },
  [id]);

  useEffect(() => 
  {
    const authToken = localStorage.getItem('access_token')
    axios
    .get(`http://localhost:8000/restaurants/${id}/menu/items/`,{headers:{Authorization: `Bearer ${authToken}`,}})
    .then((response) => {setMenuItems(response.data);})
    .catch(error => {console.log(error.response);});
  },
  [id]);

  if (!restaurant || !menus) {
    return <div>No data is being received. Please Check code.</div>;
  }


  return (
    <div>
      <>
        <img src = {restaurant.logo} alt=""/>
        <h1>{restaurant.name}</h1>
        <p>{restaurant.description}</p>
        <p>Address: {restaurant.address}</p>
        <p>Phone: {restaurant.phone_number}</p>
        <br/>
        <Link to={`menu/create/`}>CreateMenu</Link>
        <h2>Menus</h2>
      <ul>
        {menus.map((menu) => (
          <li key={menu.id}>          
            <h3>{menu.name} <Link to={`menu/${menu.id}/update/`}>Update Menu</Link> || <Link to={`/restaurants/${id}/menu/${menu.id}/create/`}>Create Menu Item</Link></h3>
            <p>{menu.description}</p>
            <ul>
              {menuitems.filter((menuitem) => menuitem.menu_id === menu.id ).map((menuitem) =>(
                <li key = {menuitem.id}>
                  <h4>{menuitem.name} <Link to={`/restaurants/${id}/menu/items/${menuitem.id}/`}>Update Item</Link></h4>
                  <p>{menuitem.price} INR</p>
                  <p>{menuitem.description}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      </>
        <Link to={`/restaurants/user/${restaurant.user_id}`}>Back</Link>
    </div>
  );
};

export default RestaurantDetail;



