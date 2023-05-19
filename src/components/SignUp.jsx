import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { CryptoState } from "../CryptoContext";
import {createUserWithEmailAndPassword} from "firebase/auth"
import { auth } from "../firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setAlert,setOpen } = CryptoState();

  const handelSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setAlert({
        msg: "Password not matching",
        type: "error",
        open: true,
      });
    } 
    
    if(password.length < 6){
      setAlert({
        msg: "Password should have at least 6 characters",
        type: "warning",
        open: true,
      });
    }
    try {
      const result = await createUserWithEmailAndPassword(auth,email,password)
      setOpen(false)
      setAlert({
        msg: `Sign Up successful,Welcome ${email} Keep mining...`,
        type: "success",
        open: true,
      });
    } catch (error) {
      setAlert({
        msg: error.message,
        type: "error",
        open: true,
      });
    }
  };

  return (
    <Box component={"span"}>
      <form onSubmit={handelSubmit}>
        <Box p={3}>
          <TextField
            id="outlined-basic"
            label="Enter Your Email"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Enter Your Password"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            style={{
              backgroundColor: "gold",
              marginTop: "20px",
              color: "black",
            }}
            type="submit"
          >
            Sign Up
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SignUp;
