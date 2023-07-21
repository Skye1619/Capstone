import React, { useEffect, useState } from "react";
import "./homeCss.css";
import {
  Box,
  Button,
  FormControl,
  Modal,
  Rating,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import dayjs from "dayjs";

const style = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "750px",
  maxHeight: "520px",
  overflow: "auto",
  width: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
  boxSizing: "border-box",
  p: 4,
};

function Home() {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [hotelItems, sethotelItems] = useState(undefined);
  const [booknowOpen, setbooknowOpen] = useState(false);
  const [modalFormData, setmodalFormData] = useState(undefined);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [choosenCategory, setchoosenCategory] = useState(undefined);
  const [bookingDate, setbookingDate] = useState(dayjs());

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
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    };

    fetchData();
  }, [page]);

  const handleSeeMore = () => {
    setpage(page + 1);
    setloading(true);
  };

  const handleCategoryClose = () => {
    setCategoryOpen(false);
  };

  const handleCategoryOpen = () => {
    setCategoryOpen(true);
  };

  const handleBookingButton = (operation) => {
    if (operation === "confirm") {
    }

    if (operation === "cancel") {
      setbooknowOpen(false);
    }
  };

  useEffect(() => {
    const element = document.querySelector(".hotelRoot");
    element.scrollTo({
      top: 0,
      /* behavior: "smooth", */
    });

    loading
      ? sethotelItems(
          Array.from(new Array(20)).map((item, index) =>
            item ? undefined : (
              <Skeleton
                key={index}
                variant="rectagular"
                sx={{ width: "100%", height: "180px", borderRadius: "5px" }}
              />
            )
          )
        )
      : sethotelItems(populateData());
  }, [loading]);

  const booknowClick = (data) => {
    setbooknowOpen(true);
    setmodalFormData(data);
  };

  const handleBookCancel = () => {
    setbooknowOpen(false);
  };

  const categoryChoose = (category) => {
    setchoosenCategory(category);
    handleCategoryClose();
  };

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
            loading="lazy"
          />
          <div className="cardDetailsDiv">
            <h5 style={{ margin: 0 }}>{hotelName}</h5>
            <Rating
              name="read-only"
              value={rating}
              readOnly
              sx={{ marginBottom: "3px" }}
            />
            <p style={{ margin: 0, fontSize: "small" }}>{hotelDetails}</p>
          </div>
          <div className="addressDiv">
            <p style={{ fontSize: "small" }}>{hotelAddress}</p>
            <Button
              variant="contained"
              className="booknowButton"
              onClick={() => booknowClick(hotel)}
            >
              Book now
            </Button>
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
          {loading ? (
            <Skeleton animation="wave" width="20%">
              <Typography variant="h6">.</Typography>
            </Skeleton>
          ) : (
            <Typography variant="h6" className="hotelListTitle">
              Find Your Hotels{" "}
              <span
                style={{ fontSize: "small", color: "#999", marginLeft: "auto" }}
              >
                Page: {page}
              </span>
            </Typography>
          )}

          <div className="hotelListContainer">{hotelItems}</div>
          {loading ? (
            <Skeleton sx={{ margin: "50px auto 0 auto" }} animation="wave">
              <Button>See More</Button>
            </Skeleton>
          ) : (
            <Button
              className="seemoreButton"
              onClick={handleSeeMore}
              variant="contained"
            >
              See More
            </Button>
          )}
        </div>
      </div>
      <Modal
        open={booknowOpen}
        onClose={handleBookCancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modalRootModal"
      >
        <Box sx={style}>
          <Typography variant="h5" className="typographyCenter">
            {modalFormData ? modalFormData.hotel_name : undefined}
          </Typography>
          <div className="booknowNote">
            <Typography variant="p" className="typographyCenter">
              Please fill out the information below to complete your reservation
            </Typography>
          </div>
          <FormControl className="modalForm">
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Select Appointment Date"
                  value={bookingDate}
                  onChange={(newValue) => setbookingDate(newValue)}
                  desktopModeMediaQuery="dialog"
                />
              </LocalizationProvider>
            </div>
            <div className="dualDiv">
              <TextField
                label="First Name"
                name="firstname"
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                label="Last Name"
                name="lastname"
                variant="outlined"
                fullWidth
                required
              />
            </div>
            <div className="dualDiv">
              <TextField
                label="Number of Adults"
                name="adults"
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                label="Number of Kids"
                name="kids"
                variant="outlined"
                fullWidth
                required
              />
            </div>
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Phone Number"
              name="phonenumber"
              variant="outlined"
              fullWidth
              required
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                endIcon={<KeyboardArrowDownIcon />}
                onClick={handleCategoryOpen}
              >
                <Typography variant="p">Booking Category</Typography>
              </Button>
              <Typography variant="p">
                {choosenCategory ? (
                  <div>
                    Booking Category: <span>{choosenCategory}</span>
                  </div>
                ) : null}
              </Typography>
              <Modal
                open={categoryOpen}
                onClose={handleCategoryClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modalRootModal"
              >
                <Box sx={style} className="categoryChoice">
                  <Typography variant="h5" sx={{ textAlign: "center" }}>
                    Choose Category
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => categoryChoose("Short Time")}
                  >
                    Short Time - 3hrs
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => categoryChoose("Extended")}
                  >
                    Extended - 6hrs
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => categoryChoose("Half Day")}
                  >
                    Half Day - 12hrs
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => categoryChoose("24 Hours")}
                  >
                    24 Hours
                  </Button>
                </Box>
              </Modal>
            </div>
            <Button
              variant="contained"
              onClick={() => handleBookingButton("confirm")}
              fullWidth
            >
              Reserve now
            </Button>
            <Button
              variant="contained"
              onClick={() => handleBookingButton("cancel")}
              fullWidth
            >
              Cancel Booking
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}

export default Home;
