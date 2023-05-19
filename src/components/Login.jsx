import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { CryptoState } from "../CryptoContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAlert,setOpen } = CryptoState();

  const handelSubmit = async (e) => {
    e.preventDefault()
    if (!password || !email) {
      setAlert({
        msg: "Please fill the whole form",
        type: "warning",
        open: true,
      });
    } 
    try {
      const result = await signInWithEmailAndPassword(auth,email,password)
      setOpen(false)
      setAlert({
        msg: `Sign In successful,Welcome ${email} Keep mining...`,
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
            onChange={(e)=>setEmail(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Enter Your Password"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e)=>setPassword(e.target.value)}
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
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
