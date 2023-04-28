import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom";
import '/home/harsha/food_app/food_app_fe/src/css/Restaurant_Customer.css';
const RestaurantDetailView = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [menus,setMenus] = useState([]);
  const [menuitems,setMenuItems] = useState([]);
  const { id } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const user_id = localStorage.getItem('user_id')
// LOADING DATA 
  useEffect(() => 
  {
    const authToken = localStorage.getItem('access_token');
    axios
      .get(`http://localhost:8000/restaurants/${id}/`,{headers: {Authorization: `Bearer ${authToken}`,}})
      .then((response) => {setRestaurant(response.data);})
      .catch(error => {console.log(error.response);});
  },
  [id]);

  useEffect(() =>
  {
    const authToken = localStorage.getItem('access_token');
    axios
    .get(`http://localhost:8000/restaurants/${id}/menu/`,{headers: {Authorization: `Bearer ${authToken}`,}})
    .then((response) => {setMenus(response.data);})
    .catch(error =>{console.log(error.response);});
  },
  [id]);

  useEffect(() => 
  {
    const authToken = localStorage.getItem('access_token');
    axios
    .get(`http://localhost:8000/restaurants/${id}/menu/items/`,{headers: {Authorization: `Bearer ${authToken}`,}})
    .then((response) => {setMenuItems(response.data);})
    .catch(error => {console.log(error.response);});
  },
  [id]);
  
// FUNCTIONS FOR ADD TO CART
  function ZButton() {
    const [count, setCount] = useState(0); // Get the stored count value from localStorage, or default to 0
    const [clicked, setClicked] = useState(false);
  
    const handleClick = () => {
      setClicked(true);
      setCount(count + 1);
    };
  
    const handleIncrement = () => {
      setCount(count + 1);
    };
  
    const handleDecrement = () => {
      if (count > 0) {
        setCount(count - 1);
      }
    };    
    return (
      <>
      <div className="increment-button-container">
        <button className={`increment-button ${clicked ? "clicked" : ""}`} onClick={handleClick}>{count === 0 ? "Add" : <span>{count}</span>}</button>
        {count > 0 && (
          <div className="increment-controls">
            <button className="increment-control" onClick={handleIncrement}>
              +
            </button>
            <button className="increment-control" onClick={handleDecrement}>
              -
            </button>
          </div>
        )}
      </div>
      </>
    );
  }

  

  const addToCart = (item) => {
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    try{if (index >= 0) {
      const newCartItems = [...cartItems];
      newCartItems[index].quantity += 1;
      setCartItems(newCartItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }}
    catch (err){
      console.log(err)
    }
  };

  const removeFromCart = (item) =>{
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    try{if (index >= 0) {
      const newCartItems = [...cartItems];
      const newQuantity = newCartItems[index].quantity - 1;
      if (newQuantity === 0) {
        newCartItems.splice(index, 1);
      } else {
        newCartItems[index].quantity = newQuantity;
      }
      setCartItems(newCartItems);
    }}
    catch (err){
      console.log(err)
    }
  };
  
  const Checkout = () => {
    const authToken = localStorage.getItem('access_token');
  
    if (cartItems.length === 0) {
      console.log("Cart is empty.");
      return;
    }
  
    const cart = {
      user: localStorage.getItem('user_id'),
      total_cost: 0,
      date_created: new Date().toISOString(),
      status: false,
      items: []
    };

    cartItems.forEach((item) => {
      const cartItem = {
        item_id: item.id,
        item_name: item.name,
        quantity: item.quantity,
        cost: item.price * item.quantity,
      };
      cart.items.push(cartItem);
      cart.total_cost += cartItem.cost;
    });
    console.log(cart);
    axios
      .post(`http://localhost:8000/restaurants/user/${user_id}/cart/create/`, cart, { headers: { Authorization: `Bearer ${authToken}` } })
      .then((response) => console.log(response.data))
      .then(setCartItems([]))
      .catch(error => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  };
  


  if (!restaurant || !menus) {
    return <div>No data is being received. Please Check code.</div>;
  }


  return (
    <>
    <div>
        <img src = {restaurant.logo} alt=""/>
        <h1>{restaurant.name}</h1>
        <p>{restaurant.description}</p>
        <p>Address: {restaurant.address}</p>
        <p>Phone: {restaurant.phone_number}</p>
        <br/>

        <h2>Menus</h2>
      <ul>
        {menus.map((menu) => (
          <li key={menu.id}>          
            <h3>{menu.name}</h3>
            <p>{menu.description}</p>
            <ul>
              {menuitems.filter((menuitem) => menuitem.menu_id === menu.id ).map((menuitem) =>(
                <li key = {menuitem.id}>
                  <h4>{menuitem.name} <button onClick={() => addToCart(menuitem)}>Add</button> || <button onClick={() => removeFromCart(menuitem)}>Remove</button> </h4>
                  <p>{menuitem.price} INR</p>
                  <p>{menuitem.description}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}

      </ul>

      <div>
      <h2>Cart</h2>
      {cartItems.map((cartItem) => (
        <div key={cartItem.id}>
          <h3>{cartItem.name}</h3>
          <p>Quantity: {cartItem.quantity}</p>
          <p>Price: {cartItem.price*cartItem.quantity} INR</p>
        </div>
      ))}
    <button onClick={() => Checkout()}>Checkout</button>
    </div>
    <Link to={`/view/`}>Back</Link>
    </div>
    </>
  );
};

export default RestaurantDetailView;



