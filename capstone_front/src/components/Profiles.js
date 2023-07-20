import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Modal,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import "./profileCss.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";

const style = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "400px",
  maxHeight: "520px",
  overflow: "auto",
  width: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
  boxSizing: "border-box",
  p: 4,
};

function Profiles() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [confirmOpen, setconfirmOpen] = useState(false);
  const [deactivateOpen, setDeactivateOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [FormData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    phonenumber: "",
  });
  const handleOpen = (operation) => {
    if (operation === "edit") {
      setOpen(true);
    }

    if (operation === "list") {
      setListOpen(true);
    }

    if (operation === "delete") {
      setDeactivateOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setListOpen(false);
    setDeactivateOpen(false);
  };

  const [priceForm, setpriceForm] = useState(undefined);

  useEffect(() => {
    if (open) {
      setFormData({
        username: "",
        email: "",
        password: "",
        age: "",
        phonenumber: "",
      });
    }

    if (listOpen) {
      setFormData({
        hotel_name: "",
        hotel_details: "",
        hotel_address: "",
        price_id: "",
        rating: "",
        image_url: "",
        owner_id: user.id,
      });
    }
  }, [open, listOpen]);

  /* const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');
  const phonenumber = localStorage.getItem('phonenumber'); */

  const handleConfirmClose = () => {
    setconfirmOpen(false);
  }

  const handleButton = (operation) => {
    if (operation === "logout") {
      localStorage.clear();
      navigate("/");
    }

    if (operation === "edit") {
    }

    if (operation === 'deactivateCancel') {
      handleClose()
    }

    if (operation === 'confirm') {
      setconfirmOpen(true)
    }

    if (operation === "addPrice") {
      priceForm
        ? setpriceForm(undefined)
        : setpriceForm(
            <div className="listPriceDiv">
              <TextField
                label="3Hrs"
                name="3hrs"
                variant="outlined"
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="6Hrs"
                name="6hrs"
                variant="outlined"
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="12Hrs"
                name="12hrs"
                variant="outlined"
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="24Hrs"
                name="24hrs"
                variant="outlined"
                onChange={handleChange}
                fullWidth
                required
              />
            </div>
          );
    }
  };

  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="profileRoot">
      <div className="profileContainer">
        <div className="profileImagePlaceholder"></div>
        <Typography variant="h5">{user.username}</Typography>
        <div className="profileDetails">
          <div className="detailsRow">
            <Typography variant="p">Username:</Typography>
            <Typography variant="p">{user.username}</Typography>
          </div>
          <div className="detailsRow">
            <Typography variant="p">Email:</Typography>
            <Typography variant="p">{user.email}</Typography>
          </div>
          <div className="detailsRow">
            <Typography variant="p">Phone Number:</Typography>
            <Typography variant="p">{user.phonenumber}</Typography>
          </div>
        </div>
        <div
          style={{
            padding: "0 60px",
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Button
            variant="contained"
            className="profileButtons"
            onClick={() => handleOpen("edit")}
            fullWidth
          >
            Edit Profile
          </Button>
          <Button
            variant="contained"
            className="profileButtons"
            onClick={() => handleOpen("list")}
            fullWidth
          >
            List your Property
          </Button>
          <Button
            variant="contained"
            className="profileButtons"
            onClick={() => handleOpen("delete")}
            fullWidth
          >
            Deactivate Account
          </Button>
          <Button
            variant="contained"
            className="profileButtons"
            onClick={() => handleButton("logout")}
            fullWidth
          >
            Logout
          </Button>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modalRootModal"
        >
          <FormControl className="editForm" sx={style}>
            <Typography
              variant="h5"
              sx={{ width: "100%", textAlign: "center" }}
            >
              Edit Account
            </Typography>
            <TextField
              label="Username"
              name="username"
              variant="outlined"
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Age"
              name="age"
              type="number"
              variant="outlined"
              inputProps={{
                min: 0,
                max: 150,
                maxLength: 3,
              }}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Phone Number"
              name="phonenumber"
              variant="outlined"
              onChange={handleChange}
              inputProps={{ inputMode: "text", pattern: "[0-9]*" }}
              fullWidth
              required
            />
            <Button
              className="profileButtons"
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => handleButton("edit")}
              fullWidth
            >
              Confirm Changes
            </Button>
          </FormControl>
        </Modal>
        <Modal
          open={listOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modalRootModal"
        >
          <FormControl className="editForm" sx={style}>
            <Typography
              variant="h5"
              sx={{ width: "100%", textAlign: "center" }}
            >
              List your Property
            </Typography>
            <TextField
              label="Hotel/Company Name"
              name="hotel/company name"
              variant="outlined"
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Description"
              name="description"
              variant="outlined"
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Address"
              name="address"
              variant="outlined"
              onChange={handleChange}
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
              <Typography variant="p">Hotel Rating :</Typography>
              <Rating
                name="controlled_rating"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="p">Price :</Typography>
              <IconButton onClick={() => handleButton("addPrice")}>
                {priceForm ? (
                  <RemoveIcon color="primary" />
                ) : (
                  <AddIcon color="primary" />
                )}
              </IconButton>
            </div>
            {priceForm}
            <Button
              className="profileButtons"
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => handleButton("edit")}
              fullWidth
            >
              Confirm Listing
            </Button>
          </FormControl>
        </Modal>
        <Modal
          open={deactivateOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modalRootModal"
        >
          <Box sx={style}>
            <Typography variant="p" sx={{ textAlign: "center" }}>
              Are you sure you want to Deactivate your account?
            </Typography>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <Button className="profileButtons" variant="contained" onClick={() => handleButton('confirm')}>Deactivate Account</Button>
              <Button className="profileButtons" variant="contained" onClick={() => handleButton('deactivateCancel')}>Cancel</Button>
            </div>
          </Box>
        </Modal>
        <Modal
          open={confirmOpen}
          onClose={handleConfirmClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modalRootModal"
        >
          <Box sx={style}>
          <TextField
              label="To confirm please type 'Confirm'"
              name="confirm"
              variant="outlined"
              fullWidth
              required
            />
            <Button className="profileButtons" variant="contained" >Confirm Delete my Account</Button>
            <Button className="profileButtons" variant="contained" onClick={handleConfirmClose} >Cancel</Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Profiles;
