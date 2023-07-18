import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import "./profileCss.css";
import { useNavigate } from "react-router-dom";

const style = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  width: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
  boxSizing: "border-box",
  p: 4,
};

function Profiles() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [FormData, setFormData] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /* const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');
  const phonenumber = localStorage.getItem('phonenumber'); */

  const user = JSON.parse(localStorage.getItem("user"));

  const handleButton = (operation) => {
    if (operation === "logout") {
      localStorage.clear();
      navigate("/");
    }

    if (operation === "edit") {
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
            onClick={handleOpen}
            fullWidth
          >
            Edit Profile
          </Button>
          <Button variant="contained" className="profileButtons" fullWidth>
            List your Property
          </Button>
          <Button variant="contained" className="profileButtons" fullWidth>
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
          <Typography variant='h5' sx={{width: '100%', textAlign: 'center'}} >Edit Account</Typography>
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
      </div>
    </div>
  );
}

export default Profiles;
