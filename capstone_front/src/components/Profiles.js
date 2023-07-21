import React, { useEffect, useRef, useState } from "react";
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
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import PulseLoader from "react-spinners/PulseLoader";

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
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false)
  const confirmRef = useRef(null);

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

  const deactivateConfirm = () => {
    console.log(confirmRef.current.value)
    if (confirmRef.current.value === "Confirm") {
      // Confirm the Account Deactivation
      setDeleting(true);
      const fetchData = async () => {
        try {
          const response = await axios.delete(
            `http://127.0.0.1:8000/api/user/profile/${user.email}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("login_token"),
              },
            }
          );
          localStorage.clear();
          const message = "Account Successfully Deactivated";
          toast(message, {
            duration: 4000,
            position: "top-center",

            style: { zIndex: "1000000" },
            className: "myToast",

            icon: "",

            iconTheme: {
              primary: "#000",
              secondary: "#fff",
            },

            ariaProps: {
              role: "status",
              "aria-live": "polite",
            },
          });
          navigate('/login')
          window.location.reload();
        } catch (error) {
          toast(error.response.errors.message, {
            duration: 4000,
            position: "top-center",

            style: { zIndex: "1000000" },
            className: "myToast",

            icon: "",

            iconTheme: {
              primary: "#000",
              secondary: "#fff",
            },

            ariaProps: {
              role: "status",
              "aria-live": "polite",
            },
          });
        }
      };
      fetchData();
    } else {
      toast('Type "Confirm" To confirm Deactivation of Your Account', {
        duration: 4000,
        position: "top-center",

        style: { zIndex: "1000000" },
        className: "myToast",

        icon: "",

        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },

        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
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
        username: user.username,
        email: user.email,
        password: "",
        age: user.age,
        phonenumber: user.phonenumber,
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
  };

  const handleButton = (operation) => {
    if (operation === "logout") {
      localStorage.clear();
      navigate("/");
    }

    if (operation === "edit") {
      setUpdating(true);
      const fetchData = async () => {
        try {
          const response = await axios.put(
            `http://127.0.0.1:8000/api/user/profile/${user.email}`,
            FormData,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("login_token"),
              },
            }
          );

          const message = "Profile updated successfully";
          toast(message, {
            duration: 4000,
            position: "top-center",

            style: { zIndex: "1000000" },
            className: "myToast",

            icon: "",

            iconTheme: {
              primary: "#000",
              secondary: "#fff",
            },

            ariaProps: {
              role: "status",
              "aria-live": "polite",
            },
          });
          localStorage.removeItem("user");
          setUpdating(false);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          console.log(response.data, "hello");
          window.location.reload();
        } catch (error) {
          console.error(error, error.response.data.message);
          setUpdating(false);
          toast(error.response.data.message, {
            duration: 4000,
            position: "top-center",

            className: "myToast",

            icon: "",

            iconTheme: {
              primary: "#000",
              secondary: "#fff",
            },

            ariaProps: {
              role: "status",
              "aria-live": "polite",
            },
          });
        }
      };

      fetchData();
    }

    if (operation === "deactivateCancel") {
      handleClose();
    }

    if (operation === "confirm") {
      setconfirmOpen(true);
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
    console.log(FormData);
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
              defaultValue={user.username}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              onChange={handleChange}
              defaultValue={user.email}
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
              defaultValue={user.age}
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
              defaultValue={user.phonenumber}
              required
            />
            <Button
              className="profileButtons"
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => handleButton("edit")}
              disabled={updating ? true : false}
              fullWidth
            >
              {updating ? <PulseLoader color="#2196f3" /> : "Confirm Changes"}
            </Button>
            <Button
              className="profileButtons"
              type="cancel"
              variant="contained"
              color="primary"
              onClick={handleClose}
              fullWidth
            >
              Cancel
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
            <Button
              className="profileButtons"
              type="cancel"
              variant="contained"
              color="primary"
              onClick={handleClose}
              fullWidth
            >
              Cancel
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
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Button
                className="profileButtons"
                variant="contained"
                onClick={() => handleButton("confirm")}
              >
                Deactivate Account
              </Button>
              <Button
                className="profileButtons"
                variant="contained"
                onClick={() => handleButton("deactivateCancel")}
              >
                Cancel
              </Button>
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
              inputRef={confirmRef}
              fullWidth
              required
            />
            <Button
              className="profileButtons"
              variant="contained"
              onClick={deactivateConfirm}
              disabled={deleting ? true : false}
            >
              {deleting ? <PulseLoader color="#2196f3" />: 'Confirm Delete my Account'}
              
            </Button>
            <Button
              className="profileButtons"
              variant="contained"
              onClick={handleConfirmClose}
            >
              Cancel
            </Button>
          </Box>
        </Modal>
      </div>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #713200",
            padding: "10px",
            color: "#713200",
          },
        }}
      />
    </div>
  );
}

export default Profiles;
