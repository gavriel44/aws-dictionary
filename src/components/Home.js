import { Box, FormGroup, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
// import Image from "./test4.jpg";
import { Paper } from "@mui/material";
import "./homeStyle.css";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { lettersOnly } from "../utils/help";

export default function Home() {
  const [inputState, setInputState] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`words/${lettersOnly(inputState)}`);
  };

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
          // backgroundImage: `url(${Image})`,
          // backgroundSize: "cover",
          // opacity: 0.6,
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
            sx={{ display: "inline-flex" }}
            onSubmit={handleSubmit}
          >
            <TextField
              label="Filled secondary"
              color="error"
              focused
              sx={{ input: { color: "white" } }}
              value={inputState}
              onChange={(e) => setInputState(e.target.value)}
            />
          </Box>
        </div>
      </section>
    </div>
  );
}
