import React, { useEffect, useState } from "react";
import "./searchCss.css";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Modal,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from '@mui/icons-material/Search';

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

function Search() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hotelItems, setHotelItems] = useState("");
  const [booknowOpen, setbooknowOpen] = useState(false);
  const [modalFormData, setmodalFormData] = useState(undefined);
  const [bookingDate, setbookingDate] = useState(undefined);
  const [choosenCategory, setchoosenCategory] = useState(undefined);
  const [categoryOpen, setcategoryOpen] = useState(false);

  const [searchItem, setSearchItem] = useState(
    JSON.parse(localStorage.getItem("search_item"))
  );

  useEffect(() => {
    console.log(searchItem);
  }, []);

  const handleSeeMore = () => {};

  const handleBookCancel = () => {};

  const handleBookingButton = () => {};

  const handleCategoryOpen = () => {};

  const handleCategoryClose = () => {};

  const categoryChoose = () => {};

  const searchClick = () => {
    const searchField = document.querySelector('.searchField')
    searchField.focus()
  };

  return (
    <div className="searchRoot">
      <div className="searchContainer">
        <div className="searchHeader">
          <Typography variant="h3" className="sloganTop slogan">
            Embrace Adventure,
          </Typography>
          <Typography variant="h3" className="sloganBot slogan">
            Reserve with Reserva
          </Typography>
        </div>

        {searchItem ? (
          loading ? (
            <div className="searchBody">
              <Skeleton animation="wave" width="20%">
                <Typography variant="h6">.</Typography>
              </Skeleton>
              <Skeleton sx={{ margin: "50px auto 0 auto" }} animation="wave">
                <Button>See More</Button>
              </Skeleton>
            </div>
          ) : (
            <div className="searchBody">
              <Typography variant="h6" className="searchListTitle">
                Find Your Hotels{" "}
                <span
                  style={{
                    fontSize: "small",
                    color: "#999",
                    marginLeft: "auto",
                  }}
                >
                  Page: {page}
                </span>
              </Typography>
              <Button
                className="seemoreButton"
                onClick={handleSeeMore}
                variant="contained"
              >
                See More
              </Button>
            </div>
          )
        ) : (
          <div className="searchBody">
            <Typography
              variant="h4"
              sx={{ textAlign: "center", marginTop: "20px" }}
            >
              Looking for Something?
            </Typography>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Button variant="outlined" endIcon={<SearchIcon color="primary" />} sx={{color: '#000'}} onClick={searchClick} >
                Search
              </Button>
            </div>
          </div>
        )}

        <div className="searchListContainer">{hotelItems}</div>
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

export default Search;
