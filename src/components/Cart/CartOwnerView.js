import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Auth/UserLoginPersist';

function CartList() {
  const [carts, setCarts] = useState([]);
  const { user } = useContext(AuthContext);
  const [cartitems,setCartItems] = useState([]);

  useEffect(() => {
    const authToken = localStorage.getItem('access_token');
    axios
      .get(`http://localhost:8000/restaurants/user/${user.data.id}/cart_owner/`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        setCarts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });      
  }, [user]);

  useEffect(() => {
    const authToken = localStorage.getItem('access_token');
    axios
      .get(`http://localhost:8000/restaurants/allcartitems/`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });      
  }, [user]);


  const handleCartStatus = (cartId, status) => {
    const authToken = localStorage.getItem('access_token');
    axios
      .patch(`http://localhost:8000/restaurants/user/cart/${cartId}/update/`, {status}, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        // update the cart status in the local state
        const updatedCarts = carts.map(cart => {
          if (cart.id === cartId) {
            return {...cart, status};
          }
          return cart;
        });
        setCarts(updatedCarts);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const formatDate = (timestamp) =>{
    const date = new Date(timestamp);
    const isoString = date.toISOString();
    const datePart = isoString.split('T')[0];
    return <div>Date Ordered: {datePart}</div>;
  };

  return (
    <>
      <div>
        <h1>All Carts for {user && user.data && user.data.username}</h1>
        {carts.map((cart) => (
          <ul key={cart.id}>
            <li>
              <h3>{formatDate(cart.date_created)}</h3>
              <h3>Item || Quantity || Cost</h3>
              {cartitems.length > 0 && cartitems.filter((cartitem)=>cartitem.cart === cart.id).map((cartitem) => (
                <div key={cartitem.id}>
                  <h4>{cartitem.item_name} || {cartitem.quantity} || {cartitem.cost}</h4>
                </div>
              ))}
              <h4>Total Cost: {cart.total_cost}</h4>
              <button onClick={() => handleCartStatus(cart.id, 1)}>Accept</button>
              <button onClick={() => handleCartStatus(cart.id, 0)}>Reject</button>
              <p>Order is {cart.status==0? 'Rejected':'Accepted'}</p>
            </li>
          </ul>
        ))}
        <Link to={`/restaurants/user/${user.data.id}`}>Back</Link>
      </div>
    </>
  );
}

export default CartList;
