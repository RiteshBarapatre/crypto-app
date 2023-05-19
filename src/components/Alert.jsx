import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { CryptoState } from "../CryptoContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const { alert, setAlert } = CryptoState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(false);
  };

  return (
    <>
      <Snackbar open={alert?.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert?.type} sx={{ width: "100%" }}>
          {alert?.msg}
        </Alert>
      </Snackbar>
    </>
  );
}
