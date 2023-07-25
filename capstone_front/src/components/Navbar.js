import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "./capstoneLogo.png";
import keyLogo from "./reservaKey.png";
import "./navbarCss.css";
import {
  Card,
  CardMedia,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const drawerWidth = 240;
const navItems = ["Profile", "Home", "About", "Logout"];

export default function SearchAppBar(props) {

  const backendApi = process.env.REACT_APP_BACKEND_API
  const { window } = props;
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  /* const navigate = useNavigate() */

  const drawerItemClick = (item) => {
    if (item === "Profile") {
    } else if (item === "Home") {
    } else if (item === "About") {
    } else if (item === "Logout") {
      localStorage.clear();
    }
  };

  const searchChange = (event) => {
    setSearchValue((prevState) => event.target.value);
  };

  const searchNow = (event) => {
    if (event.key === "Enter") {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${backendApi}/hotels/${searchValue.replace(
              / /g,
              "_"
            )}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("login_token"),
              },
            }
          );
          if (response.data.message === "Hotel not found") {
            localStorage.removeItem("search_item");
            getToast(response.data.message);
            navigate(searchValue);
            event.view.location.reload()
          } else {
            localStorage.removeItem("search_item");
            navigate(searchValue);
            getToast(response.data.message);
            localStorage.setItem("search_item", JSON.stringify(response.data));
            event.view.location.reload()
          }
        } catch (error) {
          console.error(error);
          getToast("Error");
        }
      };

      fetchData();
      
    }
  };

  const getToast = (message) => {
    toast(message, {
      duration: 2000,
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
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <div className="drawerDivCard">
        <Card sx={{ maxWidth: "240px", boxShadow: "none" }}>
          <Link to="/home">
            <CardMedia sx={{ height: 140 }} image={Logo} />
          </Link>
        </Card>
      </div>
      <Divider />
      <List sx={{ padding: "10px" }}>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center", marginTop: "10px", boxShadow: 3 }}
              color="primary"
              onClick={() => drawerItemClick(item)}
            >
              {item === "Logout" ? (
                <Link to="/login" className="drawerLink">
                  <ListItemText primary={item} />
                </Link>
              ) : (
                <Link to={item.toLocaleLowerCase()} className="drawerLink">
                  <ListItemText primary={item} />
                </Link>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ flexGrow: 1 }} className="navbarRoot">
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ width: "100%" }} className="keyDiv">
            <Link to="/home">
              <img
                src={keyLogo}
                alt="Logo"
                style={{ height: "100%", maxHeight: "56px" }}
              />
            </Link>
          </div>
          <Search className="searchRoot">
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search", 'className': 'searchField' }}
              onChange={searchChange}
              onKeyUp={searchNow}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
