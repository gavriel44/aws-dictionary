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
import { purple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { lettersOnly } from "../utils/help";
import { useQueryClient } from "react-query";

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
export default function SearchAppBar(): React.ReactElement {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [searchInputState, setSearchInputState] = React.useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    // @ts-ignore
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuNavigate = (link: string) => {
    return () => {
      handleClose();
      navigate(link);
    };
  };

  const handleSurpriseClick = () => {
    console.log("in surprise");
    // this query is for invalidating and making react query not to take the cache
    // queryClient.invalidateQueries("rand-wordData");
    navigate("words/rand-word");
  };

  const handleColorButtonNavigate = (link: string) => {
    return () => {
      navigate(link);
    };
  };

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleEnterKeyUp = (e: KeyboardEvent) => {
      // console.log("test", inputRef.current, "active", document.activeElement);
      // console.log("input: ", searchInputState);
      if (!inputRef.current) return;
      if (
        document.activeElement === inputRef.current &&
        e.key === "Enter" &&
        inputRef.current.value !== ""
      ) {
        navigate(`/words/${lettersOnly(inputRef.current.value)}`);
      }
    };
    window.addEventListener("keyup", handleEnterKeyUp);

    return () => {
      window.removeEventListener("keyup", handleEnterKeyUp);
    };
  }, [navigate]);

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
            <MenuItem onClick={handleMenuNavigate("/")}>Home</MenuItem>
            <MenuItem onClick={handleMenuNavigate("/words")}>
              Search history
            </MenuItem>
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
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "flex" },
              // border: "solid black",
              justifyContent: "flex-start",
            }}
          >
            <ColorButton
              id="home-appBar-button"
              onClick={handleColorButtonNavigate("/")}
            >
              Home
            </ColorButton>
            <ColorButton
              id="history-appBar-button"
              onClick={handleColorButtonNavigate("/words")}
            >
              Search history
            </ColorButton>
            <ColorButton
              id="surprise-appBar-button"
              onClick={handleSurpriseClick}
            >
              Surprise me!
            </ColorButton>
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
                id: "appBar-search-input",
                onChange: (e) => {
                  setSearchInputState(e.currentTarget.value);
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
