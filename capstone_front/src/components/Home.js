import React from "react";
import "./homeCss.css";
import { Typography } from "@mui/material";

function Hotels() {
  return (
    <div className="hotelRoot">
      <div className="hotelContainer">
        <div className="hotelHeader">
          <Typography variant="h3" className="sloganTop slogan">
            Embrace Adventure,
          </Typography>
          <Typography variant="h3" className="sloganBot slogan">
            Reserve with Reserva
          </Typography>
        </div>
        <div className="hotelsList">
          <Typography variant="h6" className="hotelListTitle">
            Find Your Hotels
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Hotels;
