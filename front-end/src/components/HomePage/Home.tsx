import { Box, Button, TextField, Typography } from "@mui/material";
import React, { ReactElement, useState } from "react";
import "./homeStyle.css";
import { useNavigate } from "react-router-dom";
import { lettersOnly } from "../../utils/help";
import { purple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

export default function Home(): React.ReactElement {
  const [inputState, setInputState] = useState("");
  const navigate = useNavigate();
  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log("insub");

    e.preventDefault();
    navigate(`words/${lettersOnly(inputState)}`);
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[900]),
    backgroundColor: purple[900],
    "&:hover": {
      backgroundColor: purple[700],
    },
    marginLeft: "20px",
    width: "200px",
  }));

  return (
    <div>
      <Box
        id="home-start"
        className="start"
        sx={{
          height: { sm: "700px" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            marginY: { sm: "20px", xs: "10px" },
            fontSize: { sm: "4.5rem" },
            color: "#ffffff",
            position: "relative",
          }}
        >
          Welcome to Gavri Dictionary
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "white",
            width: { sm: "700px" },
            fontSize: { sm: "1.3rem" },
            textAlign: "center",
            position: "relative",
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
          voluptatibus optio voluptate?
        </Typography>
      </Box>

      <section className="second-home-section">
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: "30px",
              padding: "10px",
              paddingRight: "50px",
            }}
          >
            Go ahead and search for a word:
          </div>
          <Box
            component="form"
            // @ts-ignore
            onSubmit={handleSubmit}
            sx={{ display: "inline-flex" }}
          >
            <TextField
              id="bottom-search-input"
              label="Filled secondary"
              color="error"
              focused
              sx={{ input: { color: "white" } }}
              value={inputState}
              onChange={(e) => setInputState(e.currentTarget.value)}
            />

            <ColorButton onClick={handleSubmit}>Search</ColorButton>
          </Box>
        </div>
      </section>
    </div>
  );
}
