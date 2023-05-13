// here we are going to create a custome buttom ;

import React from "react";
import "./button.css";

const Button = (props) => {
  const { title, onClick, isLoading } = props;

  return (
    <>
      <div className="cstBtn">
        <button onClick={onClick}>
          {isLoading ? (
            <div
              className="spinner-border text-light"
              role="status"
              style={{ width: "22px", height: "22px" }}
            >
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            title
          )}
        </button>
      </div>
    </>
  );
};

export default Button;
