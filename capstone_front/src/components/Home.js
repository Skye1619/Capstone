import React, { useEffect, useState } from "react";
import "./homeCss.css";
import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Card } from "@mui/material";

function Hotels() {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/home?page=${page}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("login_token"),
            },
          }
        );
        let hotels = response.data.hotels;
        console.log(hotels);

        setData(hotels);
        setloading(false);
        const element = document.querySelector('.hotelRoot');
        element.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    };

    fetchData();
  }, [page]);

  const handleSeeMore = () => {
    setpage(page + 1);
    
    
  }

  const populateData = () => {
    return data.map((hotel) => {
      const hotelName = hotel.hotel_name;
      const hotelDetails = hotel.hotel_details;
      const hotelAddress = hotel.hotel_address;
      const rating = hotel.rating;
      const image = hotel.image_url;
      const id = hotel.id;

      return (
        <div key={id} className="hotelCard">
          <img
            style={{ width: "100%", maxWidth: "120px", flex: "1 0" }}
            src={image}
            alt="Hotel Image"
            loading='lazy'
          />
          <div
            className="cardDetailsDiv"
            style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          >
            <h5 style={{ margin: 0 }}>{hotelName}</h5>
            <Rating
              name="read-only"
              value={rating}
              readOnly
              sx={{ marginBottom: "3px" }}
            />
            <p style={{ margin: 0, fontSize: "small" }}>{hotelDetails}</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxSizing: "border-box",
                alignSelf: "flex-end",
                width: "100%",
              }}
            >
              <p style={{ fontSize: "small" }}>{hotelAddress}</p>
              <Button
                variant="contained"
                sx={{ flexWrap: "nowrap", minWidth: "unset" }}
              >
                Book now
              </Button>
            </div>
          </div>
        </div>
      );
    });
  };

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
            Find Your Hotels <span style={{fontSize: 'small', color: '#999', marginLeft: 'auto'}}>Page: {page}</span>
          </Typography>
          <div className="hotelListContainer">{populateData()}</div>
          <Button onClick={handleSeeMore} variant="contained" sx={{width: 'fit-content', margin: '50px auto 0 auto'}}>See More</Button>
        </div>
      </div>
    </div>
  );
}

export default Hotels;
