import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom";

const CartCustomerView = () =>{
    const [carts, setCarts] = useState([]);
    const [cartitems,setCartItems] = useState([]);
    const user_id = localStorage.getItem('user_id')

    useEffect(() => {
        const authToken = localStorage.getItem('access_token');
        axios.get(`http://localhost:8000/restaurants/user/${user_id}/cart/view/`,{headers: {Authorization: `Bearer ${authToken}`,}})
        .then((response) => setCarts(response.data))
        .catch(error => {console.log(error.response);});
    }   , [user_id]);

    useEffect(()=>{
        const authToken = localStorage.getItem('access_token');
        axios.get(`http://localhost:8000/restaurants/user/${user_id}/cartitems/view/`,{headers: {Authorization: `Bearer ${authToken}`,}})
        .then((response) => setCartItems(response.data))
        .catch(error => {console.log(error.response);});
    }   , [user_id]);

    const formatDate = (timestamp) =>{
        const date = new Date(timestamp);
        const isoString = date.toISOString();
        const datePart = isoString.split('T')[0];
        // Use the datePart string in your React component
        return <div>Date Ordered: {datePart}</div>;
    }



return (
  <>
    <div>
    <h1>View All Orders</h1>
    {carts.map((cart) => (
        <ul key={cart.id}>
            <li>
            <h3>{formatDate(cart.date_created)}</h3>
            <h3>        Item         ||         Quantity    ||           Cost      </h3>
            {cartitems.filter((cartitem)=>cartitem.cart === cart.id).map((cartitem) => (
                <div key={cartitem.id}>
                <h4>{cartitem.item_name} || {cartitem.quantity} ||      {cartitem.cost}</h4>
                </div>
            ))}
            </li>
            <h4>Total Cost:{cart.total_cost}</h4>
        </ul>
    ))}
    </div>
    <Link to={`/view/`}>Back</Link>
  </>
);
};
export default CartCustomerView;