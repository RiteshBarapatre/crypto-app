import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Login from "./Login";
import SignUp from "./SignUp";
import { CryptoState } from "../CryptoContext";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AuthModal() {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);
  const { open, setOpen } = CryptoState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider();

  const { setAlert,setUser } = CryptoState();

  const googleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        console.log(res)
        setAlert({
          msg: `Sign In successful,Welcome ${res.user.email} Keep mining...`,
          type: "success",
          open: true,
        });
        setOpen(false);
      })
      .catch((err) => {
        setAlert({
          msg: err.message,
          type: "error",
          open: true,
        });

        setOpen(false);
      });
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        style={{ backgroundColor: "gold", color: "black" }}
      >
        Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                style={{ width: "100%" }}
              >
                <Tab
                  label="Item One"
                  {...a11yProps(0)}
                  style={{ width: "50%" }}
                />
                <Tab
                  label="Item Two"
                  {...a11yProps(1)}
                  style={{ width: "50%" }}
                />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Login />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SignUp />
            </TabPanel>
            <Box textAlign="center">
              <span style={{ color: "white" }}>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none", marginTop: "10px" }}
                onClick={googleLogin}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
