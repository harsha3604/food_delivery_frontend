import React, { useState } from "react";
import '/home/harsha/food_app/food_app_fe/src/css/Test.css';
function Test() {
  const [count, setCount] = useState(0);
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
    <div className="increment-button-container">
      <button
        className={`increment-button ${clicked ? "clicked" : ""}`}
        onClick={handleClick}
      >
        <div className="increment-controls">
          <button className="increment-control" onClick={handleIncrement}>
            +
          </button>
          <span>{count}</span>
          <button className="increment-control" onClick={handleDecrement}>
            -
          </button>
        </div>
        {count === 0 ? "Add to Cart" : "Update Cart"}
      </button>
    </div>
  );
}


export default Test;
