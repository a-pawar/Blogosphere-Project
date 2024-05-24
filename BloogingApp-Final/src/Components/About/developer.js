import React from "react";
import "./developer.css";
const Developer = () => {
  return (
    <div className="container">
      <h1 className="title"> TEAM </h1>
      <div className="team">
        <div className="developer">
          <div className="overlay">
            Media and Design Track, in charge of About Page
          </div>
          <div className="devImg">
            {/* <img src={} alt={props.alt} /> */}
          </div>
          <div className="devInfo">
            <p className="fullName"> Anshul Pawar </p>
            <p className="position"> Software Developer </p>
          </div>
        </div>
      </div>
    </div>

  );
};
export default Developer;