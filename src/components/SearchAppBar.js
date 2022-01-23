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
import { Button, Menu, MenuItem } from "@mui/material";
import { blue, purple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { lettersOnly } from "../utils/help";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  // marginLeft: 0,
  // width: "100%",
  // [theme.breakpoints.down("sm")]: {
  //   marginLeft: theme.spacing(1),
  //   width: "auto",
  // },
  marginLeft: theme.spacing(1),
  width: "auto",
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
    // width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "7ch",
      "&:focus": {
        width: "20ch",
      },
    },
    width: "12ch",
    "&:focus": {
      width: "20ch",
    },
  },
}));

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[900]),
  backgroundColor: purple[900],
  "&:hover": {
    backgroundColor: purple[700],
  },
  marginLeft: "20px",
  width: "200px",
}));

export default function SearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [searchInputState, setSearchInputState] = React.useState("");
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const inputRef = React.useRef(null);

  const handleEnterKeyUp = (e) => {
    // console.log("test", inputRef.current, "active", document.activeElement);
    if (
      document.activeElement === inputRef.current &&
      e.key === "Enter" &&
      searchInputState !== ""
    ) {
      navigate(`/words/${lettersOnly(searchInputState)}`);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keyup", handleEnterKeyUp);

    return () => {
      window.removeEventListener("keyup", handleEnterKeyUp);
    };
  }, [searchInputState]);

  return (
    <Box sx={{ flexGrow: 1, display: "flex" }}>
      <AppBar position="static" style={{ background: "black" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                navigate("/");
              }}
            >
              Home
            </MenuItem>
            <MenuItem onClick={handleClose}>Search history</MenuItem>
            <MenuItem onClick={handleClose}>Surprise me!</MenuItem>
          </Menu>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              // flexGrow: 1,
              display: { xs: "none", sm: "block" },
              // border: "solid black",
            }}
          >
            GAVRI D
          </Typography>
          <Box
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "flex" },
              // border: "solid black",
              justifyContent: "flex-start",
            }}
          >
            <ColorButton
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </ColorButton>
            <ColorButton>Search history</ColorButton>
            <ColorButton>Surprise me!</ColorButton>
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              inputRef={inputRef}
              // value={searchInputState}
              placeholder="Search…"
              inputProps={{
                "aria-label": "search",
                value: searchInputState,
                onChange: (e) => {
                  console.log("e");
                  setSearchInputState(e.target.value);
                },
              }}
              // onChange={(e) => {
              //   console.log(e.target.value);
              //   setSearchInputState(e.target.value);
              // }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
