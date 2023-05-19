import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  Button,
  Avatar
} from "@mui/material";
import { ThemeProvider,createTheme } from '@mui/material/styles';
import React, { useContext } from "react";
import "../styles/Header.css";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./AuthModal"
import Sidebar from "./Sidebar";

const Header = () => {
  const navigate = useNavigate();
  const {currency,setCurrency,symbol,user} = CryptoState()

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  const login = ()=>{
    navigate("/login")
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography className="title" onClick={() => navigate("/")}>
              Crypto Hunter
            </Typography>
            <Select
              variant="outlined"
              style={{ width: 100, height: 40, marginRight: 15,color : "white" }}
              defaultValue={"INR"}
              onChange={(e)=>setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
            {user ? <Sidebar/> :  <AuthModal/>}
          </Toolbar>
        </Container>
      </AppBar>
      </ThemeProvider>
  );
};

export default Header;
