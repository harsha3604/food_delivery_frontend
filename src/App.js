import React from 'react';
import {BrowserRouter, Routes, Route,} from "react-router-dom";
import { AuthProvider } from './components/Auth/UserLoginPersist.js';
import RestaurantList from './components/Restaurant_Owner/RestaurantList.js';
import RestaurantUpdate from './components/Restaurant_Owner/RestaurantUpdate.js';
import RestaurantDetail from './components/Restaurant_Owner/RestaurantDetail.js';
import RestaurantCreate from './components/Restaurant_Owner/RestaurantCreate.js';

import MenuCreate from './components/Menu/MenuCreate.js';
import MenuUpdate from './components/Menu/MenuUpdate.js';

import MenuItemCreate from './components/MenuItem/MenuItemCreate.js';
import MenuItemUpdate from './components/MenuItem/MenuitemUpdate.js';

import RestaurantListView from './components/Restaurant_Customer/RestaurantListView.js';
import RestaurantDetailView from './components/Restaurant_Customer/RestaurantDetailView.js';

import Home from './components/Auth/Home.js';
import UserCreate from './components/Auth/UserCreate.js';
import Login from './components/Auth/Login.js';


import Test from './components/Test/Test.js';
import CartCustomerView from './components/Cart/CartCustomerView.js';
import CartOwnerView from './components/Cart/CartOwnerView.js';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        {/* <Route exact path='/test/' element={<Test/>}/> */}
        <Route exact path='/register/' element={<UserCreate/>}/>
        <Route exact path='/login/' element={<Login/>}/>

        <Route exact path='/restaurants/user/:user_id/' element={<RestaurantList/>} />
        <Route excat path='/restaurants/create/' element={<RestaurantCreate/>}/>
        <Route exact path='/restaurants/:id/' element = {<RestaurantDetail/>}/>
        <Route exact path='/restaurants/:id/update/' element={<RestaurantUpdate/>}/>

        <Route exact path='/restaurants/:id/menu/create/' element={<MenuCreate/>}/>
        <Route exact path='/restaurants/:id/menu/:id2/update/' element={<MenuUpdate/>}/>

        <Route exact path='/restaurants/:id/menu/:id2/create/' element={<MenuItemCreate/>}/>
        <Route exact path='/restaurants/:id/menu/items/:id3/' element={<MenuItemUpdate/>}/>

        <Route exact path='/view/' element={<RestaurantListView/>}/>
        <Route exact path='/view/:id/' element={<RestaurantDetailView/>}/>
        <Route exact path='/cart/customer/' element={<CartCustomerView/>}/>
        <Route exact path='/cart/owner/' element={<CartOwnerView/>}/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;