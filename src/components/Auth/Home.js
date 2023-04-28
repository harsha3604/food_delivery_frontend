import React from "react";
import { Link } from "react-router-dom";
import '/home/harsha/food_app/food_app_fe/src/css/Auth.css';



const Home = () =>{
    return(
        <>
        <div className="Page">
            <div className="Header">
                <h1>Indulge your senses with our mouthwatering dishes</h1>
                <h2>Bursting with flavor and made with only the freshest ingredients.</h2>
            </div>
            <div className="RouteButton">
                <Link  to={`/login/`} className="LinkRoute"> Go to Login</Link>
            </div>
            <div className="RouteButton">
                <Link to={`/register/`} className="LinkRoute">Register</Link>
            </div>
        </div>
        </>
    )
}

export default Home;